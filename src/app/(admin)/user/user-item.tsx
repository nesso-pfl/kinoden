"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, UserRole, updateUserRole, userRoles } from "@/features/auth";
import React, { useCallback } from "react";

type Props = {
  user: User;
};

export const UserItem: React.FC<Props> = ({ user }) => {
  const handleChange = useCallback(
    async (value: UserRole) => {
      await updateUserRole(user.id, value);
    },
    [user],
  );

  return (
    <div className="grid col-span-5 grid-cols-subgrid">
      <div>{user.id}</div>
      <div>{user.user_metadata.name}</div>
      <div>{user.user_metadata.email}</div>
      <Select defaultValue={user.user_metadata.userRole} onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {userRoles.map((userRole) => (
            <SelectItem key={userRole} value={userRole}>
              {userRole}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
