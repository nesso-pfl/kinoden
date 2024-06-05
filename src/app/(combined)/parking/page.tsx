import React from "react";
import { Metadata } from "next";
import { Parkings } from "./parkings";

export const metadata: Metadata = {
  title: "越域駐騎場 | Kinoden Pfl",
};

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl mb-8">越域駐騎場</h1>
      <div className="md:flex md:justify-center">
        <Parkings />
      </div>
    </div>
  );
}
