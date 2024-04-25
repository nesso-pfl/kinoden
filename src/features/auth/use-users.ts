import useSWR from "swr";
import { supabase } from "../supabase";
import { User } from "./";

const getUsers = async (): Promise<{ users: User[] }> => {
  const response = await supabase.functions.invoke("get-users", {
    method: "GET",
  });

  return response.data ?? [];
};

export const useUsers = () => {
  return useSWR("users", getUsers);
};
