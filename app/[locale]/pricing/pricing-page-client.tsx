"use client";

import { useState } from "react";
import PricingControls from "@/components/sections/pricing-controls";
import PricingCards from "@/components/sections/pricing-cards";
import PricingFeatureComparison from "@/components/sections/pricing-feature-comparison";
import PricingEnterpriseSection from "@/components/sections/pricing-enterprise-section";
import PricingFaq from "@/components/sections/pricing-faq";

export default function PricingPageClient() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "annual"
  );
  const [seats, setSeats] = useState(3);
  const [role, setRole] = useState<"pm" | "engineer">("pm");

  return (
    <>
      <PricingControls
        billingCycle={billingCycle}
        onBillingCycleChange={setBillingCycle}
        seats={seats}
        onSeatsChange={setSeats}
        role={role}
        onRoleChange={setRole}
      />
      <PricingCards billingCycle={billingCycle} seats={seats} role={role} />
      <PricingFeatureComparison />
      <PricingEnterpriseSection />
      <PricingFaq />
    </>
  );
}
