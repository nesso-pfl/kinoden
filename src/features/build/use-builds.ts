import { Build, Skill } from ".";
import { supabase } from "../supabase";
import useSWR from "swr";

export const getBuilds = async (): Promise<
  Omit<Build, "mask_relic" | "fossil_relic" | "treasure_relic" | "book_relic" | "statue_relic" | "necklace_relic">[]
> => {
  const response = await supabase.from("builds").select(
    `
       *,
       build_labels( *, labels( * ) ),
       build_skills( *, skills( * ) ),
       build_fellows( *, fellows( * ) )
    `,
  );
  return (
    response.data?.map((build) => ({
      ...build,
      fellows: build.build_fellows
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
        .filter((skill): skill is typeof skill & { skill: Exclude<typeof skill.skill, null> } => !!skill.skill),
    })) ?? []
  );
};

export const useBuilds = () => {
  return useSWR("builds", getBuilds);
};
