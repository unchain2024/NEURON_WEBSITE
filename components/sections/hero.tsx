"use client";

import { PlayCircle } from "lucide-react";
import { HERO } from "@/lib/constants";
import {
  MotionDiv,
  MotionSection,
  fadeInUp,
  staggerContainer,
} from "@/components/motion-wrapper";
import FloatingOrbs from "@/components/floating-orbs";
import MouseSpotlight from "@/components/mouse-spotlight";
import LetterReveal from "@/components/letter-reveal";
import FlowGraph, { FlowGraphMobile } from "@/components/flow-graph";

export default function Hero() {
  return (
    <MotionSection
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="relative section-padding overflow-hidden"
    >
      {/* Floating orbs background */}
      <FloatingOrbs />

      {/* Background radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Mouse-following spotlight */}
      <MouseSpotlight />

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <MotionDiv variants={fadeInUp}>
            <span className="inline-block shimmer-badge text-primary text-sm font-medium px-4 py-1.5 rounded-full border border-primary/20">
              {HERO.eyebrow}
            </span>
          </MotionDiv>

          {/* H1 — Staggered letter reveal with animated gradient */}
          <MotionDiv variants={fadeInUp} className="mt-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-balance gradient-text-animated">
              <LetterReveal text={HERO.h1} />
            </h1>
          </MotionDiv>

          {/* H2 */}
          <MotionDiv variants={fadeInUp} className="mt-6">
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              {HERO.h2}
            </p>
          </MotionDiv>

          {/* CTAs */}
          <MotionDiv
            variants={fadeInUp}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MotionDiv
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <a
                href="#"
                className="inline-block bg-primary hover:bg-primary-600 text-white px-8 py-3.5 rounded-xl text-base font-semibold transition-colors shadow-lg shadow-primary/25"
              >
                {HERO.ctaPrimary}
              </a>
            </MotionDiv>
            <MotionDiv
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <a
                href="#"
                className="inline-flex items-center gap-2 border border-border hover:border-text-secondary text-white px-8 py-3.5 rounded-xl text-base font-medium transition-colors"
              >
                <PlayCircle className="h-5 w-5" />
                {HERO.ctaSecondary}
              </a>
            </MotionDiv>
          </MotionDiv>

          {/* Trust line */}
          <MotionDiv variants={fadeInUp} className="mt-8 mb-16">
            <p className="text-sm text-text-muted">{HERO.trustLine}</p>
          </MotionDiv>
        </div>

        {/* ─── Animated Flow Graph ─── */}
        <MotionDiv variants={fadeInUp}>
          <FlowGraph />
          <FlowGraphMobile />
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
