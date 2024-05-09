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

type Props = {
  playerType: PlayerType;
};
const ally = [
  { id: "0", name: "アウレウス", strength: "27295.k" },
  { id: "1", name: "尾長", strength: "26575.8k" },
  { id: "2", name: "あも", strength: "47713.8k" },
  { id: "3", name: "ココちゃん", strength: "26655.3k" },
  { id: "4", name: "八百屋", strength: "27550.2k" },
  { id: "5", name: "ふぅー", strength: "28581.9k" },
  { id: "6", name: "ハマーン", strength: "34122.6k" },
  { id: "7", name: "キノコD0103", strength: "34509.7k" },
  { id: "8", name: "PINOKO", strength: "26800.2k" },
  { id: "9", name: "に個チャん", strength: "35372.1k" },
  { id: "10", name: "雑魚師匠", strength: "31338.0k" },
  { id: "11", name: "あやちゃむ", strength: "31592.7k" },
  { id: "12", name: "北海乃キング", strength: "30859.2k" },
  { id: "13", name: "あかんくん", strength: "32444.3k" },
  { id: "14", name: "しろちのこ", strength: "31882.4k" },
  { id: "15", name: "藪坂", strength: "28261.7k" },
  { id: "16", name: "魅音", strength: "30979.2k" },
  { id: "17", name: "ライズ", strength: "27379.0k" },
  { id: "18", name: "LuLu", strength: "32699.7k" },
  { id: "19", name: "さくや", strength: "26947.1k" },
  { id: "20", name: "にゃは", strength: "31658.5k" },
  { id: "21", name: "きのこ05851", strength: "27999.4k" },
  { id: "22", name: "Kyonkiti", strength: "31578.6k" },
  { id: "23", name: "アルファ", strength: "35322.7k" },
  { id: "24", name: "えなのす", strength: "29043.1k" },
  { id: "25", name: "ラガー", strength: "33950.9k" },
  { id: "26", name: "アミポ", strength: "33833.1k" },
  { id: "27", name: "レモン", strength: "31387.6k" },
  { id: "28", name: "とんま", strength: "27333.5k" },
  { id: "29", name: "ペットモ", strength: "34785.5k" },
  { id: "30", name: "まふぃん", strength: "35404.9k" },
  { id: "31", name: "ころん", strength: "33679.0k" },
  { id: "32", name: "パパ", strength: "32758.0k" },
  { id: "33", name: "ヤマちゃむ", strength: "30846.4k" },
  { id: "34", name: "ちもけ", strength: "28041.4k" },
  { id: "35", name: "明日も痩せない", strength: "36564.4k" },
  { id: "36", name: "すっこすこのすこ", strength: "42332.2k" },
  { id: "37", name: "ムラサメ", strength: "46022.5k" },
  { id: "38", name: "女王蜂", strength: "39660.0k" },
  { id: "39", name: "シェイル", strength: "36504.1k" },
  { id: "40", name: "うる星ゴリーラ", strength: "39249.7k" },
  { id: "41", name: "美輪明宏〆本物", strength: "31149.7k" },
  { id: "42", name: "きな粉", strength: "27167.3k" },
  { id: "43", name: "毒きのるー", strength: "35328.1k" },
  { id: "44", name: "D虎", strength: "38261.2k" },
  { id: "45", name: "シャバーニ", strength: "30047.2k" },
  { id: "46", name: "ガッサ", strength: "42677.3k" },
  { id: "47", name: "のんびり", strength: "38897.8k" },
  { id: "49", name: "1UPきのこ", strength: "36062.4k" },
];
const enemy = [
  { id: "0", name: "???", strength: "???" },
  { id: "1", name: "???", strength: "???" },
  { id: "2", name: "???", strength: "???" },
  { id: "3", name: "れな", strength: "37395.3k" },
  { id: "4", name: "れんたろう", strength: "35619.7k" },
  { id: "5", name: "０まま", strength: "37072.5k" },
  { id: "6", name: "しめじ707", strength: "34543.1k" },
  { id: "7", name: "リカ・ヤン", strength: "37202.5k" },
  { id: "8", name: "まさやん２号機", strength: "27134.3k" },
  { id: "9", name: "ゆきみ", strength: "35750.3k" },
  { id: "10", name: "このきのこ", strength: "31630.4k" },
  { id: "11", name: "くきパパ", strength: "28836.2k" },
  { id: "12", name: "いしす", strength: "35761.5k" },
  { id: "13", name: "らりるれ", strength: "29560.8k" },
  { id: "14", name: "ヨシ太郎", strength: "33074.0k" },
  { id: "15", name: "RINACO", strength: "31938.0k" },
  { id: "16", name: "ｺﾞﾘﾏｯﾁｮｯ", strength: "29657.8k" },
  { id: "17", name: "ソルダード", strength: "29572.9k" },
  { id: "18", name: "ドーマ", strength: "28028.1k" },
  { id: "19", name: "ヒロぽんず", strength: "20086.1k" },
  { id: "20", name: "しなも", strength: "26904.8k" },
  { id: "21", name: "ばんばんざい", strength: "19504.5k" },
  { id: "22", name: "カブトムシ", strength: "28473.1k" },
  { id: "23", name: "あっきー", strength: "25797.0k" },
  { id: "24", name: "しゃもてん", strength: "38645.0k" },
  { id: "25", name: "sen", strength: "23510.2k" },
  { id: "26", name: "ラトバリタ", strength: "25209.3k" },
  { id: "27", name: "サメ次郎", strength: "22471.0k" },
  { id: "28", name: "まにゃめろ", strength: "19998.7k" },
  { id: "29", name: "府内", strength: "17882.4k" },
  { id: "30", name: "兎田ぺこーら", strength: "14255.7k" },
  { id: "31", name: "キノユウ", strength: "7002.2k" },
];

export const GuildBattleLane: React.FC<Props> = ({ playerType }) => {
  const [items, setItems] = useState<GuildBattlePlayer[]>(playerType === "ally" ? ally : enemy);
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
        <div className={cn("flex flex-col gap-1 p-2 rounded-md", playerType === "ally" ? "bg-blue-400" : "bg-red-400")}>
          {items.map((item) => (
            <SortableItem key={item.id} {...item} playerType={playerType} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
