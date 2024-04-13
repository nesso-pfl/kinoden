"use client";

import React from "react";
import { BuildSummaryItem } from "./build-summary-item";
import { useBuilds } from "@/features/build";

export const BuildSummaries: React.FC = () => {
  const { data: builds } = useBuilds();

  return (
    <ul className="flex flex-col">
      {builds?.map((build) => (
        <li key={build.id} className="border-b border-gray-400 last:border-transparent py-2">
          <BuildSummaryItem build={build} />
        </li>
      ))}
    </ul>
  );
};
