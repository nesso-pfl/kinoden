"use client";

import React, { useCallback, useState } from "react";
import { Metadata } from "next";
import { BuildSummaries } from "./build-summaries";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { pagesPath } from "@/features/path/$path";
import { useRouter } from "next/navigation";
import { Dialog } from "@/components/ui/custom-dialog";
import { Input } from "@/components/ui/input";
import { useUsernameStore } from "@/features/build";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const usernameId = "username";

const formSchema = z.object({
  username: z.string().min(1, "名前を入力してください"),
});

type Form = z.infer<typeof formSchema>;

type Props = {};

export const CreateButton: React.FC<Props> = () => {
  const router = useRouter();
  const { username, createUsername } = useUsernameStore();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm<Form>({ resolver: zodResolver(formSchema) });

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      if (!username) {
        setOpen(true);
      } else {
        router.push(pagesPath.build.new.$url().pathname);
      }
    },
    [username, router],
  );

  const onSubmit = useCallback(
    (formValues: Form) => {
      createUsername(formValues.username);
      setOpen(false);
      router.push(pagesPath.build.new.$url().pathname);
    },
    [createUsername, router],
  );

  return (
    <>
      <Button asChild>
        <Link href={pagesPath.build.new.$url()} onClick={handleClick}>
          新規作成
        </Link>
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <h2 className="text-lg font-semibold leading-none tracking-tight text-center md:text-left">名前設定</h2>
        <p>
          あなたの名前を教えてください。
          <br />
          あなたの名前は、ビルドの作成者として表示されます。
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor={usernameId} className="text-xs font-bold mb-2">
            名前
          </label>
          <Input className="mb-8" autoComplete="username" id={usernameId} {...register("username")} />
          <div className="flex justify-center">
            <Button type="submit" className="w-1/2">
              名前を設定
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};
