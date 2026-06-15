"use client";

import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { getCaseStudy } from "@/lib/case-studies-data";
import ImagePlaceholder from "@/components/image-placeholder";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

const COLOR_MAP: Record<string, string> = {
  emerald: "text-emerald-600 bg-emerald-500/10",
  blue: "text-blue-600 bg-blue-500/10",
  violet: "text-violet-600 bg-violet-500/10",
  amber: "text-amber-600 bg-amber-500/10",
  rose: "text-rose-600 bg-rose-500/10",
  cyan: "text-cyan-600 bg-cyan-500/10",
  teal: "text-teal-600 bg-teal-500/10",
};

interface FaqItem {
  q: string;
  a: string;
}
interface Article {
  name: string;
  hook: string;
  eyebrow: string;
  headline: string;
  heroImage: string;
  intro: string;
  howItWorks: string;
  howNeuronApplies: string;
  applyImage: string;
  whatYouGet: string;
  connectors: string[];
  scenario: string;
  scenarioImage: string;
  whoItsFor: string;
  japanNote?: string;
  faq: FaqItem[];
}

export default function CaseStudyArticle({ slug }: { slug: string }) {
  const t = useTranslations("CaseStudies");
  const meta = getCaseStudy(slug);
  if (!meta) return null;

  const c = t.raw(meta.i18nKey) as Article;
  const Icon = meta.icon;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="relative section-padding pt-24 md:pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        </div>
        <div className="section-container relative z-10 max-w-4xl">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-slate-900 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToHub")}
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <div
              className={cn(
                "w-11 h-11 rounded-xl flex items-center justify-center",
                COLOR_MAP[meta.color] ?? COLOR_MAP.emerald
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium uppercase tracking-wide text-primary">
              {c.eyebrow}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
            {c.headline}
          </h1>
          <p className="mt-6 text-lg text-text-secondary leading-relaxed">{c.intro}</p>

          <div className="mt-8">
            <Link
              href="/get-demo"
              className="inline-block bg-primary hover:bg-primary-600 text-white px-7 py-3 rounded-xl text-base font-semibold transition-colors shadow-lg shadow-primary/25"
            >
              {t("ctaButton")}
            </Link>
          </div>

          <div className="mt-10">
            <ImagePlaceholder caption={c.heroImage} />
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="section-padding pt-4">
        <SectionReveal>
          <div className="section-container max-w-3xl space-y-12">
            <MotionDiv variants={fadeInUp}>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                {t("sectionHowItWorks")}
              </h2>
              <p className="text-text-secondary leading-relaxed">{c.howItWorks}</p>
            </MotionDiv>

            <MotionDiv variants={fadeInUp}>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                {t("sectionApplies")}
              </h2>
              <p className="text-text-secondary leading-relaxed">{c.howNeuronApplies}</p>
              <div className="mt-6">
                <ImagePlaceholder caption={c.applyImage} aspect="aspect-[16/8]" />
              </div>
            </MotionDiv>

            <MotionDiv variants={fadeInUp}>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                {t("sectionWhatYouGet")}
              </h2>
              <p className="text-text-secondary leading-relaxed">{c.whatYouGet}</p>
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-3">
                  {t("sectionConnectors")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {c.connectors.map((conn) => (
                    <span
                      key={conn}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-sm text-slate-700"
                    >
                      <Check className="h-3.5 w-3.5 text-primary" />
                      {conn}
                    </span>
                  ))}
                </div>
              </div>
            </MotionDiv>

            <MotionDiv variants={fadeInUp}>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                {t("sectionScenario")}
              </h2>
              <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6">
                <p className="text-slate-700 leading-relaxed italic">{c.scenario}</p>
              </div>
              <div className="mt-6">
                <ImagePlaceholder caption={c.scenarioImage} aspect="aspect-[16/8]" />
              </div>
            </MotionDiv>

            <MotionDiv variants={fadeInUp}>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                {t("sectionWhoItsFor")}
              </h2>
              <p className="text-text-secondary leading-relaxed">{c.whoItsFor}</p>
            </MotionDiv>

            {c.japanNote && (
              <MotionDiv variants={fadeInUp}>
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-primary mb-2">
                    {t("sectionJapanNote")}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">{c.japanNote}</p>
                </div>
              </MotionDiv>
            )}

            <MotionDiv variants={fadeInUp}>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
                {t("sectionFaq")}
              </h2>
              <Accordion type="single" collapsible>
                {c.faq.map((f, i) => (
                  <AccordionItem key={i} value={String(i)}>
                    <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-text-secondary leading-relaxed">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </MotionDiv>

            <MotionDiv variants={fadeInUp}>
              <div className="rounded-2xl bg-[#0D0F14] p-8 text-center">
                <Link
                  href="/get-demo"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-600 text-white px-7 py-3 rounded-xl text-base font-semibold transition-colors"
                >
                  {t("ctaButton")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </MotionDiv>
          </div>
        </SectionReveal>
      </section>
    </article>
  );
}
