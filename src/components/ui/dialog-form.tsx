import { cn } from "@/lib/utils";
import React from "react";

type ContainerProps = {
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="flex flex-col gap-6 my-4">{children}</div>;
};

type FieldProps = {
  centered?: boolean;
  children: React.ReactNode;
};
const Field: React.FC<FieldProps> = ({ children, centered = true }) => {
  return <div className={cn("flex justify-between gap-4", centered ? "items-center" : "items-start")}>{children}</div>;
};

type LabelProps = {
  children: React.ReactNode;
};
const Label: React.FC<LabelProps> = ({ children }) => {
  return <div className="text-sm whitespace-nowrap">{children}</div>;
};

export const DialogForm = {
  Container,
  Field,
  Label,
};
