"use client";

import { supabase } from "../supabase";

export const updateUsername = async (username: string) => {
  await supabase.auth.updateUser({
    data: {
      name: username,
    },
  });
};
