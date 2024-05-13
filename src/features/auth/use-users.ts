import useSWR from "swr";
import { supabase } from "../supabase";
import { User } from "./";

const getUsers = async (): Promise<{ users: User[] }> => {
  const response = await supabase.from("user_profiles").select(`
  *,
  user_roles (role)
  `);

  return { users: response.data ?? [] };
};

export const useUsers = () => {
  return useSWR("users", getUsers);
};
