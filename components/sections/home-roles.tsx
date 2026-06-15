"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Crown, Compass, Users } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

const ROLES = [
  { key: "role1", Icon: Crown },
  { key: "role2", Icon: Compass },
  { key: "role3", Icon: Users },
] as const;

export default function HomeRoles() {
  const t = useTranslations("Home");

  return (
    <section className="section-padding bg-surface">
      <SectionReveal>
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-14 lg:mb-16">
            <MotionDiv variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
                {t("rolesHeading")}
              </h2>
            </MotionDiv>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {ROLES.map(({ key, Icon }) => (
              <MotionDiv key={key} variants={fadeInUp}>
                <div className="h-full rounded-2xl border border-border bg-white p-7">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {t(`${key}Title`)}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {t(`${key}Body`)}
                  </p>
                </div>
              </MotionDiv>
            ))}
          </div>

          <MotionDiv variants={fadeInUp} className="mt-10 text-center">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-1.5 font-semibold text-primary hover:text-primary-600 transition-colors"
            >
              {t("rolesCta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </MotionDiv>
        </div>
      </SectionReveal>
    </section>
  );
}
