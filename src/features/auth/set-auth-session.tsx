"use client";

import React, { useEffect, useRef } from "react";
import { supabase } from "../supabase";
import { useRouter, useSearchParams } from "next/navigation";
import { pagesPath } from "../path/$path";
import { useUserProfile } from "../user-profile";

type GetCurrentSessionReturn =
  | { result: "ok"; data: { access_token: string; refresh_token: string } }
  | { result: "error"; data: { error: string; error_description: string } };

const getCurrentSession = (): GetCurrentSessionReturn => {
  const hash = typeof window !== "undefined" ? decodeURIComponent(window.location.hash.replace("#", "")) : undefined;
  const sessionObj = Object.fromEntries(hash?.split("&").map((s) => s.split("=")) ?? []);

  if ("access_token" in sessionObj && "refresh_token" in sessionObj) {
    return { result: "ok", data: { access_token: sessionObj.access_token, refresh_token: sessionObj.refresh_token } };
  } else if ("error" in sessionObj && "error_description" in sessionObj) {
    return { result: "error", data: { error: sessionObj.error, error_description: sessionObj.error_description } };
  } else {
    return { result: "error", data: { error: "invalid_session", error_description: "Invalid session" } };
  }
};

const useSetAuthSession = () => {
  const [error, setError] = React.useState<string>();
  const searchParams = useSearchParams();
  const { isLoading, data, signedIn } = useUserProfile();
  const router = useRouter();
  const emitted = useRef(false);

  useEffect(() => {
    const session = getCurrentSession();

    if (
      session.result !== "ok" &&
      session.data.error_description === "Error+getting+user+email+from+external+provider"
    ) {
      setError("メールアドレスが認識できませんでした。他の方法でログインしてください。");
    }
    if (emitted.current || session.result !== "ok") {
      if (isLoading || !signedIn) return;
      const redirectTo =
        !isLoading && !data?.user_roles?.role && signedIn
          ? pagesPath.user.me.$url().pathname
          : pagesPath.parking.$url().pathname;
      router.replace(redirectTo);
    }

    emitted.current = true;
    const fn = async () => {
      if (session.result !== "ok") return;
      await supabase.auth.setSession({
        access_token: session.data.access_token,
        refresh_token: session.data.refresh_token,
      });
    };

    fn();
  }, [searchParams, router, isLoading, data, signedIn]);

  return { error };
};

export const SetAuthSession: React.FC = () => {
  const { error } = useSetAuthSession();

  return error && <div className="text-red-500">{error}</div>;
};
