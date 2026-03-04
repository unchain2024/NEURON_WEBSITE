import Hero from "@/components/sections/hero";
import TrustBar from "@/components/sections/trust-bar";
import Problem from "@/components/sections/problem";
import Features from "@/components/sections/features";
import HowItWorks from "@/components/sections/how-it-works";
import StakeholderValue from "@/components/sections/stakeholder-value";
import Testimonials from "@/components/sections/testimonials";
import FinalCTA from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Problem />
      <Features />
      <HowItWorks />
      <StakeholderValue />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
