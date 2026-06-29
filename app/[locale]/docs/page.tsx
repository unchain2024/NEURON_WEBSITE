import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import DocCard from "@/components/docs/doc-card";
import { DOC_CARDS } from "@/lib/docs-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("docsTitle"),
    description: t("docsDescription"),
  };
}

export default async function DocsLandingPage() {
  const t = await getTranslations("Docs");

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
            {t("heroDescription")}
          </p>
        </div>
      </section>

      {/* Card grid — 3 cols × 2 rows on desktop */}
      <section className="pb-16 md:pb-24">
        <div className="section-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOC_CARDS.map((card) => (
              <DocCard
                key={card.slug}
                title={t(card.titleKey)}
                description={t(card.descriptionKey)}
                href={`/docs/${card.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-24 md:pb-32">
        <div className="section-container max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              {t("faqTitle")}
            </h2>
            <p className="mt-3 text-text-secondary">{t("faqDescription")}</p>
          </div>
        </div>
      </section>
    </>
  );
}
