"use client";

import { useDroppable, useDraggable } from "@dnd-kit/core";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X } from "@phosphor-icons/react";
import type { Base, Charm } from "@/lib/charms";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/* Real gold chain loop (transparent PNG). Charms hang from points along its
   bottom arc. Geometry below is calibrated to the generated image: the chain
   centerline traces an ellipse centered in the frame. */
const CHAIN_SRC = `${BASE_PATH}/charms/chain-loop.png`;
const CHAIN_RATIO = 1400 / 938; // generated image aspect
const STAGE_W = "min(760px, 92vw)"; // stage width; charm sizes derive from it
const CX = 0.5;
const CY = 0.5;
const RX = 0.37; // ellipse radii as fraction of stage
const RY = 0.295;

/* Where charm i attaches on the chain's bottom arc + how wide it should be. */
function charmLayout(i: number, n: number) {
  const span = n >= 7 ? 0.97 : n >= 5 ? 0.88 : 0.74; // wider spread for more charms
  const t = n === 1 ? 0.5 : i / (n - 1);
  const nx = (t - 0.5) * 2 * span; // -span..span, normalized to RX
  const x = CX + nx * RX;
  const y = CY + RY * Math.sqrt(Math.max(0, 1 - nx * nx)); // sit on bottom arc
  const sizeFrac = n >= 7 ? 0.155 : n >= 5 ? 0.185 : 0.215;
  const size = `calc(${STAGE_W} * ${sizeFrac})`;
  return { x, y, size };
}

/* The charm itself, hanging from a pivot at its top (the bail).
   - Appears with an underdamped spring on rotate => pendulum swing that settles.
   - Then breathes with a slow infinite sway, like real jewelry on a chain. */
function HangingCharm({ charm, size }: { charm: Charm; size: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      style={{ transformOrigin: "50% 0%" }}
      initial={reduce ? false : { rotate: -24 }}
      animate={{ rotate: 0 }}
      transition={{ type: "spring", stiffness: 85, damping: 5, mass: 0.8 }}
    >
      <motion.div
        style={{ transformOrigin: "50% 0%" }}
        animate={reduce ? undefined : { rotate: [0, 1.3, 0, -1.3, 0] }}
        transition={
          reduce ? undefined : { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }
        }
        className="flex flex-col items-center"
      >
        {/* short connector from the chain down to the charm bail */}
        <div className="w-px h-3 bg-[#c8a24a]" />
        {charm.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`${BASE_PATH}${charm.image}`}
            alt={charm.name}
            draggable={false}
            style={{ width: size, height: size }}
            className="object-contain pointer-events-none drop-shadow-[0_6px_8px_rgba(8,24,16,0.5)]"
          />
        ) : (
          <div
            style={{ width: size, height: size }}
            className="rounded-full bg-gradient-to-b from-[#235c2e] to-[#0F2A1F] border-2 border-[#c8a24a]/60 flex items-center justify-center text-[#F3E8DC] shadow-[0_6px_8px_rgba(8,24,16,0.5)]"
          >
            <span style={{ fontSize: `calc(${size} * 0.42)` }} className="leading-none">
              {charm.emoji}
            </span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* One hang point: droppable target, draggable when filled. Absolutely placed at
   its attach point on the chain; the charm hangs straight down from there. */
function HangSlot({
  index,
  charm,
  onRemove,
  isOver,
  n,
}: {
  index: number;
  charm: Charm | null;
  onRemove: () => void;
  isOver: boolean;
  n: number;
}) {
  const { x, y, size } = charmLayout(index, n);
  const { attributes, listeners, setNodeRef: setDragRef, transform, isDragging } = useDraggable({
    id: `slot-${index}`,
    disabled: !charm,
    data: { fromSlot: index },
  });
  const { setNodeRef: setDropRef, isOver: dropOver } = useDroppable({ id: `slot-${index}` });
  const highlight = isOver || dropOver;

  const setRef = (el: HTMLDivElement | null) => {
    setDragRef(el);
    setDropRef(el);
  };

  const dragStyle = transform
    ? { transform: `translate(-50%, 0) translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : { transform: "translate(-50%, 0)" };

  return (
    <div
      ref={setRef}
      {...(charm ? listeners : {})}
      {...(charm ? attributes : {})}
      style={{ left: `${x * 100}%`, top: `${y * 100}%`, width: size, ...dragStyle }}
      className={`
        absolute flex flex-col items-center group
        ${charm ? "md:cursor-grab md:active:cursor-grabbing" : ""}
        ${isDragging ? "opacity-30 z-30" : "z-20"}
        touch-none select-none
      `}
    >
      {/* small clasp ring that hooks onto the chain */}
      <motion.div
        animate={highlight ? { scale: 1.5 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={`w-2.5 h-2.5 rounded-full border-2 -mb-px z-10 ${
          highlight ? "border-[#F3E8DC] bg-[#F3E8DC]/20" : "border-[#c8a24a] bg-[#0F2A1F]/40"
        }`}
      />

      <AnimatePresence mode="popLayout">
        {charm ? (
          <motion.div key={charm.id} exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.15 } }}>
            <HangingCharm charm={charm} size={size} />
          </motion.div>
        ) : (
          <motion.div key="empty" initial={false} className="flex flex-col items-center">
            <div className="w-px h-3 bg-[#F3E8DC]/25" />
            <div
              style={{ width: size, height: size }}
              className={`rounded-full border border-dashed flex items-center justify-center transition-colors ${
                highlight ? "border-[#F3E8DC] bg-[#F3E8DC]/10" : "border-[#F3E8DC]/30"
              }`}
            >
              <span className="text-[#F3E8DC]/40 text-lg leading-none">+</span>
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
            className="absolute top-4 right-0 w-6 h-6 rounded-full bg-[#882121] text-[#F3E8DC] flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-30"
            aria-label={`Remove ${charm.name}`}
          >
            <X size={11} weight="bold" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
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

  return (
    <div className="relative overflow-hidden shrink-0 md:flex-1 flex flex-col items-center justify-center px-4 md:px-6 py-8">
      {/* Brand satin "photography stage" backdrop */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${BASE_PATH}/images/satin-green.jpg`}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />
      <div className="absolute inset-0 bg-[#0F2A1F]/30 pointer-events-none" />

      <p className="relative z-10 text-[10px] uppercase tracking-[0.2em] text-[#F3E8DC]/55 mb-6 md:mb-8">
        {base.name}
      </p>

      {/* The chain stage: real gold loop + charms hanging from its bottom arc */}
      <div
        className="relative z-10 mb-10"
        style={{ width: STAGE_W, aspectRatio: String(CHAIN_RATIO) }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CHAIN_SRC}
          alt={base.name}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_10px_24px_rgba(8,24,16,0.55)]"
        />
        {slots.map((charm, i) => (
          <HangSlot
            key={i}
            index={i}
            charm={charm}
            onRemove={() => onRemove(i)}
            isOver={overSlotId === `slot-${i}`}
            n={N}
          />
        ))}
      </div>

      {/* Slot counter */}
      <p className="relative z-10 text-[10px] tracking-[0.15em] text-[#F3E8DC]/40">
        <motion.span
          key={filled}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-[#F3E8DC]/85 font-medium"
        >
          {filled}
        </motion.span>
        {" "}of {N} charms
      </p>

      {empty && (
        <p className="relative z-10 mt-3 text-xs text-[#F3E8DC]/45 tracking-wide text-center px-6">
          <span className="md:hidden">Tap a charm below to hang it on the chain</span>
          <span className="hidden md:inline">Drag charms from the left panel onto the chain</span>
        </p>
      )}
    </div>
  );
}
