import React, { useState } from 'react';
import { BookOpen, ArrowRight, Sparkles, ShieldCheck, Globe2, ExternalLink } from 'lucide-react';

export interface BookCardDemoProps {
  onNavigateToBook: () => void;
  isLoading?: boolean;
}

/**
 * High-fidelity Skeleton Loader for BookCardDemo
 * Accurately mirrors the 3D book cover, badges, typography, and button dimensions
 */
export const BookCardSkeleton: React.FC = () => {
  return (
    <section 
      aria-busy="true" 
      aria-label="Loading featured publication..." 
      className="relative py-12 sm:py-16 bg-[#0A0A0A] border-t border-neutral-900/90 overflow-hidden"
    >
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-80 h-80 bg-[#c76b35]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-[#D4FF00]/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-neutral-900">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#c76b35]/60 animate-pulse" />
              <div className="w-36 h-3 rounded bg-neutral-800/80 animate-shimmer" />
            </div>
            <div className="w-60 sm:w-72 h-8 rounded-md bg-neutral-800/90 animate-shimmer" />
          </div>

          <div className="w-40 h-4 rounded bg-neutral-800/60 animate-shimmer" />
        </div>

        {/* Small Book Cover Page Demo Card Skeleton */}
        <div className="relative rounded-2xl bg-gradient-to-r from-[#141210] via-[#121110] to-[#181512] border border-neutral-800/80 p-5 sm:p-7 shadow-xl">
          <div className="flex flex-col md:flex-row items-center md:items-stretch gap-6 sm:gap-8">
            
            {/* 3D Book Silhouette Skeleton */}
            <div className="relative shrink-0 w-44 sm:w-52 h-64 sm:h-72 rounded-r-lg rounded-l-sm bg-[#1c120c] border border-[#c76b35]/30 shadow-2xl p-4 flex flex-col justify-between overflow-hidden animate-shimmer">
              {/* Spine illusion */}
              <div className="absolute left-0 inset-y-0 w-3 bg-black/60 border-r border-black/40" />
              <div className="absolute right-0 inset-y-1 w-1.5 bg-neutral-700/60 rounded-r" />

              {/* Book Top Eyebrow Skeleton */}
              <div className="relative pl-3 space-y-1.5">
                <div className="w-24 h-2 rounded bg-[#e8905b]/40 animate-shimmer" />
                <div className="w-8 h-0.5 bg-[#c76b35]/50" />
              </div>

              {/* Book Center Title Skeleton */}
              <div className="relative pl-3 my-auto py-2 space-y-2">
                <div className="w-28 h-5 rounded bg-neutral-700/80 animate-shimmer" />
                <div className="w-20 h-5 rounded bg-[#c76b35]/40 animate-shimmer" />
                <div className="w-24 h-2 rounded bg-neutral-700/50 animate-shimmer" />
              </div>

              {/* Book Bottom Author Seal Skeleton */}
              <div className="relative pl-3 flex items-center justify-between border-t border-[#c76b35]/20 pt-2">
                <div className="space-y-1">
                  <div className="w-10 h-2 rounded bg-neutral-700/50" />
                  <div className="w-16 h-3 rounded bg-neutral-700/70" />
                </div>
                <div className="w-7 h-7 rounded-full bg-[#c76b35]/20 border border-[#c76b35]/30" />
              </div>
            </div>

            {/* Book Details Skeleton */}
            <div className="flex-1 flex flex-col justify-between w-full space-y-4">
              <div>
                {/* Badges Skeleton */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                  <div className="w-32 h-6 rounded-full bg-neutral-800/70 animate-shimmer" />
                  <div className="w-28 h-6 rounded-full bg-neutral-800/60 animate-shimmer" />
                  <div className="w-24 h-6 rounded-full bg-neutral-800/50 animate-shimmer" />
                </div>

                {/* Title Skeleton */}
                <div className="space-y-2">
                  <div className="w-3/4 sm:w-2/3 h-7 sm:h-8 rounded-lg bg-neutral-800/90 animate-shimmer" />
                  <div className="w-1/2 h-4 rounded bg-neutral-800/60 animate-shimmer" />
                </div>

                {/* Description Skeleton */}
                <div className="mt-4 space-y-2 max-w-2xl">
                  <div className="w-full h-3.5 rounded bg-neutral-800/70 animate-shimmer" />
                  <div className="w-11/12 h-3.5 rounded bg-neutral-800/60 animate-shimmer" />
                  <div className="w-4/5 h-3.5 rounded bg-neutral-800/50 animate-shimmer" />
                </div>

                {/* Key Points Grid Skeleton */}
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c76b35]/50 shrink-0" />
                      <div className="w-40 sm:w-48 h-3 rounded bg-neutral-800/60 animate-shimmer" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons Skeleton */}
              <div className="mt-6 pt-4 border-t border-neutral-800/80 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <div className="w-44 h-10 rounded-xl bg-[#c76b35]/40 animate-shimmer" />
                <div className="w-36 h-10 rounded-xl bg-neutral-800/70 animate-shimmer" />
                <div className="w-48 h-3 rounded bg-neutral-800/40 hidden sm:inline ml-auto animate-shimmer" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export const BookCardDemo: React.FC<BookCardDemoProps> = ({ 
  onNavigateToBook,
  isLoading = false 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (isLoading) {
    return <BookCardSkeleton />;
  }

  return (
    <section id="book-section" className="relative py-12 sm:py-16 bg-[#0A0A0A] border-t border-neutral-900/90 overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-80 h-80 bg-[#c76b35]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-[#D4FF00]/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-neutral-900">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#c76b35] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#e8905b]">
                FEATURED PUBLICATION
              </span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-white tracking-tight">
              Books by Archit Jain
            </h2>
          </div>

          <button
            onClick={onNavigateToBook}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#e8905b] hover:text-[#f5b895] transition-colors group"
          >
            <span>Visit dedicated book page</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Small Book Cover Page Demo Card */}
        <div 
          onClick={onNavigateToBook}
          className="group relative cursor-pointer rounded-2xl bg-gradient-to-r from-[#141210] via-[#121110] to-[#181512] border border-neutral-800/90 hover:border-[#c76b35]/60 transition-all duration-300 shadow-xl hover:shadow-[0_12px_40px_rgba(199,107,53,0.18)] p-5 sm:p-7"
        >
          <div className="flex flex-col md:flex-row items-center md:items-stretch gap-6 sm:gap-8">
            
            {/* 3D Realistic Book Cover Demo Visual */}
            <div className="relative shrink-0 w-44 sm:w-52 h-64 sm:h-72 [perspective:1000px] group/book">
              {/* Outer Glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#c76b35]/20 to-[#e8905b]/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Realistic 3D Book Object */}
              <div className="relative w-full h-full rounded-r-lg rounded-l-sm bg-gradient-to-br from-[#2a170e] via-[#1a0e08] to-[#110905] border-y border-r border-[#c76b35]/40 shadow-2xl transition-transform duration-500 ease-out group-hover:[transform:rotateY(-8deg)_scale(1.02)] flex flex-col justify-between p-4 overflow-hidden select-none">
                
                {/* Book Spine Highlight (Left edge shadow & ribbing) */}
                <div className="absolute left-0 inset-y-0 w-3 bg-gradient-to-r from-black/80 via-white/10 to-transparent border-r border-black/40" />
                <div className="absolute left-3 inset-y-0 w-1 bg-gradient-to-r from-white/20 to-transparent opacity-40" />

                {/* Subtle Paper Pages Illusion on Right Edge */}
                <div className="absolute right-0 inset-y-1 w-1.5 bg-neutral-200/90 rounded-r shadow-inner opacity-75" />

                {/* Top Header of Book Cover */}
                <div className="relative pl-3 space-y-1">
                  <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#e8905b]/90 block">
                    आर्चित जैन की पुस्तक
                  </span>
                  <div className="w-8 h-0.5 bg-[#c76b35]/60" />
                </div>

                {/* Center Title Typography on Cover */}
                <div className="relative pl-3 my-auto py-2">
                  <h3 className="font-hindi text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-md">
                    इंडिया नहीं,<br />
                    <span className="text-[#f5a36c]">भारत बोलो</span>
                  </h3>
                  <p className="text-[10px] text-neutral-300 mt-1 font-medium font-hindi">
                    भारत को जानिए। भारत को समझिए।
                  </p>
                </div>

                {/* Bottom Author Stamp & Seal */}
                <div className="relative pl-3 flex items-center justify-between border-t border-[#c76b35]/30 pt-2">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-neutral-400 block font-semibold">Author</span>
                    <span className="text-xs font-bold text-white tracking-wide">Archit Jain</span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#c76b35]/25 border border-[#c76b35]/50 flex items-center justify-center text-[#e8905b]">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Decorative sheen sweep effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
              </div>
            </div>

            {/* Book Details & Navigation Prompt */}
            <div className="flex-1 flex flex-col justify-between text-center md:text-left">
              <div>
                {/* Badges */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#c76b35]/20 text-[#e8905b] border border-[#c76b35]/30 text-xs font-semibold">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Original Publication</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Free Digital Reader</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700 text-xs font-medium">
                    <Globe2 className="w-3.5 h-3.5 text-[#e8905b]" />
                    <span>Hindi (हिंदी)</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                  India Nahi, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8905b] via-[#c76b35] to-[#f5b895]">Bharat Bolo</span>
                </h3>
                <p className="font-hindi text-sm text-[#e8905b] mt-0.5">
                  इंडिया नहीं, भारत बोलो — आर्चित जैन
                </p>

                {/* Description */}
                <p className="mt-3 text-sm text-neutral-300 leading-relaxed max-w-2xl">
                  An insightful inquiry into India's civilizational continuum, national identity, and cultural sovereignty. 
                  Featured with an interactive full-screen reader, online reading experience, and social sharing on its dedicated page.
                </p>

                {/* Key Points */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-400 max-w-lg">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c76b35]" />
                    <span>Full text accessible online for free</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c76b35]" />
                    <span>Interactive flip-book reader & zoom</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c76b35]" />
                    <span>Civilizational history & perspectives</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c76b35]" />
                    <span>Direct social sharing & bookmarking</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-neutral-800/80 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigateToBook();
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c76b35] to-[#e8905b] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#c76b35]/25 hover:opacity-95 hover:scale-105 active:scale-95 transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Read Book Online Free</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigateToBook();
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs sm:text-sm font-semibold transition-colors"
                >
                  <span>Open Dedicated Page</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#e8905b]" />
                </button>

                <span className="text-[11px] text-neutral-500 hidden sm:inline ml-auto font-mono">
                  architjain.co/books/india-nahi-bharat-bolo
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
