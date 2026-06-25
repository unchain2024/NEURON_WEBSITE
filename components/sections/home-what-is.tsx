"use client";

import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

/* The whole "What is NEURON" section is delivered as a single full-bleed
   artwork (1440×1092). The "How it works" button is baked into the art at
   x=1104.5 y=968.5 w=155 h=43; we overlay a transparent, real button on that
   exact region (positioned as % of the frame so it stays aligned at any
   width). It's a no-op for now — clicking it does nothing. */
export default function HomeWhatIs() {
  return (
    <section id="what-is" className="relative overflow-hidden bg-[#0A0D12]">
      <SectionReveal>
        <MotionDiv variants={fadeInUp} className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Section.svg"
            alt="What is NEURON — the AI-driven ontology that turns decisions into a connected layer"
            width={1440}
            height={1092}
            className="block h-auto w-full"
          />
          <button
            type="button"
            aria-label="How it works"
            className="absolute cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            style={{
              left: `${(1104.5 / 1440) * 100}%`,
              top: `${(968.5 / 1092) * 100}%`,
              width: `${(155 / 1440) * 100}%`,
              height: `${(43 / 1092) * 100}%`,
            }}
          />
        </MotionDiv>
      </SectionReveal>
    </section>
  );
}
