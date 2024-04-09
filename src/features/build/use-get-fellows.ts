import { supabase } from "../supabase";
import useSWRImmutable from "swr/immutable";

export const getFellows = async () => {
  return await supabase.from("fellows").select("*");
};

export const useGetFellows = () => {
  return useSWRImmutable("fellows", getFellows);
};
