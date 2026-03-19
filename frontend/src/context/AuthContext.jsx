/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, userAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

function getStoredUser() {
  const token = localStorage.getItem('token');
  const savedUser = localStorage.getItem('user');

  if (!token || !savedUser) {
    return null;
  }

  try {
    return JSON.parse(savedUser);
  } catch {
    localStorage.removeItem('user');
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());
  const [persona, setPersona] = useState(null);
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem('token')));
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    let cancelled = false;

    userAPI.getProfile().then((res) => {
      if (!cancelled && res.data.success) {
        setUser(res.data.data);
        setPersona(res.data.data.persona);
        localStorage.setItem('user', JSON.stringify(res.data.data));
      }
    }).catch(() => {
      if (!cancelled) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setPersona(null);
      }
    }).finally(() => {
      if (!cancelled) {
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // S5: respond to the auth:logout custom event fired by the axios interceptor
  useEffect(() => {
    const handler = () => {
      setUser(null);
      setPersona(null);
      navigate('/login', { replace: true });
    };
    window.addEventListener('auth:logout', handler);
    return () => window.removeEventListener('auth:logout', handler);
  }, [navigate]);

  const login = async (email, password) => {
    try {
      const res = await authAPI.login({ email, password });
      if (res.data.success) {
        const { token, user: userData, persona: personaData } = res.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setPersona(personaData);
        return { success: true, user: userData };
      }
      return { success: false, error: res.data.error };
    } catch (err) {
      const message = err.response?.data?.error || err.message || 'Login failed';
      return { success: false, error: message };
    }
  };

  const register = async (formData) => {
    try {
      const res = await authAPI.register(formData);
      if (res.data.success) {
        const { token, user: userData, persona: personaData } = res.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setPersona(personaData);
        return { success: true, user: userData, persona: personaData };
      }
      return { success: false, error: res.data.error };
    } catch (err) {
      const message = err.response?.data?.error || err.message || 'Registration failed';
      return { success: false, error: message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setPersona(null);
  };

  return (
    <AuthContext.Provider value={{ user, persona, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export default AuthContext;
