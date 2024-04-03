"use client";

import React, { useCallback, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Parking, ParkingServer } from "@/features/parking";
import dayjs from "dayjs";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { Slider } from "@/components/ui/slider";
import { FileDiff } from "lucide-react";

type Props = {
  parkings: Parking[];
  parkingServers: ParkingServer[];
};

const showNumberMap: Record<number, string> = {
  1: "①",
  2: "②",
  3: "③",
  4: "④",
  5: "⑤",
  6: "⑥",
  7: "⑦",
  8: "⑧",
  9: "⑨",
  10: "⑩",
  11: "⑪",
  12: "⑫",
};

const formatParkings = (
  parkings: Parking[],
  parkingServers: ParkingServer[],
  {
    battleFilter,
    openWithinHour,
  }: {
    battleFilter: "both" | "attack-only" | "defence-only";
    openWithinHour: number[];
  },
) => {
  return parkingServers
    .filter((server) => (battleFilter === "both" ? true : battleFilter === "attack-only" ? !server.self : server.self))
    .map((parkingServer) => {
      const parkingTexts = parkings
        .filter((parking) => {
          return (
            parking.owner.id === parkingServer.id &&
            dayjs().isBefore(dayjs(parking.open_at)) &&
            dayjs().add(openWithinHour[0]!, "hour").isAfter(dayjs(parking.open_at))
          );
        })
        .map((parking) => `${showNumberMap[parking.number]}${dayjs(parking.open_at).format("HH:mm")}`)
        .join("");

      return parkingTexts ? `${parkingServer.name}${parkingServer.self ? "🛡️" : "⚔"}${parkingTexts}` : "";
    })
    .filter(Boolean)
    .reduce<string[]>((acc, cur) => {
      if (acc.length === 0) {
        return [cur];
      } else if ((acc[acc.length - 1]?.length ?? 0) + cur.length <= 50) {
        return [...acc.slice(0, -1), `${acc[acc.length - 1]}、${cur}`];
      } else {
        return [...acc, cur];
      }
    }, []);
};

const battleFilters = ["both", "attack-only", "defence-only"] as const;

const radioOptions = [
  { value: "both", label: "両方" },
  { value: "attack-only", label: "奪取" },
  { value: "defence-only", label: "防衛" },
];

const formSchema = z.object({
  battleFilter: z.enum(battleFilters),
  openWithinHour: z.number().array(),
});

type Form = z.infer<typeof formSchema>;

export const CopyParkingButton: React.FC<Props> = ({ parkings, parkingServers }) => {
  const { control, watch } = useForm<Form>({
    defaultValues: {
      battleFilter: "attack-only",
      openWithinHour: [1],
    },
  });
  const battleFilter = watch("battleFilter");
  const openWithinHour = watch("openWithinHour");

  const parkingTexts = useMemo(
    () => formatParkings(parkings, parkingServers, { battleFilter, openWithinHour }),
    [parkings, parkingServers, battleFilter, openWithinHour],
  );

  return (
    <Dialog>
      <Button asChild>
        <DialogTrigger>スケジュールをコピー</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>スケジュールをコピー</DialogTitle>
        </DialogHeader>
        <div className="text-lg text-start">フィルタ</div>
        <Controller
          control={control}
          name="battleFilter"
          render={({ field }) => (
            <RadioGroup className="flex gap-4 mb-4" defaultValue="both" onValueChange={field.onChange}>
              {radioOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          )}
        />
        <Controller
          control={control}
          name="openWithinHour"
          render={({ field }) => (
            <div className="mb-8 select-none">
              <Slider min={1} max={4} step={1} value={field.value} onValueChange={field.onChange} /> {openWithinHour}{" "}
              時間以内に停戦終了のみ
            </div>
          )}
        />
        <div className="flex flex-col gap-4">
          {parkingTexts.map((text) => (
            <pre key={text} className="border border-gray-400 rounded-md p-2 whitespace-normal break-all select-all">
              {text}
            </pre>
          ))}
          <div className="text-xs text-gray-400">50文字の制限を超える場合、自動的に分割されることがあります</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
