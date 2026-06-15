"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";
import ImagePlaceholder from "@/components/image-placeholder";

interface Founder {
  name: string;
  role: string;
  bio: string;
}

export default function CompanySections() {
  const t = useTranslations("CompanyPage");
  const beliefs = t.raw("beliefs") as string[];
  const founders = t.raw("founders") as Founder[];

  return (
    <div className="section-container max-w-4xl pb-12">
      {/* About */}
      <SectionReveal>
        <section className="mb-20">
          <MotionDiv variants={fadeInUp}>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              {t("aboutHeading")}
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">{t("aboutBody1")}</p>
            <p className="mt-6 font-semibold text-slate-900">{t("aboutBody2")}</p>
            <ul className="mt-4 space-y-3">
              {beliefs.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-text-secondary">{b}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-text-secondary">
              <Link
                href="/why-neuron"
                className="inline-flex items-center gap-1 font-semibold text-primary hover:text-primary-600 transition-colors"
              >
                {t("aboutLinkText")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </p>
            <div className="mt-8">
              <ImagePlaceholder caption={t("aboutImage")} />
            </div>
          </MotionDiv>
        </section>
      </SectionReveal>

      {/* Team */}
      <SectionReveal>
        <section className="mb-20">
          <MotionDiv variants={fadeInUp}>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              {t("teamHeading")}
            </h2>
            <p className="text-text-secondary mb-8">{t("teamIntro")}</p>
            <div className="grid sm:grid-cols-3 gap-6">
              {founders.map((f, i) => (
                <div key={i} className="rounded-2xl border border-border bg-white p-6">
                  <ImagePlaceholder caption={t("teamImage")} aspect="aspect-square" className="mb-4" />
                  <h3 className="font-semibold text-slate-900">{f.name}</h3>
                  <p className="text-sm text-primary font-medium">{f.role}</p>
                  <p className="mt-2 text-sm text-text-secondary">{f.bio}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-text-muted">{t("teamNote")}</p>
          </MotionDiv>
        </section>
      </SectionReveal>

      {/* Careers */}
      <SectionReveal>
        <section id="careers" className="mb-20 scroll-mt-24">
          <MotionDiv variants={fadeInUp}>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              {t("careersHeading")}
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">{t("careersBody")}</p>
            <a
              href="https://www.the-unchain.com/career"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-600 text-white px-7 py-3 rounded-xl text-base font-semibold transition-colors"
            >
              {t("careersCta")}
              <ArrowRight className="h-4 w-4" />
            </a>
          </MotionDiv>
        </section>
      </SectionReveal>

      {/* News */}
      <SectionReveal>
        <section id="news" className="scroll-mt-24">
          <MotionDiv variants={fadeInUp}>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              {t("newsHeading")}
            </h2>
            <p className="text-text-secondary leading-relaxed">{t("newsBody")}</p>
          </MotionDiv>
        </section>
      </SectionReveal>
    </div>
  );
}
