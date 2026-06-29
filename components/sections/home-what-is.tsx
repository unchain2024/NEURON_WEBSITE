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

  /* EN still ships the whole section as one baked artwork (Section.svg). We only
     overlay a real link on the baked "How it works" button so it routes to the
     AI-Driven Ontology page. (No standalone EN mockup export exists yet to drive
     the HTML layout used for JA below.) */
  if (!isJa) {
    return (
      <section id="what-is" className="relative overflow-hidden bg-[#0A0D12]">
        <SectionReveal>
          <MotionDiv variants={fadeInUp} className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Section.svg"
              alt="What is NEURON — the AI-driven ontology that turns decisions into a connected layer"
              width={1440}
              height={1092}
              className="block h-auto w-full"
            />
            <Link
              href={ONTOLOGY_HREF}
              aria-label={t("whatIsLinkCta")}
              className="absolute cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              style={{
                left: `${(1104.5 / 1440) * 100}%`,
                top: `${(968.5 / 1092) * 100}%`,
                width: `${(155 / 1440) * 100}%`,
                height: `${(43 / 1092) * 100}%`,
              }}
            />
          </MotionDiv>
        </SectionReveal>
      </section>
    );
  }

  /* JA: live HTML over the same dark background, with the localized mockup. */
  return (
    <section id="what-is" className="section-padding bg-[#0A0D12]">
      <SectionReveal>
        <div className="section-container">
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
              src="/risk-details-jp.svg"
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
