import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Block from "@/components/docs/doc-block";
import DocsShell from "@/components/docs/docs-shell";
import {
  docsConfig,
  INTEGRATION_SLUGS,
  SIDEBAR_TOPICS,
} from "@/lib/docs-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("docsQuickStartTitle"),
    description: t("docsQuickStartDescription"),
  };
}

export default async function QuickStartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const topic = docsConfig["quick-start"];
  const t = await getTranslations(topic.namespace);
  const tc = await getTranslations("Docs");
  const ti = await getTranslations("DocsIntegrations");

  // Pre-resolve translated topics for the sidebar so the client component
  // stays dumb (it just renders strings).
  const sidebarTopics = await Promise.all(
    SIDEBAR_TOPICS.map(async (parent) => {
      const tt = await getTranslations(parent.namespace);
      return {
        slug: parent.slug,
        title: tt(parent.titleKey),
        subtopics: parent.subtopics.map((sub) => ({
          slug: sub.slug,
          title: tt(sub.titleKey),
        })),
      };
    }),
  );

  const tocItems = topic.sections.map((s) => ({
    id: s.id,
    title: t(s.titleKey),
  }));

  return (
    <DocsShell
      topics={sidebarTopics}
      activeSlug={topic.slug}
      navHeading={tc("navHeading")}
      navAriaLabel={t("sidebarLabel")}
      tocItems={tocItems}
      tocLabel={t("tocLabel")}
      next={{
        href: `/docs/integrations/${INTEGRATION_SLUGS[0]}`,
        label: tc("next"),
        title: ti("title"),
      }}
    >
      <header className="mb-10">
        <h1 className="font-medium text-[2rem] leading-[1.1] tracking-[-0.04em] text-slate-900">
          {t(topic.titleKey)}
        </h1>
        <p className="mt-4 font-normal text-base leading-none tracking-normal text-text-secondary">
          {t("description")}
        </p>
      </header>

      <div className="space-y-12">
        {topic.sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <h2 className="font-medium text-2xl leading-[1.1] tracking-[-0.04em] text-slate-900 mb-4">
              {t(section.titleKey)}
            </h2>
            <div className="space-y-4">
              {section.blocks.map((block, idx) => (
                <Block key={idx} block={block} t={t} locale={locale} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </DocsShell>
  );
}
