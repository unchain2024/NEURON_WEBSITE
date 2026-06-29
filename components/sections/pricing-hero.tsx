"use client";

import { useTranslations } from "next-intl";
import { MotionDiv, fadeInUp } from "@/components/motion-wrapper";

/* Exact match for public/Hero-pricing.svg:
   - Eyebrow: white pill, 1px #E9EAEB border, rounded-full, dark label
   - Title:   Inter 500, 64px, line-height 110%, letter-spacing -4%,
              centered, solid #09090B (no highlight, no trailing period)
   - Body:    Inter 400, 16px, centered, #414651 */
const INTER = 'var(--font-inter), Inter, sans-serif';

export default function PricingHero() {
  const t = useTranslations("PricingPage");

  return (
    <section className="relative section-padding pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      {/* Soft radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="section-container relative z-10">
        <MotionDiv
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.1 },
            },
          }}
          className="max-w-3xl mx-auto text-center"
        >
          <MotionDiv variants={fadeInUp}>
            <span
              className="inline-flex h-[31px] items-center rounded-full border border-[#E9EAEB] bg-white px-4 text-sm font-medium text-[#0A0D12]"
              style={{ fontFamily: INTER }}
            >
              {t("heroEyebrow")}
            </span>
          </MotionDiv>

          <MotionDiv variants={fadeInUp}>
            <h1
              className="mt-6 font-medium text-[40px] sm:text-[52px] lg:text-[64px] text-[#09090B]"
              style={{
                fontFamily: INTER,
                lineHeight: 1.1,
                letterSpacing: "-0.04em",
              }}
            >
              {t("heroTitle")}
            </h1>
          </MotionDiv>

          <MotionDiv variants={fadeInUp}>
            <p
              className="mt-6 text-base font-normal text-[#414651] max-w-2xl mx-auto"
              style={{
                fontFamily: INTER,
                lineHeight: 1.5,
                letterSpacing: "0",
              }}
            >
              {t("heroDescription")}
            </p>
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  );
}
