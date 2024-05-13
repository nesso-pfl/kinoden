import React from "react";
import { Metadata } from "next";
import { Users } from "./users";
import { RoleRequests } from "./role-requests";

export const metadata: Metadata = {
  title: "ユーザー管理 | Kinoden Pfl",
};

export default function Page() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-between">
        <h1 className="text-2xl mb-8">ユーザー管理</h1>
        <RoleRequests />
      </div>
      <Users />
    </div>
  );
}
