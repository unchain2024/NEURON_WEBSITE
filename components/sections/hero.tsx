"use client";

import { PlayCircle } from "lucide-react";
import { HERO } from "@/lib/constants";
import {
  MotionDiv,
  MotionSection,
  fadeInUp,
  staggerContainer,
  scaleIn,
} from "@/components/motion-wrapper";
import FloatingOrbs from "@/components/floating-orbs";
import MouseSpotlight from "@/components/mouse-spotlight";
import FloatingBadges from "@/components/floating-badges";
import LetterReveal from "@/components/letter-reveal";

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

      {/* Floating tech badges */}
      <FloatingBadges />

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

          {/* CTAs — with hover spring animation */}
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
          <MotionDiv variants={fadeInUp} className="mt-8">
            <p className="text-sm text-text-muted">{HERO.trustLine}</p>
          </MotionDiv>
        </div>

        {/* Dashboard Mockup — with scale-in and floating effect */}
        <MotionDiv
          variants={scaleIn}
          className="mt-16 max-w-5xl mx-auto"
          whileInView={{
            y: [0, -6, 0],
            transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <div className="glass-card p-6 md:p-8 relative overflow-hidden">
            {/* Subtle animated border glow */}
            <div className="absolute inset-0 rounded-2xl opacity-50">
              <div
                className="absolute inset-0 rounded-2xl animate-spin-slow"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0%, rgba(99,102,241,0.3) 25%, transparent 50%, rgba(139,92,246,0.3) 75%, transparent 100%)",
                  filter: "blur(20px)",
                }}
              />
            </div>

            <div className="rounded-xl bg-surface border border-border/50 p-6 relative z-10">
              {/* Mockup header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-red-500/70" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/70" />
                  <div className="h-3 w-3 rounded-full bg-green-500/70" />
                </div>
                <div className="text-xs text-text-muted font-mono">UNCHAIN Dashboard</div>
              </div>

              {/* Mockup decision card */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-4">
                  <div className="glass-card-light p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-medium">
                        Decision Brief
                      </span>
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-medium">
                        High Confidence
                      </span>
                    </div>
                    <div className="h-3 w-3/4 bg-white/10 rounded mb-2" />
                    <div className="h-3 w-1/2 bg-white/10 rounded mb-4" />
                    <div className="flex gap-2">
                      <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">
                        Agent: Analyst
                      </span>
                      <span className="text-[10px] bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full">
                        Agent: Challenger
                      </span>
                      <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full">
                        Agent: Synthesizer
                      </span>
                    </div>
                  </div>
                  <div className="glass-card-light p-4">
                    <div className="h-3 w-full bg-white/10 rounded mb-2" />
                    <div className="h-3 w-5/6 bg-white/10 rounded mb-2" />
                    <div className="h-3 w-2/3 bg-white/10 rounded" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="glass-card-light p-4">
                    <div className="text-xs text-text-muted mb-2">Signal Sources</div>
                    <div className="space-y-2">
                      {["Slack", "Jira", "Interviews"].map((s) => (
                        <div key={s} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span className="text-xs text-text-secondary">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="glass-card-light p-4">
                    <div className="text-xs text-text-muted mb-2">Confidence</div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-[87%] bg-gradient-to-r from-primary to-violet-500 rounded-full" />
                    </div>
                    <div className="text-right text-xs text-primary mt-1">87%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
