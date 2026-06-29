"use client";

import { useTranslations } from "next-intl";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

/* "Inter Display" (Figma spec) is Inter at its display optical size; the loaded
   Inter renders that cut at large sizes, so we put it first for determinism. */
const DISPLAY_FONT = 'var(--font-inter), "Inter Display", Inter, sans-serif';

/* Faithful rebuild of wikis.svg as live HTML so the copy translates per-locale,
   while the design is preserved exactly: panels #0A0D12 / rx 8, left border
   white@8%, right border a #A0E6C6→white/25 gradient, a blurred green
   (#3D8F66) corner glow, and the original icons/logos cropped 1:1 from the SVG
   (public/cmp/*.png — they sit on the same dark bg, so they blend in). */
const NEURON_ROWS = [
  "/cmp/ic1.png",
  "/cmp/ic2.png",
  "/cmp/ic3.png",
  "/cmp/ic4.png",
  "/cmp/ic5.png",
  "/cmp/ic6.png",
] as const;
const ROWS = [1, 2, 3, 4, 5, 6] as const;

export default function ComparisonTable() {
  const t = useTranslations("Comparison");

  return (
    <section className="section-padding bg-[#0A0D12]">
      <SectionReveal>
        <div className="section-container">
          {/* Header: badge + headline + subline */}
          <MotionDiv variants={fadeInUp} className="mx-auto mb-12 max-w-4xl text-center lg:mb-16">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/beyond.svg"
              alt="Beyond AI Search"
              width={133}
              height={32}
              className="mx-auto mb-6 h-8 w-auto"
            />
            <h2
              className="text-white"
              style={{
                fontFamily: DISPLAY_FONT,
                fontOpticalSizing: "auto",
                fontWeight: 500,
                fontSize: 40,
                lineHeight: "110%",
                letterSpacing: 0,
                textAlign: "center",
                whiteSpace: "pre-line",
              }}
            >
              {t("heading")}
            </h2>
            <p
              className="mx-auto mt-5 text-[#A4A7AE]"
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
              {t("subheading")}
            </p>
          </MotionDiv>

          {/* Comparison panel (Wikis & AI search vs NEURON) */}
          <MotionDiv
            variants={fadeInUp}
            className="mx-auto grid max-w-[1080px] gap-4 lg:grid-cols-2"
            style={{ fontFamily: DISPLAY_FONT }}
          >
            {/* ── Left — legacy (white @8% border) ── */}
            <div className="rounded-[9px] p-px" style={{ background: "rgba(255,255,255,0.10)" }}>
              <div className="h-full rounded-[8px] bg-[#0A0D12] px-6 pb-1 pt-7 sm:px-7">
                <div className="mb-[18px] flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/cmp/book.png" alt="" aria-hidden="true" className="h-[22px] w-auto" />
                  <h3 className="text-xl font-medium text-white">{t("legacyLabel")}</h3>
                </div>
                {ROWS.map((i) => (
                  <div
                    key={i}
                    className="flex h-[68px] items-center border-t border-white/[0.08] text-[15px] leading-snug text-white/70 first:border-t-0"
                  >
                    {t(`row${i}Legacy`)}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right — NEURON (green gradient border + corner glow) ── */}
            <div
              className="rounded-[9px] p-px"
              style={{
                background:
                  "linear-gradient(180deg, rgba(160,230,198,0.5) 0%, rgba(255,255,255,0.125) 100%)",
              }}
            >
              <div className="relative h-full overflow-hidden rounded-[8px] bg-[#0A0D12] px-6 pb-1 pt-7 sm:px-7">
                {/* blurred green corner glow (#3D8F66), bottom-right */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(95% 85% at 100% 100%, rgba(61,143,102,0.85) 0%, rgba(61,143,102,0.35) 28%, rgba(61,143,102,0) 58%)",
                  }}
                />
                <div className="relative">
                  <div className="mb-[18px] flex items-center gap-2.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/cmp/mark.png" alt="" aria-hidden="true" className="h-[22px] w-auto" />
                    <h3 className="text-xl font-medium text-white">{t("neuronLabel")}</h3>
                  </div>
                  {ROWS.map((i, idx) => (
                    <div
                      key={i}
                      className="flex h-[68px] items-center gap-3.5 border-t border-white/[0.08] first:border-t-0"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={NEURON_ROWS[idx]}
                        alt=""
                        aria-hidden="true"
                        className="h-10 w-10 shrink-0"
                      />
                      <span className="text-[15px] leading-snug text-white">
                        {t(`row${i}Neuron`)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>
      </SectionReveal>
    </section>
  );
}
