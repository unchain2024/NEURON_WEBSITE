import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CaseStudyArticle from "@/components/sections/case-study-article";
import { CASE_STUDY_SLUGS, getCaseStudy } from "@/lib/case-studies-data";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
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
  if (!getCaseStudy(slug)) {
    notFound();
  }
  return <CaseStudyArticle slug={slug} />;
}
