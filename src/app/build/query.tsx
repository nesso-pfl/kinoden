import { z } from "zod";

export const querySchema = z.object({
  owner: z.string().optional(),
  labels: z.preprocess((v) => (typeof v === "string" ? [v] : v), z.array(z.string()).optional()),
  sort: z.enum(["created_at_asc", "created_at_desc"]).optional(),
});

export type Query = z.infer<typeof querySchema>;
