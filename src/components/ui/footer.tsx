import { pagesPath } from "@/features/path/$path";
import Link from "next/link";
import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="flex justify-center bg-primary">
      <div className="flex items-center justify-center w-full max-w-7xl text-white text-xs py-1">
        Developed by&ensp;<Link href="https://github.com/nesso-pfl">nesso-pfl</Link>
      </div>
    </footer>
  );
};
