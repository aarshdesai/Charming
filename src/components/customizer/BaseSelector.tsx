"use client";

import { BASES, type BaseType } from "@/lib/charms";

export function BaseSelector({
  selected,
  onChange,
}: {
  selected: BaseType;
  onChange: (b: BaseType) => void;
}) {
  return (
    // Scrollable on narrow screens so tabs never clip; scrollbar hidden
    <div className="flex items-center overflow-x-auto border-b border-[#123718]/10 px-4 md:px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {BASES.map((base) => (
        <button
          key={base.id}
          onClick={() => onChange(base.id)}
          className={`
            shrink-0 py-4 px-3 md:px-5 text-[10px] uppercase tracking-[0.15em] whitespace-nowrap transition-colors duration-150
            ${
              selected === base.id
                ? "text-[#123718] border-b-2 border-[#123718] -mb-px"
                : "text-[#123718]/40 hover:text-[#123718]/70 border-b-2 border-transparent -mb-px"
            }
          `}
        >
          {base.name}
        </button>
      ))}
    </div>
  );
}
