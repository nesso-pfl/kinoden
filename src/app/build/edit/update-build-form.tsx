"use client";

import { BuildForm, useBuild } from "@/features/build";
import { useSearchParams } from "next/navigation";
import React from "react";

export const UpdateBuildForm: React.FC = () => {
  const params = useSearchParams();
  const { data: build } = useBuild(params.get("id"));

  return build && <BuildForm mode="edit" defaultValues={build} />;
};
