"use client";

import { useTranslations } from "next-intl";
import { BlurReveal, MotionDiv, blurIn } from "@/components/motion-wrapper";

const ARCHETYPE_URL = "https://www.archetype.the-neuron.com/";

const HEADLINE_FONT = {
  fontFamily: '"Inter Display", var(--font-inter), sans-serif',
  fontWeight: 500,
  letterSpacing: "-0.02em",
} as const;

/* Archetype experiment panel (design frame 1440×514).
 *
 * Rebuilt from the old 6 MB text-baked archetype.svg the same way the demo CTA
 * was: the dark background + purple/orange glows are CSS, the three portrait
 * cards are the extracted PNGs (archetype-{director,challenger,architect}.png),
 * and all copy is live HTML so it translates per-locale (HomeArchetype namespace).
 * Desktop type scales in cqw against the 1440px design width; mobile stacks. The
 * stylized archetype names stay in English — they're brand labels baked into the
 * card artwork's visual identity, not body copy. */

/* Card geometry as % of the 1440×514 frame (x, y, w from the SVG rects). */
const CARDS = [
  { src: "/archetype-director.png", label: "THE DIRECTOR", left: 51.81, top: 14.01, z: 30 },
  { src: "/archetype-challenger.png", label: "THE CHALLENGER", left: 69.28, top: 21.79, z: 20 },
  { src: "/archetype-architect.png", label: "THE ARCHITECT", left: 86.75, top: 29.57, z: 10 },
];
const CARD_W = 16.06; // 231.2 / 1440
const CARD_H = 56.23; // 289 / 514

const PANEL_BG =
  "radial-gradient(42% 80% at 52% -8%, rgba(145,69,192,0.55) 0%, transparent 70%)," +
  "radial-gradient(52% 90% at 99% 116%, rgba(192,102,69,0.5) 0%, transparent 70%)," +
  "#0A0D12";

type IconProps = { className?: string; style?: React.CSSProperties };

function QuestionsIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} style={style}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M9.2 9.3a2.8 2.8 0 1 1 3.9 2.6c-.8.4-1.1.9-1.1 1.8" strokeLinecap="round" />
      <circle cx="12" cy="17" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ArchetypesIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} style={style}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="8.8" cy="8.8" r="1.6" />
      <path d="M21 16.5 16 11l-7.5 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Cards({ mobile = false }: { mobile?: boolean }) {
  return (
    <>
      {CARDS.map((card) => (
        <div
          key={card.src}
          className="absolute overflow-hidden rounded-[3px] border border-white/80 bg-black"
          style={{
            left: `${card.left}%`,
            top: `${card.top}%`,
            width: `${CARD_W}%`,
            height: `${CARD_H}%`,
            zIndex: card.z,
            boxShadow: "1px 1px 0 rgba(255,255,255,0.25)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.src}
            alt={card.label}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <span
            className="absolute inset-x-0 top-0 z-10 flex items-center justify-center text-center text-white/90"
            style={{
              height: "10.4%",
              fontSize: mobile ? "9px" : "0.8cqw",
              letterSpacing: "0.22em",
              fontWeight: 400,
            }}
          >
            {card.label}
          </span>
        </div>
      ))}
    </>
  );
}

export default function HomeArchetype() {
  const t = useTranslations("HomeArchetype");

  return (
    <section className="bg-white">
      <BlurReveal>
        <MotionDiv variants={blurIn}>
          {/* Desktop / tablet: exact 1440×514 panel, type in cqw */}
          <div
            className="relative hidden aspect-[1440/514] w-full overflow-hidden md:block [container-type:inline-size]"
            style={{ background: PANEL_BG }}
          >
            <Cards />

            {/* Left copy block */}
            <div
              className="absolute"
              style={{ left: "5.56%", top: "50%", transform: "translateY(-50%)", width: "44%" }}
            >
              <h2 className="text-white" style={{ ...HEADLINE_FONT, fontSize: "3.3cqw", lineHeight: 1.1 }}>
                {t("heading")}
              </h2>
              <p
                className="text-white/65"
                style={{ fontSize: "1.18cqw", lineHeight: 1.5, marginTop: "1.7cqw", maxWidth: "32cqw" }}
              >
                {t("subheading")}
              </p>

              {/* Stats */}
              <div className="flex items-center text-white/85" style={{ gap: "1.6cqw", marginTop: "2.4cqw" }}>
                <span className="flex items-center" style={{ gap: "0.6cqw" }}>
                  <QuestionsIcon className="text-white/85" style={{ width: "1.7cqw", height: "1.7cqw" }} />
                  <span style={{ fontSize: "1.18cqw" }}>{t("stat1")}</span>
                </span>
                <span className="bg-white/20" style={{ width: "0.6px", height: "1.7cqw" }} />
                <span className="flex items-center" style={{ gap: "0.6cqw" }}>
                  <ArchetypesIcon className="text-white/85" style={{ width: "1.7cqw", height: "1.7cqw" }} />
                  <span style={{ fontSize: "1.18cqw" }}>{t("stat2")}</span>
                </span>
              </div>

              <a
                href={ARCHETYPE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-white font-semibold text-[#0A0D12] transition-transform hover:-translate-y-0.5"
                style={{ fontSize: "1.18cqw", padding: "1.05cqw 2.4cqw", marginTop: "2.6cqw" }}
              >
                {t("cta")}
              </a>
            </div>
          </div>

          {/* Mobile: stacked */}
          <div className="overflow-hidden md:hidden" style={{ background: PANEL_BG }}>
            <div className="px-6 py-12">
              <h2 className="text-3xl leading-tight text-white" style={HEADLINE_FONT}>
                {t("heading")}
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">{t("subheading")}</p>

              <div className="mt-6 flex items-center gap-5 text-white/85">
                <span className="flex items-center gap-2">
                  <QuestionsIcon className="h-5 w-5 text-white/85" />
                  <span className="text-sm">{t("stat1")}</span>
                </span>
                <span className="h-5 w-px bg-white/20" />
                <span className="flex items-center gap-2">
                  <ArchetypesIcon className="h-5 w-5 text-white/85" />
                  <span className="text-sm">{t("stat2")}</span>
                </span>
              </div>

              <a
                href={ARCHETYPE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0A0D12]"
              >
                {t("cta")}
              </a>
            </div>

            {/* Card cluster */}
            <div className="relative aspect-[1440/514] w-full [container-type:inline-size]">
              <Cards mobile />
            </div>
          </div>
        </MotionDiv>
      </BlurReveal>
    </section>
  );
}
