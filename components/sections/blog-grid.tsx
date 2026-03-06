"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BlurReveal, MotionDiv, blurIn } from "@/components/motion-wrapper";

const ARTICLES = [
  { key: "article1", slug: "article1", gradient: "from-emerald-400 to-teal-500" },
  { key: "article2", slug: "article2", gradient: "from-blue-400 to-indigo-500" },
  { key: "article3", slug: "article3", gradient: "from-amber-400 to-orange-500" },
  { key: "article4", slug: "article4", gradient: "from-purple-400 to-pink-500" },
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
              >
                <Link
                  href={`/blog/${article.slug}`}
                  className="glass-card rounded-xl overflow-hidden block group hover:shadow-lg hover:shadow-emerald-50 hover:border-emerald-200/80 transition-all duration-300"
                >
                  {/* Gradient placeholder image */}
                  <div
                    className={`h-40 bg-gradient-to-br ${article.gradient} relative`}
                  >
                    <span className="absolute top-3 right-3 bg-white/90 text-xs font-semibold px-2.5 py-1 rounded-full text-slate-700">
                      {t(`${article.key}Category`)}
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

                    <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                      {t(`${article.key}Title`)}
                    </h3>

                    <p className="text-sm text-text-secondary leading-relaxed">
                      {t(`${article.key}Excerpt`)}
                    </p>
                  </div>
                </Link>
              </MotionDiv>
            ))}
          </div>
        </BlurReveal>
      </div>
    </section>
  );
}
