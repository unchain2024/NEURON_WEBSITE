"use client";

import { BlurReveal, MotionDiv, blurIn } from "@/components/motion-wrapper";

const ARCHETYPE_URL = "https://www.archetype.the-neuron.com/";

export default function HomeArchetype() {
  return (
    <section>
      <BlurReveal>
        <MotionDiv variants={blurIn}>
          {/* Full-bleed archetype panel. The "Find your archetype" button is
              baked into the SVG (191×43 at x=80.5 y=366.5 in the 1440×514
              frame); we overlay a transparent link on it. */}
          <div className="relative w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/archetype.svg"
              alt="How do you make decisions when it matters most? A 3-minute experiment exploring the patterns behind how managers lead, challenge ideas, and navigate uncertainty."
              width={1440}
              height={514}
              className="block h-auto w-full"
            />
            <a
              href={ARCHETYPE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Find your archetype"
              className="absolute rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              style={{
                left: `${(80.5 / 1440) * 100}%`,
                top: `${(366.5 / 514) * 100}%`,
                width: `${(191 / 1440) * 100}%`,
                height: `${(43 / 514) * 100}%`,
              }}
            />
          </div>
        </MotionDiv>
      </BlurReveal>
    </section>
  );
}
