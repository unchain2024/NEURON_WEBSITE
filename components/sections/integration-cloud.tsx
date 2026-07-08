"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

const DISPLAY_FONT = {
  fontFamily: '"Inter Display", var(--font-inter), sans-serif',
  fontWeight: 500,
  letterSpacing: "-0.02em",
} as const;

/* Honeycomb integration logo cloud — traced from Integration-new.svg.
   Rows of 4 / 5 / 4 tiles: centring a 5-tile row between two 4-tile rows
   produces the staggered honeycomb offset automatically. The last row is
   empty + masked so the grid fades into "and more". */
const ROW_1 = [
  { key: "microsoft365", logo: "/logos/microsoft.svg" },
  { key: "googleWorkspace", logo: "/logos/google.svg" },
  { key: "slack", logo: "/logos/slack.svg" },
  { key: "notion", logo: "/logos/notion.svg" },
];

const ROW_2 = [
  { key: "confluence", logo: "/logos/confluence.svg" },
  { key: "github", logo: "/logos/github.svg" },
  { key: "linear", logo: "/logos/linear.svg" },
  { key: "hubspot", logo: "/logos/hubspot.svg" },
  { key: "asana", logo: "/logos/asana.svg" },
];

/* Tile + gap scale fluidly; 108px / 40px gap at the 1440 design width. */
const TILE = "clamp(56px, 7.5vw, 108px)";
const GAP = "clamp(14px, 2.8vw, 40px)";

function Tile({ logo }: { logo?: string }) {
  return (
    <motion.div
      whileHover={logo ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="grid shrink-0 place-items-center border border-black/[0.06] bg-white shadow-[0_2px_8px_rgba(10,13,18,0.06)]"
      style={{ width: TILE, height: TILE, borderRadius: "23%" }}
    >
      {logo && (
        <Image
          src={logo}
          alt=""
          width={72}
          height={72}
          className="object-contain"
          style={{ width: "63%", height: "63%" }}
        />
      )}
    </motion.div>
  );
}

function Row({
  items,
}: {
  items: { key: string; logo?: string }[];
}) {
  return (
    <div className="flex justify-center" style={{ gap: GAP }}>
      {items.map((it, i) => (
        <MotionDiv key={it.key + i} variants={fadeInUp}>
          <Tile logo={it.logo} />
        </MotionDiv>
      ))}
    </div>
  );
}

export default function IntegrationCloud() {
  const t = useTranslations("IntegrationsPage");

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      {/* Beige texture background (exported from the design) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/integration-cloud-bg.jpg"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      {/* Soft white fade at the edges so the beige blends into the adjacent
          white sections. Desktop keeps the texture rich through the middle;
          mobile (a much taller, narrower section) resolves to plain white
          earlier so the beige never lingers past the honeycomb. */}
      <div
        className="pointer-events-none absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0) 14%, rgba(255,255,255,0) 46%, #fff 74%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0) 16%, rgba(255,255,255,0) 80%, #fff 100%)",
        }}
      />

      <div className="section-container relative z-10">
        <SectionReveal>
          <MotionDiv variants={fadeInUp} className="mx-auto max-w-3xl text-center">
            <h2
              className="text-[#0A0D12]"
              style={{ ...DISPLAY_FONT, fontSize: "clamp(1.75rem, 4.4vw, 2.75rem)", lineHeight: 1.12 }}
            >
              {t("cloudTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[#414651] md:text-base">
              {t("cloudSubtitle")}
            </p>
          </MotionDiv>

          {/* Honeycomb — the last row is empty and the whole grid fades out
              at the bottom, suggesting "and more". */}
          <MotionDiv
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
            }}
            className="mt-12 flex flex-col md:mt-16"
            style={{
              gap: GAP,
              WebkitMaskImage: "linear-gradient(to bottom, #000 62%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, #000 62%, transparent 100%)",
            }}
          >
            <Row items={ROW_1} />
            <Row items={ROW_2} />
            <Row items={ROW_1.map((it) => ({ key: `ghost-${it.key}` }))} />
          </MotionDiv>
        </SectionReveal>
      </div>
    </section>
  );
}
