import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import ITHero from "@/components/sections/case-studies/it-hero";
import ITProblem from "@/components/sections/case-studies/it-problem";
import ITOntology from "@/components/sections/case-studies/it-ontology";
import ITWorkflow from "@/components/sections/case-studies/it-workflow";
import ITPersonas from "@/components/sections/case-studies/it-personas";
import ITFaq from "@/components/sections/case-studies/it-faq";
import ITCta from "@/components/sections/case-studies/it-cta";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CaseStudyIT.Hero" });
  return {
    title: `${t("title")} — NEURON`,
    description: t("description"),
  };
}

export default function InformationTechnologyPage() {
  return (
    <>
      <ITHero />
      <ITProblem />
      <ITOntology />
      <ITWorkflow />
      <ITPersonas />
      <ITFaq />
      <ITCta />
    </>
  );
}
