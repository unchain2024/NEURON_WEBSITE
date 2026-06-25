"use client";

import { useTranslations } from "next-intl";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

/* "Inter Display" (Figma spec) is Inter at its display optical size; the loaded
   Inter renders that cut at large sizes, so we put it first for determinism. */
const DISPLAY_FONT = 'var(--font-inter), "Inter Display", Inter, sans-serif';

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
          <MotionDiv variants={fadeInUp}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/wikis.svg"
              alt="Wikis & AI search vs NEURON — Neuron warns before problems grow, keeps decisions and outcomes connected, retains knowledge in the organization, captures automatically, personalizes by role, and answers from connected facts and real history."
              width={1080}
              height={512}
              className="mx-auto block h-auto w-full"
            />
          </MotionDiv>
        </div>
      </SectionReveal>
    </section>
  );
}
