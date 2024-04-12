"use client";

import React, { useCallback, useState } from "react";
import { Skill, useGetFellows, useGetRelics, useGetSkills } from "@/features/build";
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
  allSkills: Skill[];
  value: Skill | undefined;
  delayValue: number;
  onChange: (skill: Skill) => void;
  onChangeDelayValue: (delay: number) => void;
};

export const SkillInput: React.FC<Props> = ({ allSkills, value, onChange, delayValue, onChangeDelayValue }) => {
  const [open, setOpen] = useState(false);
  const handleClickSkill = useCallback(
    (skill: Skill) => () => {
      onChange(skill);
      setOpen(false);
    },
    [onChange],
  );

  const handleChangeDelay = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const targetValue = +event.target.value;
      onChangeDelayValue(targetValue >= 10 ? 10 : targetValue < 0 ? 0 : targetValue);
    },
    [onChangeDelayValue],
  );

  return (
    <>
      <div className="flex flex-col gap-1 items-center">
        <button type="button" onClick={() => setOpen(true)} aria-label="技能を選択">
          <Image
            src={value?.image_url ? value.image_url : staticPath.blank.blank_skill_png}
            alt={value?.name ? value.name : "未選択"}
            width={40}
            height={40}
          />
        </button>
        <Input
          type="number"
          className="px-1 w-10"
          min="0"
          max="10"
          step="0.5"
          value={delayValue}
          onChange={handleChangeDelay}
          aria-label="遅延時間"
        />
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div className="flex flex-wrap gap-2">
          {allSkills.map((skill) => (
            <button type="button" key={skill.id} onClick={handleClickSkill(skill)}>
              <Image src={skill.image_url} alt={skill.name} width={40} height={40} />
            </button>
          ))}
        </div>
      </Dialog>
    </>
  );
};
