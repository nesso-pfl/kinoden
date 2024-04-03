import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Parking, ParkingServer, updateParkingOpenAt, updateParkingOwner } from "@/features/parking";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { ShieldIcon, SwordsIcon } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  owner: z.string(),
  openDate: z.date(),
  openTime: z.string(),
});

type Form = z.infer<typeof formSchema>;

type Props = Parking & { parkingServers: ParkingServer[] };

export const ParkingSummaryItem: React.FC<Props> = ({ id, number, owner, open_at, parkingServers }) => {
  const [opened, setOpened] = useState(dayjs(open_at).isBefore(dayjs()));
  const { control, getValues } = useForm<Form>({
    defaultValues: {
      owner: owner.id,
      openDate: new Date(open_at),
      openTime: dayjs(open_at).format("HH:mm"),
    },
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setOpened(dayjs(open_at).isBefore(dayjs()));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [open_at]);

  const handleChangeOwner = useCallback(
    async (ownerId: string) => {
      await updateParkingOwner(id, ownerId);
    },
    [id],
  );

  const handleChangeDate = useCallback(
    async (date: Date | undefined) => {
      if (!date) return;
      const [hour, min] = getValues("openTime").split(":").map(Number);
      if (!hour || !min) return;

      await updateParkingOpenAt(id, dayjs(date).hour(hour).minute(min).toDate());
    },
    [id, getValues],
  );

  const handleChangeTime = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.value) return;

      const [hour, min] = event.target.value.split(":").map(Number);
      if (!hour || !min) return;

      await updateParkingOpenAt(id, dayjs(getValues("openDate")).hour(hour).minute(min).toDate());
    },
    [id, getValues],
  );

  return (
    <div className="grid items-center gap-2 col-span-5 grid-cols-subgrid p-2 border-b border-b-gray-400 last:border-0">
      <div>
        {owner.self ? (
          <ShieldIcon className={cn(opened && "text-red-500")} />
        ) : (
          <SwordsIcon className={cn(opened && "text-red-500")} />
        )}
      </div>
      <div>{number}</div>
      <div>
        <Controller
          control={control}
          name="owner"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                handleChangeOwner(value);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {parkingServers.map((server) => (
                  <SelectItem key={server.id} value={server.id}>
                    {server.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div>
        <Controller
          control={control}
          name="openDate"
          render={({ field }) => (
            <DatePicker
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
                handleChangeDate(value);
              }}
            />
          )}
        />
      </div>
      <Controller
        control={control}
        name="openTime"
        render={({ field }) => (
          <Input
            type="time"
            value={field.value}
            onChange={(event) => {
              field.onChange(event.target.value);
              handleChangeTime(event);
            }}
          />
        )}
      />
    </div>
  );
};
