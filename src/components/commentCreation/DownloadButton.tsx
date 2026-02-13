
import { handleDownload } from "@/lib/commentCreation/helpers";
import { Download } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const DownloadButton = ({ commentRef, activePlatform, t }: any) => {
  return (
    <Button
      onClick={() =>
        handleDownload(
          commentRef as React.RefObject<HTMLDivElement>,
          activePlatform,
        )
      }
      className="flex items-center cursor-pointer gap-2 px-4 sm:px-6 py-2 sm:py-2.5 transition-all font-bold text-xs sm:text-sm shadow-xl active:scale-95 group"
    >
      <Download className="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-y-0.5 transition-transform" />
      <span className="hidden xs:inline">{t.exportBtn}</span>
      <span className="xs:hidden">PNG</span>
    </Button>
  );
};

export default DownloadButton;
