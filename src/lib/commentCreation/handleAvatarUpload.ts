import { ChangeEvent } from "react";
import { updateReply } from "./helpers";

export const handleAvatarUpload = (e: ChangeEvent<HTMLInputElement>, activeUploadId: string | null, setCommentData: any, updateReply: any, setActiveUploadId: any) => {
    const file = e.target.files?.[0];
    if (file && activeUploadId) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (activeUploadId === "root") {
          setCommentData((prev: any) => ({
            ...prev,
            authorAvatar: reader.result as string,
          }));
        } else {
          updateReply(activeUploadId, {
            authorAvatar: reader.result as string,
          }, setCommentData);
        }
      };
      reader.readAsDataURL(file);
    }
    setActiveUploadId(null);
  };