"use client";

import React, { useCallback, useState } from "react";
import { useUser } from "@/features/auth";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/custom-dialog";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const User: React.FC = () => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const roleRequestForm = useForm();
  const onSubmit = useCallback(() => {}, []);
  console.log(user);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold">アバター</span>
          <Avatar size="lg">
            <AvatarImage src={user?.user_metadata.avatar_url} />
          </Avatar>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold">名前</span>
          <Input />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold">権限</span>
          <span>{user?.user_metadata.userRole ?? "なし"}</span>
          {!user?.user_metadata.userRole && (
            <span className="text-sm text-red-500">
              権限をリクエストしてください。
              <br />
              駐騎場の管理や、ビルドの閲覧や作成などには権限が必要です。
            </span>
          )}
          <Button onClick={() => setOpen(true)}>権限をリクエスト</Button>
          <Dialog open={open} onClose={() => setOpen(false)} title="権限リクエスト">
            <form onSubmit={roleRequestForm.handleSubmit(onSubmit)}>
              <span className="inline-block text-xs text-gray-500 mb-2">
                プレイヤーが特定でき、本人だとそれとなくわかるような内容を書いてもらえると助かります。
              </span>
              <Textarea className="mb-8" placeholder="〇〇です。ナイフ～を流行らせたのは私です。" />
              <div className="flex justify-center w-full">
                <Button type="submit" className="w-1/2" disabled={roleRequestForm.formState.isSubmitting}>
                  権限リクエストを送信
                </Button>
              </div>
            </form>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
