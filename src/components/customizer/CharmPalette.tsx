"use client";

import { useDraggable } from "@dnd-kit/core";
import { CHARMS, CATEGORY_LABELS, type Charm, type CharmCategory } from "@/lib/charms";

function DraggableCharm({ charm, isActive }: { charm: Charm; isActive: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `palette-${charm.id}`,
    data: { charm },
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        group flex flex-col items-center gap-1.5 p-3 cursor-grab active:cursor-grabbing
        border border-[#123718]/10 hover:border-[#123718]/30 transition-all duration-150
        select-none touch-none
        ${isDragging ? "opacity-30" : "opacity-100"}
        ${isActive && !isDragging ? "ring-1 ring-[#882121]" : ""}
      `}
    >
      <span className="text-2xl leading-none">{charm.emoji}</span>
      <span className="text-[9px] uppercase tracking-[0.15em] text-[#123718]/50 group-hover:text-[#123718] transition-colors text-center leading-none">
        {charm.name}
      </span>
      <span className="text-[9px] text-[#882121]/70">${charm.price}</span>
    </div>
  );
}

const CATEGORY_ORDER: CharmCategory[] = ["symbols", "nature", "initials", "gems"];

export function CharmPalette({ activeId }: { activeId: string | null }) {
  const byCategory = CATEGORY_ORDER.map((cat) => ({
    cat,
    charms: CHARMS.filter((c) => c.category === cat),
  }));

  return (
    <aside className="hidden md:flex flex-col border-r border-[#123718]/10 overflow-y-auto">
      <div className="px-5 py-5 border-b border-[#123718]/10">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#123718]/40">Charms</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {byCategory.map(({ cat, charms }) => (
          <div key={cat}>
            <p className="text-[9px] uppercase tracking-[0.2em] text-[#123718]/30 mb-3 px-1">
              {CATEGORY_LABELS[cat]}
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {charms.map((charm) => (
                <DraggableCharm
                  key={charm.id}
                  charm={charm}
                  isActive={activeId === `palette-${charm.id}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
