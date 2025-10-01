"use client";
import useCaptureStore from "@/store/stores/useCaptureStore";
import { RainbowButton } from "./ui/rainbow-button";
import html2canvas from 'html2canvas-pro';

const DownloadButton = () => {
  const captureRef = useCaptureStore((state) => state.captureRef);

  const handleDownload = async () => {
    if (!captureRef?.current) return;

    const canvas = await html2canvas(captureRef.current, {
        scale: 5,
        // width: 400,
        // height: 400,
        backgroundColor: null,
        useCORS: true,
    });
    const dataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      onClick={handleDownload}
      className="w-full"
    >
      <RainbowButton size={"lg"} className="text-primary w-full">
        Download png
      </RainbowButton>
      
    </div>
  );
};

export default DownloadButton;
