"use client";

import { supabase } from "../supabase";

export const updateUsername = async (userId: string, username: string) => {
  await supabase
    .from("user_profiles")
    .update({
      name: username,
    })
    .eq("user_id", userId);
};
