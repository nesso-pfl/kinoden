export type Skill = {
  id: string;
  name: string;
  image_url: string;
  created_at: string;
};

export type Fellow = {
  id: string;
  name: string;
  image_url: string;
  created_at: string;
};

export type Relic = {
  id: string;
  name: string;
  image_url: string;
  created_at: string;
};

export type BuildSkill = {
  id: string;
  skill: Skill;
  delay: number;
  created_at: string;
};

export type Label = {
  id: string;
  name: string;
  created_at: string;
};

export type Build = {
  id: string;
  owner: string;
  skills: BuildSkill[];
  fellows: Fellow[];
  mask_relic: Relic;
  fossil_relic: Relic;
  treasure_relic: Relic;
  book_relic: Relic;
  statue_relic: Relic;
  necklace_relic: Relic;
  labels: Label[];
  created_at: string;
};
