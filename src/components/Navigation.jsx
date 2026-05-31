import React from 'react';

export default function Navigation({ activePersona, setActivePersona }) {
  return (
    <header className="fixed top-8 left-0 right-0 z-[100] flex justify-center">
      <nav className="flex items-center gap-1 bg-black/60 backdrop-blur-xl rounded-full px-2 py-2 border border-white/10 shadow-2xl">
        
        {/* DESIGNER BUTTON */}
        <button 
          onClick={() => setActivePersona('designer')}
          className={`px-6 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 ${
            activePersona === 'designer' 
              ? 'bg-white text-black' 
              : 'text-gray-500 hover:text-white'
          }`}
        >
          
          <span>DESIGNER</span>
        </button>

        {/* INDIVIDUAL BUTTON */}
        <button 
          onClick={() => setActivePersona('individual')}
          className={`px-6 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 ${
            activePersona === 'individual' 
              ? 'bg-white text-black' 
              : 'text-gray-500 hover:text-white'
          }`}
        >
          
          <span>INDIVIDUAL</span>
        </button>

        {/* DEVELOPER BUTTON */}
        <button 
          onClick={() => setActivePersona('developer')}
          className={`px-6 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 ${
            activePersona === 'developer' 
              ? 'bg-white text-black' 
              : 'text-gray-500 hover:text-white'
          }`}
        >
          
          <span>DEVELOPER</span>
        </button>

      </nav>
    </header>
  );
}