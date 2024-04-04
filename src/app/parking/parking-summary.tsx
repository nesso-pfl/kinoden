"use client";

import { Parking, useParking } from "@/features/parking";
import React, { useMemo } from "react";
import { ParkingSummaryItem } from "./parking-summary-item";
import { CopyParkingButton } from "./copy-parking-button";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { querySchema } from "./query";

const formSchema = z.object({
  parkings: z
    .object({
      owner: z.string(),
      openDate: z.date(),
      openTime: z.string(),
    })
    .array(),
});

type Form = z.infer<typeof formSchema>;

const toForm = (parking: Parking) => {
  return {
    owner: parking.owner.id,
    openDate: new Date(parking.open_at),
    openTime: dayjs(parking.open_at).format("HH:mm"),
  };
};

type Props = {};

export const ParkingSummary: React.FC<Props> = () => {
  const searchParams = useSearchParams();
  const query = useMemo(() => querySchema.parse(Object.fromEntries(searchParams.entries())), [searchParams]);
  const form = useForm<Form>({
    defaultValues: { parkings: [] },
  });
  const { parkings, parkingServers } = useParking({
    onInitParkings: (parkings) => form.reset({ parkings: parkings.map(toForm) }),
    onUpdateParking: (newParking) => {
      form.resetField(`parkings.${newParking.number - 1}`, { defaultValue: toForm(newParking) });
    },
  });

  return (
    <div>
      <div className="mb-4">
        <CopyParkingButton
          key={parkingServers.map((s) => s.id).join("")}
          parkings={parkings}
          parkingServers={parkingServers}
        />
      </div>
      <FormProvider {...form}>
        <div className="grid grid-cols-[32px_24px_4fr_7fr_4fr]">
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
      </FormProvider>
    </div>
  );
};
