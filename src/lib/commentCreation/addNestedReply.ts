import { AVATARS } from "@/constants/commentCreation/commentConstants";
import { CommentData } from "@/types/commentCreation/commentTypes";


export   const addNestedReply = (parentId: string, setCommentData: any, setFocusedId: any) => {
    const id = Math.random().toString(36).substr(2, 9);
    const nestedReply: CommentData = {
      id,
      text: "That's facts! 💯",
      authorName: "SubReply",
      authorHandle: "sub_user",
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
    const updateInNested = (replies: CommentData[]): CommentData[] => {
      return replies.map((r) => {
        if (r.id === parentId)
          return { ...r, replies: [...r.replies, nestedReply] };
        return { ...r, replies: updateInNested(r.replies) };
      });
    };
    setCommentData((prev: any) => ({
      ...prev,
      replies: updateInNested(prev.replies),
    }));
    setFocusedId(id);
  };