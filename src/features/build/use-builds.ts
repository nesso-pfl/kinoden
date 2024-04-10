import { Build } from ".";
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
      fellows: build.build_fellows.map((build_fellow) => build_fellow.fellows!),
      labels: build.build_labels.map((build_label) => build_label.labels!),
      skills: build.build_skills.map((build_skill) => ({
        ...build_skill,
        skill: build_skill.skills!,
      })),
    })) ?? []
  );
};

export const useBuilds = () => {
  return useSWR("builds", getBuilds);
};
