import React from "react";
import { Metadata } from "next";
import { UpdateBuildForm } from "./update-build-form";

export const metadata: Metadata = {
  title: "ビルド編集 | Kinoden Pfl",
};

export type Query = {
  id: string;
};

export default function Page() {
  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl mb-8">ビルド編集</h1>
      <UpdateBuildForm />
    </div>
  );
}
