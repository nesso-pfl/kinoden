"use client";

import { supabase } from "../supabase";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

type UserInfo = {
  inited: boolean;
  user: User | undefined;
};

export const useUser = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({ inited: true, user: undefined });
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      setUserInfo({ inited: true, user: session?.user ?? undefined });
    });

    return () => {
      data.subscription.unsubscribe();
    };
  });

  return userInfo;
};
