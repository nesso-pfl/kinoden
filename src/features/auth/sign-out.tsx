import { supabase } from "../supabase";

export const signOut = async () => {
  await supabase.auth.signOut();
}