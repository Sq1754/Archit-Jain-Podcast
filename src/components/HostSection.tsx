import React from 'react';
import { 
  Award, 
  BookOpen, 
  MapPin, 
  Mic2, 
  Rocket, 
  Youtube, 
  Radio, 
  Instagram, 
  Twitter, 
  Linkedin, 
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { CHANNEL_URL, SPOTIFY_URL, INSTAGRAM_URL, TWITTER_URL, LINKEDIN_URL } from '../data/episodes';

interface HostSectionProps {
  onOpenContact?: () => void;
}

export const HostSection: React.FC<HostSectionProps> = ({ onOpenContact }) => {
  return (
    <section id="about-section" className="relative py-16 sm:py-24 bg-[#0A0A0A] border-t border-neutral-900 overflow-hidden">
      {/* Background glow aesthetics */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#D4FF00]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Eyebrow */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#D4FF00]" />
          <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#D4FF00]">
            THE CREATOR & HOST
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Host Portrait & Visual Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative ring */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[#D4FF00]/30 via-neutral-800 to-transparent blur-sm" />
              
              <div className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl">
                {/* Host Studio Image */}
                <div className="aspect-[4/5] relative bg-neutral-950 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
                    alt="Archit Jain - Host and Creator"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top filter brightness-95 contrast-105"
                  />
                  {/* Cinematic gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/20" />
                  
                  {/* Floating Host Badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                    <div>
                      <h4 className="font-heading text-lg font-extrabold text-white">
                        Archit Jain
                      </h4>
                      <p className="text-xs text-neutral-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#D4FF00]" />
                        Bengaluru, India
                      </p>
                    </div>

                    <div className="w-9 h-9 rounded-lg bg-[#D4FF00] flex items-center justify-center text-black">
                      <Mic2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Quick Credentials Strip */}
                <div className="p-4 bg-neutral-950/80 border-t border-neutral-800/80 flex items-center justify-around text-center">
                  <div>
                    <div className="text-base font-black text-white">4+</div>
                    <div className="text-[10px] uppercase tracking-wider text-neutral-400">IIT Keynotes</div>
                  </div>
                  <div className="w-[1px] h-7 bg-neutral-800" />
                  <div>
                    <div className="text-base font-black text-white">2x</div>
                    <div className="text-[10px] uppercase tracking-wider text-neutral-400">Founder</div>
                  </div>
                  <div className="w-[1px] h-7 bg-neutral-800" />
                  <div>
                    <div className="text-base font-black text-white">1</div>
                    <div className="text-[10px] uppercase tracking-wider text-neutral-400">Published Book</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio & Track Record (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Candid Conversations with <span className="text-[#D4FF00]">Minds Shaping India</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
                Archit Jain is the host and creator of this podcast, based in Bengaluru. He's featured speaker at IIT Roorkee, IIT Guwahati, IIT Goa, and BITS Pilani, author of <span className="text-white font-semibold italic">"India Nahi Bharat Bolo"</span>, and founder of two startups including India's largest fact-checking aggregator. His show dives into candid conversations with technology leaders, innovators, and political figures.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800/80 hover:border-neutral-700 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#D4FF00]/10 text-[#D4FF00]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-sm">Keynote Speaker</h5>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Invited speaker at IIT Roorkee, IIT Guwahati, IIT Goa, and BITS Pilani.
                    </p>
                  </div>
                </div>
              </div>

              <div 
                onClick={() => document.getElementById('book-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800/80 hover:border-[#c76b35]/60 transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#c76b35]/15 text-[#e8905b] group-hover:scale-110 transition-transform">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-bold text-white text-sm group-hover:text-[#e8905b] transition-colors">Published Author</h5>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#c76b35]/20 text-[#e8905b] font-medium">Read Online</span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Author of <em>"इंडिया नहीं, भारत बोलो" (India Nahi Bharat Bolo)</em>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800/80 hover:border-neutral-700 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#D4FF00]/10 text-[#D4FF00]">
                    <Rocket className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-sm">Startup Founder</h5>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Built India's largest fact-checking aggregator and deep-tech products.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800/80 hover:border-neutral-700 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#D4FF00]/10 text-[#D4FF00]">
                    <Mic2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-sm">Unfiltered Interviews</h5>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Direct dialogue with ministers, technologists, telecom pioneers, and founders.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social & Subscribe Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <a
                href={CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#D4FF00] hover:bg-[#bbf000] text-black font-bold text-sm transition-transform hover:scale-105"
              >
                <Youtube className="w-4 h-4" />
                <span>Subscribe on YouTube</span>
              </a>

              <a
                href={SPOTIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white font-medium text-sm border border-neutral-700"
              >
                <Radio className="w-4 h-4 text-[#1DB954]" />
                <span>Spotify</span>
              </a>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white font-medium text-sm border border-neutral-700"
              >
                <Instagram className="w-4 h-4 text-[#E4405F]" />
                <span>Instagram</span>
              </a>

              <a
                href={TWITTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white font-medium text-sm border border-neutral-700"
              >
                <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                <span>X</span>
              </a>

              {onOpenContact && (
                <button
                  onClick={onOpenContact}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-white text-sm font-medium border border-neutral-600"
                >
                  <span>Book / Contact</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
