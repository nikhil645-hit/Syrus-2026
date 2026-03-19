import { memo } from 'react';

const ProgressRing = memo(function ProgressRing({ percentage = 0, size = 120, strokeWidth = 8 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (percentage >= 100) return '#f4f4f5'; // zinc-100
    if (percentage >= 75) return '#38bdf8'; // cyan-400
    if (percentage >= 40) return '#0ea5e9'; // cyan-500
    return '#3f3f46'; // zinc-600
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative group" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90 relative z-10 drop-shadow-lg">
          {/* Background circle */}
          <circle cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={strokeWidth} />
          {/* Progress circle */}
          <circle cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke={getColor()} strokeWidth={strokeWidth}
            strokeDasharray={circumference} strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out" />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <span className="text-2xl font-bold text-white tracking-tight drop-shadow-md">{Math.round(percentage)}%</span>
          <span className="text-[9px] text-zinc-500 uppercase tracking-widest mt-0.5">Complete</span>
        </div>
      </div>
    </div>
  );
});

export default ProgressRing;
