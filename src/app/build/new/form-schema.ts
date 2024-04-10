import { z } from "zod";

const relicFormSchema = z.object(
  {
    id: z.string(),
    name: z.string(),
    image_url: z.string(),
    created_at: z.string(),
  },
  { required_error: "遺物を選択してください" },
);

export const formSchema = z.object({
  owner: z.string().min(1, "あもﾁｬﾏに「オーナーエラーが出た」と問い合わせてください"),
  labels: z
    .object({
      id: z.string(),
      name: z.string(),
      created_at: z.string(),
    })
    .array()
    .min(1, "ラベルを1つ以上選択してください"),
  skills: z
    .object({
      skill: z.object(
        {
          id: z.string(),
          name: z.string(),
          image_url: z.string(),
          created_at: z.string(),
        },
        { required_error: "技能を全て選択してください" },
      ),
      delay: z.number().min(0, "遅延は0以上の数値を入力してください").max(10, "遅延は10以下の数値を入力してください"),
    })
    .array(),
  fellows: z
    .object(
      {
        id: z.string(),
        name: z.string(),
        image_url: z.string(),
        created_at: z.string(),
      },
      { required_error: "仲間を全て選択してください" },
    )
    .array(),
  maskRelic: relicFormSchema,
  fossilRelic: relicFormSchema,
  treasureRelic: relicFormSchema,
  bookRelic: relicFormSchema,
  statueRelic: relicFormSchema,
  necklaceRelic: relicFormSchema,
});

export type Form = z.infer<typeof formSchema>;
