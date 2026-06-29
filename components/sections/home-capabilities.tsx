"use client";

import { useLocale, useTranslations } from "next-intl";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

/* "Inter Display" (the Figma spec) is just Inter at its display optical size.
   This project loads Inter via next/font (--font-inter); with optical-sizing
   auto, Inter renders its display cut at large sizes — matching the spec.
   Put the loaded Inter first so the result is deterministic on every machine
   (a phantom "Inter Display" first would silently fall back to system sans). */
const DISPLAY_FONT = 'var(--font-inter), "Inter Display", Inter, sans-serif';

/* The four capability cards share a 391px design height, so a fractional-column
   grid (matching their widths) lines their heights up exactly.
   Row 1: 450 | 614, row 2: 614 | 450.

   EN cards are self-contained SVGs with the title + body baked into the bottom
   of the card. The JA exports (`*-ja.svg`) are illustration-only (the same card
   minus that text band), so for JA we render the illustration and lay the
   localized title/body below it as live HTML (Home `cap*Title`/`cap*Body`). */
const ROWS = [
  [
    { src: "/riskradar.svg", jaSrc: "/riskradar-ja.svg", key: "cap1", alt: "Risk radar — NEURON detects risks across conversations, meetings, and tasks before they escalate." },
    { src: "/decisionmemory.svg", jaSrc: "/decisionmemory-ja.svg", key: "cap2", alt: "Decision memory — every decision is captured automatically with its reasoning and outcome connected." },
  ],
  [
    { src: "/context.svg", jaSrc: "/context-ja.svg", key: "cap3", alt: "Context on every task — background, past decisions, dependencies, and the right person to ask are already there." },
    { src: "/ask.svg", jaSrc: "/ask-ja.svg", key: "cap4", alt: "Ask anything — get answers backed by real organizational context." },
  ],
] as const;

const ROW_COLS = [
  "lg:grid-cols-[450fr_614fr]",
  "lg:grid-cols-[614fr_450fr]",
];

export default function HomeCapabilities() {
  const t = useTranslations("Home");
  const isJa = useLocale() === "ja";

  return (
    <section className="section-padding">
      <div className="section-container">
        {/* Header */}
        <SectionReveal>
          <MotionDiv variants={fadeInUp} className="mx-auto mb-14 text-center lg:mb-20">
            <span className="mb-6 inline-flex h-8 items-center rounded-full border border-[#E9EAEB] bg-white px-4 text-sm font-medium text-[#0A0D12]">
              {t("capBadge")}
            </span>
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
                <div className={`grid grid-cols-1 items-stretch gap-6 ${ROW_COLS[i]}`}>
                  {row.map((card) =>
                    isJa ? (
                      <div
                        key={card.src}
                        className="flex h-full flex-col overflow-hidden rounded-lg border border-[#E9EAEB] bg-white"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={card.jaSrc}
                          alt={t(`${card.key}Title` as "cap1Title")}
                          className="block h-auto w-full"
                        />
                        <div className="flex flex-1 flex-col px-7 pb-8 pt-5">
                          <h3 className="text-2xl font-semibold text-[#0A0D12]">
                            {t(`${card.key}Title` as "cap1Title")}
                          </h3>
                          <p className="mt-3 text-[15px] leading-relaxed text-[#535862]">
                            {t(`${card.key}Body` as "cap1Body")}
                          </p>
                        </div>
                      </div>
                    ) : (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        key={card.src}
                        src={card.src}
                        alt={card.alt}
                        className="block h-auto w-full"
                      />
                    )
                  )}
                </div>
              </MotionDiv>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
