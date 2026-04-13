"use client";

import {
  FileText,
  GitBranch,
  MessageSquare,
  AlertOctagon,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

const FEATURE_CARDS: { icon: LucideIcon; key: string }[] = [
  { icon: FileText, key: "1" },
  { icon: GitBranch, key: "2" },
  { icon: MessageSquare, key: "3" },
  { icon: AlertOctagon, key: "4" },
  { icon: HelpCircle, key: "5" },
];

const SCENARIO_KEYS = ["1", "2", "3"];

export default function NeuronForEng() {
  const t = useTranslations("NeuronForEng");

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

          {/* Feature cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {FEATURE_CARDS.map((card) => (
              <MotionDiv key={card.key} variants={fadeInUp}>
                <div className="glass-card p-6 h-full rounded-2xl relative overflow-hidden group transition-shadow hover:shadow-lg">
                  <div className="relative z-10">
                    <div className="p-2.5 rounded-xl bg-primary/10 w-fit mb-4">
                      <card.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {t(`feature${card.key}Title` as "feature1Title")}
                    </h3>
                    <p className="text-text-secondary leading-relaxed text-sm">
                      {t(`feature${card.key}Description` as "feature1Description")}
                    </p>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>

          {/* Scenario cards */}
          <div className="grid sm:grid-cols-3 gap-6">
            {SCENARIO_KEYS.map((key) => (
              <MotionDiv key={key} variants={fadeInUp}>
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 h-full">
                  <div className="mb-4 rounded-lg bg-white border border-slate-200 p-3">
                    <p className="text-sm font-mono text-slate-600 leading-relaxed">
                      <span className="text-primary font-semibold">$</span>{" "}
                      {t(`scenario${key}Title` as "scenario1Title")}
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/70 border border-emerald-100 p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span className="text-xs font-medium text-primary uppercase tracking-wide">
                        NEURON
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {t(`scenario${key}Description` as "scenario1Description")}
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
