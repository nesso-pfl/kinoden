import { supabase } from "../supabase";
import useSWRImmutable from "swr/immutable";

export const getSkills = async () => {
  return await supabase.from("skills").select("*");
};

export const useGetSkills = () => {
  return useSWRImmutable("skills", getSkills);
};
