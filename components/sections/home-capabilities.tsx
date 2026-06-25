"use client";

import { useTranslations } from "next-intl";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

/* "Inter Display" (the Figma spec) is just Inter at its display optical size.
   This project loads Inter via next/font (--font-inter); with optical-sizing
   auto, Inter renders its display cut at large sizes — matching the spec.
   Put the loaded Inter first so the result is deterministic on every machine
   (a phantom "Inter Display" first would silently fall back to system sans). */
const DISPLAY_FONT = 'var(--font-inter), "Inter Display", Inter, sans-serif';

/* The four capability cards are delivered as self-contained SVGs. They share a
   391px design height, so a fractional-column grid (matching their widths) lines
   their heights up exactly. Row 1: 450 | 614, row 2: 614 | 450. */
const ROWS = [
  [
    { src: "/riskradar.svg", alt: "Risk radar — NEURON detects risks across conversations, meetings, and tasks before they escalate." },
    { src: "/decisionmemory.svg", alt: "Decision memory — every decision is captured automatically with its reasoning and outcome connected." },
  ],
  [
    { src: "/context.svg", alt: "Context on every task — background, past decisions, dependencies, and the right person to ask are already there." },
    { src: "/ask.svg", alt: "Ask anything — get answers backed by real organizational context." },
  ],
] as const;

const ROW_COLS = [
  "lg:grid-cols-[450fr_614fr]",
  "lg:grid-cols-[614fr_450fr]",
];

export default function HomeCapabilities() {
  const t = useTranslations("Home");

  return (
    <section className="section-padding">
      <div className="section-container">
        {/* Header */}
        <SectionReveal>
          <MotionDiv variants={fadeInUp} className="mx-auto mb-14 text-center lg:mb-20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/capabilities.svg"
              alt="Capabilities"
              width={95}
              height={32}
              className="mx-auto mb-6 h-8 w-auto"
            />
            <h2
              className="whitespace-nowrap text-slate-900"
              style={{
                fontFamily: DISPLAY_FONT,
                fontOpticalSizing: "auto",
                fontWeight: 500,
                fontSize: 40,
                lineHeight: "110%",
                letterSpacing: 0,
                textAlign: "center",
              }}
            >
              {t("capHeading")}
            </h2>
            <p
              className="mx-auto mt-5 max-w-4xl text-text-secondary"
              style={{
                fontFamily: DISPLAY_FONT,
                fontOpticalSizing: "auto",
                fontWeight: 400,
                fontSize: 16,
                lineHeight: "140%",
                letterSpacing: 0,
                textAlign: "center",
                whiteSpace: "pre-line",
              }}
            >
              {t("capSubheading")}
            </p>
          </MotionDiv>
        </SectionReveal>

        {/* Four cards */}
        <div className="space-y-6">
          {ROWS.map((row, i) => (
            <SectionReveal key={i}>
              <MotionDiv variants={fadeInUp}>
                <div className={`grid grid-cols-1 gap-6 ${ROW_COLS[i]}`}>
                  {row.map((card) => (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      key={card.src}
                      src={card.src}
                      alt={card.alt}
                      className="block h-auto w-full"
                    />
                  ))}
                </div>
              </MotionDiv>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
