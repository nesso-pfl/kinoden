import React from "react";
import { QuizContainer } from "./quiz-container";

export default function Page() {
  return (
    <main className="flex flex-col py-8 items-center">
      <div className="max-w-7xl">
        <h1 className="text-2xl mb-8">クイズ</h1>
        <div className="mb-4">
          <QuizContainer />
        </div>
      </div>
    </main>
  );
}
