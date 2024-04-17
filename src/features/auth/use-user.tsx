"use client";

import { supabase } from "../supabase";
import { useEffect, useMemo } from "react";
import { User } from "@supabase/supabase-js";
import { create } from "zustand";

type UserStore = {
  inited: boolean;
  user: User | undefined;
  updateUser: (user: User | undefined, inited: boolean) => unknown;
};

export const useUserStore = create<UserStore>()((set) => ({
  inited: false,
  user: undefined,
  updateUser: (user, inited) => set({ inited, user }),
}));

export const useUser = () => {
  const { inited, user, updateUser } = useUserStore();
  const signedIn = useMemo(() => user !== undefined, [user]);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      updateUser(session?.user ?? undefined, true);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, [updateUser]);

  return { user, inited, signedIn };
};
