import { XIcon } from "lucide-react";
import React from "react";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  onClose: () => unknown;
  children: React.ReactNode;
  title?: string;
};

export const Dialog: React.FC<Props> = ({ children, open, onClose, title }) => {
  return (
    open &&
    createPortal(
      <div
        className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        data-state={open ? "open" : "closed"}
        onClick={onClose}
      >
        <section
          className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-4 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg"
          data-state={open ? "open" : "closed"}
          onClick={(event) => event.stopPropagation()}
        >
          {title && (
            <h2 className="text-lg font-semibold leading-none tracking-tight text-center md:text-left">{title}</h2>
          )}
          {children}
          <button
            type="button"
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            onClick={onClose}
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </button>
        </section>
      </div>,
      document.body,
    )
  );
};
