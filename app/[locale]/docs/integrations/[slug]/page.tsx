import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Block from "@/components/docs/doc-block";
import DocsShell from "@/components/docs/docs-shell";
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

  // "Next" points at the following integration in the sidebar order; the last
  // one has no next link.
  const currentIndex = INTEGRATION_SLUGS.indexOf(slug);
  const nextSlug = INTEGRATION_SLUGS[currentIndex + 1];
  const next = nextSlug
    ? {
        href: `/docs/integrations/${nextSlug}`,
        label: tc("next"),
        title: ti(`${nextSlug}Title`),
      }
    : undefined;

  return (
    <DocsShell
      topics={sidebarTopics}
      activeSlug="integrations"
      activeSubSlug={slug}
      navHeading={tc("navHeading")}
      navAriaLabel={t("sidebarLabel")}
      tocItems={tocItems}
      tocLabel={t("tocLabel")}
      next={next}
    >
      <header className="mb-10">
        <div className="flex items-center gap-4">
          <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-b from-[#FAFAFA] to-[#F5F5F5]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={INTEGRATION_LOGOS[slug]}
              alt=""
              aria-hidden
              className="h-12 w-12 object-contain"
            />
          </div>
          <h1 className="font-medium text-[2rem] leading-[1.1] tracking-[-0.04em] text-slate-900">
            {t(topic.titleKey)}
          </h1>
        </div>
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
