"use client";

import { useToast } from "@/components/ui/use-toast";
import { BuildForm, updateBuild, useBuild, useUsernameStore } from "@/features/build";
import { pagesPath } from "@/features/path/$path";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

type Props = {};
export const UpdateBuildForm: React.FC<Props> = () => {
  const params = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const { data: build } = useBuild(params.get("id"));

  return (
    build && (
      <BuildForm
        mode="edit"
        defaultValues={{
          labels: build.labels,
          skills: build.skills,
          fellows: build.fellows,
          maskRelic: build.mask_relic,
          fossilRelic: build.fossil_relic,
          treasureRelic: build.treasure_relic,
          bookRelic: build.book_relic,
          statueRelic: build.statue_relic,
          necklaceRelic: build.necklace_relic,
        }}
      />
    )
  );
};
