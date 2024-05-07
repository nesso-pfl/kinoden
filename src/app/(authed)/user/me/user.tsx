"use client";

import React from "react";
import { useUser } from "@/features/auth";
import { AvatarForm } from "./avatar-form";
import { UsernameForm } from "./username-form";
import { RoleRequestForm } from "./role-request-form";

export const User: React.FC = () => {
  const { user } = useUser();
  if (!user) return null;

  return (
    <div>
      <div className="flex flex-col gap-4">
        <AvatarForm userId={user.id} avatarUrl={user.user_metadata.avatar_url} />
        <UsernameForm />
        <RoleRequestForm />
      </div>
    </div>
  );
};
