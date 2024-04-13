"use client";

import React, { useCallback, useState } from "react";
import { Relic } from "@/features/build";
import Image from "next/image";
import { Dialog } from "@/components/ui/custom-dialog";
import { staticPath } from "@/features/path/$path";

type Props = {
  relicOptions: Relic[];
  value: Relic | undefined;
  onChange: (relic: Relic) => void;
};

export const RelicInput: React.FC<Props> = ({ relicOptions, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const handleClickRelic = useCallback(
    (relic: Relic) => () => {
      onChange(relic);
      setOpen(false);
    },
    [onChange],
  );

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label="遺物を選択">
        <Image
          src={value?.image_url ? value.image_url : staticPath.blank.blank_relic_png}
          alt={value?.name ? value.name : "未選択"}
          width={48}
          height={48}
        />
      </button>
      <Dialog open={open} onClose={() => setOpen(false)} title="遺物選択">
        <div className="flex flex-wrap gap-2">
          {relicOptions.map((relic) => (
            <button type="button" key={relic.id} onClick={handleClickRelic(relic)}>
              <Image src={relic.image_url} alt={relic.name} width={48} height={48} />
            </button>
          ))}
        </div>
      </Dialog>
    </>
  );
};
