"use client";

import { useTranslations } from "next-intl";
import { Crown, Compass, Users } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

const ROLES = [
  { key: "role1", Icon: Crown },
  { key: "role2", Icon: Compass },
  { key: "role3", Icon: Users },
] as const;

export default function SolutionsByRole() {
  const t = useTranslations("SolutionsByRole");

  return (
    <section className="section-padding pt-0">
      <SectionReveal>
        <div className="section-container max-w-5xl">
          <div className="space-y-6">
            {ROLES.map(({ key, Icon }) => (
              <MotionDiv key={key} variants={fadeInUp}>
                <div className="rounded-2xl border border-border bg-white p-7 md:p-8 flex flex-col md:flex-row gap-6 md:items-start">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                      {t(`${key}Title`)}
                    </h2>
                    <p className="text-text-secondary leading-relaxed">{t(`${key}Body`)}</p>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>

          <MotionDiv variants={fadeInUp} className="mt-12 text-center">
            <p className="text-text-secondary mb-5">{t("ctaText")}</p>
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
