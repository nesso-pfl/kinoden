"use client";

import React, { useCallback, useRef } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { Edit3Icon } from "lucide-react";
import { updateAvatar, useUserProfile } from "@/features/user-profile";

export const AvatarForm: React.FC = () => {
  const { data, mutate } = useUserProfile();
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const handleChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!data) return;

      const file = event.target.files?.[0];
      if (!file) return;
      await updateAvatar(data.user_id, file, data.avatar_url);
      await mutate();
      toast({ description: "アバターを更新しました。", duration: 1000 });
    },
    [data, toast, mutate],
  );

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-bold">アバター</span>
      <div>
        <button className="relative" aria-label="アバターを編集" onClick={() => inputRef.current?.click()}>
          <Avatar size="lg">
            <AvatarImage src={data?.avatar_url ?? ""} />
          </Avatar>
          <Edit3Icon className="bg-white/70 rounded-full absolute right-0 bottom-0" />
        </button>
      </div>
      <input ref={inputRef} type="file" className="hidden" onChange={handleChange} />
    </div>
  );
};
