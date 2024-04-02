const results = ["win", "lose"] as const;
type Result = (typeof results)[number];

const playerTypes = ["ally", "enemy"] as const;
type PlayerType = (typeof playerTypes)[number];

type GuildBattleSummary = {
  id: string;
  enemy: string;
  result?: Result;
  topLane: GuildBattleLane;
  middleLane: GuildBattleLane;
  bottomLane: GuildBattleLane;
  battleAt: Date;
};

type GuildBattleLane = {
  id: string;
  guildBattleId: string;
  players: GuildBattlePlayer[];
};

type GuildBattlePlayer = {
  id: string;
  name: string;
  strength: string;
};
