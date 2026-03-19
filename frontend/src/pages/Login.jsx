import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate(result.user.role === 'manager' ? '/manager' : '/dashboard');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#09090b]">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.2)]">
              <span className="text-indigo-400 font-bold text-2xl tracking-wider">A</span>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-white">Axiom</h1>
          </div>
          <p className="text-zinc-500 text-sm tracking-wide">Developer Onboarding Intelligence</p>
        </div>

        {/* Login Card */}
        <div className="bg-[#121212] border border-white/5 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-white mb-6 tracking-tight">Sign in to your account</h2>

          {error && (
            <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-start gap-3">
              <svg className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <span className="text-rose-400 text-sm font-medium leading-relaxed">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2 tracking-wide">Email</label>
              <input
                type="email"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all shadow-inner"
                placeholder="you@novabyte.dev"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-zinc-300 tracking-wide">Password</label>
                <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Forgot?</a>
              </div>
              <input
                type="password"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all shadow-inner"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-white text-zinc-900 text-sm font-semibold tracking-wide rounded-xl hover:bg-zinc-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-50 mt-2"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 bg-zinc-900" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Authenticating...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-zinc-500">
            New to DevOnboard AI?{' '}
            <Link to="/register" className="text-white hover:text-indigo-300 font-medium transition-colors">
              Request access
            </Link>
          </div>

          {/* Demo credentials */}
          <div className="mt-8 pt-6 border-t border-white/5">
            <p className="text-xs font-semibold text-zinc-500 mb-3 tracking-wider uppercase">Demo Credentials</p>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2 text-xs font-mono text-zinc-400">
              <div className="flex justify-between items-center group cursor-pointer hover:text-zinc-200" onClick={() => { setEmail('riya.sharma@novabyte.dev'); setPassword('password123'); }}>
                <span>Developer</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400 text-[10px]">Use</span>
              </div>
              <div className="w-full h-px bg-white/5"></div>
              <div className="flex justify-between items-center group cursor-pointer hover:text-zinc-200" onClick={() => { setEmail('manager@novabyte.dev'); setPassword('password123'); }}>
                <span>Manager</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400 text-[10px]">Use</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
