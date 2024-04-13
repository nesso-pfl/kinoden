"use client";

import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/custom-dialog";
import { Input } from "@/components/ui/input";
import { useUsernameStore } from "@/features/build";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@/components/ui/error-message";

const usernameId = "username";

const formSchema = z.object({
  username: z.string().min(1, "名前を入力してください"),
});

type Form = z.infer<typeof formSchema>;

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (username: string) => void;
};

export const CreateUsernameDialog: React.FC<Props> = ({ open, onClose, onSubmit }) => {
  const { createUsername } = useUsernameStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Form>({ resolver: zodResolver(formSchema) });

  const onSubmit_ = useCallback(
    (formValues: Form) => {
      createUsername(formValues.username);
      onSubmit(formValues.username);
    },
    [createUsername, onSubmit],
  );

  return (
    <Dialog open={open} onClose={onClose} title="名前設定">
      <p>
        あなたの名前を教えてください。
        <br />
        あなたの名前は、ビルドの作成者として表示されます。
      </p>
      <form onSubmit={handleSubmit(onSubmit_)}>
        <label htmlFor={usernameId} className="text-xs font-bold mb-2">
          名前
        </label>
        <Input className="mb-2" autoComplete="username" id={usernameId} {...register("username")} />
        <div className="mb-8">
          <ErrorMessage>{errors.username?.message}</ErrorMessage>
        </div>
        <div className="flex justify-center">
          <Button type="submit" className="w-1/2" disabled={isSubmitting}>
            名前を設定
          </Button>
        </div>
      </form>
    </Dialog>
  );
};
