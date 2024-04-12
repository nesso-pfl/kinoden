import React from "react";
import { Metadata } from "next";
import { BuildSummaries } from "./build-summaries";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { pagesPath } from "@/features/path/$path";
import { CreateButton } from "./create-button";
import { FilterButton } from "./filter-button";

export type OptionalQuery = {
  owner?: string;
  labels?: string[];
  sort?: "created_at_asc" | "created_at_desc";
};

export const metadata: Metadata = {
  title: "ビルド一覧 | Kinoden Pfl",
};

export default function Page() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl">ビルド一覧</h1>
        <CreateButton />
      </div>
      <BuildSummaries />
      <div className="fixed right-4 bottom-4">
        <FilterButton />
      </div>
    </div>
  );
}
