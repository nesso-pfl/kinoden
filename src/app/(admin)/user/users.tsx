"use client";

import React from "react";
import { useUsers } from "@/features/auth";
import { UserItem } from "./user-item";

export const Users: React.FC = () => {
  const { data } = useUsers();
  console.log(data);

  return (
    <ul className="flex flex-col gap-4">
      {data?.users?.map((user) => (
        <li key={user.id} className="grid grid-cols-5">
          <UserItem user={user} />
        </li>
      ))}
    </ul>
  );
};
