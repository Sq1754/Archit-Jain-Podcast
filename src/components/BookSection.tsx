import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  ExternalLink, 
  Maximize2, 
  Minimize2, 
  RotateCw, 
  Share2, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Globe2, 
  BookMarked,
  Info,
  Copy,
  ChevronDown
} from 'lucide-react';

// Crisp SVG Icons for Social Platforms
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const XTwitterIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 0 0 0-3.3 1.66 1.66 0 0 0 0 3.3m1.37 9.74v-8.37H5.1v8.37h2.73z"/>
  </svg>
);

export const BookSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const readerContainerRef = useRef<HTMLDivElement>(null);
  const shareDropdownRef = useRef<HTMLDivElement>(null);

  // Close share dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareDropdownRef.current && !shareDropdownRef.current.contains(event.target as Node)) {
        setShareMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fallback safety: If iframe takes longer than 9s, dismiss the loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 9000);
    return () => clearTimeout(timer);
  }, [iframeKey]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleReload = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const getBookUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/#book-section`;
    }
    return 'https://architjain.co/#book-section';
  };

  const bookTitle = 'India Nahi, Bharat Bolo';
  const shareMessage = `Read "India Nahi, Bharat Bolo" by Archit Jain online for free. An insightful book exploring India's civilizational identity and history.`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getBookUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore clipboard error
    }
  };

  const shareToWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareMessage}\n\nRead here: ${getBookUrl()}`)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareToX = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(getBookUrl())}&hashtags=IndiaNahiBharatBolo,ArchitJain,Bharat`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getBookUrl())}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${bookTitle} | Book by Archit Jain`,
          text: shareMessage,
          url: getBookUrl(),
        });
        return;
      } catch {
        // User cancelled or unsupported
      }
    }
    // Fallback: toggle dropdown
    setShareMenuOpen(!shareMenuOpen);
  };

  return (
    <section 
      id="book-section" 
      className="relative py-16 sm:py-24 bg-gradient-to-b from-[#0A0A0A] via-[#0E0B08] to-[#0A0A0A] border-t border-neutral-900 overflow-hidden"
    >
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#c76b35]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#D4FF00]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Eyebrow */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#c76b35] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#c76b35]">
            Featured Book • Author Archit Jain
          </span>
        </div>

        {/* Book Header Information in English */}
        <header className="mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c76b35]/15 border border-[#c76b35]/30 text-[#e8905b] text-xs font-semibold mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>A Book by Archit Jain</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            India Nahi, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8905b] via-[#c76b35] to-[#f5b895]">Bharat Bolo</span>
          </h1>

          <div className="flex flex-wrap items-baseline gap-3 mt-2">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-neutral-200">
              Know Bharat. <span className="text-[#c76b35]">Understand Bharat.</span>
            </h2>
            <span className="text-sm font-hindi text-neutral-400">
              (इंडिया नहीं, भारत बोलो)
            </span>
          </div>

          <p className="mt-5 max-w-3xl text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
            <strong className="text-white font-semibold">"India Nahi, Bharat Bolo"</strong> is a thought-provoking 
            work by Archit Jain that explores India's civilizational history, cultural continuity, and national 
            identity from a renewed perspective. Read the full publication online and join this vital intellectual inquiry.
          </p>

          {/* Quick Specs Badges */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-6 pt-4 border-t border-neutral-800/80">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-900 border border-neutral-800 text-xs text-neutral-300">
              <Globe2 className="w-3.5 h-3.5 text-[#c76b35]" />
              <span>Language: <strong className="text-white">Hindi (Original Edition)</strong></span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-900 border border-neutral-800 text-xs text-neutral-300">
              <BookMarked className="w-3.5 h-3.5 text-[#D4FF00]" />
              <span>Format: <strong className="text-white">Interactive Digital Reader</strong></span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-900 border border-neutral-800 text-xs text-neutral-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Access: <strong className="text-emerald-400 font-semibold">100% Free Online</strong></span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-900 border border-neutral-800 text-xs text-neutral-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Author: <a href="https://architjain.co/" className="text-white hover:text-[#c76b35] underline decoration-[#c76b35]/40 underline-offset-2">Archit Jain</a></span>
            </div>
          </div>

          {/* Dedicated Social Media Sharing Bar */}
          <div className="mt-6 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-300">
              <Share2 className="w-4 h-4 text-[#e8905b]" />
              <span>Share this book directly:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* WhatsApp Share Button */}
              <button
                onClick={shareToWhatsApp}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 hover:border-[#25D366]/60 text-xs font-semibold transition-all hover:scale-105 active:scale-95"
                title="Share on WhatsApp"
                aria-label="Share book on WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>

              {/* X (Twitter) Share Button */}
              <button
                onClick={shareToX}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 text-xs font-semibold transition-all hover:scale-105 active:scale-95"
                title="Share on X (Twitter)"
                aria-label="Share book on X"
              >
                <XTwitterIcon className="w-3.5 h-3.5" />
                <span>Share on X</span>
              </button>

              {/* LinkedIn Share Button */}
              <button
                onClick={shareToLinkedIn}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0A66C2]/15 hover:bg-[#0A66C2]/25 text-[#70b5f9] hover:text-white border border-[#0A66C2]/30 hover:border-[#0A66C2]/60 text-xs font-semibold transition-all hover:scale-105 active:scale-95"
                title="Share on LinkedIn"
                aria-label="Share book on LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4 text-[#0A66C2]" />
                <span>LinkedIn</span>
              </button>

              {/* Copy URL Button */}
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 text-xs font-medium transition-colors"
                title="Copy link to clipboard"
                aria-label="Copy book link"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Reader Workspace */}
        <div 
          ref={readerContainerRef}
          className={`transition-all duration-300 ${
            isFullscreen 
              ? 'fixed inset-0 z-50 bg-black/95 p-3 sm:p-6 flex flex-col' 
              : 'relative'
          }`}
        >
          {/* Reader Top Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-2 border-b border-neutral-800/80">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 id="aj-reader-heading" className="text-sm sm:text-base font-bold text-white tracking-wide">
                Read Online <span className="text-xs text-neutral-400 font-normal hidden sm:inline">(Interactive Digital Reader)</span>
              </h2>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 relative">
              {/* Reload Button */}
              <button
                onClick={handleReload}
                className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs font-medium flex items-center gap-1.5 transition-colors"
                title="Reload reader"
                aria-label="Reload book reader"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Reload</span>
              </button>

              {/* Social Media Share Dropdown / Trigger */}
              <div className="relative" ref={shareDropdownRef}>
                <button
                  onClick={() => setShareMenuOpen(!shareMenuOpen)}
                  className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs font-medium flex items-center gap-1.5 transition-colors"
                  title="Share book on social media"
                  aria-label="Share book menu"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-medium hidden sm:inline">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Share</span>
                      <ChevronDown className="w-3 h-3 text-neutral-500" />
                    </>
                  )}
                </button>

                {/* Popover Menu for Social Media */}
                {shareMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-[#121110] border border-neutral-700 shadow-2xl p-2 z-30 animate-in fade-in zoom-in-95 duration-150">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 px-2 py-1.5 border-b border-neutral-800/80 mb-1">
                      Share to Social Media
                    </div>
                    
                    <button
                      onClick={() => {
                        shareToWhatsApp();
                        setShareMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium text-neutral-200 hover:text-white hover:bg-[#25D366]/15 rounded-lg transition-colors group"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                      <span>WhatsApp</span>
                    </button>

                    <button
                      onClick={() => {
                        shareToX();
                        setShareMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium text-neutral-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors group"
                    >
                      <XTwitterIcon className="w-4 h-4 text-white" />
                      <span>X (Twitter)</span>
                    </button>

                    <button
                      onClick={() => {
                        shareToLinkedIn();
                        setShareMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium text-neutral-200 hover:text-white hover:bg-[#0A66C2]/15 rounded-lg transition-colors group"
                    >
                      <LinkedInIcon className="w-4 h-4 text-[#0A66C2]" />
                      <span>LinkedIn</span>
                    </button>

                    <div className="border-t border-neutral-800/80 my-1 pt-1">
                      <button
                        onClick={() => {
                          handleCopyLink();
                          setShareMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium text-neutral-200 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                      >
                        <Copy className="w-4 h-4 text-[#e8905b]" />
                        <span>Copy URL</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs font-medium flex items-center gap-1.5 transition-colors"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                aria-label="Toggle fullscreen"
              >
                {isFullscreen ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5 text-[#D4FF00]" />
                    <span className="hidden sm:inline">Exit</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Fullscreen</span>
                  </>
                )}
              </button>

              {/* Open in Internet Archive */}
              <a
                href="https://archive.org/details/india-nahi-bharat-bolo"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-lg bg-[#c76b35] hover:bg-[#b55d2b] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-[#c76b35]/20 hover:scale-105"
              >
                <span>Internet Archive</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Reader Frame Container */}
          <div 
            className={`relative w-full overflow-hidden rounded-xl border border-neutral-800 bg-[#161412] shadow-2xl transition-all duration-300 ${
              isFullscreen 
                ? 'flex-1 min-h-0' 
                : 'h-[75vh] min-h-[500px] max-h-[850px]'
            }`}
          >
            {/* Loading Indicator Spinner in English */}
            {isLoading && (
              <div 
                id="ajBookLoader" 
                className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#11100e]/95 backdrop-blur-sm text-center p-6 text-neutral-200"
              >
                <div 
                  className="w-11 h-11 rounded-full border-4 border-neutral-700 border-t-[#c76b35] animate-spin mb-4"
                  aria-hidden="true" 
                />
                <p className="text-base sm:text-lg font-bold text-white tracking-wide">
                  Loading Book Reader...
                </p>
                <span className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-sm">
                  Please wait a moment while loading the interactive digital reader from Internet Archive.
                </span>

                <div className="mt-5 flex items-center gap-2 text-xs text-neutral-400 bg-neutral-900/80 px-3.5 py-1.5 rounded-full border border-neutral-800">
                  <Info className="w-3.5 h-3.5 text-[#c76b35]" />
                  <span>Taking too long? </span>
                  <a 
                    href="https://archive.org/details/india-nahi-bharat-bolo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#c76b35] hover:underline font-semibold"
                  >
                    Click here to open directly
                  </a>
                </div>
              </div>
            )}

            {/* Internet Archive Embedded Book Reader */}
            <iframe
              key={iframeKey}
              id="ajBookIframe"
              src="https://archive.org/embed/india-nahi-bharat-bolo"
              title="India Nahi, Bharat Bolo — Online Book Reader"
              loading="eager"
              allowFullScreen
              onLoad={handleIframeLoad}
              className="absolute inset-0 w-full h-full border-0 bg-white"
            />
          </div>

          {/* Reader Footer Attribution & Secondary Links in English */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400 px-1">
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c76b35]" />
              <span>Read Online · <strong>India Nahi, Bharat Bolo</strong></span>
            </p>

            <p>
              Author: <a href="https://architjain.co/" className="text-white hover:text-[#c76b35] font-semibold transition-colors">Archit Jain</a>
            </p>

            <p>
              <a 
                href="https://archive.org/details/india-nahi-bharat-bolo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-neutral-300 hover:text-white underline decoration-neutral-600 hover:decoration-[#c76b35] transition-colors"
              >
                <span>View details & download on Internet Archive</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>
        </div>

        {/* Key Book Highlights / Themes in English */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-[#c76b35]/40 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-[#c76b35]/15 text-[#e8905b] flex items-center justify-center mb-3">
              <Globe2 className="w-5 h-5" />
            </div>
            <h4 className="font-heading text-base font-bold text-white mb-1.5">
              Civilizational Identity & History
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              A deep, research-driven inquiry into India's civilizational continuity, rich heritage, and cultural sovereignty.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-[#c76b35]/40 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-[#D4FF00]/15 text-[#D4FF00] flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-heading text-base font-bold text-white mb-1.5">
              Decolonizing the Mindset
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Moving beyond colonial frameworks to reconnect with the constitutional, historical, and authentic soul of 'Bharat'.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-[#c76b35]/40 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="font-heading text-base font-bold text-white mb-1.5">
              100% Free & Open Access
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Knowledge is a universal right. The complete publication is openly archived and accessible free of charge for all readers.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
