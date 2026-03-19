import { useState } from 'react';

const STATUS_CONFIG = {
  not_started: { label: 'Not Started', class: 'badge-neutral', icon: '○' },
  in_progress: { label: 'In Progress', class: 'badge-warning', icon: '◐' },
  verified: { label: 'Verified', class: 'badge-success', icon: '✓' },
  completed: { label: 'Completed', class: 'badge-success', icon: '✓' },
};

export default function TaskItem({ task, onStart, onOpenModal }) {
  const [starting, setStarting] = useState(false);
  const config = STATUS_CONFIG[task.status] || STATUS_CONFIG.not_started;

  const handleStart = async (e) => {
    e.stopPropagation();
    setStarting(true);
    try {
      await onStart(task.id);
    } finally {
      setStarting(false);
    }
  };

  return (
    <div
      onClick={() => onOpenModal(task)}
      className="group flex items-center gap-3 p-3 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/5 hover:shadow-sm cursor-pointer transition-all animate-slide-in"
    >
      {/* Status Icon */}
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
        task.status === 'completed' || task.status === 'verified'
          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
          : task.status === 'in_progress'
            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
            : 'bg-white/5 text-zinc-500 border border-white/5'
      }`}>
        {config.icon}
      </div>

      {/* Task Info */}
      <div className="flex-1 min-w-0">
        <h4 className={`text-xs font-medium truncate tracking-wide ${
          task.status === 'completed' || task.status === 'verified' ? 'text-zinc-600 line-through' : 'text-zinc-200 group-hover:text-white transition-colors'
        }`}>
          {task.title}
        </h4>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] text-zinc-500 font-mono tracking-tighter">{task.estimatedMinutes}min</span>
          {task.pitfalls?.length > 0 && (
            <span className="text-[10px] text-rose-400 flex items-center gap-1">
              <span className="w-1 h-1 bg-rose-400 rounded-full"></span> 
              {task.pitfalls.length} catch{task.pitfalls.length > 1 ? 'es' : ''}
            </span>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="flex-shrink-0 ml-2">
        {task.status === 'not_started' && (
          <button onClick={handleStart} disabled={starting}
            className="px-3 py-1.5 text-[10px] font-medium tracking-wide uppercase rounded-md bg-white text-zinc-900 border border-transparent hover:bg-zinc-200 transition-all shadow-sm disabled:opacity-50">
            {starting ? '...' : 'Start'}
          </button>
        )}
        {task.status === 'in_progress' && (
          <button onClick={(e) => { e.stopPropagation(); onOpenModal(task); }}
            className="px-3 py-1.5 text-[10px] font-medium tracking-wide uppercase rounded-md bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all shadow-sm">
            Submit
          </button>
        )}
        {(task.status === 'completed' || task.status === 'verified') && (
          <span className="text-emerald-500 text-sm">✓</span>
        )}
      </div>
    </div>
  );
}
