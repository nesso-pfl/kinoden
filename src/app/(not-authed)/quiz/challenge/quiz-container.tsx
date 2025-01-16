"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQuizzes } from "@/features/quiz";
import { useQuery } from "./query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon, XIcon } from "lucide-react";

const steps = ["loading", "answering", "answered", "finish"] as const;
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
  const displayRef = useRef<HTMLDivElement>(null);
  const { quizType, studyMode } = useQuery();
  const { quizzes: allQuizzes } = useQuizzes({ checkedOnly: quizType === "checked-only" });
  const [quizzes, setQuizzes] = useState(allQuizzes);
  const [answer, setAnswer] = useState("");
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [step, setStep] = useState<Step>("loading");

  const clickable = useMemo(() => studyMode || step === "answered", [studyMode, step]);
  const currentQuiz = useMemo(() => quizzes[currentQuizIndex], [quizzes, currentQuizIndex]);

  useEffect(() => {
    setQuizzes(shuffle(allQuizzes));
    setStep("answering");
  }, [allQuizzes, quizType, quizzes]);

  const handleClickDisplay = useCallback(() => {
    if (studyMode && step === "answering") {
      setStep("answered");
    }
    if (step === "answered") {
      const newCurrentQuizIndex =
        quizType === "endless" ? Math.trunc(Math.random() * quizzes.length) : currentQuizIndex + 1;
      setStep(quizType !== "endless" && newCurrentQuizIndex + 1 >= quizzes.length ? "finish" : "answering");
      setCurrentQuizIndex(newCurrentQuizIndex);
      setAnswer("");
    }
  }, [studyMode, currentQuizIndex, quizType, quizzes, step]);

  const handleSubmitAnswer = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    setStep("answered");
    displayRef.current?.focus();
  }, []);

  return (
    step !== "loading" && (
      <div
        role={clickable ? "button" : undefined}
        className={cn("select-none w-full h-full")}
        onKeyDown={(event) => clickable && (event.key === "Enter" || event.key === " ") && handleClickDisplay()}
        onClick={handleClickDisplay}
        ref={displayRef}
      >
        {quizType !== "endless" && (
          <div className="mb-2">
            {currentQuizIndex + 1}/{quizzes.length}
          </div>
        )}
        <div className="text-xl">問題：{currentQuiz?.question}</div>
        {!studyMode && (
          <form className="flex gap-4 mt-8" onSubmit={handleSubmitAnswer}>
            <Input value={answer} onChange={(event) => setAnswer(event.target.value)} />
            <Button type="submit" disabled={step !== "answering" || !answer}>
              解答
            </Button>
          </form>
        )}
        {step === "answered" && (
          <div className="flex gap-4 text-xl mt-8">
            <div>答え：</div>
            <div>
              {currentQuiz?.answers[0]}
              {currentQuiz && currentQuiz.answers.length > 1 && <>（{currentQuiz?.answers.slice(1).join("、")}）</>}
            </div>
            {!studyMode && (
              <div>{currentQuiz?.answers.includes(answer) ? <CheckIcon color="green" /> : <XIcon color="red" />}</div>
            )}
          </div>
        )}
      </div>
    )
  );
};
