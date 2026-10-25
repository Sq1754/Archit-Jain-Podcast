import React from 'react';
import { Play, Youtube, Radio, Instagram, Twitter, Linkedin, Heart } from 'lucide-react';
import { CHANNEL_URL, SPOTIFY_URL, INSTAGRAM_URL, TWITTER_URL, LINKEDIN_URL } from '../data/episodes';

export const Footer: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#050505] border-t border-neutral-900 py-12 text-neutral-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#D4FF00] flex items-center justify-center text-black font-black">
              <Play className="w-4 h-4 fill-black ml-0.5" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-white text-lg tracking-tight">
                ARCHIT JAIN PODCAST
              </span>
              <p className="text-xs text-neutral-500">Tech & Political Interviews from Bengaluru</p>
            </div>
          </div>

          {/* Repeated Nav Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-neutral-300">
            <button
              onClick={() => scrollToSection('hero')}
              className="hover:text-[#D4FF00] transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('episodes-section')}
              className="hover:text-[#D4FF00] transition-colors"
            >
              Episodes
            </button>
            <button
              onClick={() => scrollToSection('about-section')}
              className="hover:text-[#D4FF00] transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('subscribe-section')}
              className="hover:text-[#D4FF00] transition-colors"
            >
              Subscribe
            </button>
            <a
              href="https://youtube.com/@architjain9/about"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4FF00] transition-colors"
            >
              Press & Inquiries
            </a>
          </nav>

          {/* Social Icons */}
          <div className="flex items-center space-x-3">
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-400 hover:text-[#FF0000] hover:bg-neutral-900 rounded-full transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href={SPOTIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-400 hover:text-[#1DB954] hover:bg-neutral-900 rounded-full transition-colors"
              aria-label="Spotify"
            >
              <Radio className="w-4 h-4" />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-400 hover:text-[#E4405F] hover:bg-neutral-900 rounded-full transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={TWITTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-400 hover:text-[#1DA1F2] hover:bg-neutral-900 rounded-full transition-colors"
              aria-label="Twitter / X"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-400 hover:text-[#0A66C2] hover:bg-neutral-900 rounded-full transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-6 border-t border-neutral-900/80 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>
            © {new Date().getFullYear()} Archit Jain Podcast. All rights reserved. Author of <em>"India Nahi Bharat Bolo"</em>.
          </p>
          <div className="flex items-center gap-4">
            <span>OTT Streaming Experience</span>
            <span>•</span>
            <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-400">
              youtube.com/@architjain9
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
