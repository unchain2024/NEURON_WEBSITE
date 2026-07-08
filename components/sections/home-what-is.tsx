"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

/* "Inter Display" (Figma spec) is Inter at its display optical size; the loaded
   Inter renders that cut at large sizes, so we put it first for determinism. */
const DISPLAY_FONT = 'var(--font-inter), "Inter Display", Inter, sans-serif';
const ONTOLOGY_HREF = "/ai-driven-ontology";

export default function HomeWhatIs() {
  const t = useTranslations("Home");
  const isJa = useLocale() === "ja";

  /* Both locales render live HTML over the dark background; only the product
     mockup is an image, swapped by locale (copy is baked into each export). */
  const mockupSrc = isJa ? "/risk-details-jp.svg" : "/risk-details-en.svg";

  return (
    <section
      id="what-is"
      className="section-padding relative overflow-hidden bg-[#0A0D12]"
    >
      {/* Soft spotlight glow over the flat dark base (matches the design shade) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 55% 0%, rgba(120,128,140,0.28) 0%, rgba(60,66,76,0.14) 32%, rgba(10,13,18,0) 65%)",
        }}
      />
      <SectionReveal>
        <div className="section-container relative z-10">
          <MotionDiv variants={fadeInUp}>
            <span className="inline-flex h-8 items-center rounded-full border border-white/15 bg-white/5 px-4 text-sm font-medium text-white">
              {t("whatIsBadge")}
            </span>
          </MotionDiv>

          <div className="mt-8 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
            <MotionDiv variants={fadeInUp}>
              <h2
                className="text-3xl leading-[1.1] text-white sm:text-4xl lg:text-5xl"
                style={{ fontFamily: DISPLAY_FONT, fontWeight: 500, letterSpacing: "-0.01em" }}
              >
                {t("whatIsHeading")}
              </h2>
            </MotionDiv>
            <MotionDiv variants={fadeInUp}>
              <p className="text-[15px] leading-relaxed text-[#A4A7AE] lg:text-base">
                {t("whatIsBody")}
              </p>
            </MotionDiv>
          </div>

          {/* Localized product mockup (green-framed, copy baked in Japanese) */}
          <MotionDiv variants={fadeInUp} className="mt-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mockupSrc}
              alt={t("whatIsImage")}
              width={1080}
              height={632}
              className="block h-auto w-full"
            />
          </MotionDiv>

          {/* "Curious how it's built?" → AI-Driven Ontology page */}
          <MotionDiv
            variants={fadeInUp}
            className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <h3
              className="text-2xl text-white sm:text-3xl"
              style={{ fontFamily: DISPLAY_FONT, fontWeight: 500, letterSpacing: "-0.01em" }}
            >
              {t("whatIsLinkText")}
            </h3>
            <Link
              href={ONTOLOGY_HREF}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#0A0D12] transition-transform hover:-translate-y-0.5"
            >
              {t("whatIsLinkCta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </MotionDiv>
        </div>
      </SectionReveal>
    </section>
  );
}
