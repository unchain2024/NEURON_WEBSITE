"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface FeatureItem {
  key: string;
  title: string;
  description: string;
  visual: ReactNode;
}

interface FeatureShowcaseProps {
  features: FeatureItem[];
}

export default function FeatureShowcase({ features }: FeatureShowcaseProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 items-start">
      {/* Left — accordion */}
      <div className="space-y-1">
        {features.map((f, i) => {
          const isActive = i === active;
          return (
            <button
              key={f.key}
              onClick={() => setActive(i)}
              className="w-full text-left group"
            >
              <div className="flex">
                {/* Left accent bar */}
                <div
                  className={`w-1 rounded-full shrink-0 transition-colors duration-300 ${
                    isActive ? "bg-primary" : "bg-transparent group-hover:bg-slate-200"
                  }`}
                />
                <div className={`flex-1 pl-5 py-4 transition-colors duration-200 ${
                  isActive ? "" : "hover:bg-slate-50/50"
                } rounded-r-lg`}>
                  <h3
                    className={`text-base font-semibold transition-colors duration-200 ${
                      isActive ? "text-primary" : "text-slate-700"
                    }`}
                  >
                    {f.title}
                  </h3>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 text-sm text-text-secondary leading-relaxed pr-4">
                          {f.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Right — visual */}
      <div className="relative min-h-[320px] md:min-h-[380px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
          >
            {features[active].visual}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
