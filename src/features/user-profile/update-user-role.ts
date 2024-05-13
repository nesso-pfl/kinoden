import { supabase } from "../supabase";
import { User } from "../auth";

export const updateUserRole = (id: string, userRole: NonNullable<NonNullable<User["user_roles"]>["role"]>) => {
  return supabase.from("user_roles").upsert(
    [
      {
        user_id: id,
        role: userRole,
      },
    ],
    {
      onConflict: "user_id",
    },
  );
};
