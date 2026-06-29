import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import DocCard from "@/components/docs/doc-card";
import { INTEGRATION_LOGOS, INTEGRATION_SLUGS } from "@/lib/docs-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("docsIntegrationsTitle"),
    description: t("docsIntegrationsDescription"),
  };
}

export default async function IntegrationsIndexPage() {
  const t = await getTranslations("DocsIntegrations");

  return (
    <>
      {/* Header */}
      <section className="relative section-padding pt-24 md:pt-32 pb-12 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        </div>
        <div className="section-container relative z-10 max-w-3xl mx-auto text-center">
          <span className="inline-block text-sm font-medium text-primary tracking-wide uppercase mb-4">
            {t("heroEyebrow")}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            {t.rich("heroTitle", {
              highlight: (chunks) => (
                <span className="gradient-text">{chunks}</span>
              ),
            })}
          </h1>
          <p className="text-lg md:text-xl text-text-secondary">
            {t("description")}
          </p>
        </div>
      </section>

      {/* Card grid */}
      <section className="pb-24 md:pb-32">
        <div className="section-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INTEGRATION_SLUGS.map((slug) => (
              <DocCard
                key={slug}
                title={t(`${slug}Title`)}
                description={t(`${slug}Description`)}
                href={`/docs/integrations/${slug}`}
                logoSrc={INTEGRATION_LOGOS[slug]}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
