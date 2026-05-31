import React, { useState, useEffect } from 'react';

export default function InitialLoader({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // ⏱️ STATE ENGINE: Organic Loading Pacing Sequencer
  useEffect(() => {
    let timer;
    
    const updateLoading = () => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          const increment = Math.random() * 5 + 2; 
          const nextProgress = Math.min(prevProgress + increment, 100);
          
          const nextInterval = Math.random() * 50 + 40;
          timer = setTimeout(updateLoading, nextInterval);
          return nextProgress;
        } else {
          // Trigger the final screen curtain dissolve action sequence
          setTimeout(() => setIsFading(true), 400);
          setTimeout(() => onLoadingComplete(), 1000); // Hand over rendering control to App.jsx
          return 100;
        }
      });
    };

    updateLoading();
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  // 🖱️ INTERACTIVE MOUSE SURFACE DEPTH ENGINE (Parallax)
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      setParallax({
        x: (clientX - centerX) / 80,
        y: (clientY - centerY) / 80
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const displayVal = Math.floor(progress).toString().padStart(2, '0');

  return (
    <div className={`fixed inset-0 bg-black z-[99999] flex flex-col justify-center items-center font-mono text-white select-none transition-opacity duration-600 ease-in-out ${
      isFading ? 'opacity-0' : 'opacity-100'
    }`}>
      
      {/* Dynamic Keyframe Injection Frame */}
      <style>{`
        @keyframes orbit-eng {
          0% { transform: rotate(0deg) translateX(60px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(60px) rotate(-360deg); }
        }
        @keyframes orbit-des {
          0% { transform: rotate(120deg) translateX(60px) rotate(-120deg); }
          100% { transform: rotate(480deg) translateX(60px) rotate(-480deg); }
        }
        @keyframes orbit-ind {
          0% { transform: rotate(240deg) translateX(60px) rotate(-240deg); }
          100% { transform: rotate(600deg) translateX(60px) rotate(-600deg); }
        }
        @keyframes scanline-anim {
          0% { bottom: 100%; }
          100% { bottom: -100px; }
        }
      `}</style>

      {/* Ambient Scanline Grid Effect Overlay */}
      <div 
        className="w-full h-[100px] z-10 opacity-10 absolute pointer-events-none"
        style={{
          background: 'linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.03) 50%, rgba(0, 0, 0, 0) 100%)',
          animation: 'scanline-anim 8s linear infinite'
        }}
      />

      <main className="flex flex-col items-center">
        {/* Central Orbital Animation Container */}
        <div 
          className="relative w-[120px] h-[120px] mb-12 transition-transform duration-300 ease-out"
          style={{ transform: `translate(${parallax.x}px, ${parallax.y}px)` }}
        >
          {/* Concentric Trajectory Paths */}
          <div className="absolute inset-0 border border-white/10 rounded-full" />
          <div className="absolute inset-0 border border-white/5 rounded-full scale-75" />
          
          {/* Gravitational Anchor Node */}
          <div className="absolute top-50% left-50% -translate-x-1/2 -translate-y-1/2 w-[2px] h-[2px] bg-white shadow-[0_0_20px_2px_#ffffff]" />
          
          {/* Orbital Identity Vector Points */}
          <div className="absolute w-[6px] h-[6px] bg-white rounded-full blur-[0.5px]" style={{ top: '0', left: '0', animation: 'orbit-eng 4s linear infinite' }} />
          <div className="absolute w-[6px] h-[6px] bg-white rounded-full blur-[0.5px]" style={{ top: '0', left: '0', animation: 'orbit-des 4s linear infinite' }} />
          <div className="absolute w-[6px] h-[6px] bg-white rounded-full blur-[0.5px]" style={{ top: '0', left: '0', animation: 'orbit-ind 4s linear infinite' }} />
        </div>

        {/* Dynamic Presentation Metadata Container */}
        <div className="text-center">
          <h1 className="text-[12px] font-semibold text-white uppercase tracking-[0.3em] mb-4">
            Initializing Triad Persona...
          </h1>
          <div className="flex flex-col items-center gap-2">
            {/* Structural Runway Tracker Box */}
            <div className="w-[240px] h-[1px] bg-white/10 relative overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-white transition-all duration-[50ms] linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            {/* Percentage Numeric Tracker Box */}
            <div className="text-[14px] text-white font-medium tracking-widest mt-2">
              {progress === 100 ? 'COMPLETE' : `${displayVal}%`}
            </div>
          </div>
        </div>

        {/* Global Security Sub-Logs Track */}
        <div className="fixed bottom-6 left-6 text-[14px] text-white opacity-30 flex gap-4">
          <span>CORE: v2.4.0</span>
          <span>SECURE_SHELL: ENABLED</span>
        </div>
      </main>
    </div>
  );
}