"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Network, RefreshCw, Building2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

const POINTS = [
  { key: "point1", Icon: Network },
  { key: "point2", Icon: RefreshCw },
  { key: "point3", Icon: Building2 },
] as const;

export default function WhyOntology() {
  const t = useTranslations("WhyOntology");

  return (
    <section className="section-padding">
      <SectionReveal>
        <div className="section-container max-w-4xl">
          <MotionDiv variants={fadeInUp}>
            <p className="text-lg text-text-secondary leading-relaxed">{t("body1")}</p>
            <p className="mt-6 text-lg text-text-secondary leading-relaxed">{t("body2")}</p>
          </MotionDiv>

          <MotionDiv variants={fadeInUp} className="mt-14">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-8">
              {t("mattersHeading")}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {POINTS.map(({ key, Icon }) => (
                <div key={key} className="rounded-2xl border border-border bg-white p-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{t(`${key}Title`)}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{t(`${key}Body`)}</p>
                </div>
              ))}
            </div>
          </MotionDiv>

          <MotionDiv variants={fadeInUp} className="mt-12">
            <p className="text-sm text-text-secondary">
              {t("linkText")}{" "}
              <Link
                href="/cognition-layer"
                className="inline-flex items-center gap-1 font-semibold text-primary hover:text-primary-600 transition-colors"
              >
                {t("linkCta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </p>
          </MotionDiv>
        </div>
      </SectionReveal>
    </section>
  );
}
