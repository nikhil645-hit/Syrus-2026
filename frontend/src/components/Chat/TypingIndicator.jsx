export default function TypingIndicator() {
  return (
    <div className="flex flex-col gap-1 w-full animate-fade-in items-start">
      <div className="flex items-center gap-2 mb-1 px-1 flex-row">
        <div className="w-5 h-5 rounded-md bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 border border-indigo-500/30">
          <span className="text-[9px] font-bold text-indigo-400 tracking-wider">AX</span>
        </div>
        <div className="text-[11px] font-medium text-zinc-400">Axiom <span className="text-zinc-600 italic">is typing...</span></div>
      </div>
      
      <div className="flex flex-col max-w-[85%] items-start">
        <div className="px-5 py-3.5 bg-white/5 rounded-2xl rounded-tl-sm border border-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-1.5 opacity-70">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
