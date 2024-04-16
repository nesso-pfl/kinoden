"use client";

import React from "react";
import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "@/features/supabase";
import { envValues } from "@/features/env-values";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export const SignInButtons = () => {
  return (
    <Auth
      supabaseClient={supabase}
      providers={["discord", "twitter", "google"]}
      redirectTo={envValues.authCallbackUrl}
      appearance={{
        theme: ThemeSupa,
      }}
      onlyThirdPartyProviders
    />
  );
};
