import { useState } from 'react';

export default function TaskModal({ task, onClose, onVerify, onComplete }) {
  const [evidence, setEvidence] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState(null);

  if (!task) return null;

  const handleVerify = async () => {
    if (!evidence.trim()) return;
    setVerifying(true);
    setResult(null);
    try {
      const res = await onVerify(task.id, evidence);
      if (res.success) {
        setResult(res.data.verification);
      }
    } catch {
      setResult({ passed: false, message: 'Verification request failed.' });
    } finally {
      setVerifying(false);
    }
  };

  const handleComplete = async () => {
    await onComplete(task.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={onClose}>
      <div 
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-navy-900 border border-white/10 rounded-2xl shadow-2xl p-8 animate-fade-in relative scrollbar-hide" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-t-2xl"></div>

        {/* Header */}
        <div className="flex items-start justify-between mb-8 relative z-10 border-b border-white/5 pb-6">
          <div>
            <span className="inline-block px-2.5 py-1 mb-3 text-[10px] font-medium tracking-widest uppercase rounded-full bg-white/5 border border-white/10 text-zinc-400">
              {task.category}
            </span>
            <h2 className="text-xl font-semibold tracking-tight text-white mb-2">{task.title}</h2>
            <div className="flex items-center gap-4 text-xs font-medium text-zinc-500 tracking-wide">
              <span>⏱ Est. {task.estimatedMinutes} min</span>
              <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
              <span>Attempt {task.attemptCount || 1}</span>
              {task.startedAt && (
                <>
                  <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                  <span>Started: {new Date(task.startedAt).toLocaleDateString()}</span>
                </>
              )}
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/10 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Description — parsed for developer clarity */}
        {(() => {
          const raw = task.description || '';
          // Extract key fields from the concatenated string
          const verificationMatch = raw.match(/Verification:\s*(.+)/i);
          const deadlineMatch = raw.match(/Deadline:\s*([^\n]+?)(?:\s*Verification:|$)/i);
          // The first line (before "Checklist Item:") is the actual task instruction
          const instruction = raw.split(/\s*Checklist Item:/i)[0].trim();

          return (
            <div className="mb-8 space-y-4">
              {instruction && (
                <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                  <h6 className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">What to do</h6>
                  <p className="text-sm text-zinc-200 leading-relaxed">{instruction}</p>
                </div>
              )}
              <div className="flex gap-3">
                {deadlineMatch && (
                  <div className="flex-1 bg-black/20 p-3 rounded-xl border border-white/5">
                    <h6 className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">Deadline</h6>
                    <p className="text-xs text-amber-400 font-medium">{deadlineMatch[1].trim()}</p>
                  </div>
                )}
                {verificationMatch && (
                  <div className="flex-1 bg-black/20 p-3 rounded-xl border border-white/5">
                    <h6 className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">Expected Verification</h6>
                    <p className="text-xs text-indigo-300 leading-relaxed">{verificationMatch[1].trim()}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* Pitfall Warnings */}
        {task.pitfalls && task.pitfalls.length > 0 && (
          <div className="mb-8 space-y-3">
            {task.pitfalls.map((p) => (
              <div key={p.id} className="p-4 bg-rose-500/5 border border-rose-500/10 rounded-xl relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500/30 group-hover:bg-rose-500/50 transition-colors"></div>
                <div className="flex items-start gap-3 pl-2">
                  <div className="mt-0.5 bg-rose-500/20 p-1.5 rounded-lg border border-rose-500/30">
                     <svg className="w-4 h-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-rose-200 mb-1">{p.title}</p>
                    <p className="text-xs text-rose-400/80 leading-relaxed">{p.warningMessage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Evidence Submission */}
        {(task.status === 'in_progress' || task.status === 'not_started') && (
          <div className="mb-6 bg-black/20 p-6 rounded-xl border border-white/5 shadow-inner">
            <label className="block text-sm font-medium text-zinc-300 mb-3 tracking-wide">Submit Evidence</label>
            <textarea
              className="w-full bg-black/40 border border-white/10 rounded-xl p-4 font-mono text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 min-h-[140px] resize-y mb-4"
              placeholder={`Paste the output of the verification command here...\n\nExample: ${task.verificationType === 'node_version' ? 'v18.19.0' : task.verificationType === 'text_confirmation' ? 'Done — I completed this step by...' : 'Paste your terminal output'}`}
              value={evidence}
              onChange={(e) => setEvidence(e.target.value)}
            />
            <div className="flex items-center gap-3">
              <button 
                onClick={handleVerify} 
                disabled={verifying || !evidence.trim()} 
                className="px-5 py-2.5 bg-white text-zinc-900 text-xs font-semibold tracking-wide rounded-lg hover:bg-zinc-200 transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
              >
                {verifying ? (
                   <>
                     <svg className="animate-spin -ml-1 mr-1 h-3.5 w-3.5 text-zinc-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                     Verifying
                   </>
                ) : (
                   'Verify Output'
                )}
              </button>
              <button 
                onClick={handleComplete} 
                className="px-5 py-2.5 bg-white/5 border border-white/10 text-zinc-300 text-xs font-medium tracking-wide rounded-lg hover:bg-white/10 hover:text-white transition-colors"
               >
                Mark Complete
              </button>
            </div>
          </div>
        )}

        {/* Verification Result */}
        {result && (
          <div className={`p-5 rounded-xl border mt-6 animate-fade-in flex items-start gap-4 ${
            result.passed
              ? 'bg-emerald-500/10 border-emerald-500/20 shadow-glow-cyan/10'
              : 'bg-rose-500/10 border-rose-500/20'
          }`}>
            <div className={`p-2 rounded-lg shrink-0 ${result.passed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
              {result.passed ? (
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              ) : (
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              )}
            </div>
            <div>
              <p className={`text-sm font-semibold tracking-wide mb-1 ${result.passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                {result.message}
              </p>
              {result.details && (
                <p className="text-[11px] text-zinc-400 font-mono leading-relaxed mt-2 p-3 bg-black/30 rounded border border-white/5">{result.details}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
