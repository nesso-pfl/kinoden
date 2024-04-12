"use client";

import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { pagesPath } from "@/features/path/$path";
import { useSearchParams } from "next/navigation";
import { useBuild, useUsernameStore } from "@/features/build";

type Props = {};

export const EditButton: React.FC<Props> = () => {
  const params = useSearchParams();
  const id = useMemo(() => params.get("id"), [params]);
  const { data: build } = useBuild(id);
  const { username } = useUsernameStore();

  return (
    id &&
    username &&
    build?.owner === username && (
      <Button asChild>
        <Link href={pagesPath.build.edit.$url({ query: { id } })}>編集</Link>
      </Button>
    )
  );
};
