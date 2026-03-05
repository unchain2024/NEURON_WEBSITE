"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { BlurReveal, MotionDiv, blurIn } from "@/components/motion-wrapper";
import { Link } from "@/i18n/navigation";

export default function PricingTiers() {
  const t = useTranslations("Pricing");

  return (
    <section className="section-padding">
      <div className="section-container">
        <BlurReveal>
          <div className="max-w-2xl mx-auto">
            <MotionDiv
              variants={blurIn}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="glass-card rounded-xl p-8 md:p-10 relative flex flex-col border-primary ring-1 ring-primary/20 shadow-lg shadow-primary/10"
            >
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {t("enterpriseName")}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900">
                    {t("enterprisePrice")}
                  </span>
                  <span className="text-text-secondary text-sm">
                    {t("enterprisePeriod")}
                  </span>
                </div>
                <p className="text-sm text-text-secondary mt-3">
                  {t("enterpriseDescription")}
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1 sm:columns-2 sm:gap-x-8">
                {Array.from({ length: 7 }, (_, i) => (
                  <li key={i} className="flex items-start gap-2.5 break-inside-avoid">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-text-secondary">
                      {t(`enterpriseFeature${i + 1}`)}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/get-demo"
                className="block w-full py-2.5 px-4 rounded-lg text-sm font-medium bg-primary hover:bg-primary-600 text-white transition-colors text-center"
              >
                {t("enterpriseCta")}
              </Link>
              <p className="text-xs text-text-muted text-center mt-3">
                {t("enterpriseCtaHelper")}
              </p>
            </MotionDiv>
          </div>
        </BlurReveal>
      </div>
    </section>
  );
}
