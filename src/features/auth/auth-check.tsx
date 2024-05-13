"use client";

import { UserRole } from "@/features/auth";
import { pagesPath } from "@/features/path/$path";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { useUserProfile } from "../user-profile";

const checkRole = (
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

type Props = {
  requiredUserRole: UserRole | "anything";
  children: React.ReactNode;
};

export const AuthCheck: React.FC<Props> = ({ children, requiredUserRole }) => {
  const router = useRouter();
  const { isLoading, signedIn, data } = useUserProfile();
  const shouldRedirect = useMemo(
    () => !isLoading && !checkRole(requiredUserRole, signedIn, data?.user_roles?.role),
    [isLoading, requiredUserRole, signedIn, data],
  );

  useEffect(() => {
    if (shouldRedirect) {
      router.replace(pagesPath.sign_in.$url().pathname);
    }
  }, [shouldRedirect, router]);

  return !isLoading && !shouldRedirect && children;
};
