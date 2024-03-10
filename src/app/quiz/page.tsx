import Image from "next/image";
import answerJson from "@/answer.json";
import React from "react";

const quizzes = answerJson.quizzes;

export default function Home() {
  return (
    <main className="flex flex-col py-8 items-center">
      <div className="max-w-7xl">
        <h1 className="text-2xl mb-8">クイズ一覧</h1>
        <dl className="grid grid-cols-[auto_auto]">
          {quizzes.map((quiz, index) => (
            <React.Fragment key={quiz.question}>
              <dt className={index % 2 === 0 ? "pl-1 bg-gray-100" : "pl-1"}>{quiz.question}</dt>
              <dd className={index % 2 === 0 ? "pr-1 bg-gray-100" : "pr-1"}>
                {quiz.answers[0]}
                {quiz.answers.slice(1).length === 0 ? undefined : "(" + quiz.answers.slice(1).join(", ") + ")"}
              </dd>
            </React.Fragment>
          ))}
        </dl>
      </div>
    </main>
  );
}
