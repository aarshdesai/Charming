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
    <div className="flex items-center gap-0 border-b border-[#123718]/10 px-6">
      {BASES.map((base) => (
        <button
          key={base.id}
          onClick={() => onChange(base.id)}
          className={`
            py-4 px-5 text-[10px] uppercase tracking-[0.18em] transition-colors duration-150
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
