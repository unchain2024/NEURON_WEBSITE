"use client";

import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";
import { FAQ_KEYS } from "@/lib/pricing-data";

export default function PricingFaq() {
  const t = useTranslations("Pricing");

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
              {FAQ_KEYS.map((key) => {
                const capKey = key.charAt(0).toUpperCase() + key.slice(1);
                return (
                  <AccordionItem key={key} value={key}>
                    <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline">
                      {t(`faq${capKey}Q`)}
                    </AccordionTrigger>
                    <AccordionContent className="text-text-secondary leading-relaxed">
                      {t(`faq${capKey}A`)}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </MotionDiv>
        </div>
      </SectionReveal>
    </section>
  );
}
