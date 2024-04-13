import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Parking } from "@/features/parking";
import dayjs from "dayjs";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { Dialog } from "@/components/ui/custom-dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CopyableText } from "./copyable-text";

type Props = {
  parkings: Parking[];
  loading: boolean;
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

const formSchema = z.object({
  time: z.number(),
  parking: z.string(),
});

type Form = z.infer<typeof formSchema>;

export const ChatTemplateButton: React.FC<Props> = ({ parkings, loading }) => {
  const [open, setOpen] = useState(false);
  const { register, control, watch } = useForm<Form>({
    defaultValues: {
      time: 1,
      parking: parkings[0]?.id,
    },
  });
  const time = watch("time");
  const parking = watch("parking");
  const chatTemplate = useMemo(() => {
    const targetParking = parkings.find((parking_) => parking_.id === parking);
    if (!targetParking) return "";

    return `${time}分後、${targetParking.owner.name}${showNumberMap[targetParking.number]}オープンです。ご武運を👊`;
  }, [time, parkings, parking]);

  return (
    <>
      <Button disabled={loading} onClick={() => setOpen(true)}>
        いつもの
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} title="よく見るアレをコピー">
        <div className="flex flex-col gap-6 my-4">
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm">時間</div>
            <div className="flex items-end gap-2">
              <Input type="number" className="w-16" {...register("time")} />
              <span className="text-sm whitespace-nowrap">分後</span>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm">サーバー</div>
            <Controller
              control={control}
              name="parking"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    {parkings.map((parking) => (
                      <SelectItem key={parking.id} value={parking.id}>
                        {parking.owner.name}
                        {showNumberMap[parking.number]}
                        {dayjs(parking.open_at).format("HH:mm")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 min-h-20 mb-4">
          <CopyableText>{chatTemplate}</CopyableText>
        </div>
      </Dialog>
    </>
  );
};
