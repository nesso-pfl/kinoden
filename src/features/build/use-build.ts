import { Build, Skill } from ".";
import { supabase } from "../supabase";
import useSWR from "swr";

export const getBuild = async (id: string): Promise<Build> => {
  const response = await supabase
    .from("builds")
    .select(
      `
       *,
       build_labels( *, labels( * ) ),
       build_skills( *, skills( * ) ),
       build_fellows( *, fellows( * ) ),
       mask_relics( * ),
       fossil_relics( * ),
       tresure_relics( * ),
       book_relics( * ),
       statue_relics( * ),
       necklace_relics( * )
    `,
    )
    .eq("id", id);
  const build = response.data?.[0];
  if (!build) throw response.error;

  return {
    ...build,
    fellows: build.build_fellows
      .toSorted((f1, f2) => f1.fellow_order - f2.fellow_order)
      .map((build_fellow) => build_fellow.fellows)
      .filter((fellow): fellow is Exclude<typeof fellow, null> => !!fellow),
    labels: build.build_labels
      .map((build_label) => build_label.labels)
      .filter((label): label is Exclude<typeof label, null> => !!label)
      .toSorted((l1, l2) => l1.order - l2.order),
    skills: build.build_skills
      .map((build_skill) => ({
        ...build_skill,
        skill: build_skill.skills,
      }))
      .toSorted((s1, s2) => s1.skill_order - s2.skill_order)
      .filter((skill): skill is typeof skill & { skill: Exclude<typeof skill.skill, null> } => !!skill.skill),
    mask_relic: build.mask_relics!,
    fossil_relic: build.fossil_relics!,
    treasure_relic: build.tresure_relics!,
    book_relic: build.book_relics!,
    statue_relic: build.statue_relics!,
    necklace_relic: build.necklace_relics!,
  };
};

export const useBuild = (id: string | null) => {
  return useSWR(id && `build/${id}`, () => (id ? getBuild(id) : undefined));
};
