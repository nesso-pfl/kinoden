import React from "react";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { pagesPath } from "@/features/path/$path";
import { EditButton } from "./edit-button";
import { BuildDetail } from "./build-detail";

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
      <BuildDetail />
    </div>
  );
}
