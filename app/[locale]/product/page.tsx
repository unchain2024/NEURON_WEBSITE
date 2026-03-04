import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import PageHero from "@/components/sections/page-hero";
import Features from "@/components/sections/features";
import HowItWorks from "@/components/sections/how-it-works";
import FinalCTA from "@/components/sections/final-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("productTitle"),
    description: t("productDescription"),
  };
}

export default function ProductPage() {
  return (
    <>
      <PageHero namespace="ProductPage" />
      <Features />
      <HowItWorks />
      <FinalCTA />
    </>
  );
}
