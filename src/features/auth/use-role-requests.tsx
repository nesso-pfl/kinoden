"use client";

import { supabase } from "../supabase";
import useSWR from "swr";

const getRoleRequests = async () => {
  const response = await supabase.from("role_requests").select("*");

  return response.data ?? [];
};

export const useRoleRequests = () => {
  return useSWR("roleRequests", getRoleRequests);
};
