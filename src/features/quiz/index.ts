import { z } from "zod";
import answerJson from "@/answer.json";
import { useCallback, useEffect, useMemo, useState } from "react";

const localStorageKey = "kinoden-pfl:checkedQuizzes";
const checkedQuizzesSchema = z.array(z.string());

export const useQuizzes = () => {
  const [checkedQuizzes, setCheckedQuizzes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const quizzes = useMemo(() => {
    return answerJson.quizzes.map((quiz) => ({
      ...quiz,
      checked: checkedQuizzes.includes(quiz.question),
    }));
  }, [checkedQuizzes]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setIsLoading(false);
    const checkedQuizzes_ = checkedQuizzesSchema.safeParse(
      JSON.parse(window.localStorage.getItem(localStorageKey) ?? ""),
    );
    setCheckedQuizzes(checkedQuizzes_.success ? checkedQuizzes_.data : []);
  }, []);

  const toggleQuizChecked = useCallback(
    (question: string) => {
      if (typeof window === "undefined") return;

      const newCheckedQuizzes = checkedQuizzes.some((quiz) => quiz === question)
        ? checkedQuizzes.filter((quiz) => quiz !== question)
        : [...checkedQuizzes, question];

      window.localStorage.setItem(localStorageKey, JSON.stringify(newCheckedQuizzes));
      setCheckedQuizzes(newCheckedQuizzes);
    },
    [checkedQuizzes],
  );

  return {
    quizzes,
    isLoading,
    toggleQuizChecked,
  };
};
