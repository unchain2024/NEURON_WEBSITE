"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

/* "Inter Display" (Figma spec) is Inter at its display optical size; the loaded
   Inter renders that cut at large sizes, so we put it first for determinism. */
const DISPLAY_FONT = 'var(--font-inter), "Inter Display", Inter, sans-serif';

/* Each role card is a self-contained 350×512 SVG (gradient + title + body). */
const CARDS = [
  { src: "/leaders.svg", alt: "Executives & leaders — see the why behind decisions and keep teams consistent, without sitting in every meeting." },
  { src: "/managers.svg", alt: "Managers — catch risk early and decide faster, with the weight of past results behind you." },
  { src: "/teams.svg", alt: "Teams — stop hunting for context; spend your time on the work, not the archaeology." },
] as const;

export default function HomeRoles() {
  const t = useTranslations("Home");

  return (
    <section className="section-padding bg-white">
      <SectionReveal>
        <div className="section-container">
          {/* Header: badge + headline (left), CTA button (right) */}
          <MotionDiv
            variants={fadeInUp}
            className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between lg:mb-14"
          >
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/foreveryrole.svg"
                alt="For every role"
                width={107}
                height={32}
                className="mb-5 h-8 w-auto"
              />
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
          </MotionDiv>

          {/* Three role cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {CARDS.map((card) => (
              <MotionDiv key={card.src} variants={fadeInUp}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={card.src} alt={card.alt} className="block h-auto w-full" />
              </MotionDiv>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
