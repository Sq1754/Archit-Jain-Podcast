import React, { useState, useMemo } from 'react';
import { Search, X, Play, Clock, Sparkles, ExternalLink } from 'lucide-react';
import { Episode } from '../types';
import { sanitizeSafeUrl, sanitizeTextInput } from '../utils/security';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  episodes: Episode[];
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, episodes }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredEpisodes = useMemo(() => {
    return episodes.filter((ep) => {
      const matchesCategory = selectedCategory === 'All' || ep.category === selectedCategory;
      const q = query.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesTitle = ep.title.toLowerCase().includes(q);
      const matchesDesc = ep.description.toLowerCase().includes(q);
      const matchesGuest = ep.guest ? ep.guest.toLowerCase().includes(q) : false;
      const matchesCategoryName = ep.category.toLowerCase().includes(q);

      return matchesCategory && (matchesTitle || matchesDesc || matchesGuest || matchesCategoryName);
    });
  }, [episodes, query, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#121212] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#D4FF00] flex-none" />
          <input
            type="text"
            autoFocus
            maxLength={100}
            value={query}
            onChange={(e) => setQuery(sanitizeTextInput(e.target.value, 100))}
            placeholder="Search episodes, guests (e.g. Sam Pitroda, AI, UPI)..."
            className="w-full bg-transparent text-white placeholder-neutral-500 text-base focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-xs text-neutral-400 hover:text-white px-2 py-1 bg-neutral-800 rounded"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="px-4 py-3 bg-neutral-950/60 border-b border-neutral-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs font-semibold">
          {['All', 'Political Chit-Chat', 'Tech Talk', 'Founder & Innovator Stories'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#D4FF00] text-black font-bold'
                  : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2.5">
          {filteredEpisodes.length > 0 ? (
            filteredEpisodes.map((ep) => (
              <a
                key={ep.id}
                href={sanitizeSafeUrl(ep.youtubeUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2.5 rounded-xl bg-neutral-900/60 hover:bg-neutral-800/80 border border-neutral-800/60 hover:border-neutral-700 transition-all group"
              >
                <div className="relative w-24 sm:w-28 aspect-video rounded-lg overflow-hidden flex-none bg-neutral-950">
                  <img
                    src={ep.thumbnail}
                    alt={ep.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.onerror = null;
                      if (!target.src.includes('ytimg.com')) {
                        target.src = 'https://i.ytimg.com/vi/2pHRQdptcMs/hqdefault.jpg';
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-[#D4FF00] text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-3 h-3 fill-black ml-0.5" />
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#D4FF00]">
                      {ep.category}
                    </span>
                    <span className="text-[11px] text-neutral-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {ep.duration}
                    </span>
                  </div>
                  <h4 className="text-white text-sm font-semibold truncate group-hover:text-[#D4FF00] transition-colors">
                    {ep.title}
                  </h4>
                  {ep.guest && (
                    <p className="text-xs text-neutral-400 truncate">
                      Guest: {ep.guest} {ep.guestRole ? `(${ep.guestRole})` : ''}
                    </p>
                  )}
                </div>

                <div className="flex-none p-2 text-neutral-400 group-hover:text-white">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>
            ))
          ) : (
            <div className="py-12 text-center text-neutral-400">
              <p className="text-sm">No episodes found matching your query.</p>
              <p className="text-xs text-neutral-500 mt-1">Try searching for keywords like "Sam Pitroda", "AI", or "Voting".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
