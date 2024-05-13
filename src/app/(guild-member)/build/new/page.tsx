import React from "react";
import { Metadata } from "next";
import { CreateBuildForm } from "./create-build-form";

export const metadata: Metadata = {
  title: "ビルド作成 | Kinoden Pfl",
};

export default function Page() {
  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl mb-8">ビルド作成</h1>
      <CreateBuildForm />
    </div>
  );
}
