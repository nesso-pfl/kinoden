"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, UserRole, userRoles } from "@/features/auth";
import { updateUserRole } from "@/features/user-profile";
import React, { useCallback } from "react";

type Props = {
  user: User;
};

export const UserItem: React.FC<Props> = ({ user }) => {
  const handleChange = useCallback(
    async (value: UserRole) => {
      await updateUserRole(user.user_id, value);
    },
    [user],
  );

  return (
    <div className="grid col-span-5 grid-cols-subgrid">
      <div>{user.user_id}</div>
      <div>{user.name}</div>
      <Avatar>
        <AvatarImage src={user.avatar_url ?? ""} />
      </Avatar>
      <Select defaultValue={user.user_roles?.role ?? undefined} onValueChange={handleChange}>
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
