"use client";

import { supabase } from "../supabase";
import { useEffect } from "react";
import { create } from "zustand";

type SupabaseUser = {
  id: string;
  user_metadata: {
    name?: string;
    avatar_url?: string;
  };
};

type UserStore = {
  supabaseInited: boolean;
  supabaseUser: SupabaseUser | undefined;
  updateUser: (args: { supabaseUser: SupabaseUser | undefined; supabaseInited: boolean }) => unknown;
};

export const useSupabaseUserStore = create<UserStore>()((set) => ({
  supabaseInited: false,
  supabaseUser: undefined,
  updateUser: (params) => set(params),
}));

export const useUpdateSupabaseUser = () => {
  const { updateUser } = useSupabaseUserStore();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (_, session) => {
      updateUser({ supabaseUser: session?.user, supabaseInited: true });
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, [updateUser]);
};
