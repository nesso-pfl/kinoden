"use client";

import React, { useEffect, useRef } from "react";
import { supabase } from "../supabase";
import { useRouter, useSearchParams } from "next/navigation";
import { pagesPath } from "../path/$path";
import { useUser } from "./use-user";

const getCurrentSession = (): { access_token: string; refresh_token: string } => {
  const hash = typeof window !== "undefined" ? decodeURIComponent(window.location.hash.replace("#", "")) : undefined;
  const sessionObj = Object.fromEntries(hash?.split("&").map((s) => s.split("=")) ?? []);

  if ("access_token" in sessionObj && "refresh_token" in sessionObj) {
    return sessionObj;
  } else {
    return { access_token: "", refresh_token: "" };
  }
};

const useSetAuthSession = () => {
  const searchParams = useSearchParams();
  const { isLoading, data, signedIn } = useUser();
  const router = useRouter();
  const emitted = useRef(false);

  useEffect(() => {
    const { access_token, refresh_token } = getCurrentSession();

    if (emitted.current || !access_token || !refresh_token) {
      if (isLoading) return;
      const redirectTo =
        !isLoading && !data?.data && signedIn ? pagesPath.user.me.$url().pathname : pagesPath.parking.$url().pathname;
      router.replace(redirectTo);
    }

    emitted.current = true;
    const fn = async () => {
      await supabase.auth.setSession({ access_token, refresh_token });
    };

    fn();
  }, [searchParams, router, isLoading, data, signedIn]);
};

export const SetAuthSession: React.FC = () => {
  useSetAuthSession();

  return undefined;
};
