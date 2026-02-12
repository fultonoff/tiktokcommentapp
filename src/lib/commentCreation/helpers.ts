
import React from 'react';
import * as htmlToImage from 'html-to-image';
import { generateComment } from '@/services/geminiService';
import { CommentData } from '@/types/commentCreation/commentTypes';
import { AVATARS } from '@/constants/commentCreation/commentConstants';


// export const applyTemplate = (template: ColorTemplate, focusedId: string | null, setCommentData: any, updateReply: any) => {
//     if (focusedId === "root") {
//       setCommentData((prev: any) => ({
//         ...prev,
//         backgroundColor: template.bg,
//         textColor: template.text,
//         isDark: template.isDark,
//       }));
//     } else if (focusedId) {
//       updateReply(focusedId, {
//         backgroundColor: template.bg,
//         textColor: template.text,
//         isDark: template.isDark,
//       }, setCommentData);
//     }
//   };

 export const handleDownload = async (commentRef: React.RefObject<HTMLDivElement>, activePlatform: string) => {
    if (commentRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(commentRef.current, { 
          quality: 1, pixelRatio: 3, cacheBust: true, backgroundColor: undefined 
        });
        const link = document.createElement('a');
        link.download = `socialecho-${activePlatform}-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Download failed', err);
      }
    }
  };


  // export const resetToDefault = (focusedId: string | null, setCommentData: any, updateReply: any ) => {
  //   const defaults = {
  //     backgroundColor: "#ffffff",
  //     textColor: "#000000",
  //     isDark: false,
  //     fontFamily: "'Inter', sans-serif",
  //     fontSize: 16,
  //   };
  //   if (focusedId === "root") {
  //     setCommentData((prev: any) => ({ ...prev, ...defaults }));
  //   } else if (focusedId) {
  //     updateReply(focusedId, defaults);
  //   }
  // };


  export const addReply = (setCommentData: any, setFocusedId: any) => {
      const id = Math.random().toString(36).substr(2, 9);
      const newReply: CommentData = {
        id,
        text: "Authentic vibes only! 📸",
        authorName: "NewReply",
        authorHandle: "reply_user",
        authorAvatar: AVATARS[Math.floor(Math.random() * AVATARS.length)],
        timestamp: "now",
        likes: "0",
        isVerified: false,
        replies: [],
        backgroundColor: "#ffffff",
        textColor: "#000000",
        isDark: false,
        fontFamily: "'Inter', sans-serif",
        fontSize: 16,
      };
      setCommentData((prev: { replies: any; }) => ({
        ...prev,
        replies: [...prev.replies, newReply],
      }));
      setFocusedId(id);
    };
  

  export const handleGenerate = async (context: string, locale: string, activePlatform: string, selectedTone: any, focusedId: string | null, setCommentData: any, updateReply: any, setIsGenerating: any) => {
      if (!context.trim()) return;
      setIsGenerating(true);
      const promptContext = `[Language: ${locale}] ${context}`;
      const newText = await generateComment(
        activePlatform as any,
        promptContext,
        selectedTone,
      );
      const randomLikes = Math.floor(Math.random() * 5000) + 1;
      const formattedLikes =
        randomLikes > 1000
          ? (randomLikes / 1000).toFixed(1) + "k"
          : randomLikes.toString();
  
      if (focusedId === "root") {
        setCommentData((prev: any) => ({
          ...prev,
          text: newText,
          likes: formattedLikes,
        }));
      } else {
        updateReply(focusedId!, { text: newText, likes: formattedLikes });
      }
      setIsGenerating(false);
    };
 

export const removeReply = (id: string, focusedId: string | null, setCommentData: any, setFocusedId: any) => {
    const filterNested = (replies: CommentData[]): CommentData[] => {
      return replies
        .filter((r) => r.id !== id)
        .map((r) => ({ ...r, replies: filterNested(r.replies) }));
    };
    setCommentData((prev: any) => ({
      ...prev,
      replies: filterNested(prev.replies),
    }));
    if (focusedId === id) setFocusedId("root");
  };

  export const updateReply = (id: string, updates: Partial<CommentData>, setCommentData: any) => {
      const updateNested = (replies: CommentData[]): CommentData[] => {
        return replies.map((r) => {
          if (r.id === id) return { ...r, ...updates };
          if (r.replies.length > 0)
            return { ...r, replies: updateNested(r.replies) };
          return r;
        });
      };
      setCommentData((prev:any) => ({
        ...prev,
        replies: updateNested(prev.replies),
      }));
    };
