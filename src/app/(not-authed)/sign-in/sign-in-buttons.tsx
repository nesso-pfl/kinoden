"use client";

import React from "react";
import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "@/features/supabase";
import { envValues } from "@/features/env-values";

export const SignInButtons = () => {
  return (
    <Auth
      supabaseClient={supabase}
      providers={["discord", "twitter", "google"]}
      redirectTo={envValues.authCallbackUrl}
      appearance={{
        extend: false,
        className: {
          container: "flex flex-col gap-2",
          button:
            "flex gap-2 items-center w-52 py-2 pl-4 rounded-md border bg-white text-gray-700 hover:bg-gray-500/10",
        },
      }}
      onlyThirdPartyProviders
    />
  );
};
