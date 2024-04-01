import React from "react";
import { GuildBattleLane } from "./guild-battle-lane";

export default function Page() {
  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl mb-8">菌族乱闘</h1>
      <GuildBattleLane />
    </div>
  );
}
