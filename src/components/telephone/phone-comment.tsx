"use client";

import { useCommentsStore } from "@/store/store";
import useCaptureStore from "@/store/stores/useCaptureStore";
import Image from "next/image";
import { useEffect, useRef } from "react";

const CommentBox = () => {
  const comment = useCommentsStore((state) => state.message);
  const name = useCommentsStore((state) => state.name);
  const userImage = useCommentsStore((state) => state.avatar);
  const isCheck = useCommentsStore((state) => state.verified);

  //Capture ref
  const divRef = useRef<HTMLDivElement>(null);
  const setCaptureRef = useCaptureStore((state) => state.setCaptureRef);

  useEffect(() => {
    setCaptureRef(divRef as React.RefObject<HTMLElement>);
  }, [setCaptureRef]);

  return (
    <div
      id="fullResult"
      className=" pb-5 p-2 absolute left-10 top-1/5 scale-105 "
      ref={divRef}
      style={{}}
    >
      <div
        className="relative bg-white w-fit h-fit pl-[8px] pt-[6px] pr-[4px] pb-[8px] rounded-bl-none mx-auto rounded-[5px] flex flex-col
        after:content-[''] after:rounded-bl-[5px] after:absolute after:bottom-[-9px] after:left-0 after:w-0 after:h-0 
        after:border-[11px] after:border-t-white after:border-r-transparent after:border-b-0 after:border-l-0"
      >
        {/* Top text with verified badge */}
        <p className="text-[#8b8b8b] ml-[23px] text-[7.5px] leading-[0.65rem] flex items-center font-semibold -mb-0">
          Reply to {name ? name : "Besi Kongo 🇨🇬"}&apos;s{" "}
          {isCheck && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="7"
              height="7"
              viewBox="0 0 48 48"
            >
              <circle cx="24" cy="24" r="20" fill="#4dd0e1"></circle>
              <path
                fill="#fff"
                d="M22.491,30.69c-0.576,0-1.152-0.22-1.591-0.659l-6.083-6.084c-0.879-0.878-0.879-2.303,0-3.182 c0.878-0.879,2.304-0.879,3.182,0l6.083,6.084c0.879,0.878,0.879,2.303,0,3.182C23.643,30.47,23.067,30.69,22.491,30.69z"
              ></path>
              <path
                fill="#fff"
                d="M22.491,30.69c-0.576,0-1.152-0.22-1.591-0.659c-0.879-0.878-0.879-2.303,0-3.182l9.539-9.539 c0.878-0.879,2.304-0.879,3.182,0c0.879,0.878,0.879,2.303,0,3.182l-9.539,9.539C23.643,30.47,23.067,30.69,22.491,30.69z"
              ></path>
            </svg>
          )}
          comment
        </p>

        {/* Avatar + text */}
        <div className="grid grid-cols-[auto_1fr] gap-[5px] leading-4">
          <div className="w-[20px] h-[20px] rounded-full overflow-hidden">


          <Image
            className="w-full h-full object-center object-cover"
            src={
              userImage
              ? typeof userImage === "string" || typeof userImage === "object"
              ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (userImage as any).preview ?? userImage
              : "./defaultAvatar.png"
              : "/defaultAvatar.png"
            }
            alt="Profile"
            width={400}
            height={400}
            />
            </div>
          <p
            className="break-words font-bold text-black text-[12px] mt-[2px] tracking-tight leading-[1.15]"
            style={{ maxWidth: "120px" }}
          >
            {comment ? comment : "Mabele Mameh 🇨🇬 "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
