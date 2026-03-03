"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  BrainCircuit,
  MessageSquare,
  Trello,
  StickyNote,
  GitBranch,
  Github,
  Headphones,
  FileText,
  ListChecks,
  BookOpen,
  Map,
  type LucideIcon,
} from "lucide-react";

/* ── Node definitions ── */
interface NodeDef {
  id: string;
  labelKey: string;
  icon: LucideIcon;
  color: string;
}

const SOURCE_NODES: NodeDef[] = [
  { id: "slack", labelKey: "slack", icon: MessageSquare, color: "#E01E5A" },
  { id: "jira", labelKey: "jira", icon: Trello, color: "#0052CC" },
  { id: "notion", labelKey: "notion", icon: StickyNote, color: "#191919" },
  { id: "linear", labelKey: "linear", icon: GitBranch, color: "#5E6AD2" },
  { id: "github", labelKey: "github", icon: Github, color: "#24292F" },
  { id: "interviews", labelKey: "interviews", icon: Headphones, color: "#10B981" },
];

const OUTPUT_NODES: NodeDef[] = [
  { id: "prd", labelKey: "prd", icon: FileText, color: "#6366F1" },
  { id: "tickets", labelKey: "tickets", icon: ListChecks, color: "#8B5CF6" },
  { id: "brief", labelKey: "decisionBrief", icon: BookOpen, color: "#06B6D4" },
  { id: "roadmap", labelKey: "roadmap", icon: Map, color: "#F59E0B" },
];

/* ── SVG Animated Synapse (pulse traveling along a path) ── */
function Synapse({
  pathId,
  d,
  delay = 0,
  color = "#6366F1",
}: {
  pathId: string;
  d: string;
  delay?: number;
  color?: string;
}) {
  return (
    <g>
      {/* Faint axon line */}
      <path id={pathId} d={d} fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.06" />

      {/* Animated myelin pulse — dashes flowing along the axon */}
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.25"
        strokeDasharray="4 8"
        initial={{ strokeDashoffset: 100, opacity: 0 }}
        animate={{ strokeDashoffset: 0, opacity: 1 }}
        transition={{
          strokeDashoffset: { duration: 2.5, delay: delay + 0.3, repeat: Infinity, ease: "linear" },
          opacity: { duration: 0.6, delay },
        }}
      />

      {/* Action potential — bright dot traveling along axon */}
      <circle r="3" fill={color} opacity="0">
        <animateMotion dur="2s" repeatCount="indefinite" begin={`${delay + 0.5}s`}>
          <mpath href={`#${pathId}`} />
        </animateMotion>
        <animate
          attributeName="opacity"
          values="0;0.9;0.9;0"
          dur="2s"
          repeatCount="indefinite"
          begin={`${delay + 0.5}s`}
        />
      </circle>
      {/* Glow around the action potential */}
      <circle r="7" fill={color} opacity="0" filter="url(#synapseGlow)">
        <animateMotion dur="2s" repeatCount="indefinite" begin={`${delay + 0.5}s`}>
          <mpath href={`#${pathId}`} />
        </animateMotion>
        <animate
          attributeName="opacity"
          values="0;0.4;0.4;0"
          dur="2s"
          repeatCount="indefinite"
          begin={`${delay + 0.5}s`}
        />
      </circle>

      {/* Second pulse, staggered */}
      <circle r="2.5" fill="white" opacity="0">
        <animateMotion dur="2.2s" repeatCount="indefinite" begin={`${delay + 1.6}s`}>
          <mpath href={`#${pathId}`} />
        </animateMotion>
        <animate
          attributeName="opacity"
          values="0;0.7;0.7;0"
          dur="2.2s"
          repeatCount="indefinite"
          begin={`${delay + 1.6}s`}
        />
      </circle>
    </g>
  );
}

/* ── Dendrite input node (source tool) ── */
function DendriteNode({ node, index, label }: { node: NodeDef; index: number; label: string }) {
  return (
    <motion.div
      className="flex items-center gap-2.5 px-3 py-2 pr-4 w-full group cursor-default relative"
      initial={{ opacity: 0, x: -50, filter: "blur(4px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 180, damping: 18 }}
      whileHover={{ x: 6 }}
    >
      {/* Dendrite terminal bulb */}
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: node.color, filter: "blur(8px)" }}
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
        />
        <div
          className="relative h-9 w-9 rounded-full border flex items-center justify-center"
          style={{ borderColor: `${node.color}40`, backgroundColor: `${node.color}10` }}
        >
          <node.icon className="h-4 w-4" style={{ color: node.color }} />
        </div>
      </div>
      <span className="text-xs font-medium text-text-secondary group-hover:text-slate-900 transition-colors">
        {label}
      </span>
    </motion.div>
  );
}

