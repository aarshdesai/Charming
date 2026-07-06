"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  // The customizer is a full-height app screen; a footer under it just adds stray scroll.
  if (usePathname() === "/customize") return null;
  return (
    <footer className="mt-auto border-t border-[#123718]/10 px-6 md:px-10 py-10">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <p className="font-display text-[#123718] tracking-widest uppercase text-xs font-medium mb-2">
            Charming Sacramento
          </p>
          <p className="text-xs text-[#123718]/50 leading-relaxed max-w-[28ch]">
            Custom charm jewelry, chosen by you, made for you. Sacramento, CA.
          </p>
        </div>

        <nav className="flex flex-col md:flex-row gap-4 md:gap-8 text-xs tracking-[0.15em] uppercase text-[#123718]/50">
          <Link href="/shop"      className="hover:text-[#123718] transition-colors">Shop</Link>
          <Link href="/customize" className="hover:text-[#123718] transition-colors">Customize</Link>
          <a
            href="mailto:hello@charmingsacramento.com"
            className="hover:text-[#123718] transition-colors"
          >
            Contact
          </a>
        </nav>

        <p className="text-[10px] text-[#123718]/30 tracking-widest uppercase">
          &copy; {new Date().getFullYear()} Charming Sacramento
        </p>
      </div>
    </footer>
  );
}
