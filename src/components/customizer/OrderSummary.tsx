"use client";

import { useState } from "react";
import { ShoppingBag } from "@phosphor-icons/react";
import type { Base, Charm } from "@/lib/charms";

export function OrderSummary({
  base,
  slots,
}: {
  base: Base;
  slots: (Charm | null)[];
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const placed = slots.filter(Boolean) as Charm[];
  const total = base.price + placed.reduce((sum, c) => sum + c.price, 0);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ baseId: base.id, charmIds: placed.map((c) => c.id) }),
      });
      const { url, error: err } = await res.json();
      if (err) throw new Error(err);
      window.location.href = url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <aside className="hidden md:flex flex-col border-l border-[#123718]/10">
      <div className="px-5 py-5 border-b border-[#123718]/10">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#123718]/40">Your order</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-3">
        {/* Base */}
        <div className="flex justify-between items-center py-2 border-b border-[#123718]/08">
          <div>
            <p className="text-xs font-medium text-[#123718]">{base.name}</p>
            <p className="text-[10px] text-[#123718]/40 mt-0.5">{base.description}</p>
          </div>
          <span className="text-xs text-[#123718] tabular-nums">${base.price}</span>
        </div>

        {/* Placed charms */}
        {placed.length === 0 ? (
          <p className="text-[11px] text-[#123718]/30 py-3">No charms added yet.</p>
        ) : (
          placed.map((charm, i) => (
            <div key={`${charm.id}-${i}`} className="flex justify-between items-center py-1.5">
              <div className="flex items-center gap-2.5">
                <span className="text-base leading-none">{charm.emoji}</span>
                <span className="text-xs text-[#123718]">{charm.name}</span>
              </div>
              <span className="text-xs text-[#123718]/60 tabular-nums">${charm.price}</span>
            </div>
          ))
        )}
      </div>

      {/* Total + CTA */}
      <div className="px-5 py-5 border-t border-[#123718]/10 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-[10px] uppercase tracking-[0.15em] text-[#123718]/50">Total</span>
          <span className="font-display text-2xl text-[#123718]">${total}</span>
        </div>

        {error && (
          <p className="text-[11px] text-[#882121]">{error}</p>
        )}

        <button
          onClick={handleCheckout}
          disabled={placed.length === 0 || loading}
          className="w-full flex items-center justify-center gap-2 py-3.5 text-xs tracking-[0.15em] uppercase bg-[#123718] text-[#F3E8DC] hover:bg-[#0F2A1F] disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150 active:scale-[0.98]"
        >
          <ShoppingBag size={14} weight="light" />
          {loading ? "Redirecting..." : "Add to Cart"}
        </button>

        <p className="text-[10px] text-[#123718]/30 text-center leading-relaxed">
          Secure checkout via Stripe. Ships in 5 to 7 days.
        </p>
      </div>
    </aside>
  );
}
