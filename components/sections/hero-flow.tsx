"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { InlineSvg } from "@/components/inline-svg";
import animationLogo from "@/public/hero-animation/animation-logo.svg?raw";

/* ─────────────────────────────────────────────────────
   Assets + geometry — traced 1:1 from the wireframe SVGs.

   Motion: signals in, decisions out. The input cards (Slack, Notion, …) sit at
   their slots, then slide into the N node and fade out — absorbed. Then the
   output cards emerge from the node, slide out to their slots (readable), and
   fade out. One continuous loop, constant-rate (linear) timing. The node pulses
   as it processes.

   The same engine drives desktop (landscape 1440×425) and mobile (portrait crop
   traced from Hero.svg) — only the `Geo` config changes.
   ───────────────────────────────────────────────────── */

type Slot = { x: number; y: number };
type Card = { src: string; w: number; h: number; slot: Slot };

type Geo = {
  W: number;
  H: number;
  node: { x: number; y: number };
  nodeW: number; // node width in viewBox units
  nodeGlow: number; // glow width in viewBox units
  nodeTransform: string; // align the logo's visual centre on `node`
  input: Card[];
  output: Card[];
  inTimes: number[];
  outTimes: number[];
  outDrift: number; // units the output cards drift further out as they fade
  partition: { w: number; h: number } | null; // svg partition (desktop) or null → drawn line (mobile)
};

const asset = (file: string) => `/hero-animation/${file.replace(/ /g, "%20")}`;
const pct = (v: number, total: number) => `${(v / total) * 100}%`;
const cq = (px: number, W: number) => `${(px / W) * 100}cqw`;

/* One shared cycle drives the whole flow. */
const FADE = 4.5; // seconds for one signals-in → decisions-out cycle

/* Desktop — landscape canvas. */
const DESKTOP: Geo = {
  W: 1440,
  H: 425,
  node: { x: 720, y: 212 },
  nodeW: 145,
  nodeGlow: 150,
  nodeTransform: "translate(-40.5%, -36.9%)",
  input: [
    { src: "Integrations Card.svg", w: 272, h: 64, slot: { x: 437.5, y: 51.5 } }, // slack
    { src: "Integrations Card-4.svg", w: 272, h: 64, slot: { x: 313.5, y: 131.5 } }, // notion
    { src: "Integrations Card-2.svg", w: 272, h: 64, slot: { x: 397.5, y: 211.5 } }, // jira
    { src: "Integrations Card-3.svg", w: 272, h: 64, slot: { x: 277.5, y: 291.5 } }, // github
    { src: "Integrations Card-1.svg", w: 272, h: 64, slot: { x: 362.5, y: 371.5 } }, // hubspot
  ],
  output: [
    { src: "Decision.svg", w: 280, h: 69, slot: { x: 1113.5, y: 66 } },
    { src: "Risk.svg", w: 280, h: 86, slot: { x: 1033.5, y: 160.5 } },
    { src: "Task.svg", w: 280, h: 86, slot: { x: 993.5, y: 264.5 } },
    { src: "Risk-1.svg", w: 280, h: 69, slot: { x: 1073.5, y: 360 } },
  ],
  inTimes: [0, 0.12, 0.32, 0.5, 1],
  outTimes: [0, 0.5, 0.7, 0.85, 1],
  outDrift: 120,
  partition: { w: 216, h: 513 },
};

/* Mobile — portrait crop traced from Hero.svg (393-wide). Input cards fan in
   from the left edge, decisions fan out to the right; both clip at the sides as
   in the wireframe. A vertical green line links them through the node. */
const MOBILE: Geo = {
  W: 393,
  H: 250,
  node: { x: 200, y: 125 },
  nodeW: 62,
  nodeGlow: 92,
  nodeTransform: "translate(-50%, -50%)",
  input: [
    { src: "Integrations Card.svg", w: 188, h: 44, slot: { x: 96, y: 30 } },
    { src: "Integrations Card-4.svg", w: 188, h: 44, slot: { x: 60, y: 78 } },
    { src: "Integrations Card-2.svg", w: 188, h: 44, slot: { x: 100, y: 125 } },
    { src: "Integrations Card-3.svg", w: 188, h: 44, slot: { x: 52, y: 172 } },
    { src: "Integrations Card-1.svg", w: 188, h: 44, slot: { x: 90, y: 220 } },
  ],
  output: [
    { src: "Decision.svg", w: 196, h: 48, slot: { x: 300, y: 36 } },
    { src: "Risk.svg", w: 196, h: 60, slot: { x: 336, y: 90 } },
    { src: "Task.svg", w: 196, h: 60, slot: { x: 302, y: 150 } },
    { src: "Risk-1.svg", w: 196, h: 48, slot: { x: 332, y: 208 } },
  ],
  inTimes: [0, 0.12, 0.32, 0.5, 1],
  outTimes: [0, 0.5, 0.7, 0.85, 1],
  outDrift: 70,
  partition: null,
};

/* ─────────────────────────────────────────────────────
   Card — input: slot → into the node (fades out, absorbed).
           output: node → slot (fades in), then drifts off + fades.
   ───────────────────────────────────────────────────── */

