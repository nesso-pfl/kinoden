import React from "react";
import { Metadata } from "next";
import { User } from "./user";
import { AuthCheck } from "@/features/auth";

export const metadata: Metadata = {
  title: "ユーザー設定 | Kinoden Pfl",
};

export default function Page() {
  return (
    <AuthCheck requiredUserRole="anything">
      <div className="flex flex-col w-full h-full">
        <h1 className="text-2xl mb-8">ユーザー設定</h1>
        <User />
      </div>
    </AuthCheck>
  );
}
