import { supabase } from "../supabase";

export type CreateUser = {
  user_id: string;
  name?: string;
  avatar_url?: string;
};

export const createUserProfile = async (user: CreateUser) => {
  return await supabase.from("user_profiles").insert([user]);
};
