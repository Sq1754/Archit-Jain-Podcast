import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Clock, 
  ArrowDown, 
  Pause, 
  ExternalLink 
} from 'lucide-react';
import { Episode } from '../types';
import { sanitizeSafeUrl } from '../utils/security';

interface HeroCarouselProps {
  episodes: Episode[];
  onScrollToShelves: () => void;
  onQuickInfo?: (episode: Episode) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ 
  episodes, 
  onScrollToShelves,
}) => {
  // Featured episodes for main hero carousel
  const heroEpisodes = episodes.filter(ep => ep.featured);
  const filmstripEpisodes = episodes.slice(0, 8); // Thumbnails for filmstrip

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentEpisode = heroEpisodes[currentIndex] || episodes[0];
  const prevIndex = (currentIndex - 1 + heroEpisodes.length) % heroEpisodes.length;
  const nextIndex = (currentIndex + 1) % heroEpisodes.length;
  const prevEpisode = heroEpisodes[prevIndex];
  const nextEpisode = heroEpisodes[nextIndex];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroEpisodes.length);
  }, [heroEpisodes.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + heroEpisodes.length) % heroEpisodes.length);
  }, [heroEpisodes.length]);

  // Auto-rotating every 6s, pausable on hover
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      handleNext();
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, handleNext]);

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) handleNext();
    else if (distance < -50) handlePrev();
  };

  const handleSelectFromFilmstrip = (ep: Episode) => {
    const featuredIdx = heroEpisodes.findIndex(e => e.id === ep.id);
    if (featuredIdx !== -1) {
      setCurrentIndex(featuredIdx);
    }
  };

  return (
    <section 
      id="hero"
      className="relative w-full overflow-hidden bg-[#0A0A0A] pt-20 sm:pt-24 lg:pt-28 pb-6 sm:pb-8 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4FF00]/6 rounded-full blur-[140px] pointer-events-none" />

      {/* 3D STAGE CONTAINER WITH LEFT & RIGHT MARGINS */}
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16">
        
        {/* Perspective wrapper for 3D depth */}
        <div 
          className="relative flex items-center justify-center py-2"
          style={{ perspective: '1600px' }}
        >
          {/* 3D LEFT PEEK BANNER (Previous Slide in 3D depth) */}
          <div 
            onClick={handlePrev}
            className="hidden xl:block absolute -left-12 2xl:-left-16 w-72 h-[480px] rounded-3xl overflow-hidden cursor-pointer z-10 transition-all duration-700 ease-out transform -rotate-y-[22deg] scale-[0.84] opacity-35 hover:opacity-75 hover:scale-[0.88] hover:-rotate-y-[12deg] shadow-2xl border border-neutral-800"
            title={`Previous: ${prevEpisode.title}`}
          >
            <img 
              src={prevEpisode.thumbnail} 
              alt={prevEpisode.title}
              className="w-full h-full object-cover filter brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-6 left-4 right-4 text-xs font-bold text-neutral-300 truncate">
              {prevEpisode.title}
            </div>
          </div>

          {/* MAIN 3D ACTIVE BANNER CARD (Coming upfront from screen) */}
          <div 
            className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-700/60 ring-1 ring-white/10 z-20 transition-all duration-500 ease-out transform hover:-translate-y-2 hover:scale-[1.008] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.98),0_15px_35px_rgba(0,0,0,0.9),0_0_40px_rgba(212,255,0,0.18)]"
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Top specular glow line on the 3D card */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4FF00]/80 to-transparent z-30 pointer-events-none" />

            {/* Banner Media Stage (Height ~500-600px) */}
            <div className="relative min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex items-center">
              
              {/* Background Poster Images with Smooth 3D Transition */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                {heroEpisodes.map((ep, idx) => (
                  <div
                    key={ep.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                      idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                    }`}
                  >
                    <img
                      src={ep.thumbnail}
                      alt={ep.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transform transition-transform duration-7000 hover:scale-105"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.onerror = null;
                        if (!target.src.includes('ytimg.com')) {
                          target.src = 'https://i.ytimg.com/vi/2pHRQdptcMs/maxresdefault.jpg';
                        }
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Gradient Overlay designed to blend text seamlessly into poster artwork */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 sm:via-black/35 to-transparent w-full lg:w-4/5 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />
              <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />

              {/* Chevrons embedded inside the 3D card */}
              <button
                onClick={handlePrev}
                aria-label="Previous slide"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#D4FF00] hover:text-black text-white flex items-center justify-center backdrop-blur-sm border border-white/10 transition-all duration-200 hover:scale-110 shadow-2xl"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next slide"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#D4FF00] hover:text-black text-white flex items-center justify-center backdrop-blur-sm border border-white/10 transition-all duration-200 hover:scale-110 shadow-2xl"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Blended Text & Controls sitting directly on the image — NO card box */}
              <div className="relative z-20 px-6 sm:px-12 lg:px-16 py-10 sm:py-14 max-w-2xl lg:max-w-3xl space-y-4 sm:space-y-5">
                
                {/* Eyebrow and Badges */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-[#D4FF00]/50 text-[#D4FF00] text-xs font-bold uppercase tracking-[0.22em] shadow-lg backdrop-blur-sm">
                    <Sparkles className="w-3 h-3" />
                    {currentEpisode.category}
                  </span>

                  {currentEpisode.isNew && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[11px] font-black uppercase tracking-wider shadow-[0_0_12px_rgba(220,38,38,0.7)]">
                      NEW RELEASE
                    </span>
                  )}

                  {currentEpisode.guest && (
                    <span className="text-xs uppercase tracking-wider text-neutral-200 font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] bg-black/50 px-2.5 py-0.5 rounded-full border border-white/10">
                      ft. {currentEpisode.guest}
                    </span>
                  )}
                </div>

                {/* Title directly on image */}
                <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.1] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                  {currentEpisode.title}
                </h1>

                {/* Meta Line */}
                <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm text-neutral-200 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                  <span className="inline-flex items-center gap-1 font-semibold bg-black/70 px-2.5 py-1 rounded-md border border-neutral-700/80 backdrop-blur-sm">
                    <Clock className="w-3.5 h-3.5 text-[#D4FF00]" />
                    {currentEpisode.duration}
                  </span>
                  <span className="text-neutral-400">•</span>
                  <span className="text-neutral-200 font-medium">Hosted by Archit Jain</span>
                  <span className="text-neutral-400">•</span>
                  <span className="text-[#D4FF00] font-bold">4K Ultra HD</span>
                </div>

                {/* Synopsis */}
                <p className="text-neutral-200 text-sm sm:text-base leading-relaxed line-clamp-2 sm:line-clamp-3 font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-xl">
                  {currentEpisode.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    id="hero-watch-button"
                    href={sanitizeSafeUrl(currentEpisode.youtubeUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl bg-[#D4FF00] hover:bg-[#bbf000] text-black font-extrabold text-sm sm:text-base tracking-wide transition-all duration-200 transform hover:scale-105 active:scale-98 shadow-[0_0_30px_rgba(212,255,0,0.45)]"
                  >
                    <Play className="w-5 h-5 fill-black" />
                    <span>Watch on YouTube</span>
                    <ExternalLink className="w-4 h-4 opacity-75 ml-0.5" />
                  </a>

                  <button
                    id="hero-more-episodes-button"
                    onClick={onScrollToShelves}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-black/70 hover:bg-neutral-900 text-neutral-100 hover:text-white font-semibold text-sm sm:text-base border border-neutral-700/80 hover:border-neutral-500 backdrop-blur-sm transition-all duration-200"
                  >
                    <span>Explore Episodes</span>
                    <ArrowDown className="w-4 h-4" />
                  </button>

                  {isPaused && (
                    <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-neutral-300 bg-black/70 px-3 py-1.5 rounded-full border border-neutral-800 backdrop-blur-sm">
                      <Pause className="w-3 h-3 text-[#D4FF00]" />
                      Paused
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 3D RIGHT PEEK BANNER (Next Slide in 3D depth) */}
          <div 
            onClick={handleNext}
            className="hidden xl:block absolute -right-12 2xl:-right-16 w-72 h-[480px] rounded-3xl overflow-hidden cursor-pointer z-10 transition-all duration-700 ease-out transform rotate-y-[22deg] scale-[0.84] opacity-35 hover:opacity-75 hover:scale-[0.88] hover:rotate-y-[12deg] shadow-2xl border border-neutral-800"
            title={`Next: ${nextEpisode.title}`}
          >
            <img 
              src={nextEpisode.thumbnail} 
              alt={nextEpisode.title}
              className="w-full h-full object-cover filter brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-6 left-4 right-4 text-xs font-bold text-neutral-300 truncate">
              {nextEpisode.title}
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex items-center justify-center gap-2 pt-4 pb-2">
          {heroEpisodes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex 
                  ? 'w-8 bg-[#D4FF00] shadow-[0_0_10px_rgba(212,255,0,0.6)]' 
                  : 'w-2 sm:w-3 bg-neutral-700 hover:bg-neutral-500'
              }`}
            />
          ))}
        </div>

        {/* Horizontal Filmstrip Lineup below hero */}
        <div className="hidden sm:block pt-3">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <span className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00]" />
              Featured Lineup • Click to switch banner
            </span>
            <span className="text-xs text-neutral-500 font-mono">
              Slide {currentIndex + 1} of {heroEpisodes.length}
            </span>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {filmstripEpisodes.map((ep) => {
              const isActive = ep.id === currentEpisode.id;
              return (
                <button
                  key={ep.id}
                  onClick={() => handleSelectFromFilmstrip(ep)}
                  className={`relative aspect-video rounded-lg overflow-hidden text-left group transition-all duration-200 ${
                    isActive 
                      ? 'ring-2 ring-[#D4FF00] scale-102 shadow-[0_0_16px_rgba(212,255,0,0.4)]' 
                      : 'opacity-65 hover:opacity-100 hover:scale-102'
                  }`}
                  title={ep.title}
                >
                  <img
                    src={ep.thumbnail}
                    alt={ep.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {isActive && (
                    <div className="absolute top-1.5 left-1.5 bg-[#D4FF00] text-black rounded-full p-0.5 shadow">
                      <Play className="w-2.5 h-2.5 fill-black" />
                    </div>
                  )}

                  <span className="absolute bottom-1.5 right-1.5 text-[10px] font-mono bg-black/90 text-neutral-200 px-1 py-0.5 rounded leading-none border border-neutral-800">
                    {ep.duration}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
