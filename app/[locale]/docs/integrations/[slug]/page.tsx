import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Block from "@/components/docs/doc-block";
import DocsSidebar from "@/components/docs/docs-sidebar";
import TableOfContents from "@/components/docs/table-of-contents";
import { routing } from "@/i18n/routing";
import {
  getIntegrationTopic,
  INTEGRATION_LOGOS,
  INTEGRATION_SLUGS,
  SIDEBAR_TOPICS,
  type IntegrationSlug,
} from "@/lib/docs-config";

// Capitalised camel-case form used in metadata keys (e.g. recallai → Recallai).
function metadataKey(slug: IntegrationSlug): string {
  return `docsIntegration${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
}

function isIntegrationSlug(value: string): value is IntegrationSlug {
  return (INTEGRATION_SLUGS as readonly string[]).includes(value);
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    INTEGRATION_SLUGS.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isIntegrationSlug(slug)) return {};
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const key = metadataKey(slug);
  return {
    title: t(`${key}Title`),
    description: t(`${key}Description`),
  };
}

export default async function IntegrationDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isIntegrationSlug(slug)) notFound();

  const topic = getIntegrationTopic(slug);
  if (!topic) notFound();

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
                activeSlug="integrations"
                activeSubSlug={slug}
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
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white p-2 ring-1 ring-slate-200/70 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={INTEGRATION_LOGOS[slug]}
                    alt=""
                    aria-hidden
                    className="h-full w-full object-contain"
                  />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                  {t(topic.titleKey)}
                </h1>
              </div>
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
