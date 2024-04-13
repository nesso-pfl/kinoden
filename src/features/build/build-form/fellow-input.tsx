"use client";

import React, { useCallback, useState } from "react";
import { Fellow } from "@/features/build";
import Image from "next/image";
import { Dialog } from "@/components/ui/custom-dialog";
import { staticPath } from "@/features/path/$path";

type Props = {
  allFellows: Fellow[];
  value: Fellow | undefined;
  onChange: (fellow: Fellow) => void;
};

export const FellowInput: React.FC<Props> = ({ allFellows, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const handleClickFellow = useCallback(
    (fellow: Fellow) => () => {
      onChange(fellow);
      setOpen(false);
    },
    [onChange],
  );

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label="仲間を選択">
        <Image
          src={value?.image_url ? value.image_url : staticPath.blank.blank_skill_png}
          alt={value?.name ? value.name : "未選択"}
          width={40}
          height={40}
        />
      </button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div className="flex flex-wrap gap-2">
          {allFellows.map((fellow) => (
            <button type="button" key={fellow.id} onClick={handleClickFellow(fellow)}>
              <Image src={fellow.image_url} alt={fellow.name} width={40} height={40} />
            </button>
          ))}
        </div>
      </Dialog>
    </>
  );
};
