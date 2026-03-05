import Hero from "@/components/sections/hero";
import Features from "@/components/sections/features";
import HowItWorks from "@/components/sections/how-it-works";
import StakeholderValue from "@/components/sections/stakeholder-value";
import StatsBar from "@/components/sections/stats-bar";
import Testimonials from "@/components/sections/testimonials";
import FinalCTA from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <StakeholderValue />
      <StatsBar />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
