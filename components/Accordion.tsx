"use client";

import { useState, ReactNode } from "react";
import { Plus, Minus } from "lucide-react";

export default function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-hair">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 py-4 text-left"
      >
        {open ? (
          <Minus size={15} strokeWidth={1.5} />
        ) : (
          <Plus size={15} strokeWidth={1.5} />
        )}
        <span className="text-sm font-medium">{title}</span>
      </button>
      <div
        className="grid transition-all duration-500 ease-apple"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          <div className="pb-5 pl-[27px] pr-2 text-sm leading-relaxed text-ink/70">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
