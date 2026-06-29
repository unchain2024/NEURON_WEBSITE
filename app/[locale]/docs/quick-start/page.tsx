import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Block from "@/components/docs/doc-block";
import DocsSidebar from "@/components/docs/docs-sidebar";
import TableOfContents from "@/components/docs/table-of-contents";
import { docsConfig, SIDEBAR_TOPICS } from "@/lib/docs-config";

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
    <div className="relative pt-20 md:pt-24 pb-16 scroll-smooth">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_220px] gap-8 xl:gap-12">
          {/* Left: sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
              <DocsSidebar
                topics={sidebarTopics}
                activeSlug={topic.slug}
                ariaLabel={t("sidebarLabel")}
              />
            </div>
          </aside>

          {/* Middle: content */}
          <article className="min-w-0 max-w-3xl">
            <header className="mb-10">
              <p className="text-sm font-medium text-primary uppercase tracking-wide mb-3">
                {t("heroEyebrow")}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                {t(topic.titleKey)}
              </h1>
              <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed">
                {t("description")}
              </p>
            </header>

            <div className="space-y-12">
              {topic.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24"
                >
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 mb-4">
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
          </article>

          {/* Right: table of contents */}
          <aside className="hidden xl:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
              <TableOfContents items={tocItems} label={t("tocLabel")} />
            </div>
          </aside>
        </div>

        {/* Mobile TOC — appears below content on small screens */}
        <div className="xl:hidden mt-12 rounded-2xl border border-slate-200/70 bg-white/80 p-5">
          <TableOfContents items={tocItems} label={t("tocLabel")} />
        </div>
      </div>
    </div>
  );
}
