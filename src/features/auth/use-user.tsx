"use client";

import { supabase } from "../supabase";
import { useEffect } from "react";
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
    .eq("user_id", userId)
    .single();

  return response;
};

type UserStore = {
  inited: boolean;
  authenticated: boolean;
  user: User | undefined;
  updateUser: (args: { user: User | undefined; authenticated: boolean; inited: boolean }) => unknown;
};

export const useUserStore = create<UserStore>()((set) => ({
  inited: false,
  authenticated: false,
  user: undefined,
  updateUser: (params) => set(params),
}));

export const useUser = () => {
  const { inited, authenticated, user } = useUserStore();

  return { user, inited, signedIn: authenticated };
};

export const useUserUpdate = () => {
  const { updateUser } = useUserStore();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (!session) {
        updateUser({ user: undefined, authenticated: false, inited: true });
        return;
      }
      const response = await getUserProfile(session.user.id);
      if (response.error) {
        updateUser({ user: undefined, authenticated: true, inited: true });
      } else {
        updateUser({
          user: { ...response.data, role: response.data.user_roles?.role },
          authenticated: true,
          inited: true,
        });
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, [updateUser]);
};
