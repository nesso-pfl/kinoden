"use client";

import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../supabase";
import { useSearchParams } from "next/navigation";

const useSetAuthSession = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const emitted = useRef(false);

  useEffect(() => {
    const access_token = searchParams.get("access_token");
    const refresh_token = searchParams.get("refresh_token");
    if (emitted.current || !access_token || !refresh_token) return;

    emitted.current = true;
    const fn = async () => {
      await supabase.auth.setSession({ access_token, refresh_token });
      setLoading(false);
    };

    fn();
  }, [searchParams]);

  return { loading };
};

export const SetAuthSession: React.FC = () => {
  useSetAuthSession();

  return undefined;
};
