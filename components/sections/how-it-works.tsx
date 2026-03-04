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

          <div className="relative grid md:grid-cols-3 gap-8 md:gap-12">
            {STEP_META.map((step, i) => (
              <MotionDiv key={step.number} variants={blurIn} className="relative text-center">
                {/* Icon + label circle with pulse ring */}
                <div className="relative inline-flex items-center justify-center mb-8 mx-auto">
                  <motion.div
                    className="absolute rounded-full bg-primary/20"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: "easeInOut",
                    }}
                    style={{ width: 104, height: 104 }}
                  />
                  <div className="relative h-26 w-26 rounded-full bg-primary/10 border-2 border-primary text-primary flex flex-col items-center justify-center z-10" style={{ width: 104, height: 104 }}>
                    <step.icon className="h-6 w-6 mb-1.5" />
                    <span className="font-bold text-[11px] tracking-wide uppercase">{t(`${step.key}Title` as "step1Title")}</span>
                  </div>
                </div>

                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <p className="text-text-secondary leading-relaxed max-w-xs mx-auto">
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
