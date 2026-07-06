"use client";

import Image from "next/image";
import { useRef } from "react";
import { useReducedMotion } from "motion/react";

/* Cursor-parallax photo: image drifts opposite the pointer for depth.
   Over-sized inset so the drift never reveals an edge. Reduced-motion → still. */
export function ParallaxImage({
  src,
  alt,
  className,
  overlay,
  depth = 18,
  priority,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  overlay?: React.ReactNode;
  depth?: number;
  priority?: boolean;
  sizes?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  function move(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (reduce || !el) return;
    const r = el.getBoundingClientRect();
    const dx = ((e.clientX - r.left) / r.width - 0.5) * depth;
    const dy = ((e.clientY - r.top) / r.height - 0.5) * depth;
    el.style.setProperty("--px", `${-dx}px`);
    el.style.setProperty("--py", `${-dy}px`);
  }
  function reset() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--px", "0px");
    el.style.setProperty("--py", "0px");
  }

  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={reset}
      className={`relative overflow-hidden ${className ?? ""}`}
    >
      <div
        className="absolute inset-[-7%]"
        style={{
          transform: "translate3d(var(--px,0px), var(--py,0px), 0)",
          transition: "transform 0.25s ease-out",
        }}
      >
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      </div>
      {overlay}
    </div>
  );
}
