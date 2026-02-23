"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";

/* ── Node definitions ── */
const SOURCE_NODES = [
  { id: "slack", label: "Slack", icon: MessageSquare, color: "#E01E5A" },
  { id: "jira", label: "Jira", icon: Trello, color: "#0052CC" },
  { id: "notion", label: "Notion", icon: StickyNote, color: "#FFFFFF" },
  { id: "linear", label: "Linear", icon: GitBranch, color: "#5E6AD2" },
  { id: "github", label: "GitHub", icon: Github, color: "#FFFFFF" },
  { id: "interviews", label: "Interviews", icon: Headphones, color: "#10B981" },
];

const OUTPUT_NODES = [
  { id: "prd", label: "PRD", icon: FileText, color: "#6366F1" },
  { id: "tickets", label: "Tickets", icon: ListChecks, color: "#8B5CF6" },
  { id: "brief", label: "Decision Brief", icon: BookOpen, color: "#06B6D4" },
  { id: "roadmap", label: "Roadmap", icon: Map, color: "#F59E0B" },
];

/* ── Animated particle that follows an SVG path ── */
function Particle({ pathId, delay, duration, color }: { pathId: string; delay: number; duration: number; color: string }) {
  return (
    <motion.circle
      r="3"
      fill={color}
      filter="url(#glow)"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: duration * 0.3,
        ease: "linear",
      }}
    >
      <animateMotion
        dur={`${duration}s`}
        repeatCount="indefinite"
        begin={`${delay}s`}
      >
        <mpath href={`#${pathId}`} />
      </animateMotion>
    </motion.circle>
  );
}

/* ── Single animated beam line with particles ── */
function AnimatedBeam({
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
      {/* Ghost/glow path */}
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeOpacity="0.08"
        id={pathId}
      />
      {/* Animated dashed path */}
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.35"
        strokeDasharray="8 6"
        initial={{ strokeDashoffset: 200, opacity: 0 }}
        animate={{ strokeDashoffset: 0, opacity: 1 }}
        transition={{
          strokeDashoffset: {
            duration: 3,
            delay: delay + 0.5,
            repeat: Infinity,
            ease: "linear",
          },
          opacity: { duration: 0.8, delay },
        }}
      />
      {/* Traveling particles */}
      <Particle pathId={pathId} delay={delay + 0.8} duration={2.5} color={color} />
      <Particle pathId={pathId} delay={delay + 2.0} duration={2.5} color={color} />
    </g>
  );
}

/* ── Source node card ── */
function SourceNode({
  node,
  index,
}: {
  node: (typeof SOURCE_NODES)[number];
  index: number;
}) {
  return (
    <motion.div
      className="flex items-center gap-2.5 glass-card-light px-3 py-2 pr-4 w-full group hover:border-white/20 transition-all cursor-default"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: 0.3 + index * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      whileHover={{ x: 4, scale: 1.02 }}
    >
      <div
        className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${node.color}15` }}
      >
        <node.icon className="h-4 w-4" style={{ color: node.color }} />
      </div>
      <span className="text-xs font-medium text-text-secondary group-hover:text-white transition-colors truncate">
        {node.label}
      </span>
    </motion.div>
  );
}

/* ── Output node card ── */
function OutputNode({
  node,
  index,
}: {
  node: (typeof OUTPUT_NODES)[number];
  index: number;
}) {
  return (
    <motion.div
      className="flex items-center gap-2.5 glass-card-light px-3 py-2 pr-4 w-full group hover:border-white/20 transition-all cursor-default"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: 0.6 + index * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      whileHover={{ x: -4, scale: 1.02 }}
    >
      <div
        className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${node.color}15` }}
      >
        <node.icon className="h-4 w-4" style={{ color: node.color }} />
      </div>
      <span className="text-xs font-medium text-text-secondary group-hover:text-white transition-colors truncate">
        {node.label}
      </span>
    </motion.div>
  );
}

