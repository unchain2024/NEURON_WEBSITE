"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Database,
  Fingerprint,
  Gauge,
  Layers,
  ShieldCheck,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  MotionDiv,
  SectionReveal,
  BlurReveal,
  fadeInUp,
  blurIn,
} from "@/components/motion-wrapper";

/* ── shared section heading ─────────────────────────── */

function SectionHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-3xl mb-12">
      <MotionDiv variants={blurIn}>
        <span className="inline-block text-sm font-medium text-primary tracking-wide uppercase mb-3">
          {eyebrow}
        </span>
      </MotionDiv>
      <MotionDiv variants={blurIn}>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          {title}
        </h2>
      </MotionDiv>
      {intro && (
        <MotionDiv variants={blurIn}>
          <p className="mt-4 text-lg text-text-secondary leading-relaxed">
            {intro}
          </p>
        </MotionDiv>
      )}
    </div>
  );
}

/* ── types for raw arrays ───────────────────────────── */

type SignalObject = { name: string; captures: string; example: string };
type Sentinel = { name: string; keystone: boolean; watches: string };
type Guarantee = { title: string; body: string };
type DayOne = { title: string; body: string };

/* ── page ───────────────────────────────────────────── */

export default function CognitionLayerPageClient() {
  const t = useTranslations("CognitionLayerPage");

  const signalObjects = t.raw("signalObjects") as SignalObject[];
  const sentinels = t.raw("sentinels") as Sentinel[];
  const compoundPatterns = t.raw("compoundPatterns") as string[];
  const guarantees = t.raw("guarantees") as Guarantee[];
  const dayOne = t.raw("dayOne") as DayOne[];

  const metrics: { value: string; label: string; note: string }[] = [
    { value: t("s4Metric1Value"), label: t("s4Metric1Label"), note: t("s4Metric1Note") },
    { value: t("s4Metric2Value"), label: t("s4Metric2Label"), note: t("s4Metric2Note") },
    { value: t("s4Metric3Value"), label: t("s4Metric3Label"), note: t("s4Metric3Note") },
  ];

  const guaranteeIcons: LucideIcon[] = [Fingerprint, ShieldCheck, CheckCircle2];

  return (
    <>
      {/* ── Hero ──────────────────────────────────── */}
      <section className="relative section-padding pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] bg-primary/5 rounded-full blur-[130px]" />
        </div>
        <div className="section-container relative z-10">
          <MotionDiv
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
            }}
            className="max-w-3xl"
          >
            <MotionDiv variants={fadeInUp} className="flex">
              <div className="signal-badge">
                <div className="signal-badge-border" />
                <div className="signal-badge-inner">
                  <span className="signal-dot" />
                  <span>{t("heroEyebrow")}</span>
                </div>
              </div>
            </MotionDiv>

            <MotionDiv variants={fadeInUp} className="mt-7">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
                The <span className="gradient-text">Cognition Layer</span>
              </h1>
            </MotionDiv>

            <MotionDiv variants={fadeInUp} className="mt-5">
              <p className="text-xl md:text-2xl font-semibold text-slate-700">
                {t("heroSubhead")}
              </p>
            </MotionDiv>

            <MotionDiv variants={fadeInUp} className="mt-5">
              <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
                {t("heroBody")}
              </p>
            </MotionDiv>

            <MotionDiv variants={fadeInUp} className="mt-8">
              <Link
                href="/get-demo"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-600 text-white px-7 py-3.5 rounded-xl text-base font-semibold transition-colors shadow-lg shadow-primary/25"
              >
                {t("ctaPrimary")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </MotionDiv>
          </MotionDiv>
        </div>
      </section>

      {/* ── Section 1 — architectural shift ─────────── */}
      <section className="section-padding">
        <SectionReveal>
          <div className="section-container">
            <SectionHeader eyebrow={t("s1Eyebrow")} title={t("s1Title")} />
            <div className="grid md:grid-cols-3 gap-6">
              {[t("s1Body1"), t("s1Body2"), t("s1Body3")].map((body, i) => {
                const Icon = [Layers, Activity, Zap][i] ?? Layers;
                return (
                  <MotionDiv key={i} variants={fadeInUp}>
                    <div className="glass-card h-full p-6 rounded-2xl">
                      <div className="p-2.5 rounded-xl bg-primary/10 w-fit mb-4">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-text-secondary leading-relaxed">{body}</p>
                    </div>
                  </MotionDiv>
                );
              })}
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ── Section 2 — Signal Objects ──────────────── */}
      <section className="section-padding bg-slate-50/60">
        <SectionReveal>
          <div className="section-container">
            <SectionHeader
              eyebrow={t("s2Eyebrow")}
              title={t("s2Title")}
              intro={t("s2Intro")}
            />
            <MotionDiv variants={fadeInUp} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <table className="w-full text-left border-collapse">
                <thead className="hidden md:table-header-group">
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-5 py-4 text-sm font-semibold text-slate-900">{t("s2ColObject")}</th>
                    <th className="px-5 py-4 text-sm font-semibold text-slate-900">{t("s2ColCaptures")}</th>
                    <th className="px-5 py-4 text-sm font-semibold text-slate-900">{t("s2ColExample")}</th>
                  </tr>
                </thead>
                <tbody>
                  {signalObjects.map((obj) => (
                    <tr
                      key={obj.name}
                      className="block md:table-row border-b border-slate-100 last:border-0 p-4 md:p-0"
                    >
                      <td className="block md:table-cell px-1 md:px-5 py-1 md:py-4 align-top">
                        <span className="inline-flex items-center gap-2 font-semibold text-primary">
                          {obj.name}
                        </span>
                      </td>
                      <td className="block md:table-cell px-1 md:px-5 py-1 md:py-4 align-top text-sm text-text-secondary">
                        {obj.captures}
                      </td>
                      <td className="block md:table-cell px-1 md:px-5 py-1 md:py-4 align-top text-sm text-text-muted italic">
                        {obj.example}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </MotionDiv>
            <MotionDiv variants={fadeInUp}>
              <p className="mt-6 text-text-secondary leading-relaxed max-w-3xl">
                {t("s2Outro")}
              </p>
            </MotionDiv>
          </div>
        </SectionReveal>
      </section>

      {/* ── Section 3 — Sentinel Library ────────────── */}
      <section className="section-padding">
        <SectionReveal>
          <div className="section-container">
            <SectionHeader
              eyebrow={t("s3Eyebrow")}
              title={t("s3Title")}
              intro={t("s3Intro")}
            />
            <div className="grid sm:grid-cols-2 gap-4">
              {sentinels.map((s) => (
                <MotionDiv key={s.name} variants={fadeInUp}>
                  <div
                    className={`h-full p-5 rounded-2xl border bg-white ${
                      s.keystone
                        ? "border-primary/40 shadow-sm shadow-primary/10"
                        : "border-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="font-semibold text-slate-900">{s.name}</h3>
                      {s.keystone && (
                        <span className="text-[11px] font-semibold uppercase tracking-wide text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          {t("s3Keystone")}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {s.watches}
                    </p>
                  </div>
                </MotionDiv>
              ))}
            </div>

            <MotionDiv variants={fadeInUp}>
              <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50/70 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {t("s3CompoundTitle")}
                </h3>
                <p className="text-text-secondary leading-relaxed max-w-3xl mb-5">
                  {t("s3CompoundBody")}
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {compoundPatterns.map((p) => (
                    <span
                      key={p}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-full px-3.5 py-1.5"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </MotionDiv>
          </div>
        </SectionReveal>
      </section>

      {/* ── Section 4 — Quality-Gated ───────────────── */}
      <section className="section-padding bg-slate-50/60">
        <SectionReveal>
          <div className="section-container">
            <SectionHeader eyebrow={t("s4Eyebrow")} title={t("s4Title")} />
            <MotionDiv variants={fadeInUp}>
              <p className="text-text-secondary leading-relaxed max-w-3xl mb-8">
                {t("s4Body1")}
              </p>
            </MotionDiv>
            <MotionDiv variants={fadeInUp}>
              <p className="text-sm font-medium text-slate-900 mb-4">
                {t("s4MetricsIntro")}
              </p>
            </MotionDiv>
            <div className="grid sm:grid-cols-3 gap-5">
              {metrics.map((m) => (
                <MotionDiv key={m.label} variants={fadeInUp}>
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
                    <div className="text-4xl md:text-5xl font-extrabold gradient-text tracking-tight mb-1">
                      {m.value}
                    </div>
                    <div className="text-sm font-semibold text-slate-900 mb-1.5">
                      {m.label}
                    </div>
                    <div className="text-xs text-text-muted">{m.note}</div>
                  </div>
                </MotionDiv>
              ))}
            </div>
            <MotionDiv variants={fadeInUp}>
              <p className="mt-6 text-text-secondary leading-relaxed max-w-3xl">
                {t("s4Outro")}
              </p>
            </MotionDiv>
          </div>
        </SectionReveal>
      </section>

      {/* ── Section 5 — Trust Layer ─────────────────── */}
      <section className="section-padding">
        <SectionReveal>
          <div className="section-container">
            <SectionHeader eyebrow={t("s5Eyebrow")} title={t("s5Title")} />
            <div className="grid md:grid-cols-3 gap-6">
              {guarantees.map((g, i) => {
                const Icon = guaranteeIcons[i] ?? CheckCircle2;
                return (
                  <MotionDiv key={g.title} variants={fadeInUp}>
                    <div className="glass-card h-full p-6 rounded-2xl">
                      <div className="p-2.5 rounded-xl bg-primary/10 w-fit mb-4">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-2">
                        {g.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {g.body}
                      </p>
                    </div>
                  </MotionDiv>
                );
              })}
            </div>
            <MotionDiv variants={fadeInUp}>
              <p className="mt-6 text-text-secondary leading-relaxed max-w-3xl">
                {t("s5Outro")}
              </p>
            </MotionDiv>
          </div>
        </SectionReveal>
      </section>

      {/* ── Section 6 + 7 — Identity & Cost ─────────── */}
      <section className="section-padding bg-slate-50/60">
        <SectionReveal>
          <div className="section-container grid md:grid-cols-2 gap-6">
            <MotionDiv variants={fadeInUp}>
              <div className="glass-card h-full p-8 rounded-2xl">
                <div className="p-2.5 rounded-xl bg-primary/10 w-fit mb-4">
                  <Fingerprint className="h-5 w-5 text-primary" />
                </div>
                <span className="inline-block text-xs font-medium text-primary tracking-wide uppercase mb-2">
                  {t("s6Eyebrow")}
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">
                  {t("s6Title")}
                </h2>
                <p className="text-text-secondary leading-relaxed mb-3">
                  {t("s6Body1")}
                </p>
                <p className="text-text-secondary leading-relaxed">
                  {t("s6Body2")}
                </p>
              </div>
            </MotionDiv>
            <MotionDiv variants={fadeInUp}>
              <div className="glass-card h-full p-8 rounded-2xl">
                <div className="p-2.5 rounded-xl bg-primary/10 w-fit mb-4">
                  <Gauge className="h-5 w-5 text-primary" />
                </div>
                <span className="inline-block text-xs font-medium text-primary tracking-wide uppercase mb-2">
                  {t("s7Eyebrow")}
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">
                  {t("s7Title")}
                </h2>
                <p className="text-text-secondary leading-relaxed mb-3">
                  {t("s7Body1")}
                </p>
                <p className="text-text-secondary leading-relaxed">
                  {t("s7Body2")}
                </p>
              </div>
            </MotionDiv>
          </div>
        </SectionReveal>
      </section>

      {/* ── Section 8 — Architecture paragraph ──────── */}
      <section className="section-padding">
        <SectionReveal>
          <div className="section-container">
            <MotionDiv variants={fadeInUp}>
              <div className="rounded-2xl border border-slate-200 bg-[#0D0F14] text-slate-200 p-8 md:p-10">
                <div className="flex items-center gap-2 mb-4">
                  <Database className="h-5 w-5 text-primary" />
                  <span className="text-xs font-medium text-primary tracking-wide uppercase">
                    {t("s8Eyebrow")}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {t("s8Title")}
                </h2>
                <p className="text-slate-300 leading-relaxed font-mono text-sm md:text-[15px]">
                  {t("s8Body")}
                </p>
              </div>
            </MotionDiv>
          </div>
        </SectionReveal>
      </section>

      {/* ── Section 9 — Day one ─────────────────────── */}
      <section className="section-padding bg-slate-50/60">
        <SectionReveal>
          <div className="section-container">
            <SectionHeader
              eyebrow={t("s9Eyebrow")}
              title={t("s9Title")}
              intro={t("s9Intro")}
            />
            <div className="space-y-3">
              {dayOne.map((d) => (
                <MotionDiv key={d.title} variants={fadeInUp}>
                  <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-text-secondary leading-relaxed">
                      <span className="font-semibold text-slate-900">{d.title}</span>
                      {" — "}
                      {d.body}
                    </p>
                  </div>
                </MotionDiv>
              ))}
            </div>
            <MotionDiv variants={fadeInUp}>
              <p className="mt-6 text-text-secondary leading-relaxed max-w-3xl">
                {t("s9Outro")}
              </p>
            </MotionDiv>
          </div>
        </SectionReveal>
      </section>

      {/* ── CTA ─────────────────────────────────────── */}
      <section className="section-padding pb-24">
        <BlurReveal>
          <div className="section-container">
            <MotionDiv variants={blurIn}>
              <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-emerald-50 to-white p-10 md:p-14 text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3">
                    {t("ctaTitle")}
                  </h2>
                  <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
                    {t("ctaBody")}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                      href="/get-demo"
                      className="inline-flex items-center gap-2 bg-primary hover:bg-primary-600 text-white px-7 py-3.5 rounded-xl text-base font-semibold transition-colors shadow-lg shadow-primary/25"
                    >
                      {t("ctaPrimary")}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-2 border border-border hover:border-slate-400 text-slate-900 px-7 py-3.5 rounded-xl text-base font-medium transition-colors"
                    >
                      {t("ctaSecondary")}
                    </Link>
                  </div>
                </div>
              </div>
            </MotionDiv>
          </div>
        </BlurReveal>
      </section>
    </>
  );
}
