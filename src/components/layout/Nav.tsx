"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const links = [
  { href: "/shop",      label: "Shop" },
  { href: "/customize", label: "Design Yours" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-16 flex items-center px-6 md:px-10 bg-[#F3E8DC]/90 backdrop-blur-md border-b border-[#123718]/10">
      <div className="max-w-[1400px] mx-auto w-full flex items-center justify-between">
        {/* Wordmark */}
        <Link
          href="/"
          className="font-display text-[#123718] tracking-widest uppercase text-sm font-medium leading-none"
        >
          Charming Sacramento
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.slice(0, 1).map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-xs tracking-[0.15em] uppercase transition-opacity duration-200 ${
                pathname === href ? "opacity-100" : "opacity-50 hover:opacity-100"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/customize"
            className="text-xs tracking-[0.15em] uppercase px-5 py-2 bg-[#123718] text-[#F3E8DC] hover:bg-[#0F2A1F] transition-colors duration-200 active:scale-[0.98]"
          >
            Design Yours
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#123718]"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} weight="light" /> : <List size={22} weight="light" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 inset-x-0 bg-[#F3E8DC] border-b border-[#123718]/10 py-6 px-6 flex flex-col gap-5 md:hidden"
          >
            <Link
              href="/shop"
              onClick={() => setOpen(false)}
              className="text-xs tracking-[0.15em] uppercase opacity-60 hover:opacity-100 transition-opacity"
            >
              Shop
            </Link>
            <Link
              href="/customize"
              onClick={() => setOpen(false)}
              className="text-xs tracking-[0.15em] uppercase px-5 py-3 bg-[#123718] text-[#F3E8DC] text-center"
            >
              Design Yours
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
