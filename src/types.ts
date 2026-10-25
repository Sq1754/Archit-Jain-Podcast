export interface Episode {
  id: string;
  title: string;
  category: 'Tech Talk' | 'Political Chit-Chat' | 'Founder & Innovator Stories';
  duration: string;
  description: string;
  thumbnail: string; // REPLACE_WITH_REAL_THUMBNAIL
  youtubeUrl: string; // REPLACE_WITH_REAL_LINK
  featured?: boolean;
  isNew?: boolean;
  guest?: string;
  guestRole?: string;
  season?: string;
}

export type CategoryFilter = 'All' | 'Latest Episodes' | 'Tech Talk' | 'Political Chit-Chat' | 'Founder & Innovator Stories';

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}
