import { Episode } from '../types';
import samPitrodaThumb from '../assets/sam-pitroda-thumb.jpeg';
import manishShrivastavaThumb from '../assets/manish-shrivastava-thumb.jpeg';
import abhishekParmarThumb from '../assets/abhishek-parmar-thumb.jpeg';

export const CHANNEL_URL = 'https://youtube.com/@architjain9';
export const SPOTIFY_URL = 'https://open.spotify.com/show/architjain'; // REPLACE_WITH_REAL_LINK
export const INSTAGRAM_URL = 'https://instagram.com/architjain'; // REPLACE_WITH_REAL_LINK
export const TWITTER_URL = 'https://x.com/architjain'; // REPLACE_WITH_REAL_LINK
export const LINKEDIN_URL = 'https://linkedin.com/in/architjain'; // REPLACE_WITH_REAL_LINK

export const EPISODES_DATA: Episode[] = [
  // ==========================================
  // REAL SEED EPISODES WITH USER THUMBNAILS
  // ==========================================
  {
    id: 'sam-pitroda',
    title: 'Tech Guru of Congress: Top Whistleblower Reveals Hidden Agenda | Sam Pitroda',
    category: 'Political Chit-Chat',
    duration: '1h 14m',
    description: "Father of India's telecom revolution Sam Pitroda joins Archit for an explosive conversation on political strategy, Rajiv Gandhi's legacy, UPI, and the hidden agendas shaping national elections.",
    thumbnail: samPitrodaThumb,
    youtubeUrl: 'https://youtu.be/2pHRQdptcMs?si=-GjVz236VS3YvuTn',
    youtubeId: '2pHRQdptcMs',
    teaserStartTime: 30,
    featured: true,
    isNew: true,
    guest: 'Sam Pitroda',
    guestRole: "Tech Guru of Congress & Telecom Pioneer",
  },
  {
    id: 'manish-shrivastava',
    title: 'In the Car With Manish Shrivastava | State Bureau Chief, Press Trust of India',
    category: 'Political Chit-Chat',
    duration: '42m',
    description: 'Archit travels across Madhya Pradesh with Manish Shrivastava, State Bureau Chief of PTI, discussing ground political realities, investigative journalism in heartland India, and upcoming state elections.',
    thumbnail: manishShrivastavaThumb,
    youtubeUrl: 'https://youtube.com/@architjain9',
    youtubeId: '2pHRQdptcMs',
    teaserStartTime: 120,
    featured: true,
    isNew: true,
    guest: 'Manish Shrivastava',
    guestRole: 'State Bureau Chief, Press Trust of India',
  },
  {
    id: 'abhishek-parmar',
    title: 'Khaat Pe Charcha ft. Abhishek Parmar | VP, MP Youth Congress',
    category: 'Political Chit-Chat',
    duration: '35:21',
    description: 'Sitting on a charpai in rural Madhya Pradesh, Archit conducts a candid dialogue with Abhishek Parmar, Vice President of MP Youth Congress, on youth political representation, agrarian reality, and grassroots leadership.',
    thumbnail: abhishekParmarThumb,
    youtubeUrl: 'https://youtube.com/@architjain9',
    youtubeId: '2pHRQdptcMs',
    teaserStartTime: 210,
    featured: true,
    isNew: true,
    guest: 'Abhishek Parmar',
    guestRole: 'प्रदेश उपाध्यक्ष - मध्य प्रदेश युवा कांग्रेस',
  },
  {
    id: 'subhabrata-debnath',
    title: 'AI & The Future of Dubbing ft. Subhabrata Debnath (NeuralGarage)',
    category: 'Tech Talk',
    duration: '52m',
    description: 'IIT Kanpur alum and NeuralGarage co-founder breaks down VisualDub, generative AI in media, and lessons from building two startups.',
    // REPLACE_WITH_REAL_THUMBNAIL
    thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop',
    // REPLACE_WITH_REAL_LINK
    youtubeUrl: 'https://youtube.com/@architjain9',
    youtubeId: '2pHRQdptcMs',
    teaserStartTime: 300,
    featured: true,
    isNew: false,
    guest: 'Subhabrata Debnath',
    guestRole: 'Co-founder, NeuralGarage',
  },
  {
    id: 'vishwas-sarang',
    title: 'A Day With MP Minister Vishwas Sarang',
    category: 'Political Chit-Chat',
    duration: '48m',
    description: 'In the early monsoon, Archit spends a day in Bhopal with four-time MLA and cabinet minister Vishwas Sarang discussing governance, grassroots politics, and public policy.',
    // REPLACE_WITH_REAL_THUMBNAIL
    thumbnail: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=1200&auto=format&fit=crop',
    // REPLACE_WITH_REAL_LINK
    youtubeUrl: 'https://youtube.com/@architjain9',
    featured: true,
    isNew: false,
    guest: 'Vishwas Sarang',
    guestRole: 'Cabinet Minister & 4-time MLA',
  },
  {
    id: 'raktim-singh',
    title: 'Driving Digital Transformation ft. Raktim Singh',
    category: 'Tech Talk',
    duration: '44m',
    description: 'TEDx speaker and Amazon bestselling author Raktim Singh on what real enterprise digital transformation looks like beyond the corporate buzzwords.',
    // REPLACE_WITH_REAL_THUMBNAIL
    thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
    // REPLACE_WITH_REAL_LINK
    youtubeUrl: 'https://youtube.com/@architjain9',
    featured: false,
    isNew: false,
    guest: 'Raktim Singh',
    guestRole: 'TEDx Speaker & Bestselling Author',
  },
  {
    id: 'raj-kapoor',
    title: 'Blockchain & Remote Voting ft. Raj Kapoor',
    category: 'Tech Talk',
    duration: '58m',
    description: 'Exploring how cryptographic verification and decentralized ledgers could power tamper-proof remote voting systems for modern democracies.',
    // REPLACE_WITH_REAL_THUMBNAIL
    thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop',
    // REPLACE_WITH_REAL_LINK
    youtubeUrl: 'https://youtube.com/@architjain9',
    featured: false,
    isNew: false,
    guest: 'Raj Kapoor',
    guestRole: 'India Blockchain Alliance Founder',
  },
  {
    id: 'infosys-sustainable-ai',
    title: 'AI for Sustainable Development ft. Infosys',
    category: 'Tech Talk',
    duration: '39m',
    description: 'Real-world case studies and frameworks demonstrating how scalable AI algorithms are driving sustainability and green energy initiatives at scale.',
    // REPLACE_WITH_REAL_THUMBNAIL
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
    // REPLACE_WITH_REAL_LINK
    youtubeUrl: 'https://youtube.com/@architjain9',
    featured: false,
    isNew: false,
    guest: 'Tech Sustainability Lead',
    guestRole: 'Infosys Innovation Labs',
  },

  // ==========================================
  // PLACEHOLDER EPISODES (To fill out shelves)
  // PLACEHOLDER — replace with real episode
  // ==========================================
  {
    id: 'placeholder-deeptech-founding',
    title: 'Bootstrapping DeepTech in Bengaluru to Global Scale', // PLACEHOLDER — replace with real episode
    category: 'Founder & Innovator Stories',
    duration: '1h 05m',
    description: 'How a two-person team in Indiranagar engineered cutting-edge hardware sensors and scaled revenues across Silicon Valley and Tokyo.',
    // REPLACE_WITH_REAL_THUMBNAIL
    thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop',
    // REPLACE_WITH_REAL_LINK
    youtubeUrl: 'https://youtube.com/@architjain9',
    featured: true,
    isNew: true,
    guest: 'Siddharth Varma',
    guestRole: 'Founder & CEO, HyperSense AI',
  },
  {
    id: 'placeholder-election-tech',
    title: 'The Algorithms Shaping Modern Elections in India', // PLACEHOLDER — replace with real episode
    category: 'Political Chit-Chat',
    duration: '47m',
    description: 'A non-partisan insider breakdown on sentiment modeling, digital constituency outreach, and countering synthetic disinformation during campaigns.',
    // REPLACE_WITH_REAL_THUMBNAIL
    thumbnail: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=1200&auto=format&fit=crop',
    // REPLACE_WITH_REAL_LINK
    youtubeUrl: 'https://youtube.com/@architjain9',
    featured: false,
    isNew: false,
    guest: 'Aditi Sharma',
    guestRole: 'Electoral Strategist & Policy Fellow',
  },
  {
    id: 'placeholder-fintech-superapp',
    title: 'Building for the Next Billion: UPI, ONDC & Beyond', // PLACEHOLDER — replace with real episode
    category: 'Founder & Innovator Stories',
    duration: '56m',
    description: 'Unpacking the next paradigm shift in digital public goods and how fintech infrastructure is transforming tier-2 and tier-3 commerce.',
    // REPLACE_WITH_REAL_THUMBNAIL
    thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop',
    // REPLACE_WITH_REAL_LINK
    youtubeUrl: 'https://youtube.com/@architjain9',
    featured: false,
    isNew: false,
    guest: 'Varun Grover',
    guestRole: 'Fintech Founder & Angel Investor',
  },
  {
    id: 'placeholder-semiconductor-mission',
    title: "India's Semiconductor Blueprint: Fab Realities vs Hype", // PLACEHOLDER — replace with real episode
    category: 'Tech Talk',
    duration: '1h 02m',
    description: 'Inside the race for silicon sovereignty — packaging plants, cleanrooms, talent pipelines, and multi-billion dollar incentives.',
    // REPLACE_WITH_REAL_THUMBNAIL
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
    // REPLACE_WITH_REAL_LINK
    youtubeUrl: 'https://youtube.com/@architjain9',
    featured: false,
    isNew: false,
    guest: 'Dr. K. Narayanan',
    guestRole: 'Semiconductor Strategy Advisor',
  },
  {
    id: 'placeholder-policy-policymakers',
    title: 'Parliament, Tech Regulations & The Digital India Act', // PLACEHOLDER — replace with real episode
    category: 'Political Chit-Chat',
    duration: '51m',
    description: 'Candid reflections from parliamentary corridors on data privacy, sovereign AI, algorithmic accountability, and national security.',
    // REPLACE_WITH_REAL_THUMBNAIL
    thumbnail: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200&auto=format&fit=crop',
    // REPLACE_WITH_REAL_LINK
    youtubeUrl: 'https://youtube.com/@architjain9',
    featured: false,
    isNew: false,
    guest: 'Senior Policy Analyst',
    guestRole: 'Public Policy Think Tank',
  },
  {
    id: 'placeholder-fact-check-aggregator',
    title: "How We Built India's Largest Fact-Checking Aggregator", // PLACEHOLDER — replace with real episode
    category: 'Founder & Innovator Stories',
    duration: '49m',
    description: 'Archit breaks down the architectural challenges of combating fake news at scale using automated NLP verification and crowd reporting.',
    // REPLACE_WITH_REAL_THUMBNAIL
    thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop',
    // REPLACE_WITH_REAL_LINK
    youtubeUrl: 'https://youtube.com/@architjain9',
    featured: false,
    isNew: false,
    guest: 'Archit Jain Special Solo',
    guestRole: 'Founder & Host',
  },
  {
    id: 'placeholder-ev-revolution',
    title: 'The Electric 2-Wheeler Battleground in India', // PLACEHOLDER — replace with real episode
    category: 'Founder & Innovator Stories',
    duration: '43m',
    description: 'Battery supply chains, domestic manufacturing, fires, and the unit economics of disrupting conventional petrol giants.',
    // REPLACE_WITH_REAL_THUMBNAIL
    thumbnail: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200&auto=format&fit=crop',
    // REPLACE_WITH_REAL_LINK
    youtubeUrl: 'https://youtube.com/@architjain9',
    featured: false,
    isNew: false,
    guest: 'Rohan Mehra',
    guestRole: 'EV Mobility Co-founder',
  },
  {
    id: 'placeholder-space-tech',
    title: 'Spacetech Rockets & Satellite Fleets from Hyderabad', // PLACEHOLDER — replace with real episode
    category: 'Tech Talk',
    duration: '1h 12m',
    description: 'From 3D printed cryogenic rocket engines to commercial launch manifests, how private aerospace is booming in India.',
    // REPLACE_WITH_REAL_THUMBNAIL
    thumbnail: 'https://images.unsplash.com/photo-1517976487515-5c1cfdf494d1?q=80&w=1200&auto=format&fit=crop',
    // REPLACE_WITH_REAL_LINK
    youtubeUrl: 'https://youtube.com/@architjain9',
    featured: false,
    isNew: false,
    guest: 'Vikram Joshi',
    guestRole: 'Aerospace Propulsion Engineer',
  },
];
