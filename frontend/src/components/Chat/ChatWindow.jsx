import { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

export default function ChatWindow({ messages, loading, error, sendMessage, loadHistory }) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const msg = input;
    setInput('');
    await sendMessage(msg);
    inputRef.current?.focus();
  };

  return (
    <div className="flex min-w-0 flex-col h-full bg-navy-900/40 relative">
      
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-navy-800/50 backdrop-blur-md z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 border border-indigo-500 flex items-center justify-center relative">
            <span className="text-white font-bold text-sm tracking-wider">AX</span>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-navy-800 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-tight">Axiom <span className="text-zinc-500 font-normal">v2</span></h3>
            <p className="text-[11px] text-zinc-500 font-medium">Autonomous Onboarding Agent</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden p-6 space-y-6 custom-scrollbar relative z-10">
        {messages.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-full max-h-[400px]">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">How can I assist you?</h3>
            <p className="text-sm text-zinc-500 text-center max-w-sm mb-8 leading-relaxed">
              I'm Axiom, an autonomous agent tasked with guiding your setup. Ask about documentation, architecture, or request a review of your ongoing tasks.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-lg">
              {['Walk me through local env setup', 'What are our code reviewing standards?', 'Explain the database schema', 'Verify my starter ticket'].map((q) => (
                <button key={q} onClick={() => { setInput(q); }}
                  className="text-xs text-left px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-zinc-300 hover:bg-indigo-500/10 hover:border-indigo-500/30 hover:text-indigo-300 transition-all shadow-sm">
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <MessageBubble key={msg.id || i} message={msg} />
        ))}

        {loading && <TypingIndicator />}

        {error && (
          <div className="text-center text-xs text-rose-400 py-2 p-2 bg-rose-500/10 border border-rose-500/20 rounded-lg mx-auto w-fit">{error}</div>
        )}

        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Input */}
      <div className="p-4 bg-navy-900 shrink-0 z-10 border-t border-white/5">
        <form onSubmit={handleSend} className="relative max-w-4xl mx-auto group">
          <input
            ref={inputRef}
            className="w-full pl-5 pr-14 py-3.5 bg-black/40 border border-white/10 rounded-2xl text-sm
                       text-zinc-200 placeholder-zinc-500 shadow-inner
                       focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 focus:bg-black/60
                       transition-all duration-300"
            placeholder="Message Axiom... (⌘K for prompts)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button 
            type="submit" 
            className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all duration-300
              ${!input.trim() || loading 
                ? 'bg-transparent text-zinc-600' 
                : 'bg-indigo-600 text-white shadow-sm hover:scale-105 active:scale-95'}`}
            disabled={loading || !input.trim()}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </form>
        <div className="text-center mt-2">
            <span className="text-[10px] text-zinc-600 tracking-wider">Axiom may produce inaccurate information about internal code.</span>
        </div>
      </div>
    </div>
  );
}
