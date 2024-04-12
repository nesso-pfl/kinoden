"use client";

import React, { useCallback, useState } from "react";
import { Metadata } from "next";
import { BuildSummaries } from "./build-summaries";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { pagesPath } from "@/features/path/$path";
import { useRouter } from "next/navigation";
import { Dialog } from "@/components/ui/custom-dialog";
import { Input } from "@/components/ui/input";
import { CreateUsernameDialog, Label, getLabels, useGetLabels, useUsernameStore } from "@/features/build";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilterIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label as FormLabel } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const removeUndefined = (value: object) => {
  return JSON.parse(JSON.stringify(value));
};

const formSchema = z
  .object({
    sort: z.enum(["created_at_asc", "created_at_desc"]),
    owner: z.string(),
    labels: z.string().array(),
  })
  .partial();
export type Form = z.infer<typeof formSchema>;
type Sort = Form["sort"];

const toQuery = (form: Form) => {
  return removeUndefined({
    sort: form.sort === "created_at_asc" ? form.sort : undefined,
    owner: form.owner || undefined,
    labels: form.labels && form.labels.length > 0 ? form.labels : undefined,
  });
};

const sortOptions: { value: NonNullable<Sort>; label: string }[] = [
  { value: "created_at_desc", label: "新しい順" },
  { value: "created_at_asc", label: "古い順" },
] as const;

type Props = {
  defaultValues?: Form;
};

export const FilterButton: React.FC<Props> = ({ defaultValues }) => {
  const router = useRouter();
  const { data: allLabels } = useGetLabels();
  const [open, setOpen] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Form>({
    defaultValues: {
      sort: defaultValues?.sort ?? "created_at_desc",
      ...defaultValues,
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = useCallback(
    (formValues: Form) => {
      router.push(pagesPath.build.$url({ query: toQuery(formValues) }).path);
      setOpen(false);
    },
    [router],
  );

  return (
    <>
      <Button variant="default" size="icon" className="rounded-full" onClick={() => setOpen(true)}>
        <FilterIcon />
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <h2 className="text-lg font-semibold leading-none tracking-tight text-center md:text-left">絞り込みとソート</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6 my-4">
            <div className="flex items-center justify-between gap-4">
              <div className="text-sm">ソート</div>
              <div className="flex items-end gap-2">
                <Controller
                  control={control}
                  name="sort"
                  render={({ field }) => (
                    <RadioGroup
                      className="flex flex-wrap items-center justify-end gap-x-4"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      {sortOptions.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2 my-1">
                          <RadioGroupItem value={option.value} id={option.value} />
                          <FormLabel htmlFor={option.value}>{option.label}</FormLabel>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="text-sm">作成者</div>
              <div className="flex items-end gap-2">
                <Input {...register("owner")} />
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="text-sm whitespace-nowrap">ラベル</div>
              <div className="flex items-end gap-2">
                <Controller
                  control={control}
                  name="labels"
                  render={({ field }) => (
                    <div className="flex flex-wrap gap-4">
                      {allLabels?.map((label) => (
                        <div key={label.id} className="flex items-center gap-1">
                          <Checkbox
                            id={label.id}
                            checked={field.value?.some((v) => v === label.id)}
                            onCheckedChange={() => {
                              const newValue = field.value?.some((v) => v === label.id)
                                ? field.value.filter((value) => value !== label.id)
                                : [...(field.value ?? []), label.id];
                              field.onChange(newValue);
                            }}
                          />
                          <label className="text-sm" htmlFor={label.id}>
                            {label.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <Button type="submit" className="w-1/2" disabled={isSubmitting}>
              絞り込む
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};
