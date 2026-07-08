"use client";

import { useTranslations } from "next-intl";
import { ShieldCheck, EyeOff, Zap } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";
import IntegrationCloud from "@/components/sections/integration-cloud";

const HERO_PILLS = [
  { key: "oauth", Icon: ShieldCheck },
  { key: "readonly", Icon: EyeOff },
  { key: "minutes", Icon: Zap },
] as const;

interface FaqItem {
  q: string;
  a: string;
}

export default function IntegrationsHub() {
  const t = useTranslations("IntegrationsPage");
  const faqItems = (t.raw("faqItems") as FaqItem[]) ?? [];

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/5 blur-[130px]" />
        </div>
        <div className="section-container relative z-10">
          <MotionDiv
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12, delayChildren: 0.05 },
              },
            }}
            className="mx-auto max-w-3xl text-center"
          >
            <MotionDiv variants={fadeInUp}>
              <span className="inline-flex items-center rounded-full border border-[#E9EAEB] bg-white px-4 py-1.5 text-sm font-medium text-[#0A0D12] shadow-sm">
                {t("heroEyebrow")}
              </span>
            </MotionDiv>

            <MotionDiv variants={fadeInUp}>
              <h1 className="mt-6 text-4xl font-medium leading-[1] tracking-[-0.04em] text-[#0A0D12] md:text-5xl lg:text-[64px]">
                {t.rich("heroTitle", {
                  highlight: (chunks) => <span>{chunks}</span>,
                })}
              </h1>
            </MotionDiv>

            <MotionDiv variants={fadeInUp}>
              <p className="mx-auto mt-6 max-w-xl text-base font-normal leading-none tracking-normal text-[#414651]">
                {t("heroDescription")}
              </p>
            </MotionDiv>

            <MotionDiv variants={fadeInUp} className="mt-8 flex justify-center">
              <div
                className="inline-flex flex-wrap items-center justify-center gap-x-7 gap-y-3 rounded-full border border-[#E9EAEB] px-6 py-3 shadow-sm"
                style={{
                  background:
                    "linear-gradient(180deg, #FFFFFF 0%, #F6F6F6 100%)",
                }}
              >
                {HERO_PILLS.map(({ key, Icon }) => (
                  <span
                    key={key}
                    className="inline-flex items-center gap-2.5 text-sm font-medium text-[#0A0D12]"
                  >
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full shadow-[0_1px_2px_rgba(28,168,88,0.4)]"
                      style={{
                        background:
                          "linear-gradient(180deg, #53E591 0%, #1CA858 100%)",
                      }}
                    >
                      <Icon className="h-4 w-4 text-white" strokeWidth={2.25} />
                    </span>
                    {t(`heroPills.${key}`)}
                  </span>
                ))}
              </div>
            </MotionDiv>
          </MotionDiv>
        </div>
      </section>

      {/* ─── Honeycomb logo cloud ─── */}
      <IntegrationCloud />

      {/* ─── FAQ ─── */}
      <section className="section-padding">
        <SectionReveal>
          <div className="section-container">
            <MotionDiv variants={fadeInUp} className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {t("faqTitle")}
              </h2>
            </MotionDiv>

            <MotionDiv variants={fadeInUp} className="mx-auto max-w-2xl">
              <Accordion type="single" collapsible>
                {faqItems.map((item, i) => (
                  <AccordionItem key={i} value={String(i)}>
                    <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="leading-relaxed text-text-secondary">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </MotionDiv>
          </div>
        </SectionReveal>
      </section>
    </>
  );
}
