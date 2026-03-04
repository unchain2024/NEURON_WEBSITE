"use client";

import { useRef } from "react";
import { PlayCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { useState } from "react";
import {
  MotionDiv,
  MotionSection,
  fadeInUp,
  staggerContainer,
} from "@/components/motion-wrapper";
import FlowGraph from "@/components/flow-graph";

/* ─────────────────────────────────────────────────────
   Absorption Logos — 8 integration logos in a circle
   ───────────────────────────────────────────────────── */

const ABSORPTION_LOGOS = [
  { name: "Slack", src: "/logos/slack.svg" },
  { name: "Jira", src: "/logos/jira.svg" },
  { name: "Notion", src: "/logos/notion.svg" },
  { name: "Linear", src: "/logos/linear.svg" },
  { name: "GitHub", src: "/logos/github.svg" },
  { name: "Figma", src: "/logos/figma.svg" },
  { name: "Confluence", src: "/logos/confluence.svg" },
  { name: "HubSpot", src: "/logos/hubspot.svg" },
];

const CIRCLE_RADIUS = 170;

/** Pre-computed circle positions (start from top, go clockwise) */
const logoPositions = ABSORPTION_LOGOS.map((_, i) => {
  const angle = (i * 2 * Math.PI) / 8 - Math.PI / 2;
  return {
    x: CIRCLE_RADIUS * Math.cos(angle),
    y: CIRCLE_RADIUS * Math.sin(angle),
  };
});

/* ─────────────────────────────────────────────────────
   AbsorptionLogo — single logo that flies toward center
   ───────────────────────────────────────────────────── */

function AbsorptionLogo({
  logo,
  index,
  scrollYProgress,
  circleX,
  circleY,
}: {
  logo: (typeof ABSORPTION_LOGOS)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
  circleX: number;
  circleY: number;
}) {
  const startScroll = 0.05 + index * 0.06;
  const endScroll = startScroll + 0.12;

  const rawX = useTransform(
    scrollYProgress,
    [startScroll, endScroll],
    [circleX, 0]
  );
  const rawY = useTransform(
    scrollYProgress,
    [startScroll, endScroll],
    [circleY, 0]
  );
  const rawScale = useTransform(
    scrollYProgress,
    [startScroll, endScroll],
    [1, 0]
  );
  const opacity = useTransform(
    scrollYProgress,
    [startScroll, endScroll - 0.03, endScroll],
    [1, 0.8, 0]
  );

  const x = useSpring(rawX, { stiffness: 300, damping: 30 });
  const y = useSpring(rawY, { stiffness: 300, damping: 30 });
  const scale = useSpring(rawScale, { stiffness: 300, damping: 30 });

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        x,
        y,
        scale,
        opacity,
        marginLeft: -22,
        marginTop: -22,
      }}
    >
      {/* Idle float */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 3 + (index % 3) * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.3,
        }}
      >
        <div className="w-[44px] h-[44px] rounded-xl bg-white border border-slate-200 shadow-md flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo.src} alt={logo.name} className="w-7 h-7" />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   AbsorptionVisual — blob + glow + logos
   ───────────────────────────────────────────────────── */

