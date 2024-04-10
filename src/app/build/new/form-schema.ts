import { z } from "zod";

const relicFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  image_url: z.string(),
  created_at: z.string().datetime(),
});

export const formSchema = z.object({
  owner: z.string(),
  labels: z.object({
    id: z.string(),
    name: z.string(),
  }),
  skills: z
    .object({
      skill: z.object({
        id: z.string(),
        name: z.string(),
        image_url: z.string(),
        created_at: z.string().datetime(),
      }),
      delay: z.number(),
    })
    .array(),
  fellows: z
    .object({
      id: z.string(),
      name: z.string(),
      image_url: z.string(),
      created_at: z.string().datetime(),
    })
    .array(),
  maskRelic: relicFormSchema,
  fossilRelic: relicFormSchema,
  treasureRelic: relicFormSchema,
  bookRelic: relicFormSchema,
  statueRelic: relicFormSchema,
  necklaceRelic: relicFormSchema,
});

export type Form = z.infer<typeof formSchema>;
