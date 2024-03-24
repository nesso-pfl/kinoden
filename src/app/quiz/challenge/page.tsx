import React from "react";
import { QuizType } from "@/features/quiz";

export type Query = {
  quizType: QuizType;
};

export default function Page() {
  return (
    <main className="flex flex-col py-8 items-center">
      <div className="max-w-7xl">
        <h1 className="text-2xl mb-8">クイズ</h1>
      </div>
    </main>
  );
}
