"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Metadata } from "next";
import { BuildSummaries } from "./build-summaries";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { pagesPath } from "@/features/path/$path";
import { useRouter, useSearchParams } from "next/navigation";
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
import { querySchema } from "./query";
import { FilterFormDialog } from "./filter-form-dialog";

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
  const values = removeUndefined({
    sort: form.sort === "created_at_asc" ? form.sort : undefined,
    owner: form.owner || undefined,
    labels: form.labels && form.labels.length > 0 ? form.labels : undefined,
  });
  const urlSearchParams = new URLSearchParams();
  form.sort === "created_at_asc" && urlSearchParams.append("sort", values.sort);
  form.owner && urlSearchParams.append("owner", values.owner);
  form.labels && form.labels.map((label) => urlSearchParams.append("labels", label));
  return urlSearchParams.toString();
};

const sortOptions: { value: NonNullable<Sort>; label: string }[] = [
  { value: "created_at_desc", label: "新しい順" },
  { value: "created_at_asc", label: "古い順" },
] as const;

type Props = {
  defaultValues?: Form;
};

export const FilterButton: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="default" size="icon" className="rounded-full" onClick={() => setOpen(true)}>
        <FilterIcon />
      </Button>
      {open && <FilterFormDialog open={open} onClose={() => setOpen(false)} />}
    </>
  );
};
