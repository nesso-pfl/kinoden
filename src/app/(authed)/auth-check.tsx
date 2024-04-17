"use client";

import { useUser } from "@/features/auth";
import { pagesPath } from "@/features/path/$path";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export const AuthCheck: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const { inited, user } = useUser();

  useEffect(() => {
    const shouldRedirect = inited && !user;

    if (shouldRedirect) {
      router.replace(pagesPath.sign_in.$url().pathname);
    }
  }, [inited, user, router]);

  return inited && user && children;
};
