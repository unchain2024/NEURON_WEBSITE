"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { BlurReveal, MotionDiv, blurIn } from "@/components/motion-wrapper";
import { Link } from "@/i18n/navigation";
import { ENTERPRISE_EXTRA_COUNT } from "@/lib/pricing-data";

export default function PricingEnterpriseSection() {
  const t = useTranslations("Pricing");

  return (
    <section className="section-padding">
      <BlurReveal>
        <div className="section-container">
          <MotionDiv variants={blurIn}>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-3">
                  {t("enterpriseSectionTitle")}
                </h2>
                <p className="text-text-secondary mb-6">
                  {t("enterpriseSectionDescription")}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Array.from({ length: ENTERPRISE_EXTRA_COUNT }, (_, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">
                        {t(`enterpriseExtra${i + 1}`)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center md:pt-8 shrink-0">
                <Link
                  href="/get-demo"
                  className="inline-block bg-primary hover:bg-primary-600 text-white font-semibold px-8 py-3 rounded-xl text-sm transition-colors"
                >
                  {t("enterpriseSectionCta")}
                </Link>
                <p className="text-xs text-text-muted mt-2">
                  {t("enterpriseSectionCtaEmail")}
                </p>
              </div>
            </div>
          </MotionDiv>
        </div>
      </BlurReveal>
    </section>
  );
}
