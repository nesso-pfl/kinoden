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

const a: Build = {
  id: "1",
  owner: "あも",
  skills: [
    {
      id: "1",
      skill: { id: "1", name: "大地回復", image_url: "/skill/earth_healing.png", created_at: new Date() },
      delay: 0,
      created_at: new Date(),
    },
    {
      id: "2",
      skill: { id: "1", name: "大地回復", image_url: "/skill/earth_healing.png", created_at: new Date() },
      delay: 1,
      created_at: new Date(),
    },
    {
      id: "3",
      skill: { id: "1", name: "大地回復", image_url: "/skill/earth_healing.png", created_at: new Date() },
      delay: 1.5,
      created_at: new Date(),
    },
    {
      id: "4",
      skill: { id: "1", name: "大地回復", image_url: "/skill/earth_healing.png", created_at: new Date() },
      delay: 2,
      created_at: new Date(),
    },
    {
      id: "5",
      skill: { id: "1", name: "大地回復", image_url: "/skill/earth_healing.png", created_at: new Date() },
      delay: 2.5,
      created_at: new Date(),
    },
  ],
  fellows: [
    { id: "1", name: "パンダ", image_url: "/fellow/panda.png", created_at: new Date() },
    { id: "2", name: "パンダ", image_url: "/fellow/panda.png", created_at: new Date() },
    { id: "3", name: "パンダ", image_url: "/fellow/panda.png", created_at: new Date() },
    { id: "4", name: "パンダ", image_url: "/fellow/panda.png", created_at: new Date() },
    { id: "5", name: "パンダ", image_url: "/fellow/panda.png", created_at: new Date() },
  ],
  mask_relic: {
    id: "1",
    name: "魔王の仮面",
    image_url: "/maskRelic/mask_of_devil.png",
    created_at: new Date(),
  },
  fossil_relic: {
    id: "1",
    name: "魔王の仮面",
    image_url: "/maskRelic/mask_of_devil.png",
    created_at: new Date(),
  },
  treasure_relic: {
    id: "1",
    name: "魔王の仮面",
    image_url: "/maskRelic/mask_of_devil.png",
    created_at: new Date(),
  },
  book_relic: {
    id: "1",
    name: "魔王の仮面",
    image_url: "/maskRelic/mask_of_devil.png",
    created_at: new Date(),
  },
  statue_relic: {
    id: "1",
    name: "魔王の仮面",
    image_url: "/maskRelic/mask_of_devil.png",
    created_at: new Date(),
  },
  necklace_relic: {
    id: "1",
    name: "魔王の仮面",
    image_url: "/maskRelic/mask_of_devil.png",
    created_at: new Date(),
  },
  labels: [
    { id: "1", name: "弓", created_at: new Date() },
    { id: "2", name: "S1", created_at: new Date() },
    { id: "3", name: "S2", created_at: new Date() },
  ],
  created_at: new Date(),
};

const b = [a, { ...a, id: "2" }, { ...a, id: "3" }];

type Props = {};

export const BuildSummaries: React.FC<Props> = () => {
  return (
    <ul className="flex flex-col">
      {b.map((build) => (
        <li key={build.id} className="border-b border-gray-400 last:border-transparent py-2">
          <BuildSummaryItem build={build} />
        </li>
      ))}
    </ul>
  );
};
