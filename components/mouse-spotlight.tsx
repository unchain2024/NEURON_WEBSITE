"use client";

import { useEffect, useRef } from "react";

export default function MouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;
    let lastX = 0;
    let lastY = 0;

    function flush() {
      rafId = 0;
      if (!ref.current) return;
      ref.current.style.setProperty("--spotlight-x", `${lastX}px`);
      ref.current.style.setProperty("--spotlight-y", `${lastY}px`);
      ref.current.style.opacity = "1";
    }

    function handleMouseMove(e: globalThis.MouseEvent) {
      if (!ref.current) return;
      const rect = ref.current.parentElement?.getBoundingClientRect();
      if (!rect) return;
      lastX = e.clientX - rect.left;
      lastY = e.clientY - rect.top;
      if (!rafId) rafId = requestAnimationFrame(flush);
    }

    function handleMouseLeave() {
      if (ref.current) ref.current.style.opacity = "0";
    }

    const parent = ref.current?.parentElement;
    parent?.addEventListener("mousemove", handleMouseMove);
    parent?.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      parent?.removeEventListener("mousemove", handleMouseMove);
      parent?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(600px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(99,102,241,0.06), transparent 60%)",
      }}
      aria-hidden="true"
    />
  );
}
