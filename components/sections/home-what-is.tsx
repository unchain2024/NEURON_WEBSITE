"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";
import ImagePlaceholder from "@/components/image-placeholder";

export default function HomeWhatIs() {
  const t = useTranslations("Home");

  return (
    <section className="section-padding bg-surface">
      <SectionReveal>
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <MotionDiv variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
                {t("whatIsHeading")}
              </h2>
              <p className="mt-6 text-lg text-text-secondary leading-relaxed">
                {t("whatIsBody")}
              </p>
              <p className="mt-8 text-sm text-text-secondary">
                {t("whatIsLinkText")}{" "}
                <Link
                  href="/cognition-layer"
                  className="inline-flex items-center gap-1 font-semibold text-primary hover:text-primary-600 transition-colors"
                >
                  {t("whatIsLinkCta")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </p>
            </MotionDiv>

            <MotionDiv variants={fadeInUp}>
              <ImagePlaceholder caption={t("whatIsImage")} />
            </MotionDiv>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
