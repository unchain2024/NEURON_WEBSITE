"use client";

import { useRef } from "react";
import { PlayCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  MotionDiv,
  MotionSection,
  fadeInUp,
  staggerContainer,
} from "@/components/motion-wrapper";
import TrustBar from "@/components/sections/trust-bar";
import NeuronBlob, { NeuronBlobMobile } from "@/components/neuron-blob";

/* ─────────────────────────────────────────────────────
   HeroText
   ───────────────────────────────────────────────────── */

function HeroText() {
  const t = useTranslations("Hero");
  const h1 = t("h1");
  const highlightWords = t("highlightWords").split(",");

  return (
    <div className="text-center lg:text-left">
      {/* Badge */}
      <MotionDiv variants={fadeInUp} className="flex justify-center lg:justify-start">
        <div className="signal-badge">
          <div className="signal-badge-border" />
          <div className="signal-badge-inner">
            <span className="signal-dot" />
            <span>{t("eyebrow")}</span>
          </div>
        </div>
      </MotionDiv>

      {/* H1 */}
      <MotionDiv variants={fadeInUp} className="mt-8">
        <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-balance text-slate-900">
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
              {highlightWords.some(
                (hw) => word.replace(/[。.]/g, "") === hw.replace(/[。.]/g, "")
              ) ? (
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
        <p className="text-lg md:text-xl text-text-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed">
          {t("h2")}
        </p>
      </MotionDiv>

      {/* CTAs */}
      <MotionDiv
        variants={fadeInUp}
        className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
      >
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Link
            href="/get-demo"
            className="inline-block bg-primary hover:bg-primary-600 text-white px-8 py-3.5 rounded-xl text-base font-semibold transition-colors shadow-lg shadow-primary/25"
          >
            {t("ctaPrimary")}
          </Link>
        </motion.div>
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
      <MotionDiv variants={fadeInUp} className="mt-8">
        <p className="text-sm text-text-muted">{t("trustLine")}</p>
      </MotionDiv>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Hero — main export
   ───────────────────────────────────────────────────── */

export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0.3]);
  const heroY = useTransform(scrollYProgress, [0.8, 1], [0, -60]);

  return (
    <>
      {/* Desktop: scroll-pinned */}
      <div ref={wrapperRef} className="hidden lg:block relative" style={{ height: "300vh" }}>
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(34,197,94,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-x-clip">
          <motion.div
            className="section-container relative z-10 w-full"
            style={{ opacity: heroOpacity, y: heroY }}
          >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                <HeroText />
              </motion.div>

              <MotionDiv
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex items-center justify-center"
              >
                <NeuronBlob scrollYProgress={scrollYProgress} />
              </MotionDiv>
            </div>

            <div className="-mt-2">
              <TrustBar />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile: normal non-sticky */}
      <MotionSection
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative section-padding overflow-x-clip lg:hidden"
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(34,197,94,0.06) 0%, transparent 70%)",
          }}
        />
        <div className="section-container relative z-10">
          <HeroText />
          <MotionDiv variants={fadeInUp} className="mt-12 flex justify-center">
            <NeuronBlobMobile />
          </MotionDiv>
        </div>
        <div className="mt-8">
          <TrustBar />
        </div>
      </MotionSection>
    </>
  );
}
