
import React from 'react';
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal, ThumbsUp, ThumbsDown } from 'lucide-react';
import { CommentData, Platform } from '@/types/commentCreation/commentTypes';
import { Locale, translations } from './translations';


interface Props {
  platform: Platform;
  data: CommentData;
  cardRef?: React.RefObject<HTMLDivElement>;
  isNested?: boolean;
  locale?: Locale;
}

export const CommentCard: React.FC<Props> = ({ platform, data, cardRef, isNested = false, locale = 'en' }) => {
  const { text, authorName, authorHandle, authorAvatar, timestamp, likes, isVerified, replies, backgroundColor, textColor, isDark, replyBgEnabled, replyBgColor, fontFamily, fontSize } = data;
  const t = translations[locale];

  const bubbleStyle = {
    backgroundColor: backgroundColor || '#ffffff',
    color: textColor || (isDark ? '#ffffff' : '#000000'),
    fontFamily: fontFamily || "'Inter', sans-serif",
  };

  const textStyle = {
    fontSize: fontSize ? `${fontSize}px` : 'inherit',
    lineHeight: '1.4',
  };

  const renderVerifiedBadge = (size = "w-4 h-4") => {
    if (!isVerified) return null;
    
    let badgeColor = "text-[#1d9bf0]"; 
    if (platform === 'youtube') badgeColor = "text-[#606060]";
    if (platform === 'instagram') badgeColor = "text-[#0095f6]";
    if (platform === 'facebook') badgeColor = "text-[#1877f2]";
    if (platform === 'tiktok') badgeColor = "text-[#20d5ec]";

    return (
      <svg 
        viewBox="0 0 24 24" 
        className={`${size} shrink-0 fill-current ${badgeColor} inline-block align-middle ml-1`}
        aria-label="Verified"
      >
        <path d="M22.5 12.5c0-1.58-.88-2.95-2.18-3.66.26-1.55-.17-3.14-1.24-4.21s-2.66-1.5-4.21-1.24c-.71-1.3-2.08-2.18-3.66-2.18s-2.95.88-3.66 2.18c-1.55-.26-3.14.17-4.21 1.24s-1.5 2.66-1.24 4.21c-1.3.71-2.18 2.08-2.18 3.66s.88 2.95 2.18 3.66c-.26 1.55.17 3.14 1.24 4.21s2.66 1.5 4.21 1.24c.71 1.3 2.08 2.18-3.66 2.18s2.95-.88 3.66-2.18c1.55.26 3.14-.17 4.21-1.24s1.5-2.66 1.24-4.21c1.3-.71 2.18-2.08 2.18-3.66zm-12.28 4.21l-3.21-3.21 1.41-1.41 1.8 1.8 4.54-4.54 1.41 1.41-5.95 5.95z" />
      </svg>
    );
  };

  const renderContent = () => {
    switch (platform) {
      case 'tiktok':
        return (
          <div className="flex flex-col items-start w-full">
            <div style={bubbleStyle} className={`relative p-4 rounded-[1.25rem] shadow-sm w-full font-sans transition-all duration-300`}>
              <div className="flex flex-col gap-0.5">
                {!isNested && <div className="text-[#8A8A8E] text-[11px] font-bold opacity-70 mb-1">{t.tiktokReplyTemplate.replace('{name}', authorName)}</div>}
                <div className="flex items-center gap-3">
                  <img src={authorAvatar} className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover shrink-0 border border-white/10" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-[13px] sm:text-[14px] truncate">{authorName}</span>
                      {renderVerifiedBadge("w-3.5 h-3.5")}
                    </div>
                    <p style={textStyle} className="leading-tight break-words font-medium mt-0.5">{text}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-[11px] font-bold opacity-40">
                      <span>{timestamp}</span>
                      <span>Reply</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-0.5 opacity-50 px-1">
                    <Heart className="w-5 h-5" />
                    <span className="text-[10px] font-bold">{likes}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'twitter':
        return (
          <div style={bubbleStyle} className={`p-4 rounded-2xl shadow-sm border border-white/5 w-full`}>
            <div className="flex gap-3">
              <div className="flex flex-col items-center shrink-0">
                <img src={authorAvatar} className="w-10 h-10 rounded-full object-cover" />
                {replies?.length > 0 && <div className="w-[1.5px] flex-1 bg-current opacity-10 mt-2"></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="font-bold text-[14px] sm:text-[15px] truncate">{authorName}</span>
                  {renderVerifiedBadge("w-3.5 h-3.5")}
                  <span className="text-[13px] opacity-60 truncate">@{authorHandle} · {timestamp}</span>
                </div>
                <p style={textStyle} className="mt-1 leading-relaxed break-words">{text}</p>
                <div className="mt-3 flex items-center justify-between opacity-50 max-w-[220px]">
                   <div className="flex items-center gap-1.5"><MessageCircle className="w-4 h-4" /><span className="text-[11px]">12</span></div>
                   <div className="flex items-center gap-1.5"><Repeat2 className="w-4 h-4" /><span className="text-[11px]">5</span></div>
                   <div className="flex items-center gap-1.5"><Heart className="w-4 h-4" /><span className="text-[11px]">{likes}</span></div>
                   <Share className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'youtube':
        return (
          <div style={bubbleStyle} className={`p-4 rounded-xl shadow-sm border border-white/5 w-full`}>
            <div className="flex gap-3">
              <img src={authorAvatar} className={`${isNested ? 'w-6 h-6' : 'w-9 h-9'} rounded-full object-cover shrink-0`} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[12px] font-bold">@{authorHandle || authorName.replace(/\s/g, '').toLowerCase()}</span>
                  {renderVerifiedBadge("w-3 h-3")}
                  <span className="text-[11px] opacity-60">{timestamp}</span>
                </div>
                <p style={textStyle} className="leading-relaxed mb-3">{text}</p>
                <div className="flex items-center gap-4 text-[11px] opacity-70">
                  <div className="flex items-center gap-1.5"><ThumbsUp className="w-4 h-4" /> <span>{likes}</span></div>
                  <ThumbsDown className="w-4 h-4" />
                  <span className="font-bold hover:bg-black/5 px-2 py-1 rounded-full cursor-pointer transition-colors">Reply</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'instagram':
        return (
          <div style={bubbleStyle} className={`p-4 rounded-xl shadow-sm border border-white/5 w-full`}>
            <div className="flex gap-3 items-start">
              <img src={authorAvatar} className="w-8 h-8 rounded-full object-cover shrink-0 border border-black/5" />
              <div className="flex-1 min-w-0">
                <div className="text-[13px] sm:text-[14px] leading-snug">
                  <span className="font-bold mr-1.5 inline-flex items-center gap-0.5">
                    {authorHandle || authorName.replace(/\s/g, '_').toLowerCase()}
                    {renderVerifiedBadge("w-3 h-3")}
                  </span>
                  <span style={textStyle}>{text}</span>
                </div>
                <div className="flex items-center gap-4 mt-2.5 text-[11px] font-bold opacity-50">
                  <span>{timestamp}</span>
                  <span>{likes} likes</span>
                  <span>Reply</span>
                </div>
              </div>
              <Heart className="w-3.5 h-3.5 opacity-30 mt-1" />
            </div>
          </div>
        );

      case 'facebook':
        return (
          <div style={bubbleStyle} className={`p-4 rounded-2xl shadow-sm border border-white/5 w-full`}>
            <div className="flex gap-2.5">
              <img src={authorAvatar} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover shrink-0" />
              <div className="flex flex-col gap-1 min-w-0">
                <div className={`p-3 rounded-[1.2rem] ${isDark ? 'bg-white/10' : 'bg-black/5'}`}>
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="font-bold text-[12px] sm:text-[13px]">{authorName}</span>
                    {renderVerifiedBadge("w-3 h-3")}
                  </div>
                  <p style={textStyle} className="leading-snug">{text}</p>
                </div>
                <div className="flex items-center gap-4 ml-2.5 text-[11px] font-bold opacity-60">
                  <span className="hover:underline cursor-pointer">Like</span>
                  <span className="hover:underline cursor-pointer">Reply</span>
                  <span className="font-normal opacity-80">{timestamp}</span>
                  <div className="flex items-center gap-1 ml-auto">
                    <div className="bg-blue-500 rounded-full p-0.5"><ThumbsUp className="w-2.5 h-2.5 text-white" /></div>
                    <span className="text-[11px] font-normal">{likes}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default: return null;
    }
  };

  const groupContainerStyle = !isNested && replyBgEnabled ? {
    backgroundColor: replyBgColor || '#f8fafc',
    borderRadius: '2.5rem',
    padding: '2.5rem',
    width: '100%',
    maxWidth: '650px',
    boxShadow: '0 40px 80px -15px rgba(0, 0, 0, 0.1)',
  } : {
    width: '100%',
    maxWidth: '550px'
  };

  return (
    <div ref={cardRef} className={`${!isNested ? 'flex flex-col items-center justify-center p-4 sm:p-12 w-full h-full' : 'w-full'}`}>
      <div style={groupContainerStyle} className="flex flex-col gap-4 w-full">
        {renderContent()}
        
        {replies?.length > 0 && (
          <div className={`mt-2 ${platform === 'twitter' ? 'ml-[18px] pl-[30px]' : 'ml-6 pl-6'} border-l-2 border-slate-400/10 space-y-4`}>
            {replies.map(reply => (
              <CommentCard 
                key={reply.id} 
                platform={platform} 
                data={reply} 
                isNested 
                locale={locale} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
