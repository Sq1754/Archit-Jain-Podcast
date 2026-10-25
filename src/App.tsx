import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroCarousel } from './components/HeroCarousel';
import { ShelfRow } from './components/ShelfRow';
import { BookSection } from './components/BookSection';
import { HostSection } from './components/HostSection';
import { SubscribeBand } from './components/SubscribeBand';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { SearchModal } from './components/SearchModal';
import { EPISODES_DATA } from './data/episodes';
import { Episode } from './types';
import { Flame, Sparkles, Filter, ExternalLink } from 'lucide-react';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');

  // Check for book hash or direct path on mount
  useEffect(() => {
    const handleInitialHash = () => {
      const hash = window.location.hash.toLowerCase();
      const pathname = window.location.pathname.toLowerCase();
      if (hash === '#book' || hash === '#book-section' || pathname.includes('india-nahi-bharat-bolo')) {
        setTimeout(() => {
          const el = document.getElementById('book-section');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      }
    };

    handleInitialHash();
    window.addEventListener('hashchange', handleInitialHash);
    return () => window.removeEventListener('hashchange', handleInitialHash);
  }, []);

  // Categories for the shelves
  const latestEpisodes = [...EPISODES_DATA].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  const techTalkEpisodes = EPISODES_DATA.filter((ep) => ep.category === 'Tech Talk');
  const politicalEpisodes = EPISODES_DATA.filter((ep) => ep.category === 'Political Chit-Chat');
  const founderEpisodes = EPISODES_DATA.filter((ep) => ep.category === 'Founder & Innovator Stories');

  const scrollToShelves = () => {
    const el = document.getElementById('episodes-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col selection:bg-[#D4FF00] selection:text-black">
      {/* 1. NAVBAR */}
      <Navbar
        onOpenContact={() => setIsContactOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* 2. HERO CAROUSEL */}
      <HeroCarousel
        episodes={EPISODES_DATA}
        onScrollToShelves={scrollToShelves}
      />

      {/* 3. CATEGORY SHELVES (Netflix-Style Horizontal Scroll Rows) */}
      <main id="episodes-section" className="relative z-20 pt-8 sm:pt-12 pb-16 space-y-4">
        
        {/* Shelf Category Quick Bar / Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-900">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-[0.24em] text-[#D4FF00]">
                ORIGINAL SERIES & INTERVIEWS
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
                Browse The Catalog
              </h2>
            </div>

            {/* Quick Filter Badges */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              <span className="text-xs text-neutral-500 font-semibold flex items-center gap-1 mr-1">
                <Filter className="w-3.5 h-3.5" />
                Filter:
              </span>
              {['All', 'Political Chit-Chat', 'Tech Talk', 'Founder & Innovator Stories'].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategoryFilter(category)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    activeCategoryFilter === category
                      ? 'bg-[#D4FF00] text-black shadow-[0_0_12px_rgba(212,255,0,0.3)]'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Shelf Display based on filter or all 4 Netflix-style rows */}
        {activeCategoryFilter === 'All' ? (
          <>
            {/* Shelf 1: Latest Episodes */}
            <ShelfRow
              title="Latest Episodes"
              subtitle="Fresh releases and unmissable conversations"
              episodes={latestEpisodes}
              badgeText="Trending"
            />

            {/* Shelf 2: Political Chit-Chat */}
            <ShelfRow
              title="Political Chit-Chat"
              subtitle="Policy, parliamentarians, and national direction"
              episodes={politicalEpisodes}
            />

            {/* Shelf 3: Tech Talk */}
            <ShelfRow
              title="Tech Talk"
              subtitle="AI, semiconductors, blockchain, and deep tech"
              episodes={techTalkEpisodes}
            />

            {/* Shelf 4: Founder & Innovator Stories */}
            <ShelfRow
              title="Founder & Innovator Stories"
              subtitle="The gritty journey of scaling from Bharat to the world"
              episodes={founderEpisodes}
            />
          </>
        ) : (
          <div className="py-2">
            <ShelfRow
              title={activeCategoryFilter}
              episodes={EPISODES_DATA.filter((ep) => ep.category === activeCategoryFilter)}
            />
          </div>
        )}
      </main>

      {/* 4. FEATURED BOOK SECTION: इंडिया नहीं, भारत बोलो */}
      <BookSection />

      {/* 5. ABOUT / HOST SECTION */}
      <HostSection onOpenContact={() => setIsContactOpen(true)} />

      {/* 6. SUBSCRIBE CTA BAND */}
      <SubscribeBand />

      {/* 7. FOOTER */}
      <Footer />

      {/* Modals */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        episodes={EPISODES_DATA}
      />
    </div>
  );
}

