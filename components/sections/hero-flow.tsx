"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* ─────────────────────────────────────────────────────
   Assets + geometry — traced 1:1 from the wireframe SVG.

   Motion: signals in, decisions out. The left cards (Slack, Notion, …) sit at
   their slots, then slide into the N logo and fade out — absorbed. Then the
   right cards emerge from the logo, slide out to their slots on the right
   (readable), and fade out. One continuous loop, constant-rate (linear)
   timing. The node pulses as it processes.
   ───────────────────────────────────────────────────── */

type Slot = { x: number; y: number };
type Card = { src: string; w: number; h: number; slot: Slot };

const W = 1440;
const H = 425;
const NODE = { x: 720, y: 212 };

const cq = (px: number) => `${(px / W) * 100}cqw`;
const asset = (file: string) => `/hero-animation/${file.replace(/ /g, "%20")}`;
const pct = (v: number, total: number) => `${(v / total) * 100}%`;

const INPUT_CARDS: Card[] = [
  { src: "Integrations Card.svg", w: 272, h: 64, slot: { x: 437.5, y: 51.5 } }, // slack
  { src: "Integrations Card-4.svg", w: 272, h: 64, slot: { x: 313.5, y: 131.5 } }, // notion
  { src: "Integrations Card-2.svg", w: 272, h: 64, slot: { x: 397.5, y: 211.5 } }, // jira
  { src: "Integrations Card-3.svg", w: 272, h: 64, slot: { x: 277.5, y: 291.5 } }, // github
  { src: "Integrations Card-1.svg", w: 272, h: 64, slot: { x: 362.5, y: 371.5 } }, // hubspot
];

const OUTPUT_CARDS: Card[] = [
  { src: "Decision.svg", w: 280, h: 69, slot: { x: 1113.5, y: 66 } },
  { src: "Risk.svg", w: 280, h: 86, slot: { x: 1033.5, y: 160.5 } },
  { src: "Task.svg", w: 280, h: 86, slot: { x: 993.5, y: 264.5 } },
  { src: "Risk-1.svg", w: 280, h: 69, slot: { x: 1073.5, y: 360 } },
];

/* One shared cycle drives the whole flow. Tunable in one place. */
const FADE = 4.5; // seconds for one signals-in → decisions-out cycle
const OUT_DRIFT = 120; // viewBox units the right cards drift further right as they fade

// Left cards: hold at slot → slide into the logo + fade out (first half).
const IN_TIMES = [0, 0.12, 0.32, 0.5, 1];
// Right cards: wait at logo → emerge to slot + fade in → hold → drift right + fade out.
const OUT_TIMES = [0, 0.5, 0.7, 0.85, 1];

/* ─────────────────────────────────────────────────────
   Card — input: slot → into the logo (fades out, absorbed).
           output: logo → slot on the right (fades in), then drifts off + fades.
   ───────────────────────────────────────────────────── */

function FlowCard({
  card,
  kind,
  cw,
}: {
  card: Card;
  kind: "input" | "output";
  cw: number;
}) {
  const prefersReduced = useReducedMotion();

  const slotStyle = {
    left: pct(card.slot.x, W),
    top: pct(card.slot.y, H),
    width: cq(card.w),
  } as const;

  // Offset (px) from the slot to the logo, on both axes (the container keeps a
  // fixed aspect ratio, so both scale by cw / W).
  const logoDX = ((NODE.x - card.slot.x) / W) * cw;
  const logoDY = ((NODE.y - card.slot.y) / W) * cw;
  const outDrift = (OUT_DRIFT / W) * cw;

  const anim =
    kind === "input"
      ? {
          // appear at slot → hold → slide into the logo, fading + shrinking
          x: [0, 0, 0, logoDX, logoDX],
          y: [0, 0, 0, logoDY, logoDY],
          opacity: [0, 1, 1, 0, 0],
          scale: [1, 1, 1, 0.6, 0.6],
        }
      : {
          // wait (invisible) at the logo → emerge to slot, fading in → hold →
          // drift further right and fade out
          x: [logoDX, logoDX, 0, 0, outDrift],
          y: [logoDY, logoDY, 0, 0, 0],
          opacity: [0, 0, 1, 1, 0],
          scale: [0.6, 0.6, 1, 1, 1],
        };

  const times = kind === "input" ? IN_TIMES : OUT_TIMES;

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
   Centre partition (line + green glow) and the node
   ───────────────────────────────────────────────────── */

function Partition() {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={asset("partition.svg")}
      alt=""
      className="pointer-events-none absolute z-0 max-w-none"
      style={{
        left: "50%",
        top: "50%",
        width: cq(216),
        height: cq(513),
        transform: "translate(-100%, -50%)",
      }}
      draggable={false}
    />
  );
}

function NeuronNode() {
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
        left: pct(NODE.x, W),
        top: pct(NODE.y, H),
        width: cq(145),
        height: cq(155),
        transform: "translate(-40.5%, -36.9%)",
      }}
    >
      <motion.span
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/25 blur-3xl"
        style={{ width: cq(150), height: cq(150) }}
        animate={prefersReduced ? undefined : { opacity: [0.55, 0.7, 1, 0.7, 0.55], scale: [1, 1.06, 1.18, 1.06, 1] }}
        transition={breathe}
      />
      <motion.div
        className="relative"
        animate={prefersReduced ? undefined : { scale: [1, 1.03, 1.1, 1.03, 1] }}
        transition={breathe}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("animation-logo.svg")} alt="" className="block w-full" draggable={false} />
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   HeroFlow — desktop canvas
   ───────────────────────────────────────────────────── */

export default function HeroFlow() {
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
      className="relative mx-auto w-full overflow-hidden"
      style={{
        aspectRatio: `${W} / ${H}`,
        containerType: "inline-size",
        maxWidth: `min(80rem, calc(min(50vh, 460px) * ${W} / ${H}))`,
      }}
    >
      <Partition />

      {INPUT_CARDS.map((card, i) => (
        <FlowCard key={`input-${i}`} card={card} kind="input" cw={width} />
      ))}

      <NeuronNode />

      {OUTPUT_CARDS.map((card, i) => (
        <FlowCard key={`output-${i}`} card={card} kind="output" cw={width} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   HeroFlowMobile — simplified stacked flow
   ───────────────────────────────────────────────────── */

export function HeroFlowMobile() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3">
      {INPUT_CARDS.slice(0, 3).map((card, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={`m-in-${i}`} src={asset(card.src)} alt="" className="w-full max-w-[300px]" draggable={false} />
      ))}

      <motion.div
        className="my-1 w-[64px]"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("animation-logo.svg")} alt="" className="w-full" draggable={false} />
      </motion.div>

      {OUTPUT_CARDS.slice(0, 3).map((card, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={`m-out-${i}`} src={asset(card.src)} alt="" className="w-full max-w-[300px]" draggable={false} />
      ))}
    </div>
  );
}
