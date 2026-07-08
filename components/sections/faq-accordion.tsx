"use client";

import { useTranslations } from "next-intl";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

const HEADLINE_FONT = {
  fontFamily: '"Inter Display", var(--font-inter), sans-serif',
  fontWeight: 600,
  letterSpacing: "-0.02em",
} as const;

interface FaqItem {
  q: string;
  a: string;
}

/**
 * Generic FAQ section that reads `faqTitle` (string) and `faqItems`
 * (array of { q, a }) from the given translation namespace via t.raw.
 */
export default function FaqAccordion({ namespace }: { namespace: string }) {
  const t = useTranslations(namespace);
  const items = (t.raw("faqItems") as FaqItem[]) ?? [];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto w-[92%] max-w-[1080px]">
        <SectionReveal>
          <div className="flex flex-col items-center text-center">
            <h2
              className="text-3xl leading-[1.1] text-[#0A0D12] sm:text-4xl"
              style={HEADLINE_FONT}
            >
              {t("faqTitle")}
            </h2>
          </div>

          <MotionDiv variants={fadeInUp} className="mx-auto mt-12 max-w-3xl">
            <AccordionPrimitive.Root type="single" collapsible>
              {items.map((item, i) => (
                <AccordionPrimitive.Item
                  key={i}
                  value={String(i)}
                  className="border-t border-[#E9EAEB] last:border-b"
                >
                  <AccordionPrimitive.Header>
                    <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-6 py-5 text-left">
                      <span className="text-base font-semibold text-[#0A0D12]">
                        {item.q}
                      </span>
                      <Plus className="h-5 w-5 shrink-0 text-[#535862] transition-transform group-data-[state=open]:hidden" />
                      <Minus className="hidden h-5 w-5 shrink-0 text-[#535862] group-data-[state=open]:block" />
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <p className="max-w-2xl pb-5 text-[15px] leading-relaxed text-[#535862]">
                      {item.a}
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
