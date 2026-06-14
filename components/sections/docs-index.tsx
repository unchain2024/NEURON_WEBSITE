"use client";

import { useTranslations } from "next-intl";
import {
  Rocket,
  PlugZap,
  Compass,
  Settings,
  HelpCircle,
  Code2,
  History,
} from "lucide-react";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

const ICONS = [Rocket, PlugZap, Compass, Settings, HelpCircle, Code2, History];

interface DocSection {
  title: string;
  body: string;
}

export default function DocsIndex() {
  const t = useTranslations("DocsPage");
  const sections = t.raw("sections") as DocSection[];

  return (
    <section className="section-padding pt-0">
      <SectionReveal>
        <div className="section-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sections.map((s, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <MotionDiv key={i} variants={fadeInUp}>
                  <div className="h-full rounded-2xl border border-border bg-white p-6">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-lg font-semibold text-slate-900 mb-2">{s.title}</h2>
                    <p className="text-sm text-text-secondary leading-relaxed">{s.body}</p>
                  </div>
                </MotionDiv>
              );
            })}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
