import useSWR from "swr";
import { supabase } from "../supabase";

export const getUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};

export const useGetUser = () => {
  return useSWR("user", getUser);
};
