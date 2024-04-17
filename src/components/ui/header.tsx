"use client";

import { useUser } from "@/features/auth";
import { pagesPath } from "@/features/path/$path";
import { CarTaxiFrontIcon, MenuIcon, SnailIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "./separator";

type MenuItem = {
  name: string;
  href: string;
  authed: boolean;
  icon: React.ReactNode;
};

const menus: MenuItem[] = [
  // { name: "クイズ", href: pagesPath.quiz.$url().pathname, authed: true, icon: <GraduationCapIcon /> },
  { name: "ビルド", href: pagesPath.build.$url().pathname, authed: true, icon: <SnailIcon /> },
  { name: "越域駐騎場", href: pagesPath.parking.$url().pathname, authed: false, icon: <CarTaxiFrontIcon /> },
];

type HeaderPresentationProps = {
  menus: MenuItem[];
};

const HeaderPresentation: React.FC<HeaderPresentationProps> = ({ menus }) => {
  return (
    <header className="flex justify-center bg-primary">
      <div className="flex items-center  h-10 w-full max-w-7xl text-white px-4">
        <div className="text-xl">Kinoden Pfl</div>
        <nav className="hidden md:block ml-8">
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
        <Sheet>
          <SheetTrigger className="md:hidden ml-auto">
            <MenuIcon />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>メニュー</SheetTitle>
            </SheetHeader>
            <Separator className="my-2" />
            <ul>
              {menus.map((menu) => (
                <li key={menu.name} className="">
                  <Link className="flex items-center gap-2 w-full py-2" href={menu.href}>
                    {menu.icon}
                    {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export const Header: React.FC = () => {
  const { signedIn } = useUser();
  const filteredMenus = menus.filter((menu) => signedIn || !menu.authed);

  return <HeaderPresentation menus={filteredMenus} />;
};
