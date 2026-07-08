"use client";

import { useTranslations } from "next-intl";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

const HEADLINE_FONT = {
  fontFamily: '"Inter Display", var(--font-inter), sans-serif',
  fontWeight: 500,
  letterSpacing: "-0.02em",
} as const;

/* it_2 — "How decisions actually work" */
export default function ITProblem() {
  const t = useTranslations("CaseStudyIT.Problem");

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto w-[92%] max-w-[1080px]">
        <SectionReveal>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
            {/* Left: eyebrow + headline */}
            <div>
              <span className="inline-flex items-center rounded-full border border-[#E9EAEB] bg-white px-3.5 py-1.5 text-[13px] font-medium text-[#0A0D12]">
                {t("eyebrow")}
              </span>
              <h2
                className="mt-6 max-w-[560px] text-4xl leading-[1.08] text-[#0A0D12] sm:text-5xl"
                style={HEADLINE_FONT}
              >
                {t("title")}
              </h2>
            </div>

            {/* Right: body paragraphs */}
            <MotionDiv variants={fadeInUp} className="max-w-xl space-y-5 text-[15px] leading-relaxed text-[#535862] lg:pt-2">
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
            </MotionDiv>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
