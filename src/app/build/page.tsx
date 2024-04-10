import React from "react";
import { Metadata } from "next";
import { BuildSummaries } from "./build-summaries";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { pagesPath } from "@/features/path/$path";

export const metadata: Metadata = {
  title: "ビルド一覧 | Kinoden Pfl",
};

export default function Page() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl">ビルド一覧</h1>
        <Button asChild>
          <Link href={pagesPath.build.new.$url()}>新規作成</Link>
        </Button>
      </div>
      <BuildSummaries />
    </div>
  );
}
