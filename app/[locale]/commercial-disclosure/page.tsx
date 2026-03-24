import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import CommercialDisclosureContent from "@/components/sections/commercial-disclosure-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("commercialDisclosureTitle"),
    description: t("commercialDisclosureDescription"),
  };
}

export default function CommercialDisclosurePage() {
  return <CommercialDisclosureContent />;
}
