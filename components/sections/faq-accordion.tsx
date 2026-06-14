"use client";

import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

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
    <section className="section-padding">
      <SectionReveal>
        <div className="section-container">
          <MotionDiv variants={fadeInUp} className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              {t("faqTitle")}
            </h2>
          </MotionDiv>

          <MotionDiv variants={fadeInUp} className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible>
              {items.map((item, i) => (
                <AccordionItem key={i} value={String(i)}>
                  <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-text-secondary leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </MotionDiv>
        </div>
      </SectionReveal>
    </section>
  );
}
