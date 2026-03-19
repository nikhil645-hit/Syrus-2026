import { useState, useEffect, memo } from 'react';
import { ticketAPI } from '../../services/api';

const StarterTicket = memo(function StarterTicket() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ticketAPI.getStarter().then((res) => {
      if (res.data.success) setTickets(res.data.data.tickets);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await ticketAPI.updateStatus(id, status);
      setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
    } catch (err) {
      console.error('Failed to update ticket:', err);
    }
  };

  if (loading) return (
    <div className="card p-5 border-white/5 animate-pulse">
      <div className="h-4 w-24 bg-white/5 rounded mb-4"></div>
      <div className="h-5 w-48 bg-white/10 rounded mb-2"></div>
      <div className="h-4 w-3/4 bg-white/5 rounded"></div>
    </div>
  );
  if (tickets.length === 0) return null;

  const ticket = tickets[0]; // Show first ticket

  const getStatusDisplay = (status) => {
    if (status === 'completed') return <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wide flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>Completed</span>;
    if (status === 'in_progress') return <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wide flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></div>In Progress</span>;
    return <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wide">Assigned</span>;
  };

  return (
    <div className="card relative overflow-hidden group hover:border-white/10 transition-colors shrink-0">      
      <div className="relative p-5 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Starter Ticket
          </div>
          {getStatusDisplay(ticket.status)}
        </div>

        <h5 className="text-sm font-medium text-white tracking-tight mb-4 leading-snug">{ticket.title}</h5>
        
        {(() => {
          const lines = (ticket.description || '').split('\n');
          const metadata = [];
          const bodyLines = [];
          let currentSection = 'body';
          const files = [];
          const resources = [];

          lines.forEach(line => {
            const trimmed = line.trim();
            if (!trimmed) return;
            
            if (trimmed.startsWith('Project: ') || trimmed.startsWith('Type: ') || trimmed.startsWith('Priority: ') || trimmed.startsWith('Story Points: ')) {
               const [key, ...rest] = trimmed.split(': ');
               metadata.push({ label: key, value: rest.join(': ') });
               return;
            }
            
            if (trimmed === 'Files to Modify:') {
              currentSection = 'files';
              return;
            }
            
            if (trimmed === 'Helpful Resources:') {
              currentSection = 'resources';
              return;
            }

            if (currentSection === 'files') {
              files.push(trimmed.replace(/^- /, ''));
            } else if (currentSection === 'resources') {
              resources.push(trimmed.replace(/^- /, '').replace(/---$/, '').trim());
            } else {
              bodyLines.push(trimmed);
            }
          });

          return (
            <div className="space-y-4 mb-5">
              {metadata.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {metadata.map(m => (
                    <span key={m.label} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-zinc-300 font-medium tracking-wide">
                      <span className="text-zinc-500 mr-1">{m.label}:</span>{m.value}
                    </span>
                  ))}
                </div>
              )}
              
              {bodyLines.length > 0 && (
                <div className="text-xs text-zinc-300 leading-relaxed bg-black/20 p-3 rounded-xl border border-white/5">
                  {bodyLines.map((line, i) => (
                    <p key={i} className={i > 0 ? 'mt-3' : ''}>
                      {line.split(/`([^`]+)`/).map((part, j) => 
                        j % 2 === 1 ? <code key={j} className="text-[10.5px] bg-indigo-500/10 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-500/20 font-mono tracking-tight">{part}</code> : part
                      )}
                    </p>
                  ))}
                </div>
              )}

              {files.length > 0 && (
                <div>
                  <h6 className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">Files to Modify</h6>
                  <ul className="space-y-2">
                    {files.map((file, i) => (
                      <li key={i} className="text-xs text-zinc-400 flex items-start gap-2.5">
                        <svg className="w-3.5 h-3.5 text-zinc-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        <span className="leading-snug">
                          {file.split(/`([^`]+)`/).map((part, j) => 
                            j % 2 === 1 ? <code key={j} className="text-[10.5px] text-emerald-400 font-mono tracking-tight">{part}</code> : part
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {resources.length > 0 && (
                <div>
                  <h6 className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">Helpful Resources</h6>
                  <ul className="space-y-2">
                    {resources.filter(r => r).map((res, i) => (
                      <li key={i} className="text-xs text-zinc-400 flex items-start gap-2.5">
                        <svg className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="leading-snug">
                          {res.split(/`([^`]+)`/).map((part, j) => 
                            j % 2 === 1 ? <code key={j} className="text-[10.5px] text-zinc-200 font-mono bg-white/5 px-1 rounded">{part}</code> : part
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })()}

        <div className="flex items-center gap-3 text-[11px] text-zinc-500 mb-5 font-medium bg-black/20 p-2.5 rounded-lg border border-white/5">
          <span className="flex items-center gap-1.5 whitespace-nowrap overflow-hidden text-ellipsis">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            {ticket.repository}
          </span>
          <span className="w-1 h-1 bg-zinc-700 rounded-full flex-shrink-0"></span>
          <span className="capitalize text-zinc-400">{ticket.difficulty}</span>
        </div>

        {/* Status toggle aligned to right */}
        <div className="flex justify-end border-t border-white/5 pt-4 mt-2">
          {ticket.status === 'assigned' && (
            <button onClick={() => updateStatus(ticket.id, 'in_progress')}
              className="px-4 py-2 bg-indigo-600 text-white font-medium text-xs rounded-lg hover:bg-indigo-500 transition-colors shadow-sm">
              Start Working
            </button>
          )}
          {ticket.status === 'in_progress' && (
            <button onClick={() => updateStatus(ticket.id, 'completed')}
              className="px-4 py-2 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-medium text-xs rounded-lg hover:bg-emerald-500/20 transition-colors shadow-sm">
              Mark Complete
            </button>
          )}
          {ticket.status === 'completed' && (
             <button disabled className="px-4 py-2 bg-white/5 text-zinc-500 font-medium text-xs rounded-lg cursor-not-allowed border border-white/5">
               Resolved
             </button>
          )}
        </div>
      </div>
    </div>
  );
});

export default StarterTicket;
