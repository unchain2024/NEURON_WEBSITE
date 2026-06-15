"use client";

import PricingOffering from "@/components/sections/pricing-offering";
import FaqAccordion from "@/components/sections/faq-accordion";

export default function PricingPageClient() {
  return (
    <>
      <PricingOffering />
      <FaqAccordion namespace="PricingPage" />
    </>
  );
}
