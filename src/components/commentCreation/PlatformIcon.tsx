
import React from 'react';
import { Youtube, Instagram, Twitter, Music2, Facebook } from 'lucide-react';
import { Platform } from '@/types/commentCreation/commentTypes';


interface Props {
  platform: Platform;
  className?: string;
}

export const PlatformIcon: React.FC<Props> = ({ platform, className }) => {
  switch (platform) {
    case 'youtube': return <Youtube className={className} />;
    case 'instagram': return <Instagram className={className} />;
    case 'twitter': return <Twitter className={className} />;
    case 'tiktok': return <Music2 className={className} />;
    case 'facebook': return <Facebook className={className} />;
    default: return null;
  }
};
