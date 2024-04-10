import React from "react";

type Props = {
  children: string | undefined;
};

export const ErrorMessage: React.FC<Props> = ({ children }) => {
  return children && <div className="text-sm text-red-400">{children}</div>;
};
