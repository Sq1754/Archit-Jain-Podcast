import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { HeroCarousel } from './components/HeroCarousel';
import { ShelfRow } from './components/ShelfRow';
import { BookCardDemo } from './components/BookCardDemo';
import { BookPage } from './components/BookPage';
import { HostSection } from './components/HostSection';
import { SubscribeBand } from './components/SubscribeBand';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { SearchModal } from './components/SearchModal';
import { EPISODES_DATA } from './data/episodes';
import { Filter, RefreshCw } from 'lucide-react';

const BOOK_PATH = '/books/india-nahi-bharat-bolo';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<'home' | 'book'>('home');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFilterLoading, setIsFilterLoading] = useState<boolean>(false);

  // Initial mount data loading simulation to show smooth skeleton states
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 650);
    return () => clearTimeout(timer);
  }, []);

  // Handle category filtering with quick responsive skeleton feedback
  const handleCategoryFilterChange = (category: string) => {
    if (category === activeCategoryFilter) return;
    setIsFilterLoading(true);
    setActiveCategoryFilter(category);
    setTimeout(() => {
      setIsFilterLoading(false);
    }, 280);
  };

  // Allow manual refresh to demonstrate content skeleton loader
  const handleRefreshCatalog = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 650);
  };

  // Detect whether the current URL matches the book page route
  const isBookUrl = useCallback((path: string, hash: string) => {
    const p = path.toLowerCase();
    const h = hash.toLowerCase();
    return (
      p.includes('/books/india-nahi-bharat-bolo') ||
      p.includes('/india-nahi-bharat-bolo') ||
      p.startsWith('/books') ||
      h.includes('/books/india-nahi-bharat-bolo') ||
      h.includes('india-nahi-bharat-bolo') ||
      h === '#book-page'
    );
  }, []);

  // Sync route on mount and browser navigation (Back / Forward buttons)
  useEffect(() => {
    const syncRouteFromLocation = () => {
      const pathname = window.location.pathname;
      const hash = window.location.hash;
      if (isBookUrl(pathname, hash)) {
        setCurrentRoute('book');
      } else {
        setCurrentRoute('home');
      }
    };

    syncRouteFromLocation();
    window.addEventListener('popstate', syncRouteFromLocation);
    window.addEventListener('hashchange', syncRouteFromLocation);

    return () => {
      window.removeEventListener('popstate', syncRouteFromLocation);
      window.removeEventListener('hashchange', syncRouteFromLocation);
    };
  }, [isBookUrl]);

  // Navigate to Dedicated Book Page
  const navigateToBook = useCallback(() => {
    try {
      window.history.pushState({}, '', BOOK_PATH);
    } catch {
      window.location.hash = '#/books/india-nahi-bharat-bolo';
    }
    setCurrentRoute('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Navigate back to Home (optionally scrolling to a section)
  const navigateToHome = useCallback((sectionId?: string) => {
    try {
      window.history.pushState({}, '', '/');
    } catch {
      window.location.hash = '';
    }
    setCurrentRoute('home');

    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
      {/* 1. TOP NAVBAR */}
      <Navbar
        currentPage={currentRoute}
        onNavigateHome={navigateToHome}
        onNavigateBook={navigateToBook}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* 2. DYNAMIC PAGE VIEW */}
      {currentRoute === 'book' ? (
        /* DEDICATED SEPARATE BOOK PAGE (https://architjain.co/books/india-nahi-bharat-bolo) */
        <main className="flex-1">
          <BookPage onBackToHome={navigateToHome} />
        </main>
      ) : (
        /* HOME PAGE VIEW */
        <div className="flex-1 flex flex-col">
          {/* HERO CAROUSEL */}
          <HeroCarousel
            episodes={EPISODES_DATA}
            onScrollToShelves={scrollToShelves}
          />

          {/* CATEGORY SHELVES (Netflix-Style Rows) */}
          <main id="episodes-section" className="relative z-20 pt-8 sm:pt-12 pb-16 space-y-4">
            {/* Shelf Category Quick Bar */}
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

                {/* Quick Filter Badges & Refresh Trigger */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                  <span className="text-xs text-neutral-500 font-semibold flex items-center gap-1 mr-1">
                    <Filter className="w-3.5 h-3.5" />
                    Filter:
                  </span>
                  {['All', 'Political Chit-Chat', 'Tech Talk', 'Founder & Innovator Stories'].map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryFilterChange(category)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                        activeCategoryFilter === category
                          ? 'bg-[#D4FF00] text-black shadow-[0_0_12px_rgba(212,255,0,0.3)]'
                          : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                      }`}
                    >
                      {category}
                    </button>
                  ))}

                  {/* Refresh / Reload Catalog Button (allows testing & retriggering skeleton states) */}
                  <button
                    onClick={handleRefreshCatalog}
                    title="Reload episodes (test skeleton loader)"
                    aria-label="Reload episode catalog"
                    className="p-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-[#D4FF00] border border-neutral-800 transition-colors ml-1 shrink-0"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#D4FF00]' : ''}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Shelves */}
            {activeCategoryFilter === 'All' ? (
              <>
                <ShelfRow
                  title="Latest Episodes"
                  subtitle="Fresh releases and unmissable conversations"
                  episodes={latestEpisodes}
                  badgeText="Trending"
                  isLoading={isLoading || isFilterLoading}
                />

                <ShelfRow
                  title="Political Chit-Chat"
                  subtitle="Policy, parliamentarians, and national direction"
                  episodes={politicalEpisodes}
                  isLoading={isLoading || isFilterLoading}
                />

                <ShelfRow
                  title="Tech Talk"
                  subtitle="AI, semiconductors, blockchain, and deep tech"
                  episodes={techTalkEpisodes}
                  isLoading={isLoading || isFilterLoading}
                />

                <ShelfRow
                  title="Founder & Innovator Stories"
                  subtitle="The gritty journey of scaling from Bharat to the world"
                  episodes={founderEpisodes}
                  isLoading={isLoading || isFilterLoading}
                />
              </>
            ) : (
              <div className="py-2">
                <ShelfRow
                  title={activeCategoryFilter}
                  episodes={EPISODES_DATA.filter((ep) => ep.category === activeCategoryFilter)}
                  isLoading={isLoading || isFilterLoading}
                />
              </div>
            )}
          </main>

          {/* HOME PAGE SMALL BOOK COVER DEMO CARD (Navigates to dedicated book page) */}
          <BookCardDemo 
            onNavigateToBook={navigateToBook} 
            isLoading={isLoading} 
          />

          {/* ABOUT / HOST SECTION */}
          <HostSection onOpenContact={() => setIsContactOpen(true)} />
        </div>
      )}

      {/* 3. SUBSCRIBE CTA BAND */}
      <SubscribeBand />

      {/* 4. FOOTER */}
      <Footer 
        onNavigateHome={navigateToHome}
        onNavigateBook={navigateToBook}
      />

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
