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
import { BuildSummaryItem } from "./build-summary-item";
import { Build } from "@/features/build/types";
import { useBuilds } from "@/features/build";

type Props = {};

export const BuildSummaries: React.FC<Props> = () => {
  const { data: builds } = useBuilds();

  return (
    <ul className="flex flex-col">
      {builds?.map((build) => (
        <li key={build.id} className="border-b border-gray-400 last:border-transparent py-2">
          <BuildSummaryItem build={build} />
        </li>
      ))}
    </ul>
  );
};
