"use client";

import React, { useState } from "react";
import { useGetFellows, useGetRelics, useGetSkills } from "@/features/build";
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
import { SkillInput } from "./skill-input";
import { FellowInput } from "./fellow-input";
import { Button } from "@/components/ui/button";
import { ArrowLeftRightIcon } from "lucide-react";
import { RelicInput } from "./relic-input";

type Props = {};

export const BuildForm: React.FC<Props> = () => {
  const { data: skills, isLoading: loadingSkills } = useGetSkills();
  const { data: fellows, isLoading: loadingFellows } = useGetFellows();
  const { data: relics, isLoading: loadingRelics } = useGetRelics();
  const { register, control } = useForm<Form>({
    defaultValues: {
      skills: new Array(5).fill({ delay: 0 }),
    },
    resolver: zodResolver(formSchema),
  });

  return (
    <form>
      <div className="flex justify-between">
        <div className="flex gap-4">
          {[...Array(5).keys()].map((index) => (
            <Controller
              key={index.toString()}
              name={`skills.${+index}`}
              control={control}
              render={({ field }) => (
                <SkillInput
                  allSkills={skills ?? []}
                  selectedSkills={[]}
                  value={field.value.skill}
                  delayValue={field.value.delay}
                  onChange={(value) => field.onChange({ skill: value, delay: field.value.delay })}
                  onChangeDelayValue={(delay) => field.onChange({ ...field.value, delay })}
                />
              )}
            />
          ))}
        </div>
        <Button variant="outline" size="icon">
          <ArrowLeftRightIcon />
        </Button>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-4">
          {[...Array(5).keys()].map((index) => (
            <Controller
              key={index.toString()}
              name={`fellows.${+index}`}
              control={control}
              render={({ field }) => (
                <FellowInput
                  allFellows={fellows ?? []}
                  selectedFellows={[]}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          ))}
        </div>
        <Button variant="outline" size="icon">
          <ArrowLeftRightIcon />
        </Button>
      </div>
      <div className="flex gap-2">
        {(["mask", "fossil", "treasure", "book", "statue", "necklace"] as const).map((relicName) => (
          <Controller
            key={relicName}
            name={`${relicName}Relic`}
            control={control}
            render={({ field }) => (
              <RelicInput
                relicOptions={relics?.[`${relicName}Relics`] ?? []}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        ))}
      </div>
    </form>
  );
};
