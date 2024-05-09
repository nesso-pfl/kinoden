"use client";

import { supabase } from "../supabase";
import { useEffect, useMemo } from "react";
import { create } from "zustand";
import { User } from "./user";

const getUserProfile = async (userId: string) => {
  const response = await supabase
    .from("user_profiles")
    .select(
      `
  *,
  user_roles(role)
`,
    )
    .eq("id", userId)
    .single();

  return response;
};

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
    const { data } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (!session) return;
      const response = await getUserProfile(session.user.id);
      if (response.error) {
        updateUser(undefined, true);
      } else {
        updateUser({ ...response.data, role: response.data.user_roles?.role }, true);
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, [updateUser]);

  return { user, inited, signedIn };
};
