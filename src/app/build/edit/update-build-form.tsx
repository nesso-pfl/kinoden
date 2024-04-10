"use client";

import { useToast } from "@/components/ui/use-toast";
import { BuildForm, updateBuild, useBuild } from "@/features/build";
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
        defaultValues={{
          owner: build.owner,
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
        onSubmit={async (formValues) => {
          const id = params.get("id");
          if (!id) return;

          await updateBuild({
            id,
            owner: formValues.owner,
            labels: formValues.labels,
            skills: formValues.skills,
            fellows: formValues.fellows,
            mask_relic: formValues.maskRelic,
            fossil_relic: formValues.fossilRelic,
            treasure_relic: formValues.treasureRelic,
            book_relic: formValues.bookRelic,
            statue_relic: formValues.statueRelic,
            necklace_relic: formValues.necklaceRelic,
          });
          toast({ description: "ビルドを編集しました", duration: 2000 });
          router.push(pagesPath.build.$url().pathname);
        }}
      />
    )
  );
};
