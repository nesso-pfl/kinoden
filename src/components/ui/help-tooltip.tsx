import { HelpCircleIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";

type HelpTooltipProps = {
  children: React.ReactNode;
};

export const HelpTooltip: React.FC<HelpTooltipProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip open={isOpen} delayDuration={0} onOpenChange={setIsOpen}>
        <TooltipTrigger
          className="w-min"
          onClick={() => setIsOpen((prevOpen) => !prevOpen)}
          onFocus={() => setTimeout(() => setIsOpen(true), 0)} // timeout needed to run this after onOpenChange to prevent bug on mobile
          onBlur={() => setIsOpen(false)}
        >
          <HelpCircleIcon />
        </TooltipTrigger>
        <TooltipContent>
          <p>{children}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
