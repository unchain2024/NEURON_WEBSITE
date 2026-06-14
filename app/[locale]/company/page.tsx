import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import PageHero from "@/components/sections/page-hero";
import CompanySections from "@/components/sections/company-sections";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("companyTitle"),
    description: t("companyDescription"),
  };
}

export default function CompanyPage() {
  return (
    <>
      <PageHero namespace="CompanyPage" />
      <CompanySections />
    </>
  );
}
