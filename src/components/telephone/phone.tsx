import Image from "next/image";
import React from "react";
import phoneImage from "../../../public/phone-image.png";
import CommentBox from "./phone-comment";

const PhoneComponent = () => {
  return (
    <div className="flex-1 relative">

        <CommentBox/>
      <Image
        alt="phone-image"
        src={phoneImage}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default PhoneComponent;
