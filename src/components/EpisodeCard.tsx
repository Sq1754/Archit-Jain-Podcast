import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Clock, Volume2, VolumeX, RotateCcw, ExternalLink, Loader2 } from 'lucide-react';
import { Episode } from '../types';
import { sanitizeSafeUrl, extractYoutubeId } from '../utils/security';

interface EpisodeCardProps {
  episode: Episode;
  onQuickInfo?: (episode: Episode) => void;
}

const TEASER_DURATION = 30; // 30 seconds teaser

export const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, onQuickInfo }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTeaserActive, setIsTeaserActive] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(TEASER_DURATION);

  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const videoId = episode.youtubeId || extractYoutubeId(episode.youtubeUrl, '2pHRQdptcMs');
  const startTime = episode.teaserStartTime ?? 30;
  const endTime = startTime + TEASER_DURATION;

  // Clean up all timers on unmount
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, []);

  // Handle 30-second countdown once teaser is active and loaded
  useEffect(() => {
    if (!isTeaserActive) {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      setSecondsLeft(TEASER_DURATION);
      return;
    }

    // Start 30s countdown
    countdownIntervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Loop teaser cleanly
          return TEASER_DURATION;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [isTeaserActive]);

  // Hover In: 350ms dwell timer before starting 30-second video teaser
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);

    hoverTimerRef.current = setTimeout(() => {
      setIsTeaserActive(true);
    }, 350);
  }, []);

  // Hover Out: Immediately terminate teaser, tear down player, reset timers
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    setIsTeaserActive(false);
    setIsVideoLoaded(false);
    setSecondsLeft(TEASER_DURATION);
    setIsMuted(true);
  }, []);

  // Toggle Mute without opening link
  const handleToggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  // Restart 30-second teaser preview
  const handleRestartTeaser = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSecondsLeft(TEASER_DURATION);
    setIsVideoLoaded(false);
    // brief refresh
    setIsTeaserActive(false);
    setTimeout(() => setIsTeaserActive(true), 50);
  };

  // Toggle Mobile Preview without hover
  const handleMobileTeaserToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isTeaserActive) {
      handleMouseLeave();
    } else {
      setIsHovered(true);
      setIsTeaserActive(true);
    }
  };

  // Embed URL with exact 30s window (start to start + 30)
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=${
    isMuted ? 1 : 0
  }&controls=0&start=${startTime}&end=${endTime}&loop=1&playlist=${videoId}&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&playsinline=1&enablejsapi=1`;

  // Scrubber percentage from 0 to 100%
  const progressPercent = Math.min(100, Math.max(0, ((TEASER_DURATION - secondsLeft) / TEASER_DURATION) * 100));

  return (
    <div 
      className="relative group/card flex-none w-[260px] sm:w-[300px] md:w-[330px] select-none py-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Clickable Card Linking to YouTube */}
      <a
        href={sanitizeSafeUrl(episode.youtubeUrl)}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative rounded-[10px] overflow-hidden bg-neutral-900 border border-neutral-800/80 transition-all duration-300 ease-out transform group-hover/card:scale-[1.05] group-hover/card:shadow-[0_16px_36px_rgba(0,0,0,0.9),0_0_20px_rgba(212,255,0,0.2)] group-hover/card:border-neutral-700 z-10 group-hover/card:z-20 cursor-pointer"
        aria-label={`Watch full episode: ${episode.title} on YouTube`}
      >
        {/* Thumbnail & Video Frame (16:9) */}
        <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
          
          {/* Base Poster Thumbnail Image */}
          <img
            src={episode.thumbnail}
            alt={episode.title}
            referrerPolicy="no-referrer"
            loading="lazy"
            className={`w-full h-full object-cover object-center transition-all duration-500 ease-out ${
              isTeaserActive && isVideoLoaded ? 'opacity-0 scale-100' : 'opacity-100 group-hover/card:scale-105'
            }`}
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.onerror = null;
              if (!target.src.includes('ytimg.com')) {
                target.src = 'https://i.ytimg.com/vi/2pHRQdptcMs/hqdefault.jpg';
              }
            }}
          />

          {/* 30-Second Video Teaser Layer */}
          {isTeaserActive && (
            <div className="absolute inset-0 z-10 bg-black overflow-hidden pointer-events-none">
              {/* Spinner while iframe initializes */}
              {!isVideoLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950 text-neutral-300 gap-2 z-20">
                  <Loader2 className="w-6 h-6 text-[#D4FF00] animate-spin" />
                  <span className="text-[11px] font-mono tracking-wider text-neutral-400">Loading 30s teaser...</span>
                </div>
              )}

              {/* YouTube Iframe Teaser Embed */}
              <iframe
                key={`${videoId}-${startTime}-${isMuted ? 'muted' : 'unmuted'}`}
                src={embedUrl}
                title={`${episode.title} 30-second teaser`}
                className={`w-full h-full object-cover scale-[1.35] transition-opacity duration-300 ${
                  isVideoLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                allow="autoplay; encrypted-media; picture-in-picture"
                onLoad={() => setIsVideoLoaded(true)}
              />
            </div>
          )}

          {/* Constant subtle bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-15" />

          {/* Regular Badges (Shown when teaser is NOT active) */}
          {!isTeaserActive && (
            <>
              {/* New / Featured Badges */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-20">
                {episode.isNew && (
                  <span className="bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow">
                    NEW
                  </span>
                )}
                {episode.featured && !episode.isNew && (
                  <span className="bg-[#D4FF00] text-black text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                    FEATURED
                  </span>
                )}
              </div>

              {/* Duration Badge Bottom-Right */}
              <div className="absolute bottom-2.5 right-2.5 z-20 flex items-center gap-1 bg-black/90 text-neutral-200 text-xs font-mono font-medium px-2 py-0.5 rounded border border-neutral-800/90 shadow">
                <Clock className="w-3 h-3 text-[#D4FF00]" />
                <span>{episode.duration}</span>
              </div>

              {/* Hover overlay hint before dwell triggers teaser */}
              {isHovered && (
                <div className="absolute inset-0 bg-[#0A0A0A]/70 backdrop-blur-[1px] flex flex-col justify-between p-3.5 z-20 transition-opacity duration-200">
                  <div className="flex items-start justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4FF00]">
                      {episode.category}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-300">
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>

                  <div className="self-center my-auto">
                    <div className="w-12 h-12 rounded-full bg-[#D4FF00] text-black flex items-center justify-center shadow-[0_0_20px_rgba(212,255,0,0.6)] transform scale-95 animate-pulse">
                      <Play className="w-6 h-6 fill-black ml-0.5" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-neutral-300">
                    <span className="font-semibold truncate max-w-[190px]">{episode.title}</span>
                    <span className="text-[#D4FF00] font-mono text-[10px]">30s Teaser ➔</span>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ACTIVE TEASER HUD OVERLAYS (When 30s teaser is playing) */}
          {isTeaserActive && (
            <div className="absolute inset-0 z-25 flex flex-col justify-between p-2.5 pointer-events-none">
              
              {/* Top Controls Bar */}
              <div className="flex items-center justify-between">
                {/* 30s Teaser Live Badge */}
                <div className="flex items-center gap-1.5 bg-black/85 backdrop-blur-md px-2 py-1 rounded-md border border-[#D4FF00]/40 text-[#D4FF00] text-[10px] font-black uppercase tracking-wider shadow">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                  <span>30s TEASER</span>
                </div>

                {/* Right controls: Countdown + Mute Toggle + Replay */}
                <div className="flex items-center gap-1.5 pointer-events-auto">
                  {/* Countdown Badge */}
                  <span className="bg-black/85 backdrop-blur-md text-white text-[11px] font-mono font-bold px-2 py-0.5 rounded border border-neutral-700/80 shadow">
                    0:{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
                  </span>

                  {/* Audio Mute/Unmute Button */}
                  <button
                    onClick={handleToggleMute}
                    aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                    title={isMuted ? 'Unmute teaser' : 'Mute teaser'}
                    className="w-7 h-7 rounded-md bg-black/85 hover:bg-[#D4FF00] hover:text-black text-white flex items-center justify-center border border-neutral-700 transition-colors shadow"
                  >
                    {isMuted ? (
                      <VolumeX className="w-3.5 h-3.5 text-neutral-300" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5 text-[#D4FF00] hover:text-black" />
                    )}
                  </button>

                  {/* Restart Teaser Button */}
                  <button
                    onClick={handleRestartTeaser}
                    aria-label="Restart 30-second teaser"
                    title="Restart 30s teaser"
                    className="w-7 h-7 rounded-md bg-black/85 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center border border-neutral-700 transition-colors shadow"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Bottom Bar: Action prompt & 30s Progress Bar Scrubber */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] px-0.5">
                  <span className="font-semibold truncate max-w-[180px] drop-shadow">
                    {episode.guest ? `ft. ${episode.guest}` : episode.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#D4FF00] bg-black/80 px-1.5 py-0.5 rounded border border-[#D4FF00]/30 shadow">
                    <span>Watch Full (4K)</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </div>

                {/* 30-Second Scrubber Progress Bar */}
                <div className="w-full h-1 bg-neutral-800/90 rounded-full overflow-hidden border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-[#D4FF00] to-lime-400 transition-all duration-1000 ease-linear shadow-[0_0_8px_rgba(212,255,0,0.8)]"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Mobile Tap-To-Preview Quick Button (Visible on mobile/small screens) */}
          <div className="sm:hidden absolute bottom-2 left-2 z-20">
            <button
              onClick={handleMobileTeaserToggle}
              className="bg-black/90 text-[#D4FF00] text-[10px] font-bold px-2 py-0.5 rounded border border-[#D4FF00]/50 shadow"
            >
              {isTeaserActive ? '■ Stop Teaser' : '▶ 30s Teaser'}
            </button>
          </div>

        </div>
      </a>

      {/* Persistent Title & Category below thumbnail for immediate catalog browsing */}
      <div className="mt-2.5 px-0.5">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4FF00]">
            {episode.category}
          </span>
          {episode.guest && (
            <span className="text-[11px] text-neutral-400 truncate">
              • {episode.guest}
            </span>
          )}
        </div>
        <h4 
          className="text-neutral-100 font-semibold text-sm leading-snug line-clamp-2 group-hover/card:text-white transition-colors"
          title={episode.title}
        >
          {episode.title}
        </h4>
      </div>
    </div>
  );
};

