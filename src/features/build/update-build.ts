import { UpdateBuild } from ".";
import { supabase } from "../supabase";

export const updateBuild = async (build: UpdateBuild) => {
  const response = await supabase
    .from("builds")
    .update({
      user_id: build.user_id,
      description: build.description,
      mask_relic: build.mask_relic.id,
      fossil_relic: build.fossil_relic.id,
      treasure_relic: build.treasure_relic.id,
      book_relic: build.book_relic.id,
      statue_relic: build.statue_relic.id,
      necklace_relic: build.necklace_relic.id,
    })
    .eq("id", build.id)
    .select();
  const newBuild = response.data?.[0];
  if (!newBuild) throw response.error;

  await supabase.from("build_labels").delete().eq("build", newBuild.id);

  await Promise.all([
    await supabase.from("build_labels").insert(
      build.labels.map((label) => ({
        build: newBuild.id,
        label: label.id,
      })),
    ),
    ...build.skills.map(
      async (skill, index) =>
        await supabase
          .from("build_skills")
          .update({
            skill: skill.skill.id,
            delay: skill.delay,
          })
          .eq("build", newBuild.id)
          .eq("skill_order", index + 1),
    ),
    ...build.fellows.map(
      async (fellow, index) =>
        await supabase
          .from("build_fellows")
          .update({
            fellow: fellow.id,
          })
          .eq("build", newBuild.id)
          .eq("fellow_order", index + 1),
    ),
  ]);
};
