
export type Platform = 'youtube' | 'instagram' | 'twitter' | 'tiktok' | 'facebook';

/* Types for Chat messaging previews */
export type ChatPlatform = 'instagram' | 'messenger' | 'telegram' | 'snapchat' | 'whatsapp';

export interface ChatParticipant {
  name: string;
  avatar: string;
  status: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  senderId: string;
  timestamp: string;
}

export interface ChatSession {
  platform: ChatPlatform;
  otherParticipant: ChatParticipant;
  messages: ChatMessage[];
  themeColor?: string;
}

export interface CommentData {
  id: string
  text: string
  authorName: string
  authorHandle: string
  authorAvatar: string
  timestamp: string
  likes: string
  isVerified: boolean
  replies: CommentData[]
  backgroundColor: string
  textColor: string
  isDark: boolean
  fontFamily: string
  fontSize: number
  replyBgEnabled?: boolean
  replyBgColor?: string
}

export interface ColorTemplate {
  name: string;
  bg: string;
  text: string;
  isDark: boolean;
}

export interface PlatformConfig {
  id: Platform;
  label: string;
  color: string;
  icon: string;
}

export type FocusStore = {
  focusedId: string | null;
  setFocusedId: (id: string | null) => void;
};