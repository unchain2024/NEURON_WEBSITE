"use client";

import { useTranslations } from "next-intl";
import { Radar, Brain, Layers, MessagesSquare } from "lucide-react";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";
import ImagePlaceholder from "@/components/image-placeholder";

const CAPS = [
  { key: "cap1", Icon: Radar },
  { key: "cap2", Icon: Brain },
  { key: "cap3", Icon: Layers },
  { key: "cap4", Icon: MessagesSquare },
] as const;

export default function HomeCapabilities() {
  const t = useTranslations("Home");

  return (
    <section className="section-padding">
      <SectionReveal>
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-14 lg:mb-20">
            <MotionDiv variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
                {t("capHeading")}
              </h2>
            </MotionDiv>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {CAPS.map(({ key, Icon }) => (
              <MotionDiv key={key} variants={fadeInUp}>
                <div className="h-full rounded-2xl border border-border bg-white p-7 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {t(`${key}Title`)}
                    </h3>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed mb-5">
                    {t(`${key}Body`)}
                  </p>
                  <div className="mt-auto">
                    <ImagePlaceholder caption={t(`${key}Image`)} aspect="aspect-[16/7]" />
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
