import React from "react";
import { ParkingSummary } from "./parking-summary";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "超域駐騎場 | Kinoden Pfl",
};

export default function Page() {
  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl mb-8">超域駐騎場</h1>
      <ParkingSummary />
    </div>
  );
}
