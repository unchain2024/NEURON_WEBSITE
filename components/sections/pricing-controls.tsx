"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { PRICING_TIERS } from "@/lib/pricing-data";

interface PricingControlsProps {
  billingCycle: "monthly" | "annual";
  onBillingCycleChange: (cycle: "monthly" | "annual") => void;
  seats: number;
  onSeatsChange: (seats: number) => void;
}

const MILESTONES = PRICING_TIERS.map((t) => ({
  seats: t.minSeats,
  label: t.id,
}));

export default function PricingControls({
  billingCycle,
  onBillingCycleChange,
  seats,
  onSeatsChange,
}: PricingControlsProps) {
  const t = useTranslations("Pricing");

  return (
    <section className="section-padding pt-0 pb-8">
      <div className="section-container max-w-xl mx-auto space-y-8">
        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-3">
          <div className="relative inline-flex items-center rounded-xl bg-white p-1 shadow-sm border border-border">
            {(["monthly", "annual"] as const).map((cycle) => (
              <button
                key={cycle}
                onClick={() => onBillingCycleChange(cycle)}
                className="relative z-10 px-5 py-2 text-sm font-medium rounded-lg transition-colors"
                style={{
                  color: billingCycle === cycle ? "white" : "#64748B",
                }}
              >
                {t(cycle === "monthly" ? "billingMonthly" : "billingAnnual")}
                {billingCycle === cycle && (
                  <motion.div
                    layoutId="billing-toggle-bg"
                    className="absolute inset-0 bg-primary rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
          <motion.span
            animate={{
              opacity: billingCycle === "annual" ? 1 : 0,
              scale: billingCycle === "annual" ? 1 : 0.9,
            }}
            transition={{ duration: 0.2 }}
            className="text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full"
          >
            {t("billingSavePercent")}
          </motion.span>
        </div>

        {/* Seat Slider */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-text-secondary">{t("sliderLabel")}</span>
            <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-lg">
              {t("sliderSeats", { count: seats })}
            </span>
          </div>
          <Slider
            min={3}
            max={30}
            step={1}
            value={[seats]}
            onValueChange={([value]) => onSeatsChange(value)}
            aria-label={t("sliderLabel")}
          />
          {/* Milestone markers */}
          <div className="relative mt-2 h-5">
            {MILESTONES.map((m) => {
              const left = ((m.seats - 3) / 27) * 100;
              return (
                <span
                  key={m.seats}
                  className="absolute text-[10px] text-text-muted -translate-x-1/2"
                  style={{ left: `${left}%` }}
                >
                  {m.seats}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
