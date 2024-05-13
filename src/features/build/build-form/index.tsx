"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  CreateUsernameDialog,
  createBuild,
  updateBuild,
  useGetFellows,
  useGetRelics,
  useGetSkills,
} from "@/features/build";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Form, formSchema } from "./form-schema";
import { SkillInput } from "./skill-input";
import { FellowInput } from "./fellow-input";
import { Button } from "@/components/ui/button";
import { RelicInput } from "./relic-input";
import { LabelInput } from "./label-input";
import { useGetLabels } from "@/features/build/use-get-labels";
import { ErrorMessage } from "@/components/ui/error-message";
import { useRouter, useSearchParams } from "next/navigation";
import { pagesPath } from "@/features/path/$path";
import { useToast } from "@/components/ui/use-toast";
import { useUserProfile } from "@/features/user-profile";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  defaultValues?: Form;
  mode: "create" | "edit";
};

export const BuildForm: React.FC<Props> = ({ defaultValues, mode }) => {
  const params = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { data: labels } = useGetLabels();
  const { data: skills } = useGetSkills();
  const { data: fellows } = useGetFellows();
  const { data: relics } = useGetRelics();
  const { data: userProfile } = useUserProfile();
  const {
    handleSubmit,
    register,
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
    () => errors.skills?.find?.((skill) => skill?.skill?.message)?.skill?.message || errors.skills?.root?.message,
    [errors],
  );
  const fellowsErrorMessage = useMemo(
    () => errors.fellows?.find?.((fellow) => fellow?.message)?.message || errors.fellows?.root?.message,
    [errors],
  );
  const relicsErrorMessage = useMemo(
    () =>
      errors.mask_relic?.message ||
      errors.fossil_relic?.message ||
      errors.treasure_relic?.message ||
      errors.book_relic?.message ||
      errors.statue_relic?.message ||
      errors.necklace_relic?.message,
    [errors],
  );

  useEffect(() => {
    if (userProfile?.name) return;

    const openCreateUsernameDialog = () => setOpen(true);
    const timeoutId = setTimeout(openCreateUsernameDialog, 200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [userProfile]);

  const onSubmit = useCallback(
    async (formValues: Form) => {
      if (!userProfile?.name) {
        setOpen(true);
        return;
      }

      if (mode === "create") {
        await createBuild({ ...formValues, description: formValues.description ?? null, user_id: userProfile.user_id });
        toast({ description: `ビルドを作成しました`, duration: 2000 });
        router.push(pagesPath.build.$url().pathname);
      } else {
        const id = params.get("id");
        if (!id) return;

        await updateBuild({
          ...formValues,
          description: formValues.description ?? null,
          id,
          user_id: userProfile.user_id,
        });
        toast({ description: `ビルドを編集しました`, duration: 2000 });
        router.push(pagesPath.build.detail.$url({ query: { id } }).path);
      }
    },
    [userProfile, toast, mode, router, params],
  );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 mb-12">
          <div>
            <div className="text-xs font-bold mb-2">作成者</div>
            <div className="min-h-6">{userProfile?.name ?? "未設定"}</div>
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
            <div className="text-xs font-bold mb-2">説明</div>
            <Textarea {...register("description")} />
          </div>
          <div>
            <div className="text-xs font-bold mb-2">技能</div>
            <div className="flex gap-4">
              {[...Array(5).keys()].map((index) => (
                <Controller
                  key={index.toString()}
                  name={`skills.${+index}`}
                  control={control}
                  render={({ field }) => (
                    <SkillInput
                      allSkills={skills ?? []}
                      value={field.value.skill}
                      delayValue={field.value.delay}
                      onChange={(value) => field.onChange({ skill: value, delay: field.value.delay })}
                      onChangeDelayValue={(delay) => field.onChange({ ...field.value, delay })}
                    />
                  )}
                />
              ))}
            </div>
            <ErrorMessage>{skillsErrorMessage}</ErrorMessage>
          </div>
          <div>
            <div className="text-xs font-bold mb-2">仲間</div>
            <div className="flex gap-4">
              {[...Array(5).keys()].map((index) => (
                <Controller
                  key={index.toString()}
                  name={`fellows.${+index}`}
                  control={control}
                  render={({ field }) => (
                    <FellowInput allFellows={fellows ?? []} value={field.value} onChange={field.onChange} />
                  )}
                />
              ))}
            </div>
            <ErrorMessage>{fellowsErrorMessage}</ErrorMessage>
          </div>
          <div>
            <div className="text-xs font-bold mb-2">遺物</div>
            <div className="flex gap-2">
              {(["mask", "fossil", "treasure", "book", "statue", "necklace"] as const).map((relicName) => (
                <Controller
                  key={relicName}
                  name={`${relicName}_relic`}
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
            {mode === "create" ? "作成" : "編集"}
          </Button>
        </div>
      </form>
      <CreateUsernameDialog open={open} onClose={() => setOpen(false)} onSubmit={() => setOpen(false)} />
    </>
  );
};
