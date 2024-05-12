import { supabase } from "../supabase";
import useSWR from "swr";
import { createUserProfile } from "./create-user-profile";
import { User, useSupabaseUserStore } from "../auth";
import { PostgrestError } from "@supabase/supabase-js";

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

  if (response.error) {
    throw response.error;
  }

  return response.data;
};

type UseUserProfileParams = {
  onSuccess: (userProfile: User) => Promise<unknown>;
};

export const useUserProfile = (params?: UseUserProfileParams) => {
  const { supabaseUser, supabaseInited } = useSupabaseUserStore();
  const data = useSWR(supabaseUser?.id && "user", async () => await getUserProfile(supabaseUser?.id ?? ""), {
    onSuccess: params?.onSuccess,
    onError: async (error: PostgrestError) => {
      if (supabaseUser && error?.code === "PGRST116") {
        console.log("create");
        await createUserProfile({
          user_id: supabaseUser.id,
          name: supabaseUser.user_metadata.name,
          avatar_url: supabaseUser.user_metadata.avatar_url,
        });
        await data.mutate();
      }
    },
  });

  return { ...data, isLoading: data.isLoading || !supabaseInited, signedIn: !!supabaseUser };
};
