"use client";

import { useTranslations } from "next-intl";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

const HEADLINE_FONT = {
  fontFamily: '"Inter Display", var(--font-inter), sans-serif',
  fontWeight: 500,
  letterSpacing: "-0.02em",
} as const;

const ITEMS = ["intelligence", "ontology", "incidents"] as const;

/* it_6 — Frequently asked questions */
export default function ITFaq() {
  const t = useTranslations("CaseStudyIT.Faq");

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto w-[92%] max-w-[1080px]">
        <SectionReveal>
          <div className="flex flex-col items-center text-center">
            <h2
              className="text-3xl leading-[1.1] text-[#0A0D12] sm:text-4xl"
              style={HEADLINE_FONT}
            >
              {t("title")}
            </h2>
          </div>

          <MotionDiv variants={fadeInUp} className="mx-auto mt-12 max-w-3xl">
            <AccordionPrimitive.Root type="single" collapsible>
              {ITEMS.map((key) => (
                <AccordionPrimitive.Item
                  key={key}
                  value={key}
                  className="border-t border-[#E9EAEB] last:border-b"
                >
                  <AccordionPrimitive.Header>
                    <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-6 py-5 text-left">
                      <span className="text-base font-semibold text-[#0A0D12]">
                        {t(`items.${key}.q`)}
                      </span>
                      <Plus className="h-5 w-5 shrink-0 text-[#535862] group-data-[state=open]:hidden" />
                      <Minus className="hidden h-5 w-5 shrink-0 text-[#535862] group-data-[state=open]:block" />
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <p className="max-w-2xl pb-5 text-[15px] leading-relaxed text-[#535862]">
                      {t(`items.${key}.a`)}
                    </p>
                  </AccordionPrimitive.Content>
                </AccordionPrimitive.Item>
              ))}
            </AccordionPrimitive.Root>
          </MotionDiv>
        </SectionReveal>
      </div>
    </section>
  );
}
