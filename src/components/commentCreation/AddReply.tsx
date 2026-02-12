import { AVATARS } from "@/constants/commentCreation/commentConstants";
import { CommentData } from "@/types/commentCreation/commentTypes";



  const AddReply = ({ setCommentData, setFocusedId }: any) => {
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
      backgroundColor: '#ffffff',
      textColor: '#000000',
      isDark: false,
      fontFamily: "'Inter', sans-serif",
      fontSize: 16
    };
    setCommentData((prev: { replies: any; }) => ({ ...prev, replies: [...prev.replies, newReply] }));
    setFocusedId(id);
  };

export default AddReply
