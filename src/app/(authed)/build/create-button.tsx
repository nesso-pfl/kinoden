"use client";

import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { pagesPath } from "@/features/path/$path";
import { useRouter } from "next/navigation";
import { CreateUsernameDialog, useUsernameStore } from "@/features/build";

export const CreateButton: React.FC = () => {
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
