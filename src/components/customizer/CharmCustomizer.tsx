"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CHARMS, BASES, type Charm, type BaseType } from "@/lib/charms";
import { CharmPalette } from "./CharmPalette";
import { BaseCanvas } from "./BaseCanvas";
import { BaseSelector } from "./BaseSelector";
import { OrderSummary } from "./OrderSummary";

export function CharmCustomizer() {
  const [selectedBase, setSelectedBase] = useState<BaseType>("bracelet");
  const [slots, setSlots] = useState<(Charm | null)[]>(Array(7).fill(null));
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overSlotId, setOverSlotId] = useState<string | null>(null);

  const base = BASES.find((b) => b.id === selectedBase)!;

  // Require 8px of movement before drag starts — prevents accidental drags on click
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } })
  );

  function handleBaseChange(b: BaseType) {
    const newBase = BASES.find((x) => x.id === b)!;
    setSelectedBase(b);
    setSlots((prev) => {
      const resized: (Charm | null)[] = Array(newBase.maxCharms).fill(null);
      prev.slice(0, newBase.maxCharms).forEach((c, i) => { resized[i] = c; });
      return resized;
    });
  }

  function handleDragStart({ active }: DragStartEvent) {
    setActiveId(active.id as string);
  }

  function handleDragOver({ over }: DragOverEvent) {
    setOverSlotId(over?.id?.toString().startsWith("slot-") ? (over.id as string) : null);
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveId(null);
    setOverSlotId(null);
    if (!over) return;

    const overId = over.id as string;
    if (!overId.startsWith("slot-")) return;

    const slotIndex = parseInt(overId.replace("slot-", ""), 10);
    if (slotIndex >= base.maxCharms) return;

    const aid = active.id as string;

    if (aid.startsWith("palette-")) {
      const charmId = aid.replace("palette-", "");
      const charm = CHARMS.find((c) => c.id === charmId);
      if (!charm) return;
      setSlots((prev) => {
        const next = [...prev];
        next[slotIndex] = charm;
        return next;
      });
    } else if (aid.startsWith("slot-")) {
      const fromIndex = parseInt(aid.replace("slot-", ""), 10);
      if (fromIndex === slotIndex) return;
      setSlots((prev) => {
        const next = [...prev];
        [next[fromIndex], next[slotIndex]] = [next[slotIndex], next[fromIndex]];
        return next;
      });
    }
  }

  function removeCharm(index: number) {
    setSlots((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  }

  // Mobile-first: tap a charm to drop it into the first open slot.
  function addToNextSlot(charm: Charm) {
    setSlots((prev) => {
      const next = [...prev];
      const open = next.slice(0, base.maxCharms).findIndex((s) => s === null);
      if (open === -1) return prev; // full
      next[open] = charm;
      return next;
    });
  }

  // Overlay charm shown while dragging
  const overlayCharm: Charm | null = (() => {
    if (!activeId) return null;
    if (activeId.startsWith("palette-"))
      return CHARMS.find((c) => c.id === activeId.replace("palette-", "")) ?? null;
    if (activeId.startsWith("slot-"))
      return slots[parseInt(activeId.replace("slot-", ""), 10)] ?? null;
    return null;
  })();

  const visibleSlots = slots.slice(0, base.maxCharms);
  const isFull = visibleSlots.every((s) => s !== null);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {/* Mobile: single column (canvas + tray scroll, sticky order bar). Desktop: 3-col. */}
      <div className="flex flex-col md:grid md:grid-cols-[260px_1fr_260px] h-[calc(100dvh-4rem)]">
        {/* Desktop palette sidebar */}
        <CharmPalette
          variant="sidebar"
          activeId={activeId}
          onSelect={addToNextSlot}
          full={isFull}
        />

        {/* Center: base tabs + canvas, with mobile charm tray below */}
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          <BaseSelector selected={selectedBase} onChange={handleBaseChange} />
          <div className="flex-1 min-h-0 overflow-y-auto flex flex-col">
            <BaseCanvas
              base={base}
              slots={visibleSlots}
              onRemove={removeCharm}
              overSlotId={overSlotId}
            />
            <CharmPalette
              variant="tray"
              activeId={activeId}
              onSelect={addToNextSlot}
              full={isFull}
            />
          </div>
        </div>

        {/* Desktop order sidebar */}
        <OrderSummary variant="sidebar" base={base} slots={visibleSlots} />

        {/* Mobile sticky order bar */}
        <OrderSummary variant="bar" base={base} slots={visibleSlots} />
      </div>

      <DragOverlay dropAnimation={null}>
        {overlayCharm && (
          <div className="w-14 h-14 rounded-full bg-[#0F2A1F] text-[#F3E8DC] flex items-center justify-center text-2xl shadow-xl opacity-95 pointer-events-none">
            {overlayCharm.emoji}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
