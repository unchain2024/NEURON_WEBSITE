"use client";

import {
  ShieldAlert,
  Activity,
  LayoutGrid,
  Brain,
  FileText,
  BookOpen,
  GitBranch,
  MessageSquare,
  AlertOctagon,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { BlurReveal, MotionDiv, blurIn } from "@/components/motion-wrapper";

const PM_ICONS: LucideIcon[] = [ShieldAlert, Activity, LayoutGrid, Brain, FileText];
const ENGINEER_ICONS: LucideIcon[] = [BookOpen, GitBranch, MessageSquare, AlertOctagon, HelpCircle];

const FEATURE_KEYS = ["feature1", "feature2", "feature3", "feature4", "feature5"] as const;
const SCENARIO_KEYS = ["scenario1", "scenario2", "scenario3"] as const;

interface PersonaFeaturesProps {
  persona: "pm" | "engineer";
}

export default function PersonaFeatures({ persona }: PersonaFeaturesProps) {
  const namespace = persona === "pm" ? "PMFeatures" : "EngineerFeatures";
  const t = useTranslations(namespace);
  const icons = persona === "pm" ? PM_ICONS : ENGINEER_ICONS;

  return (
    <section className="section-padding">
      <BlurReveal>
        <div className="section-container">
          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <MotionDiv variants={blurIn}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
                {t("heading")}
              </h2>
            </MotionDiv>
          </div>

          {/* Feature cards grid — 2 cols on md, 5th card centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {FEATURE_KEYS.map((key, idx) => {
              const Icon = icons[idx];
              const isLast = idx === FEATURE_KEYS.length - 1;
              return (
                <MotionDiv
                  key={key}
                  variants={blurIn}
                  className={isLast ? "md:col-span-2 md:max-w-md md:mx-auto" : ""}
                >
                  <div className="glass-card p-6 h-full">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {t(`${key}Title`)}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {t(`${key}Description`)}
                    </p>
                  </div>
                </MotionDiv>
              );
            })}
          </div>

          {/* Scenario cards — dark terminal-style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SCENARIO_KEYS.map((key, idx) => (
              <MotionDiv key={key} variants={blurIn}>
                <div className="bg-slate-900 text-white rounded-2xl p-6 h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                    </div>
                    <span className="text-xs text-slate-400 font-mono ml-2">
                      scenario_{idx + 1}
                    </span>
                  </div>
                  <h4 className="text-base font-semibold text-white mb-2">
                    {t(`${key}Title`)}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {t(`${key}Description`)}
                  </p>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </BlurReveal>
    </section>
  );
}
