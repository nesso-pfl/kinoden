import React from "react";
import { ParkingSummary } from "./parking-summary";

export default function Page() {
  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl mb-8">超域駐騎場</h1>
      <ParkingSummary />
    </div>
  );
}
