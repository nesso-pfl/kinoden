"use client";

import React, { useMemo, useState } from "react";
import { useParking } from "@/features/parking";
import { Skeleton } from "@/components/ui/skeleton";
import "dayjs/locale/ja";
import { Parking } from "./parking";

export const Parkings = () => {
  const [sort, setSort] = useState<"number" | "openDate">("number");
  const { parkings, loading } = useParking({});
  const sortedParkings = useMemo(
    () =>
      parkings.toSorted((p1, p2) => (sort === "number" ? p1.number - p2.number : p1.open_at.localeCompare(p2.open_at))),
    [parkings, sort],
  );

  return (
    <div>
      <div className="grid grid-cols-[32px_40px_4fr_7fr]">
        <div className="grid items-center gap-2 col-span-4 grid-cols-subgrid p-2 border-b border-b-gray-400 last:border-0">
          <div />
          <div className="text-xs md:text-base" onClick={() => setSort("number")}>
            No
          </div>
          <div className="text-xs md:text-base">所有サーバー</div>
          <div className="text-xs md:text-base" onClick={() => setSort("openDate")}>
            停戦終了時刻
          </div>
        </div>
        {loading
          ? [
              Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="grid items-center gap-2 col-span-4 grid-cols-subgrid py-2 md:px-2 border-b border-b-gray-400 last:border-0"
                >
                  <Skeleton className="h-[24px] w-[24px]" />
                  <Skeleton className="h-[24px] w-[16px]" />
                  <Skeleton className="h-[24px] w-full" />
                  <Skeleton className="h-[24px] w-full" />
                </div>
              )),
            ]
          : sortedParkings.map((parking) => <Parking key={parking.id} {...parking} />)}
      </div>
    </div>
  );
};
