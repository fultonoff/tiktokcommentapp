import { ColorTemplate } from "@/types/commentCreation/commentTypes";



export const PLATFORMS = [
  { id: 'youtube', label: 'YouTube', color: '#FF0000', icon: 'youtube' },
  { id: 'instagram', label: 'Instagram', color: '#E4405F', icon: 'instagram' },
  { id: 'twitter', label: 'Twitter (X)', color: '#1DA1F2', icon: 'twitter' },
  { id: 'tiktok', label: 'TikTok', color: '#000000', icon: 'music2' },
  { id: 'facebook', label: 'Facebook', color: '#1877F2', icon: 'facebook' },
] as const;

export const TONES = [
  'Funny',
  'Supportive',
  'Professional',
  'Witty',
  'Sarcastic',
  'Insightful',
  'Hype',
];

export const COLOR_TEMPLATES: ColorTemplate[] = [
  { name: 'Light Clear', bg: '#ffffff', text: '#000000', isDark: false },
  { name: 'Deep Dark', bg: '#121212', text: '#ffffff', isDark: true },
  { name: 'Twitter Blue', bg: '#1DA1F2', text: '#ffffff', isDark: true },
  { name: 'Midnight Gold', bg: '#0F172A', text: '#FACC15', isDark: true },
  { name: 'Soft Rose', bg: '#FFF1F2', text: '#9F1239', isDark: false },
  { name: 'Forest Emerald', bg: '#064E3B', text: '#D1FAE5', isDark: true },
  { name: 'Nordic Sky', bg: '#F0F9FF', text: '#0369A1', isDark: false },
  { name: 'Cyber Neon', bg: '#000000', text: '#39FF14', isDark: true },
  { name: 'Barbie Pink', bg: '#FDF2F8', text: '#BE185D', isDark: false },
  { name: 'Sunset Glow', bg: '#FFF7ED', text: '#C2410C', isDark: false },
  { name: 'Royal Purple', bg: '#581C87', text: '#F5F3FF', isDark: true },
  { name: 'Coffee Cream', bg: '#451A03', text: '#FDE68A', isDark: true },
  { name: 'Slate Gray', bg: '#334155', text: '#F8FAFC', isDark: true },
  { name: 'Mint Leaf', bg: '#F0FDF4', text: '#15803D', isDark: false },
  { name: 'Electric Indigo', bg: '#4338CA', text: '#E0E7FF', isDark: true },
  { name: 'Sunny Lemon', bg: '#FEFCE8', text: '#854D0E', isDark: false },
];

export const AVATARS = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Jasper',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Milo',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Sasha',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Kiki',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Leo',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Nala',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Max',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Toby',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Mia',
];


export const FONT_OPTIONS = [
  { name: 'Inter', value: "'Inter', sans-serif" },
  { name: 'Roboto', value: "'Roboto', sans-serif" },
  { name: 'Open Sans', value: "'Open Sans', sans-serif" },
  { name: 'Montserrat', value: "'Montserrat', sans-serif" },
  { name: 'Playfair Display', value: "'Playfair Display', serif" },
  { name: 'Courier New', value: "'Courier New', monospace" },
];