"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

/* "Inter Display" (Figma spec) is Inter at its display optical size; the loaded
   Inter renders that cut at large sizes, so we put it first for determinism. */
const DISPLAY_FONT = 'var(--font-inter), "Inter Display", Inter, sans-serif';

/* Each role card is a gradient illustration + a title/body. The original
   350×512 SVGs baked the text into the bottom 112px; the `*-en.svg` exports are
   the same artwork cropped to just the top-400px illustration, so the title/body
   render below as live HTML (Home `role*` keys) instead of being part of the image. */
const CARDS = [
  { src: "/leaders-en.svg", key: "role1" },
  { src: "/managers-en.svg", key: "role2" },
  { src: "/teams-en.svg", key: "role3" },
] as const;

export default function HomeRoles() {
  const t = useTranslations("Home");
  const isJa = useLocale() === "ja";

  return (
    <section className="pb-20 md:pb-28 lg:pb-32 bg-white">
      <SectionReveal>
        <div className="section-container">
          {/* Header: badge + headline (left), CTA button (right) */}
          <MotionDiv
            variants={fadeInUp}
            className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between lg:mb-14"
          >
            <div>
              {isJa ? (
                <span className="mb-5 inline-flex h-8 items-center rounded-full border border-[#E9EAEB] bg-white px-4 text-sm font-medium text-[#0A0D12]">
                  {t("rolesBadge")}
                </span>
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src="/foreveryrole.svg" alt="For every role" width={107} height={32} className="mb-5 h-8 w-auto" />
              )}
              <h2
                className="text-slate-900"
                style={{
                  fontFamily: DISPLAY_FONT,
                  fontOpticalSizing: "auto",
                  fontWeight: 500,
                  fontSize: 40,
                  lineHeight: "110%",
                  letterSpacing: 0,
                  whiteSpace: "pre-line",
                }}
              >
                {t("rolesHeading")}
              </h2>
            </div>

            {isJa ? (
              <Link
                href="/solutions"
                className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full border border-[#E9EAEB] bg-white px-6 text-sm font-semibold text-[#0A0D12] transition-transform hover:-translate-y-0.5"
              >
                {t("rolesCta")}
              </Link>
            ) : (
              <Link href="/solutions" className="shrink-0" aria-label="Explore solutions by role">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/exploresolution.svg"
                  alt="Explore solutions by role"
                  width={235}
                  height={44}
                  className="h-11 w-auto transition-transform hover:-translate-y-0.5"
                />
              </Link>
            )}
          </MotionDiv>

          {/* Three role cards — illustration only (same SVG, CSS-cropped to its
              top-400px artwork), with the title/body rendered below as live HTML */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {CARDS.map((card) => (
              <MotionDiv key={card.src} variants={fadeInUp}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.src}
                  alt={t(`${card.key}Title` as "role1Title")}
                  className="block h-auto w-full rounded-lg"
                />
                <h3 className="mt-5 text-2xl font-semibold text-[#0A0D12]">
                  {t(`${card.key}Title` as "role1Title")}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#535862]">
                  {t(`${card.key}Body` as "role1Body")}
                </p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
