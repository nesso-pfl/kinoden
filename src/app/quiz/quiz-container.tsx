"use client";

import React from "react";
import { StudyModeSwitch } from "./study-mode-switch";
import { QuizTypeButtons } from "./quiz-type-buttons";
import { useStudyMode } from "@/features/quiz";

export const QuizContainer: React.FC = () => {
  const { studyMode, setStudyMode } = useStudyMode();

  return (
    <div>
      <div className="mb-4">
        <StudyModeSwitch value={studyMode} onToggle={() => setStudyMode(!studyMode)} />
      </div>
      <QuizTypeButtons studyMode={studyMode} />
    </div>
  );
};
