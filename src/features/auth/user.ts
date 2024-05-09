export const userRoles = ["admin", "guildMember", "member"] as const;

export type UserRole = (typeof userRoles)[number];

export type User = {
  name: string;
  role?: UserRole;
  avatar_url?: string;
};
