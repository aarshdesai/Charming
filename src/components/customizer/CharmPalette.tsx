"use client";

import { useDraggable } from "@dnd-kit/core";
import { motion, useReducedMotion } from "motion/react";
import { CHARMS, CATEGORY_LABELS, CATEGORY_ORDER, type Charm } from "@/lib/charms";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/* Charm glyph: transparent image when available, else the emoji. */
function CharmGlyph({ charm }: { charm: Charm }) {
  if (charm.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`${BASE_PATH}${charm.image}`}
        alt={charm.name}
        draggable={false}
        className="w-7 h-7 object-contain pointer-events-none"
      />
    );
  }
  return <span className="text-2xl leading-none">{charm.emoji}</span>;
}

function byCategory() {
  return CATEGORY_ORDER.map((cat) => ({
    cat,
    charms: CHARMS.filter((c) => c.category === cat),
  }));
}

/* A charm chip — draggable (desktop) and tappable (all, mobile-first). */
function CharmChip({
  charm,
  isActive,
  disabled,
  onSelect,
}: {
  charm: Charm;
  isActive: boolean;
  disabled: boolean;
  onSelect: (c: Charm) => void;
}) {
  const reduce = useReducedMotion();
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `palette-${charm.id}`,
    data: { charm },
    disabled,
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={() => !disabled && onSelect(charm)}
      disabled={disabled}
      aria-label={`Add ${charm.name}, $${charm.price}`}
      className={`
        group flex flex-col items-center gap-1.5 p-3 shrink-0
        border border-[#123718]/10 transition-colors duration-150
        select-none touch-none
        ${disabled
          ? "opacity-30 cursor-not-allowed"
          : "cursor-pointer hover:border-[#123718]/40 md:cursor-grab md:active:cursor-grabbing"}
        ${isDragging ? "opacity-30" : ""}
        ${isActive && !isDragging ? "ring-1 ring-[#882121]" : ""}
      `}
    >
      <motion.div
        className="flex flex-col items-center gap-1.5"
        whileHover={
          !disabled && !isDragging && !reduce
            ? { rotate: [0, -7, 7, -4, 4, 0], scale: 1.12, transition: { duration: 0.45 } }
            : undefined
        }
        whileTap={!disabled && !reduce ? { scale: 0.9 } : undefined}
      >
        <CharmGlyph charm={charm} />
        <span className="text-[9px] uppercase tracking-[0.15em] text-[#123718]/50 group-hover:text-[#123718] transition-colors text-center leading-none whitespace-nowrap">
          {charm.name}
        </span>
        <span className="text-[9px] text-[#882121]/70">${charm.price}</span>
      </motion.div>
    </button>
  );
}

interface PaletteProps {
  activeId: string | null;
  onSelect: (c: Charm) => void;
  /** When the base is full, adding is disabled. */
  full: boolean;
  variant: "sidebar" | "tray";
}

export function CharmPalette({ activeId, onSelect, full, variant }: PaletteProps) {
  const groups = byCategory();

  /* Desktop sidebar: vertical, grouped grid */
  if (variant === "sidebar") {
    return (
      <aside className="hidden md:flex flex-col border-r border-[#123718]/10 overflow-y-auto">
        <div className="px-5 py-5 border-b border-[#123718]/10">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#123718]/40">Charms</p>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {groups.map(({ cat, charms }) => (
            <div key={cat}>
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#123718]/30 mb-3 px-1">
                {CATEGORY_LABELS[cat]}
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                {charms.map((charm) => (
                  <CharmChip
                    key={charm.id}
                    charm={charm}
                    isActive={activeId === `palette-${charm.id}`}
                    disabled={full}
                    onSelect={onSelect}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>
    );
  }

  /* Mobile tray: horizontal-scroll rows by category */
  return (
    <div className="md:hidden border-t border-[#123718]/10 bg-[#FFFAF4]/40">
      <div className="px-4 pt-4 pb-1 flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#123718]/40">
          {full ? "All slots full" : "Tap a charm to add"}
        </p>
      </div>
      <div className="pb-4 space-y-3">
        {groups.map(({ cat, charms }) => (
          <div key={cat}>
            <p className="text-[9px] uppercase tracking-[0.2em] text-[#123718]/30 mb-2 px-4">
              {CATEGORY_LABELS[cat]}
            </p>
            <div className="flex gap-2 overflow-x-auto px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {charms.map((charm) => (
                <CharmChip
                  key={charm.id}
                  charm={charm}
                  isActive={activeId === `palette-${charm.id}`}
                  disabled={full}
                  onSelect={onSelect}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
