import React from "react";
import { QuizTypeButtons } from "./quiz-type-buttons";
import { StudyModeSwitch } from "./study-mode-switch";

export default function Home() {
  return (
    <main className="flex flex-col py-8 items-center">
      <div className="max-w-7xl">
        <h1 className="text-2xl mb-8">クイズ</h1>
        <div className="mb-4">
          <StudyModeSwitch />
        </div>
        <QuizTypeButtons />
      </div>
    </main>
  );
}
