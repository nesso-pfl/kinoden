"use client";

import { supabase } from "../supabase";

type SendRoleRequestParams = {
  user_id: string;
  username: string;
  comment: string;
};

export const sendRoleRequest = async ({ user_id, username, comment }: SendRoleRequestParams) => {
  await supabase.from("role_requests").insert({
    user_id,
    username,
    comment,
  });
};
