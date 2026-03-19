import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, persona, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  // Parse the pipe-separated objectives string into structured key-value pairs
  const parseObjectives = (raw) => {
    if (!raw) return [];
    return raw.split('|').map(s => s.trim()).filter(Boolean).map(item => {
      const colonIdx = item.indexOf(':');
      if (colonIdx > 0) {
        return { label: item.slice(0, colonIdx).trim(), value: item.slice(colonIdx + 1).trim() };
      }
      return { label: '', value: item };
    });
  };

  // Parse the semicolon-separated focus string into an array
  const parseFocus = (raw) => {
    if (!raw) return [];
    return raw.split(';').map(s => s.trim()).filter(Boolean);
  };

  const objectives = persona ? parseObjectives(persona.learningObjectives) : [];
  const focusItems = persona ? parseFocus(persona.onboardingFocus) : [];

  return (
    <div className="min-h-screen bg-navy-950">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <span className="text-white font-heading font-bold text-sm">A</span>
          </div>
          <h1 className="text-lg font-heading font-semibold text-white">Axiom</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard')} className="btn-secondary text-xs py-1.5 px-3">
            ← Dashboard
          </button>
          <button onClick={logout} className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
            Sign out
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-8 space-y-6">
        <h2 className="text-2xl font-heading font-bold text-white">Your Profile</h2>

        {/* Account Card */}
        <div className="card p-6 space-y-5">
          <h3 className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">Account</h3>
          <div className="grid grid-cols-2 gap-y-5 gap-x-8">
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Name</p>
              <p className="text-sm text-white font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Email</p>
              <p className="text-sm text-zinc-300 font-mono text-xs">{user.email}</p>
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Role</p>
              <p className="text-sm text-zinc-300 capitalize">{user.role}</p>
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Experience</p>
              <p className="text-sm text-zinc-300 capitalize">{user.experienceLevel}</p>
            </div>
            {user.team && (
              <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Team</p>
                <p className="text-sm text-zinc-300">{user.team}</p>
              </div>
            )}
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Member Since</p>
              <p className="text-sm text-zinc-300">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
              </p>
            </div>
          </div>

          {user.techStack && user.techStack.length > 0 && (
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {user.techStack.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Persona */}
        {persona && (
          <div className="card p-6 space-y-5">
            <h3 className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">Onboarding Persona</h3>
            
            <div className="flex items-center gap-4 p-4 bg-black/20 rounded-xl border border-white/5">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>
              </div>
              <div>
                <h4 className="text-base font-semibold text-white">{persona.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-zinc-400 capitalize">{persona.role}</span>
                  <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-zinc-400 capitalize">{persona.experienceLevel}</span>
                </div>
              </div>
            </div>

            {/* Structured Objectives */}
            {objectives.length > 0 && (
              <div>
                <h6 className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-3">Background</h6>
                <div className="space-y-2">
                  {objectives.map((obj, i) => (
                    <div key={i} className="flex gap-3 text-sm p-2.5 bg-black/20 rounded-lg border border-white/5">
                      {obj.label && <span className="text-zinc-500 shrink-0 text-xs font-medium min-w-[90px]">{obj.label}</span>}
                      <span className="text-zinc-300 text-xs leading-relaxed">{obj.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Structured Focus items */}
            {focusItems.length > 0 && (
              <div>
                <h6 className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-3">Onboarding Focus</h6>
                <ul className="space-y-2">
                  {focusItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <div className="w-5 h-5 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[9px] text-emerald-400 font-bold">{i + 1}</span>
                      </div>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {!persona && (
          <div className="card p-6">
            <h3 className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-3">Onboarding Persona</h3>
            <p className="text-sm text-zinc-500">No persona assigned yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
