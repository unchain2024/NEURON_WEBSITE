"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { BlurReveal, MotionDiv, blurIn } from "@/components/motion-wrapper";
import { cn } from "@/lib/utils";

const TIERS = [
  {
    key: "free",
    featured: false,
    featureCount: 5,
  },
  {
    key: "pro",
    featured: true,
    featureCount: 7,
  },
  {
    key: "enterprise",
    featured: false,
    featureCount: 7,
  },
] as const;

export default function PricingTiers() {
  const t = useTranslations("Pricing");

  return (
    <section className="section-padding">
      <div className="section-container">
        <BlurReveal>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TIERS.map((tier) => (
              <MotionDiv
                key={tier.key}
                variants={blurIn}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "glass-card rounded-xl p-8 relative flex flex-col",
                  tier.featured &&
                    "border-primary ring-1 ring-primary/20 shadow-lg shadow-primary/10"
                )}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {t("proBadge")}
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {t(`${tier.key}Name`)}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-slate-900">
                      {t(`${tier.key}Price`)}
                    </span>
                    <span className="text-text-secondary text-sm">
                      {t(`${tier.key}Period`)}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mt-3">
                    {t(`${tier.key}Description`)}
                  </p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {Array.from({ length: tier.featureCount }, (_, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-text-secondary">
                        {t(`${tier.key}Feature${i + 1}`)}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={cn(
                    "w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-colors",
                    tier.featured
                      ? "bg-primary hover:bg-primary-600 text-white"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-900"
                  )}
                >
                  {t(`${tier.key}Cta`)}
                </button>
              </MotionDiv>
            ))}
          </div>
        </BlurReveal>
      </div>
    </section>
  );
}
