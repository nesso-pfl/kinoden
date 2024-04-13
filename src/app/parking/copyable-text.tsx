"use client";

import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CheckIcon, CopyIcon } from "lucide-react";

type Props = {
  children: string;
};

export const CopyableText: React.FC<Props> = ({ children }) => {
  const { toast: copyToast } = useToast();

  const handleClickCopy = useCallback(
    (parkingText: string) => () => {
      window.navigator.clipboard.writeText(parkingText);
      copyToast({
        description: (
          <div className="flex gap-2">
            <CheckIcon className="text-green-400" /> コピーしました
          </div>
        ),
        duration: 1000,
      });
    },
    [copyToast],
  );

  return (
    <pre className="flex justify-between gap-1 border border-gray-400 rounded-md p-2 whitespace-normal break-all">
      {children}
      <Button className="min-w-8 w-8 h-8" size="icon" variant="ghost" onClick={handleClickCopy(children)}>
        <CopyIcon />
      </Button>
    </pre>
  );
};
