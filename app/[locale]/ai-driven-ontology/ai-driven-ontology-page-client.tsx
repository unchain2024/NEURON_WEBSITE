"use client";

import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import FinalCTA from "@/components/sections/final-cta";
import { SectionReveal, FadeUpReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

/* "Inter Display" (Figma spec) is Inter at its display optical size; the loaded
   Inter renders that cut at large sizes, so we put it first for determinism. */
const DISPLAY_FONT = 'var(--font-inter), "Inter Display", Inter, sans-serif';

/* ── shared bits ────────────────────────────────────── */

function Badge({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <span
      className={`inline-flex h-8 items-center rounded-full px-4 text-sm font-medium ${
        dark
          ? "border border-white/15 bg-white/5 text-white"
          : "border border-[#E9EAEB] bg-white text-[#0A0D12]"
      }`}
    >
      {children}
    </span>
  );
}

function SectionTitle({
  children,
  className = "",
  dark = false,
  style,
}: {
  children: string;
  className?: string;
  dark?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <h2
      className={className}
      style={{
        fontFamily: DISPLAY_FONT,
        fontOpticalSizing: "auto",
        fontWeight: 500,
        fontSize: "clamp(30px, 8vw, 40px)",
        lineHeight: "110%",
        letterSpacing: 0,
        whiteSpace: "pre-line",
        color: dark ? "#FFFFFF" : "#0A0D12",
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

/* ── types for raw arrays ───────────────────────────── */

type SignalRow = { object: string; captures: string; example: string };
type DetectorCard = { name: string; desc: string };
type TrustItem = { title: string; body: string };
type Metric = { value: string; label: string; note: string };

const DETECTOR_IMAGES = [
  "/architecture/detector-misalignment.png",
  "/architecture/detector-slippage.png",
  "/architecture/detector-budget.png",
  "/architecture/detector-blocker.png",
];

// Trust-layer icons, lifted verbatim from Section (4).svg.
const TRUST_ICONS = [
  "/architecture/icon-provenance.svg",
  "/architecture/icon-audit.svg",
  "/architecture/icon-flag.svg",
];

/* ── page ───────────────────────────────────────────── */

export default function AiDrivenOntologyPageClient() {
  const t = useTranslations("ArchitecturePage");
  const locale = useLocale();

  const rows = t.raw("signals.rows") as SignalRow[];
  const cards = t.raw("detectors.cards") as DetectorCard[];
  const trustItems = t.raw("trust.items") as TrustItem[];
  const metrics = t.raw("proof.metrics") as Metric[];

  // The hero diagram is the swappable, locale-specific artwork; the card text is
  // HTML so the layout is identical across locales.
  const heroDiagram =
    locale === "ja" ? "/architecture/hero-ja.svg" : "/architecture/hero-diagram-en.svg";

  const scroller = useRef<HTMLDivElement>(null);
  const scrollCards = (dir: number) =>
    scroller.current?.scrollBy({ left: dir * 360, behavior: "smooth" });

  return (
    <>
      {/* ── Hero: HTML card (i18n) + locale-swapped diagram artwork ──
          The textured backdrop is lifted verbatim from the design SVG
          (grain + ambient light) and laid full-bleed behind the content. */}
      <section className="bg-white px-2 pt-2 md:px-4 md:pt-4">
        <div
          className="overflow-hidden rounded-2xl bg-[#F6F9F6] bg-cover bg-center"
          style={{ backgroundImage: "url(/architecture/hero-bg.svg)" }}
        >
          <div className="section-container grid items-center gap-8 py-12 md:grid-cols-[minmax(0,460px)_1fr] md:items-start md:gap-8 md:py-16">
          {/* left text card */}
          <div className="z-10 rounded-3xl border border-white/70 bg-white/60 p-8 backdrop-blur-sm md:p-10">
            <Badge>{t("hero.badge")}</Badge>
            <h1
              className="mt-6 text-4xl md:text-5xl lg:text-[52px]"
              style={{
                fontFamily: DISPLAY_FONT,
                fontOpticalSizing: "auto",
                fontWeight: 500,
                lineHeight: "108%",
                letterSpacing: -0.5,
                color: "#0A0D12",
              }}
            >
              {t("hero.title")}
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#535862]">
              {t("hero.body")}
            </p>
            <Link
              href="/get-demo"
              className="mt-8 inline-flex h-12 items-center rounded-full bg-[#0A0D12] px-7 text-base font-medium text-white transition-colors hover:bg-black"
            >
              {t("hero.demoCta")}
            </Link>
          </div>

          {/* right diagram */}
          <div className="flex justify-center md:justify-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroDiagram}
              alt="Neuron connects your data sources into one ontology that powers every solution."
              className="h-auto w-full max-w-[760px]"
            />
          </div>
          </div>
        </div>
      </section>

      {/* ── The architectural shift ─────────────────── */}
      <section className="bg-white">
        <SectionReveal className="section-container flex flex-col items-center pb-10 pt-20 text-center md:pb-12 md:pt-28">
          <MotionDiv variants={fadeInUp}>
            <Badge>{t("shift.badge")}</Badge>
          </MotionDiv>
          <MotionDiv variants={fadeInUp}>
            <SectionTitle className="mt-7 max-w-2xl">{t("shift.title")}</SectionTitle>
          </MotionDiv>
          <MotionDiv
            variants={fadeInUp}
            className="mt-8 max-w-xl text-2xl leading-[1.45] text-[#717680] md:text-[28px]"
            style={{ whiteSpace: "pre-line" }}
          >
            {t("shift.body")}
          </MotionDiv>
        </SectionReveal>
      </section>

      {/* ── Signal objects (the six things) ─────────── */}
      <section className="bg-white">
        <FadeUpReveal className="section-container pb-20 pt-8 md:pb-24 md:pt-10">
          <div className="grid gap-4 md:grid-cols-2 md:items-start md:gap-6">
            <div>
              <Badge>{t("signals.badge")}</Badge>
              <SectionTitle className="mt-5" style={{ fontSize: "clamp(28px, 4vw, 34px)" }}>
                {t("signals.title")}
              </SectionTitle>
            </div>
            <p className="text-base leading-relaxed text-[#717680] md:mt-[52px] md:max-w-lg md:justify-self-end">
              {t("signals.intro")}
            </p>
          </div>

          {/* Table — exact rebuild of the design SVG (1080×460). A left card
              (Object / What it captures, gray border, shaded header, rounded on
              the left only) sits flush against a taller "Real example" card that
              protrudes 20px above & below (80px header + 20px bottom pad), with a
              green gradient border + green wash. items-center centers the shorter
              left card so the 60px rows line up across both. */}
          <div className="mt-8 hidden md:block">
            <div className="flex items-center">
              {/* Left card — Object + What it captures (633/1080) */}
              <div className="flex-1 overflow-hidden rounded-l-lg border border-r-0 border-[#E9EAEB]">
                <div className="flex h-[60px] items-center border-b border-[#E9EAEB] bg-[#FAFAFA] text-[15px] font-medium text-[#0A0D12]">
                  <span className="w-[30%] shrink-0 px-6">{t("signals.colObject")}</span>
                  <span className="px-6">{t("signals.colCaptures")}</span>
                </div>
                {rows.map((r) => (
                  <div
                    key={r.object}
                    className="flex h-[60px] items-center border-b border-[#E9EAEB] last:border-b-0"
                  >
                    <span className="w-[30%] shrink-0 px-6 text-[15px] text-[#414651]">{r.object}</span>
                    <span className="px-6 text-[15px] text-[#414651]">{r.captures}</span>
                  </div>
                ))}
              </div>
              {/* Right card — Real example (447/1080), taller so it protrudes.
                  Green gradient border (greener at top, fading down) via a p-px
                  wrapper; the SVG background keeps the green wash + corner glow. */}
              <div
                className="w-[41.4%] shrink-0 rounded-lg p-px"
                style={{
                  background:
                    "linear-gradient(180deg, #6EC49B 0%, rgba(110,196,155,0.3) 55%, rgba(110,196,155,0) 100%)",
                }}
              >
                <div
                  className="overflow-hidden rounded-[7px] pb-5"
                  style={{
                    backgroundImage: "url(/architecture/signals-real-bg.svg)",
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="flex h-20 items-center border-b border-[#E9EAEB] bg-[#FAFAFA] px-6 text-[15px] font-medium text-[#0A0D12]">
                    {t("signals.colExample")}
                  </div>
                  {rows.map((r) => (
                    <div
                      key={r.object}
                      className="flex h-[60px] items-center border-b border-[#E9EAEB] px-6 text-[14px] leading-snug text-[#414651]"
                    >
                      {r.example}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: same two-card design as desktop, horizontally scrollable */}
          <div className="mt-8 overflow-x-auto md:hidden">
            <div className="flex min-w-[680px] items-center pb-1">
              {/* Left card — Object + What it captures */}
              <div className="flex-1 overflow-hidden rounded-l-lg border border-r-0 border-[#E9EAEB]">
                <div className="flex h-[60px] items-center border-b border-[#E9EAEB] bg-[#FAFAFA] text-[15px] font-medium text-[#0A0D12]">
                  <span className="w-[38%] shrink-0 px-5">{t("signals.colObject")}</span>
                  <span className="px-5">{t("signals.colCaptures")}</span>
                </div>
                {rows.map((r) => (
                  <div
                    key={r.object}
                    className="flex h-[60px] items-center border-b border-[#E9EAEB] last:border-b-0"
                  >
                    <span className="w-[38%] shrink-0 px-5 text-[15px] text-[#414651]">{r.object}</span>
                    <span className="px-5 text-[15px] text-[#414651]">{r.captures}</span>
                  </div>
                ))}
              </div>
              {/* Right card — Real example (green gradient border + green wash) */}
              <div
                className="w-[46%] shrink-0 rounded-lg p-px"
                style={{
                  background:
                    "linear-gradient(180deg, #6EC49B 0%, rgba(110,196,155,0.3) 55%, rgba(110,196,155,0) 100%)",
                }}
              >
                <div
                  className="overflow-hidden rounded-[7px] pb-5"
                  style={{
                    backgroundImage: "url(/architecture/signals-real-bg.svg)",
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="flex h-20 items-center border-b border-[#E9EAEB] bg-[#FAFAFA] px-5 text-[15px] font-medium text-[#0A0D12]">
                    {t("signals.colExample")}
                  </div>
                  {rows.map((r) => (
                    <div
                      key={r.object}
                      className="flex h-[60px] items-center border-b border-[#E9EAEB] px-5 text-[14px] leading-snug text-[#414651]"
                    >
                      {r.example}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-start gap-2 text-[15px] text-[#535862]">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#A4A7AE]" />
            <p>{t("signals.note")}</p>
          </div>
        </FadeUpReveal>
      </section>

      {/* ── Detectors (dark) ────────────────────────── */}
      <section className="relative overflow-hidden bg-[#07090D]">
        {/* ambient light glow lifted from the SVG background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/architecture/detectors-bg.svg"
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 w-full select-none"
        />
        <FadeUpReveal className="relative section-container py-20 md:py-24">
          <div className="grid gap-6 md:grid-cols-2 md:items-start">
            <div>
              <Badge dark>{t("detectors.badge")}</Badge>
              <SectionTitle dark className="mt-5 max-w-md">
                {t("detectors.title")}
              </SectionTitle>
            </div>
            <p className="text-base leading-relaxed text-[#A4A7AE] md:mt-12 md:max-w-md md:justify-self-end">
              {t("detectors.intro")}
            </p>
          </div>

          <div
            ref={scroller}
            className="mt-12 flex snap-x gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {cards.map((c, i) => (
              <div
                key={c.name}
                className="flex w-[300px] shrink-0 snap-start flex-col overflow-hidden rounded-lg bg-white/[0.08]"
              >
                {/* The render sits in the top of the card, faded into the
                    surface by a radial alpha mask — lifted from the SVG, where
                    the white radial gradient masks the image (mask-type:alpha)
                    so the black square edges dissolve into the card. */}
                <div className="px-7 pt-7">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={DETECTOR_IMAGES[i]}
                    alt={c.name}
                    className="aspect-square w-full"
                    style={{
                      WebkitMaskImage:
                        "radial-gradient(circle at center, #000 64%, transparent 88%)",
                      maskImage:
                        "radial-gradient(circle at center, #000 64%, transparent 88%)",
                    }}
                  />
                </div>
                <div className="px-7 pb-7 pt-2">
                  <h3 className="text-lg font-semibold text-white">{c.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#8A8F98]">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => scrollCards(-1)}
              aria-label="Previous"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-white transition-transform hover:scale-105"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollCards(1)}
              aria-label="Next"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-white transition-transform hover:scale-105"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </FadeUpReveal>
      </section>

      {/* ── Trust layer ─────────────────────────────── */}
      <section className="bg-[#FAFAFA]">
        <FadeUpReveal className="section-container py-20 md:py-24">
          <Badge>{t("trust.badge")}</Badge>
          <SectionTitle className="mt-5 max-w-2xl">{t("trust.title")}</SectionTitle>

          <div className="mt-12">
            {trustItems.map((item, i) => {
              return (
                <div
                  key={item.title}
                  className="grid items-start gap-4 border-t border-[#E9EAEB] py-8 last:border-b md:grid-cols-2 md:gap-10"
                >
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={TRUST_ICONS[i]}
                      alt=""
                      aria-hidden
                      className="h-6 w-6 shrink-0"
                    />
                    <h3 className="text-2xl text-[#0A0D12]" style={{ fontFamily: DISPLAY_FONT, fontWeight: 500 }}>
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-[15px] leading-relaxed text-[#717680] md:max-w-md md:justify-self-end">
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>
        </FadeUpReveal>
      </section>

      {/* ── Proven, not promised ────────────────────── */}
      <section className="bg-[#FAFAFA]">
        <FadeUpReveal className="section-container pb-12 pt-4 md:pb-16">
          <div className="grid gap-6 md:grid-cols-2 md:items-start">
            <div>
              <Badge>{t("proof.badge")}</Badge>
              <SectionTitle className="mt-5 max-w-md">{t("proof.title")}</SectionTitle>
            </div>
            <p className="text-base leading-relaxed text-[#717680] md:mt-12 md:max-w-md md:justify-self-end">
              {t("proof.intro")}
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-10 border-t border-[#E9EAEB] pt-12 sm:flex-row sm:justify-between sm:gap-12">
            {metrics.map((m) => (
              <div key={m.label} className="text-left">
                <div
                  className="text-[80px] leading-none text-[#15A06B]"
                  style={{ fontFamily: DISPLAY_FONT, fontWeight: 700 }}
                >
                  {m.value}
                </div>
                <div className="mt-4 text-[15px] font-medium text-[#0A0D12]">{m.label}</div>
                <div className="mt-1 text-sm text-[#717680]">{m.note}</div>
              </div>
            ))}
          </div>
        </FadeUpReveal>
      </section>

      {/* ── Unified identity ────────────────────────── */}
      <section className="bg-[#FAFAFA]">
        <FadeUpReveal className="section-container pb-0 md:pb-28">
          <div className="grid gap-6 md:grid-cols-2">
            {/* text card — below the illustration on mobile, left column on desktop */}
            <div className="order-last flex flex-col rounded-3xl border border-[#E9EAEB] bg-white p-8 md:order-none md:p-10">
              <span className="self-start">
                <Badge>{t("identity.badge")}</Badge>
              </span>
              <SectionTitle className="mt-5">{t("identity.title")}</SectionTitle>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[#717680] md:mt-auto md:pt-12">
                {t("identity.body")}
              </p>
            </div>

            {/* identity-graph illustration (locale-swapped SVG) — on top on mobile, right column on desktop */}
            <div className="order-first overflow-hidden rounded-3xl md:order-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  locale === "ja"
                    ? "/architecture/Illustration-ja.svg"
                    : "/architecture/Illustration-en.svg"
                }
                alt={t("identity.title")}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </FadeUpReveal>
      </section>

      {/* ── Give your organization a second brain ───── */}
      <FinalCTA />
    </>
  );
}
