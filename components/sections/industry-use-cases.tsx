"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";
import { AnimatePresence, motion } from "framer-motion";
import {
  Monitor,
  Gamepad2,
  Landmark,
  ShoppingCart,
  HeartPulse,
  Film,
  Truck,
  Quote,
  type LucideIcon,
} from "lucide-react";

const INDUSTRIES: { key: string; icon: LucideIcon; color: string }[] = [
  { key: "saas", icon: Monitor, color: "emerald" },
  { key: "gaming", icon: Gamepad2, color: "violet" },
  { key: "fintech", icon: Landmark, color: "blue" },
  { key: "ecommerce", icon: ShoppingCart, color: "amber" },
  { key: "healthcare", icon: HeartPulse, color: "rose" },
  { key: "media", icon: Film, color: "purple" },
  { key: "logistics", icon: Truck, color: "cyan" },
];

const colorMap: Record<string, { bg: string; text: string; ring: string; iconBg: string; quoteBg: string; quoteBorder: string }> = {
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", ring: "ring-emerald-500/20", iconBg: "bg-emerald-100", quoteBg: "bg-emerald-50/60", quoteBorder: "border-emerald-200" },
  violet: { bg: "bg-violet-50", text: "text-violet-700", ring: "ring-violet-500/20", iconBg: "bg-violet-100", quoteBg: "bg-violet-50/60", quoteBorder: "border-violet-200" },
  blue: { bg: "bg-blue-50", text: "text-blue-700", ring: "ring-blue-500/20", iconBg: "bg-blue-100", quoteBg: "bg-blue-50/60", quoteBorder: "border-blue-200" },
  amber: { bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-500/20", iconBg: "bg-amber-100", quoteBg: "bg-amber-50/60", quoteBorder: "border-amber-200" },
  rose: { bg: "bg-rose-50", text: "text-rose-700", ring: "ring-rose-500/20", iconBg: "bg-rose-100", quoteBg: "bg-rose-50/60", quoteBorder: "border-rose-200" },
  purple: { bg: "bg-purple-50", text: "text-purple-700", ring: "ring-purple-500/20", iconBg: "bg-purple-100", quoteBg: "bg-purple-50/60", quoteBorder: "border-purple-200" },
  cyan: { bg: "bg-cyan-50", text: "text-cyan-700", ring: "ring-cyan-500/20", iconBg: "bg-cyan-100", quoteBg: "bg-cyan-50/60", quoteBorder: "border-cyan-200" },
};

export default function IndustryUseCases() {
  const t = useTranslations("IndustryUseCases");
  const [active, setActive] = useState("saas");

  const activeIndustry = INDUSTRIES.find((i) => i.key === active)!;
  const colors = colorMap[activeIndustry.color];

  return (
    <section className="section-padding">
      <SectionReveal>
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
            <MotionDiv variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
                {t("heading")}
              </h2>
              <p className="mt-4 text-lg text-text-secondary leading-relaxed">
                {t("subheading")}
              </p>
            </MotionDiv>
          </div>

          <MotionDiv variants={fadeInUp}>
            {/* Industry selector — clean pill row */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex flex-wrap justify-center gap-2">
                {INDUSTRIES.map((ind) => {
                  const isActive = ind.key === active;
                  const c = colorMap[ind.color];
                  return (
                    <button
                      key={ind.key}
                      onClick={() => setActive(ind.key)}
                      className={`
                        inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium
                        transition-all duration-200 border
                        ${isActive
                          ? `${c.bg} ${c.text} border-transparent ring-2 ${c.ring} shadow-sm`
                          : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700"
                        }
                      `}
                    >
                      <ind.icon className="h-4 w-4" />
                      <span>{t(`${ind.key}.name`)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content cards */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="grid md:grid-cols-2 gap-6 lg:gap-8"
              >
                {/* Leadership card */}
                <div className="group rounded-2xl border border-slate-200 bg-white p-6 lg:p-8 transition-all hover:shadow-md hover:border-slate-300">
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`h-10 w-10 rounded-xl ${colors.iconBg} flex items-center justify-center`}>
                      <activeIndustry.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div>
                      <span className={`text-xs font-semibold ${colors.text} uppercase tracking-wider`}>
                        {t(`${active}.leaderRole`)}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
                    {t(`${active}.leaderTitle`)}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    {t(`${active}.leaderDesc`)}
                  </p>

                  <div className={`rounded-xl ${colors.quoteBg} border ${colors.quoteBorder} p-5`}>
                    <Quote className={`h-4 w-4 ${colors.text} opacity-40 mb-2`} />
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {t(`${active}.leaderExample`)}
                    </p>
                  </div>
                </div>

                {/* Team card */}
                <div className="group rounded-2xl border border-slate-200 bg-white p-6 lg:p-8 transition-all hover:shadow-md hover:border-slate-300">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center">
                      <activeIndustry.icon className="h-5 w-5 text-slate-600" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {t(`${active}.teamRole`)}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
                    {t(`${active}.teamTitle`)}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    {t(`${active}.teamDesc`)}
                  </p>

                  <div className="rounded-xl bg-slate-50 border border-slate-200 p-5">
                    <Quote className="h-4 w-4 text-slate-400 opacity-40 mb-2" />
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {t(`${active}.teamExample`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </MotionDiv>
        </div>
      </SectionReveal>
    </section>
  );
}
