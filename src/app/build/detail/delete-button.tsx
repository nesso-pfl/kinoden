"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { pagesPath } from "@/features/path/$path";
import { useSearchParams } from "next/navigation";
import { deleteBuild, useBuild, useUsernameStore } from "@/features/build";
import { Dialog } from "@/components/ui/custom-dialog";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export const DeleteButton: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const params = useSearchParams();
  const [open, setOpen] = useState(false);
  const id = useMemo(() => params.get("id"), [params]);
  const { data: build } = useBuild(id);
  const { username } = useUsernameStore();

  const handleClickDelete = useCallback(
    (id: string) => async () => {
      await deleteBuild(id);
      router.replace(pagesPath.build.$url().pathname);
      toast({ description: "ビルドを削除しました", duration: 2000 });
    },
    [router, toast],
  );

  return (
    id &&
    username &&
    build?.owner === username && (
      <>
        <Button variant="destructive" className="w-full" onClick={() => setOpen(true)}>
          削除
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)} title="ビルドを削除">
          <p className="mb-8">ビルドを削除しますか？</p>
          <div className="flex justify-center w-full">
            <Button variant="destructive" className="w-1/2" onClick={handleClickDelete(id)}>
              削除
            </Button>
          </div>
        </Dialog>
      </>
    )
  );
};
