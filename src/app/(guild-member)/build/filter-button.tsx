"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import { FilterFormDialog } from "./filter-form-dialog";

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
