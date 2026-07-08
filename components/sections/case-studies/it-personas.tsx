"use client";

import { useTranslations } from "next-intl";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

const HEADLINE_FONT = {
  fontFamily: '"Inter Display", var(--font-inter), sans-serif',
  fontWeight: 500,
  letterSpacing: "-0.02em",
} as const;

const PERSONAS = [
  { key: "lead", img: "/case-studies/it5-lead.webp" },
  { key: "eng", img: "/case-studies/it5-eng.webp" },
  { key: "ops", img: "/case-studies/it5-ops.webp" },
] as const;

/* it_5 — "Who it's for" / personas */
export default function ITPersonas() {
  const t = useTranslations("CaseStudyIT.Personas");

  return (
    <section className="bg-white py-16 md:py-24">
      {/* Wider than the standard container so the cards fill most of the viewport */}
      <div className="mx-auto w-[92%] max-w-[1080px]">
        <SectionReveal>
          <p className="text-sm font-medium text-[#535862]">{t("eyebrow")}</p>
          <h2
            className="mt-3 max-w-2xl text-3xl leading-[1.1] text-[#0A0D12] sm:text-4xl"
            style={HEADLINE_FONT}
          >
            {t("title")}
          </h2>

          <MotionDiv
            variants={fadeInUp}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {PERSONAS.map((p) => (
              <div key={p.key}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.img}
                  alt=""
                  className="aspect-[349/400] w-full rounded-lg object-cover"
                />
                <h3 className="mt-4 text-lg font-semibold text-[#0A0D12]">
                  {t(`${p.key}Label`)}
                </h3>
                <p className="mt-1 text-sm text-[#535862]">{t(`${p.key}Roles`)}</p>
              </div>
            ))}
          </MotionDiv>
        </SectionReveal>
      </div>
    </section>
  );
}
