import { quizTypes } from "@/features/quiz";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { z } from "zod";

export const querySchema = z.object({
  quizType: z.enum(quizTypes).default("normal"),
  studyMode: z.preprocess((value) => value === "true", z.boolean()),
});

export type Query = z.infer<typeof querySchema>;

export const useQuery = () => {
  const searchParams = useSearchParams();
  const query = useMemo(() => querySchema.parse(Object.fromEntries(searchParams.entries())), [searchParams]);

  return query;
};
