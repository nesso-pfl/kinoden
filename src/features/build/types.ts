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

type CreateBuildSkill = Omit<BuildSkill, "id" | "created_at">;
type UpdateBuildSkill = Omit<BuildSkill, "id" | "created_at">;

export type Label = {
  id: string;
  name: string;
  created_at: string;
};

export type Build = {
  id: string;
  user_profiles: {
    user_id: string;
    name: string | null;
    avatar_url: string | null;
  } | null;
  description: string | null;
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

export type CreateBuild = Omit<Build, "id" | "created_at" | "skills" | "user_profiles"> & {
  skills: CreateBuildSkill[];
  user_id: string;
};
export type UpdateBuild = Omit<Build, "created_at" | "skills" | "user_profiles"> & {
  skills: UpdateBuildSkill[];
  user_id: string;
};
