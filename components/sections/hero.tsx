"use client";

import { useState, useCallback, useEffect } from "react";
import { PlayCircle, X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { MotionDiv, MotionSection, fadeInUp, staggerContainer } from "@/components/motion-wrapper";
import HeroFlow, { HeroFlowMobile } from "@/components/sections/hero-flow";

/* ─────────────────────────────────────────────────────
   VideoModal
   ───────────────────────────────────────────────────── */

function VideoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const locale = useLocale();
  const videoSrc = locale === "ja" ? "/demo-ja.mp4" : "/demo-en.mp4";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-[90vw] max-w-4xl aspect-video"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/80 hover:text-white transition-colors"
          aria-label="Close video"
        >
          <X className="h-7 w-7" />
        </button>
        <video src={videoSrc} controls autoPlay className="w-full h-full rounded-xl shadow-2xl" />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   Headline + CTAs (shared between desktop & mobile)
   ───────────────────────────────────────────────────── */

function HeroHeadline({ onWatchDemo }: { onWatchDemo: () => void }) {
  const t = useTranslations("Hero");
  const h1 = t("h1");

  return (
    <div className="section-container relative z-10 text-center">
      <MotionDiv variants={fadeInUp}>
        <h1
          className="mx-auto max-w-5xl text-balance text-slate-900"
          style={{
            fontFamily: '"Inter Display", var(--font-inter), sans-serif',
            fontWeight: 500,
            fontStyle: "normal",
            fontSize: "clamp(2.5rem, 9vw, 64px)",
            lineHeight: "100%",
            letterSpacing: "-0.04em",
            textAlign: "center",
          }}
        >
          {h1.split(" ").map((word, i) => (
            <motion.span
              key={i}
              className="mr-[0.22em] inline-block last:mr-0"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.2 + i * 0.08, type: "spring", stiffness: 150, damping: 15 }}
            >
              {word}
            </motion.span>
          ))}
        </h1>
      </MotionDiv>

      <MotionDiv variants={fadeInUp} className="mt-3">
        <p
          className="mx-auto max-w-2xl text-text-secondary"
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: "16px",
            lineHeight: "100%",
            letterSpacing: "0%",
            textAlign: "center",
          }}
        >
          {t("h2")}
        </p>
      </MotionDiv>

      <MotionDiv variants={fadeInUp} className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <motion.div
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Link
            href="/get-demo"
            className="inline-flex items-center justify-center rounded-full bg-black px-7 py-3 text-[15px] font-medium text-white transition-colors hover:bg-slate-800"
          >
            {t("ctaPrimary")}
          </Link>
        </motion.div>
        <motion.button
          onClick={onWatchDemo}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3 text-[15px] font-medium text-slate-900 transition-colors hover:border-slate-300"
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <PlayCircle className="h-5 w-5" />
          {t("ctaSecondary")}
        </motion.button>
        {/* Download overview — placeholder for now; wire up the asset link later. */}
        <motion.button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3 text-[15px] font-medium text-slate-900 transition-colors hover:border-slate-300"
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          {t("ctaDownload")}
        </motion.button>
      </MotionDiv>
    </div>
  );
}

/* Full-section green base, anchored to the bottom edge so it always reaches
   the viewport bottom (colour #3D8F66, lifted from the wireframe SVG). */
function SectionGlow() {
  return (
    <>
      {/* Soft, even mint-green base rising from the bottom edge.
          Bleeds 2px past the bottom to avoid a hairline seam with the next section. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -bottom-0.5"
        style={{
          background:
            "linear-gradient(to top, rgba(61,143,102,0.46) 0%, rgba(61,143,102,0.30) 24%, rgba(61,143,102,0.14) 46%, rgba(61,143,102,0.04) 64%, transparent 80%)",
        }}
      />
      {/* Gentle green pooling toward the bottom-centre, fading to the edges */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -bottom-0.5"
        style={{
          background:
            "radial-gradient(100% 80% at 50% 104%, rgba(61,143,102,0.30) 0%, rgba(61,143,102,0.10) 48%, transparent 74%)",
        }}
      />
    </>
  );
}

/* ─────────────────────────────────────────────────────
   Hero
   ───────────────────────────────────────────────────── */

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);
  const closeVideo = useCallback(() => setShowVideo(false), []);

  return (
    <>
      <MotionSection
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative flex min-h-screen flex-col justify-center overflow-x-clip pt-4 pb-32"
      >
        <SectionGlow />
        <HeroHeadline onWatchDemo={() => setShowVideo(true)} />

        <div className="relative mt-6">
          <div className="section-container relative z-10">
            {/* Desktop: animated canvas */}
            <div className="hidden lg:block">
              <HeroFlow />
            </div>
            {/* Mobile / tablet: stacked */}
            <div className="lg:hidden">
              <MotionDiv variants={fadeInUp}>
                <HeroFlowMobile />
              </MotionDiv>
            </div>
          </div>
        </div>
      </MotionSection>

      <AnimatePresence>
        <VideoModal open={showVideo} onClose={closeVideo} />
      </AnimatePresence>
    </>
  );
}
