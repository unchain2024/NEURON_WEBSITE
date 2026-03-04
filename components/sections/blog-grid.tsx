"use client";

import { useTranslations } from "next-intl";
import { BlurReveal, MotionDiv, blurIn } from "@/components/motion-wrapper";

const ARTICLES = [
  { key: "article1", gradient: "from-emerald-400 to-teal-500" },
  { key: "article2", gradient: "from-blue-400 to-indigo-500" },
  { key: "article3", gradient: "from-amber-400 to-orange-500" },
  { key: "article4", gradient: "from-purple-400 to-pink-500" },
] as const;

export default function BlogGrid() {
  const t = useTranslations("Blog");

  return (
    <section className="section-padding">
      <div className="section-container">
        <BlurReveal>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {ARTICLES.map((article) => (
              <MotionDiv
                key={article.key}
                variants={blurIn}
                className="glass-card rounded-xl overflow-hidden cursor-default opacity-80"
              >
                {/* Gradient placeholder image */}
                <div
                  className={`h-40 bg-gradient-to-br ${article.gradient} relative`}
                >
                  <span className="absolute top-3 right-3 bg-white/90 text-xs font-semibold px-2.5 py-1 rounded-full text-slate-700">
                    {t("comingSoon")}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-primary">
                      {t(`${article.key}Category`)}
                    </span>
                    <span className="text-xs text-text-muted">
                      {t(`${article.key}Date`)}
                    </span>
                  </div>

                  <h3 className="font-semibold text-slate-900 mb-2">
                    {t(`${article.key}Title`)}
                  </h3>

                  <p className="text-sm text-text-secondary leading-relaxed">
                    {t(`${article.key}Excerpt`)}
                  </p>
                </div>
              </MotionDiv>
            ))}
          </div>
        </BlurReveal>
      </div>
    </section>
  );
}
