"use client";

import { useTranslations } from "next-intl";
import { BlurReveal, MotionDiv, blurIn } from "@/components/motion-wrapper";
import { motion } from "framer-motion";

export default function FinalCTA() {
  const t = useTranslations("FinalCTA");

  return (
    <section className="section-padding">
      <BlurReveal>
        <div className="section-container">
          <MotionDiv variants={blurIn}>
            <div className="bg-gradient-to-br from-primary via-primary-600 to-violet-600 rounded-3xl px-6 py-16 md:px-12 md:py-24 text-center relative overflow-hidden">
              {/* Animated background orbs */}
              <div
                className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full animate-float-slow opacity-20"
                style={{
                  background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
                }}
              />
              <div
                className="absolute bottom-0 right-1/4 w-[200px] h-[200px] rounded-full animate-float-medium opacity-15"
                style={{
                  background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
                }}
              />

              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
                  {t("heading")}
                </h2>
                <p className="text-lg md:text-xl text-white/80 max-w-xl mx-auto mb-8">
                  {t("subheading")}
                </p>
                <motion.a
                  href="#"
                  className="inline-block bg-white text-slate-900 font-semibold px-8 py-3.5 rounded-xl text-base hover:bg-white/90 transition-colors shadow-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {t("cta")}
                </motion.a>
                <p className="mt-4 text-sm text-white/60">
                  {t("note")}
                </p>
              </div>
            </div>
          </MotionDiv>
        </div>
      </BlurReveal>
    </section>
  );
}
