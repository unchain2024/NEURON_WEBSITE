"use client";

import { useTranslations } from "next-intl";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  Minus,
  Plus,
  Check,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { Sector } from "@/lib/case-studies-data";
import {
  ARCHETYPE_ASSETS,
  ARCHETYPE_HERO_CARD,
  SECTOR_ARCHETYPE,
  PERSONA_CARDS,
  PERSONA_CARD_BY_NAME,
  HERO_CARD_IMAGE,
} from "@/lib/case-study-pages";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";
import { InlineSvg } from "@/components/inline-svg";
import ontologyDesktopSvg from "@/public/case-studies/it3-clean.svg?raw";
import ontologyMobileSvg from "@/public/case-studies/it3-ontology-clean.svg?raw";

const HEADLINE_FONT = {
  fontFamily: '"Inter Display", var(--font-inter), sans-serif',
  fontWeight: 500,
  letterSpacing: "-0.02em",
} as const;

interface Persona {
  label: string;
  roles: string;
  /** optional: pin a specific persona card (key into PERSONA_CARD_BY_NAME) */
  card?: string;
}

/* ════════════════════════════════════════════════════════════
   Generic, data-driven case-study page. Mirrors the bespoke
   Information Technology design but reads everything from the
   `CaseStudyPages.<key>` i18n namespace + per-sector config.
   ════════════════════════════════════════════════════════════ */
export default function CSPage({ k, sector }: { k: string; sector: Sector }) {
  const archetype = SECTOR_ARCHETYPE[sector];
  const asset = ARCHETYPE_ASSETS[archetype];
  const heroCard = HERO_CARD_IMAGE[k] ?? ARCHETYPE_HERO_CARD[archetype];
  return (
    <>
      <CSHero k={k} photo={asset.photo} tint={asset.tint} card={heroCard} />
      <CSProblem k={k} />
      <CSOntology k={k} />
      <CSWorkflow k={k} />
      <CSPersonas k={k} />
      <CSFaq k={k} />
      <CSCta />
    </>
  );
}

