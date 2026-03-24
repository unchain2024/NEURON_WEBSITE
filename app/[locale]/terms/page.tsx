import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import TermsContent from "@/components/sections/terms-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("termsTitle"),
    description: t("termsDescription"),
  };
}

export default function TermsPage() {
  return <TermsContent />;
}
