import { CreateBuild } from ".";
import { supabase } from "../supabase";

export const createBuild = async (build: CreateBuild) => {
  const response = await supabase
    .from("builds")
    .insert([
      {
        user_id: build.user_id,
        description: build.description,
        mask_relic: build.mask_relic.id,
        fossil_relic: build.fossil_relic.id,
        treasure_relic: build.treasure_relic.id,
        book_relic: build.book_relic.id,
        statue_relic: build.statue_relic.id,
        necklace_relic: build.necklace_relic.id,
      },
    ])
    .select();
  const newBuild = response.data?.[0];
  if (!newBuild) throw response.error;

  await Promise.all([
    await supabase.from("build_labels").insert(
      build.labels.map((label) => ({
        build: newBuild.id,
        label: label.id,
      })),
    ),
    await supabase.from("build_skills").insert(
      build.skills.map((skill, index) => ({
        build: newBuild.id,
        skill: skill.skill.id,
        delay: skill.delay,
        skill_order: index + 1,
      })),
    ),
    await supabase.from("build_fellows").insert(
      build.fellows.map((fellow, index) => ({
        build: newBuild.id,
        fellow: fellow.id,
        fellow_order: index + 1,
      })),
    ),
  ]);
};
