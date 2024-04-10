"use client";

import React, { useCallback, useState } from "react";
import { Relic, useGetFellows, useGetRelics, useGetSkills } from "@/features/build";
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
  relicOptions: Relic[];
  value: Relic | undefined;
  onChange: (relic: Relic) => void;
};

export const RelicInput: React.FC<Props> = ({ relicOptions, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const handleClickRelic = useCallback(
    (relic: Relic) => () => {
      onChange(relic);
      setOpen(false);
    },
    [onChange],
  );

  return (
    <div className="flex flex-col gap-1 items-center">
      <button type="button" onClick={() => setOpen(true)} aria-label="遺物を選択">
        <Image
          src={value?.image_url ? value.image_url : staticPath.blank.blank_relic_png}
          alt={value?.name ? value.name : "未選択"}
          width={48}
          height={48}
        />
        <Dialog open={open} onClose={() => setOpen(false)}>
          <div className="flex flex-wrap gap-2">
            {relicOptions.map((relic) => (
              <button type="button" key={relic.id} onClick={handleClickRelic(relic)}>
                <Image src={relic.image_url} alt={relic.name} width={48} height={48} />
              </button>
            ))}
          </div>
        </Dialog>
      </button>
    </div>
  );
};
