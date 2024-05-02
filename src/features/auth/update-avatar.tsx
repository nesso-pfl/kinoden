"use client";

import { supabase } from "../supabase";

export const updateAvatar = async (userId: string, avatar: File) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  console.log(user, userError);
  const { data, error } = await supabase.storage.from("user-avatar").upload(userId, avatar);
  if (error) {
    console.error(error);
    return;
  }
  console.log(data);

  await supabase.auth.updateUser({
    data: {
      avatar_url: data?.path,
    },
  });
};
