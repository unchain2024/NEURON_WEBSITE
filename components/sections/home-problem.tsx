"use client";

import { useTranslations } from "next-intl";
import { RefreshCw, Clock, HelpCircle } from "lucide-react";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

const PAINS = [
  { key: "pain1", Icon: RefreshCw },
  { key: "pain2", Icon: Clock },
  { key: "pain3", Icon: HelpCircle },
] as const;

export default function HomeProblem() {
  const t = useTranslations("Home");

  return (
    <section className="section-padding">
      <SectionReveal>
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-14 lg:mb-20">
            <MotionDiv variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
                {t("problemHeading")}
              </h2>
              <p className="mt-6 text-lg text-text-secondary leading-relaxed">
                {t("problemBody")}
              </p>
            </MotionDiv>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PAINS.map(({ key, Icon }) => (
              <MotionDiv key={key} variants={fadeInUp}>
                <div className="h-full rounded-2xl border border-border bg-white p-7">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {t(`${key}Title`)}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {t(`${key}Body`)}
                  </p>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
