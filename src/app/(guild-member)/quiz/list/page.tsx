import answerJson from "@/answer.json";
import React from "react";
import { QuizTable } from "./quiz-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "クイズ一覧 | Kinoden Pfl",
  description: "クイズが一覧できます。検索やチェックを入れて復習ができます。",
};

const quizzes = answerJson.quizzes;

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl mb-8">クイズ一覧</h1>
      <QuizTable quizzes={quizzes.map((quiz) => ({ ...quiz, checked: false }))} />
    </div>
  );
}
