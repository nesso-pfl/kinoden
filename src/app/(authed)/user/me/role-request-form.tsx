"use client";

import React, { useCallback, useState } from "react";
import { useUser } from "@/features/auth";
import { Dialog } from "@/components/ui/custom-dialog";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const RoleRequestForm: React.FC = () => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const roleRequestForm = useForm();
  const onSubmit = useCallback(() => {}, []);

  if (!user) return null;

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-bold">権限</span>
      <span>{user.user_metadata.userRole ?? "なし"}</span>
      {!user.user_metadata.userRole && (
        <span className="text-sm text-red-500">
          権限をリクエストしてください。
          <br />
          菌族メンバー向けの機能の利用や、越域駐騎場の管理などには権限が必要です。
        </span>
      )}
      <Button onClick={() => setOpen(true)}>権限をリクエスト</Button>
      <Dialog open={open} onClose={() => setOpen(false)} title="権限リクエスト">
        <form onSubmit={roleRequestForm.handleSubmit(onSubmit)}>
          <span className="inline-block text-xs text-gray-500 mb-2">
            プレイヤーが特定でき本人だとそれとなくわかるような内容を記載するか、
            <br />
            または権限リクエストを送信後あも宛に個チャも送ってもらえると助かります。
          </span>
          <Textarea className="mb-8" placeholder="〇〇です。本名と住所と年齢が菌族メンバーにバレています。" />
          <div className="flex justify-center w-full">
            <Button type="submit" className="w-1/2" disabled={roleRequestForm.formState.isSubmitting}>
              権限リクエストを送信
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};
