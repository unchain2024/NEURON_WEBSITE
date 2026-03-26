"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import {
  PRICING_TIERS,
  formatCurrency,
  capitalizeTierId,
  type PricingTier,
  type Locale,
} from "@/lib/pricing-data";

interface PricingCardsProps {
  billingCycle: "monthly" | "annual";
  seats: number;
}

// Determine which tier is recommended based on seat count
function getRecommendedTier(seats: number): string {
  if (seats >= 30) return "enterprise";
  if (seats >= 15) return "business";
  if (seats >= 5) return "team";
  return "starter";
}

export default function PricingCards({ billingCycle, seats }: PricingCardsProps) {
  const t = useTranslations("Pricing");
  const locale = useLocale() as Locale;
  const recommendedTier = getRecommendedTier(seats);

  return (
    <section className="section-padding pt-0 pb-12">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_TIERS.map((tier) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              billingCycle={billingCycle}
              seats={seats}
              locale={locale}
              isRecommended={tier.id === recommendedTier}
              t={t}
            />
          ))}
        </div>
        <p className="text-center text-xs text-text-muted mt-6">
          {t("trialAndTaxNote")}
        </p>
      </div>
    </section>
  );
}

interface PricingCardProps {
  tier: PricingTier;
  billingCycle: "monthly" | "annual";
  seats: number;
  locale: Locale;
  isRecommended: boolean;
  t: ReturnType<typeof useTranslations<"Pricing">>;
}

function PricingCard({
  tier,
  billingCycle,
  seats,
  locale,
  isRecommended,
  t,
}: PricingCardProps) {
  const prices = tier.prices[locale];
  const isEnterprise = tier.id === "enterprise";

  const monthlyPerSeat = prices.monthlyPerSeat;
  const annualPerSeat = prices.annualPerSeat;
  const annualMonthlyEquivalent =
    annualPerSeat !== null ? annualPerSeat / 12 : null;

  const displaySeats = isEnterprise ? 0 : Math.max(seats, tier.minSeats);

  const totalMonthly =
    monthlyPerSeat !== null ? displaySeats * monthlyPerSeat : null;
  const totalAnnual =
    annualPerSeat !== null ? displaySeats * annualPerSeat : null;

  const fmt = (amount: number) =>
    formatCurrency(amount, prices.currency, prices.locale);

  return (
    <motion.div
      animate={
        isRecommended
          ? { scale: 1.02, y: -4 }
          : { scale: 1, y: 0 }
      }
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className={`glass-card rounded-xl p-6 md:p-8 relative flex flex-col transition-shadow duration-300 ${
        isRecommended
          ? "border-primary ring-2 ring-primary/20 shadow-lg shadow-primary/10"
          : "border-border"
      }`}
    >
      {/* Recommended Badge — dynamic based on seat count */}
      <AnimatePresence>
        {isRecommended && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 4 }}
            transition={{ duration: 0.25 }}
            className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-semibold px-4 py-1 rounded-full whitespace-nowrap"
          >
            {t("badgeMostPopular")}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Tier Name */}
      <h3 className="text-lg font-semibold text-slate-900 mb-2">
        {t(`tier${capitalizeTierId(tier.id)}Name`)}
      </h3>

      {/* Price Block */}
      <div className="mb-4">
        {isEnterprise ? (
          <>
            <span className="text-3xl font-bold text-slate-900">
              {t("customPricing")}
            </span>
            <p className="text-sm text-text-secondary mt-1">
              {t("contactSales")}
            </p>
          </>
        ) : billingCycle === "annual" && annualMonthlyEquivalent !== null ? (
          <>
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-text-muted line-through">
                {fmt(monthlyPerSeat!)}
              </span>
              <span className="text-3xl font-bold text-slate-900">
                {fmt(annualMonthlyEquivalent)}
              </span>
            </div>
            <p className="text-sm text-text-secondary">
              {t("perSeatMonth")}, {t("billedAnnually")}
            </p>
            {prices.savingsPerSeat !== null && (
              <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded mt-2">
                {t("saveBadge", { amount: fmt(prices.savingsPerSeat) })}
              </span>
            )}
          </>
        ) : (
          <>
            <span className="text-3xl font-bold text-slate-900">
              {fmt(monthlyPerSeat!)}
            </span>
            <p className="text-sm text-text-secondary">
              {t("perSeatMonth")}, {t("billedMonthly")}
            </p>
          </>
        )}
      </div>

      {/* Total */}
      {!isEnterprise && (
        <p className="text-sm text-text-secondary mb-6">
          {billingCycle === "monthly" && totalMonthly !== null
            ? t("totalMonthly", {
                total: fmt(totalMonthly),
                seats: displaySeats,
              })
            : totalAnnual !== null
            ? t("totalAnnual", {
                total: fmt(totalAnnual),
                seats: displaySeats,
              })
            : null}
        </p>
      )}

      {/* Description */}
      <p className="text-sm text-text-secondary mb-6 flex-1">
        {t(`tier${capitalizeTierId(tier.id)}Description`)}
      </p>

      {/* CTA */}
      {tier.ctaType === "trial" ? (
        <Link
          href="/get-demo"
          className={`block w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-colors text-center ${
            isRecommended
              ? "bg-primary hover:bg-primary-600 text-white"
              : "bg-slate-900 hover:bg-slate-800 text-white"
          }`}
        >
          {t(`tier${capitalizeTierId(tier.id)}Cta`)}
        </Link>
      ) : (
        <Link
          href="/get-demo"
          className={`block w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-colors text-center ${
            isRecommended
              ? "bg-primary hover:bg-primary-600 text-white"
              : "bg-slate-900 hover:bg-slate-800 text-white"
          }`}
        >
          {t(`tier${capitalizeTierId(tier.id)}Cta`)}
        </Link>
      )}

      {/* Trial note */}
      {tier.ctaType === "trial" && (
        <p className="text-xs text-text-muted text-center mt-3">
          {t("trialNote")}
        </p>
      )}
    </motion.div>
  );
}
