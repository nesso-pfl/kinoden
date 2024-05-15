import React from "react";
import { AvatarForm } from "./avatar-form";
import { UsernameForm } from "./username-form";
import { RoleRequestForm } from "./role-request-form";

export const User: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <AvatarForm />
      <UsernameForm />
      <RoleRequestForm />
    </div>
  );
};
