"use client";

import { useTranslations } from "next-intl";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

/* "Inter Display" (Figma spec) is Inter at its display optical size; the loaded
   Inter renders that cut at large sizes, so we put it first for determinism. */
const DISPLAY_FONT = 'var(--font-inter), "Inter Display", Inter, sans-serif';

/* Faithful rebuild of wikis.svg as live HTML so the copy translates per-locale,
   while the design is preserved exactly: panels #0A0D12 / rx 8, left border
   white@8%, right border a #A0E6C6→white/25 gradient, a blurred green
   (#3D8F66) corner glow.

   The NEURON-column row icons are rebuilt inline (not the old PNG crops, which
   baked an opaque dark square that covered the green glow). Each is the exact
   glyph path from wikis.svg on its light "sphere" — a circle (cx 586, cy per
   row, r 14) filled with a vertical white→white/50% gradient, black glyph on top.
   The 40×40 viewBox is centered on the sphere so the circle renders at its
   original 28px with transparent corners, letting the glow show through. */
const NEURON_ICONS = [
  // 01 — article / signals
  { cy: 120, d: ["M585.25 114H582.85C581.59 114 580.96 114 580.479 114.245C580.055 114.461 579.711 114.805 579.495 115.229C579.25 115.71 579.25 116.34 579.25 117.6V123.15C579.25 124.41 579.25 125.04 579.495 125.521C579.711 125.945 580.055 126.289 580.479 126.505C580.96 126.75 581.59 126.75 582.85 126.75H588.4C589.66 126.75 590.29 126.75 590.771 126.505C591.195 126.289 591.539 125.945 591.755 125.521C592 125.04 592 124.41 592 123.15V120.75M586.75 123.75H582.25M588.25 120.75H582.25M592.091 113.909C592.97 114.788 592.97 116.212 592.091 117.091C591.212 117.97 589.788 117.97 588.909 117.091C588.03 116.212 588.03 114.788 588.909 113.909C589.788 113.03 591.212 113.03 592.091 113.909Z"] },
  // 02 — share / connections
  { cy: 188, d: ["M588.75 194H588.6C587.34 194 586.71 194 586.229 193.755C585.805 193.539 585.461 193.195 585.245 192.771C585 192.29 585 191.66 585 190.4V185.6C585 184.34 585 183.71 585.245 183.229C585.461 182.805 585.805 182.461 586.229 182.245C586.71 182 587.34 182 588.6 182H588.75M588.75 194C588.75 194.828 589.422 195.5 590.25 195.5C591.078 195.5 591.75 194.828 591.75 194C591.75 193.172 591.078 192.5 590.25 192.5C589.422 192.5 588.75 193.172 588.75 194ZM588.75 182C588.75 182.828 589.422 183.5 590.25 183.5C591.078 183.5 591.75 182.828 591.75 182C591.75 181.172 591.078 180.5 590.25 180.5C589.422 180.5 588.75 181.172 588.75 182ZM581.25 188L588.75 188M581.25 188C581.25 188.828 580.578 189.5 579.75 189.5C578.922 189.5 578.25 188.828 578.25 188C578.25 187.172 578.922 186.5 579.75 186.5C580.578 186.5 581.25 187.172 581.25 188ZM588.75 188C588.75 188.828 589.422 189.5 590.25 189.5C591.078 189.5 591.75 188.828 591.75 188C591.75 187.172 591.078 186.5 590.25 186.5C589.422 186.5 588.75 187.172 588.75 188Z"] },
  // 03 — structured blocks
  { cy: 256, d: [
    "M592.9 263.5C593.11 263.5 593.215 263.5 593.295 263.459C593.366 263.423 593.423 263.366 593.459 263.295C593.5 263.215 593.5 263.11 593.5 262.9V255.1C593.5 254.89 593.5 254.785 593.459 254.705C593.423 254.634 593.366 254.577 593.295 254.541C593.215 254.5 593.11 254.5 592.9 254.5L591.1 254.5C590.89 254.5 590.785 254.5 590.705 254.541C590.634 254.577 590.577 254.634 590.541 254.705C590.5 254.785 590.5 254.89 590.5 255.1V256.9C590.5 257.11 590.5 257.215 590.459 257.295C590.423 257.366 590.366 257.423 590.295 257.459C590.215 257.5 590.11 257.5 589.9 257.5H588.1C587.89 257.5 587.785 257.5 587.705 257.541C587.634 257.577 587.577 257.634 587.541 257.705C587.5 257.785 587.5 257.89 587.5 258.1V259.9C587.5 260.11 587.5 260.215 587.459 260.295C587.423 260.366 587.366 260.423 587.295 260.459C587.215 260.5 587.11 260.5 586.9 260.5H585.1C584.89 260.5 584.785 260.5 584.705 260.541C584.634 260.577 584.577 260.634 584.541 260.705C584.5 260.785 584.5 260.89 584.5 261.1V262.9C584.5 263.11 584.5 263.215 584.541 263.295C584.577 263.366 584.634 263.423 584.705 263.459C584.785 263.5 584.89 263.5 585.1 263.5L592.9 263.5Z",
    "M584.5 252.1C584.5 251.89 584.5 251.785 584.541 251.705C584.577 251.634 584.634 251.577 584.705 251.541C584.785 251.5 584.89 251.5 585.1 251.5H586.9C587.11 251.5 587.215 251.5 587.295 251.541C587.366 251.577 587.423 251.634 587.459 251.705C587.5 251.785 587.5 251.89 587.5 252.1V253.9C587.5 254.11 587.5 254.215 587.459 254.295C587.423 254.366 587.366 254.423 587.295 254.459C587.215 254.5 587.11 254.5 586.9 254.5H585.1C584.89 254.5 584.785 254.5 584.705 254.459C584.634 254.423 584.577 254.366 584.541 254.295C584.5 254.215 584.5 254.11 584.5 253.9V252.1Z",
    "M579.25 256.6C579.25 256.39 579.25 256.285 579.291 256.205C579.327 256.134 579.384 256.077 579.455 256.041C579.535 256 579.64 256 579.85 256H581.65C581.86 256 581.965 256 582.045 256.041C582.116 256.077 582.173 256.134 582.209 256.205C582.25 256.285 582.25 256.39 582.25 256.6V258.4C582.25 258.61 582.25 258.715 582.209 258.795C582.173 258.866 582.116 258.923 582.045 258.959C581.965 259 581.86 259 581.65 259H579.85C579.64 259 579.535 259 579.455 258.959C579.384 258.923 579.327 258.866 579.291 258.795C579.25 258.715 579.25 258.61 579.25 258.4V256.6Z",
    "M578.5 249.1C578.5 248.89 578.5 248.785 578.541 248.705C578.577 248.634 578.634 248.577 578.705 248.541C578.785 248.5 578.89 248.5 579.1 248.5H580.9C581.11 248.5 581.215 248.5 581.295 248.541C581.366 248.577 581.423 248.634 581.459 248.705C581.5 248.785 581.5 248.89 581.5 249.1V250.9C581.5 251.11 581.5 251.215 581.459 251.295C581.423 251.366 581.366 251.423 581.295 251.459C581.215 251.5 581.11 251.5 580.9 251.5H579.1C578.89 251.5 578.785 251.5 578.705 251.459C578.634 251.423 578.577 251.366 578.541 251.295C578.5 251.215 578.5 251.11 578.5 250.9V249.1Z",
  ] },
  // 04 — instant / zap
  { cy: 324, d: ["M586.75 316.5L580.07 324.516C579.809 324.83 579.678 324.987 579.676 325.119C579.674 325.235 579.725 325.344 579.815 325.417C579.918 325.5 580.123 325.5 580.531 325.5H586L585.25 331.5L591.93 323.484C592.192 323.17 592.322 323.013 592.324 322.881C592.326 322.765 592.275 322.656 592.185 322.583C592.082 322.5 591.878 322.5 591.469 322.5H586L586.75 316.5Z"] },
  // 05 — precise / target
  { cy: 392, d: ["M593.5 392H590.5M581.5 392H578.5M586 387.5V384.5M586 399.5V396.5M592 392C592 395.314 589.314 398 586 398C582.686 398 580 395.314 580 392C580 388.686 582.686 386 586 386C589.314 386 592 388.686 592 392ZM588.25 392C588.25 393.243 587.243 394.25 586 394.25C584.757 394.25 583.75 393.243 583.75 392C583.75 390.757 584.757 389.75 586 389.75C587.243 389.75 588.25 390.757 588.25 392Z"] },
  // 06 — connected / atom
  { cy: 471, d: ["M586 471H586.007M588.651 473.652C585.137 477.166 581.1 478.829 579.636 477.364C578.171 475.9 579.833 471.863 583.348 468.348C586.863 464.834 590.899 463.172 592.364 464.636C593.828 466.101 592.166 470.137 588.651 473.652ZM588.651 468.348C592.166 471.863 593.828 475.899 592.364 477.364C590.899 478.828 586.863 477.166 583.348 473.652C579.833 470.137 578.171 466.1 579.636 464.636C581.1 463.172 585.137 464.834 588.651 468.348ZM586.375 471C586.375 471.207 586.207 471.375 586 471.375C585.793 471.375 585.625 471.207 585.625 471C585.625 470.793 585.793 470.625 586 470.625C586.207 470.625 586.375 470.793 586.375 471Z"] },
] as const;
const ROWS = [1, 2, 3, 4, 5, 6] as const;

