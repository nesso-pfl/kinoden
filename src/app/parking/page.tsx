import React from "react";
import { ParkingSummary } from "./parking-summary";

const parkings = [
  { id: "1", number: 1, owner: "1171", openAt: new Date() },
  { id: "2", number: 2, owner: "1172", openAt: new Date() },
  { id: "3", number: 3, owner: "1171", openAt: new Date() },
  { id: "4", number: 4, owner: "1172", openAt: new Date() },
  { id: "5", number: 5, owner: "1171", openAt: new Date() },
  { id: "6", number: 6, owner: "1172", openAt: new Date() },
  { id: "7", number: 7, owner: "1171", openAt: new Date() },
  { id: "8", number: 8, owner: "1172", openAt: new Date() },
  { id: "9", number: 9, owner: "1171", openAt: new Date() },
  { id: "10", number: 10, owner: "1172", openAt: new Date() },
  { id: "11", number: 11, owner: "1171", openAt: new Date() },
  { id: "12", number: 12, owner: "1172", openAt: new Date() },
];

export default function Page() {
  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl mb-8">超域駐騎場</h1>
      <ParkingSummary parkings={parkings} />
    </div>
  );
}
