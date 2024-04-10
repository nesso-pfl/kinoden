import { supabase } from "../supabase";
import useSWRImmutable from "swr/immutable";

export const getFellows = async () => {
  const response = await supabase.from("fellows").select("*");
  return response.data;
};

export const useGetFellows = () => {
  return useSWRImmutable("fellows", getFellows);
};
