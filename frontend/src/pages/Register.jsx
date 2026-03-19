import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const TECH_OPTIONS = ['Node.js', 'Python', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'Redis', 'AWS', 'TailwindCSS', 'Express', 'FastAPI', 'Vite', 'Jest', 'Kubernetes', 'JavaScript', 'Terraform', 'Helm', 'Kafka', 'GitHub Actions', 'Prometheus', 'Grafana', 'Poetry', 'React Query', 'Zustand', 'MongoDB', 'CSS'];

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [matchedPersona, setMatchedPersona] = useState(null);

  const [form, setForm] = useState({
    name: '', email: '', password: '',
    role: 'backend', experienceLevel: 'junior',
    techStack: [], team: '',
  });

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const toggleTech = (tech) => {
    setForm((prev) => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter((t) => t !== tech)
        : [...prev.techStack, tech],
    }));
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      const result = await register(form);
      if (result.success) {
        setMatchedPersona(result.persona);
        setStep(4);
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#09090b]">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-lg relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.2)]">
              <span className="text-indigo-400 font-bold text-2xl tracking-wider">A</span>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-white">Axiom</h1>
          </div>
          <p className="text-zinc-500 text-sm tracking-wide">Begin your Developer Onboarding Journey</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-medium transition-all duration-300 shadow-sm ${
                step >= s 
                  ? 'bg-indigo-500 text-white shadow-glow-purple border-transparent' 
                  : 'bg-white/5 text-zinc-600 border border-white/10'
              }`}>
                {step > s ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                ) : s}
              </div>
              {s < 3 && <div className={`w-10 h-0.5 rounded-full transition-all duration-300 ${step > s ? 'bg-indigo-500/50' : 'bg-white/5'}`} />}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-[#121212] border border-white/5 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
          {error && (
            <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-start gap-3">
              <svg className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <span className="text-rose-400 text-sm font-medium leading-relaxed">{error}</span>
            </div>
          )}

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="animate-fade-in space-y-5">
              <h2 className="text-xl font-semibold text-white mb-6 tracking-tight">Let's get started</h2>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2 tracking-wide">Full Name</label>
                <input 
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all shadow-inner" 
                  placeholder="Alex Chen" 
                  value={form.name} 
                  onChange={(e) => updateField('name', e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2 tracking-wide">Email</label>
                <input 
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all shadow-inner" 
                  type="email" 
                  placeholder="alex@novabyte.dev" 
                  value={form.email} 
                  onChange={(e) => updateField('email', e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2 tracking-wide">Password</label>
                <input 
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all shadow-inner" 
                  type="password" 
                  placeholder="Min 6 characters" 
                  value={form.password} 
                  onChange={(e) => updateField('password', e.target.value)} 
                />
              </div>
              <button 
                className="w-full py-3 bg-white text-zinc-900 text-sm font-semibold tracking-wide rounded-xl hover:bg-zinc-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-50 mt-4" 
                onClick={() => setStep(2)}
                disabled={!form.name || !form.email || !form.password || form.password.length < 6}
              >
                Continue →
              </button>
            </div>
          )}

          {/* Step 2: Role & Experience */}
          {step === 2 && (
            <div className="animate-fade-in space-y-6">
              <h2 className="text-xl font-semibold text-white mb-6 tracking-tight">Your role & experience</h2>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-3 tracking-wide">Primary Role</label>
                <div className="grid grid-cols-2 gap-3">
                  {['backend', 'frontend', 'fullstack', 'devops'].map((role) => (
                    <button key={role} onClick={() => updateField('role', role)}
                      className={`p-3 rounded-xl border text-sm font-medium capitalize transition-all duration-200 ${
                        form.role === role
                          ? 'border-indigo-500/50 bg-indigo-500/10 text-indigo-300 shadow-sm'
                          : 'border-white/5 bg-white/5 text-zinc-400 hover:border-white/10 hover:text-zinc-200 hover:bg-white/10'
                      }`}>
                      {role}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-3 tracking-wide">Experience Level</label>
                <div className="grid grid-cols-4 gap-2">
                  {['intern', 'junior', 'mid', 'senior'].map((lvl) => (
                    <button key={lvl} onClick={() => updateField('experienceLevel', lvl)}
                      className={`p-2.5 rounded-xl border text-xs font-medium capitalize transition-all duration-200 ${
                        form.experienceLevel === lvl
                          ? 'border-indigo-500/50 bg-indigo-500/10 text-indigo-300 shadow-sm'
                          : 'border-white/5 bg-white/5 text-zinc-400 hover:border-white/10 hover:text-zinc-200 hover:bg-white/10'
                      }`}>
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button 
                  className="flex-1 py-3 bg-white/5 border border-white/10 text-zinc-300 text-sm font-medium tracking-wide rounded-xl hover:bg-white/10 hover:text-white transition-colors" 
                  onClick={() => setStep(1)}
                >
                  ← Back
                </button>
                <button 
                  className="flex-1 py-3 bg-white text-zinc-900 text-sm font-semibold tracking-wide rounded-xl hover:bg-zinc-200 transition-colors shadow-sm" 
                  onClick={() => setStep(3)}
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Tech Stack & Team */}
          {step === 3 && (
            <div className="animate-fade-in space-y-6">
              <h2 className="text-xl font-semibold text-white mb-6 tracking-tight">Tech stack & team</h2>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-3 tracking-wide">Select your technologies</label>
                <div className="flex flex-wrap gap-2">
                  {TECH_OPTIONS.map((tech) => (
                    <button key={tech} onClick={() => toggleTech(tech)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-medium transition-all duration-200 ${
                        form.techStack.includes(tech)
                          ? 'border-indigo-500/50 bg-indigo-500/10 text-indigo-300 shadow-sm'
                          : 'border-white/5 bg-white/5 text-zinc-400 hover:border-white/10 hover:text-zinc-200 hover:bg-white/10'
                      }`}>
                      {tech}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2 tracking-wide mt-6">Team</label>
                <input 
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all shadow-inner" 
                  placeholder="e.g. Platform, Frontend, Data" 
                  value={form.team} 
                  onChange={(e) => updateField('team', e.target.value)} 
                />
              </div>
              <div className="flex gap-3 mt-8">
                <button 
                  className="flex-1 py-3 bg-white/5 border border-white/10 text-zinc-300 text-sm font-medium tracking-wide rounded-xl hover:bg-white/10 hover:text-white transition-colors" 
                  onClick={() => setStep(2)}
                >
                  ← Back
                </button>
                <button 
                  className="flex-1 py-3 bg-white text-zinc-900 text-sm font-semibold tracking-wide rounded-xl hover:bg-zinc-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-50" 
                  onClick={handleSubmit} 
                  disabled={loading}
                >
                  {loading ? 'Creating account...' : 'Complete Setup'}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Persona Match */}
          {step === 4 && matchedPersona && (
            <div className="animate-fade-in text-center p-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-6 shadow-glow-purple relative">
                 <svg className="w-10 h-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /></svg>
                 <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-[3px] border-[#121212] flex items-center justify-center">
                   <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                 </div>
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-white mb-2">Welcome aboard!</h2>
              <p className="text-zinc-500 text-sm mb-8 tracking-wide">Your Axiom environment is ready.</p>

              <div className="bg-black/20 border border-white/5 rounded-2xl p-6 text-left mb-8 shadow-inner">
                 <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-medium text-emerald-400">Assigned Persona</h3>
                  <span className="px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
                 </div>
                <h4 className="text-lg font-semibold text-white mb-1.5">{matchedPersona.name}</h4>
                {matchedPersona.matchReason && (
                  <p className="text-[11px] font-mono leading-relaxed text-zinc-500 mb-4">{matchedPersona.matchReason}</p>
                )}
                
                <div className="space-y-3 text-sm mt-5 pt-5 border-t border-white/5">
                  <div>
                    <span className="block text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mb-1">Focus Area</span>
                    <span className="text-zinc-300 font-medium">{matchedPersona.onboardingFocus}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mb-1">Learning Objectives</span>
                    <span className="text-zinc-300 font-medium leading-relaxed">{matchedPersona.learningObjectives}</span>
                  </div>
                </div>
              </div>

              <button 
                className="w-full py-3.5 bg-white text-zinc-900 text-sm font-semibold tracking-wide rounded-xl hover:bg-zinc-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                onClick={() => navigate('/dashboard')}
              >
                Access Control Center →
              </button>
            </div>
          )}
        </div>

        {step < 4 && (
          <div className="mt-8 text-center text-sm text-zinc-500">
            Already have an account?{' '}
            <Link to="/login" className="text-white hover:text-indigo-300 font-medium transition-colors">Return to Sign In</Link>
          </div>
        )}
      </div>
    </div>
  );
}
