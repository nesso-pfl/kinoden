import { envValues } from "../env-values";
import { supabase } from "../supabase";

export const signInWithDiscord = async () => {
  const { data } = await supabase.auth.signInWithOAuth({
    options: { redirectTo: envValues.authCallbackUrl },
    provider: "discord",
  });

  return data;
};
