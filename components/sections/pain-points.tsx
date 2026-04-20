"use client";

import {
  RotateCcw,
  AlertTriangle,
  XCircle,
  Search,
  Unlink,
  User,
  Clock,
  Calendar,
  ShieldOff,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

interface PainCard {
  icon: LucideIcon;
  key: string;
  color: string;
}

const PAIN_CARDS: PainCard[] = [
  { icon: RotateCcw, key: "1", color: "text-red-500 bg-red-50" },
  { icon: AlertTriangle, key: "2", color: "text-amber-500 bg-amber-50" },
  { icon: XCircle, key: "3", color: "text-rose-500 bg-rose-50" },
  { icon: Search, key: "4", color: "text-orange-500 bg-orange-50" },
  { icon: Unlink, key: "5", color: "text-purple-500 bg-purple-50" },
  { icon: User, key: "6", color: "text-slate-500 bg-slate-100" },
];

const COST_CARDS: { icon: LucideIcon; key: string }[] = [
  { icon: Clock, key: "1" },
  { icon: Calendar, key: "2" },
  { icon: ShieldOff, key: "3" },
];

export default function PainPoints() {
  const t = useTranslations("PainPoints");

  return (
    <section className="section-padding">
      <SectionReveal>
        <div className="section-container">
          {/* Section heading */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <MotionDiv variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
                {t("heading")}
              </h2>
            </MotionDiv>
          </div>

          {/* Pain point cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {PAIN_CARDS.map((card) => {
              const [iconText, iconBg] = card.color.split(" ");
              return (
                <MotionDiv key={card.key} variants={fadeInUp}>
                  <div className="rounded-2xl border border-slate-100 bg-white p-6 h-full transition-shadow hover:shadow-lg">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${iconBg} mb-4`}
                    >
                      <card.icon className={`h-5 w-5 ${iconText}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {t(`pain${card.key}Title` as "pain1Title")}
                    </h3>
                    <p className="text-text-secondary leading-relaxed text-sm">
                      {t(`pain${card.key}Description` as "pain1Description")}
                    </p>
                  </div>
                </MotionDiv>
              );
            })}
          </div>

          {/* Cost of Inaction sub-section */}
          <MotionDiv variants={fadeInUp}>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 md:p-12 shadow-sm">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 text-center mb-10">
                {t("costHeading")}
              </h3>

              <div className="grid sm:grid-cols-3 gap-8">
                {COST_CARDS.map((card) => (
                  <div key={card.key} className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                      <card.icon className="h-5 w-5 text-red-500" />
                    </div>
                    <p className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-rose-500 to-red-500 mb-1 tracking-tight">
                      {t(`cost${card.key}Value` as "cost1Value")}
                    </p>
                    <h4 className="text-sm font-semibold text-slate-900 mb-2">
                      {t(`cost${card.key}Title` as "cost1Title")}
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {t(`cost${card.key}Description` as "cost1Description")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </MotionDiv>
        </div>
      </SectionReveal>
    </section>
  );
}
