"use client";

import { supabase } from "../supabase";

export const updateUsername = async (userId: number, username: string) => {
  await supabase
    .from("user_profiles")
    .update({
      name: username,
    })
    .eq("id", userId);
};
