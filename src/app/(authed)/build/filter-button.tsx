"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { FilterIcon } from "lucide-react";
import { FilterFormDialog } from "./filter-form-dialog";

const formSchema = z
  .object({
    sort: z.enum(["created_at_asc", "created_at_desc"]),
    owner: z.string(),
    labels: z.string().array(),
  })
  .partial();
export type Form = z.infer<typeof formSchema>;

export const FilterButton: React.FC = () => {
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
