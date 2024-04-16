"use client";

import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { signInWithDiscord } from "@/features/auth";
import Image from "next/image";

export const DiscordButton = () => {
  const handleClick = useCallback(async () => {
    await signInWithDiscord();
  }, []);

  return (
    <Button className="bg-[#5865F2] hover:bg-[#5865F2] hover:opacity-80 relative w-1/2 max-w-xs" onClick={handleClick}>
      <Image className="p-2 object-contain" src="/authProvider/discord-logo-white.svg" alt="Discord" fill />
    </Button>
  );
};
