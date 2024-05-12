"use client";

import { supabase } from "../supabase";
import { useEffect } from "react";
import { create } from "zustand";
import { User } from "./user";

const getUserProfile = async (userId: string) => {
  console.log("getUserProfile");
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

  console.log(response);
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

  console.log(user, inited, authenticated);

  return { user, inited, signedIn: authenticated };
};

export const useUserUpdate = () => {
  const { updateUser } = useUserStore();

  useEffect(() => {
    console.log("subscribe");
    const { data } = supabase.auth.onAuthStateChange(async (_, session) => {
      console.log(location);
      if (!session) {
        console.log({ user: undefined, authenticated: false, inited: true });
        updateUser({ user: undefined, authenticated: false, inited: true });
        return;
      }
      const response = await getUserProfile(session.user.id);
      if (response.error) {
        console.log({ user: undefined, authenticated: true, inited: true });
        updateUser({ user: undefined, authenticated: true, inited: true });
      } else {
        console.log({
          user: { ...response.data, role: response.data.user_roles?.role },
          authenticated: true,
          inited: true,
        });
        updateUser({
          user: { ...response.data, role: response.data.user_roles?.role },
          authenticated: true,
          inited: true,
        });
      }
    });

    return () => {
      console.log("unsubscribe");
      data.subscription.unsubscribe();
    };
  }, [updateUser]);
};
