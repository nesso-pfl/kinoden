export const userRoles = ["admin", "guildMember", "member"] as const;

export type UserRole = (typeof userRoles)[number];

export type User = {
  id: number;
  user_id: string;
  name: string | null;
  avatar_url: string | null;
  user_roles: { role: UserRole | null } | null;
};
