import { supabase } from "../supabase";
import useSWRImmutable from "swr/immutable";

export const getSkills = async () => {
  const response = await supabase.from("skills").select("*").order("created_at");
  return response.data;
};

export const useGetSkills = () => {
  return useSWRImmutable("skills", getSkills);
};
