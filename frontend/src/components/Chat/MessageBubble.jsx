import FormattedMessage from './FormattedMessage';

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex flex-col gap-1 w-full animate-slide-in ${isUser ? 'items-end' : 'items-start'}`}>
      
      {/* Sender identification */}
      <div className={`flex items-center gap-2 mb-1 px-1 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {isUser ? (
          <>
            <div className="text-[11px] font-medium text-zinc-400">You</div>
            <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 border border-white/5">
              <span className="text-[10px] font-bold text-zinc-300">U</span>
            </div>
          </>
        ) : (
          <>
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 border border-indigo-500/30">
              <span className="text-[9px] font-bold text-indigo-400 tracking-wider">AX</span>
            </div>
            <div className="text-[11px] font-medium text-zinc-400">Axiom</div>
          </>
        )}
      </div>

      {/* Bubble Content */}
      <div className={`flex flex-col max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-3 text-[13px] leading-relaxed relative ${
            isUser
              ? 'bg-zinc-800/80 text-zinc-200 rounded-2xl rounded-tr-sm border border-white/5 shadow-sm'
              : 'bg-white/5 text-zinc-300 rounded-2xl rounded-tl-sm border border-white/5 backdrop-blur-sm'
          }`}
        >
          {isUser ? (
            <div className="whitespace-pre-wrap break-words">{message.content}</div>
          ) : (
            <FormattedMessage content={message.content} />
          )}
        </div>

        {/* Sources/References */}
        {message.sources && message.sources.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2 ml-1">
            {message.sources.map((src, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] text-zinc-400 hover:bg-white/10 hover:text-zinc-200 transition-colors cursor-pointer"
              >
                <svg className="w-3 h-3 text-indigo-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {src.title}
              </span>
            ))}
          </div>
        )}

        {/* Confidence/Metadata Context */}
        <div className="flex items-center gap-2 mt-1.5 px-1">
          <p className="text-[9px] text-zinc-600 font-medium tracking-wider uppercase">
            {new Date(message.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
          {message.confidence && message.confidence !== 'high' && !isUser && (
            <>
              <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
              <p className={`text-[9px] font-medium tracking-wide flex items-center gap-1 uppercase ${
                message.confidence === 'low' ? 'text-rose-400/80' : 'text-amber-400/80'
              }`}>
                {message.confidence === 'low' ? 'Verify Output' : 'Medium Confidence'}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
