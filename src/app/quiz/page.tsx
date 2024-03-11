import Image from "next/image";
import answerJson from "@/answer.json";
import React from "react";
import { QuizTable } from "./quiz-table";

const quizzes = answerJson.quizzes;

export default function Home() {
  return (
    <main className="flex flex-col py-8 items-center">
      <div className="max-w-7xl">
        <h1 className="text-2xl mb-8">クイズ一覧</h1>
        <QuizTable quizzes={quizzes.map((quiz) => ({ ...quiz, checked: false }))} />
      </div>
    </main>
  );
}
