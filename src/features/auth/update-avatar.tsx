"use client";

import { supabase } from "../supabase";

export const updateAvatar = async (userId: string, avatar: File) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const path = `${userId}/${avatar.name}`;
  const { data: listData } = await supabase.storage.from("user-avatar").list(userId);
  const { data, error } = listData?.some((item) => user?.user_metadata.avatar_url.endsWith(item.name))
    ? await supabase.storage.from("user-avatar").update(`${userId}/${avatar.name}`, avatar, { upsert: true })
    : await supabase.storage.from("user-avatar").upload(path, avatar);
  if (error) {
    console.error(error);
    return;
  }
  const {
    data: { publicUrl },
  } = supabase.storage.from("user-avatar").getPublicUrl(data.path);

  await supabase.auth.updateUser({
    data: {
      avatar_url: publicUrl,
    },
  });
};
