"use client";

import { useLocale, useTranslations } from "next-intl";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

/* "Inter Display" (Figma spec) is Inter at its display optical size; the loaded
   Inter renders that cut at large sizes, so we put it first for determinism. */
const DISPLAY_FONT = 'var(--font-inter), "Inter Display", Inter, sans-serif';

export default function HomeProblem() {
  const t = useTranslations("Home");
  const isJa = useLocale() === "ja";

  return (
    <section className="section-padding">
      <SectionReveal>
        <div className="section-container">
          <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
            {/* ── Left: the problem statement (live HTML so it translates) ── */}
            <MotionDiv variants={fadeInUp}>
              <div className="flex h-full min-h-[440px] flex-col rounded-3xl border border-[#E9EAEB] bg-[#FAFAFA] p-8 sm:p-10">
                <span className="inline-flex w-fit items-center rounded-full border border-[#E9EAEB] bg-white px-4 py-1.5 text-sm font-medium text-[#0A0D12]">
                  {t("problemBadge")}
                </span>
                <h2
                  className="mt-7 text-[#0A0D12]"
                  style={{
                    fontFamily: DISPLAY_FONT,
                    fontOpticalSizing: "auto",
                    fontWeight: 500,
                    // Figma spec is 40px; scale down on smaller screens.
                    fontSize: "clamp(1.75rem, 5vw, 40px)",
                    lineHeight: "110%",
                    letterSpacing: 0,
                  }}
                >
                  {t("problemHeading")}
                </h2>
                <p className="mt-auto pt-10 text-[15px] leading-relaxed text-[#535862]">
                  {t("problemBody")}
                </p>
              </div>
            </MotionDiv>

            {/* ── Right: the three pain points — self-contained SVG with the copy
                baked in, so it carries a locale-specific export (pain-ja.svg). ── */}
            <MotionDiv variants={fadeInUp}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={isJa ? "/pain-ja.webp" : "/pain.webp"}
                alt="Decisions get relitigated, risk shows up late, and the why is gone"
                width={532}
                height={476}
                className="h-auto w-full rounded-3xl"
              />
            </MotionDiv>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
