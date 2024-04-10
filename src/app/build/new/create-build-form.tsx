"use client";

import { useToast } from "@/components/ui/use-toast";
import { BuildForm, createBuild } from "@/features/build";
import { pagesPath } from "@/features/path/$path";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};
export const CreateBuildForm: React.FC<Props> = () => {
  const router = useRouter();
  const { toast } = useToast();

  return (
    <BuildForm
      onSubmit={async (formValues) => {
        await createBuild({
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
        toast({ description: "ビルドを作成しました", duration: 2000 });
        router.push(pagesPath.build.$url().pathname);
      }}
    />
  );
};
