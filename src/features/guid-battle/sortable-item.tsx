"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { PlayerType, GuildBattlePlayer } from ".";

type Props = GuildBattlePlayer & {
  playerType: PlayerType;
};

export const SortableItem: React.FC<Props> = ({ id, name, strength, playerType }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className={cn(
        "py-1 px-2 rounded-sm bg-white border-2",
        playerType === "ally" ? "border-blue-400" : "border-red-400",
      )}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className={cn("text-xs")}>{name}</div>
      <div className={cn()}>{strength}</div>
    </div>
  );
};
