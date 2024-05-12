"use client";

import { supabase } from "../supabase";
import { useEffect } from "react";
import { create } from "zustand";
import useSWR from "swr";

type SupabaseUser = {
  id: string;
  user_metadata: {
    name?: string;
    avatar_url?: string;
  };
};

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

type UserStore = {
  supabaseInited: boolean;
  supabaseUser: SupabaseUser | undefined;
  updateUser: (args: { supabaseUser: SupabaseUser | undefined; supabaseInited: boolean }) => unknown;
};

export const useUserStore = create<UserStore>()((set) => ({
  supabaseInited: false,
  supabaseUser: undefined,
  updateUser: (params) => set(params),
}));

export const useUser = () => {
  const { supabaseInited, supabaseUser } = useUserStore();
  const data = useSWR(supabaseUser?.id && "user", () => getUserProfile(supabaseUser?.id ?? ""));

  return { ...data, signedIn: !!supabaseUser, isLoading: data.isLoading || !supabaseInited };
};

export const useUserUpdate = () => {
  const { updateUser } = useUserStore();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (_, session) => {
      updateUser({ supabaseUser: session?.user, supabaseInited: true });
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, [updateUser]);
};
