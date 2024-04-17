"use client";

import { supabase } from "../supabase";
import { useEffect, useMemo, useState } from "react";
import { User } from "@supabase/supabase-js";

type UserInfo = {
  inited: boolean;
  user: User | undefined;
};

export const useUser = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({ inited: false, user: undefined });
  const signedIn = useMemo(() => userInfo.inited && !userInfo.user, [userInfo]);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      setUserInfo({ inited: true, user: session?.user ?? undefined });
    });

    return () => {
      data.subscription.unsubscribe();
    };
  });

  return { ...userInfo, signedIn };
};
