import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { pagesPath } from "@/features/path/$path";

export const CreateButton: React.FC = () => {
  return (
    <>
      <Button asChild>
        <Link href={pagesPath.build.new.$url()}>
          新規作成
        </Link>
      </Button>
    </>
  );
};
