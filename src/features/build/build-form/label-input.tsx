"use client";

import React, { useCallback, useState } from "react";
import { Label } from "@/features/build";
import { Dialog } from "@/components/ui/custom-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  allLabels: Label[];
  value: Label[] | undefined;
  onChange: (labels: Label[]) => void;
};

export const LabelInput: React.FC<Props> = ({ allLabels, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const handleClickFellow = useCallback(
    (label: Label) => () => {
      const newValue =
        !value || value.length === 0
          ? [label]
          : value.some((v) => v.id === label.id)
            ? value.filter((value) => value.id !== label.id)
            : [...value, label];
      onChange(newValue);
    },
    [onChange, value],
  );

  return (
    <div className="flex justify-between gap-2">
      <div className="flex flex-wrap gap-1 min-h-12">
        {value?.map((label) => (
          <Badge key={label.id} className="h-fit" variant="outline">
            {label.name}
          </Badge>
        ))}
      </div>
      <Button
        size="icon"
        variant="outline"
        className="shrink-0"
        onClick={() => setOpen(true)}
        aria-label="ラベルを追加"
      >
        <PlusIcon />
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} title="ラベル選択">
        <div className="flex flex-wrap gap-4">
          {allLabels.map((label) => (
            <div key={label.id} className="flex items-center gap-1">
              <Checkbox
                id={label.id}
                checked={value?.some((v) => v.id === label.id)}
                onCheckedChange={handleClickFellow(label)}
              />
              <label className="text-sm" htmlFor={label.id}>
                {label.name}
              </label>
            </div>
          ))}
        </div>
      </Dialog>
    </div>
  );
};
