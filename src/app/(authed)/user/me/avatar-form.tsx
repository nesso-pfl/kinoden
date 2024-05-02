"use client";

import React, { useCallback } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { updateAvatar } from "@/features/auth";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  userId: string;
  avatarUrl: string | undefined;
};

export const AvatarForm: React.FC<Props> = ({ userId, avatarUrl }) => {
  const { toast } = useToast();
  const handleChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
      await updateAvatar(userId, file);
      toast({ description: "アバターを更新しました。" });
    },
    [userId, toast],
  );

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-bold">アバター</span>
      <div className="flex gap-2">
        <Avatar size="lg">
          <AvatarImage src={avatarUrl} />
        </Avatar>
        <input type="file" onChange={handleChange} />
      </div>
    </div>
  );
};
