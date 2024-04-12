"use client";

import { useToast } from "@/components/ui/use-toast";
import { BuildForm, updateBuild, useBuild, useUsernameStore } from "@/features/build";
import { pagesPath } from "@/features/path/$path";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

type Props = {};
export const UpdateBuildForm: React.FC<Props> = () => {
  const params = useSearchParams();
  const { data: build } = useBuild(params.get("id"));

  return build && <BuildForm mode="edit" defaultValues={build} />;
};
