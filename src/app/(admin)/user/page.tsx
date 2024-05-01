import React from "react";
import { Metadata } from "next";
import { Users } from "./users";

export const metadata: Metadata = {
  title: "ロール申請 | Kinoden Pfl",
};

export type Query = {
  id: string;
};

export default function Page() {
  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl mb-8">ユーザー管理</h1>
      <Users />
    </div>
  );
}