/* ── Central NEURON hub ── */
function NeuronHub() {
  return (
    <motion.div
      className="relative flex flex-col items-center justify-center"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 15 }}
    >
      {/* Outer pulsing rings */}
      <motion.div
        className="absolute w-32 h-32 md:w-40 md:h-40 rounded-full border border-primary/20"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-32 h-32 md:w-40 md:h-40 rounded-full border border-violet-500/20"
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Rotating gradient ring */}
      <div className="absolute w-28 h-28 md:w-36 md:h-36 rounded-full animate-spin-slow opacity-40">
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, #6366F1 25%, transparent 50%, #8B5CF6 75%, transparent 100%)",
            filter: "blur(8px)",
          }}
        />
      </div>

      {/* Main hub */}
      <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-surface border-2 border-primary/40 flex flex-col items-center justify-center z-10 shadow-lg shadow-primary/20">
        <BrainCircuit className="h-8 w-8 md:h-10 md:w-10 text-primary" />
        <span className="text-[10px] md:text-xs font-bold mt-1 gradient-text-animated">
          NEURON
        </span>
      </div>

      {/* Processing label */}
      <motion.div
        className="absolute -bottom-8 glass-card-light px-3 py-1 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-[10px] text-primary font-medium">Multi-Agent AI</span>
      </motion.div>
    </motion.div>
  );
}

/* ── Main flow graph ── */
export default function FlowGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [paths, setPaths] = useState<{
    sourcePaths: string[];
    outputPaths: string[];
  }>({ sourcePaths: [], outputPaths: [] });

  const computePaths = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    const sourceNodes = container.querySelectorAll("[data-source-node]");
    const outputNodes = container.querySelectorAll("[data-output-node]");
    const hub = container.querySelector("[data-hub]");

    if (!hub || sourceNodes.length === 0 || outputNodes.length === 0) return;

    const hubRect = hub.getBoundingClientRect();
    const hubCX = hubRect.left + hubRect.width / 2 - rect.left;
    const hubCY = hubRect.top + hubRect.height / 2 - rect.top;

    const newSourcePaths: string[] = [];
    sourceNodes.forEach((node) => {
      const nodeRect = node.getBoundingClientRect();
      const nx = nodeRect.right - rect.left;
      const ny = nodeRect.top + nodeRect.height / 2 - rect.top;
      const cp1x = nx + (hubCX - nx) * 0.4;
      const cp2x = nx + (hubCX - nx) * 0.7;
      newSourcePaths.push(
        `M ${nx} ${ny} C ${cp1x} ${ny}, ${cp2x} ${hubCY}, ${hubCX - 50} ${hubCY}`
      );
    });

    const newOutputPaths: string[] = [];
    outputNodes.forEach((node) => {
      const nodeRect = node.getBoundingClientRect();
      const nx = nodeRect.left - rect.left;
      const ny = nodeRect.top + nodeRect.height / 2 - rect.top;
      const cp1x = hubCX + (nx - hubCX) * 0.3;
      const cp2x = hubCX + (nx - hubCX) * 0.6;
      newOutputPaths.push(
        `M ${hubCX + 50} ${hubCY} C ${cp1x} ${hubCY}, ${cp2x} ${ny}, ${nx} ${ny}`
      );
    });

    setPaths({ sourcePaths: newSourcePaths, outputPaths: newOutputPaths });
  }, []);

  useEffect(() => {
    // Delay to let the nodes render and settle
    const timer = setTimeout(computePaths, 600);
    window.addEventListener("resize", computePaths);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", computePaths);
    };
  }, [computePaths]);

  const sourceColors = ["#E01E5A", "#0052CC", "#FFFFFF", "#5E6AD2", "#FFFFFF", "#10B981"];
  const outputColors = ["#6366F1", "#8B5CF6", "#06B6D4", "#F59E0B"];

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto hidden md:block">
      {/* SVG connection layer */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ overflow: "visible" }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Source → Hub beams */}
        {paths.sourcePaths.map((d, i) => (
          <AnimatedBeam
            key={`src-${i}`}
            pathId={`source-path-${i}`}
            d={d}
            delay={i * 0.2}
            color={sourceColors[i] || "#6366F1"}
          />
        ))}

        {/* Hub → Output beams */}
        {paths.outputPaths.map((d, i) => (
          <AnimatedBeam
            key={`out-${i}`}
            pathId={`output-path-${i}`}
            d={d}
            delay={1.2 + i * 0.2}
            color={outputColors[i] || "#6366F1"}
          />
        ))}
      </svg>

      {/* Nodes grid */}
      <div className="relative z-10 grid grid-cols-[180px_1fr_180px] items-center gap-4 lg:gap-8 min-h-[340px]">
        {/* Left: source nodes */}
        <div className="flex flex-col gap-2">
          {SOURCE_NODES.map((node, i) => (
            <div key={node.id} data-source-node>
              <SourceNode node={node} index={i} />
            </div>
          ))}
        </div>

        {/* Center: NEURON hub */}
        <div className="flex items-center justify-center" data-hub>
          <NeuronHub />
        </div>

        {/* Right: output nodes */}
        <div className="flex flex-col gap-2">
          {OUTPUT_NODES.map((node, i) => (
            <div key={node.id} data-output-node>
              <OutputNode node={node} index={i} />
            </div>
          ))}
        </div>
      </div>

      {/* Labels */}
      <div className="relative z-10 grid grid-cols-[180px_1fr_180px] mt-4 text-center">
        <p className="text-[11px] text-text-muted font-medium uppercase tracking-wider">Signal Sources</p>
        <p className="text-[11px] text-text-muted font-medium uppercase tracking-wider">Processing</p>
        <p className="text-[11px] text-text-muted font-medium uppercase tracking-wider">Structured Output</p>
      </div>
    </div>
  );
}

