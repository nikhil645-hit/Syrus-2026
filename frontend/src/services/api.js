/**
 * @module services/api
 * @description Axios-based API client for all backend communication.
 * Auto-attaches JWT token from localStorage to every request.
 */

import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses globally — fire event instead of hard reload (S5)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.dispatchEvent(new CustomEvent('auth:logout'));
      }
    }
    return Promise.reject(error);
  }
);

// ══════════════════════════════════════
// AUTH
// ══════════════════════════════════════
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

// ══════════════════════════════════════
// USER
// ══════════════════════════════════════
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updatePersona: (personaId) => api.put('/user/persona', { personaId }),
};

// ══════════════════════════════════════
// TASKS
// ══════════════════════════════════════
export const taskAPI = {
  list: () => api.get('/tasks'),
  get: (id) => api.get(`/tasks/${id}`),
  start: (id) => api.post(`/tasks/${id}/start`),
  verify: (id, evidence) => api.post(`/tasks/${id}/verify`, { evidence }),
  complete: (id) => api.post(`/tasks/${id}/complete`),
};

// ══════════════════════════════════════
// CHAT
// ══════════════════════════════════════
export const chatAPI = {
  send: (message) => api.post('/chat', { message }),
  getHistory: () => api.get('/chat/history'),
};

// ══════════════════════════════════════
// DOCS
// ══════════════════════════════════════
export const docAPI = {
  search: (query) => api.get(`/docs/search?q=${encodeURIComponent(query)}`),
};

// ══════════════════════════════════════
// PITFALLS
// ══════════════════════════════════════
export const pitfallAPI = {
  getByTask: (taskId) => api.get(`/pitfalls?taskId=${taskId}`),
};

// ══════════════════════════════════════
// TICKETS
// ══════════════════════════════════════
export const ticketAPI = {
  getStarter: () => api.get('/tickets/starter'),
  updateStatus: (id, status) => api.put(`/tickets/starter/${id}`, { status }),
};

// ══════════════════════════════════════
// ANALYTICS
// ══════════════════════════════════════
export const analyticsAPI = {
  getProgress: () => api.get('/analytics/progress'),
  getRisk: () => api.get('/analytics/risk'),
  getProductivityEstimate: () => api.get('/analytics/productivity-estimate'),
  getAllDevelopers: () => api.get('/analytics/all-developers'),
  getOnboardingReport: (userId) => api.get(`/reports/onboarding/${userId}`),
};

export default api;
