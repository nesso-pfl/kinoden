import { envValues } from "../env-values";
import { supabase } from "../supabase";

export const signInWithGoogle = async () => {
  const { data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: envValues.authCallbackUrl,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  return data;
};
