import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import AiDrivenOntologyPageClient from "./ai-driven-ontology-page-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("cognitionLayerTitle"),
    description: t("cognitionLayerDescription"),
  };
}

export default function AiDrivenOntologyPage() {
  return <AiDrivenOntologyPageClient />;
}
