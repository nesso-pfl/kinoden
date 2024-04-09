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

type Props = {};

export const BuildForm: React.FC<Props> = () => {
  const { data: skills, isLoading: loadingSkills } = useGetSkills();
  const { data: fellows, isLoading: loadingFellows } = useGetFellows();
  const { data: relics, isLoading: loadingRelics } = useGetRelics();
  const { register, control } = useForm<Form>({ resolver: zodResolver(formSchema) });

  return (
    <form>
      <div className="grid grid-cols-5 gap-2">
        <div className="grid grid-cols-subgrid">
          {[Array(5).keys()].map((index) => (
            <Controller
              key={index.toString()}
              name={`skills.${+index}`}
              control={control}
              render={({ field }) => (
                <button>
                  <Image src={""} alt="Placeholder" width={40} height={40} />
                </button>
              )}
            />
          ))}
        </div>
        <div className="grid grid-cols-subgrid">
          {[Array(5).keys()].map((index) => (
            <Input key={index.toString()} type="number" {...register(`skills.${+index}.delay`)} />
          ))}
        </div>
      </div>
    </form>
  );
};
