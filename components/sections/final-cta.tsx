"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionReveal } from "@/components/motion-wrapper";

const HEADLINE_FONT = {
  fontFamily: '"Inter Display", var(--font-inter), sans-serif',
  fontWeight: 500,
  letterSpacing: "-0.02em",
} as const;

/* Global "second brain" CTA banner.
 *
 * Same green-banner design as the IT case study (1408×374, rx=8): the green
 * texture is the exported background (it6-bg.jpg), the grid + concentric rings
 * are exact vector coordinates re-drawn as an inline SVG overlay, the halftone
 * brain is the downscaled raster (it6-brain.png), and the copy/button are real
 * HTML so they stay translatable per-locale. Type scales in cqw against the
 * 1408px design width. Replaces the old 18 MB text-baked demo.svg. */
export default function FinalCTA() {
  const t = useTranslations("FinalCTA");

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto w-[96%] max-w-[1800px]">
        <SectionReveal>
          <div className="relative hidden overflow-hidden rounded-2xl md:block [container-type:inline-size]">
            {/* Exact green texture background */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/case-studies/it6-bg.jpg" alt="" className="block h-auto w-full" />

            {/* paint0 — white → white/20% wash */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(127deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.04) 100%)",
              }}
            />

            {/* Exact grid + concentric rings (1408×374 design space) */}
            <svg
              viewBox="0 0 1408 374"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <g opacity="0.6" stroke="white">
                <line x1="-7" y1="77.37" x2="1498" y2="77.37" strokeWidth="0.66" strokeDasharray="2.64 2.64" />
                <line x1="-7" y1="189.37" x2="1498" y2="189.37" strokeWidth="0.66" />
                <line x1="-7" y1="301.37" x2="1498" y2="301.37" strokeWidth="0.66" strokeDasharray="2.64 2.64" />
                <line x1="1006.06" y1="-1" x2="1006.06" y2="379" strokeWidth="0.66" strokeDasharray="2.64 2.64" />
                <line x1="1117.93" y1="-1" x2="1117.93" y2="379" strokeWidth="0.66" />
                <line x1="1229.8" y1="-1" x2="1229.8" y2="379" strokeWidth="0.66" strokeDasharray="2.64 2.64" />
              </g>
              <g>
                <circle cx="1117.93" cy="189.37" r="111.705" stroke="white" strokeOpacity="0.7" strokeWidth="0.66" fill="none" />
                <circle cx="1118.1" cy="189.54" r="158.235" stroke="white" strokeOpacity="0.7" strokeWidth="0.66" fill="none" />
                <circle cx="1118.26" cy="189.95" r="78.38" fill="white" fillOpacity="0.1" />
                <circle cx="1118.26" cy="189.95" r="77.88" stroke="white" strokeOpacity="0.5" strokeWidth="0.66" fill="none" />
                <circle cx="1006.2" cy="77.39" r="2.5" fill="white" />
                <circle cx="1006.2" cy="301.64" r="2.5" fill="white" />
                <circle cx="1230.17" cy="77.39" r="2.5" fill="white" />
                <circle cx="1230.17" cy="301.64" r="2.5" fill="white" />
              </g>
            </svg>

            {/* Halftone brain — rect x1041.04 y119.29 w158.56 h152.24 of 1408×374 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/case-studies/it6-brain.png"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute mix-blend-screen"
              style={{
                left: "73.94%",
                top: "31.90%",
                width: "11.26%",
                height: "40.71%",
              }}
            />

            {/* Copy + CTA */}
            <div
              className="absolute"
              style={{ left: "6.5%", top: "50%", transform: "translateY(-50%)", width: "50%" }}
            >
              <h2
                className="text-white"
                style={{ ...HEADLINE_FONT, fontSize: "2.55cqw", lineHeight: 1.12 }}
              >
                {t("heading")}
              </h2>
              <p
                className="text-white/85"
                style={{ fontSize: "1.05cqw", lineHeight: 1.55, marginTop: "1.4cqw", maxWidth: "30cqw" }}
              >
                {t("subheading")}
              </p>
              <div className="flex items-center" style={{ gap: "1.7cqw", marginTop: "2cqw" }}>
                <Link
                  href="/get-demo"
                  className="inline-flex items-center rounded-full bg-[#0A0D12] font-medium text-white transition-colors hover:bg-[#0A0D12]/90"
                  style={{ fontSize: "1.02cqw", padding: "0.95cqw 1.7cqw" }}
                >
                  {t("cta")}
                </Link>
                <span className="text-white/80" style={{ fontSize: "1.02cqw" }}>
                  {t("note")}
                </span>
              </div>
            </div>
          </div>

          {/* Mobile: stacked card */}
          <div className="md:hidden">
            <div className="relative mt-0 overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/case-studies/it6-bg.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="relative p-7">
                <h2 className="text-2xl leading-tight text-white" style={HEADLINE_FONT}>
                  {t("heading")}
                </h2>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/85">
                  {t("subheading")}
                </p>
                <Link
                  href="/get-demo"
                  className="mt-5 inline-flex items-center rounded-full bg-[#0A0D12] px-5 py-2.5 text-sm font-medium text-white"
                >
                  {t("cta")}
                </Link>
                <p className="mt-3 text-xs text-white/80">{t("note")}</p>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
