"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { HelpTooltip } from "./help-tooltip";
import Link from "next/link";
import { pagesPath } from "@/features/path/$path";

type Props = {
  studyMode: boolean;
};

export const QuizTypeButtons: React.FC<Props> = ({ studyMode }) => {
  return (
    <div className="grid grid-cols-2 items-center gap-4">
      <Button asChild>
        <Link href={pagesPath.quiz.challenge.$url({ query: { quizType: "normal", studyMode } })}>Normal</Link>
      </Button>
      <HelpTooltip>
        全ての問題からランダムに出題します。
        <br />
        全ての問題を解答したら終了します。
      </HelpTooltip>
      <Button asChild>
        <Link href={pagesPath.quiz.challenge.$url({ query: { quizType: "endless", studyMode } })}>Endless</Link>
      </Button>
      <HelpTooltip>
        全ての問題からランダムに出題します。
        <br />
        同じ問題が連続で出題されることがあります。
      </HelpTooltip>
      <Button asChild>
        <Link href={pagesPath.quiz.challenge.$url({ query: { quizType: "checked-only", studyMode } })}>
          Checked Only
        </Link>
      </Button>
      <HelpTooltip>
        チェックした問題からランダムに出題します。
        <br />
        全ての問題を解答したら終了します。
      </HelpTooltip>
    </div>
  );
};
