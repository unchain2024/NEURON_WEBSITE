"use client";

import { useTranslations } from "next-intl";
import { SectionReveal } from "@/components/motion-wrapper";

const HEADLINE_FONT = {
  fontFamily: '"Inter Display", var(--font-inter), sans-serif',
  fontWeight: 500,
  letterSpacing: "-0.02em",
} as const;

/* it_3 — "How Neuron applies" / ontology mapping.
 *
 * Desktop is the EXACT it_3.svg (background gradient + frosted card + ontology
 * graphic) rendered to `it3-section.webp`, with the copy stripped out and
 * re-added as real HTML positioned over the card. Font sizes use container-query
 * units (cqw) so they scale 1:1 with the image (design width = 1408px), keeping
 * it pixel-exact at any width while staying translatable for JP. Mobile falls
 * back to a stacked layout. */
export default function ITOntology() {
  const t = useTranslations("CaseStudyIT.Ontology");

  return (
    <section className="bg-white py-12 md:py-16">
      {/* ── Desktop: exact SVG image + HTML text overlay, full-bleed ── */}
      <SectionReveal className="relative mx-auto hidden w-[96%] max-w-[1800px] overflow-hidden rounded-2xl md:block [container-type:inline-size]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/case-studies/it3-section.webp" alt="" className="block h-auto w-full" />
        {/* Copy overlay — positioned/sized as a fraction of the 1408×700 design */}
        <div className="absolute" style={{ left: "7.1%", top: "13.5%", width: "28%" }}>
            <span
              className="inline-flex items-center rounded-full border border-[#E9EAEB] bg-white font-medium text-[#0A0D12]"
              style={{ fontSize: "0.95cqw", padding: "0.5cqw 1.1cqw" }}
            >
              {t("eyebrow")}
            </span>
            <h2
              className="text-[#0A0D12]"
              style={{ ...HEADLINE_FONT, fontSize: "2.7cqw", lineHeight: 1.13, marginTop: "1.7cqw" }}
            >
              {t("title")}
            </h2>
            <p
              className="text-[#535862]"
              style={{ fontSize: "1.07cqw", lineHeight: 1.6, marginTop: "2.1cqw" }}
            >
              {t("body")}
            </p>
          </div>
        </SectionReveal>

        {/* ── Mobile: stacked fallback ── */}
        <div className="section-container md:hidden">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-white to-[#E6E6E6] p-6">
            <div className="rounded-xl border border-white/70 bg-white/50 p-6 backdrop-blur-sm">
              <span className="inline-flex items-center rounded-full border border-[#E9EAEB] bg-white px-3.5 py-1.5 text-[13px] font-medium text-[#0A0D12]">
                {t("eyebrow")}
              </span>
              <h2 className="mt-5 text-3xl leading-[1.12] text-[#0A0D12]" style={HEADLINE_FONT}>
                {t("title")}
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-[#535862]">{t("body")}</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/case-studies/it3-ontology.webp"
              alt={t("title")}
              className="mt-6 h-auto w-full"
            />
          </div>
        </div>
    </section>
  );
}
