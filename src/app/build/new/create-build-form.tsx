"use client";

import { useToast } from "@/components/ui/use-toast";
import { BuildForm, createBuild } from "@/features/build";
import { pagesPath } from "@/features/path/$path";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};
export const CreateBuildForm: React.FC<Props> = () => {
  return <BuildForm mode="create" />;
};
