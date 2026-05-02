"use client";

import { useTranslations } from "next-intl";
import { BlurReveal, MotionDiv, blurIn } from "@/components/motion-wrapper";
import { Link } from "@/i18n/navigation";

export default function PricingContactCard() {
  const t = useTranslations("Pricing");

  return (
    <section className="section-padding">
      <BlurReveal>
        <div className="section-container">
          <MotionDiv variants={blurIn} className="max-w-md mx-auto">
            <div className="glass-card rounded-xl p-6 md:p-8 flex flex-col border-border">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {t("contactUsTitle")}
              </h3>

              <div className="mb-4">
                <span className="text-3xl font-bold text-slate-900">
                  {t("customPricing")}
                </span>
                <p className="text-sm text-text-secondary mt-1">
                  {t("contactSales")}
                </p>
              </div>

              <p className="text-sm text-text-secondary mb-6">
                {t("tierEnterpriseDescription")}
              </p>

              <Link
                href="/get-demo"
                className="block w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-colors text-center bg-slate-900 hover:bg-slate-800 text-white"
              >
                {t("tierEnterpriseCta")}
              </Link>
            </div>
          </MotionDiv>
        </div>
      </BlurReveal>
    </section>
  );
}
