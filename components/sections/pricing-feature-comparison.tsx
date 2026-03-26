"use client";

import { useTranslations } from "next-intl";
import { Check, Minus } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";
import {
  FEATURE_CATEGORIES,
  PRICING_TIERS,
  capitalizeTierId,
  type FeatureValue,
} from "@/lib/pricing-data";

function FeatureValueCell({
  value,
  t,
}: {
  value: FeatureValue;
  t: ReturnType<typeof useTranslations<"Pricing">>;
}) {
  if (value === true) {
    return <Check className="h-4 w-4 text-primary" />;
  }
  if (value === false) {
    return <Minus className="h-4 w-4 text-text-muted" />;
  }
  const key = `value${value.charAt(0).toUpperCase()}${value.slice(1)}` as Parameters<typeof t>[0];
  return <span className="text-sm text-text-secondary">{t(key)}</span>;
}

export default function PricingFeatureComparison() {
  const t = useTranslations("Pricing");

  return (
    <section className="section-padding">
      <SectionReveal>
        <div className="section-container">
          <MotionDiv variants={fadeInUp} className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3">
              {t("featureComparisonTitle")}
            </h2>
            <p className="text-text-secondary text-lg">
              {t("featureComparisonDescription")}
            </p>
          </MotionDiv>

          <MotionDiv variants={fadeInUp}>
            <Accordion type="multiple" className="space-y-3">
              {FEATURE_CATEGORIES.map((category) => {
                const categoryKey =
                  `category${category.i18nKey.charAt(0).toUpperCase()}${category.i18nKey.slice(1)}` as Parameters<typeof t>[0];
                return (
                  <AccordionItem
                    key={category.i18nKey}
                    value={category.i18nKey}
                    className="border border-border rounded-xl overflow-hidden"
                  >
                    <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-slate-50/50 text-base font-semibold text-slate-900">
                      {t(categoryKey)}
                    </AccordionTrigger>
                    <AccordionContent className="px-5">
                      <div className="overflow-x-auto -mx-5 px-5">
                        <div className="min-w-[640px]">
                          {/* Header row */}
                          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-2 py-3 border-b border-border/50">
                            <span />
                            {PRICING_TIERS.map((tier) => (
                              <span
                                key={tier.id}
                                className="text-xs font-semibold text-text-muted uppercase tracking-wider"
                              >
                                {t(`tier${capitalizeTierId(tier.id)}Name`)}
                              </span>
                            ))}
                          </div>
                          {/* Feature rows */}
                          {category.features.map((feature) => {
                            const featureKey =
                              `feature${feature.i18nKey.charAt(0).toUpperCase()}${feature.i18nKey.slice(1)}` as Parameters<typeof t>[0];
                            return (
                              <div
                                key={feature.i18nKey}
                                className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-2 py-3 border-b border-border/30 last:border-0"
                              >
                                <span className="text-sm text-slate-700">
                                  {t(featureKey)}
                                </span>
                                <FeatureValueCell value={feature.starter} t={t} />
                                <FeatureValueCell value={feature.team} t={t} />
                                <FeatureValueCell value={feature.business} t={t} />
                                <FeatureValueCell value={feature.enterprise} t={t} />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </MotionDiv>
        </div>
      </SectionReveal>
    </section>
  );
}
