import React, { Suspense } from "react";
import { Query as Query_ } from "./query";
import { QuizContainer } from "./quiz-container";

export type Query = Query_;

export default function Page() {
  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl mb-8">クイズ</h1>
      <Suspense>
        <QuizContainer />
      </Suspense>
    </div>
  );
}
