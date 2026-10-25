import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Play, 
  Youtube, 
  Radio, 
  Instagram, 
  Twitter, 
  ExternalLink,
  Search
} from 'lucide-react';
import { CHANNEL_URL, SPOTIFY_URL, INSTAGRAM_URL, TWITTER_URL } from '../data/episodes';

interface NavbarProps {
  onSelectCategory?: (category: string) => void;
  onOpenSearch?: () => void;
  onOpenContact?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectCategory, onOpenSearch, onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-neutral-800/80 py-3 shadow-2xl shadow-black/80' 
          : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Wordmark */}
          <a 
            href="#hero" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Archit Jain Podcast Home"
          >
            <div className="w-9 h-9 rounded-lg bg-[#D4FF00] flex items-center justify-center text-black font-black text-lg shadow-[0_0_16px_rgba(212,255,0,0.4)] group-hover:scale-105 transition-transform duration-200">
              <Play className="w-5 h-5 fill-black ml-0.5" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg sm:text-xl font-extrabold tracking-tight text-white group-hover:text-[#D4FF00] transition-colors leading-none">
                ARCHIT JAIN
              </span>
              <span className="text-[10px] tracking-[0.24em] uppercase text-neutral-400 font-semibold mt-0.5">
                PODCAST • OTT
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 text-sm font-medium">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-neutral-300 hover:text-[#D4FF00] transition-colors duration-200"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('episodes-section')}
              className="text-neutral-300 hover:text-[#D4FF00] transition-colors duration-200"
            >
              Episodes
            </button>
            <button
              onClick={() => scrollToSection('book-section')}
              className="text-neutral-300 hover:text-[#e8905b] transition-colors duration-200 flex items-center gap-1.5"
            >
              <span>Book</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#c76b35]/20 text-[#e8905b] font-bold border border-[#c76b35]/30">Featured</span>
            </button>
            <button
              onClick={() => scrollToSection('about-section')}
              className="text-neutral-300 hover:text-[#D4FF00] transition-colors duration-200"
            >
              About
            </button>
            <button
              onClick={() => onOpenContact ? onOpenContact() : scrollToSection('subscribe-section')}
              className="text-neutral-300 hover:text-[#D4FF00] transition-colors duration-200"
            >
              Contact
            </button>
          </nav>

          {/* Right Action Icons & Socials */}
          <div className="hidden lg:flex items-center space-x-3">
            {onOpenSearch && (
              <button 
                onClick={onOpenSearch}
                aria-label="Search episodes"
                className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800/80 rounded-full transition-colors mr-1"
                title="Search episodes"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            <div className="h-4 w-[1px] bg-neutral-800 mx-1" />

            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-400 hover:text-[#FF0000] hover:bg-neutral-900 rounded-full transition-colors"
              title="YouTube Channel"
              aria-label="YouTube Channel"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href={SPOTIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-400 hover:text-[#1DB954] hover:bg-neutral-900 rounded-full transition-colors"
              title="Spotify"
              aria-label="Spotify Podcast"
            >
              <Radio className="w-4 h-4" />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-400 hover:text-[#E4405F] hover:bg-neutral-900 rounded-full transition-colors"
              title="Instagram"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={TWITTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-400 hover:text-[#1DA1F2] hover:bg-neutral-900 rounded-full transition-colors"
              title="X / Twitter"
              aria-label="X / Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>

            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#D4FF00] text-black hover:bg-[#bce400] transition-colors shadow-[0_0_12px_rgba(212,255,0,0.3)] hover:scale-105 duration-200"
            >
              <span>Subscribe</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            {onOpenSearch && (
              <button 
                onClick={onOpenSearch}
                aria-label="Search episodes"
                className="p-2 text-neutral-300 hover:text-white"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-white focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0A0A]/98 border-b border-neutral-800 px-5 pt-3 pb-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3 pt-2">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-left py-2 text-base font-semibold text-neutral-200 hover:text-[#D4FF00]"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('episodes-section')}
              className="text-left py-2 text-base font-semibold text-neutral-200 hover:text-[#D4FF00]"
            >
              Episodes
            </button>
            <button
              onClick={() => scrollToSection('book-section')}
              className="text-left py-2 text-base font-semibold text-neutral-200 hover:text-[#e8905b] flex items-center justify-between"
            >
              <span>Book: India Nahi, Bharat Bolo</span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#c76b35]/20 text-[#e8905b] font-bold border border-[#c76b35]/30">Featured</span>
            </button>
            <button
              onClick={() => scrollToSection('about-section')}
              className="text-left py-2 text-base font-semibold text-neutral-200 hover:text-[#D4FF00]"
            >
              About Archit
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenContact) onOpenContact();
                else scrollToSection('subscribe-section');
              }}
              className="text-left py-2 text-base font-semibold text-neutral-200 hover:text-[#D4FF00]"
            >
              Contact & Inquiries
            </button>
          </nav>

          <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <a
                href={CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-neutral-300 hover:text-[#FF0000] bg-neutral-900 rounded-full"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={SPOTIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-neutral-300 hover:text-[#1DB954] bg-neutral-900 rounded-full"
                aria-label="Spotify"
              >
                <Radio className="w-4 h-4" />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-neutral-300 hover:text-[#E4405F] bg-neutral-900 rounded-full"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full text-xs font-bold bg-[#D4FF00] text-black"
            >
              Watch on YouTube
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
