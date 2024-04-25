"use client";

import { supabase } from "../supabase";
import { useEffect, useMemo } from "react";
import { create } from "zustand";
import { User } from "./user";

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
      updateUser(
        session
          ? {
              ...session.user,
              user_metadata: {
                ...session.user.user_metadata,
                name: session.user.user_metadata.name,
                email: session.user.user_metadata.email,
              },
            }
          : undefined,
        true,
      );
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, [updateUser]);

  return { user, inited, signedIn };
};
