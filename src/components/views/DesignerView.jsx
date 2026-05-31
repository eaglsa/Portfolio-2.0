import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
// 1. Add import statement at the top
import useTypewriter from '../../hooks/useTypewriter';

// A bulletproof function to format a specific word dynamically as it types out
const formatHeadline = (fullTypedText, wordToHighlight) => {
  if (!fullTypedText) return '';
  if (!wordToHighlight || !fullTypedText.includes(wordToHighlight)) {
    return fullTypedText;
  }

  // Split safely based on the highlight target
  const parts = fullTypedText.split(wordToHighlight);
  
  return (
    <>
      {parts[0]}
      <span className="italic font-serif font-light tracking-wide">
        {wordToHighlight}
      </span>
      {parts[1]}
    </>
  );
};

export default function DesignerView() {
  const [designProjects, setDesignProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Change the text inside the quotes whenever you want!
  const headlineString = "Where code takes a break and creativity takes over.";
  const typedHeadline = useTypewriter(headlineString, 45, 150);

  // 🔄 LIVE STREAM PIPELINE: Fetch data from projects table filtered by designer persona
  useEffect(() => {
    async function streamDesignProjects() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('persona_type', 'designer')
          .order('id', { ascending: true }); // Display in creation sequencing

        if (error) throw error;
        if (data) setDesignProjects(data);
      } catch (err) {
        console.error("Error connecting to designer project stream:", err.message);
      } finally {
        setLoading(false);
      }
    }

    streamDesignProjects();
  }, []);

  // Helper utility function to parse out clean hashtag chips
  const parseTags = (tagString) => {
    if (!tagString) return [];
    return tagString.split(',').map(tag => tag.trim().toLowerCase());
  };

  // Horizontal button slide controller interaction
  const scrollSlider = (sliderId, offset) => {
    const element = document.getElementById(sliderId);
    if (element) {
      element.scrollLeft += offset;
    }
  };

  // 🗂️ GROUPING ENGINE: Separates projects into arrays grouped by their sub_category
  const groupedCategories = designProjects.reduce((acc, project) => {
    const catName = project.sub_category || 'Uncategorized Works';
    if (!acc[catName]) acc[catName] = [];
    acc[catName].push(project);
    return acc;
  }, {});

  return (
    <div className="bg-[#fcfbf7] text-[#1a1a1a] font-sans antialiased animate-fadeIn selection:bg-neutral-900 selection:text-white px-6 md:px-12 max-w-7xl mx-auto">
      
      {/* 🎨 GALLERY HERO HEADER */}
      <header className="mb-24 grid grid-cols-12 gap-6 pt-16">
        <div className="col-span-12 lg:col-span-8">
          <h1 className="font-serif text-[44px] md:text-[64px] leading-[1.1] text-[#1a1a1a] mb-8 tracking-tight min-h-[120px] md:min-h-[160px]">
      {/* Call the formatter and tell it to look for "resonate" */}
      {formatHeadline(typedHeadline, "creativity")}
      <span className="inline-block w-1 h-8 md:h-12 bg-[#1a1a1a] ml-2 align-middle animate-[pulse_1s_infinite]"></span>
    </h1>
          <p className="text-base md:text-lg text-neutral-500 max-w-xl leading-relaxed tracking-wide">
            A collection of posters, invitation cards and packaging designs made for real events and real people. Clean, purposeful, and built to stand out.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-4 flex flex-col justify-end items-start lg:items-end text-left lg:text-right">
          <div className="border-t border-neutral-200 pt-6 w-full max-w-[240px] mt-8 lg:mt-0">
            <span className="text-[10px] font-bold tracking-[0.2em] text-neutral-400 block mb-2 uppercase">CURATED BY</span>
            <span className="font-serif italic text-xl text-[#1a1a1a]">The Gallery Dir.</span>
          </div>
        </div>
      </header>

      {/* 🖼️ DYNAMIC SECTION LOOP GENERATOR */}
      {loading ? (
        <div className="py-24 border-t border-neutral-200 text-center">
          <p className="font-mono text-xs text-neutral-400 animate-pulse">&gt; Loading live exhibition visual catalog assets...</p>
        </div>
      ) : Object.keys(groupedCategories).length === 0 ? (
        <div className="py-24 border-t border-neutral-200 text-left">
          <p className="font-mono text-xs text-neutral-400">// No dynamic artifacts uploaded inside designer schema layers.</p>
        </div>
      ) : (
        <div className="space-y-24">
          {Object.entries(groupedCategories).map(([categoryTitle, items], index) => {
            const sliderId = `slider-${index}`;
            return (
              <section key={categoryTitle} className="scroll-mt-24">
                
                {/* Section Horizontal Header Label Controls */}
                <div className="flex justify-between items-end mb-8 border-b border-neutral-200 pb-3">
                  <h2 className="font-serif text-2xl md:text-3xl italic text-[#1a1a1a]">
                    {categoryTitle}
                  </h2>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => scrollSlider(sliderId, -400)}
                      className="w-9 h-9 border border-neutral-200 rounded-full flex items-center justify-center text-neutral-500 hover:bg-[#1a1a1a] hover:text-[#fcfbf7] transition-colors duration-300"
                    >
                      <span className="text-sm">←</span>
                    </button>
                    <button 
                      onClick={() => scrollSlider(sliderId, 400)}
                      className="w-9 h-9 border border-neutral-200 rounded-full flex items-center justify-center text-neutral-500 hover:bg-[#1a1a1a] hover:text-[#fcfbf7] transition-colors duration-300"
                    >
                      <span className="text-sm">→</span>
                    </button>
                  </div>
                </div>

                {/* Horizontal Image Scroll Runway Box */}
                <div 
                  id={sliderId}
                  className="flex gap-6 overflow-x-auto snap-x scroll-smooth pb-6"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {items.map((project) => (
                    <div 
                      key={project.id} 
                      className="w-[80vw] sm:w-[45%] md:w-[31%] flex-shrink-0 snap-start group"
                    >
                      {/* Interactive External Redirect Anchor Frame */}
                      <a 
                        href={project.live_link || project.image_url} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="block bg-[#fcfbf7] p-4 border border-neutral-100 shadow-sm rounded-sm transition-all duration-700 group-hover:shadow-md cursor-alias overflow-hidden"
                      >
                        <div className="overflow-hidden bg-neutral-50 rounded-sm">
                          {/* Maintained a strict structural 4:3 art aspect matrix */}
                          <img 
                            alt={project.title} 
                            className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-[1.02]" 
                            src={project.image_url} 
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/600x450?text=Asset+Exhibited+In+Cloud";
                            }}
                          />
                        </div>
                      </a>

                      {/* Graphic Asset Description Footer Text */}
                      <div className="mt-4 flex flex-col space-y-3 px-1">
                        <div className="space-y-1">
                          <p className="font-serif text-xl text-[#1a1a1a] tracking-tight truncate">
                            {project.title}
                          </p>
                          <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed font-sans min-h-[32px]">
                            {project.description}
                          </p>
                        </div>
                        
                        {/* Tokenized Styling Hashtags */}
                        <div className="flex flex-wrap gap-1.5 font-mono text-[9px] text-neutral-400 font-semibold uppercase tracking-wider">
                          {parseTags(project.tech_tags).map((tag, i) => (
                            <span key={i} className="bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-sm">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  ))}
                </div>

              </section>
            );
          })}
        </div>
      )}

      {/* 🏁 EXHIBIT GALLERY SYSTEM FOOTER */}
      <footer className="mt-32 pt-12 pb-16 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center gap-6 text-neutral-500">
        <div className="flex items-center gap-4">
          <span className="font-serif italic text-xl text-[#1a1a1a]">The Exhibit.</span>
        </div>
        <div className="flex gap-8 text-xs font-bold tracking-widest text-neutral-600">
          <a 
          href="mailto:muhammedshebin.valangattil@gmail.com" 
          rel="noreferrer" 
          onClick={() => {
            // Quietly captures your email to their clipboard if their mail client protocol fails
            navigator.clipboard.writeText("muhammedshebin.valangattil@gmail.com");
          }}
          className="hover:text-[#1a1a1a] transition-colors cursor-pointer"
        >
          [ INQUIRIES ]
        </a>
          <a className="hover:text-[#1a1a1a] transition-colors" href="https://pin.it/2kEKos1X7" target="_blank" rel="noreferrer">[ ARCHIVE ]</a>
        </div>
        <p className="text-[9px] font-bold tracking-widest text-neutral-300 uppercase">© 2026 PORTFOLIO — BUILT WITH INTENTION</p>
      </footer>

    </div>
  );
}