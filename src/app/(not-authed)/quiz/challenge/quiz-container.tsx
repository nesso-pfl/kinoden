"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQuizzes } from "@/features/quiz";
import { useQuery } from "./query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { pagesPath } from "@/features/path/$path";
import { Checkbox } from "@/components/ui/checkbox";

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
  const { quizzes: allQuizzes, toggleQuizChecked } = useQuizzes({ checkedOnly: quizType === "checked-only" });
  const [quizzes, setQuizzes] = useState(allQuizzes);
  const [answer, setAnswer] = useState("");
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [step, setStep] = useState<Step>("loading");
  const [correctAnswerNum, setCorrectAnswerNum] = useState<number>(0);
  const [answerNum, setAnswerNum] = useState<number>(0);
  const correctAnswersRate = useMemo(() => {
    const value = ((correctAnswerNum / answerNum) * 100).toFixed(2);
    return value.endsWith(".00") ? value.slice(0, -3) : value;
  }, [correctAnswerNum, answerNum]);

  const clickable = useMemo(() => studyMode || step === "answered", [studyMode, step]);
  const currentQuiz = quizzes[currentQuizIndex];

  const inited = useRef(false);
  useEffect(() => {
    if (inited.current) return;
    inited.current = true;
    setQuizzes(shuffle(allQuizzes));
    setStep("answering");
  }, [allQuizzes]);

  const handleClickDisplay = useCallback(() => {
    if (studyMode && step === "answering") {
      setStep("answered");
    }
    if (step === "answered") {
      const newCurrentQuizIndex =
        quizType === "endless" ? Math.trunc(Math.random() * quizzes.length) : currentQuizIndex + 1;
      setStep(quizType !== "endless" && newCurrentQuizIndex >= quizzes.length ? "finish" : "answering");
      setCurrentQuizIndex(newCurrentQuizIndex);
      setAnswer("");
    }
  }, [studyMode, currentQuizIndex, quizType, quizzes, step]);

  const handleSubmitAnswer = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setAnswerNum((prev) => prev + 1);
      setCorrectAnswerNum((prev) => (currentQuiz?.answers.includes(answer) ? prev + 1 : prev));
      setStep("answered");
      displayRef.current?.focus();
    },
    [currentQuiz, answer],
  );

  return step === "loading" ? undefined : step === "finish" ? (
    <div className="flex flex-col items-center">
      <p className="text-3xl mb-8">終了</p>
      {!studyMode && (
        <div>
          <p className="mb-2">正答数: {correctAnswerNum}</p>
          <p className="mb-8">正答率: {correctAnswersRate}％</p>
        </div>
      )}
      <p className="mb-2">おつかれさまでした！</p>
      <Link className="underline hover:opacity-60" href={pagesPath.quiz.$url()}>
        クイズトップへ戻る
      </Link>
    </div>
  ) : (
    <div
      role={clickable ? "button" : undefined}
      className={cn("select-none w-full h-full")}
      onKeyDown={(event) => clickable && (event.key === "Enter" || event.key === " ") && handleClickDisplay()}
      onClick={handleClickDisplay}
      ref={displayRef}
    >
      {quizType !== "endless" && (
        <div className="flex gap-4 mb-2">
          <div>
            {currentQuizIndex + 1}/{quizzes.length}
          </div>
          {!studyMode && answerNum > 0 && (
            <div>
              正答数：{correctAnswerNum}（{correctAnswersRate}％）
            </div>
          )}
        </div>
      )}
      <Checkbox
        checked={currentQuiz?.checked}
        onClick={(event) => event.stopPropagation()}
        onCheckedChange={() => {
          currentQuiz?.question && toggleQuizChecked(currentQuiz.question);
          setQuizzes(
            quizzes.map((quiz) =>
              quiz.question === currentQuiz?.question ? { ...quiz, checked: !quiz.checked } : quiz,
            ),
          );
        }}
      />
      <div className="text-xl">問題：{currentQuiz?.question}</div>
      {!studyMode && (
        <form className="flex gap-4 mt-8" onSubmit={handleSubmitAnswer}>
          <Input
            className="max-w-sm text-base xl:text-sm"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
          />
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
            <div className="grid place-items-center">
              {currentQuiz?.answers.includes(answer) ? <CheckIcon color="green" /> : <XIcon color="red" />}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
