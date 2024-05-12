"use client";

import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { updateUsername } from "@/features/auth";
import { useUserProfile } from "@/features/user-profile";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z
    .string()
    .min(1, "1文字以上10文字以下で入力してください")
    .max(10, "1文字以上10文字以下で入力してください")
    .transform((value) => value.trim()),
});

type Form = z.infer<typeof formSchema>;

export const UsernameForm: React.FC = () => {
  const { data } = useUserProfile();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Form>({
    defaultValues: { username: data?.name ?? undefined },
    resolver: zodResolver(formSchema),
  });
  const { toast } = useToast();

  const onSubmit = useCallback(
    async (formValues: Form) => {
      await updateUsername(formValues.username);
      toast({ description: "名前を更新しました。", duration: 1000 });
    },
    [toast],
  );

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <span className="text-sm font-bold">名前</span>
      <div className="flex gap-2">
        <Input {...register("username")} />
        <Button type="submit" disabled={isSubmitting}>
          更新
        </Button>
      </div>
      <ErrorMessage>{errors.username?.message}</ErrorMessage>
    </form>
  );
};
