"use client";

import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export interface FAQItemProps {
  id: string;
  question: string;
  answer: string;
}

// Thin wrapper around the shared <Accordion> primitive so docs-specific
// styling lives in one place and the component remains reusable.
export default function FAQItem({ id, question, answer }: FAQItemProps) {
  return (
    <AccordionItem value={id} className="border-b border-slate-200/70">
      <AccordionTrigger className="py-5 text-left text-base font-semibold text-slate-900 hover:no-underline">
        {question}
      </AccordionTrigger>
      <AccordionContent className="pb-5 text-sm leading-relaxed text-text-secondary">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
}
