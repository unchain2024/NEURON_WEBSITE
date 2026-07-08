import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import PageHero from "@/components/sections/page-hero";
import SecurityPoints from "@/components/sections/security-points";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("securityTitle"),
    description: t("securityDescription"),
  };
}

export default function SecurityPage() {
  return (
    <>
      <PageHero namespace="SecurityPage" />
      <SecurityPoints />
    </>
  );
}
