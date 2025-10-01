"use client";

import Link from "next/link";
import React from "react";
import { Cg } from "react-flags-select";

const FooterAnimated = () => {
  

  return (
    <footer className="w-full bg-secondary/50 text-foreground py-6 mt-auto h-fit rounded-t-2xl">
      <div className="max-w-6xl mx-auto flex flex-col justify-center items-center">
        <span className="flex items-center gap-2">
          Made with love in Congo
        <Cg className="p-0 m-0"/> 
        </span>
        
        <div className="flex items-center gap-2">
          <span>Powered by</span>
          <Link href="https://www.kilebe.com/" className="text-primary p-0 m-0 underline">Kilebe</Link>
          </div>
      </div>
      <p className="text-center text-sm text-muted-foreground mt-4">
        © {new Date().getFullYear()} TiktokComment. All rights reserved.
      </p>
    </footer>
  );
};

export default FooterAnimated;
