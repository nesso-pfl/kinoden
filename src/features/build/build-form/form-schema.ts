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
  labels: z
    .object(
      {
        id: z.string(),
        name: z.string(),
        created_at: z.string(),
      },
      { required_error: "ラベルを1つ以上選択してください" },
    )
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
    .array()
    .refine(
      (value) => {
        const skillIds = value.map((v) => v.skill.id);
        return new Set(skillIds).size === skillIds.length;
      },
      { path: [], message: "重複した技能があります" },
    ),
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
    .array()
    .refine(
      (value) => {
        const fellowId = value.map((v) => v.id);
        return new Set(fellowId).size === fellowId.length;
      },
      { path: [], message: "重複した仲間があります" },
    ),
  mask_relic: relicFormSchema,
  fossil_relic: relicFormSchema,
  treasure_relic: relicFormSchema,
  book_relic: relicFormSchema,
  statue_relic: relicFormSchema,
  necklace_relic: relicFormSchema,
});

export type Form = z.infer<typeof formSchema>;
