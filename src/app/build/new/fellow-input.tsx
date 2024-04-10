"use client";

import React, { useCallback, useState } from "react";
import { Fellow, useGetFellows, useGetRelics, useGetSkills } from "@/features/build";
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
import { Build } from "@/features/build";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Form, formSchema } from "./form-schema";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/custom-dialog";
import { staticPath } from "@/features/path/$path";

type Props = {
  allFellows: Fellow[];
  selectedFellows: Fellow[];
  value: Fellow | undefined;
  onChange: (fellow: Fellow) => void;
};

export const FellowInput: React.FC<Props> = ({ allFellows, selectedFellows, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const handleClickFellow = useCallback(
    (fellow: Fellow) => () => {
      onChange(fellow);
      setOpen(false);
    },
    [onChange],
  );

  return (
    <div className="flex flex-col gap-1 items-center">
      <button type="button" onClick={() => setOpen(true)} aria-label="仲間を選択">
        <Image
          src={value?.image_url ? value.image_url : staticPath.blank.blank_skill_png}
          alt={value?.name ? value.name : "未選択"}
          width={40}
          height={40}
        />
        <Dialog open={open} onClose={() => setOpen(false)}>
          <div className="flex flex-wrap gap-2">
            {allFellows.map((fellow) => (
              <button
                type="button"
                key={fellow.id}
                disabled={selectedFellows.some((fellow_) => fellow_.id === fellow.id)}
                onClick={handleClickFellow(fellow)}
              >
                <Image src={fellow.image_url} alt={fellow.name} width={40} height={40} />
              </button>
            ))}
          </div>
        </Dialog>
      </button>
    </div>
  );
};
