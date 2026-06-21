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

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid md:grid-cols-[260px_1fr_260px] h-[calc(100dvh-4rem)]">
        <CharmPalette activeId={activeId} />

        <div className="flex flex-col overflow-hidden">
          <BaseSelector selected={selectedBase} onChange={handleBaseChange} />
          <BaseCanvas
            base={base}
            slots={visibleSlots}
            onRemove={removeCharm}
            activeId={activeId}
            overSlotId={overSlotId}
          />
        </div>

        <OrderSummary base={base} slots={visibleSlots} />
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
