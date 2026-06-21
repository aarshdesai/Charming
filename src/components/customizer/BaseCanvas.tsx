"use client";

import { useDroppable, useDraggable } from "@dnd-kit/core";
import { X } from "@phosphor-icons/react";
import type { Base, Charm } from "@/lib/charms";

/* A slot: droppable target + draggable when filled (desktop reorder). */
function Slot({
  index,
  charm,
  onRemove,
  isOver,
}: {
  index: number;
  charm: Charm | null;
  onRemove: () => void;
  isOver: boolean;
}) {
  const { attributes, listeners, setNodeRef: setDragRef, transform, isDragging } = useDraggable({
    id: `slot-${index}`,
    disabled: !charm,
    data: { fromSlot: index },
  });
  const { setNodeRef: setDropRef } = useDroppable({ id: `slot-${index}` });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  const setRef = (el: HTMLDivElement | null) => {
    setDragRef(el);
    setDropRef(el);
  };

  return (
    <div
      ref={setRef}
      style={style}
      {...(charm ? listeners : {})}
      {...(charm ? attributes : {})}
      className={`
        relative flex flex-col items-center gap-2 group shrink-0
        ${charm ? "md:cursor-grab md:active:cursor-grabbing" : ""}
        ${isDragging ? "opacity-30" : ""}
        touch-none select-none
      `}
    >
      <div
        className={`
          w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center
          border-2 transition-all duration-150
          ${
            charm
              ? "bg-[#123718] border-[#123718] text-[#F3E8DC]"
              : isOver
              ? "bg-[#882121]/10 border-[#882121] border-dashed"
              : "bg-[#F3E8DC] border-[#123718]/20 border-dashed hover:border-[#123718]/50"
          }
        `}
      >
        {charm ? (
          <span className="text-2xl leading-none">{charm.emoji}</span>
        ) : (
          <span className="text-[#123718]/20 text-lg leading-none">+</span>
        )}
      </div>

      {charm && (
        <span className="text-[9px] uppercase tracking-[0.15em] text-[#123718]/50 text-center leading-none max-w-[4rem] truncate">
          {charm.name}
        </span>
      )}

      {/* Remove — always visible on touch, hover-revealed on desktop */}
      {charm && (
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="absolute -top-1.5 -right-1.5 w-6 h-6 md:w-5 md:h-5 rounded-full bg-[#882121] text-[#F3E8DC] flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
          aria-label={`Remove ${charm.name}`}
        >
          <X size={11} weight="bold" />
        </button>
      )}
    </div>
  );
}

/* Decorative chain arc — desktop only (assumes a single row). */
function ChainArc({ count }: { count: number }) {
  const W = 600;
  const H = 80;
  const spacing = W / (count + 1);
  const path = `M 20 ${H / 2} Q ${W / 2} 20 ${W - 20} ${H / 2}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="hidden md:block absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-16 pointer-events-none"
      preserveAspectRatio="none"
    >
      <path d={path} fill="none" stroke="#123718" strokeWidth="1.5" strokeOpacity="0.2" />
      {Array.from({ length: count - 1 }).map((_, i) => {
        const midX = (spacing * (i + 1) + spacing * (i + 2)) / 2;
        const t = midX / W;
        const arcY = H / 2 - Math.sin(Math.PI * t) * (H / 2 - 10);
        return <circle key={i} cx={midX} cy={arcY} r="2" fill="#123718" fillOpacity="0.15" />;
      })}
    </svg>
  );
}

export function BaseCanvas({
  base,
  slots,
  onRemove,
  overSlotId,
}: {
  base: Base;
  slots: (Charm | null)[];
  onRemove: (i: number) => void;
  overSlotId: string | null;
}) {
  const empty = slots.every((s) => s === null);

  return (
    <div className="shrink-0 md:flex-1 flex flex-col items-center justify-center px-4 md:px-6 py-8">
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#123718]/30 mb-8 md:mb-12">
        {base.name}
      </p>

      {/* Slots: wrap on mobile, single arced row on desktop */}
      <div className="relative w-full max-w-2xl">
        <ChainArc count={base.maxCharms} />
        <div className="relative z-10 grid grid-cols-4 justify-items-center gap-y-6 gap-x-2 md:flex md:flex-nowrap md:items-end md:justify-around md:gap-0 w-full md:pb-6">
          {slots.map((charm, i) => (
            <Slot
              key={i}
              index={i}
              charm={charm}
              onRemove={() => onRemove(i)}
              isOver={overSlotId === `slot-${i}`}
            />
          ))}
        </div>
      </div>

      {empty && (
        <p className="mt-10 md:mt-12 text-xs text-[#123718]/30 tracking-wide text-center px-6">
          <span className="md:hidden">Tap a charm below to add it to a slot</span>
          <span className="hidden md:inline">Drag charms from the left panel onto the slots above</span>
        </p>
      )}
    </div>
  );
}
