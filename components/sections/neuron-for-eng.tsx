"use client";

import { useTranslations } from "next-intl";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";
import FeatureShowcase from "./feature-showcase";
import { EngVisual1, EngVisual2, EngVisual3, EngVisual4, EngVisual5 } from "./feature-visuals";

export default function NeuronForEng() {
  const t = useTranslations("NeuronForEng");

  const features = [
    { key: "1", title: t("feature1Title"), description: t("feature1Description"), visual: <EngVisual1 t={(k: string) => t(k as "feature1Title")} /> },
    { key: "2", title: t("feature2Title"), description: t("feature2Description"), visual: <EngVisual2 t={(k: string) => t(k as "feature1Title")} /> },
    { key: "3", title: t("feature3Title"), description: t("feature3Description"), visual: <EngVisual3 t={(k: string) => t(k as "feature1Title")} /> },
    { key: "4", title: t("feature4Title"), description: t("feature4Description"), visual: <EngVisual4 t={(k: string) => t(k as "feature1Title")} /> },
    { key: "5", title: t("feature5Title"), description: t("feature5Description"), visual: <EngVisual5 t={(k: string) => t(k as "feature1Title")} /> },
  ];

  return (
    <section className="section-padding">
      <SectionReveal>
        <div className="section-container">
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
          <MotionDiv variants={fadeInUp}>
            <FeatureShowcase features={features} />
          </MotionDiv>
        </div>
      </SectionReveal>
    </section>
  );
}
