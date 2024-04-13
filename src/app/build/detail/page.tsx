import React from "react";
import { Metadata } from "next";
import { EditButton } from "./edit-button";
import { BuildDetail } from "./build-detail";
import { DeleteButton } from "./delete-button";

export type Query = {
  id: string;
};

export const metadata: Metadata = {
  title: "ビルド詳細 | Kinoden Pfl",
};

export default function Page() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl">ビルド詳細</h1>
        <EditButton />
      </div>
      <div className="mb-20">
        <BuildDetail />
      </div>
      <div className="flex justify-center">
        <div className="w-1/2">
          <DeleteButton />
        </div>
      </div>
    </div>
  );
}
