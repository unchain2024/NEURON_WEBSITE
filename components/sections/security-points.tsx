"use client";

import { useTranslations } from "next-intl";
import { KeyRound, Lock, SlidersHorizontal, BadgeCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

const POINTS = [
  { key: "point1", Icon: KeyRound },
  { key: "point2", Icon: Lock },
  { key: "point3", Icon: SlidersHorizontal },
  { key: "point4", Icon: BadgeCheck },
] as const;

export default function SecurityPoints() {
  const t = useTranslations("SecurityPage");

  return (
    <section className="section-padding pt-0">
      <SectionReveal>
        <div className="section-container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6">
            {POINTS.map(({ key, Icon }) => (
              <MotionDiv key={key} variants={fadeInUp}>
                <div className="h-full rounded-2xl border border-border bg-white p-6">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{t(`${key}Title`)}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{t(`${key}Body`)}</p>
                </div>
              </MotionDiv>
            ))}
          </div>

          <MotionDiv variants={fadeInUp} className="mt-12 text-center">
            <Link
              href="/get-demo"
              className="inline-block bg-primary hover:bg-primary-600 text-white px-8 py-3.5 rounded-xl text-base font-semibold transition-colors shadow-lg shadow-primary/25"
            >
              {t("ctaButton")}
            </Link>
          </MotionDiv>
        </div>
      </SectionReveal>
    </section>
  );
}
