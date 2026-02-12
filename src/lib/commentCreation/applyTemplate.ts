import { ColorTemplate } from "@/types/commentCreation/commentTypes";


export const applyTemplate = (template: ColorTemplate, focusedId: string | null, setCommentData: any, updateReply: any) => {
    if (focusedId === "root") {
      setCommentData((prev: any) => ({
        ...prev,
        backgroundColor: template.bg,
        textColor: template.text,
        isDark: template.isDark,
      }));
    } else if (focusedId) {
      updateReply(focusedId, {
        backgroundColor: template.bg,
        textColor: template.text,
        isDark: template.isDark,
      }, setCommentData);
    }
  };