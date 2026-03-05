"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";
import {
  motion,
  useInView,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

const STATS = [
  { key: "stat1", suffix: "%" },
  { key: "stat2", suffix: "" },
  { key: "stat3", suffix: "%" },
  { key: "stat4", suffix: "%" },
] as const;

const NUMERIC: Record<string, number> = {
  stat1: 40,
  stat2: 8,
  stat3: 100,
  stat4: 60,
};

function AnimatedNumber({
  value,
  suffix,
  prefix,
  inView,
}: {
  value: number;
  suffix: string;
  prefix: string;
  inView: boolean;
}) {
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (v: number) => Math.round(v));

  if (inView) {
    spring.set(value);
  }

  return (
    <span className="tabular-nums">
      {prefix}
      <AnimatedDigits value={display} />
      {suffix}
    </span>
  );
}

function AnimatedDigits({ value }: { value: MotionValue<number> }) {
  return <motion.span>{value}</motion.span>;
}

export default function StatsBar() {
  const t = useTranslations("StatsBar");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section ref={ref} className="py-16 md:py-20">
      <div className="section-container">
        <div className="rounded-2xl bg-slate-50/80 border border-slate-100 px-6 py-10 md:px-10 md:py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {STATS.map((stat) => (
              <div key={stat.key} className="text-center">
                <div className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight gradient-text mb-2">
                  <AnimatedNumber
                    value={NUMERIC[stat.key]}
                    suffix={stat.suffix}
                    prefix={t(`${stat.key}Prefix` as "stat1Prefix")}
                    inView={inView}
                  />
                </div>
                <p className="text-sm md:text-base text-text-secondary leading-snug max-w-[180px] mx-auto">
                  {t(`${stat.key}Label` as "stat1Label")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
