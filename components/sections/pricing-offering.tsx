"use client";

import { useTranslations } from "next-intl";
import {
  Atom,
  Cable,
  Users,
  KeyRound,
  Lock,
  GitBranch,
  ShieldCheck,
  EyeOff,
  Info,
  type LucideIcon,
} from "lucide-react";
import { BlurReveal, MotionDiv, blurIn } from "@/components/motion-wrapper";
import { Link } from "@/i18n/navigation";

/* "Inter Display" (Figma spec) is Inter at its display optical size. */
const HEADLINE_FONT = {
  fontFamily: '"Inter Display", var(--font-inter), sans-serif',
  fontWeight: 600,
  letterSpacing: "-0.02em",
} as const;

/* Per-feature icons, matched to public/pricing.svg (one unique mono-line
   icon per row, in a white circular badge — order matches the `features`
   array in messages/{en,ja}.json). */
const FEATURE_ICONS: LucideIcon[] = [
  Atom, // All core capabilities
  Cable, // Core connectors across your stack
  Users, // Role-based views
  KeyRound, // Permission-aware access
  Lock, // Enterprise security
  GitBranch, // Dedicated onboarding
];

export default function PricingOffering() {
  const t = useTranslations("PricingPage");
  const features = (t.raw("features") as string[]) ?? [];

  return (
    <section className="section-padding pt-0">
      <div className="section-container max-w-6xl">
        <BlurReveal>
          {/* Full-bleed warm-gradient offering card */}
          <MotionDiv
            variants={blurIn}
            className="relative overflow-hidden rounded-[28px] border border-black/5 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.35)]"
          >
            {/* Background art (baked warm mesh gradient from the design) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/pricing-card-bg.jpg"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />

            <div className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-2 lg:gap-12 lg:p-14">
              {/* Left — headline */}
              <div className="max-w-md lg:pt-2">
                <h2
                  className="text-3xl leading-[1.1] text-[#0A0D12] sm:text-4xl lg:text-[44px]"
                  style={HEADLINE_FONT}
                >
                  {t("offeringHeading")}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-[#414651]">
                  {t("offeringLeadDesc")}
                </p>
              </div>

              {/* Right — stacked cards */}
              <div className="space-y-6">
                {/* "Set with you" panel */}
                <div className="overflow-hidden rounded-2xl border border-white/60 shadow-xl">
                  <div className="bg-white/90 p-6 backdrop-blur-sm sm:p-8">
                    <h3 className="text-xl font-semibold text-[#0A0D12]">
                      {t("panelTitle")}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#535862]">
                      {t("panelDesc")}
                    </p>

                    <Link
                      href="/get-demo"
                      className="mt-6 flex w-full items-center justify-center rounded-full border border-[#E9EAEB] bg-white px-6 py-3.5 text-sm font-semibold text-[#0A0D12] shadow-sm transition-colors hover:bg-[#F8FAF9]"
                    >
                      {t("panelCta")}
                    </Link>

                    <p className="mt-7 text-xs font-medium text-[#717680]">
                      {t("includedLabel")}
                    </p>
                    <ul className="mt-4 space-y-3.5">
                      {features.map((feature, i) => {
                        const Icon = FEATURE_ICONS[i] ?? Atom;
                        return (
                          <li key={i} className="flex items-start gap-3.5">
                            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5">
                              <Icon
                                className="h-[18px] w-[18px] text-[#252B37]"
                                strokeWidth={1.75}
                              />
                            </span>
                            <span className="pt-1.5 text-sm leading-snug text-[#414651]">
                              {feature}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Frosted footer band — sits over the darker gradient */}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 bg-black/15 px-6 py-4 text-xs font-medium text-white backdrop-blur-sm sm:px-8">
                    <span className="inline-flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-white/90" strokeWidth={1.75} />
                      {t("badgeSecurity")}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <EyeOff className="h-4 w-4 text-white/90" strokeWidth={1.75} />
                      {t("badgeData")}
                    </span>
                  </div>
                </div>

                {/* "Why no public price?" callout */}
                <div className="rounded-2xl border border-white/60 bg-white/85 p-6 shadow-lg backdrop-blur-sm sm:p-8">
                  <div className="flex items-center gap-2.5">
                    <Info className="h-5 w-5 text-[#252B37]" strokeWidth={1.75} />
                    <h3 className="text-base font-semibold text-[#0A0D12]">
                      {t("whyTitle")}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[#535862]">
                    {t("whyDesc")}
                  </p>
                </div>
              </div>
            </div>
          </MotionDiv>
        </BlurReveal>
      </div>
    </section>
  );
}
