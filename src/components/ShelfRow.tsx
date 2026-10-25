import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Episode } from '../types';
import { EpisodeCard } from './EpisodeCard';

interface ShelfRowProps {
  title: string;
  subtitle?: string;
  episodes: Episode[];
  badgeText?: string;
  onQuickInfo?: (episode: Episode) => void;
}

export const ShelfRow: React.FC<ShelfRowProps> = ({ 
  title, 
  subtitle, 
  episodes,
  badgeText,
  onQuickInfo 
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const { clientWidth } = scrollContainerRef.current;
    const scrollAmount = clientWidth * 0.75;
    
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  if (!episodes || episodes.length === 0) return null;

  return (
    <section className="relative py-5 sm:py-6 group/shelf">
      {/* Shelf Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3 flex items-baseline justify-between">
        <div className="flex items-center gap-3">
          <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span className="w-1.5 h-5 bg-[#D4FF00] rounded-sm inline-block" />
            {title}
          </h3>

          {badgeText && (
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
              {badgeText}
            </span>
          )}

          {subtitle && (
            <span className="hidden md:inline text-xs text-neutral-400">
              • {subtitle}
            </span>
          )}
        </div>

        <span className="text-xs text-neutral-400 font-medium">
          {episodes.length} Episodes
        </span>
      </div>

      {/* Relative container for horizontal cards and desktop scroll chevrons */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Left Scroll Button */}
        {canScrollLeft && (
          <button
            onClick={() => handleScroll('left')}
            aria-label={`Scroll ${title} left`}
            className="hidden md:flex absolute -left-2 lg:-left-5 top-1/2 -translate-y-10 z-30 w-11 h-11 rounded-full bg-black/80 hover:bg-[#D4FF00] text-white hover:text-black items-center justify-center backdrop-blur-md border border-white/10 opacity-0 group-hover/shelf:opacity-100 transition-all duration-200 shadow-2xl hover:scale-105"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Right Scroll Button */}
        {canScrollRight && (
          <button
            onClick={() => handleScroll('right')}
            aria-label={`Scroll ${title} right`}
            className="hidden md:flex absolute -right-2 lg:-right-5 top-1/2 -translate-y-10 z-30 w-11 h-11 rounded-full bg-black/80 hover:bg-[#D4FF00] text-white hover:text-black items-center justify-center backdrop-blur-md border border-white/10 opacity-0 group-hover/shelf:opacity-100 transition-all duration-200 shadow-2xl hover:scale-105"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Horizontally Scrollable Cards Container */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScrollability}
          className="flex items-start gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-4 px-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {episodes.map((episode) => (
            <div key={episode.id} className="snap-start">
              <EpisodeCard episode={episode} onQuickInfo={onQuickInfo} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
