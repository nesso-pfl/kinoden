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
import { CreateUsernameDialog, useUsernameStore } from "@/features/build";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {};

export const CreateButton: React.FC<Props> = () => {
  const router = useRouter();
  const { username } = useUsernameStore();
  const [open, setOpen] = useState(false);

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

  const onSubmit = useCallback(() => {
    router.push(pagesPath.build.new.$url().pathname);
  }, [router]);

  return (
    <>
      <Button asChild>
        <Link href={pagesPath.build.new.$url()} onClick={handleClick}>
          新規作成
        </Link>
      </Button>
      <CreateUsernameDialog open={open} onClose={() => setOpen(false)} onSubmit={onSubmit} />
    </>
  );
};