/* ── Hero ── */
function CSHero({
  k,
  photo,
  tint,
  card,
}: {
  k: string;
  photo: string;
  tint: string;
  card?: string;
}) {
  const t = useTranslations(`CaseStudyPages.${k}.hero`);
  const s = useTranslations("CaseStudyPages._shared");

  return (
    <section className="relative overflow-hidden bg-white pt-28 md:pt-32 pb-16 md:pb-20">
      <div className="mx-auto w-[92%] max-w-[1080px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
          {/* Left: copy */}
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
              <h1 className="mt-6 text-[3.25rem] leading-[1.06] text-[#0A0D12]" style={HEADLINE_FONT}>
                {t("title")}
              </h1>
            </MotionDiv>
            <MotionDiv variants={fadeInUp}>
              <p className="mt-6 text-sm leading-relaxed text-[#414651]">{t("description")}</p>
            </MotionDiv>
            <MotionDiv variants={fadeInUp} className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/get-demo"
                className="inline-flex h-11 items-center rounded-full bg-[#0A0D12] px-6 text-sm font-medium text-white ring-1 ring-white/10 transition-colors hover:bg-[#0A0D12]/90"
                style={HEADLINE_FONT}
              >
                {s("primaryCta")}
              </Link>
              <Link
                href="/ai-driven-ontology"
                className="inline-flex h-11 items-center rounded-full border border-[#E9EAEB] bg-white px-6 text-sm font-medium text-[#0A0D12] transition-colors hover:bg-slate-50"
                style={HEADLINE_FONT}
              >
                {s("secondaryCta")}
              </Link>
            </MotionDiv>
          </MotionDiv>

          {/* Right: hero card (photo + tint + concept pills) */}
          <MotionDiv
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="relative w-full shrink-0 lg:w-[516px]"
          >
            {card ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={card} alt={t("cardPill")} width={516} height={476} className="h-auto w-full" />
            ) : (
            <div className="relative aspect-[516/476] w-full overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo} alt="" className="absolute inset-0 h-full w-full object-cover grayscale" />
              <div className="absolute inset-0" style={{ backgroundColor: tint, mixBlendMode: "color" }} />
              <div className="absolute inset-0 bg-white/40" />

              {/* sector pill */}
              <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-[#0A0D12] px-3.5 py-1.5 text-[13px] font-medium text-white shadow-lg">
                <Sparkles className="h-3.5 w-3.5" />
                {t("cardPill")}
              </span>

              {/* concept pills */}
              <div className="absolute inset-x-5 bottom-5 top-16 flex flex-col justify-between">
                <PillCard
                  icon={<AlertTriangle className="h-4 w-4 text-amber-500" />}
                  label={s("riskLabel")}
                  text={t("riskText")}
                  className="self-start"
                />
                <PillCard
                  icon={<CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                  label={s("decisionLabel")}
                  text={t("decisionText")}
                  className="self-end"
                />
                <PillCard
                  icon={<Check className="h-4 w-4 text-[#0A0D12]" />}
                  label={s("outcomeLabel")}
                  text={t("outcomeText")}
                  className="self-start"
                />
              </div>
            </div>
            )}
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}

function PillCard({
  icon,
  label,
  text,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  text: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-[68%] max-w-[300px] rounded-xl border border-white/60 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-md",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs font-semibold uppercase tracking-wide text-[#535862]">{label}</span>
      </div>
      <p className="mt-1 text-[13px] font-medium leading-snug text-[#0A0D12]">{text}</p>
    </div>
  );
}

/* ── Problem ── */
function CSProblem({ k }: { k: string }) {
  const t = useTranslations(`CaseStudyPages.${k}.problem`);
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto w-[92%] max-w-[1080px]">
        <SectionReveal>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
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
            <MotionDiv
              variants={fadeInUp}
              className="max-w-xl space-y-5 text-[15px] leading-relaxed text-[#535862] lg:pt-2"
            >
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
            </MotionDiv>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

/* ── Ontology (shared graphic, per-industry copy) ── */
function CSOntology({ k }: { k: string }) {
  const t = useTranslations(`CaseStudyPages.${k}.ontology`);
  const s = useTranslations("CaseStudyPages._shared");
  return (
    <section className="bg-white py-12 md:py-16">
      <SectionReveal className="relative mx-auto hidden w-[96%] max-w-[1800px] overflow-hidden rounded-2xl md:block [container-type:inline-size]">
        <InlineSvg svg={ontologyDesktopSvg} className="w-full" />
        <div className="absolute" style={{ left: "7.1%", top: "13.5%", width: "28%" }}>
          <span
            className="inline-flex items-center rounded-full border border-[#E9EAEB] bg-white font-medium text-[#0A0D12]"
            style={{ fontSize: "0.95cqw", padding: "0.5cqw 1.1cqw" }}
          >
            {s("ontologyEyebrow")}
          </span>
          <h2 className="text-[#0A0D12]" style={{ ...HEADLINE_FONT, fontSize: "2.7cqw", lineHeight: 1.13, marginTop: "1.4cqw" }}>
            {t("title")}
          </h2>
          {/* Body scales with the container; sized + spaced so even the longest
              case-study body (automotive) stays inside the baked card. */}
          <p
            className="text-[#535862]"
            style={{ fontSize: "0.92cqw", lineHeight: 1.5, marginTop: "1.5cqw", textAlign: "justify", textJustify: "inter-word" }}
          >
            {t("body")}
          </p>
        </div>
      </SectionReveal>

      {/* Mobile — compact, left-aligned (justify only reads well on the wide
          desktop card; on narrow screens it creates large word gaps). */}
      <div className="section-container md:hidden">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-white to-[#E6E6E6] p-4 sm:p-6">
          <div className="rounded-xl border border-white/70 bg-white/50 p-5 backdrop-blur-sm">
            <span className="inline-flex items-center rounded-full border border-[#E9EAEB] bg-white px-3.5 py-1.5 text-[13px] font-medium text-[#0A0D12]">
              {s("ontologyEyebrow")}
            </span>
            <h2 className="mt-4 text-2xl leading-[1.15] text-[#0A0D12] sm:text-[28px]" style={HEADLINE_FONT}>
              {t("title")}
            </h2>
            <p className="mt-4 text-left text-[15px] leading-relaxed text-[#535862]">{t("body")}</p>
          </div>
          <InlineSvg svg={ontologyMobileSvg} ariaLabel={t("title")} className="mt-6 w-full" />
        </div>
      </div>
    </section>
  );
}

/* Check-circle icon extracted verbatim from the IT workflow section
 * ("Case study - Section 4 List.svg") — a filled circle with a checkmark
 * cut-out, painted with a vertical #0A0D12 → #0A0D12/50% gradient. */
function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="17 17 22 22" fill="none" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28 17C21.9249 17 17 21.9249 17 28C17 34.0751 21.9249 39 28 39C34.0751 39 39 34.0751 39 28C39 21.9249 34.0751 17 28 17ZM33.2071 25.7071C33.5976 25.3166 33.5976 24.6834 33.2071 24.2929C32.8166 23.9024 32.1834 23.9024 31.7929 24.2929L26.5 29.5858L24.2071 27.2929C23.8166 26.9024 23.1834 26.9024 22.7929 27.2929C22.4024 27.6834 22.4024 28.3166 22.7929 28.7071L25.7929 31.7071C26.1834 32.0976 26.8166 32.0976 27.2071 31.7071L33.2071 25.7071Z"
        fill="url(#cs-check-gradient)"
      />
    </svg>
  );
}

/* ── Workflow ── */
function CSWorkflow({ k }: { k: string }) {
  const t = useTranslations(`CaseStudyPages.${k}.workflow`);
  const s = useTranslations("CaseStudyPages._shared");
  const items = (t.raw("items") as string[]) ?? [];
  return (
    <section className="bg-white py-16 md:py-24">
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient id="cs-check-gradient" x1="28" y1="17" x2="28" y2="39" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0A0D12" />
            <stop offset="1" stopColor="#0A0D12" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>
      <div className="mx-auto w-[92%] max-w-[1320px] sm:w-4/5">
        <SectionReveal>
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center rounded-full border border-[#E9EAEB] bg-white px-3.5 py-1.5 text-[13px] font-medium text-[#0A0D12]">
              {s("workflowEyebrow")}
            </span>
            <h2 className="mt-5 text-3xl leading-[1.1] text-[#0A0D12] sm:text-[2.5rem]" style={HEADLINE_FONT}>
              {t("title")}
            </h2>
          </div>
          <MotionDiv variants={fadeInUp} className="mt-12 flex flex-wrap justify-center gap-4">
            {items.map((item, i) => (
              <div
                key={i}
                className="inline-flex h-14 items-center gap-3 rounded-full border border-[#E9EAEB] bg-white pl-4 pr-7"
              >
                <CheckCircleIcon className="h-[22px] w-[22px] shrink-0" />
                <span className="text-[15px] text-[#414651]">{item}</span>
              </div>
            ))}
          </MotionDiv>
        </SectionReveal>
      </div>
    </section>
  );
}

/* ── Personas ── */
function CSPersonas({ k }: { k: string }) {
  const t = useTranslations(`CaseStudyPages.${k}.personas`);
  const s = useTranslations("CaseStudyPages._shared");
  const list = (t.raw("list") as Persona[]) ?? [];
  const lgCols = list.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto w-[92%] max-w-[1080px]">
        <SectionReveal>
          <p className="text-sm font-medium text-[#535862]">{s("personasEyebrow")}</p>
          <h2 className="mt-3 max-w-2xl text-3xl leading-[1.1] text-[#0A0D12] sm:text-4xl" style={HEADLINE_FONT}>
            {t("title")}
          </h2>
          <MotionDiv
            variants={fadeInUp}
            className={cn("mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2", lgCols)}
          >
            {list.map((p, i) => (
              <div key={i}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={(p.card && PERSONA_CARD_BY_NAME[p.card]) || PERSONA_CARDS[i % PERSONA_CARDS.length]}
                  alt=""
                  className="aspect-[349/400] w-full rounded-lg object-cover"
                />
                <h3 className="mt-4 text-lg font-semibold text-[#0A0D12]">{p.label}</h3>
                <p className="mt-1 text-sm text-[#535862]">{p.roles}</p>
              </div>
            ))}
          </MotionDiv>
        </SectionReveal>
      </div>
    </section>
  );
}

/* ── FAQ ── */
function CSFaq({ k }: { k: string }) {
  const t = useTranslations(`CaseStudyPages.${k}.faq`);
  const s = useTranslations("CaseStudyPages._shared");
  const items = (t.raw("items") as { q: string; a: string }[]) ?? [];
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto w-[92%] max-w-[1080px]">
        <SectionReveal>
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl leading-[1.1] text-[#0A0D12] sm:text-4xl" style={HEADLINE_FONT}>
              {s("faqTitle")}
            </h2>
          </div>
          <MotionDiv variants={fadeInUp} className="mx-auto mt-12 max-w-3xl">
            <AccordionPrimitive.Root type="single" collapsible>
              {items.map((item, i) => (
                <AccordionPrimitive.Item
                  key={i}
                  value={String(i)}
                  className="border-t border-[#E9EAEB] last:border-b"
                >
                  <AccordionPrimitive.Header>
                    <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-6 py-5 text-left">
                      <span className="text-base font-semibold text-[#0A0D12]">{item.q}</span>
                      <Plus className="h-5 w-5 shrink-0 text-[#535862] group-data-[state=open]:hidden" />
                      <Minus className="hidden h-5 w-5 shrink-0 text-[#535862] group-data-[state=open]:block" />
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <p className="max-w-2xl pb-5 text-[15px] leading-relaxed text-[#535862]">{item.a}</p>
                  </AccordionPrimitive.Content>
                </AccordionPrimitive.Item>
              ))}
            </AccordionPrimitive.Root>
          </MotionDiv>
        </SectionReveal>
      </div>
    </section>
  );
}

/* ── CTA (shared banner) ── */
function CSCta() {
  const s = useTranslations("CaseStudyPages._shared.cta");
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto w-[96%] max-w-[1800px]">
        <SectionReveal>
          <div className="relative hidden overflow-hidden rounded-2xl lg:block [container-type:inline-size]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/case-studies/it6-bg.jpg" alt="" className="block h-auto w-full" />
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "linear-gradient(127deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.04) 100%)" }}
            />
            <svg viewBox="0 0 1408 374" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
              <g opacity="0.6" stroke="white">
                <line x1="-7" y1="77.37" x2="1498" y2="77.37" strokeWidth="0.66" strokeDasharray="2.64 2.64" />
                <line x1="-7" y1="189.37" x2="1498" y2="189.37" strokeWidth="0.66" />
                <line x1="-7" y1="301.37" x2="1498" y2="301.37" strokeWidth="0.66" strokeDasharray="2.64 2.64" />
                <line x1="1006.06" y1="-1" x2="1006.06" y2="379" strokeWidth="0.66" strokeDasharray="2.64 2.64" />
                <line x1="1117.93" y1="-1" x2="1117.93" y2="379" strokeWidth="0.66" />
                <line x1="1229.8" y1="-1" x2="1229.8" y2="379" strokeWidth="0.66" strokeDasharray="2.64 2.64" />
              </g>
              <g>
                <circle cx="1117.93" cy="189.37" r="111.705" stroke="white" strokeOpacity="0.7" strokeWidth="0.66" fill="none" />
                <circle cx="1118.1" cy="189.54" r="158.235" stroke="white" strokeOpacity="0.7" strokeWidth="0.66" fill="none" />
                <circle cx="1118.26" cy="189.95" r="78.38" fill="white" fillOpacity="0.1" />
                <circle cx="1118.26" cy="189.95" r="77.88" stroke="white" strokeOpacity="0.5" strokeWidth="0.66" fill="none" />
                <circle cx="1006.2" cy="77.39" r="2.5" fill="white" />
                <circle cx="1006.2" cy="301.64" r="2.5" fill="white" />
                <circle cx="1230.17" cy="77.39" r="2.5" fill="white" />
                <circle cx="1230.17" cy="301.64" r="2.5" fill="white" />
              </g>
            </svg>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/case-studies/it6-brain.png"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute mix-blend-screen"
              style={{ left: "73.94%", top: "31.90%", width: "11.26%", height: "40.71%" }}
            />
            <div className="absolute" style={{ left: "6.5%", top: "50%", transform: "translateY(-50%)", width: "46%" }}>
              <h2 className="text-[#0A0D12]" style={{ ...HEADLINE_FONT, fontSize: "2.55cqw", lineHeight: 1.12 }}>
                {s("title")}
              </h2>
              <p className="text-[#0A0D12]/85" style={{ fontSize: "1.05cqw", lineHeight: 1.55, marginTop: "1.4cqw", maxWidth: "26cqw" }}>
                {s("body")}
              </p>
              <Link
                href="/get-demo"
                className="inline-flex items-center rounded-full bg-[#0A0D12] font-medium text-white transition-colors hover:bg-[#0A0D12]/90"
                style={{ fontSize: "1.02cqw", padding: "0.95cqw 1.7cqw", marginTop: "2cqw" }}
              >
                {s("button")}
              </Link>
            </div>
          </div>

          {/* Mobile — light text section on top, green brain/rings image below
              (per wireframe). Desktop banner above is unchanged. */}
          <div className="relative overflow-hidden rounded-2xl border border-[#E9EAEB] lg:hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/case-studies/it6-bg.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-3/4"
              style={{ background: "linear-gradient(180deg, #F3F7F3 0%, rgba(243,247,243,0.82) 45%, rgba(243,247,243,0) 100%)" }}
            />
            <div className="relative">
              <div className="px-6 pt-6">
                <h2 className="text-[26px] leading-tight text-[#0A0D12]" style={HEADLINE_FONT}>
                  {s("title")}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#414651]">{s("body")}</p>
                <Link
                  href="/get-demo"
                  className="mt-6 flex w-full items-center justify-center rounded-full bg-[#0A0D12] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0A0D12]/90"
                >
                  {s("button")}
                </Link>
              </div>
              <div className="relative mt-4 h-56">
                <svg
                  viewBox="0 0 320 320"
                  preserveAspectRatio="xMidYMid slice"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  aria-hidden="true"
                >
                  <g stroke="white" opacity="0.55">
                    <line x1="160" y1="-40" x2="160" y2="360" strokeWidth="0.8" strokeDasharray="3 3" />
                    <line x1="-40" y1="160" x2="360" y2="160" strokeWidth="0.8" strokeDasharray="3 3" />
                  </g>
                  <g fill="none" stroke="white">
                    <circle cx="160" cy="160" r="58" strokeOpacity="0.5" strokeWidth="1" />
                    <circle cx="160" cy="160" r="102" strokeOpacity="0.3" strokeWidth="1" />
                    <circle cx="160" cy="160" r="146" strokeOpacity="0.18" strokeWidth="1" />
                  </g>
                  <g fill="white" fillOpacity="0.7">
                    <circle cx="160" cy="58" r="2.5" />
                    <circle cx="58" cy="160" r="2.5" />
                    <circle cx="262" cy="160" r="2.5" />
                    <circle cx="160" cy="262" r="2.5" />
                  </g>
                </svg>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/case-studies/it6-brain.png"
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 w-[30%] max-w-[130px] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
                />
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
