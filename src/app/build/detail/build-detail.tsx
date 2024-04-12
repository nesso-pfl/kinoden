"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "@/features/guid-battle/sortable-item";
import { cn } from "@/lib/utils";
import { GuildBattlePlayer, PlayerType } from "@/features/guid-battle";
import { Build } from "@/features/build/types";
import { useBuild, useBuilds } from "@/features/build";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

type Props = {};

export const BuildDetail: React.FC<Props> = () => {
  const params = useSearchParams();
  const { data: build } = useBuild(params.get("id"));

  return (
    build && (
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="min-h-6">{build.owner}</div>
          <div className="flex gap-2 flex-wrap">
            {build.labels.map((label) => (
              <Badge key={label.id} variant="outline">
                {label.name}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs font-bold mb-2">技能</div>
          <div className="flex gap-4">
            {build.skills.map((skill) => (
              <div key={skill.id} className="flex flex-col gap-1 items-center">
                <Image src={skill.skill.image_url} alt={skill.skill.name} width={40} height={40} />
                <div>{skill.delay}s</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs font-bold mb-2">仲間</div>
          <div className="flex gap-4">
            {build.fellows.map((fellow) => (
              <Image key={fellow.id} src={fellow.image_url} alt={fellow.name} width={40} height={40} />
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs font-bold mb-2">遺物</div>
          <div className="flex gap-2">
            {[
              build.mask_relic,
              build.fossil_relic,
              build.treasure_relic,
              build.book_relic,
              build.statue_relic,
              build.necklace_relic,
            ].map((relic) => (
              <Image key={relic.image_url} src={relic.image_url} alt={relic.name} width={48} height={48} />
            ))}
          </div>
        </div>
      </div>
    )
  );
};
