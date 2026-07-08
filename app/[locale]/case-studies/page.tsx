import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import PageHero from "@/components/sections/page-hero";
import CaseStudiesHub from "@/components/sections/case-studies-hub";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("caseStudiesTitle"),
    description: t("caseStudiesDescription"),
  };
}

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero namespace="CaseStudiesPage" />
      <CaseStudiesHub />
    </>
  );
}
