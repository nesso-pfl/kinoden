import { z } from "zod";
import answerJson from "@/answer.json";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "../local-storage";

const localStorageKey = "kinoden-pfl:checkedQuizzes";

export const useQuizzes = () => {
  const {
    value: checkedQuizzes,
    setValue: setCheckedQuizzes,
    isLoading,
  } = useLocalStorage<string[]>(localStorageKey, { encode: JSON.stringify, decode: JSON.parse });
  const quizzes = useMemo(() => {
    return answerJson.quizzes.map((quiz) => ({
      ...quiz,
      checked: checkedQuizzes?.includes(quiz.question),
    }));
  }, [checkedQuizzes]);

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
    isLoading,
    toggleQuizChecked,
  };
};
