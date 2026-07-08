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
    <svg viewBox="0 0 24 24" fill="none" className={className} style={style} aria-hidden="true">
      <path
        d="M13.8375 14.1875C13.9791 14.0459 14.05 13.8834 14.05 13.7C14.05 13.5167 13.9791 13.3542 13.8375 13.2125C13.6958 13.0709 13.5333 13 13.35 13C13.1666 13 13.0041 13.0709 12.8625 13.2125C12.7208 13.3542 12.65 13.5167 12.65 13.7C12.65 13.8834 12.7208 14.0459 12.8625 14.1875C13.0041 14.3292 13.1666 14.4 13.35 14.4C13.5333 14.4 13.6958 14.3292 13.8375 14.1875ZM13 11.7H13.7C13.7333 11.3 13.8041 10.9959 13.9125 10.7875C14.0208 10.5792 14.2833 10.2834 14.7 9.90005C15.1 9.55005 15.3833 9.22505 15.55 8.92505C15.7166 8.62505 15.8 8.28338 15.8 7.90005C15.8 7.25005 15.5666 6.70422 15.1 6.26255C14.6333 5.82088 14.05 5.60005 13.35 5.60005C12.8333 5.60005 12.3708 5.73755 11.9625 6.01255C11.5541 6.28755 11.2333 6.66672 11 7.15005L11.65 7.45005C11.85 7.06672 12.0875 6.77922 12.3625 6.58755C12.6375 6.39588 12.9666 6.30005 13.35 6.30005C13.85 6.30005 14.2666 6.45005 14.6 6.75005C14.9333 7.05005 15.1 7.43338 15.1 7.90005C15.1 8.18338 15.0208 8.44588 14.8625 8.68755C14.7041 8.92922 14.4333 9.21672 14.05 9.55005C13.6666 9.88338 13.3958 10.2084 13.2375 10.525C13.0791 10.8417 13 11.2334 13 11.7ZM6.64995 16.7V3.30005H20.05V16.7H6.64995ZM7.34995 16H19.35V4.00005H7.34995V16ZM3.94995 19.4V6.80005H4.64995V18.7H16.55V19.4H3.94995Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ArchetypesIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 18 18" fill="none" className={className} style={style} aria-hidden="true">
      <path
        d="M1.35 17.8V17.1H16.05V17.8H1.35ZM1.35 0.7V0H16.05V0.7H1.35ZM8.697 11.2C9.349 11.2 9.90417 10.9718 10.3625 10.5155C10.8208 10.0592 11.05 9.505 11.05 8.853C11.05 8.201 10.8218 7.64583 10.3655 7.1875C9.90917 6.72917 9.355 6.5 8.703 6.5C8.051 6.5 7.49583 6.72817 7.0375 7.1845C6.57917 7.64083 6.35 8.195 6.35 8.847C6.35 9.499 6.57817 10.0542 7.0345 10.5125C7.49083 10.9708 8.045 11.2 8.697 11.2ZM0 15.6V2.2H17.4V15.6H0ZM4.15 14.9C4.9 14.3 5.65 13.8667 6.4 13.6C7.15 13.3333 7.91667 13.2 8.7 13.2C9.48333 13.2 10.25 13.3333 11 13.6C11.75 13.8667 12.5 14.3 13.25 14.9H16.7V2.9H0.7V14.9H4.15ZM5.4 14.9H12C11.5167 14.5667 10.9958 14.3167 10.4375 14.15C9.87917 13.9833 9.3 13.9 8.7 13.9C8.1 13.9 7.52083 13.9833 6.9625 14.15C6.40417 14.3167 5.88333 14.5667 5.4 14.9ZM7.5375 10.0125C7.2125 9.6875 7.05 9.3 7.05 8.85C7.05 8.4 7.2125 8.0125 7.5375 7.6875C7.8625 7.3625 8.25 7.2 8.7 7.2C9.15 7.2 9.5375 7.3625 9.8625 7.6875C10.1875 8.0125 10.35 8.4 10.35 8.85C10.35 9.3 10.1875 9.6875 9.8625 10.0125C9.5375 10.3375 9.15 10.5 8.7 10.5C8.25 10.5 7.8625 10.3375 7.5375 10.0125Z"
        fill="currentColor"
      />
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
