"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useQuizzes } from "@/features/quiz";
import { useQuery } from "./query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon, XIcon } from "lucide-react";

const steps = ["loading", "quiz", "finish"] as const;
type Step = (typeof steps)[number];

function shuffle<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const QuizContainer: React.FC = () => {
  const { quizType, studyMode } = useQuery();
  const { quizzes: allQuizzes } = useQuizzes({ checkedOnly: quizType === "checked-only" });
  const [quizzes, setQuizzes] = useState(allQuizzes);
  console.log({ quizzes, allQuizzes });
  const [showAnswers, setShowAnswers] = useState(false);
  const [answer, setAnswer] = useState("");
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [step, setStep] = useState<Step>("loading");
  const clickable = useMemo(() => studyMode || showAnswers, [studyMode, showAnswers]);
  useEffect(() => {
    setCurrentQuizIndex(quizType === "endless" ? Math.trunc(Math.random() * quizzes.length) : 0);
    setQuizzes(shuffle(allQuizzes));
    setStep("quiz");
  }, [allQuizzes, quizType, quizzes]);
  const currentQuiz = useMemo(() => quizzes[currentQuizIndex], [quizzes, currentQuizIndex]);

  const handleClickDisplay = useCallback(() => {
    if (studyMode || showAnswers) setShowAnswers((prev) => !prev);
    if (showAnswers) {
      const newCurrentQuizIndex =
        quizType === "endless" ? Math.trunc(Math.random() * quizzes.length) : currentQuizIndex + 1;
      if (newCurrentQuizIndex + 1 >= quizzes.length) {
        setStep("finish");
      }
      setCurrentQuizIndex(newCurrentQuizIndex);
      setAnswer("");
    }
  }, [studyMode, showAnswers, currentQuizIndex, quizType, quizzes]);

  const handleClickAnswer = useCallback(() => {
    setShowAnswers(true);
  }, []);

  return (
    step !== "loading" && (
      <div
        role={clickable ? "button" : undefined}
        className={cn("select-none w-full h-full")}
        onClick={handleClickDisplay}
      >
        {quizType !== "endless" && (
          <div className="mb-2">
            {currentQuizIndex + 1}/{quizzes.length}
          </div>
        )}
        <div className="text-xl">問題：{currentQuiz?.question}</div>
        {!studyMode && (
          <form className="flex gap-4 mt-8">
            <Input value={answer} onChange={(event) => setAnswer(event.target.value)} />
            <Button disabled={showAnswers || !answer} onClick={handleClickAnswer}>
              解答
            </Button>
          </form>
        )}
        {showAnswers && (
          <div className="flex gap-4 text-xl mt-8">
            <div>答え：</div>
            <div>
              {currentQuiz?.answers[0]}
              {currentQuiz && currentQuiz.answers.length > 1 && <>（{currentQuiz?.answers.slice(1).join("、")}）</>}
            </div>
            <div>{currentQuiz?.answers.includes(answer) ? <CheckIcon color="green" /> : <XIcon color="red" />}</div>
          </div>
        )}
      </div>
    )
  );
};
