import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Order Cancelled — Charming Sacramento" };

export default function CancelPage() {
  return (
    <div className="min-h-[80dvh] flex flex-col items-center justify-center px-8 text-center">
      <span className="text-5xl mb-8 select-none text-[#123718]/20">◇</span>
      <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-[#123718] mb-4 leading-tight">
        No changes made.
      </h1>
      <p className="text-sm text-[#123718]/55 max-w-[36ch] leading-relaxed mb-10">
        Your design is still saved. Head back to finish it whenever you are ready.
      </p>
      <div className="flex items-center gap-6">
        <Link
          href="/customize"
          className="text-xs tracking-[0.18em] uppercase px-8 py-3.5 bg-[#123718] text-[#F3E8DC] hover:bg-[#0F2A1F] transition-colors duration-150 active:scale-[0.98]"
        >
          Back to customizer
        </Link>
        <Link
          href="/"
          className="text-xs tracking-[0.18em] uppercase text-[#123718]/40 hover:text-[#123718] transition-colors duration-150"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
