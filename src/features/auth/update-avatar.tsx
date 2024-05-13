"use client";

import { supabase } from "../supabase";

export const updateAvatar = async (userId: string, avatar: File, avatar_url?: string | null) => {
  const path = `${userId}/${avatar.name}`;
  const { data: listData } = await supabase.storage.from("user-avatar").list(userId);
  console.log(listData, avatar_url);
  console.log(listData?.some((item) => avatar_url?.endsWith(item.name)));
  const { data, error } = listData?.some((item) => avatar.name === item.name)
    ? await supabase.storage.from("user-avatar").update(`${userId}/${avatar.name}`, avatar, { upsert: true })
    : await supabase.storage.from("user-avatar").upload(path, avatar);
  if (error) {
    console.error(error);
    return;
  }
  const {
    data: { publicUrl },
  } = supabase.storage.from("user-avatar").getPublicUrl(data.path);

  await supabase
    .from("user_profiles")
    .update({
      avatar_url: publicUrl,
    })
    .eq("user_id", userId);
};
