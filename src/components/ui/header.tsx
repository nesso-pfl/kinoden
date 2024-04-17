"use client";

import { useUser } from "@/features/auth";
import { pagesPath } from "@/features/path/$path";
import Link from "next/link";
import React from "react";

type MenuItem = {
  name: string;
  href: string;
  authed: boolean;
};

const menus: MenuItem[] = [
  { name: "クイズ", href: pagesPath.quiz.$url().pathname, authed: true },
  { name: "ビルド", href: pagesPath.parking.$url().pathname, authed: true },
  { name: "越域駐騎場", href: pagesPath.parking.$url().pathname, authed: false },
];

type HeaderPresentationProps = {
  menus: MenuItem[];
};

const HeaderPresentation: React.FC<HeaderPresentationProps> = ({ menus }) => {
  return (
    <header className="flex justify-center bg-primary">
      <div className="flex items-center w-full max-w-7xl text-white px-4">
        <div className="text-xl">Kinoden Pfl</div>
        <nav className="ml-8">
          <ul className="flex gap-4">
            {menus.map((menu) => (
              <li key={menu.name}>
                <Link className="block p-2" href={menu.href}>
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export const Header: React.FC = () => {
  const { signedIn } = useUser();
  const filteredMenus = menus.filter((menu) => signedIn || !menu.authed);

  return <HeaderPresentation menus={filteredMenus} />;
};
