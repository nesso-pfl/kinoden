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
      toast({ description: "ビルドを削除しました" });
      router.replace(pagesPath.build.$url().pathname);
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
        <Dialog open={open} onClose={() => setOpen(false)}>
          <div className="flex flex-col items-center">
            <h2 className="text-lg">ビルドを削除</h2>
            <p>ビルドを削除しますか？</p>
            <div className="flex mt-4">
              <Button className="mr-4" onClick={handleClickDelete(id)}>
                削除
              </Button>
            </div>
          </div>
        </Dialog>
      </>
    )
  );
};
