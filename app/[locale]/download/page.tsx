import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import DownloadOverviewForm from "@/components/sections/download-overview-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("downloadTitle"),
    description: t("downloadDescription"),
  };
}

export default function DownloadPage() {
  // Suspense boundary required: the form reads useSearchParams (?industry=)
  // on a statically generated page.
  return (
    <Suspense>
      <DownloadOverviewForm />
    </Suspense>
  );
}
