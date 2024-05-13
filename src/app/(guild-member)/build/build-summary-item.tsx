import React from "react";
import { Build } from "@/features/build/types";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ReceiptTextIcon } from "lucide-react";
import Link from "next/link";
import { pagesPath } from "@/features/path/$path";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

type Props = {
  build: Omit<
    Build,
    "mask_relic" | "fossil_relic" | "treasure_relic" | "book_relic" | "statue_relic" | "necklace_relic"
  >;
};

export const BuildSummaryItem: React.FC<Props> = ({ build }) => {
  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <Avatar>
            <AvatarImage src={build.user_profiles?.avatar_url ?? ""} />
          </Avatar>
          <div className="whitespace-nowrap">{build.user_profiles?.name ?? "未設定"}</div>
          <div className="flex items-center flex-wrap gap-2">
            {build.labels.map((label) => (
              <Badge key={label.id} variant="outline">
                {label.name}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          {build.skills.map((skill) => (
            <div key={skill.id} className="flex flex-col items-center gap-1">
              <Image src={skill.skill.image_url} width="40" height="40" alt={skill.skill.name} />
              <span className="text-sm">{skill.delay}s</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          {build.fellows.map((fellow) => (
            <Image key={fellow.id} src={fellow.image_url} width="40" height="40" alt={fellow.name} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button asChild variant="outline" size="icon" aria-label="詳細を見る">
          <Link href={pagesPath.build.detail.$url({ query: { id: build.id } })}>
            <ReceiptTextIcon />
          </Link>
        </Button>
      </div>
    </div>
  );
};
