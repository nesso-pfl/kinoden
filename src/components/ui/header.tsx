"use client";

import { pagesPath } from "@/features/path/$path";
import { CatIcon, GraduationCapIcon, KeyRoundIcon, MenuIcon, SnailIcon } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "./separator";
import { Button } from "./button";
import { signOut } from "@/features/auth/sign-out";
import { UserRole, checkRole, useUpdateSupabaseUser } from "@/features/auth";
import { useUserProfile } from "@/features/user-profile";

type MenuItem = {
  name: string;
  href: string;
  requiredUserRole: UserRole | "anything" | "notSignedIn";
  icon: React.ReactNode;
};

const menus: MenuItem[] = [
  {
    name: "クイズ",
    href: pagesPath.quiz.$url().pathname,
    requiredUserRole: "notSignedIn",
    icon: <GraduationCapIcon />,
  },
  { name: "ビルド", href: pagesPath.build.$url().pathname, requiredUserRole: "guildMember", icon: <SnailIcon /> },
  /*
  {
    name: "越域駐騎場",
    href: pagesPath.parking.$url().pathname,
    requiredUserRole: "notSignedIn",
    icon: <CarTaxiFrontIcon />,
  },
  */
  { name: "ユーザー設定", href: pagesPath.user.me.$url().pathname, requiredUserRole: "anything", icon: <CatIcon /> },
  { name: "ユーザー管理", href: pagesPath.user.$url().pathname, requiredUserRole: "admin", icon: <KeyRoundIcon /> },
];

type HeaderPresentationProps = {
  menus: MenuItem[];
  signedIn: boolean;
};

const HeaderPresentation: React.FC<HeaderPresentationProps> = ({ menus, signedIn }) => {
  const [open, setOpen] = useState(false);
  const handleClickSignOut = useCallback(async () => {
    await signOut();
    setOpen(false);
  }, []);

  return (
    <header className="flex justify-center bg-primary">
      <div className="flex items-center  h-10 w-full max-w-7xl text-white px-4">
        <div className="text-xl">Kinoden Pfl</div>
        <nav className="hidden md:block ml-8">
          <ul className="flex gap-4">
            {menus.map((menu) => (
              <li key={menu.name}>
                <Link className="block p-2" href={menu.href} onClick={() => setOpen(false)}>
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden md:block ml-auto">
          {signedIn ? (
            <Button size="sm" className="h-8" variant="destructive" onClick={handleClickSignOut}>
              ログアウト
            </Button>
          ) : (
            <Button size="sm" className="h-8" asChild>
              <Link href={pagesPath.sign_in.$url().pathname} onClick={() => setOpen(false)}>
                ログイン
              </Link>
            </Button>
          )}
        </div>
        <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
          <SheetTrigger className="md:hidden ml-auto" onClick={() => setOpen(true)}>
            <MenuIcon />
          </SheetTrigger>
          <SheetContent className="flex flex-col gap-0">
            <SheetHeader>
              <SheetTitle>メニュー</SheetTitle>
            </SheetHeader>
            <Separator className="my-4" />
            <ul className="flex-1">
              {menus.map((menu) => (
                <li key={menu.name} className="">
                  <Link className="flex items-center gap-2 w-full py-2" href={menu.href} onClick={() => setOpen(false)}>
                    {menu.icon}
                    {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
            {/* 
            <Separator className="my-4" />
            {signedIn ? (
              <Button variant="destructive" onClick={handleClickSignOut}>
                ログアウト
              </Button>
            ) : (
              <Button asChild>
                <Link href={pagesPath.sign_in.$url().pathname} onClick={() => setOpen(false)}>
                  ログイン
                </Link>
              </Button>
            )}
            */}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export const Header: React.FC = () => {
  const { signedIn, data } = useUserProfile();
  useUpdateSupabaseUser();
  const filteredMenus = menus.filter(
    (menu) =>
      menu.requiredUserRole === "notSignedIn" || checkRole(menu.requiredUserRole, signedIn, data?.user_roles?.role),
  );

  return <HeaderPresentation menus={filteredMenus} signedIn={signedIn} />;
};
