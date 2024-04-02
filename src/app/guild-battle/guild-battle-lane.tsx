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

type Props = {
  playerType: PlayerType;
};

export const GuildBattleLane: React.FC<Props> = ({ playerType }) => {
  const [items, setItems] = useState<GuildBattlePlayer[]>([
    { id: "0", name: "あも", strength: "24242.2k" },
    { id: "1", name: "さいたま", strength: "54242.2k" },
    { id: "2", name: "ムラサメ", strength: "34242.2k" },
    { id: "3", name: "あかくん", strength: "30000.0k" },
    { id: "4", name: "コダック", strength: "23500.2k" },
    { id: "5", name: "にご", strength: "22500.2k" },
  ]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-1">
          {items.map((item) => (
            <SortableItem key={item.id} {...item} playerType={playerType} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
