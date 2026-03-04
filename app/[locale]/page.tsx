import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import TrustBar from "@/components/sections/trust-bar";
import Problem from "@/components/sections/problem";
import Features from "@/components/sections/features";
import HowItWorks from "@/components/sections/how-it-works";
import StakeholderValue from "@/components/sections/stakeholder-value";
import Testimonials from "@/components/sections/testimonials";

import FinalCTA from "@/components/sections/final-cta";
import Footer from "@/components/sections/footer";
import ScrollProgress from "@/components/scroll-progress";
import NeuralCanvas from "@/components/neural-canvas";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      {/* Living neural network — spans entire page */}
      <NeuralCanvas />

      <ScrollProgress />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <TrustBar />
        <Problem />
        <Features />
        <HowItWorks />
        <StakeholderValue />
        <Testimonials />

        <FinalCTA />
        <Footer />
      </div>
    </main>
  );
}
