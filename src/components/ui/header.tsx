import { pagesPath } from "@/features/path/$path";
import Link from "next/link";
import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="flex justify-center bg-primary">
      <div className="flex items-center w-full max-w-7xl text-white px-4">
        <div className="text-xl">Kinoden Pfl</div>
        <nav className="ml-8">
          <ul className="flex gap-4">
            <li>
              <Link className="block p-2" href={pagesPath.parking.$url()}>
                越域駐騎場
              </Link>
            </li>
            {/*
            <li>
              <Link className="block p-2" href={pagesPath.$url()}>
                Home
              </Link>
            </li>
            <li>
              <Link className="block p-2" href={pagesPath.quiz.$url()}>
                Quiz
              </Link>
            </li>
 */}
          </ul>
        </nav>
      </div>
    </header>
  );
};
