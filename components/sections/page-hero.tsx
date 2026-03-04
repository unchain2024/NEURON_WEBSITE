"use client";

import { useTranslations } from "next-intl";
import { MotionDiv, fadeInUp } from "@/components/motion-wrapper";

interface PageHeroProps {
  namespace: string;
}

export default function PageHero({ namespace }: PageHeroProps) {
  const t = useTranslations(namespace);

  return (
    <section className="relative section-padding pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      {/* Soft radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="section-container relative z-10">
        <MotionDiv
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.1 },
            },
          }}
          className="max-w-3xl mx-auto text-center"
        >
          <MotionDiv variants={fadeInUp}>
            <span className="inline-block text-sm font-medium text-primary tracking-wide uppercase mb-4">
              {t("heroEyebrow")}
            </span>
          </MotionDiv>

          <MotionDiv variants={fadeInUp}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
              {t.rich("heroTitle", {
                highlight: (chunks) => (
                  <span className="gradient-text">{chunks}</span>
                ),
              })}
            </h1>
          </MotionDiv>

          <MotionDiv variants={fadeInUp}>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
              {t("heroDescription")}
            </p>
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  );
}
