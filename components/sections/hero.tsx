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
          {/* Eyebrow badge */}
          <MotionDiv variants={fadeInUp}>
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
