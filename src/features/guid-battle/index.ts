const results = ["win", "lose"] as const;
type Result = (typeof results)[number];

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
