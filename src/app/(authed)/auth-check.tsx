"use client";

import { UserRole, useUser } from "@/features/auth";
import { pagesPath } from "@/features/path/$path";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const checkRole = (requiredUserRole: UserRole, currentUserRole?: UserRole) => {
  return (
    currentUserRole === "admin" ||
    (currentUserRole === "guild-member" && requiredUserRole !== "admin") ||
    (currentUserRole === "member" && requiredUserRole !== "admin" && requiredUserRole !== "guild-member") ||
    currentUserRole
  );
};

type Props = {
  requiredUserRole: UserRole;
  children: React.ReactNode;
};

export const AuthCheck: React.FC<Props> = ({ children, requiredUserRole }) => {
  const router = useRouter();
  const { inited, user } = useUser();

  useEffect(() => {
    const shouldRedirect = inited && checkRole(requiredUserRole, user?.user_metadata.userRole);

    if (shouldRedirect) {
      router.replace(pagesPath.sign_in.$url().pathname);
    }
  }, [inited, user, router, requiredUserRole]);

  return inited && user && children;
};
