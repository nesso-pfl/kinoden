import { supabase } from "../supabase";
import useSWRImmutable from "swr/immutable";

export const getLabels = async () => {
  const response = await supabase.from("labels").select("*").order("order");
  return response.data;
};

export const useGetLabels = () => {
  return useSWRImmutable("labels", getLabels);
};
