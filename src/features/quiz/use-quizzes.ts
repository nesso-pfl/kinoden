import answerJson from "@/answer.json";
import { useCallback, useMemo } from "react";
import { useLocalStorage } from "../local-storage";

const localStorageKey = "kinoden-pfl:checkedQuizzes";

export const useQuizzes = (opts = { checkedOnly: false }) => {
  const { value: checkedQuizzes, setValue: setCheckedQuizzes } = useLocalStorage<string[]>(localStorageKey, {
    encode: JSON.stringify,
    decode: JSON.parse,
  });
  const quizzes = useMemo(() => {
    const allQuizzes = answerJson.quizzes.map((quiz) => ({
      ...quiz,
      checked: checkedQuizzes?.includes(quiz.question),
    }));
    return opts.checkedOnly ? allQuizzes.filter((quiz) => quiz.checked) : allQuizzes;
  }, [checkedQuizzes, opts.checkedOnly]);

  const toggleQuizChecked = useCallback(
    (question: string) => {
      if (typeof window === "undefined") return;

      const newCheckedQuizzes = checkedQuizzes?.some((quiz) => quiz === question)
        ? checkedQuizzes.filter((quiz) => quiz !== question)
        : [...(checkedQuizzes ?? []), question];

      window.localStorage.setItem(localStorageKey, JSON.stringify(newCheckedQuizzes));
      setCheckedQuizzes(newCheckedQuizzes);
    },
    [checkedQuizzes, setCheckedQuizzes],
  );

  return {
    quizzes,
    toggleQuizChecked,
  };
};
