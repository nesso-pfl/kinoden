import useSWR from "swr";
import { supabase } from "../supabase";
import { User } from "./";

const getUsers = async (): Promise<{ users: User[] }> => {
  const response = await supabase.from("user_profiles").select(`
  *,
  user_roles (role)
  `);
  const users = response.data
    ?.filter((item): item is Exclude<typeof item, null> => item !== null)
    .map((item) => ({
      ...item,
      id: item.id!,
    }));

  return { users: users ?? [] };
};

export const useUsers = () => {
  return useSWR("users", getUsers);
};
