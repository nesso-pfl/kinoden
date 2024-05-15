"use client";

import React, { useCallback, useState } from "react";
import { replyRoleRequest, useRoleRequests } from "@/features/auth";
import { Dialog } from "@/components/ui/custom-dialog";
import { Button } from "@/components/ui/button";
import { CheckIcon, XIcon } from "lucide-react";
import { HelpTooltip } from "@/components/ui/help-tooltip";

export const RoleRequests: React.FC = () => {
  const { data, mutate } = useRoleRequests();
  const [open, setOpen] = useState(false);
  const handleClick = useCallback(
    (user_id: string, status: "accepted" | "rejected") => async () => {
      await replyRoleRequest({ user_id, status });
      await mutate();
    },
    [mutate],
  );

  return (
    <div className="flex flex-col gap-2">
      <Button onClick={() => setOpen(true)}>権限リクエスト一覧</Button>
      <Dialog open={open} onClose={() => setOpen(false)} title="権限リクエスト一覧">
        <div className="flex flex-col gap-2">
          {data && data.length > 0 ? (
            data
              ?.filter((roleRequest) => roleRequest.status === "pending")
              .map((roleRequest) => (
                <div key={roleRequest.id} className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <div>{roleRequest.username}</div>
                    <HelpTooltip>
                      <span className="flex flex-col gap-2">
                        <span className="whitespace-pre">{roleRequest.user_id}</span>
                        <span className="whitespace-pre">{roleRequest.comment}</span>
                      </span>
                    </HelpTooltip>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" aria-label="承認" onClick={handleClick(roleRequest.user_id, "accepted")}>
                      <CheckIcon />
                    </Button>
                    <Button size="icon" aria-label="却下" onClick={handleClick(roleRequest.user_id, "rejected")}>
                      <XIcon />
                    </Button>
                  </div>
                </div>
              ))
          ) : (
            <div>権限リクエストはありません</div>
          )}
        </div>
      </Dialog>
    </div>
  );
};
