import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Parking, ParkingServer } from "@/features/parking";
import dayjs from "dayjs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { HelpTooltip } from "@/components/ui/help-tooltip";
import { Dialog } from "@/components/ui/custom-dialog";
import { CopyableText } from "./copyable-text";
import { DialogForm } from "@/components/ui/dialog-form";

type Props = {
  parkings: Parking[];
  parkingServers: ParkingServer[];
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

const formatParkings = (
  parkings: Parking[],
  parkingServers: ParkingServer[],
  {
    battleFilter,
    openWithinHour,
    format,
  }: {
    battleFilter: "both" | "attack-only" | "defence-only";
    openWithinHour: number[];
    format: "default" | "oneline" | "server";
  },
): string[] => {
  const texts = parkingServers
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
        .toSorted((parking1, parking2) => (dayjs(parking1.open_at).isAfter(dayjs(parking2.open_at)) ? 1 : -1))
        .map((parking) => `${showNumberMap[parking.number]}${dayjs(parking.open_at).format("HH:mm")}`)
        .join("");

      return parkingTexts ? `${parkingServer.name}${parkingServer.self ? "🛡️" : "⚔"}${parkingTexts}` : "";
    })
    .filter(Boolean);
  return format === "server"
    ? texts
    : format === "oneline"
      ? [texts.join("、")]
      : texts.reduce<string[]>((acc, cur) => {
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

const battleFilterOptions = [
  { value: "both", label: "両方" },
  { value: "attack-only", label: "奪取" },
  { value: "defence-only", label: "防衛" },
];

const formats = ["default", "oneline", "server"] as const;

const formatOptions = [
  { value: "default", label: "デフォルト" },
  { value: "server", label: "サーバーごと" },
  { value: "oneline", label: "ひとまとめ" },
];

const formSchema = z.object({
  battleFilter: z.enum(battleFilters),
  openWithinHour: z.number().array(),
  format: z.enum(formats),
  servers: z.array(z.string()),
});

type Form = z.infer<typeof formSchema>;

export const CopyParkingButton: React.FC<Props> = ({ parkings, parkingServers, loading }) => {
  const [open, setOpen] = useState(false);
  const { control, watch, getValues } = useForm<Form>({
    defaultValues: {
      battleFilter: "attack-only",
      openWithinHour: [1],
      format: "default",
      servers: parkingServers.map((server) => server.id),
    },
  });
  const battleFilter = watch("battleFilter");
  const openWithinHour = watch("openWithinHour");
  const format = watch("format");
  const servers = watch("servers");

  const parkingTexts = useMemo(
    () =>
      formatParkings(
        parkings,
        parkingServers.filter((parkingServer) => servers.includes(parkingServer.id)),
        { battleFilter, openWithinHour, format },
      ),
    [parkings, parkingServers, servers, battleFilter, openWithinHour, format],
  );

  return (
    <>
      <Button disabled={loading} onClick={() => setOpen(true)}>
        スケジュールをコピー
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} title="スケジュールをコピー">
        <DialogForm.Container>
          <DialogForm.Field>
            <DialogForm.Label>奪取/防衛</DialogForm.Label>
            <Controller
              control={control}
              name="battleFilter"
              render={({ field }) => (
                <RadioGroup
                  className="flex items-center gap-4"
                  defaultValue={getValues("battleFilter")}
                  onValueChange={field.onChange}
                >
                  {battleFilterOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
          </DialogForm.Field>
          <DialogForm.Field>
            <DialogForm.Label>
              <span className="inline-block w-1">{openWithinHour}</span>&ensp;時間以内に停戦終了のみ
            </DialogForm.Label>
            <Controller
              control={control}
              name="openWithinHour"
              render={({ field }) => (
                <div className="flex-1">
                  <Slider className="" min={1} max={4} step={1} value={field.value} onValueChange={field.onChange} />
                </div>
              )}
            />
          </DialogForm.Field>
          <DialogForm.Field>
            <DialogForm.Label>サーバー</DialogForm.Label>
            <div className="flex gap-4">
              {parkingServers.map((parkingServer) => (
                <Label key={parkingServer.id} className="flex items-center gap-2">
                  <Controller
                    control={control}
                    name="servers"
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value.some((server) => server === parkingServer.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.onChange([...field.value, parkingServer.id]);
                          } else {
                            field.onChange(field.value.filter((server) => server !== parkingServer.id));
                          }
                        }}
                      />
                    )}
                  />
                  <span className="text-sm">{parkingServer.name}</span>
                </Label>
              ))}
            </div>
          </DialogForm.Field>
          <DialogForm.Field centered={false}>
            <div className="flex items-center gap-2">
              <DialogForm.Label>出力</DialogForm.Label>
              <HelpTooltip>
                <span className="grid grid-cols-[auto_1fr] mb-4">
                  <span className="font-bold text-right">デフォルト:&ensp;</span>
                  <span>キノコ伝説チャットの最大文字数である50文字を超えないようにテキストを分割します。</span>
                  <span className="font-bold text-right">サーバーごと:&ensp;</span>
                  <span>サーバーごとにテキストを分割します。</span>
                  <span className="font-bold text-right">ひとまとめ:&ensp;</span>
                  <span>テキストを分割しません。</span>
                </span>
                <span className="text-xs text-gray-700">
                  ※1つのサーバーが8つ以上の駐騎場を所有する場合、テキストは分割されず文字数が50を超えるのでチャットに貼れません。
                  <br />
                  その場合は、停戦終了のフィルタをかけて調節してください。
                </span>
              </HelpTooltip>
            </div>
            <Controller
              control={control}
              name="format"
              render={({ field }) => (
                <RadioGroup
                  className="flex flex-wrap items-center justify-end gap-x-4"
                  defaultValue={getValues("format")}
                  onValueChange={field.onChange}
                >
                  {formatOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2 my-1">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
          </DialogForm.Field>
        </DialogForm.Container>
        <div>
          <div className="flex flex-col gap-4 min-h-[182px] mb-4">
            {parkingTexts.length > 0 && parkingTexts.map((text) => <CopyableText key={text}>{text}</CopyableText>)}
          </div>
        </div>
      </Dialog>
    </>
  );
};
