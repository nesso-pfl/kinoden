import { useEffect } from "react";
import { supabase } from "../supabase";
import useSWR from "swr";
import { createUserProfile } from "./create-user-profile";
import { useSupabaseUserStore } from "../auth";

const getUserProfile = async (userId: string) => {
  const response = await supabase
    .from("user_profiles")
    .select(
      `
  *,
  user_roles(role)
`,
    )
    .eq("user_id", userId)
    .single();

  return response;
};

export const useUser = (userId?: string) => {
  const data = useSWR(userId && "user", () => getUserProfile(userId!));
  const { supabaseUser, supabaseInited } = useSupabaseUserStore();

  useEffect(() => {
    const fn = async () => {
      if (supabaseUser && data?.error?.code === "PGRST116") {
        await createUserProfile({ ...supabaseUser, user_id: supabaseUser.id });
        await data.mutate();
      }
    };

    fn();
  }, [supabaseUser, data]);

  return { ...data, isLoading: data.isLoading || !supabaseInited, signedIn: !!supabaseUser };
};
