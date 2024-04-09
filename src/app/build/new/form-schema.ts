import { z } from "zod";

export const formSchema = z.object({
  owner: z.string(),
  labels: z.object({
    id: z.string(),
    name: z.string(),
  }),
  skills: z
    .object({
      id: z.string(),
      image_url: z.string(),
      delay: z.number(),
    })
    .array(),
  fellows: z
    .object({
      id: z.string(),
      image_url: z.string(),
    })
    .array(),
  maskRelic: z.object({
    id: z.string(),
    image_url: z.string(),
  }),
  fossilRelic: z.object({
    id: z.string(),
    image_url: z.string(),
  }),
  treasureRelic: z.object({
    id: z.string(),
    image_url: z.string(),
  }),
  bookRelic: z.object({
    id: z.string(),
    image_url: z.string(),
  }),
  statueRelic: z.object({
    id: z.string(),
    image_url: z.string(),
  }),
  necklaceRelic: z.object({
    id: z.string(),
    image_url: z.string(),
  }),
});

export type Form = z.infer<typeof formSchema>;
