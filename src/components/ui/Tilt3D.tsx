"use client";

import { useRef } from "react";
import { useReducedMotion } from "motion/react";

/* Pointer-tracked 3D tilt + gold sheen sweep. Reads as 3D on a flat cutout
   without a WebGL dependency. Reduced-motion users get a static, flat element. */
export function Tilt3D({
  children,
  className,
  max = 16,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  function move(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (reduce || !el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - py) * max * 2}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * max * 2}deg`);
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
    el.style.setProperty("--ga", "1");
  }
  function reset() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--ga", "0");
  }

  return (
    <div className={className} style={{ perspective: "700px" }}>
      <div ref={ref} onPointerMove={move} onPointerLeave={reset} className="tilt3d">
        {children}
        <span aria-hidden className="tilt3d-glare" />
      </div>
    </div>
  );
}
