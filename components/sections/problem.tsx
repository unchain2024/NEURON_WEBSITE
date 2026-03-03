"use client";

import { Clock, AlertTriangle, EyeOff, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { BlurReveal, MotionDiv, blurIn, fadeInUp } from "@/components/motion-wrapper";
import TiltCard from "@/components/tilt-card";
import AnimatedCounter from "@/components/animated-counter";

const PAIN_POINT_META: { icon: LucideIcon; borderColor: string; key: string }[] = [
  { icon: Clock, borderColor: "border-red-500/50", key: "pain1" },
  { icon: AlertTriangle, borderColor: "border-amber-500/50", key: "pain2" },
  { icon: EyeOff, borderColor: "border-red-500/50", key: "pain3" },
];

export default function Problem() {
  const t = useTranslations("Problem");

  return (
    <section id="problem" className="section-padding">
      <BlurReveal>
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <MotionDiv variants={blurIn}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                {t("heading")}
              </h2>
            </MotionDiv>
            <MotionDiv variants={blurIn}>
              <p className="mt-4 text-lg md:text-xl text-text-secondary">
                {t("subheading")}
              </p>
            </MotionDiv>
          </div>

          {/* Animated stat counters */}
          <MotionDiv variants={fadeInUp} className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text-animated">
                <AnimatedCounter target={30} suffix="–50%" />
              </div>
              <p className="text-sm text-text-muted mt-1">{t("stat1Label")}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text-animated">
                <AnimatedCounter target={3} suffix="x" />
              </div>
              <p className="text-sm text-text-muted mt-1">{t("stat2Label")}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text-animated">
                <AnimatedCounter target={0} suffix="%" prefix="" />
              </div>
              <p className="text-sm text-text-muted mt-1">{t("stat3Label")}</p>
            </div>
          </MotionDiv>

          <div className="grid md:grid-cols-3 gap-6">
            {PAIN_POINT_META.map((point) => (
              <MotionDiv key={point.key} variants={blurIn}>
                <TiltCard className="h-full group">
                  <div
                    className={`glass-card p-6 md:p-8 h-full border-l-2 ${point.borderColor} group-hover:border-l-primary transition-colors duration-300`}
                  >
                    <div className="p-2.5 rounded-xl bg-white/5 w-fit mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                      <point.icon className="h-6 w-6 text-text-secondary group-hover:text-primary transition-colors duration-300" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">
                      {t(`${point.key}Title` as "pain1Title")}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {t(`${point.key}Description` as "pain1Description")}
                    </p>
                  </div>
                </TiltCard>
              </MotionDiv>
            ))}
          </div>
        </div>
      </BlurReveal>
    </section>
  );
}