export default function ComparisonTable() {
  const t = useTranslations("Comparison");

  return (
    <section className="section-padding bg-[#0A0D12]">
      <SectionReveal>
        <div className="section-container">
          {/* Header: badge + headline + subline */}
          <MotionDiv variants={fadeInUp} className="mx-auto mb-12 max-w-4xl text-center lg:mb-16">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/beyond.svg"
              alt="Beyond AI Search"
              width={133}
              height={32}
              className="mx-auto mb-6 h-8 w-auto"
            />
            <h2
              className="text-white"
              style={{
                fontFamily: DISPLAY_FONT,
                fontOpticalSizing: "auto",
                fontWeight: 500,
                fontSize: 40,
                lineHeight: "110%",
                letterSpacing: 0,
                textAlign: "center",
                whiteSpace: "pre-line",
              }}
            >
              {t("heading")}
            </h2>
            <p
              className="mx-auto mt-5 text-[#A4A7AE]"
              style={{
                fontFamily: DISPLAY_FONT,
                fontOpticalSizing: "auto",
                fontWeight: 400,
                fontSize: 16,
                lineHeight: "140%",
                letterSpacing: 0,
                textAlign: "center",
                whiteSpace: "pre-line",
              }}
            >
              {t("subheading")}
            </p>
          </MotionDiv>

          {/* Comparison panel (Wikis & AI search vs NEURON) */}
          <MotionDiv
            variants={fadeInUp}
            className="mx-auto grid max-w-[1080px] gap-4 lg:grid-cols-2"
            style={{ fontFamily: DISPLAY_FONT }}
          >
            {/* ── Left — legacy (white @8% border). Inset ~15px top/bottom so it
                sits slightly smaller than the NEURON card (per wireframe/design). ── */}
            <div className="my-[15px] rounded-[9px] p-px" style={{ background: "rgba(255,255,255,0.10)" }}>
              <div className="h-full rounded-[8px] bg-[#0A0D12] px-6 pb-1 pt-7 sm:px-7">
                <div className="mb-[18px] flex items-center gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/cmp/book.png" alt="" aria-hidden="true" className="h-[22px] w-auto" />
                  </span>
                  <h3 className="text-xl font-medium text-white">{t("legacyLabel")}</h3>
                </div>
                {ROWS.map((i) => (
                  <div
                    key={i}
                    className="flex h-[68px] items-center border-t border-white/[0.08] text-[15px] leading-snug text-white/70 first:border-t-0"
                  >
                    {t(`row${i}Legacy`)}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right — NEURON (green gradient border + corner glow) ── */}
            <div
              className="rounded-[9px] p-px"
              style={{
                background:
                  "linear-gradient(180deg, rgba(160,230,198,0.5) 0%, rgba(255,255,255,0.125) 100%)",
              }}
            >
              <div className="relative h-full overflow-hidden rounded-[8px] bg-[#0A0D12] px-6 pb-1 pt-7 sm:px-7">
                {/* blurred green corner glow (#3D8F66), bottom-right — large,
                    spreading up the right side and across the bottom (wireframe) */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(125% 115% at 100% 100%, rgba(61,143,102,0.55) 0%, rgba(61,143,102,0.25) 42%, rgba(61,143,102,0) 82%)",
                  }}
                />
                <div className="relative">
                  <div className="mb-[18px] flex items-center gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/logos/neuron-mark-dots.svg" alt="" aria-hidden="true" className="h-7 w-auto" />
                    </span>
                    <h3 className="text-xl font-medium text-white">{t("neuronLabel")}</h3>
                  </div>
                  {ROWS.map((i, idx) => (
                    <div
                      key={i}
                      className="flex h-[68px] items-center gap-3.5 border-t border-white/[0.08] first:border-t-0"
                    >
                      <svg
                        viewBox={`566 ${NEURON_ICONS[idx].cy - 20} 40 40`}
                        aria-hidden="true"
                        className="h-10 w-10 shrink-0"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <linearGradient
                            id={`cmpSphere${idx}`}
                            x1="586"
                            y1={NEURON_ICONS[idx].cy - 14}
                            x2="586"
                            y2={NEURON_ICONS[idx].cy + 14}
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="white" />
                            <stop offset="1" stopColor="white" stopOpacity="0.5" />
                          </linearGradient>
                        </defs>
                        <circle cx="586" cy={NEURON_ICONS[idx].cy} r="14" fill={`url(#cmpSphere${idx})`} />
                        {NEURON_ICONS[idx].d.map((d, di) => (
                          <path
                            key={di}
                            d={d}
                            stroke="black"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        ))}
                      </svg>
                      <span className="text-[15px] leading-snug text-white">
                        {t(`row${i}Neuron`)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>
      </SectionReveal>
    </section>
  );
}
