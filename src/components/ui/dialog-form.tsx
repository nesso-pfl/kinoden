import React from "react";

type ContainerProps = {
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="flex flex-col gap-6 my-4">{children}</div>;
};

type FieldProps = {
  label: React.ReactNode;
  children: React.ReactNode;
};
const Field: React.FC<FieldProps> = ({ label, children }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="text-sm">{label}</div>
      <div className="flex items-end gap-2">{children}</div>
    </div>
  );
};

export const DialogForm = {
  Container,
  Field,
};
