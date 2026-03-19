import { memo } from 'react';

const PitfallWarnings = memo(function PitfallWarnings({ tasks }) {
  // Get active pitfalls from in-progress tasks
  const activePitfalls = tasks
    .filter((t) => t.status === 'in_progress' && t.pitfalls?.length > 0)
    .flatMap((t) => t.pitfalls.map((p) => ({ ...p, taskTitle: t.title })));

  if (activePitfalls.length === 0) return null;

  return (
    <div className="space-y-2">
      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
        <span className="text-yellow-400">⚠️</span> Active Warnings
      </h4>
      {activePitfalls.slice(0, 3).map((p, i) => (
        <div key={i} className="p-2.5 bg-yellow-500/5 border border-yellow-500/15 rounded-lg">
          <p className="text-[11px] font-medium text-yellow-400">{p.title}</p>
          <p className="text-[10px] text-slate-500 mt-0.5">{p.taskTitle}</p>
        </div>
      ))}
    </div>
  );
});

export default PitfallWarnings;
