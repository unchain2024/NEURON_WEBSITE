import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import PageHero from "@/components/sections/page-hero";
import TrustBar from "@/components/sections/trust-bar";
import IntegrationDetails from "@/components/sections/integration-details";
import FinalCTA from "@/components/sections/final-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("integrationsTitle"),
    description: t("integrationsDescription"),
  };
}

export default function IntegrationsPage() {
  return (
    <>
      <PageHero namespace="IntegrationsPage" />
      <TrustBar />
      <IntegrationDetails />
      <FinalCTA />
    </>
  );
}
