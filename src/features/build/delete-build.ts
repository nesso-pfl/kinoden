import { supabase } from "../supabase";

export const deleteBuild = async (id: string) => {
  await supabase.from("builds").delete().eq("id", id);
};
