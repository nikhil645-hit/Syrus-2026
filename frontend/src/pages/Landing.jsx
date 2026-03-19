import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen relative font-sans text-gray-900 bg-white overflow-hidden flex flex-col">
      {/* Background image or gradient */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop')", // Beautiful grassy field and sky
          filter: "brightness(1.1) contrast(0.9)"
        }}
      >
        {/* Soft white overlay for bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/80" />
      </div>

      {/* Floating Navbar */}
      <nav className="relative z-10 w-full max-w-6xl mx-auto mt-6 px-6">
        <div className="bg-white/95 backdrop-blur-md rounded-full px-6 py-3 flex items-center justify-between shadow-sm border border-black/5">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl tracking-tight">Axiom</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-black transition-colors">Templates</a>
            <a href="#" className="hover:text-black transition-colors">Features</a>
            <a href="#" className="hover:text-black transition-colors">FAQ</a>
            <a href="#" className="hover:text-black transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-4 text-sm font-medium">
            <Link to="/login" className="text-gray-700 hover:text-black transition-colors">Log in</Link>
            <Link to="/register" className="px-4 py-2 bg-gray-50/50 border border-gray-200 rounded-full hover:bg-gray-100 transition-colors">Sign up</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center -mt-10 px-4">
        
        {/* Top Tag */}
        <div className="bg-black/80 backdrop-blur-md text-white text-xs font-medium px-4 py-1.5 rounded-full mb-6">
          <span className="opacity-70">Generate it.</span> customize it. <span className="font-bold">launch it.</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-[5rem] font-semibold tracking-tight text-black mb-12">
          Idea to website
        </h1>

        {/* Deep Input Box */}
        <div className="w-full max-w-4xl bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[2rem] p-3 shadow-2xl">
          <div className="w-full bg-white rounded-3xl p-5 flex flex-col gap-4 shadow-sm">
            <textarea 
              className="w-full bg-transparent resize-none outline-none text-xl font-medium text-gray-800 placeholder-gray-400 py-2 h-16"
              placeholder="Make me a clean apple like website for my ai startup"
            />
            
            <div className="flex items-center justify-between mt-2">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-gray-100 text-xs font-medium text-gray-500 hover:bg-gray-50 transition-colors shadow-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                Enhance prompt
              </button>
              
              <div className="flex items-center gap-3">
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-100 text-gray-500 hover:bg-gray-50 shadow-sm transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-100 text-gray-500 hover:bg-gray-50 shadow-sm transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 shadow-md transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Template Cards */}
        <div className="w-full max-w-5xl mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "Personal Trainer", bg: "bg-orange-50" },
            { title: "Dentist", bg: "bg-blue-50" },
            { title: "Italian Restaurant", bg: "bg-red-50" },
            { title: "Real Estate", bg: "bg-gray-100" }
          ].map((item, idx) => (
             <div key={idx} className="bg-white/20 backdrop-blur-md border border-white/40 p-1.5 rounded-2xl cursor-pointer hover:bg-white/30 transition-all group">
               <div className={`w-full aspect-[4/3] rounded-xl relative overflow-hidden ${item.bg} flex items-center justify-center shadow-inner`}>
                  {/* Pseudo preview content */}
                  <div className="w-3/4 h-3/4 bg-white/50 rounded flex flex-col items-center justify-center gap-1 opacity-70 border border-black/5">
                    <div className="w-8 h-2 bg-black/10 rounded mb-2"></div>
                    <div className="w-16 h-1 bg-black/5 rounded"></div>
                    <div className="w-12 h-1 bg-black/5 rounded"></div>
                  </div>
                  
                  {/* Title Overlay overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 text-white text-xs font-semibold tracking-wide">
                    {item.title}
                  </div>
                  <div className="absolute bottom-3 right-3 text-white/70 group-hover:text-white transition-colors">
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                  </div>
               </div>
             </div>
          ))}
        </div>

      </main>
    </div>
  );
}
