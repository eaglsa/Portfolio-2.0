import React, { useEffect, useState } from 'react';

/**
 * A highly tailored screen curtain that displays a completely unique 
 * visual aesthetic and custom typography stream based on the incoming persona.
 */
export default function PersonaCurtain({ targetPersona, onComplete }) {
  const [shouldFadeOut, setShouldFadeOut] = useState(false);

  useEffect(() => {
    // Keep the curtain locked shut for a clean 700ms processing window
    const lockTimeout = setTimeout(() => {
      setShouldFadeOut(true);
    }, 700);

    // Allow 300ms for the hardware-accelerated CSS opacity fade to conclude
    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 1000);

    return () => {
      clearTimeout(lockTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  // 🎭 CARDINAL IDENTITY ARCHITECTURE GENERATOR
  const getCurtainConfig = () => {
    switch (targetPersona) {
      case 'developer':
        return {
          bgClass: 'bg-black text-emerald-400',
          indicatorClass: 'bg-emerald-400',
          borderClass: 'border-neutral-800',
          primaryText: 'Initializing Core Engine...',
          subText: 'Compiling Environment Layers'
        };
      case 'designer':
        return {
          bgClass: 'bg-[#fcfbf7] text-neutral-800',
          indicatorClass: 'bg-neutral-900',
          borderClass: 'border-neutral-200',
          primaryText: 'Curating Visual Gallery...',
          subText: 'Exhibiting Design Artifacts'
        };
      case 'individual':
      default:
        return {
          // Pure stark black and clean bright white editorial treatment
          bgClass: 'bg-black text-white',
          indicatorClass: 'bg-white',
          borderClass: 'border-white/20',
          primaryText: 'Opening Dossier...',
          subText: 'Loading Human Element Architecture'
        };
    }
  };

  const config = getCurtainConfig();

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-300 ease-in-out font-mono ${
        config.bgClass
      } ${shouldFadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="flex flex-col items-start gap-3 px-6">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${config.indicatorClass} animate-ping`} />
          <p className="text-xs tracking-[0.2em] uppercase font-bold">
            {config.primaryText}
          </p>
        </div>
        
        <span className={`text-[10px] opacity-40 uppercase tracking-widest block border-t w-48 pt-2 ${config.borderClass}`}>
          {config.subText}
        </span>
      </div>
    </div>
  );
}