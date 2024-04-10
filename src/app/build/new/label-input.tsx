"use client";

import React, { useCallback, useState } from "react";
import { Fellow, Label, useGetFellows, useGetRelics, useGetSkills } from "@/features/build";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  allLabels: Label[];
  value: Label[] | undefined;
  onChange: (labels: Label[]) => void;
};

export const LabelInput: React.FC<Props> = ({ allLabels, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const handleClickFellow = useCallback(
    (label: Label) => () => {
      const newValue =
        !value || value.length === 0
          ? [label]
          : value.some((v) => v.id === label.id)
            ? value.filter((value) => value.id !== label.id)
            : [...value, label];
      onChange(newValue);
    },
    [onChange, value],
  );

  return (
    <div className="flex justify-between gap-2">
      <div className="flex flex-wrap gap-1 min-h-12">
        {value?.map((label) => (
          <Badge key={label.id} className="h-fit" variant="outline">
            {label.name}
          </Badge>
        ))}
      </div>
      <Button
        size="icon"
        variant="outline"
        className="shrink-0"
        onClick={() => setOpen(true)}
        aria-label="ラベルを追加"
      >
        <PlusIcon />
        <Dialog open={open} onClose={() => setOpen(false)}>
          <div className="flex flex-wrap gap-4">
            {allLabels.map((label) => (
              <div key={label.id} className="flex items-center gap-1">
                <Checkbox
                  id={label.id}
                  checked={value?.some((v) => v.id === label.id)}
                  onCheckedChange={handleClickFellow(label)}
                />
                <label className="text-sm" htmlFor={label.id}>
                  {label.name}
                </label>
              </div>
            ))}
          </div>
        </Dialog>
      </Button>
    </div>
  );
};
