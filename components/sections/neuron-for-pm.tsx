"use client";

import { useTranslations } from "next-intl";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";
import FeatureShowcase from "./feature-showcase";
import { PMVisual1, PMVisual2, PMVisual3, PMVisual4, PMVisual5 } from "./feature-visuals";

export default function NeuronForPM() {
  const t = useTranslations("NeuronForPM");

  const features = [
    { key: "1", title: t("feature1Title"), description: t("feature1Description"), visual: <PMVisual1 t={(k: string) => t(k as "feature1Title")} /> },
    { key: "2", title: t("feature2Title"), description: t("feature2Description"), visual: <PMVisual2 t={(k: string) => t(k as "feature1Title")} /> },
    { key: "3", title: t("feature3Title"), description: t("feature3Description"), visual: <PMVisual3 t={(k: string) => t(k as "feature1Title")} /> },
    { key: "4", title: t("feature4Title"), description: t("feature4Description"), visual: <PMVisual4 t={(k: string) => t(k as "feature1Title")} /> },
    { key: "5", title: t("feature5Title"), description: t("feature5Description"), visual: <PMVisual5 t={(k: string) => t(k as "feature1Title")} /> },
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
