"use client";

import { UserRole, useUser } from "@/features/auth";
import { pagesPath } from "@/features/path/$path";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const checkRole = (
  requiredUserRole: UserRole | "anything",
  signedIn: boolean,
  currentUserRole: UserRole | undefined,
) => {
  return (
    currentUserRole === "admin" ||
    (currentUserRole === "guildMember" && requiredUserRole !== "admin") ||
    (currentUserRole === "member" && requiredUserRole !== "admin" && requiredUserRole !== "guildMember") ||
    (requiredUserRole === "anything" && signedIn) ||
    currentUserRole
  );
};

type Props = {
  requiredUserRole: UserRole | "anything";
  children: React.ReactNode;
};

export const AuthCheck: React.FC<Props> = ({ children, requiredUserRole }) => {
  const router = useRouter();
  const { inited, user } = useUser();

  useEffect(() => {
    const shouldRedirect = inited && !checkRole(requiredUserRole, !!user, user?.user_metadata.userRole);

    if (shouldRedirect) {
      router.replace(pagesPath.sign_in.$url().pathname);
    }
  }, [inited, user, router, requiredUserRole]);

  return inited && user && children;
};
