import { User as SupabaseUser } from "@supabase/supabase-js";

export const userRoles = ["admin", "guild-member", "member"] as const;

export type UserRole = (typeof userRoles)[number];

export type User = SupabaseUser & {
  user_metadata: {
    name: string;
    userRole?: UserRole;
    email: string;
    avatar_url?: string;
  };
};
