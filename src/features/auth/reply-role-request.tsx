"use client";

import { supabase } from "../supabase";

type SendRoleRequestParams = {
  user_id: string;
  status: "accepted" | "rejected";
};

export const replyRoleRequest = async ({ user_id, status }: SendRoleRequestParams) => {
  return await supabase
    .from("role_requests")
    .update({
      status,
    })
    .eq("user_id", user_id);
};
