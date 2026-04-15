import Hero from "@/components/sections/hero";
import PainPoints from "@/components/sections/pain-points";
import HowItWorks from "@/components/sections/how-it-works";
import NeuronForPM from "@/components/sections/neuron-for-pm";
import NeuronForEng from "@/components/sections/neuron-for-eng";
import CollaborationSection from "@/components/sections/collaboration-section";
import IndustryUseCases from "@/components/sections/industry-use-cases";
import StakeholderValue from "@/components/sections/stakeholder-value";
import StatsBar from "@/components/sections/stats-bar";
import FinalCTA from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <PainPoints />
      <NeuronForPM />
      <NeuronForEng />
      <CollaborationSection />
      <IndustryUseCases />
      <HowItWorks />
      <StakeholderValue />
      <StatsBar />
      <FinalCTA />
    </>
  );
}
