"use client";

import { useParking } from "@/features/parking";
import React from "react";
import { ParkingSummaryItem } from "./parking-summary-item";
import { CopyParkingButton } from "./copy-parking-button";

type Props = {};

export const ParkingSummary: React.FC<Props> = () => {
  const { parkings, parkingServers } = useParking();

  return (
    <div>
      <CopyParkingButton parkings={parkings} parkingServers={parkingServers} />
      <div className="grid grid-cols-[32px_24px_5fr_5fr_5fr]">
        <div className="grid items-center gap-2 col-span-5 grid-cols-subgrid p-2 border-b border-b-gray-400 last:border-0">
          <div />
          <div className="text-xs md:text-base">No</div>
          <div className="text-xs md:text-base">所有サーバー</div>
          <div className="text-xs md:text-base">停戦終了日</div>
          <div className="text-xs md:text-base">停戦終了時刻</div>
        </div>
        {parkings.map((parking) => (
          <ParkingSummaryItem key={parking.id} {...parking} parkingServers={parkingServers} />
        ))}
      </div>
    </div>
  );
};
