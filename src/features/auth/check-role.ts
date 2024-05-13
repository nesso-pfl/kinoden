import { UserRole } from "./user";

export const checkRole = (
  requiredUserRole: UserRole | "anything",
  signedIn: boolean,
  currentUserRole: UserRole | undefined,
) => {
  return (
    currentUserRole === "admin" ||
    (currentUserRole === "guildMember" && requiredUserRole !== "admin") ||
    (currentUserRole === "member" && requiredUserRole !== "admin" && requiredUserRole !== "guildMember") ||
    (requiredUserRole === "anything" && signedIn)
  );
};
