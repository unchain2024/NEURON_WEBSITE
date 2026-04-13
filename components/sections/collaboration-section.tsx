"use client";

import { Users, Bot, Code, MessageCircle, Lightbulb, Rocket, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

const ROLE_META: { icon: LucideIcon; key: string; roleKey: string; descKey: string }[] = [
  { icon: Users, key: "pm", roleKey: "pmRole", descKey: "pmDescription" },
  { icon: Bot, key: "ai", roleKey: "aiRole", descKey: "aiDescription" },
  { icon: Code, key: "eng", roleKey: "engRole", descKey: "engDescription" },
];

const OUTCOME_META: { icon: LucideIcon; number: string; titleKey: string; descKey: string }[] = [
  { icon: MessageCircle, number: "01", titleKey: "outcome1Title", descKey: "outcome1Description" },
  { icon: Lightbulb, number: "02", titleKey: "outcome2Title", descKey: "outcome2Description" },
  { icon: Rocket, number: "03", titleKey: "outcome3Title", descKey: "outcome3Description" },
];

export default function CollaborationSection() {
  const t = useTranslations("Collaboration");

  return (
    <section className="section-padding">
      <SectionReveal>
        <div className="section-container">
          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
            <MotionDiv variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
                {t("heading")}
              </h2>
            </MotionDiv>
          </div>

          {/* Three role circles with connecting lines */}
          <MotionDiv variants={fadeInUp}>
            <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-16 lg:mb-20">
              {/* Connecting line (horizontal on md+) */}
              <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />
              {/* Connecting line (vertical on mobile) */}
              <div className="md:hidden absolute top-0 left-1/2 -translate-x-1/2 h-full w-px bg-gradient-to-b from-transparent via-emerald-300 to-transparent" />

              {ROLE_META.map((role) => (
                <div key={role.key} className="relative z-10 flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div className="relative h-20 w-20 md:h-24 md:w-24 rounded-full bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-200 flex items-center justify-center shadow-lg">
                      <role.icon className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-slate-900 mb-1">
                    {t(role.roleKey as "pmRole")}
                  </h3>
                  <p className="text-sm text-text-secondary max-w-[180px] leading-relaxed">
                    {t(role.descKey as "pmDescription")}
                  </p>
                </div>
              ))}
            </div>
          </MotionDiv>

          {/* Three outcome cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {OUTCOME_META.map((step) => (
              <MotionDiv key={step.number} variants={fadeInUp}>
                <div className="glass-card rounded-2xl p-6 md:p-8 h-full relative overflow-hidden group hover:border-emerald-200 transition-colors">
                  <span
                    className="absolute top-3 right-4 text-[5rem] md:text-[6rem] font-bold leading-none text-primary/[0.06] select-none pointer-events-none"
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                  <div className="relative z-10">
                    <div className="p-2.5 rounded-xl bg-primary/10 w-fit mb-4">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-slate-900">
                      {t(step.titleKey as "outcome1Title")}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {t(step.descKey as "outcome1Description")}
                    </p>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
