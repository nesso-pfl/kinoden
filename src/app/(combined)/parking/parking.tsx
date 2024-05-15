"use client";

import React, { useEffect, useState } from "react";
import { Parking as ParkingType } from "@/features/parking";
import { ShieldIcon, SwordsIcon } from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import { cn } from "@/lib/utils";

type Props = ParkingType;

export const Parking: React.FC<Props> = ({ owner, number, open_at }) => {
  const [opened, setOpened] = useState(dayjs(open_at).isBefore(dayjs()));
  useEffect(() => {
    const intervalId = setInterval(() => {
      setOpened(dayjs(open_at).isBefore(dayjs()));
    }, 300);

    return () => {
      clearInterval(intervalId);
    };
  }, [open_at]);

  return (
    <div className="grid items-center gap-2 col-span-4 grid-cols-subgrid py-2 md:px-2 border-b border-b-gray-400 last:border-0">
      <div>
        {owner.self ? (
          <ShieldIcon className={cn(opened && "text-red-500")} />
        ) : (
          <SwordsIcon className={cn(opened && "text-red-500")} />
        )}
      </div>
      <div>{number}</div>
      <div>{owner.name}</div>
      <div className="flex items-center gap-4">
        <div className="text-sm">{dayjs(open_at).locale("ja").format("M/DD(ddd)")}</div>
        <div>{dayjs(open_at).format("HH:mm")}</div>
      </div>
    </div>
  );
};
