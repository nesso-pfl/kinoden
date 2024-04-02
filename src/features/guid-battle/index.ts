export const guildBattleResults = ["win", "lose"] as const;
export type GuildBattleResult = (typeof guildBattleResults)[number];

export const playerTypes = ["ally", "enemy"] as const;
export type PlayerType = (typeof playerTypes)[number];

export type GuildBattleSummary = {
  id: string;
  enemy: string;
  result?: GuildBattleResult;
  topLane: GuildBattleLane;
  middleLane: GuildBattleLane;
  bottomLane: GuildBattleLane;
  battleAt: Date;
};

export type GuildBattleLane = {
  id: string;
  guildBattleId: string;
  players: GuildBattlePlayer[];
};

export type GuildBattlePlayer = {
  id: string;
  name: string;
  strength: string;
};
