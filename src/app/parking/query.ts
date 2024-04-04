import { z } from "zod";

export const querySchema = z.object({
  debug: z.enum(["on", "off"]).catch("off").default("off"),
});

export type Query = z.infer<typeof querySchema>;
