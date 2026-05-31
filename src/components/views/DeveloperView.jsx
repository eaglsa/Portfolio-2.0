import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';

export default function DeveloperView() {
  const [devProjects, setDevProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // ⚡ FAST CODING TERMINAL STATE SYSTEM
  const rawJsonLines = [
    '{',
    '  "role": "Developer. Tinkerer. Builder.",',
    '  "specialization": "Backend Systems & DevOps",',
    '  "also_into": "Hardware Tinkering & AI",',
    '  "status": "Open to internships, freelance & cool projects",',
    '  "location": "Kerala // India"',
    '}'
  ];

  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  // 🔄 LIVE STREAM PIPELINE: Fetch data from projects table filtered by persona_type
  useEffect(() => {
    async function streamDevProjects() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('persona_type', 'developer')
          .order('id', { ascending: false }); // Show newest software builds first

        if (error) throw error;
        if (data) setDevProjects(data);
      } catch (err) {
        console.error("Error connecting to project streaming layers:", err.message);
      } finally {
        setLoading(false);
      }
    }

    streamDevProjects();
  }, []);

  // ⏱️ HIGH-SPEED TERMINAL CHAR RECOGNITION TICKER
  useEffect(() => {
    if (currentLineIndex >= rawJsonLines.length) return;

    const currentFullLine = rawJsonLines[currentLineIndex];

    const typingInterval = setInterval(() => {
      if (currentCharIndex < currentFullLine.length) {
        // Append characters directly to the current tracking line string vector
        setDisplayedLines((prev) => {
          const updated = [...prev];
          if (!updated[currentLineIndex]) {
            updated[currentLineIndex] = "";
          }
          updated[currentLineIndex] += currentFullLine.charAt(currentCharIndex);
          return updated;
        });
        setCurrentCharIndex((prev) => prev + 1);
      } else {
        // Finished typing the line, advance cleanly to the next one
        clearInterval(typingInterval);
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }
    }, 12); // ⚡ Ultra-fast 12ms character printing baseline speed

    return () => clearInterval(typingInterval);
  }, [currentLineIndex, currentCharIndex]);

  // Helper utility function to cleanly parse string tags (e.g., "react, python" into an array)
  const parseTags = (tagString) => {
    if (!tagString) return [];
    return tagString.split(',').map(tag => tag.trim());
  };

  return (
    <div className="font-mono selection:bg-emerald-500 selection:text-black max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-24 text-neutral-300">
      
      {/* 💻 TERMINAL HEADER WORKSPACE */}
      <header className="max-w-5xl mx-auto mt-4">
        <div className="border border-neutral-800 rounded-lg bg-black overflow-hidden shadow-2xl">
          {/* Window Bar OS Controls */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#0d1117] border-b border-neutral-800">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <div className="ml-4 text-neutral-500 text-[11px] font-semibold opacity-80">zsh — capabilities.json</div>
          </div>
          
          {/* Active Terminal Input Command Block */}
          <div className="p-6 md:p-8">
            <div className="flex items-start gap-3 text-sm md:text-base">
              <span className="text-emerald-400 font-bold">&gt;</span>
              <span className="text-white">
                ~/terminal/root <span className="text-neutral-500">$</span> cat capabilities.json
              </span>
            </div>
            
            {/* Dynamic Compilation Stream Container */}
            <div className="mt-6 text-sm text-neutral-300 leading-relaxed bg-neutral-950 p-5 border border-neutral-900 rounded-md min-h-[160px]">
              <pre className="whitespace-pre-wrap font-mono text-emerald-400 font-medium tracking-wide">
                {displayedLines.map((line, index) => (
                  <div key={index} className="min-h-[20px]">
                    {line}
                    {index === currentLineIndex && (
                      <span className="inline-block w-2 h-4 bg-emerald-400 ml-1 animate-[pulse_0.8s_infinite] align-middle" />
                    )}
                  </div>
                ))}
              </pre>
            </div>
          </div>
        </div>
      </header>

      {/* 🌐 TECHNICAL PROFILES HUB */}
      <section className="mt-8 max-w-5xl mx-auto">
        <div className="flex flex-wrap gap-x-8 gap-y-4 border-b border-neutral-800 pb-8 text-neutral-400">
          <a href="https://github.com/eaglsa" target="_blank" rel="noreferrer" className="text-xs hover:text-emerald-400 transition-colors uppercase tracking-wider font-semibold">[ github ]</a>
          <a href="https://www.hackerrank.com/profile/muhammedshebin21" target="_blank" rel="noreferrer" className="text-xs hover:text-emerald-400 transition-colors uppercase tracking-wider font-semibold">[ hackerrank ]</a>
          <a href="https://leetcode.com/u/eaglsa/" target="_blank" rel="noreferrer" className="text-xs hover:text-emerald-400 transition-colors uppercase tracking-wider font-semibold">[ leetcode ]</a>
          <a href="https://www.skills.google/public_profiles/24b6a40b-a0f5-4db0-b4bd-1b2bbd3467c3" target="_blank" rel="noreferrer" className="text-xs hover:text-emerald-400 transition-colors uppercase tracking-wider font-semibold">[ google skills ]</a>
          <a href="https://learn.microsoft.com/en-us/users/muhammedshebin-4632/" target="_blank" rel="noreferrer" className="text-xs hover:text-emerald-400 transition-colors uppercase tracking-wider font-semibold">[ microsoft learn ]</a>
          
        </div>
      </section>

      {/* 🏷️ TECH STACK HIGHLIGHT VARIABLES */}
      <section className="mt-8 max-w-5xl mx-auto">
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-neutral-500">
          <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-yellow-300" />python</div>
          <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />django</div>
          <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />react</div>
          <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500" />sql</div>
          <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-400" />git</div>
          <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-700" />docker</div>
          <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" />aws</div>
          <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" />azure</div>
        </div>
      </section>

      {/* 🗄️ PROJECT GRID: VERTICAL COMPILATION STACK */}
      <main className="mt-16 max-w-5xl mx-auto pb-16">
        {loading ? (
          <div className="py-12 border-t border-neutral-800">
            <p className="text-emerald-400 animate-pulse text-xs">&gt; Querying active code repositories from cloud clusters...</p>
          </div>
        ) : devProjects.length === 0 ? (
          <div className="py-12 border-t border-neutral-800">
            <p className="text-neutral-500 text-xs">// No matching software builds deployed inside project database grid.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {devProjects.map((project) => (
              <article key={project.id} className="group border-t border-neutral-900 pt-12 flex flex-col md:flex-row gap-8">
                
                {/* Microframe Mockup Image Display */}
                <div className="w-full md:w-1/3 aspect-video border border-neutral-900 overflow-hidden bg-[#0d1117] rounded-sm relative">
                  {project.image_url ? (
                    <img 
                      alt={project.title} 
                      className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-70 transition-all duration-500" 
                      src={project.image_url} 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-neutral-600 uppercase tracking-widest">
                      [ Code Base Preview ]
                    </div>
                  )}
                </div>

                <div className="flex-grow space-y-4">
                  {/* ROW 1: Title and Deployed Context Identifier Label */}
                  <div className="flex justify-between items-baseline gap-4">
                    <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <span className="text-[10px] text-neutral-500 font-mono font-bold uppercase tracking-widest bg-neutral-900 px-3 py-1 border border-neutral-800 rounded-sm whitespace-nowrap">
                      {project.project_type || 'PERSONAL BUILD'}
                    </span>
                  </div>
                  
                  {/* ROW 2: Description Block */}
                  <p className="text-neutral-400 text-sm leading-relaxed max-w-2xl font-sans">
                    {project.description}
                  </p>

                  {/* ROW 3: Dedicated Hashtag Token Chips */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-emerald-400/80 pt-1">
                    {parseTags(project.tech_tags).map((tag, i) => (
                      <span key={i}>#{tag.toLowerCase()}</span>
                    ))}
                  </div>

                  {/* ROW 4: Clear Target Redirect Actions */}
                  <div className="flex gap-8 pt-2">
                    {project.github_link && (
                      <a 
                        href={project.github_link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-white hover:text-emerald-400 text-xs font-semibold transition-colors"
                      >
                        [ view_codebase ]
                      </a>
                    )}
                    {project.live_link && (
                      <a 
                        href={project.live_link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-white hover:text-emerald-400 text-xs font-semibold transition-colors"
                      >
                        [ live_demo ]
                      </a>
                    )}
                  </div>
                </div>

              </article>
            ))}
          </div>
        )}
      </main>

      {/* 🎛️ SYSTEM ENVIRONMENT FOOTER MONITOR */}
      <footer className="fixed bottom-0 left-0 right-0 bg-black border-t border-neutral-800 px-6 py-2 flex justify-between items-center text-[10px] text-neutral-500 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="text-emerald-400 text-xs">⎇</span>
            <span>master</span>
          </div>
          <div className="flex items-center gap-1">
            <span>●</span>
            <span>origin/remote-sync</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span>ln 102, col 12</span>
          <span>UTF-8</span>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </footer>

    </div>
  );
}