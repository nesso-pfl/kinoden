import React from "react";
import { QuizContainer } from "./quiz-container";

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl mb-8">クイズ</h1>
      <div className="mb-4">
        <QuizContainer />
      </div>
    </div>
  );
}
