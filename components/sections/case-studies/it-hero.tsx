"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MotionDiv, fadeInUp } from "@/components/motion-wrapper";

/* Hero for the Information Technology case study — rebuilt from
 * `public/case-studies/ithome.svg`. The right-side card is the exact Figma
 * export (`Type=Tech & Software, Size=Medium.svg`), rendered to a WebP. */

const HEADLINE_FONT = {
  fontFamily: '"Inter Display", var(--font-inter), sans-serif',
  fontWeight: 500,
  letterSpacing: "-0.02em",
} as const;

export default function ITHero() {
  const t = useTranslations("CaseStudyIT.Hero");

  return (
    <section className="relative overflow-hidden bg-white pt-28 md:pt-32 pb-16 md:pb-20">
      <div className="mx-auto w-[92%] max-w-[1080px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
          {/* ── Left: copy ── */}
          <MotionDiv
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
            }}
            className="w-full lg:max-w-[420px] lg:pt-2"
          >
            <MotionDiv variants={fadeInUp}>
              <span className="inline-flex items-center rounded-full border border-[#E9EAEB] bg-white px-3.5 py-1.5 text-[13px] font-medium text-[#0A0D12]">
                {t("badge")}
              </span>
            </MotionDiv>

            <MotionDiv variants={fadeInUp}>
              <h1
                className="mt-6 text-[3.25rem] leading-[1.06] text-[#0A0D12]"
                style={HEADLINE_FONT}
              >
                {t("title")}
              </h1>
            </MotionDiv>

            <MotionDiv variants={fadeInUp}>
              <p className="mt-6 text-sm leading-relaxed text-[#414651]">
                {t("description")}
              </p>
            </MotionDiv>

            <MotionDiv variants={fadeInUp} className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/get-demo"
                className="inline-flex h-11 items-center rounded-full bg-[#0A0D12] px-6 text-sm font-medium text-white ring-1 ring-white/10 transition-colors hover:bg-[#0A0D12]/90"
                style={HEADLINE_FONT}
              >
                {t("primaryCta")}
              </Link>
              <Link
                href="/cognition-layer"
                className="inline-flex h-11 items-center rounded-full border border-[#E9EAEB] bg-white px-6 text-sm font-medium text-[#0A0D12] transition-colors hover:bg-slate-50"
                style={HEADLINE_FONT}
              >
                {t("secondaryCta")}
              </Link>
            </MotionDiv>
          </MotionDiv>

          {/* ── Right: exact card illustration (Figma export) ── */}
          <MotionDiv
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="relative w-full shrink-0 lg:w-[516px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/case-studies/it-hero-card.webp"
              alt={t("cardPill")}
              width={516}
              height={476}
              className="h-auto w-full"
            />
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
