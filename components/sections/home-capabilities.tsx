"use client";

import { useTranslations } from "next-intl";
import { Radar, Brain, Layers, MessagesSquare } from "lucide-react";
import { cn } from "@/lib/utils";
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
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-24">
          <SectionReveal>
            <MotionDiv variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
                {t("capHeading")}
              </h2>
            </MotionDiv>
          </SectionReveal>
        </div>

        <div className="space-y-20 lg:space-y-28">
          {CAPS.map(({ key, Icon }, i) => {
            const imageRight = i % 2 === 0;
            return (
              <SectionReveal key={key}>
                <MotionDiv variants={fadeInUp}>
                  <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Text */}
                    <div className={cn(imageRight ? "" : "lg:order-2")}>
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
                        {t(`${key}Title`)}
                      </h3>
                      <p className="mt-5 text-lg text-text-secondary leading-relaxed">
                        {t(`${key}Body`)}
                      </p>
                    </div>

                    {/* Image */}
                    <div className={cn(imageRight ? "" : "lg:order-1")}>
                      <ImagePlaceholder caption={t(`${key}Image`)} />
                    </div>
                  </div>
                </MotionDiv>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
