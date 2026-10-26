import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Episode } from '../types';
import { EpisodeCard } from './EpisodeCard';

interface ShelfRowProps {
  title: string;
  subtitle?: string;
  episodes?: Episode[];
  badgeText?: string;
  onQuickInfo?: (episode: Episode) => void;
  isLoading?: boolean;
  cardCount?: number;
}

/**
 * Individual Episode Card Skeleton Loader
 * Matches exact aspect-video 16:9 dimensions and responsive card widths
 */
export const EpisodeCardSkeleton: React.FC = () => {
  return (
    <div className="relative flex-none w-[260px] sm:w-[300px] md:w-[330px] select-none" aria-hidden="true">
      {/* 16:9 Thumbnail Frame with Shimmer */}
      <div className="relative aspect-video w-full rounded-[10px] overflow-hidden bg-neutral-900 border border-neutral-800/80 animate-shimmer">
        <div className="absolute inset-0 bg-neutral-800/40" />

        {/* Top-left badge placeholder */}
        <div className="absolute top-2.5 left-2.5 w-12 h-4 rounded bg-neutral-800/90" />

        {/* Bottom-right duration badge placeholder */}
        <div className="absolute bottom-2.5 right-2.5 w-12 h-4 rounded bg-neutral-800/90" />

        {/* Center play icon silhouette */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <div className="w-10 h-10 rounded-full bg-neutral-800/80 border border-neutral-700/40" />
        </div>
      </div>

      {/* Meta Text below thumbnail */}
      <div className="mt-2.5 px-0.5 space-y-2">
        {/* Category & Guest line */}
        <div className="flex items-center gap-2">
          <div className="w-16 h-2.5 rounded bg-neutral-800/80 animate-shimmer" />
          <div className="w-24 h-2.5 rounded bg-neutral-800/50 animate-shimmer" />
        </div>

        {/* Title line 1 */}
        <div className="w-full h-3.5 rounded bg-neutral-800/90 animate-shimmer" />

        {/* Title line 2 */}
        <div className="w-3/5 h-3.5 rounded bg-neutral-800/60 animate-shimmer" />
      </div>
    </div>
  );
};

/**
 * Shelf Row Skeleton Loader
 * Renders header and horizontal card placeholders without layout shift
 */
export const ShelfRowSkeleton: React.FC<{ title?: string; subtitle?: string; badgeText?: string; cardCount?: number }> = ({
  title,
  subtitle,
  badgeText,
  cardCount = 4
}) => {
  return (
    <section className="relative py-5 sm:py-6" aria-busy="true" aria-label="Loading episode shelf">
      {/* Shelf Header Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3 flex items-baseline justify-between">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-5 bg-[#D4FF00]/40 rounded-sm inline-block animate-pulse" />
          {title ? (
            <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-white/70">
              {title}
            </h3>
          ) : (
            <div className="w-44 sm:w-56 h-6 sm:h-7 rounded-md bg-neutral-800/80 animate-shimmer" />
          )}

          {badgeText && (
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-800/80 text-neutral-400 border border-neutral-700/60 animate-pulse">
              {badgeText}
            </span>
          )}

          {subtitle && (
            <span className="hidden md:inline text-xs text-neutral-500">
              • {subtitle}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:inline-block w-28 h-5 rounded bg-neutral-900 border border-neutral-800 animate-shimmer" />
          <div className="w-16 h-4 rounded bg-neutral-800/60 animate-shimmer" />
        </div>
      </div>

      {/* Horizontally scrollable cards skeleton row */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex items-start gap-4 sm:gap-5 overflow-x-hidden pb-4 px-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {Array.from({ length: cardCount }).map((_, index) => (
            <div key={index} className="snap-start">
              <EpisodeCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ShelfRow: React.FC<ShelfRowProps> = ({ 
  title, 
  subtitle, 
  episodes = [],
  badgeText,
  onQuickInfo,
  isLoading = false,
  cardCount = 4
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

  // If in loading state, render the shelf skeleton
  if (isLoading) {
    return (
      <ShelfRowSkeleton 
        title={title} 
        subtitle={subtitle} 
        badgeText={badgeText} 
        cardCount={cardCount} 
      />
    );
  }

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

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-medium text-neutral-400 bg-neutral-900/80 px-2 py-0.5 rounded border border-neutral-800">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-pulse" />
            Hover for 30s teaser
          </span>
          <span className="text-xs text-neutral-400 font-medium">
            {episodes.length} Episodes
          </span>
        </div>
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
