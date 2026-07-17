"use client";

import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

/* "Inter Display" (Figma spec) is Inter at its display optical size; the loaded
   Inter renders that cut at large sizes, so we put it first for determinism. */
const DISPLAY_FONT = 'var(--font-inter), "Inter Display", Inter, sans-serif';

/* Steps are built as text; each pairs with a 634×476 illustration on the right.
   Steps 2 & 3 have copy baked into the art, so they carry a `-ja` export with
   the Japanese text on the same background. Step 1's art has no localized copy,
   so JA falls back to the shared connect illustration. */
const STEPS = [
  { key: "step1", art: "/howitworks-connect.webp", jaArt: "/howitworks-connect.webp" },
  { key: "step2", art: "/howitworks-structure.webp", jaArt: "/howitworks-structure-ja.webp" },
  { key: "step3", art: "/howitworks-deliver.webp", jaArt: "/howitworks-deliver-ja.webp" },
] as const;

export default function HowItWorks() {
  const t = useTranslations("HowItWorks");
  const isJa = useLocale() === "ja";
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  // 0→1 progress within the active step's scroll slice; drives the underline
  // so it fills left→right on scroll down and collapses toward the left on
  // scroll up.
  const [lineProgress, setLineProgress] = useState(0);

  // Drive the active step from scroll position while the section is pinned.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const raw = v * STEPS.length;
    const idx = Math.min(STEPS.length - 1, Math.max(0, Math.floor(raw)));
    const local = Math.min(1, Math.max(0, raw - idx));
    setActiveStep((prev) => (prev === idx ? prev : idx));
    setLineProgress(local);
  });

  // Click a step to view it. On desktop the section is scroll-pinned, so we
  // also move the scroll position to that step's slice — otherwise the next
  // scroll event would snap the selection back. On mobile we just switch.
  const goToStep = (i: number) => {
    setActiveStep(i);
    const el = sectionRef.current;
    if (!el || !window.matchMedia("(min-width: 1024px)").matches) return;
    const elTop = el.getBoundingClientRect().top + window.scrollY;
    const scrollable = el.offsetHeight - window.innerHeight;
    const p = (i + 0.5) / STEPS.length;
    window.scrollTo({ top: elTop + p * scrollable, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="relative bg-white lg:h-[300vh]">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center">
        <div className="section-container w-full py-16 lg:py-0">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* ── Left: badge + heading + steps ── */}
            <div>
              <span className="mb-5 inline-flex h-8 items-center rounded-full border border-[#E9EAEB] bg-white px-4 text-sm font-medium text-[#0A0D12]">
                {t("badge")}
              </span>

              <h2
                className="text-slate-900"
                style={{
                  fontFamily: DISPLAY_FONT,
                  fontOpticalSizing: "auto",
                  fontWeight: 500,
                  fontSize: 40,
                  lineHeight: "110%",
                  letterSpacing: 0,
                  whiteSpace: "pre-line",
                }}
              >
                {t("heading")}
              </h2>

              <div className="mt-10 max-w-md lg:mt-14">
                {STEPS.map((step, i) => {
                  const isActive = activeStep === i;
                  return (
                    <button
                      key={step.key}
                      type="button"
                      onClick={() => goToStep(i)}
                      aria-current={isActive}
                      className="relative block w-full border-t border-slate-200 py-5 text-left"
                    >
                      {/* The step separator fills black left→right as you progress
                          through the active step (replaces the old underline). */}
                      <motion.span
                        className="absolute inset-x-0 -top-px h-0.5 origin-left bg-[#0A0D12]"
                        style={{ scaleX: isActive ? lineProgress : 0 }}
                      />
                      <div className="flex gap-4">
                        <span className="pt-0.5 text-sm font-medium tabular-nums text-[#A4A7AE]">
                          0{i + 1}
                        </span>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-[#0A0D12]">
                            {t(`${step.key}Title` as "step1Title").replace(/\.$/, "")}
                          </h3>

                          {/* CSS grid-rows trick: cheap, smooth height transition */}
                          <div
                            className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                              isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                            }`}
                          >
                            <div className="overflow-hidden">
                              <p className="pt-2 text-sm leading-relaxed text-[#414651]">
                                {t(`${step.key}Description` as "step1Description")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Right: artwork that swaps with the active step ──
                All images stay mounted and pre-decoded; we only crossfade
                opacity, so switching is instant and never re-decodes. */}
            <div className="relative aspect-[634/476] w-full">
              {STEPS.map((step, i) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={step.key}
                  src={isJa ? step.jaArt : step.art}
                  alt={t(`${step.key}Title` as "step1Title")}
                  width={634}
                  height={476}
                  className={`absolute inset-0 h-full w-full rounded-2xl object-cover transition-opacity duration-300 ease-out ${
                    activeStep === i ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
