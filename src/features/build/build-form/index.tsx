"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  CreateUsernameDialog,
  createBuild,
  useGetFellows,
  useGetRelics,
  useGetSkills,
  useUsernameStore,
} from "@/features/build";
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
import { LabelInput } from "./label-input";
import { useGetLabels } from "@/features/build/use-get-labels";
import { ErrorMessage } from "@/components/ui/error-message";
import { useRouter } from "next/navigation";
import { pagesPath } from "@/features/path/$path";
import { useToast } from "@/components/ui/use-toast";
import { setSourceMapsEnabled } from "process";

type Props = {
  defaultValues?: Form;
  onSubmit: (formValues: Form & { owner: string }) => Promise<void>;
};

export const BuildForm: React.FC<Props> = ({ defaultValues, onSubmit }) => {
  const [open, setOpen] = useState(false);
  const { data: labels, isLoading: loadingLabels } = useGetLabels();
  const { data: skills, isLoading: loadingSkills } = useGetSkills();
  const { data: fellows, isLoading: loadingFellows } = useGetFellows();
  const { data: relics, isLoading: loadingRelics } = useGetRelics();
  const { username, createUsername } = useUsernameStore();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Form>({
    defaultValues: {
      skills: new Array(5).fill({ delay: 0 }),
      ...defaultValues,
    },
    resolver: zodResolver(formSchema),
  });
  const skillsErrorMessage = useMemo(
    () => errors.skills?.find?.((skill) => skill?.skill?.message)?.skill?.message,
    [errors],
  );
  const fellowsErrorMessage = useMemo(() => errors.fellows?.find?.((fellow) => fellow?.message)?.message, [errors]);
  const relicsErrorMessage = useMemo(
    () =>
      errors.maskRelic?.message ||
      errors.fossilRelic?.message ||
      errors.treasureRelic?.message ||
      errors.bookRelic?.message ||
      errors.statueRelic?.message ||
      errors.necklaceRelic?.message,
    [errors],
  );

  useEffect(() => {
    if (username) return;

    const openCreateUsernameDialog = () => setOpen(true);
    const timeoutId = setTimeout(openCreateUsernameDialog, 200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [username]);

  const onSubmit_ = useCallback(
    (formValues: Form) => {
      if (!username) {
        setOpen(true);
        return;
      }
      onSubmit({ ...formValues, owner: username });
    },
    [username, onSubmit],
  );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit_)}>
        <div className="flex flex-col gap-4 mb-12">
          <div>
            <div className="text-xs font-bold mb-2">作成者</div>
            <div className="min-h-6">{username}</div>
          </div>
          <div>
            <div className="text-xs font-bold mb-2">ラベル</div>
            <Controller
              name="labels"
              control={control}
              render={({ field }) => (
                <LabelInput allLabels={labels ?? []} value={field.value} onChange={field.onChange} />
              )}
            />
            <ErrorMessage>{errors.labels?.message}</ErrorMessage>
          </div>
          <div>
            <div className="text-xs font-bold mb-2">技能</div>
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
            <ErrorMessage>{skillsErrorMessage}</ErrorMessage>
          </div>
          <div>
            <div className="text-xs font-bold mb-2">仲間</div>
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
            <ErrorMessage>{fellowsErrorMessage}</ErrorMessage>
          </div>
          <div>
            <div className="text-xs font-bold mb-2">遺物</div>
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
            <ErrorMessage>{relicsErrorMessage}</ErrorMessage>
          </div>
        </div>
        <div className="flex justify-center">
          <Button type="submit" className="w-1/2 max-w-lg" disabled={isSubmitting}>
            作成
          </Button>
        </div>
      </form>
      <CreateUsernameDialog open={open} onClose={() => setOpen(false)} onSubmit={() => setOpen(false)} />
    </>
  );
};
