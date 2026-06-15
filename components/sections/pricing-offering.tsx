"use client";

import { useTranslations } from "next-intl";
import { BlurReveal, MotionDiv, blurIn } from "@/components/motion-wrapper";
import { Link } from "@/i18n/navigation";

export default function PricingOffering() {
  const t = useTranslations("PricingPage");

  return (
    <section className="section-padding pt-0">
      <BlurReveal>
        <div className="section-container">
          <MotionDiv variants={blurIn} className="max-w-lg mx-auto">
            <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-8 md:p-10 text-center">
              <h2 className="text-2xl font-bold text-slate-900">{t("offeringName")}</h2>
              <p className="mt-2 text-primary font-medium">{t("offeringTagline")}</p>
              <p className="mt-6 text-text-secondary leading-relaxed">{t("offeringDesc")}</p>
              <Link
                href="/get-demo"
                className="mt-8 inline-block w-full bg-primary hover:bg-primary-600 text-white px-8 py-3.5 rounded-xl text-base font-semibold transition-colors shadow-lg shadow-primary/25"
              >
                {t("offeringCta")}
              </Link>
            </div>
          </MotionDiv>
        </div>
      </BlurReveal>
    </section>
  );
}
