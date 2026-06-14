"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { CASE_STUDIES, SECTORS, type Sector } from "@/lib/case-studies-data";
import { MotionDiv, fadeInUp, staggerContainer } from "@/components/motion-wrapper";

const COLOR_MAP: Record<string, string> = {
  emerald: "text-emerald-600 bg-emerald-500/10",
  blue: "text-blue-600 bg-blue-500/10",
  violet: "text-violet-600 bg-violet-500/10",
  amber: "text-amber-600 bg-amber-500/10",
  rose: "text-rose-600 bg-rose-500/10",
  cyan: "text-cyan-600 bg-cyan-500/10",
  teal: "text-teal-600 bg-teal-500/10",
};

export default function CaseStudiesHub() {
  const t = useTranslations("CaseStudies");
  const tHub = useTranslations("CaseStudiesPage");
  const [sector, setSector] = useState<Sector | "all">("all");

  const filters: (Sector | "all")[] = ["all", ...SECTORS];
  const visible = CASE_STUDIES.filter((c) => sector === "all" || c.sector === sector);

  return (
    <section className="section-padding pt-0">
      <div className="section-container">
        {/* Sector filter pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setSector(f)}
              className={cn(
                "relative px-4 py-2 rounded-full text-sm font-medium transition-colors",
                sector === f ? "text-white" : "text-text-secondary hover:text-slate-900"
              )}
            >
              {sector === f && (
                <motion.span
                  layoutId="case-study-filter-pill"
                  className="absolute inset-0 rounded-full bg-slate-900"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{f === "all" ? tHub("filterAll") : f}</span>
            </button>
          ))}
        </div>

        {/* Card grid — animates on mount (not on-scroll) so cards never get
            stuck invisible behind an IntersectionObserver that fails to fire
            on refresh or after a filter re-render. */}
        <motion.div
          key={sector}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {visible.map(({ slug, i18nKey, icon: Icon, color }) => (
            <MotionDiv key={slug} variants={fadeInUp}>
                <Link
                  href={`/case-studies/${slug}`}
                  className="group flex h-full flex-col rounded-2xl bg-white border border-border p-6 transition-all hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-50"
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center mb-5",
                      COLOR_MAP[color] ?? COLOR_MAP.emerald
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {t(`${i18nKey}.name`)}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed flex-1">
                    {t(`${i18nKey}.hook`)}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                    {tHub("readStory")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
            </MotionDiv>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
