export   const resetToDefault = ( focusedId: string | null, setCommentData: any, updateReply: any ) => {
    const defaults = {
      backgroundColor: "#ffffff",
      textColor: "#000000",
      isDark: false,
      fontFamily: "'Inter', sans-serif",
      fontSize: 16,
    };
    if (focusedId === "root") {
      setCommentData((prev: any) => ({ ...prev, ...defaults }));
    } else if (focusedId) {
      updateReply(focusedId, defaults, setCommentData);
    }
  };