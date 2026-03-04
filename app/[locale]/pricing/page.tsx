import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import PageHero from "@/components/sections/page-hero";
import PricingTiers from "@/components/sections/pricing-tiers";
import FinalCTA from "@/components/sections/final-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("pricingTitle"),
    description: t("pricingDescription"),
  };
}

export default function PricingPage() {
  return (
    <>
      <PageHero namespace="PricingPage" />
      <PricingTiers />
      <FinalCTA />
    </>
  );
}
