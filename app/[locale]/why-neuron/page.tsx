import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import PageHero from "@/components/sections/page-hero";
import Problem from "@/components/sections/problem";
import StakeholderValue from "@/components/sections/stakeholder-value";
import Testimonials from "@/components/sections/testimonials";
import FinalCTA from "@/components/sections/final-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("whyNeuronTitle"),
    description: t("whyNeuronDescription"),
  };
}

export default function WhyNeuronPage() {
  return (
    <>
      <PageHero namespace="WhyNeuronPage" />
      <Problem />
      <StakeholderValue />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
