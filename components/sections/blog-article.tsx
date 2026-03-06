"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MotionDiv, fadeInUp } from "@/components/motion-wrapper";
import { ArrowLeft } from "lucide-react";

const GRADIENTS: Record<string, string> = {
  article1: "from-emerald-400 to-teal-500",
  article2: "from-blue-400 to-indigo-500",
  article3: "from-amber-400 to-orange-500",
  article4: "from-purple-400 to-pink-500",
};

export default function BlogArticle({ slug }: { slug: string }) {
  const t = useTranslations("Blog");
  const gradient = GRADIENTS[slug] ?? "from-slate-400 to-slate-500";

  return (
    <section className="relative section-padding pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="section-container relative z-10 max-w-3xl mx-auto">
        <MotionDiv
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.1 },
            },
          }}
        >
          <MotionDiv variants={fadeInUp}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("backToBlog")}
            </Link>
          </MotionDiv>

          <MotionDiv variants={fadeInUp}>
            <div
              className={`h-48 md:h-64 rounded-2xl bg-gradient-to-br ${gradient} mb-8`}
            />
          </MotionDiv>

          <MotionDiv variants={fadeInUp}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-medium text-primary">
                {t(`${slug}Category`)}
              </span>
              <span className="text-sm text-text-muted">
                {t(`${slug}Date`)}
              </span>
            </div>
          </MotionDiv>

          <MotionDiv variants={fadeInUp}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              {t(`${slug}Title`)}
            </h1>
          </MotionDiv>

          <MotionDiv variants={fadeInUp}>
            <div className="prose prose-slate prose-lg max-w-none">
              <p className="text-lg text-text-secondary leading-relaxed mb-6">
                {t(`${slug}Excerpt`)}
              </p>
              <p className="text-base text-slate-700 leading-relaxed">
                {t(`${slug}Body`)}
              </p>
            </div>
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  );
}
