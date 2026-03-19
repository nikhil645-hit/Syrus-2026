import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function DashboardLayout({ children }) {
  const { user, persona, logout } = useAuth();
  const location = useLocation();

  // Theme toggle
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') !== 'light';
    }
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const navItems = [
    { path: '/dashboard', label: 'Overview', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { path: '/manager', label: 'Manager View', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', role: 'manager' },
    { path: '/profile', label: 'Identity', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
  ];

  return (
    <div className="h-screen w-full flex bg-navy-950 overflow-hidden text-zinc-300">
      
      {/* ── Slim Vertical Sidebar ── */}
      <aside className="w-[68px] flex flex-col items-center py-5 border-r border-white/5 bg-[#0a0a0c] z-20 flex-shrink-0">
        
        {/* Logo */}
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md mb-8 ring-1 ring-white/10">
          <span className="text-white font-heading font-bold text-lg">A</span>
        </div>

        {/* Navigation Icons */}
        <nav className="flex-1 w-full flex flex-col items-center gap-4">
          {navItems.map((item) => {
            if (item.role && user?.role !== item.role) return null;
            const isActive = location.pathname.startsWith(item.path);
            
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`group relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-white/10 text-white shadow-inner border border-white/5' 
                    : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/5'
                  }`}
                title={item.label}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? 2 : 1.5} d={item.icon} />
                </svg>
                
                {/* Active Indicator Pip */}
                {isActive && (
                  <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-1.5 h-6 bg-indigo-500 rounded-r-md"></div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User / Settings Context at Bottom */}
        <div className="w-full flex justify-center mt-auto flex-col items-center gap-4">
           {/* Logout Button */}
           <button 
            onClick={logout}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            title="Sign Out"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>

           {/* Theme Toggle */}
           <button
             onClick={() => setIsDark(!isDark)}
             className="w-10 h-10 flex items-center justify-center rounded-xl text-zinc-500 hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
             title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
           >
             {isDark ? (
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
             ) : (
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
             )}
           </button>

          {/* User Avatar */}
          <Link to="/profile" className="w-10 h-10 rounded-full bg-navy-800 border border-white/5 overflow-hidden hover:border-indigo-500/50 transition-all flex items-center justify-center user-avatar">
            <span className="text-xs font-bold text-zinc-100 uppercase tracking-wider">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </Link>
        </div>
      </aside>

      {/* ── Main Workspace Area ── */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0c0c0e]">
        
        {/* Top Context Bar */}
        <header className="h-14 flex items-center justify-between px-6 border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
             <h1 className="text-sm font-medium text-zinc-200">
              DevOnboard AI <span className="text-zinc-600 mx-2">/</span> <span className="text-zinc-400">{location.pathname.replace('/', '').charAt(0).toUpperCase() + location.pathname.slice(2)}</span>
             </h1>
          </div>

          <div className="flex items-center gap-4">
             {/* Global Search Mockup */}
             <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-zinc-500 group-focus-within:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  placeholder="Search agents, tasks..." 
                  className="w-64 pl-9 pr-3 py-1.5 bg-navy-900/50 border border-white/5 rounded-md text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-white/20 focus:bg-navy-800 focus:ring-1 focus:ring-white/10 transition-all"
                />
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                  <span className="text-[10px] text-zinc-600 bg-white/5 px-1.5 py-0.5 rounded border border-white/5 font-mono">⌘K</span>
                </div>
             </div>
             
             {/* Status Indicator */}
             <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/30">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400">System Nominal</span>
             </div>
          </div>
        </header>

        {/* Page Content Container */}
        <main className="flex-1 overflow-auto relative min-h-0">
          {children}
        </main>

      </div>
    </div>
  );
}
