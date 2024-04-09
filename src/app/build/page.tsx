import React from "react";
import { Metadata } from "next";
import { BuildSummaries } from "./build-summaries";

export const metadata: Metadata = {
  title: "ビルド一覧 | Kinoden Pfl",
};

export default function Page() {
  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl mb-8">ビルド一覧</h1>
      <BuildSummaries />
    </div>
  );
}