function FlowCard({
  card,
  kind,
  cw,
  geo,
}: {
  card: Card;
  kind: "input" | "output";
  cw: number;
  geo: Geo;
}) {
  const prefersReduced = useReducedMotion();

  const slotStyle = {
    left: pct(card.slot.x, geo.W),
    top: pct(card.slot.y, geo.H),
    width: cq(card.w, geo.W),
  } as const;

  // Offset (px) from the slot to the node, on both axes. The container keeps a
  // fixed aspect ratio, so both axes scale by cw / W.
  const logoDX = ((geo.node.x - card.slot.x) / geo.W) * cw;
  const logoDY = ((geo.node.y - card.slot.y) / geo.W) * cw;
  const outDrift = (geo.outDrift / geo.W) * cw;

  const anim =
    kind === "input"
      ? {
          // appear at slot → hold → slide into the node, fading + shrinking
          x: [0, 0, 0, logoDX, logoDX],
          y: [0, 0, 0, logoDY, logoDY],
          opacity: [0, 1, 1, 0, 0],
          scale: [1, 1, 1, 0.6, 0.6],
        }
      : {
          // wait (invisible) at the node → emerge to slot, fading in → hold →
          // drift further out and fade out
          x: [logoDX, logoDX, 0, 0, outDrift],
          y: [logoDY, logoDY, 0, 0, 0],
          opacity: [0, 0, 1, 1, 0],
          scale: [0.6, 0.6, 1, 1, 1],
        };

  const times = kind === "input" ? geo.inTimes : geo.outTimes;

  return (
    <div className="absolute z-[2] -translate-x-1/2 -translate-y-1/2" style={slotStyle}>
      <motion.div
        style={{ willChange: "transform, opacity" }}
        animate={prefersReduced ? undefined : anim}
        transition={{ duration: FADE, times, ease: "linear", repeat: Infinity }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset(card.src)} alt="" className="block w-full" draggable={false} />
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Centre partition (line + green glow)
   ───────────────────────────────────────────────────── */

function Partition({ geo }: { geo: Geo }) {
  // Mobile: a drawn vertical green line through the node (matches Hero.svg).
  if (!geo.partition) {
    return (
      <div
        className="pointer-events-none absolute z-0"
        style={{
          left: pct(geo.node.x, geo.W),
          top: 0,
          bottom: 0,
          width: 1,
          transform: "translateX(-50%)",
          opacity: 0.55,
          background:
            "linear-gradient(to bottom, rgba(9,179,86,0) 0%, #09B356 44%, #09B356 56%, rgba(9,179,86,0) 100%)",
        }}
      />
    );
  }

  // Desktop: the exported partition art.
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={asset("partition.svg")}
      alt=""
      className="pointer-events-none absolute z-0 max-w-none"
      style={{
        left: "50%",
        top: "50%",
        width: cq(geo.partition.w, geo.W),
        height: cq(geo.partition.h, geo.W),
        transform: "translate(-100%, -50%)",
      }}
      draggable={false}
    />
  );
}

function NeuronNode({ geo }: { geo: Geo }) {
  const prefersReduced = useReducedMotion();

  // The node pulses as it processes — a stronger bump at mid-cycle, when the
  // signals finish absorbing and the decisions start emerging.
  const breathe = {
    duration: FADE,
    times: [0, 0.42, 0.5, 0.58, 1],
    repeat: Infinity,
    ease: "easeInOut" as const,
  };

  return (
    <div
      className="absolute z-10"
      style={{
        left: pct(geo.node.x, geo.W),
        top: pct(geo.node.y, geo.H),
        width: cq(geo.nodeW, geo.W),
        height: cq(geo.nodeW, geo.W),
        transform: geo.nodeTransform,
      }}
    >
      <motion.span
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/25 blur-3xl"
        style={{ width: cq(geo.nodeGlow, geo.W), height: cq(geo.nodeGlow, geo.W) }}
        animate={prefersReduced ? undefined : { opacity: [0.55, 0.7, 1, 0.7, 0.55], scale: [1, 1.06, 1.18, 1.06, 1] }}
        transition={breathe}
      />
      <motion.div
        className="relative"
        animate={prefersReduced ? undefined : { scale: [1, 1.03, 1.1, 1.03, 1] }}
        transition={breathe}
      >
        <InlineSvg svg={animationLogo} className="w-full" />
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   FlowCanvas — the animated flow for one geometry
   ───────────────────────────────────────────────────── */

function FlowCanvas({ geo, className, style }: { geo: Geo; className?: string; style?: React.CSSProperties }) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const update = () => setWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={canvasRef}
      className={`relative mx-auto w-full overflow-hidden ${className ?? ""}`}
      style={{ aspectRatio: `${geo.W} / ${geo.H}`, containerType: "inline-size", ...style }}
    >
      <Partition geo={geo} />

      {geo.input.map((card, i) => (
        <FlowCard key={`input-${i}`} card={card} kind="input" cw={width} geo={geo} />
      ))}

      <NeuronNode geo={geo} />

      {geo.output.map((card, i) => (
        <FlowCard key={`output-${i}`} card={card} kind="output" cw={width} geo={geo} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   HeroFlow — desktop canvas
   ───────────────────────────────────────────────────── */

export default function HeroFlow() {
  return (
    <FlowCanvas
      geo={DESKTOP}
      style={{ maxWidth: `min(80rem, calc(min(50vh, 460px) * ${DESKTOP.W} / ${DESKTOP.H}))` }}
    />
  );
}

/* ─────────────────────────────────────────────────────
   HeroFlowMobile — same animated flow, portrait crop
   ───────────────────────────────────────────────────── */

export function HeroFlowMobile() {
  return <FlowCanvas geo={MOBILE} style={{ maxWidth: "34rem" }} />;
}
