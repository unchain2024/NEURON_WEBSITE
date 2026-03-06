import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogArticle from "@/components/sections/blog-article";
import FinalCTA from "@/components/sections/final-cta";

const VALID_SLUGS = ["article1", "article2", "article3", "article4"] as const;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!VALID_SLUGS.includes(slug as (typeof VALID_SLUGS)[number])) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: "Blog" });
  return {
    title: t(`${slug}Title`),
    description: t(`${slug}Excerpt`),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug as (typeof VALID_SLUGS)[number])) {
    notFound();
  }

  return (
    <>
      <BlogArticle slug={slug} />
      <FinalCTA />
    </>
  );
}