/* ── Axon terminal node (output artifact) ── */
function AxonTerminal({ node, index, label }: { node: NodeDef; index: number; label: string }) {
  return (
    <motion.div
      className="flex items-center gap-2.5 px-3 py-2 pr-4 w-full group cursor-default"
      initial={{ opacity: 0, x: 50, filter: "blur(4px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{ delay: 0.5 + index * 0.12, type: "spring", stiffness: 180, damping: 18 }}
      whileHover={{ x: -6 }}
    >
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{ backgroundColor: node.color, filter: "blur(8px)" }}
          animate={{ opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
        />
        <div
          className="relative h-9 w-9 rounded-lg border flex items-center justify-center"
          style={{ borderColor: `${node.color}40`, backgroundColor: `${node.color}10` }}
        >
          <node.icon className="h-4 w-4" style={{ color: node.color }} />
        </div>
      </div>
      <span className="text-xs font-medium text-text-secondary group-hover:text-slate-900 transition-colors">
        {label}
      </span>
    </motion.div>
  );
}

/* ── The Soma — central NEURON processing hub ── */
function Soma({ multiAgentLabel }: { multiAgentLabel: string }) {
  return (
    <motion.div
      className="relative flex flex-col items-center justify-center"
      initial={{ opacity: 0, scale: 0.3, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ delay: 0.3, type: "spring", stiffness: 150, damping: 12 }}
    >
      {/* Outer membrane pulse rings */}
      {[0, 0.6, 1.2].map((d, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{
            width: 140 + i * 20,
            height: 140 + i * 20,
            borderColor: i === 0 ? "rgba(99,102,241,0.15)" : "rgba(139,92,246,0.1)",
          }}
          animate={{ scale: [1, 1.2 + i * 0.1, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: d, ease: "easeInOut" }}
        />
      ))}

      {/* Cytoplasm glow */}
      <div className="absolute w-32 h-32 rounded-full animate-spin-slow opacity-30">
        <div
          className="w-full h-full rounded-full"
          style={{
            background: "conic-gradient(from 0deg, transparent, rgba(99,102,241,0.4), transparent, rgba(139,92,246,0.3), transparent)",
            filter: "blur(12px)",
          }}
        />
      </div>

      {/* Cell body */}
      <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full flex flex-col items-center justify-center z-10"
        style={{
          background: "radial-gradient(circle at 40% 35%, #1E2535 0%, #161B27 60%, #0D0F14 100%)",
          border: "1.5px solid rgba(99,102,241,0.3)",
          boxShadow: "0 0 40px rgba(99,102,241,0.15), inset 0 0 20px rgba(99,102,241,0.05)",
        }}
      >
        {/* Nucleus */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <BrainCircuit className="h-8 w-8 md:h-10 md:w-10 text-primary" />
        </motion.div>
        <span className="text-[10px] md:text-xs font-bold mt-1 gradient-text-animated">NEURON</span>
      </div>

      {/* Axon hillock label */}
      <motion.div
        className="absolute -bottom-9 z-10 px-3 py-1 rounded-full"
        style={{
          background: "rgba(99,102,241,0.08)",
          border: "1px solid rgba(99,102,241,0.15)",
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-[10px] text-primary/80 font-medium">{multiAgentLabel}</span>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   Main Flow Graph — Desktop
   ═══════════════════════════════════════════ */
export default function FlowGraph() {
  const t = useTranslations("FlowGraph");
  const containerRef = useRef<HTMLDivElement>(null);
  const [paths, setPaths] = useState<{ src: string[]; out: string[] }>({ src: [], out: [] });

  const computePaths = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    const sourceEls = container.querySelectorAll("[data-dendrite]");
    const outputEls = container.querySelectorAll("[data-axon]");
    const hub = container.querySelector("[data-soma]");
    if (!hub || sourceEls.length === 0 || outputEls.length === 0) return;

    const hubRect = hub.getBoundingClientRect();
    const hx = hubRect.left + hubRect.width / 2 - rect.left;
    const hy = hubRect.top + hubRect.height / 2 - rect.top;

    const src: string[] = [];
    sourceEls.forEach((el) => {
      const r = el.getBoundingClientRect();
      const nx = r.right - rect.left;
      const ny = r.top + r.height / 2 - rect.top;
      const c1x = nx + (hx - nx) * 0.35;
      const c1y = ny;
      const c2x = nx + (hx - nx) * 0.65;
      const c2y = hy;
      src.push(`M ${nx} ${ny} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${hx - 52} ${hy}`);
    });

    const out: string[] = [];
    outputEls.forEach((el) => {
      const r = el.getBoundingClientRect();
      const nx = r.left - rect.left;
      const ny = r.top + r.height / 2 - rect.top;
      const c1x = hx + (nx - hx) * 0.35;
      const c1y = hy;
      const c2x = hx + (nx - hx) * 0.65;
      const c2y = ny;
      out.push(`M ${hx + 52} ${hy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${nx} ${ny}`);
    });

    setPaths({ src, out });
  }, []);

  useEffect(() => {
    const ti = setTimeout(computePaths, 500);
    window.addEventListener("resize", computePaths);
    return () => { clearTimeout(ti); window.removeEventListener("resize", computePaths); };
  }, [computePaths]);

  const srcColors = ["#E01E5A", "#0052CC", "#191919", "#5E6AD2", "#24292F", "#10B981"];
  const outColors = ["#6366F1", "#8B5CF6", "#06B6D4", "#F59E0B"];

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto hidden md:block">
      {/* SVG synapse layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: "visible" }}>
        <defs>
          <filter id="synapseGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {paths.src.map((d, i) => (
          <Synapse key={`s-${i}`} pathId={`dendrite-${i}`} d={d} delay={i * 0.18} color={srcColors[i]} />
        ))}
        {paths.out.map((d, i) => (
          <Synapse key={`o-${i}`} pathId={`axon-${i}`} d={d} delay={1 + i * 0.2} color={outColors[i]} />
        ))}
      </svg>

      {/* Node grid */}
      <div className="relative z-10 grid grid-cols-[170px_1fr_170px] items-center gap-4 lg:gap-8 min-h-[360px]">
        <div className="flex flex-col gap-1.5">
          {SOURCE_NODES.map((n, i) => (
            <div key={n.id} data-dendrite>
              <DendriteNode node={n} index={i} label={t(n.labelKey as "slack")} />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center" data-soma>
          <Soma multiAgentLabel={t("multiAgentAI")} />
        </div>
        <div className="flex flex-col gap-2">
          {OUTPUT_NODES.map((n, i) => (
            <div key={n.id} data-axon>
              <AxonTerminal node={n} index={i} label={t(n.labelKey as "prd")} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

/* ═══════════════════════════════════════════
   Mobile Flow — simplified vertical
   ═══════════════════════════════════════════ */
export function FlowGraphMobile() {
  const t = useTranslations("FlowGraph");

  return (
    <div className="md:hidden space-y-6">
      <div>
        <div className="grid grid-cols-3 gap-2">
          {SOURCE_NODES.map((node, i) => (
            <motion.div
              key={node.id}
              className="flex flex-col items-center gap-1.5 py-3 rounded-xl"
              style={{ border: `1px solid ${node.color}15`, background: `${node.color}05` }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }}
            >
              <div className="h-8 w-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${node.color}15` }}>
                <node.icon className="h-4 w-4" style={{ color: node.color }} />
              </div>
              <span className="text-[10px] text-text-secondary">{t(node.labelKey as "slack")}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Neural pulse arrow */}
      <motion.div className="flex flex-col items-center gap-1" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}>
        <div className="w-px h-6 bg-gradient-to-b from-primary/40 to-primary" />
        <div className="w-2 h-2 rounded-full bg-primary shadow-lg shadow-primary/50" />
        <div className="w-px h-6 bg-gradient-to-b from-primary to-primary/40" />
      </motion.div>

      {/* Soma */}
      <div className="flex justify-center">
        <motion.div
          className="relative w-20 h-20 rounded-full flex flex-col items-center justify-center"
          style={{
            background: "radial-gradient(circle at 40% 35%, #1E2535, #0D0F14)",
            border: "1.5px solid rgba(99,102,241,0.3)",
            boxShadow: "0 0 30px rgba(99,102,241,0.15)",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <BrainCircuit className="h-7 w-7 text-primary" />
          <span className="text-[9px] font-bold gradient-text-animated mt-0.5">NEURON</span>
        </motion.div>
      </div>

      {/* Neural pulse arrow */}
      <motion.div className="flex flex-col items-center gap-1" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>
        <div className="w-px h-6 bg-gradient-to-b from-violet-500/40 to-violet-500" />
        <div className="w-2 h-2 rounded-full bg-violet-500 shadow-lg shadow-violet-500/50" />
        <div className="w-px h-6 bg-gradient-to-b from-violet-500 to-violet-500/40" />
      </motion.div>

      {/* Outputs */}
      <div>
        <div className="grid grid-cols-2 gap-2">
          {OUTPUT_NODES.map((node, i) => (
            <motion.div
              key={node.id}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
              style={{ border: `1px solid ${node.color}15`, background: `${node.color}05` }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.08 }}
            >
              <div className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${node.color}15` }}>
                <node.icon className="h-3.5 w-3.5" style={{ color: node.color }} />
              </div>
              <span className="text-[11px] text-text-secondary font-medium">{t(node.labelKey as "prd")}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
