import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import PageHero from "@/components/sections/page-hero";
import SolutionsByRole from "@/components/sections/solutions-by-role";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("solutionsTitle"),
    description: t("solutionsDescription"),
  };
}

export default function SolutionsPage() {
  return (
    <>
      <PageHero namespace="SolutionsPage" />
      <SolutionsByRole />
    </>
  );
}
