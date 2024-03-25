import React from "react";
import { QuizContainer } from "./quiz-container";
import Link from "next/link";
import { pagesPath } from "@/features/path/$path";

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl mb-8">クイズ</h1>
      <div className="flex flex-col items-center w-full mb-8">
        <div className="w-full max-w-96">
          <div className="mb-8">
            <QuizContainer />
          </div>
          <Link className="underline hover:opacity-60" href={pagesPath.quiz.list.$url()}>
            クイズ一覧を見る
          </Link>
        </div>
      </div>
    </div>
  );
}
