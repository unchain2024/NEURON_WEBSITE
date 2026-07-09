import { readFileSync } from "fs";
import { join } from "path";
import { getLocale, getTranslations } from "next-intl/server";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

/* "Inter Display" (the Figma spec) is just Inter at its display optical size.
   This project loads Inter via next/font (--font-inter); with optical-sizing
   auto, Inter renders its display cut at large sizes — matching the spec.
   Put the loaded Inter first so the result is deterministic on every machine
   (a phantom "Inter Display" first would silently fall back to system sans). */
const DISPLAY_FONT = 'var(--font-inter), "Inter Display", Inter, sans-serif';

/* The four capability cards share a 391px design height, so a fractional-column
   grid (matching their widths) lines their heights up exactly.
   Row 1: 450 | 614, row 2: 614 | 450.

   Both locales render the illustration-only export and lay the localized
   title/body below it as live HTML (Home `cap*Title`/`cap*Body`). The `*-en.svg`
   / `*-ja.svg` exports are the same card illustration minus the baked text band.

   The illustrations are INLINED into the DOM rather than shown through `<img src>`.
   These Figma exports carry `feGaussianBlur` filters (shadows/glows); when an SVG
   with filters is drawn via `<img>`, mobile Safari/Chrome rasterise the filter
   region at the SVG's intrinsic viewBox size, ignoring the device pixel ratio,
   then upscale it — so the cards looked blurry on phones while crisp on desktop.
   Inline `<svg>` is rendered in the live pipeline at device resolution, so it
   stays sharp everywhere. */
const ROWS = [
  [
    { file: "riskradar", key: "cap1" },
    { file: "decisionmemory", key: "cap2" },
  ],
  [
    { file: "context", key: "cap3" },
    { file: "ask", key: "cap4" },
  ],
] as const;

const ROW_COLS = [
  "lg:grid-cols-[450fr_614fr]",
  "lg:grid-cols-[614fr_450fr]",
];

/* Read a card illustration and make its root <svg> fluid: drop the fixed
   width/height attributes (the viewBox keeps the aspect ratio) so it fills the
   card width and scales cleanly. Runs at build time (both locales are statically
   generated), so there is no per-request filesystem cost. */
function loadInlineSvg(file: string, isJa: boolean): string {
  const svg = readFileSync(
    join(process.cwd(), "public", `${file}-${isJa ? "ja" : "en"}.svg`),
    "utf8",
  );
  return svg.replace(
    /<svg\b([^>]*)>/,
    (_m, attrs: string) =>
      `<svg${attrs.replace(/\s(?:width|height)="[^"]*"/g, "")} style="display:block;width:100%;height:auto">`,
  );
}

export default async function HomeCapabilities() {
  const t = await getTranslations("Home");
  const isJa = (await getLocale()) === "ja";

  return (
    <section className="section-padding">
      <div className="section-container">
        {/* Header */}
        <SectionReveal>
          <MotionDiv variants={fadeInUp} className="mx-auto mb-14 text-center lg:mb-20">
            <span className="mb-6 inline-flex h-8 items-center rounded-full border border-[#E9EAEB] bg-white px-4 text-sm font-medium text-[#0A0D12]">
              {t("capBadge")}
            </span>
            <h2
              className="text-slate-900"
              style={{
                fontFamily: DISPLAY_FONT,
                fontOpticalSizing: "auto",
                fontWeight: 500,
                fontSize: "clamp(1.75rem, 6vw, 2.5rem)",
                lineHeight: "110%",
                letterSpacing: 0,
                textAlign: "center",
              }}
            >
              {t("capHeading")}
            </h2>
            <p
              className="mx-auto mt-5 max-w-3xl text-text-secondary"
              style={{
                fontFamily: DISPLAY_FONT,
                fontOpticalSizing: "auto",
                fontWeight: 400,
                fontSize: "clamp(0.875rem, 3.5vw, 1rem)",
                lineHeight: "140%",
                letterSpacing: 0,
                textAlign: "justify",
                textJustify: "inter-word",
              }}
            >
              {t("capSubheading")}
            </p>
          </MotionDiv>
        </SectionReveal>

        {/* Four cards */}
        <div className="space-y-6">
          {ROWS.map((row, i) => (
            <SectionReveal key={i}>
              <MotionDiv variants={fadeInUp}>
                <div className={`grid grid-cols-1 items-stretch gap-6 ${ROW_COLS[i]}`}>
                  {row.map((card) => (
                    <div
                      key={card.key}
                      className="flex h-full flex-col overflow-hidden rounded-lg border border-[#E9EAEB] bg-white"
                    >
                      <div
                        role="img"
                        aria-label={t(`${card.key}Title` as "cap1Title")}
                        className="w-full"
                        dangerouslySetInnerHTML={{ __html: loadInlineSvg(card.file, isJa) }}
                      />
                      <div className="flex flex-1 flex-col px-7 pb-8 pt-5">
                        <h3
                          className="text-[#0A0D12]"
                          style={{
                            fontFamily: DISPLAY_FONT,
                            fontOpticalSizing: "auto",
                            fontWeight: 500,
                            fontSize: 20,
                            lineHeight: "110%",
                            letterSpacing: 0,
                          }}
                        >
                          {t(`${card.key}Title` as "cap1Title")}
                        </h3>
                        <p
                          className="mt-3 text-[#535862]"
                          style={{
                            fontFamily: DISPLAY_FONT,
                            fontOpticalSizing: "auto",
                            fontWeight: 400,
                            fontSize: 14,
                            lineHeight: "100%",
                            letterSpacing: 0,
                          }}
                        >
                          {t(`${card.key}Body` as "cap1Body")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </MotionDiv>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
