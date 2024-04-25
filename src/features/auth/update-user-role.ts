import { supabase } from "../supabase";
import { User } from ".";

export const updateUserRole = (id: string, userRole: NonNullable<User["user_metadata"]["userRole"]>) => {
  return supabase.functions.invoke("update-user-role", {
    method: "PUT",
    body: { id, userRole },
  });
};
