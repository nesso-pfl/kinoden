"use client";

import React, { useCallback, useState } from "react";
import { sendRoleRequest } from "@/features/auth";
import { Dialog } from "@/components/ui/custom-dialog";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useUserProfile } from "@/features/user-profile";

const formSchema = z.object({
  comment: z.string(),
});

type Form = z.infer<typeof formSchema>;

export const RoleRequestForm: React.FC = () => {
  const { data } = useUserProfile();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Form>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = useCallback(
    async (formValues: Form) => {
      if (!data?.name) return;
      await sendRoleRequest({ ...formValues, user_id: data.user_id, username: data.name });

      setOpen(false);
      toast({ description: "権限リクエストを送信しました。", duration: 2000 });
    },
    [data, toast],
  );

  if (!data) return null;

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-bold">権限</span>
      <span>{data.user_roles?.role ?? "なし"}</span>
      {!data.user_roles?.role && (
        <span className="text-sm text-red-500">
          権限をリクエストしてください。
          <br />
          菌族メンバー向けの機能の利用や、越域駐騎場の管理などには権限が必要です。
        </span>
      )}
      <Button onClick={() => setOpen(true)}>権限をリクエスト</Button>
      <Dialog open={open} onClose={() => setOpen(false)} title="権限リクエスト">
        <form onSubmit={handleSubmit(onSubmit)}>
          <span className="inline-block text-xs text-gray-500 mb-2">
            プレイヤーが特定でき本人だとそれとなくわかるような内容を記載するか、
            <br />
            または権限リクエストを送信後あも宛に個チャも送ってもらえると助かります。
            <br />
            <span className="text-red-500">
              権限リクエストの前に、アバターと名前に問題がないか確認することをお勧めします。
            </span>
          </span>
          <Textarea
            className="mb-8 h-40"
            placeholder="〇〇です。本名と年齢と声と住所が菌族メンバーにバレています。"
            {...register("comment")}
          />
          <div className="flex justify-center w-full">
            <Button type="submit" className="w-1/2" disabled={isSubmitting}>
              権限リクエストを送信
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};
