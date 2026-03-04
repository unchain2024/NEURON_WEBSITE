import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import PageHero from "@/components/sections/page-hero";
import BlogGrid from "@/components/sections/blog-grid";
import FinalCTA from "@/components/sections/final-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("blogTitle"),
    description: t("blogDescription"),
  };
}

export default function BlogPage() {
  return (
    <>
      <PageHero namespace="BlogPage" />
      <BlogGrid />
      <FinalCTA />
    </>
  );
}
