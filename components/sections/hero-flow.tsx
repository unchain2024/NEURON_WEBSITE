"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────
   Assets + geometry — traced 1:1 from the wireframe SVG.

   Flow: a straight horizontal "train". Left cards enter from the left, are
   readable at their slot, then glide straight into the centre node; right
   cards emerge from the centre, glide straight out to their slot (readable),
   then continue right. Y never changes — pure straight-line motion — and the
   card slots / spacing / design are exactly as given.
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

/* Continuous flow: every card loops without pause, evenly staggered so there's
   always a steady stream. Outputs are phase-shifted so they trail the inputs
   (signals flow in → decisions flow out), but nothing ever stops. */
const LOOP = 6; // seconds per card cycle
const INPUT_STAGGER = LOOP / INPUT_CARDS.length;
const OUTPUT_STAGGER = LOOP / OUTPUT_CARDS.length;
const OUTPUT_PHASE = LOOP * 0.45; // outputs trail the inputs
const ENTER = 210; // viewBox units a card travels beyond its slot (in / out)

/* ─────────────────────────────────────────────────────
   Flowing card — straight horizontal travel only
   ───────────────────────────────────────────────────── */

function FlowCard({
  card,
  kind,
  index,
  cw,
}: {
  card: Card;
  kind: "input" | "output";
  index: number;
  cw: number;
}) {
  // X offset (px) from the slot to the centre line at the card's own Y.
  const toCentre = ((NODE.x - card.slot.x) / W) * cw;
  const enter = (ENTER / W) * cw;

  const delay =
    kind === "input"
      ? index * INPUT_STAGGER
      : OUTPUT_PHASE + index * OUTPUT_STAGGER;

  const anim =
    kind === "input"
      ? {
          // enter from the left → readable at slot → straight into the centre
          x: [-enter, 0, 0, toCentre, toCentre],
          opacity: [0, 1, 1, 0.12, 0],
          scale: [0.92, 1, 1, 0.82, 0.78],
        }
      : {
          // emerge from the centre → straight out to slot (readable) → right
          x: [toCentre, 0, 0, enter, enter],
          opacity: [0, 1, 1, 0.12, 0],
          scale: [0.82, 1, 1, 0.95, 0.92],
        };

  const times =
    kind === "input" ? [0, 0.18, 0.52, 0.8, 1] : [0, 0.22, 0.55, 0.82, 1];

  return (
    <div
      className="absolute z-[2] -translate-x-1/2 -translate-y-1/2"
      style={{ left: pct(card.slot.x, W), top: pct(card.slot.y, H), width: cq(card.w) }}
    >
      <motion.div
        style={{ willChange: "transform, opacity" }}
        animate={anim}
        transition={{
          duration: LOOP,
          times,
          ease: "linear",
          repeat: Infinity,
          delay,
        }}
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
      <span
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/25 blur-3xl"
        style={{ width: cq(150), height: cq(150) }}
      />
      <motion.div
        className="relative"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("animation-logo.svg")} alt="" className="block w-full" draggable={false} />
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   HeroFlow — desktop canvas, straight-line train
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
        <FlowCard key={`input-${i}`} card={card} kind="input" index={i} cw={width} />
      ))}

      <NeuronNode />

      {OUTPUT_CARDS.map((card, i) => (
        <FlowCard key={`output-${i}`} card={card} kind="output" index={i} cw={width} />
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
