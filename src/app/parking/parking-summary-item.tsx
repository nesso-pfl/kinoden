import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Parking, ParkingServer } from "@/features/parking";
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
  const { control, handleSubmit } = useForm<Form>({
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

  const handleChangeOwner = useCallback((ownerId: string) => {
    if (ownerId) {
      console.log(ownerId);
    }
  }, []);

  const handleChangeDate = useCallback((date: Date | undefined) => {}, []);

  const handleChangeTime = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      console.log(event.target.value);
    }
  }, []);

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
        <Input className="hidden md:block" value={owner.name} onChange={() => {}} />
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
              <SelectTrigger className="md:hidden">
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
