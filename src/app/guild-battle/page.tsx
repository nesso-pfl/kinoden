import React from "react";
import { GuildBattleLane } from "./guild-battle-lane";

export default function Page() {
  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl mb-8">菌族乱闘</h1>
      <div className="flex gap-4">
        <section className="flex flex-col gap-4 items-center">
          <h2>Top Lane</h2>
          <div className="flex gap-2">
            <GuildBattleLane playerType="ally" />
            <GuildBattleLane playerType="enemy" />
          </div>
        </section>
        <section className="flex flex-col gap-4 items-center">
          <h2>Middle Lane</h2>
          <div className="flex gap-2">
            <GuildBattleLane playerType="ally" />
            <GuildBattleLane playerType="enemy" />
          </div>
        </section>
        <section className="flex flex-col gap-4 items-center">
          <h2>Bottom Lane</h2>
          <div className="flex gap-2">
            <GuildBattleLane playerType="ally" />
            <GuildBattleLane playerType="enemy" />
          </div>
        </section>
      </div>
    </div>
  );
}
