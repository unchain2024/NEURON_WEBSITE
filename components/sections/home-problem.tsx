"use client";

import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

export default function HomeProblem() {
  return (
    <section className="section-padding">
      <SectionReveal>
        <div className="section-container">
          <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
            {/* ── Left: the problem statement ── */}
            <MotionDiv variants={fadeInUp}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/problem.svg"
                alt="Your best thinking disappears the moment you make it"
                width={532}
                height={476}
                className="h-auto w-full rounded-3xl"
              />
            </MotionDiv>

            {/* ── Right: connected-signal gradient panel ── */}
            <MotionDiv variants={fadeInUp}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/pain.svg"
                alt="Decisions get relitigated, risk shows up late, and the why is gone"
                width={532}
                height={476}
                className="h-auto w-full rounded-3xl"
              />
            </MotionDiv>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
