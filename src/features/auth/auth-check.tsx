"use client";

import { UserRole } from "@/features/auth";
import { pagesPath } from "@/features/path/$path";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
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
  const { isLoading, signedIn, data } = useUserProfile();

  useEffect(() => {
    const shouldRedirect = !isLoading && !checkRole(requiredUserRole, signedIn, data?.user_roles?.role);

    if (shouldRedirect) {
      router.replace(pagesPath.sign_in.$url().pathname);
    }
  }, [isLoading, data, router, requiredUserRole, signedIn]);

  return !isLoading && data && children;
};
