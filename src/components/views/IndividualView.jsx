import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../config/supabaseClient';

export default function IndividualView() {
  const [activeTab, setActiveTab] = useState('education');
  const [timelineItems, setTimelineItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  // 🎬 MOVIE SUBTITLE ENGINE CONFIGURATION STATE
  // Customize your headline string directly here at any time
  // 1. Swap out your old text string for this new one:
// 🎬 SINGLE LOOP MULTI-LINE SUBTITLE ENGINE
  const fullHeadlineText = "Hi, I'm Muhammed Shebin. An Engineer & Creator.";
  const wordsArray = fullHeadlineText.split(' ');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const sliderRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  // 1. Add this new ref tracker at the top of your component body
  const socialsSectionRef = useRef(null);
  // 2. Paste this smooth scroll handler function
  const scrollToSocials = () => {
  if (socialsSectionRef.current) {
    socialsSectionRef.current.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' // Standardizes vertical centering in the viewport
    });
  }
  }; 

  // ⏱️ CINEMATIC WORD TICKER SEQUENCER
  useEffect(() => {
    setCurrentWordIndex(0);
    const timer = setInterval(() => {
      setCurrentWordIndex((prevIndex) => {
        if (prevIndex < wordsArray.length - 1) {
          return prevIndex + 1;
        } else {
          clearInterval(timer);
          return prevIndex;
        }
      });
    }, 350);

    return () => clearInterval(timer);
  }, [fullHeadlineText]);

  // 🔄 LIVE STREAM PIPELINE: Fetch matching rows whenever the active tab switches
  useEffect(() => {
    async function getTrajectoryStream() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('trajectory')
          .select('*')
          .eq('category', activeTab)
          .order('created_at', { ascending: true }); // Chronological sequencing

        if (error) throw error;
        if (data) setTimelineItems(data);
      } catch (err) {
        console.error("Error streaming from trajectory table:", err.message);
      } finally {
        setLoading(false);
      }
    }

    getTrajectoryStream();
  }, [activeTab]);

  // MEDIUM ARTICLES EFFECT HOOK
  useEffect(() => {
    async function fetchMediumArticles() {
      const mediumUsername = '@muhammedshebin2006'; 
      const rssUrl = `https://medium.com/feed/${mediumUsername}`;
      const convertApiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

      try {
        const response = await fetch(convertApiUrl);
        const data = await response.json();
        if (data.status === 'ok') {
          setArticles(data.items.slice(0, 3));
        }
      } catch (err) {
        console.error("Error fetching articles:", err);
      } finally {
        setLoadingArticles(false);
      }
    }
    fetchMediumArticles();
  }, []);

  // CLEAN SNIPPET UTILITY FUNCTION
  const getCleanSnippet = (htmlContent) => {
    if (!htmlContent) return 'View full publication story details on my Medium channel stream profile...';
    const textOnly = String(htmlContent).replace(/<[^>]*>/g, '');
    return textOnly.substring(0, 120) + '...';
  };

  // MOUSE EVENT HANDLERS FOR TIMELINE SLIDER
  const handleMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  const handleMouseLeaveOrUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div className="text-white animate-fadeIn max-w-7xl mx-auto px-6 md:px-12">
      {/* HERO SECTION */}
      <section className="min-h-[75vh] flex items-center pt-16 pb-20">
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 relative">
        {/* The container class matrix handles automatic grayscale and contrast amplification */}
        <div className="aspect-[3/4] overflow-hidden grayscale contrast-125 hover:contrast-100 transition-all duration-700 border border-white/10 rounded-sm group">
          <img 
            src="/me.jpeg" // 👈 Add your real image file path here
            alt="Muhammed Shebin"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
          />
        </div>
      </div>
          <div className="md:col-span-7 flex flex-col gap-8 lg:pl-6">
            
      {/* 🎬 DYNAMIC SUBTITLE GRAPHIC MATRIX HEADER */}
      {/* 🎬 DYNAMIC SUBTITLE GRAPHIC MATRIX HEADER */}
      <h1 className="tracking-tight text-white leading-[1] min-h-[140px] md:min-h-[180px]">
        {wordsArray.map((word, index) => {
          // Strips punctuation to accurately match target keys
          const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
          const isMyName = cleanWord.toLowerCase() === "muhammed" || cleanWord.toLowerCase() === "shebin";
          
          // Detect the start of the second row to force the layout break
          const isLineBreakTarget = cleanWord.toLowerCase() === "an";
          
          // Base animation text matrix states with tight, clean natural word margins
          let textClass = "transition-all duration-500 ease-out inline-block mr-2 md:mr-3.5";
          if (index === currentWordIndex) {
            textClass += " text-white brightness-125 scale-[1.01] duration-150";
          } else if (index < currentWordIndex) {
            textClass += " text-white/90";
          } else {
            textClass += " text-white/20";
          }

          return (
            <React.Fragment key={index}>
              {/* Force the second line down explicitly */}
              {isLineBreakTarget && <br />}
              
              {isMyName ? (
                /* 💎 LINE 1 DESIGN: Large, premium luxury serif italic typography */
                <span className={`${textClass} font-serif italic font-normal text-3xl sm:text-5xl lg:text-6xl text-neutral-200 underline underline-offset-8 decoration-neutral-600 mr-2.5 md:mr-4.5`}>
                  {word}
                </span>
              ) : (
                /* 💻 LINE 2 DESIGN: Scaled up to perfectly fill the horizontal grid line layout frame */
                <span className={`${textClass} font-sans font-bold ${
                  index >= wordsArray.findIndex(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase() === "an")
                    ? "text-xl sm:text-3xl lg:text-[48px] opacity-80" 
                    : "text-3xl sm:text-5xl lg:text-6xl"
                }`}>
                  {word}
                </span>
              )}
            </React.Fragment>
          );
        })}
      </h1>

            <p className="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed">
              I get curious, I build things — software, hardware, and everything in between. A CSE student who turns everyday problems into working solutions. These days I'm deep into backend development and DevOps — and honestly loving it.
            </p>
            <div className="pt-2">
              {/* 3. Updated text to 'Contact Me' and attached our scrollToSocials executor onClick */}
              <button 
                onClick={scrollToSocials}
                className="px-12 py-4 border border-white text-white text-xs uppercase tracking-widest transition-all duration-300 hover:bg-white hover:text-black font-semibold cursor-pointer"
              >
                Contact Me
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bound our socialsSectionRef target node directly to this layout entry point */}
      <div 
        ref={socialsSectionRef} 
        className="border-t border-b border-white/10 py-12 my-12 scroll-mt-12"
      >
        <div className="flex flex-wrap justify-center gap-x-16 gap-y-6">
          <a href="https://www.instagram.com/_muhd.shxx_/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors text-xs font-semibold uppercase tracking-[0.2em]">instagram</a>
          <a href="https://www.linkedin.com/in/muhammed-shebin-14755436b/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors text-xs font-semibold uppercase tracking-[0.2em]">linkedin</a>
          <a href="https://x.com/muhamme52101958" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors text-xs font-semibold uppercase tracking-[0.2em]">x (twitter)</a>
          <a href="https://medium.com/@muhammedshebin2006" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors text-xs font-semibold uppercase tracking-[0.2em]">medium</a>
          <a href="mailto:muhammedshebin2006@gmail.com" 
              rel="noreferrer" 
              onClick={(e) => {
                // 1. Prevent any weird browser blank-page window popping loops
                // 2. Automatically capture your address straight to their system clipboard
                navigator.clipboard.writeText("muhammedshebin2006@gmail.com");
                
                // 3. Optional: Print a temporary confirmation statement in the browser console
                console.log("Email address copied safely to system clipboard clip array.");
              }}
              className="text-gray-400 hover:text-white transition-colors text-xs font-semibold uppercase tracking-[0.2em] group relative"
            >
              Email
              {/* 💎 Elite UX Tooltip: Hovering over the link flashes a tiny reminder message */}
              <span className="absolute left-1/2 -translate-x-1/2 -top-8 bg-neutral-900 border border-neutral-800 text-[10px] px-2 py-1 rounded text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap normal-case font-mono">
                Click to open app & copy address
              </span>
            </a>
        </div>
      </div>

      {/* TRAJECTORY INTERACTIVE TIMELINE WORKSPACE */}
      <section className="py-16 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Trajectory</h2>
          
          <div className="flex gap-8 border-b border-white/5 pb-2">
            {['education', 'positions', 'achievements'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`text-xs uppercase tracking-widest pb-2 transition-all duration-300 relative font-semibold ${
                  activeTab === cat ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {cat}
                {activeTab === cat && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="relative pt-20">
          <div className="absolute top-[84px] left-0 right-0 h-[1px] bg-white/20" />
          
          <div 
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
            className="flex gap-12 overflow-x-auto pb-12 select-none cursor-grab active:cursor-grabbing scrollbar-thin"
          >
            {loading ? (
              <div className="min-w-full py-8 text-left">
                <p className="font-mono text-sm text-emerald-400 animate-pulse">&gt; Initializing Supabase cloud pipeline stream...</p>
              </div>
            ) : timelineItems.length === 0 ? (
              <div className="min-w-full py-8 text-left">
                <p className="font-mono text-sm text-neutral-500">// No entries discovered inside table for selection: "{activeTab}"</p>
              </div>
            ) : (
              timelineItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="min-w-[320px] md:min-w-[400px] flex-shrink-0 relative pt-1"
                  style={{
                    animation: 'fadeIn 0.6s ease-out forwards',
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="absolute top-0 left-0 w-4 h-4 bg-white rounded-full -translate-y-2 z-10 border-4 border-black" />
                  
                  <div className="mt-8 border-l border-white/10 pl-6 py-2">
                    <span className="font-mono text-xs text-gray-500 block mb-2">{item.date_range}</span>
                    <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">{item.title}</h3>
                    <p className="text-xs uppercase text-gray-400 mb-6 tracking-wider font-semibold">{item.organization}</p>
                    <div className="text-sm text-gray-400 leading-relaxed whitespace-pre-line max-w-sm">
                      {item.description}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ARTICLES WRITINGS PREVIEWS CONTAINER */}
      <section className="py-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Writings</h2>
            <a href="https://medium.com/@muhammedshebin2006" target="_blank" rel="noreferrer" className="text-xs font-semibold tracking-wider text-white hover:opacity-60 transition-opacity uppercase">Medium Profile</a>
          </div>
          
          <div className="divide-y divide-white/10">
            {loadingArticles ? (
              <p className="font-mono text-xs text-neutral-500 animate-pulse">&gt; Fetching live stories from Medium...</p>
            ) : articles.length === 0 ? (
              <p className="font-mono text-xs text-neutral-500">// No published stories discovered on this profile feed.</p>
            ) : (
              articles.map((article, i) => (
                <a key={i} href={article.link} target="_blank" rel="noreferrer" className="group block py-12 transition-all duration-300 px-4">
                  <div className="flex justify-between items-center gap-6">
                    <div className="space-y-2 max-w-3xl">
                      <span className="font-mono text-xs text-gray-500 block uppercase tracking-widest">
                        {new Date(article.pubDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </span>
                      <h4 className="text-2xl md:text-3xl text-white tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                        {article.title}
                      </h4>
                      <p className="text-sm text-neutral-500 leading-relaxed font-sans pt-1">
                        {getCleanSnippet(article.content || article.description)}
                      </p>
                    </div>
                    <span className="text-gray-500 group-hover:text-white transition-all duration-300 text-2xl flex-shrink-0">↗</span>
                  </div>
                </a>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}