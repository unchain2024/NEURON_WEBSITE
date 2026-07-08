import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CaseStudyArticle from "@/components/sections/case-study-article";
import CSPage from "@/components/sections/case-studies/cs-page";
import { CASE_STUDY_SLUGS, getCaseStudy } from "@/lib/case-studies-data";
import { isMigrated } from "@/lib/case-study-pages";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  // `information-technology` has a dedicated static route (its own redesigned
  // page), so exclude it here to avoid a route conflict.
  return CASE_STUDY_SLUGS.filter((slug) => slug !== "information-technology").map(
    (slug) => ({ slug })
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const meta = getCaseStudy(slug);
  if (!meta) return {};
  const t = await getTranslations({ locale, namespace: "CaseStudies" });
  const article = t.raw(meta.i18nKey) as { headline: string; intro: string };
  return {
    title: `${article.headline} — NEURON`,
    description: article.intro,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const meta = getCaseStudy(slug);
  if (!meta) {
    notFound();
  }
  if (isMigrated(slug)) {
    return <CSPage k={meta.i18nKey} sector={meta.sector} />;
  }
  return <CaseStudyArticle slug={slug} />;
}
