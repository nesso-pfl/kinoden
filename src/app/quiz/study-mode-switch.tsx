"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { HelpTooltip } from "./help-tooltip";

type Props = {
  value: boolean;
  onToggle: () => void;
};

export const StudyModeSwitch: React.FC<Props> = ({ value, onToggle }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 ">
        <span>暗記モード</span>
        <HelpTooltip>
          問題を解答することなく、画面をクリックすることで答えを表示します。
          <br />
          単語カードのように使えて便利です。
        </HelpTooltip>
      </div>
      <Switch checked={value} onCheckedChange={onToggle} />
    </div>
  );
};
