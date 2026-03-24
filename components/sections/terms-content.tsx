"use client";

import { useTranslations } from "next-intl";

const ARTICLES = Array.from({ length: 15 }, (_, i) => i + 1);

export default function TermsContent() {
  const t = useTranslations("TermsPage");

  return (
    <>
      {/* Hero header — white background */}
      <section className="pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="section-container max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-4">
            {t("title")}
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-slate-400">
            {t("lastUpdated")}
          </p>
        </div>
      </section>

      {/* Content — light gray background */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="section-container max-w-4xl mx-auto">
          <div className="max-w-3xl mx-auto">
            {/* Subtitle */}
            <p className="text-sm text-slate-500 mb-10">{t("subtitle")}</p>

            {/* Preamble */}
            <div className="mb-12 pb-12 border-b border-slate-200">
              <p className="text-base leading-relaxed text-slate-600 whitespace-pre-line">
                {t("preamble")}
              </p>
            </div>

            {/* Articles */}
            <div className="space-y-12">
              {ARTICLES.map((num) => (
                <article key={num} className="scroll-mt-24">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">
                    {t(`article${num}Title`)}
                  </h2>
                  <p className="text-base leading-relaxed text-slate-600 whitespace-pre-line">
                    {t(`article${num}Body`)}
                  </p>
                </article>
              ))}

              {/* Definitions (Article 16) */}
              <article className="scroll-mt-24">
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  {t("definitionsTitle")}
                </h2>
                <p className="text-base leading-relaxed text-slate-600 whitespace-pre-line">
                  {t("definitionsBody")}
                </p>
              </article>
            </div>

            {/* Closing */}
            <p className="text-center text-sm text-slate-400 mt-16">
              {t("closing")}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
