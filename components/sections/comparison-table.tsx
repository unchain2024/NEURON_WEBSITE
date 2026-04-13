"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

const ROW_KEYS = ["1", "2", "3", "4", "5", "6"];

export default function ComparisonTable() {
  const t = useTranslations("Comparison");

  return (
    <section className="section-padding">
      <SectionReveal>
        <div className="section-container">
          {/* Section heading */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <MotionDiv variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
                {t("heading")}
              </h2>
              <p className="mt-4 text-lg text-text-secondary leading-relaxed">
                {t("subheading")}
              </p>
            </MotionDiv>
          </div>

          {/* Table header */}
          <MotionDiv variants={fadeInUp}>
            <div className="hidden sm:grid sm:grid-cols-[1fr_48px_1fr] gap-4 mb-4 px-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                {t("legacyLabel")}
              </p>
              <div />
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("neuronLabel")}
              </p>
            </div>
          </MotionDiv>

          {/* Comparison rows */}
          <div className="space-y-4">
            {ROW_KEYS.map((key) => (
              <MotionDiv key={key} variants={fadeInUp}>
                <div className="grid sm:grid-cols-[1fr_48px_1fr] gap-4 items-stretch">
                  {/* Legacy column */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-sm sm:hidden font-semibold uppercase tracking-wide text-slate-400 mb-2">
                      {t("legacyLabel")}
                    </p>
                    <p className="text-text-secondary leading-relaxed text-sm">
                      {t(`row${key}Legacy` as "row1Legacy")}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="hidden sm:flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                  </div>

                  {/* NEURON column */}
                  <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 -translate-y-1/2 translate-x-1/2 bg-primary" />
                    <p className="text-sm sm:hidden font-semibold uppercase tracking-wide text-primary mb-2">
                      {t("neuronLabel")}
                    </p>
                    <p className="text-slate-900 leading-relaxed text-sm font-medium relative z-10">
                      {t(`row${key}Neuron` as "row1Neuron")}
                    </p>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
