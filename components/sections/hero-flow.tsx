"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* ─────────────────────────────────────────────────────
   Assets + geometry — traced 1:1 from the wireframe SVG.

   Flow: a step-by-step story on a single synchronized clock (CYCLE).
   1. All left cards fade in at their slots (the raw signals).
   2. One by one, each is absorbed straight into the centre node.
   3. The node pulses (processing).
   4. One by one, decisions emerge from the node, glide out to their slots
      and settle (readable, accumulating).
   5. They hold, then clear together — and the cycle loops.

   Every card shares the same CYCLE/period with no per-card delay, so the
   sequence stays in sync forever. Y never changes — pure horizontal motion —
   and the card slots / spacing / design are exactly as given.
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

/* One synchronized cycle drives the whole sequence. Phase boundaries are
   fractions of CYCLE so the timing is tunable in one place.

   The loop is made seamless by a crossfade at the end: as the decisions
   dissolve on the right (CLEAR), the signals fade back in at their slots on
   the left (REAPPEAR). Each input card's state at t=1 is identical to its
   state at t=0 (visible, at its slot), so the loop restart has nothing to
   jump between — no blank beat, no snap back to the left. */
const CYCLE = 11; // seconds for one full ingest → emit story
const N_IN = INPUT_CARDS.length;
const N_OUT = OUTPUT_CARDS.length;

const INGEST_START = 0.14; // inputs start getting absorbed (one by one)
const INGEST_END = 0.46; // last input absorbed
const EMIT_START = 0.5; // outputs start emerging (one by one)
const EMIT_END = 0.8; // last output settled
const CLEAR_START = 0.84; // outputs begin fading out (staggered)
const REAPPEAR_START = 0.85; // inputs begin fading back in for the next loop
const BAND_END = 0.99; // last clear/reappear finishes just before the seam

/* ─────────────────────────────────────────────────────
   Flowing card — step-by-step ingest / emit on the shared clock
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
  const prefersReduced = useReducedMotion();

  const slotStyle = {
    left: pct(card.slot.x, W),
    top: pct(card.slot.y, H),
    width: cq(card.w),
  } as const;

  // Reduced motion: show every card static at its slot (full end-state).
  if (prefersReduced) {
    return (
      <div className="absolute z-[2] -translate-x-1/2 -translate-y-1/2" style={slotStyle}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset(card.src)} alt="" className="block w-full" draggable={false} />
      </div>
    );
  }

  // X offset (px) from the slot to the centre line at the card's own Y.
  const toCentre = ((NODE.x - card.slot.x) / W) * cw;

  let anim: { x: number[]; opacity: number[]; scale: number[] };
  let times: number[];

  if (kind === "input") {
    // Present at slot from t=0 → held → absorbed straight into the node (one by
    // one) → invisible → faded back in at the slot before the seam. t=0 and t=1
    // are identical (visible at slot), so the loop is perfectly continuous.
    const slice = (INGEST_END - INGEST_START) / N_IN;
    const ingestStart = INGEST_START + slice * index;
    const ingestEnd = ingestStart + slice * 0.85;
    const reappear = REAPPEAR_START + ((BAND_END - REAPPEAR_START) / N_IN) * index;
    times = [0, ingestStart, ingestEnd, reappear, 1];
    anim = {
      x: [0, 0, toCentre, 0, 0],
      opacity: [1, 1, 0, 0, 1],
      scale: [1, 1, 0.78, 0.95, 1],
    };
  } else {
    // parked at node → emerge straight out to slot → settle/hold → faded out in
    // place (staggered), crossfading with the inputs reappearing on the left.
    const slice = (EMIT_END - EMIT_START) / N_OUT;
    const emitStart = EMIT_START + slice * index;
    const emitEnd = emitStart + slice * 0.7;
    const clearStart = CLEAR_START + ((BAND_END - CLEAR_START) / N_OUT) * index;
    times = [0, emitStart, emitEnd, clearStart, 1];
    anim = {
      x: [toCentre, toCentre, 0, 0, 0],
      opacity: [0, 0, 1, 1, 0],
      scale: [0.85, 0.85, 1, 1, 0.98],
    };
  }

  return (
    <div className="absolute z-[2] -translate-x-1/2 -translate-y-1/2" style={slotStyle}>
      <motion.div
        style={{ willChange: "transform, opacity" }}
        animate={anim}
        transition={{ duration: CYCLE, times, ease: "easeInOut", repeat: Infinity }}
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

  // Pulse synced to the cycle: gentle breathe, with a stronger bump at the
  // process beat (~0.46→0.50) as the last signal is absorbed and decisions form.
  const pulseTimes = [0, 0.44, 0.5, 0.56, 1];
  const nodeTransition = {
    duration: CYCLE,
    times: pulseTimes,
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
        animate={prefersReduced ? undefined : { opacity: [0.55, 0.75, 1, 0.75, 0.55], scale: [1, 1.06, 1.18, 1.06, 1] }}
        transition={nodeTransition}
      />
      <motion.div
        className="relative"
        animate={prefersReduced ? undefined : { scale: [1, 1.03, 1.1, 1.03, 1] }}
        transition={nodeTransition}
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
