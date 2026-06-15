import Hero from "@/components/sections/hero";
import HomeProblem from "@/components/sections/home-problem";
import HomeWhatIs from "@/components/sections/home-what-is";
import HomeCapabilities from "@/components/sections/home-capabilities";
import HomeRoles from "@/components/sections/home-roles";
import HomeGame from "@/components/sections/home-game";
import ComparisonTable from "@/components/sections/comparison-table";
import HowItWorks from "@/components/sections/how-it-works";
import Testimonials from "@/components/sections/testimonials";
import HomeSecurityStrip from "@/components/sections/home-security-strip";
import FinalCTA from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      {/* 1.1 Hero + 1.2 Trust bar (TrustBar is rendered inside Hero) */}
      <Hero />
      {/* 1.3 The problem */}
      <HomeProblem />
      {/* 1.4 What NEURON is */}
      <HomeWhatIs />
      {/* 1.5 Capabilities */}
      <HomeCapabilities />
      {/* 1.6 Built for every decision-maker */}
      <HomeRoles />
      {/* 1.6b Interactive game — Manager Archetype Finder */}
      <HomeGame />
      {/* 1.7 Why not just a wiki or AI search */}
      <ComparisonTable />
      {/* 1.8 How it works */}
      <HowItWorks />
      {/* 1.9 Social proof */}
      <Testimonials />
      {/* 1.10 Security strip */}
      <HomeSecurityStrip />
      {/* 1.11 Final CTA */}
      <FinalCTA />
    </>
  );
}
