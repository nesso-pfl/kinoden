import React from "react";
import { Metadata } from "next";
import { DiscordButton } from "./discord-button";

export const metadata: Metadata = {
  title: "ログイン | Kinoden Pfl",
};

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl mb-8">ログイン</h1>
      <div className="flex flex-col items-center w-full mb-8">
        <DiscordButton />
      </div>
    </div>
  );
}
