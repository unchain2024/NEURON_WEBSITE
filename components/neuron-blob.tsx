"use client";

import { useState } from "react";
import {
  motion,
  useTransform,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import Lottie from "lottie-react";
import blobAnimationData from "@/public/logos/neuron-blob.json";

/* ─────────────────────────────────────────────────────
   Config
   ───────────────────────────────────────────────────── */

const LOGOS = [
  { name: "Slack", src: "/logos/slack.svg" },
  { name: "Jira", src: "/logos/jira.svg" },
  { name: "Notion", src: "/logos/notion.svg" },
  { name: "Linear", src: "/logos/linear.svg" },
  { name: "GitHub", src: "/logos/github.svg" },
  { name: "Figma", src: "/logos/figma.svg" },
  { name: "Confluence", src: "/logos/confluence.svg" },
  { name: "HubSpot", src: "/logos/hubspot.svg" },
];

const CIRCLE_RADIUS = 200;
const MOBILE_RADIUS = 140;

const desktopPositions = LOGOS.map((_, i) => {
  const angle = (i * 2 * Math.PI) / LOGOS.length - Math.PI / 2;
  return { x: CIRCLE_RADIUS * Math.cos(angle), y: CIRCLE_RADIUS * Math.sin(angle) };
});

const mobilePositions = LOGOS.map((_, i) => {
  const angle = (i * 2 * Math.PI) / LOGOS.length - Math.PI / 2;
  return { x: MOBILE_RADIUS * Math.cos(angle), y: MOBILE_RADIUS * Math.sin(angle) };
});

/* ─────────────────────────────────────────────────────
   BlobShell — shared visual (no hooks)
   ───────────────────────────────────────────────────── */

function BlobShell({
  blobScale,
  glowOpacity,
}: {
  blobScale?: MotionValue<number>;
  glowOpacity?: MotionValue<number>;
}) {
  return (
    <motion.div
      className="relative w-48 h-48 xl:w-56 xl:h-56"
      style={blobScale ? { scale: blobScale } : undefined}
    >
      {/* Soft radial halo */}
      <motion.div
        className="absolute -inset-24 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(52,211,153,0.13) 0%, rgba(20,184,166,0.06) 35%, transparent 65%)",
          opacity: glowOpacity ?? 0.5,
        }}
      />

      {/* Animated Lottie blob */}
      <div
        className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none"
        style={{ opacity: 0.65 }}
        aria-hidden="true"
      >
        <Lottie
          animationData={blobAnimationData}
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* NEURON label */}
      <span className="absolute inset-0 flex items-center justify-center text-sm xl:text-base font-bold tracking-[0.2em] text-white/90 pointer-events-none z-10">
        NEURON
      </span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   ScrollBlob — wrapper that adds scroll-driven scale
   ───────────────────────────────────────────────────── */

function ScrollBlob({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const rawScale = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.8], [1, 1.08, 1.2, 1.35]);
  const blobScale = useSpring(rawScale, { stiffness: 120, damping: 25 });
  const rawOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.8], [0.3, 0.5, 0.7, 1]);
  const glowOpacity = useSpring(rawOpacity, { stiffness: 120, damping: 25 });

  return <BlobShell blobScale={blobScale} glowOpacity={glowOpacity} />;
}

/* Static blob (no scroll) */
function StaticBlob() {
  return <BlobShell />;
}

/* ─────────────────────────────────────────────────────
   AbsorptionLogo — single logo that flies to center
   ───────────────────────────────────────────────────── */

function AbsorptionLogo({
  logo,
  index,
  scrollYProgress,
  circleX,
  circleY,
}: {
  logo: (typeof LOGOS)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
  circleX: number;
  circleY: number;
}) {
  const startScroll = 0.05 + index * 0.06;
  const endScroll = startScroll + 0.12;

  const rawX = useTransform(scrollYProgress, [startScroll, endScroll], [circleX, 0]);
  const rawY = useTransform(scrollYProgress, [startScroll, endScroll], [circleY, 0]);
  const rawScale = useTransform(scrollYProgress, [startScroll, endScroll], [1, 0]);
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
      style={{ x, y, scale, opacity, marginLeft: -22, marginTop: -22 }}
    >
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
   NeuronBlob — Desktop (scroll-driven absorption)
   ───────────────────────────────────────────────────── */

export default function NeuronBlob({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const [flashKey, setFlashKey] = useState(0);

  /* Lava glow intensification */
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

  /* Flash on each absorption */
  const absorbedCount = useTransform(scrollYProgress, (v) => {
    let count = 0;
    for (let i = 0; i < LOGOS.length; i++) {
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
      {/* Ambient glow layers */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="absolute w-80 h-80 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(52,211,153,0.15) 0%, rgba(20,184,166,0.08) 50%, transparent 70%)",
            scale: glowScale,
            opacity: glowOpacity,
          }}
        />
        <motion.div
          className="absolute w-52 h-52 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(52,211,153,0.25) 0%, rgba(16,185,129,0.1) 70%, transparent 100%)",
            scale: glowScale,
          }}
          animate={{ x: [0, 18, -12, 0], y: [0, -14, 12, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-44 h-60 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(20,184,166,0.2) 0%, rgba(52,211,153,0.08) 70%, transparent 100%)",
            scale: glowScale,
          }}
          animate={{ x: [0, -15, 18, 0], y: [0, 10, -15, 0], rotate: [0, 35, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-56 h-48 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(110,231,183,0.18) 0%, rgba(52,211,153,0.06) 70%, transparent 100%)",
            scale: glowScale,
          }}
          animate={{ x: [0, 12, -10, 0], y: [0, -10, 14, 0], rotate: [0, -25, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-36 h-36 rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.35) 0%, rgba(52,211,153,0.15) 60%, transparent 100%)",
            scale: glowScale,
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
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

      {/* Flash ring on absorption */}
      <motion.div
        key={flashKey}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0.6, scale: 0.8 }}
        animate={{ opacity: 0, scale: 1.5 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="w-40 h-40 rounded-full" style={{ border: "2px solid rgba(52,211,153,0.4)" }} />
      </motion.div>

      {/* Orbiting logos */}
      {LOGOS.map((logo, i) => (
        <AbsorptionLogo
          key={logo.name}
          logo={logo}
          index={i}
          scrollYProgress={scrollYProgress}
          circleX={desktopPositions[i].x}
          circleY={desktopPositions[i].y}
        />
      ))}

      {/* Central gradient blob */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <ScrollBlob scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   NeuronBlobMobile — static (no scroll absorption)
   ───────────────────────────────────────────────────── */

export function NeuronBlobMobile() {
  return (
    <div className="relative w-full max-w-[340px] aspect-square mx-auto">
      {/* Ambient glow */}
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

      {/* Logos */}
      {LOGOS.map((logo, i) => (
        <motion.div
          key={logo.name}
          className="absolute left-1/2 top-1/2"
          style={{
            x: mobilePositions[i].x,
            y: mobilePositions[i].y,
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

      {/* Central gradient blob */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <StaticBlob />
      </div>
    </div>
  );
}
