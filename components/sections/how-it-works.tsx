"use client";

import { useState } from "react";
import { Link, Cpu, Rocket, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { BlurReveal, MotionDiv, blurIn } from "@/components/motion-wrapper";
import { motion, AnimatePresence } from "framer-motion";
import FlowGraph from "@/components/flow-graph";

const STEP_META: { number: number; icon: LucideIcon; key: string }[] = [
  { number: 1, icon: Link, key: "step1" },
  { number: 2, icon: Cpu, key: "step2" },
  { number: 3, icon: Rocket, key: "step3" },
];

export default function HowItWorks() {
  const t = useTranslations("HowItWorks");
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="section-padding">
      <BlurReveal>
        <div className="section-container">
          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
            <MotionDiv variants={blurIn}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
                {t("heading")}
              </h2>
            </MotionDiv>
            <MotionDiv variants={blurIn}>
              <p className="mt-4 text-lg text-text-secondary">
                {t("subheading")}
              </p>
            </MotionDiv>
          </div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-12 items-start">
            {/* Left — Vertical accordion */}
            <div className="flex flex-col gap-3">
              {STEP_META.map((step, i) => {
                const isActive = activeStep === i;
                return (
                  <MotionDiv key={step.number} variants={blurIn}>
                    <motion.div
                      className={`relative overflow-hidden rounded-2xl p-5 md:p-6 cursor-pointer transition-colors ${
                        isActive
                          ? "bg-emerald-50/60 border border-emerald-100/80"
                          : "bg-white border border-slate-100 hover:border-slate-200"
                      }`}
                      onClick={() => setActiveStep(i)}
                      onMouseEnter={() => setActiveStep(i)}
                      whileHover={{ y: -2 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      {/* Background step number */}
                      <span
                        className="absolute top-3 right-4 text-[5rem] md:text-[6rem] font-bold leading-none text-primary/[0.06] select-none pointer-events-none"
                        aria-hidden="true"
                      >
                        0{step.number}
                      </span>

                      {/* Icon + Title row */}
                      <div className="relative z-10 flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                          <step.icon className="h-4 w-4 text-primary" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">
                          {t(`${step.key}Title` as "step1Title")}
                        </h3>
                      </div>

                      {/* Expandable description */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              height: { duration: 0.3, ease: "easeInOut" },
                              opacity: { duration: 0.2, delay: 0.05 },
                            }}
                            className="overflow-hidden"
                          >
                            <p className="relative z-10 mt-3 text-text-secondary leading-relaxed pl-[52px]">
                              {t(
                                `${step.key}Description` as "step1Description"
                              )}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </MotionDiv>
                );
              })}
            </div>

            {/* Right — FlowGraph */}
            <MotionDiv variants={blurIn}>
              <FlowGraph />
            </MotionDiv>
          </div>
        </div>
      </BlurReveal>
    </section>
  );
}
