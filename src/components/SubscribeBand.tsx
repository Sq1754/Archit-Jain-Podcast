import React from 'react';
import { Youtube, Bell, Radio, Instagram, Twitter, ExternalLink, Sparkles } from 'lucide-react';
import { CHANNEL_URL, SPOTIFY_URL, INSTAGRAM_URL, TWITTER_URL } from '../data/episodes';

export const SubscribeBand: React.FC = () => {
  return (
    <section id="subscribe-section" className="relative py-20 sm:py-24 bg-[#0B0B0B] border-t border-neutral-900 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#D4FF00]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4FF00]/10 border border-[#D4FF00]/30 text-[#D4FF00] text-xs font-bold uppercase tracking-[0.2em]">
          <Bell className="w-3.5 h-3.5 animate-bounce" />
          <span>JOIN 100,000+ CURIOUS MINDS</span>
        </div>

        {/* Heading */}
        <h2 className="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight">
          Never Miss An <span className="text-[#D4FF00]">Unfiltered Conversation</span>
        </h2>

        {/* Subtitle */}
        <p className="text-neutral-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Deep-dive interviews on the technological frontiers, sovereign AI, policy battles, and visionary founder journeys shaping modern Bharat.
        </p>

        {/* Primary YouTube Subscribe Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            id="subscribe-cta-youtube"
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#D4FF00] hover:bg-[#bbf000] text-black font-extrabold text-base tracking-wide transition-all duration-200 transform hover:scale-105 shadow-[0_0_30px_rgba(212,255,0,0.4)]"
          >
            <Youtube className="w-6 h-6 fill-black" />
            <span>Subscribe on YouTube</span>
            <ExternalLink className="w-4 h-4 opacity-75" />
          </a>

          <a
            href={SPOTIFY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-base border border-neutral-700 transition-all duration-200"
          >
            <Radio className="w-5 h-5 text-[#1DB954]" />
            <span>Follow on Spotify</span>
          </a>
        </div>

        {/* Social Icons Bar */}
        <div className="pt-6 border-t border-neutral-800/60 flex items-center justify-center gap-4">
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mr-2">
            Also Streaming & Active On
          </span>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-neutral-900 text-neutral-400 hover:text-[#E4405F] hover:bg-neutral-800 border border-neutral-800 transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href={TWITTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-neutral-900 text-neutral-400 hover:text-[#1DA1F2] hover:bg-neutral-800 border border-neutral-800 transition-colors"
            aria-label="Twitter / X"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-neutral-900 text-neutral-400 hover:text-red-500 hover:bg-neutral-800 border border-neutral-800 transition-colors"
            aria-label="YouTube Community"
          >
            <Youtube className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