/* ── Mobile-friendly version (simplified) ── */
export function FlowGraphMobile() {
  return (
    <div className="md:hidden space-y-6">
      {/* Sources */}
      <div>
        <p className="text-[11px] text-text-muted font-medium uppercase tracking-wider mb-3 text-center">
          Signal Sources
        </p>
        <div className="grid grid-cols-3 gap-2">
          {SOURCE_NODES.map((node, i) => (
            <motion.div
              key={node.id}
              className="flex flex-col items-center gap-1.5 glass-card-light px-2 py-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
            >
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${node.color}15` }}
              >
                <node.icon className="h-4 w-4" style={{ color: node.color }} />
              </div>
              <span className="text-[10px] text-text-secondary">{node.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Arrow down */}
      <motion.div
        className="flex justify-center"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent relative">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-primary/50" />
        </div>
      </motion.div>

      {/* NEURON Hub */}
      <div className="flex justify-center">
        <motion.div
          className="relative w-20 h-20 rounded-full bg-surface border-2 border-primary/40 flex flex-col items-center justify-center shadow-lg shadow-primary/20"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <BrainCircuit className="h-7 w-7 text-primary" />
          <span className="text-[9px] font-bold gradient-text-animated mt-0.5">NEURON</span>
        </motion.div>
      </div>

      {/* Arrow down */}
      <motion.div
        className="flex justify-center"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      >
        <div className="w-px h-8 bg-gradient-to-b from-violet-500/50 to-transparent relative">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-violet-500/50" />
        </div>
      </motion.div>

      {/* Outputs */}
      <div>
        <p className="text-[11px] text-text-muted font-medium uppercase tracking-wider mb-3 text-center">
          Structured Output
        </p>
        <div className="grid grid-cols-2 gap-2">
          {OUTPUT_NODES.map((node, i) => (
            <motion.div
              key={node.id}
              className="flex items-center gap-2 glass-card-light px-3 py-2.5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.08 }}
            >
              <div
                className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${node.color}15` }}
              >
                <node.icon className="h-3.5 w-3.5" style={{ color: node.color }} />
              </div>
              <span className="text-[11px] text-text-secondary font-medium">{node.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
