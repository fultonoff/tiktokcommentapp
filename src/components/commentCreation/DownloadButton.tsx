
import { handleDownload } from "@/lib/commentCreation/helpers";
import { Download } from "lucide-react";
import React from "react";

const DownloadButton = ({ commentRef, activePlatform, t }: any) => {
  return (
    <button
      onClick={() =>
        handleDownload(
          commentRef as React.RefObject<HTMLDivElement>,
          activePlatform,
        )
      }
      className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-slate-950 text-white rounded-full hover:bg-slate-800 transition-all font-bold text-xs sm:text-sm shadow-xl active:scale-95 group"
    >
      <Download className="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-y-0.5 transition-transform" />
      <span className="hidden xs:inline">{t.exportBtn}</span>
      <span className="xs:hidden">PNG</span>
    </button>
  );
};

export default DownloadButton;
