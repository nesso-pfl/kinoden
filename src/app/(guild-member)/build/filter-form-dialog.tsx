"use client";

import React, { useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { pagesPath } from "@/features/path/$path";
import { useRouter, useSearchParams } from "next/navigation";
import { Dialog } from "@/components/ui/custom-dialog";
import { Input } from "@/components/ui/input";
import { useGetLabels } from "@/features/build";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label as FormLabel } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogForm } from "@/components/ui/dialog-form";

const removeUndefined = (value: object) => {
  return JSON.parse(JSON.stringify(value));
};

const formSchema = z
  .object({
    sort: z.enum(["updated_at_asc", "updated_at_desc"]),
    owner: z.string(),
    labels: z.string().array(),
  })
  .partial();
export type Form = z.infer<typeof formSchema>;
type Sort = Form["sort"];

const toQuery = (form: Form) => {
  const values = removeUndefined({
    sort: form.sort === "updated_at_asc" ? form.sort : undefined,
    owner: form.owner || undefined,
    labels: form.labels && form.labels.length > 0 ? form.labels : undefined,
  });
  const urlSearchParams = new URLSearchParams();
  form.sort === "updated_at_asc" && urlSearchParams.append("sort", values.sort);
  form.owner && urlSearchParams.append("owner", values.owner);
  form.labels && form.labels.map((label) => urlSearchParams.append("labels", label));
  return urlSearchParams.toString();
};

const sortOptions: { value: NonNullable<Sort>; label: string }[] = [
  { value: "updated_at_desc", label: "新しい順" },
  { value: "updated_at_asc", label: "古い順" },
] as const;

type Props = {
  open: boolean;
  onClose: () => void;
};

export const FilterFormDialog: React.FC<Props> = ({ open, onClose }) => {
  const searchParams = useSearchParams();
  const defaultValues = useMemo(() => {
    const urlSearchParams = new URLSearchParams(searchParams.toString());
    return formSchema.parse({
      sort: urlSearchParams.get("sort") ?? "updated_at_desc",
      owner: urlSearchParams.get("owner") ?? undefined,
      labels: urlSearchParams.getAll("labels") ?? undefined,
    });
  }, [searchParams]);
  const router = useRouter();
  const { data: allLabels } = useGetLabels();
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Form>({
    defaultValues: {
      ...defaultValues,
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = useCallback(
    (formValues: Form) => {
      router.push(`${pagesPath.build.$url().path}?${toQuery(formValues)}`);
      onClose();
    },
    [router, onClose],
  );

  return (
    <Dialog open={open} onClose={onClose} title="絞り込みとソート">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogForm.Container>
          <DialogForm.Field>
            <DialogForm.Label>ソート</DialogForm.Label>
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
          </DialogForm.Field>
          <DialogForm.Field>
            <DialogForm.Label>作成者</DialogForm.Label>
            <div className="flex items-end gap-2">
              <Input {...register("owner")} />
            </div>
          </DialogForm.Field>
          <DialogForm.Field centered={false}>
            <DialogForm.Label>ラベル</DialogForm.Label>
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
          </DialogForm.Field>
        </DialogForm.Container>
        <div className="flex justify-center w-full">
          <Button type="submit" className="w-1/2" disabled={isSubmitting}>
            絞り込む
          </Button>
        </div>
      </form>
    </Dialog>
  );
};
