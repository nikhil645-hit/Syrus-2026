import { memo } from 'react';

const RiskMeter = memo(function RiskMeter({ score = 0, factors = {} }) {
  const level = score > 0.7 ? 'high' : score > 0.4 ? 'medium' : 'low';
  const percentage = Math.round(score * 100);

  const config = {
    low: { color: '#34d399', bg: 'bg-emerald-500/5', border: 'border-emerald-500/10', label: 'Low Risk', glow: '' },
    medium: { color: '#fbbf24', bg: 'bg-amber-500/5', border: 'border-amber-500/10', label: 'Medium Risk', glow: '' },
    high: { color: '#f87171', bg: 'bg-rose-500/5', border: 'border-rose-500/20', label: 'High Risk', glow: 'shadow-[0_0_15px_rgba(244,63,94,0.1)] border-rose-500/30' },
  };

  const c = config[level];

  return (
    <div className={`card p-5 group hover:border-white/10 ${c.glow} transition-all duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Risk Assesment</h4>
        <span className="px-2 py-0.5 rounded-full border text-[10px] font-medium tracking-wide" style={{ color: c.color, borderColor: `${c.color}30`, backgroundColor: `${c.color}10` }}>
          {c.label}
        </span>
      </div>

      <div className="flex items-end justify-between mb-2">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold tracking-tighter text-white">{percentage}%</span>
        </div>
        
        {level === 'high' && (
          <span className="flex items-center gap-1.5 text-xs text-rose-400 bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            Flagged
          </span>
        )}
      </div>

      {/* Meter Bar */}
      <div className="w-full h-1.5 rounded-full bg-white/5 mb-4 overflow-hidden relative">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%`, backgroundColor: c.color, boxShadow: `0 0 8px ${c.color}` }}
        />
      </div>

      {/* Factor indicators */}
      <div className="space-y-2 pt-2 border-t border-white/5 mt-4">
        {Object.entries(factors).filter(([, value]) => value?.signal_score > 0).map(([key, val]) => (
          <div key={key} className="flex items-center justify-between group/item">
            <span className="text-xs text-zinc-500 capitalize group-hover/item:text-zinc-300 transition-colors">{key.replace(/_/g, ' ')}</span>
            <span className="text-[10px] font-mono text-zinc-400 bg-white/5 px-1.5 py-0.5 rounded">{(val.signal_score * 100).toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
});

export default RiskMeter;
