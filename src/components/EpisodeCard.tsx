import React from 'react';
import { Play, Clock, Sparkles, ExternalLink } from 'lucide-react';
import { Episode } from '../types';
import { sanitizeSafeUrl } from '../utils/security';

interface EpisodeCardProps {
  episode: Episode;
  onQuickInfo?: (episode: Episode) => void;
}

export const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, onQuickInfo }) => {
  return (
    <div className="relative group/card flex-none w-[260px] sm:w-[300px] md:w-[330px] select-none py-2">
      {/* Clickable Card Linking to YouTube */}
      <a
        href={sanitizeSafeUrl(episode.youtubeUrl)}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative rounded-[10px] overflow-hidden bg-neutral-900 border border-neutral-800/80 transition-all duration-300 ease-out transform group-hover/card:scale-[1.05] group-hover/card:shadow-[0_12px_30px_rgba(0,0,0,0.8),0_0_16px_rgba(212,255,0,0.15)] group-hover/card:border-neutral-700 z-10 group-hover/card:z-20 cursor-pointer"
        aria-label={`Watch ${episode.title} on YouTube`}
      >
        {/* Thumbnail Aspect 16:9 */}
        <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
          <img
            src={episode.thumbnail}
            alt={episode.title}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover/card:scale-105"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.onerror = null;
              if (!target.src.includes('ytimg.com')) {
                target.src = 'https://i.ytimg.com/vi/2pHRQdptcMs/hqdefault.jpg';
              }
            }}
          />

          {/* Constant subtle bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* New / Featured Badges */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
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

          {/* Duration Badge Bottom-Right (small dark pill/box) */}
          <div className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1 bg-black/90 text-neutral-200 text-xs font-mono font-medium px-2 py-0.5 rounded border border-neutral-800/90 shadow">
            <Clock className="w-3 h-3 text-[#D4FF00]" />
            <span>{episode.duration}</span>
          </div>

          {/* Hover Overlay with Play Icon & Quick Details */}
          <div className="absolute inset-0 bg-[#0A0A0A]/85 backdrop-blur-[2px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-250 flex flex-col justify-between p-3.5 z-20">
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4FF00]">
                {episode.category}
              </span>
              <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-300 group-hover/card:text-white">
                <ExternalLink className="w-3 h-3" />
              </div>
            </div>

            {/* Center Play Pulse Icon */}
            <div className="self-center my-auto">
              <div className="w-12 h-12 rounded-full bg-[#D4FF00] text-black flex items-center justify-center shadow-[0_0_20px_rgba(212,255,0,0.6)] transform scale-90 group-hover/card:scale-100 transition-transform duration-250">
                <Play className="w-6 h-6 fill-black ml-0.5" />
              </div>
            </div>

            {/* Bottom Title & Guest in Hover Overlay */}
            <div>
              <p className="text-white text-xs sm:text-sm font-bold line-clamp-2 leading-snug">
                {episode.title}
              </p>
              {episode.guest && (
                <p className="text-neutral-400 text-[11px] font-medium mt-1 truncate">
                  ft. {episode.guest}
                </p>
              )}
            </div>
          </div>
        </div>
      </a>

      {/* Persistent Title & Category below thumbnail for immediate browsing */}
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