function AbsorptionVisual({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const [flashKey, setFlashKey] = useState(0);

  // Glow intensification
  const glowScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 0.8],
    [1, 1.15, 1.4, 1.7]
  );
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 0.8],
    [0.25, 0.4, 0.65, 0.9]
  );
  const blobFilter = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 0.8],
    [
      "drop-shadow(0 0 35px rgba(16,185,129,0.35))",
      "drop-shadow(0 0 50px rgba(16,185,129,0.45))",
      "drop-shadow(0 0 65px rgba(16,185,129,0.6))",
      "drop-shadow(0 0 80px rgba(16,185,129,0.8))",
    ]
  );

  // Track how many logos have been absorbed to trigger flash
  const absorbedCount = useTransform(scrollYProgress, (v) => {
    let count = 0;
    for (let i = 0; i < 8; i++) {
      const end = 0.05 + i * 0.06 + 0.12;
      if (v >= end) count++;
    }
    return count;
  });

  useMotionValueEvent(absorbedCount, "change", () => {
    setFlashKey((k) => k + 1);
  });

  return (
    <div className="relative w-full aspect-square max-w-[480px] mx-auto">
      {/* ── Lava glow layers ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Outer gradient hue */}
        <motion.div
          className="absolute w-80 h-80 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(52,211,153,0.15) 0%, rgba(20,184,166,0.08) 50%, transparent 70%)",
            scale: glowScale,
            opacity: glowOpacity,
          }}
        />
        {/* Animated lava blobs */}
        <motion.div
          className="absolute w-52 h-52 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(52,211,153,0.25) 0%, rgba(16,185,129,0.1) 70%, transparent 100%)",
            scale: glowScale,
          }}
          animate={{
            x: [0, 18, -12, 0],
            y: [0, -14, 12, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-44 h-60 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(20,184,166,0.2) 0%, rgba(52,211,153,0.08) 70%, transparent 100%)",
            scale: glowScale,
          }}
          animate={{
            x: [0, -15, 18, 0],
            y: [0, 10, -15, 0],
            rotate: [0, 35, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-56 h-48 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(110,231,183,0.18) 0%, rgba(52,211,153,0.06) 70%, transparent 100%)",
            scale: glowScale,
          }}
          animate={{
            x: [0, 12, -10, 0],
            y: [0, -10, 14, 0],
            rotate: [0, -25, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Inner pulsing glow */}
        <motion.div
          className="absolute w-36 h-36 rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.35) 0%, rgba(52,211,153,0.15) 60%, transparent 100%)",
            scale: glowScale,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Scroll-intensified extra glow ring */}
        <motion.div
          className="absolute w-64 h-64 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.3) 0%, rgba(52,211,153,0.1) 40%, transparent 70%)",
            scale: glowScale,
            opacity: glowOpacity,
          }}
        />
      </div>

      {/* ── Flash ring on absorption ── */}
      <motion.div
        key={flashKey}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0.6, scale: 0.8 }}
        animate={{ opacity: 0, scale: 1.5 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div
          className="w-40 h-40 rounded-full"
          style={{
            border: "2px solid rgba(52,211,153,0.4)",
          }}
        />
      </motion.div>

      {/* ── Orbiting logos ── */}
      {ABSORPTION_LOGOS.map((logo, i) => (
        <AbsorptionLogo
          key={logo.name}
          logo={logo}
          index={i}
          scrollYProgress={scrollYProgress}
          circleX={logoPositions[i].x}
          circleY={logoPositions[i].y}
        />
      ))}

      {/* ── NEURON blob (nucleus) ── */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <motion.img
          src="/logos/neuron-cell.png"
          alt="NEURON"
          className="w-52 h-52 xl:w-60 xl:h-60"
          style={{ filter: blobFilter }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   HeroText — extracted text column
   ───────────────────────────────────────────────────── */

function HeroText() {
  const t = useTranslations("Hero");
  const h1 = t("h1");
  const highlightWords = t("highlightWords").split(",");

  return (
    <div className="text-center lg:text-left">
      {/* Badge */}
      <MotionDiv
        variants={fadeInUp}
        className="flex justify-center lg:justify-start"
      >
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
                (hw) =>
                  word.replace(/[。.]/g, "") === hw.replace(/[。.]/g, "")
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
      <MotionDiv variants={fadeInUp} className="mt-8">
        <p className="text-sm text-text-muted">{t("trustLine")}</p>
      </MotionDiv>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   MobileAbsorptionVisual — static logo ring for mobile
   ───────────────────────────────────────────────────── */

const MOBILE_RADIUS = 130;

const mobileLogoPositions = ABSORPTION_LOGOS.map((_, i) => {
  const angle = (i * 2 * Math.PI) / 8 - Math.PI / 2;
  return {
    x: MOBILE_RADIUS * Math.cos(angle),
    y: MOBILE_RADIUS * Math.sin(angle),
  };
});

function MobileAbsorptionVisual() {
  return (
    <div className="relative w-full max-w-[340px] aspect-square mx-auto">
      {/* Lava glow blobs */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="absolute w-44 h-44 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(52,211,153,0.25) 0%, rgba(16,185,129,0.1) 70%, transparent 100%)",
          }}
          animate={{ x: [0, 12, -8, 0], y: [0, -10, 8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-36 h-48 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(20,184,166,0.2) 0%, rgba(52,211,153,0.08) 70%, transparent 100%)",
          }}
          animate={{ x: [0, -10, 12, 0], y: [0, 8, -10, 0], rotate: [0, 25, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-28 h-28 rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.35) 0%, rgba(52,211,153,0.15) 60%, transparent 100%)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Logos in circle */}
      {ABSORPTION_LOGOS.map((logo, i) => (
        <motion.div
          key={logo.name}
          className="absolute left-1/2 top-1/2"
          style={{
            x: mobileLogoPositions[i].x,
            y: mobileLogoPositions[i].y,
            marginLeft: -18,
            marginTop: -18,
          }}
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 3 + (i % 3) * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          >
            <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 shadow-md flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo.src} alt={logo.name} className="w-5 h-5" />
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* NEURON blob (nucleus) */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logos/neuron-cell.png"
          alt="NEURON"
          className="w-40 h-40"
          style={{
            filter: "drop-shadow(0 0 35px rgba(16,185,129,0.35))",
          }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Hero — main export with scroll-pinned desktop layout
   ───────────────────────────────────────────────────── */

export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Hero exit (pin release)
  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.8, 1],
    [1, 1, 0.3]
  );
  const heroY = useTransform(scrollYProgress, [0.8, 1], [0, -60]);

  return (
    <>
      {/* ── Desktop: scroll-pinned ── */}
      <div
        ref={wrapperRef}
        className="hidden lg:block relative"
        style={{ height: "300vh" }}
      >
        {/* Soft glow (same as original) */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(34,197,94,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="sticky top-0 h-screen flex items-center overflow-x-clip">
          <motion.div
            className="section-container relative z-10 w-full"
            style={{ opacity: heroOpacity, y: heroY }}
          >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <HeroText />
              </motion.div>

              <MotionDiv
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex items-center justify-center"
              >
                <AbsorptionVisual scrollYProgress={scrollYProgress} />
              </MotionDiv>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Mobile: normal non-sticky ── */}
      <MotionSection
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative section-padding overflow-x-clip lg:hidden"
      >
        {/* Soft glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(34,197,94,0.06) 0%, transparent 70%)",
          }}
        />
        <div className="section-container relative z-10">
          <HeroText />
          <MotionDiv variants={fadeInUp} className="mt-12 flex justify-center">
            <MobileAbsorptionVisual />
          </MotionDiv>
        </div>
      </MotionSection>

      {/* ── FlowGraph — outside scroll wrapper ── */}
      <div className="section-container">
        <MotionDiv
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <FlowGraph />
        </MotionDiv>
      </div>
    </>
  );
}
