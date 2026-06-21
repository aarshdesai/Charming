"use client";

import { useDroppable, useDraggable } from "@dnd-kit/core";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X } from "@phosphor-icons/react";
import type { Base, Charm } from "@/lib/charms";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/* The charm itself, hanging from a pivot at its top (the bail).
   - Appears with an underdamped spring on rotate => pendulum swing that settles.
   - Then breathes with a slow infinite sway, like real jewelry on a chain. */
function HangingCharm({ charm, size }: { charm: Charm; size: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      style={{ transformOrigin: "50% 0%" }}
      initial={reduce ? false : { rotate: -26 }}
      animate={{ rotate: 0 }}
      transition={{ type: "spring", stiffness: 90, damping: 5, mass: 0.7 }}
    >
      <motion.div
        style={{ transformOrigin: "50% 0%" }}
        animate={reduce ? undefined : { rotate: [0, 1.4, 0, -1.4, 0] }}
        transition={
          reduce ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }
        }
        className="flex flex-col items-center"
      >
        {/* short connector from the chain link down to the charm */}
        <div className="w-px h-2.5 bg-[#c8a24a]" />
        {charm.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`${BASE_PATH}${charm.image}`}
            alt={charm.name}
            draggable={false}
            style={{ width: size, height: size }}
            className="object-contain pointer-events-none drop-shadow-[0_4px_6px_rgba(15,42,31,0.35)]"
          />
        ) : (
          <div
            style={{ width: size, height: size }}
            className="rounded-full bg-gradient-to-b from-[#1c4a25] to-[#0F2A1F] border border-[#c8a24a]/40 flex items-center justify-center text-[#F3E8DC] shadow-md"
          >
            <span style={{ fontSize: size * 0.42 }} className="leading-none">
              {charm.emoji}
            </span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* One hang point on the chain: a droppable target + draggable when filled. */
function HangSlot({
  index,
  charm,
  onRemove,
  isOver,
  size,
}: {
  index: number;
  charm: Charm | null;
  onRemove: () => void;
  isOver: boolean;
  size: number;
}) {
  const { attributes, listeners, setNodeRef: setDragRef, transform, isDragging } = useDraggable({
    id: `slot-${index}`,
    disabled: !charm,
    data: { fromSlot: index },
  });
  const { setNodeRef: setDropRef, isOver: dropOver } = useDroppable({ id: `slot-${index}` });
  const highlight = isOver || dropOver;

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
        relative flex flex-col items-center group shrink-0
        ${charm ? "md:cursor-grab md:active:cursor-grabbing" : ""}
        ${isDragging ? "opacity-30" : ""}
        touch-none select-none
      `}
    >
      {/* Chain link / bail the charm hangs from */}
      <motion.div
        animate={highlight ? { scale: 1.4 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={`w-2.5 h-2.5 rounded-full border-2 z-10 ${
          highlight ? "border-[#882121] bg-[#882121]/15" : "border-[#c8a24a] bg-[#F3E8DC]"
        }`}
      />

      <AnimatePresence mode="popLayout">
        {charm ? (
          <motion.div
            key={charm.id}
            exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.15 } }}
          >
            <HangingCharm charm={charm} size={size} />
          </motion.div>
        ) : (
          // Empty hang point: faint dashed pendant placeholder
          <motion.div
            key="empty"
            initial={false}
            className="flex flex-col items-center"
          >
            <div className="w-px h-2.5 bg-[#123718]/15" />
            <div
              style={{ width: size, height: size }}
              className={`rounded-full border border-dashed flex items-center justify-center transition-colors ${
                highlight ? "border-[#882121] bg-[#882121]/5" : "border-[#123718]/20"
              }`}
            >
              <span className="text-[#123718]/20 text-lg leading-none">+</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Remove — visible on touch, hover-revealed on desktop */}
      <AnimatePresence>
        {charm && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
            className="absolute top-3 -right-1 w-6 h-6 md:w-5 md:h-5 rounded-full bg-[#882121] text-[#F3E8DC] flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-20"
            aria-label={`Remove ${charm.name}`}
          >
            <X size={11} weight="bold" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Draped chain drawn through the hang points. Height is fixed in px and the
   viewBox y-axis matches 1:1 (preserveAspectRatio none only stretches x), so
   the SVG curve lines up with the DOM links that sit on it. */
function Chain({ count, ringY, sag }: { count: number; ringY: number; sag: number }) {
  const pts = Array.from({ length: count }, (_, i) => {
    const x = ((i + 0.5) / count) * 100;
    const y = ringY + sag * Math.sin((Math.PI * (i + 0.5)) / count);
    return { x, y };
  });
  const d =
    `M 0 ${ringY} ` +
    pts.map((p) => `L ${p.x} ${p.y}`).join(" ") +
    ` L 100 ${ringY}`;
  const h = ringY + sag + 4;

  return (
    <svg
      viewBox={`0 0 100 ${h}`}
      preserveAspectRatio="none"
      style={{ height: h }}
      className="absolute inset-x-0 top-0 w-full pointer-events-none"
    >
      <path d={d} fill="none" stroke="#c8a24a" strokeWidth="2" strokeOpacity="0.7" />
      <path d={d} fill="none" stroke="#fff" strokeWidth="0.5" strokeOpacity="0.5" />
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
  const filled = slots.filter(Boolean).length;
  const empty = filled === 0;

  const N = base.maxCharms;
  const ringY = 10;
  const sag = N <= 4 ? 16 : 24; // necklaces with more charms drape deeper
  const size = N >= 6 ? 50 : N >= 5 ? 58 : 66;

  return (
    <div className="shrink-0 md:flex-1 flex flex-col items-center justify-center px-4 md:px-6 py-8">
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#123718]/30 mb-10 md:mb-14">
        {base.name}
      </p>

      <div className="relative w-full max-w-3xl">
        <Chain count={N} ringY={ringY} sag={sag} />
        <div
          className="relative flex justify-around items-start px-1"
          style={{ paddingTop: ringY }}
        >
          {slots.map((charm, i) => (
            <div
              key={i}
              style={{ marginTop: sag * Math.sin((Math.PI * (i + 0.5)) / N) }}
            >
              <HangSlot
                index={i}
                charm={charm}
                onRemove={() => onRemove(i)}
                isOver={overSlotId === `slot-${i}`}
                size={size}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Slot counter */}
      <p className="mt-10 text-[10px] tracking-[0.15em] text-[#123718]/30">
        <motion.span
          key={filled}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-[#123718]/60 font-medium"
        >
          {filled}
        </motion.span>
        {" "}of {N} charms
      </p>

      {empty && (
        <p className="mt-4 text-xs text-[#123718]/30 tracking-wide text-center px-6">
          <span className="md:hidden">Tap a charm below to hang it on the chain</span>
          <span className="hidden md:inline">Drag charms from the left panel onto the chain above</span>
        </p>
      )}
    </div>
  );
}
