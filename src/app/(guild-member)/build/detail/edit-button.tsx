"use client";

import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { pagesPath } from "@/features/path/$path";
import { useSearchParams } from "next/navigation";
import { useBuild } from "@/features/build";
import { useUserProfile } from "@/features/user-profile";

export const EditButton: React.FC = () => {
  const { data: userProfile } = useUserProfile();
  const params = useSearchParams();
  const id = useMemo(() => params.get("id"), [params]);
  const { data: build } = useBuild(id);

  return (
    id &&
    build?.user_profiles?.user_id &&
    build?.user_profiles.user_id === userProfile?.user_id && (
      <Button asChild>
        <Link href={pagesPath.build.edit.$url({ query: { id } })}>編集</Link>
      </Button>
    )
  );
};
