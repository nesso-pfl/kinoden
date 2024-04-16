"use client";

import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../supabase";
import { useRouter, useSearchParams } from "next/navigation";
import { pagesPath } from "../path/$path";

const getCurrentSession = (): { access_token: string; refresh_token: string } => {
  const hash = typeof window !== "undefined" ? decodeURIComponent(window.location.hash.replace("#", "")) : undefined;
  const sessionObj = Object.fromEntries(hash?.split("&").map((s) => s.split("=")) ?? []);

  if ("access_token" in sessionObj && "refresh_token" in sessionObj) {
    return sessionObj;
  } else {
    throw new Error("No session found");
  }
};

const useSetAuthSession = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const emitted = useRef(false);

  useEffect(() => {
    const { access_token, refresh_token } = getCurrentSession();

    if (emitted.current || !access_token || !refresh_token) return;

    emitted.current = true;
    const fn = async () => {
      await supabase.auth.setSession({ access_token, refresh_token });
      setLoading(false);
      router.replace(pagesPath.parking.$url().pathname);
    };

    fn();
  }, [searchParams, router]);

  return { loading };
};

export const SetAuthSession: React.FC = () => {
  useSetAuthSession();

  return undefined;
};
