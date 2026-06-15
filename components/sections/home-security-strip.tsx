"use client";

import { useTranslations } from "next-intl";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

export default function HomeSecurityStrip() {
  const t = useTranslations("Home");

  return (
    <section className="section-padding">
      <SectionReveal>
        <div className="section-container">
          <MotionDiv variants={fadeInUp}>
            <div className="rounded-3xl border border-border bg-surface px-6 py-12 md:px-12 md:py-14 flex flex-col md:flex-row md:items-center gap-8">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-7 w-7 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                  {t("securityHeading")}
                </h2>
                <p className="mt-3 text-text-secondary leading-relaxed max-w-3xl">
                  {t("securityBody")}
                </p>
                <Link
                  href="/security"
                  className="mt-5 inline-flex items-center gap-1.5 font-semibold text-primary hover:text-primary-600 transition-colors"
                >
                  {t("securityLink")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </MotionDiv>
        </div>
      </SectionReveal>
    </section>
  );
}
