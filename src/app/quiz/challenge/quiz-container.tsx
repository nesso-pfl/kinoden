"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useQuizzes } from "@/features/quiz";
import { useQuery } from "./query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function shuffle<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

type Props = {};

export const QuizContainer: React.FC<Props> = () => {
  const { quizType, studyMode } = useQuery();
  const { quizzes: allQuizzes, toggleQuizChecked } = useQuizzes();
  const [quizzes, setQuizzes] = useState(allQuizzes);
  const [showAnswers, setShowAnswers] = useState(false);
  const [answer, setAnswer] = useState("");
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setCurrentQuizIndex(quizType === "endless" ? Math.trunc(Math.random() * quizzes.length) : 0);
    setQuizzes(shuffle(allQuizzes));
    setIsLoading(false);
  }, [allQuizzes, quizType, quizzes]);
  const currentQuiz = useMemo(() => quizzes[currentQuizIndex], [quizzes, currentQuizIndex]);

  const handleClickDisplay = useCallback(() => {
    if (studyMode || showAnswers) setShowAnswers((prev) => !prev);
    if (showAnswers) {
      const newCurrentQuizIndex =
        quizType === "endless" ? Math.trunc(Math.random() * quizzes.length) : currentQuizIndex + 1;
      setCurrentQuizIndex(newCurrentQuizIndex);
      setAnswer("");
    }
  }, [studyMode, showAnswers, currentQuizIndex, quizType, quizzes]);

  const handleClickAnswer = useCallback(() => {
    if (currentQuiz.answers.includes(answer)) {
    }
    setShowAnswers(true);
  }, [answer, currentQuiz]);

  return (
    !isLoading && (
      <div role="button" className="select-none" onClick={handleClickDisplay}>
        <div>{currentQuiz.question}</div>
        {!studyMode && (
          <form className="flex gap-4 mt-8">
            <Input value={answer} onChange={(event) => setAnswer(event.target.value)} />
            <Button disabled={showAnswers || !answer} onClick={handleClickAnswer}>
              解答
            </Button>
          </form>
        )}
        {showAnswers && (
          <div>
            {currentQuiz.answers[0]}
            {currentQuiz.answers.length > 1 && <>（{currentQuiz.answers.slice(1).join("、")}）</>}
          </div>
        )}
      </div>
    )
  );
};
