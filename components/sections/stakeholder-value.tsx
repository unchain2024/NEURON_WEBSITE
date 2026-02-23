"use client";

import { STAKEHOLDER_CARDS } from "@/lib/constants";
import { BlurReveal, MotionDiv, blurIn } from "@/components/motion-wrapper";
import TiltCard from "@/components/tilt-card";

export default function StakeholderValue() {
  return (
    <section className="section-padding">
      <BlurReveal>
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <MotionDiv variants={blurIn}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Built for every decision-maker on your team
              </h2>
            </MotionDiv>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {STAKEHOLDER_CARDS.map((card) => (
              <MotionDiv key={card.role} variants={blurIn}>
                <TiltCard className="h-full group">
                  <div className="gradient-border-hover rounded-2xl h-full">
                    <div className="glass-card p-6 md:p-8 h-full relative overflow-hidden">
                      {/* Hover glow */}
                      <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2"
                        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)" }}
                      />
                      <div className="relative z-10">
                        <div className="p-2.5 rounded-xl bg-primary/10 w-fit mb-4">
                          <card.icon className="h-6 w-6 text-primary" />
                        </div>
                        <p className="text-sm text-primary font-medium mb-2">{card.role}</p>
                        <h3 className="text-lg font-semibold mb-3">{card.title}</h3>
                        <p className="text-text-secondary leading-relaxed">{card.description}</p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </MotionDiv>
            ))}
          </div>
        </div>
      </BlurReveal>
    </section>
  );
}
