"use client";

import { motion } from "framer-motion";
import { Sparkles, Shield, Cpu, BarChart3, Layers, Workflow } from "lucide-react";

const badges = [
  { icon: Sparkles, label: "AI-Powered", x: "5%", y: "15%", delay: 0 },
  { icon: Shield, label: "Validated", x: "85%", y: "20%", delay: 0.5 },
  { icon: Cpu, label: "Multi-Agent", x: "10%", y: "70%", delay: 1.0 },
  { icon: BarChart3, label: "Insights", x: "88%", y: "65%", delay: 1.5 },
  { icon: Layers, label: "Traceable", x: "3%", y: "45%", delay: 0.7 },
  { icon: Workflow, label: "Automated", x: "92%", y: "42%", delay: 1.2 },
];

export default function FloatingBadges() {
  return (
    <div className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden="true">
      {badges.map((badge, i) => (
        <motion.div
          key={badge.label}
          className="absolute glass-card-light px-3 py-1.5 flex items-center gap-1.5"
          style={{ left: badge.x, top: badge.y }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 0.7, 0.5],
            scale: 1,
            y: [0, -8, 0, 8, 0],
          }}
          transition={{
            opacity: { delay: 1 + badge.delay, duration: 1 },
            scale: { delay: 1 + badge.delay, duration: 0.5, type: "spring" },
            y: {
              delay: 1.5 + badge.delay,
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <badge.icon className="h-3.5 w-3.5 text-primary" />
          <span className="text-[11px] text-text-secondary font-medium">{badge.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
