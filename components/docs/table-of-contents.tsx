"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  title: string;
}

export interface TableOfContentsProps {
  items: TocItem[];
  label?: string;
  className?: string;
}

export default function TableOfContents({
  items,
  label = "On this page",
  className,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");
  // Tracks the most recent intersection ratio per section so we can pick the
  // one most in view, not just the first that crosses the threshold.
  const ratios = useRef<Map<string, number>>(new Map());

  // Strip any incoming #section hash so the URL stays clean while keeping
  // the browser's initial scroll position intact.
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }
  }, []);

  useEffect(() => {
    const elements = items
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.current.set(entry.target.id, entry.intersectionRatio);
        }
        let bestId = activeId;
        let bestRatio = -1;
        ratios.current.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });
        if (bestRatio > 0 && bestId !== activeId) {
          setActiveId(bestId);
        }
      },
      {
        // Bias toward the upper portion of the viewport so the active item
        // updates as a heading scrolls into the top of the screen.
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // activeId intentionally excluded — it's read inside the callback but
    // shouldn't rebuild the observer on every change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  }

  return (
    <nav aria-label={label} className={cn("text-sm", className)}>
      <p className="mb-4 flex items-center gap-2 text-sm font-medium text-text-muted">
        {/* menu-02 glyph (public/docs/menu-02.svg): long top, short middle,
            long bottom. Inlined so it inherits the label color. */}
        <svg
          viewBox="0 0 18 18"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.67}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-[18px] w-[18px] shrink-0"
          aria-hidden
        >
          <path d="M2.25 9H11.25M2.25 4.5H15.75M2.25 13.5H15.75" />
        </svg>
        {label}
      </p>
      <ul className="space-y-3">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className="flex items-start gap-2.5"
              >
                {/* Fixed dot gutter — filled for the active item, invisible
                    otherwise so every label stays left-aligned. */}
                <span
                  className={cn(
                    "mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-200",
                    isActive ? "bg-slate-900" : "bg-transparent",
                  )}
                />
                <span
                  className={cn(
                    "block leading-relaxed transition-colors duration-200",
                    isActive
                      ? "font-semibold text-slate-900"
                      : "text-text-muted hover:text-slate-700",
                  )}
                >
                  {item.title}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
