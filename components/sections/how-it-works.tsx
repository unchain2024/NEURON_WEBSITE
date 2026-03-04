"use client";

import { Link, Cpu, Rocket, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { BlurReveal, MotionDiv, blurIn } from "@/components/motion-wrapper";
import { motion } from "framer-motion";

const STEP_META: { number: number; icon: LucideIcon; key: string }[] = [
  { number: 1, icon: Link, key: "step1" },
  { number: 2, icon: Cpu, key: "step2" },
  { number: 3, icon: Rocket, key: "step3" },
];

export default function HowItWorks() {
  const t = useTranslations("HowItWorks");

  return (
    <section className="section-padding">
      <BlurReveal>
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
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

          <div className="relative grid md:grid-cols-3 gap-6 md:gap-8">
            {STEP_META.map((step) => (
              <MotionDiv key={step.number} variants={blurIn}>
                <motion.div
                  className="relative overflow-hidden rounded-2xl bg-emerald-50/60 border border-emerald-100/80 p-6 md:p-8 h-full"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Background step number */}
                  <span
                    className="absolute top-4 right-4 text-[7rem] md:text-[8rem] font-bold leading-none text-primary/[0.06] select-none pointer-events-none"
                    aria-hidden="true"
                  >
                    0{step.number}
                  </span>

                  {/* Icon */}
                  <div className="relative z-10 mb-5">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <step.icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="relative z-10 text-xl font-bold text-slate-900 mb-3">
                    {t(`${step.key}Title` as "step1Title")}
                  </h3>

                  {/* Description */}
                  <p className="relative z-10 text-text-secondary leading-relaxed">
                    {t(`${step.key}Description` as "step1Description")}
                  </p>
                </motion.div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </BlurReveal>
    </section>
  );
}
