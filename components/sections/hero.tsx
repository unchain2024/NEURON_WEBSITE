"use client";

import { PlayCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  MotionDiv,
  MotionSection,
  fadeInUp,
  staggerContainer,
} from "@/components/motion-wrapper";
import FlowGraph, { FlowGraphMobile } from "@/components/flow-graph";

export default function Hero() {
  const t = useTranslations("Hero");
  const h1 = t("h1");
  const highlightWords = t("highlightWords").split(",");

  return (
    <MotionSection
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="relative section-padding overflow-hidden"
    >
      {/* Soft central glow — anchors the hero without competing with canvas */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(34,197,94,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Neural signal converging into eyebrow badge */}
          <MotionDiv variants={fadeInUp} className="flex flex-col items-center">
            {/* Converging signal paths SVG */}
            <svg
              className="w-[320px] h-[100px] md:w-[400px] md:h-[120px] mb-3"
              viewBox="0 0 400 120"
              fill="none"
            >
              <defs>
                <linearGradient id="sig-line" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity="0" />
                  <stop offset="60%" stopColor="#34d399" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#34d399" stopOpacity="0.15" />
                </linearGradient>
                <radialGradient id="sig-glow">
                  <stop offset="0%" stopColor="#34d399" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Converging lines */}
              <path d="M50 0 L200 108" stroke="url(#sig-line)" strokeWidth="0.75" />
              <path d="M130 0 L200 108" stroke="url(#sig-line)" strokeWidth="0.75" />
              <path d="M200 0 L200 108" stroke="url(#sig-line)" strokeWidth="1" />
              <path d="M270 0 L200 108" stroke="url(#sig-line)" strokeWidth="0.75" />
              <path d="M350 0 L200 108" stroke="url(#sig-line)" strokeWidth="0.75" />

              {/* Source nodes at top */}
              <circle cx="50"  cy="3" r="2"   fill="#34d399" opacity="0.35" />
              <circle cx="130" cy="3" r="2.5" fill="#34d399" opacity="0.45" />
              <circle cx="200" cy="3" r="3"   fill="#34d399" opacity="0.6" />
              <circle cx="270" cy="3" r="2.5" fill="#34d399" opacity="0.45" />
              <circle cx="350" cy="3" r="2"   fill="#34d399" opacity="0.35" />

              {/* Convergence glow */}
              <circle cx="200" cy="108" r="18" fill="url(#sig-glow)" />

              {/* Traveling particles */}
              <circle r="2" fill="#6ee7b7">
                <animateMotion dur="2.2s" repeatCount="indefinite" path="M50,0 L200,108" begin="0s" />
                <animate attributeName="opacity" values="0;0.9;0.9;0" dur="2.2s" repeatCount="indefinite" begin="0s" />
              </circle>
              <circle r="2" fill="#6ee7b7">
                <animateMotion dur="1.8s" repeatCount="indefinite" path="M130,0 L200,108" begin="0.5s" />
                <animate attributeName="opacity" values="0;0.9;0.9;0" dur="1.8s" repeatCount="indefinite" begin="0.5s" />
              </circle>
              <circle r="2.5" fill="#6ee7b7">
                <animateMotion dur="1.5s" repeatCount="indefinite" path="M200,0 L200,108" begin="0.3s" />
                <animate attributeName="opacity" values="0;1;1;0" dur="1.5s" repeatCount="indefinite" begin="0.3s" />
              </circle>
              <circle r="2" fill="#6ee7b7">
                <animateMotion dur="1.8s" repeatCount="indefinite" path="M270,0 L200,108" begin="0.7s" />
                <animate attributeName="opacity" values="0;0.9;0.9;0" dur="1.8s" repeatCount="indefinite" begin="0.7s" />
              </circle>
              <circle r="2" fill="#6ee7b7">
                <animateMotion dur="2.2s" repeatCount="indefinite" path="M350,0 L200,108" begin="1s" />
                <animate attributeName="opacity" values="0;0.9;0.9;0" dur="2.2s" repeatCount="indefinite" begin="1s" />
              </circle>
            </svg>

            {/* Badge */}
            <div className="signal-badge">
              <div className="signal-badge-border" />
              <div className="signal-badge-inner">
                <span className="signal-dot" />
                <span>{t("eyebrow")}</span>
              </div>
            </div>
          </MotionDiv>

          {/* H1 — word-by-word fade with white text */}
          <MotionDiv variants={fadeInUp} className="mt-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-balance text-slate-900">
              {h1.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.3em] last:mr-0"
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: 0.4 + i * 0.08,
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                  }}
                >
                  {highlightWords.some((hw) => word.replace(/[。.]/g, "") === hw.replace(/[。.]/g, "")) ? (
                    <span className="gradient-text">{word}</span>
                  ) : (
                    word
                  )}
                </motion.span>
              ))}
            </h1>
          </MotionDiv>

          {/* Subtitle */}
          <MotionDiv variants={fadeInUp} className="mt-6">
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              {t("h2")}
            </p>
          </MotionDiv>

          {/* CTAs */}
          <MotionDiv
            variants={fadeInUp}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="#"
              className="inline-block bg-primary hover:bg-primary-600 text-white px-8 py-3.5 rounded-xl text-base font-semibold transition-colors shadow-lg shadow-primary/25"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {t("ctaPrimary")}
            </motion.a>
            <motion.a
              href="#"
              className="inline-flex items-center gap-2 border border-border hover:border-slate-400 text-slate-900 px-8 py-3.5 rounded-xl text-base font-medium transition-colors"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <PlayCircle className="h-5 w-5" />
              {t("ctaSecondary")}
            </motion.a>
          </MotionDiv>

          {/* Trust line */}
          <MotionDiv variants={fadeInUp} className="mt-8 mb-16">
            <p className="text-sm text-text-muted">{t("trustLine")}</p>
          </MotionDiv>
        </div>

        {/* Neural Flow Graph */}
        <MotionDiv variants={fadeInUp}>
          <FlowGraph />
          <FlowGraphMobile />
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
