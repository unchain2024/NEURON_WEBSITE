"use client";

import { useTranslations } from "next-intl";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

const HEADLINE_FONT = {
  fontFamily: '"Inter Display", var(--font-inter), sans-serif',
  fontWeight: 500,
  letterSpacing: "-0.02em",
} as const;

const ITEMS = ["risk", "adr", "cascade", "arch", "digest"] as const;

/* Check-circle icon extracted verbatim from "Case study - Section 4 List.svg"
 * — a filled circle with a checkmark cut-out, painted with a vertical
 * #0A0D12 → #0A0D12/50% gradient (shared def below). */
function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="17 17 22 22" fill="none" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28 17C21.9249 17 17 21.9249 17 28C17 34.0751 21.9249 39 28 39C34.0751 39 39 34.0751 39 28C39 21.9249 34.0751 17 28 17ZM33.2071 25.7071C33.5976 25.3166 33.5976 24.6834 33.2071 24.2929C32.8166 23.9024 32.1834 23.9024 31.7929 24.2929L26.5 29.5858L24.2071 27.2929C23.8166 26.9024 23.1834 26.9024 22.7929 27.2929C22.4024 27.6834 22.4024 28.3166 22.7929 28.7071L25.7929 31.7071C26.1834 32.0976 26.8166 32.0976 27.2071 31.7071L33.2071 25.7071Z"
        fill="url(#it4-check-gradient)"
      />
    </svg>
  );
}

/* it_4 — "What you get" / where it shows up */
export default function ITWorkflow() {
  const t = useTranslations("CaseStudyIT.Workflow");

  return (
    <section className="bg-white py-16 md:py-24">
      {/* Shared gradient definition for the check icons */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient
            id="it4-check-gradient"
            x1="28"
            y1="17"
            x2="28"
            y2="39"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0A0D12" />
            <stop offset="1" stopColor="#0A0D12" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>

      {/* 80% of the viewport (capped), so the chips spread like the design */}
      <div className="mx-auto w-[92%] max-w-[1080px]">
        <SectionReveal>
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center rounded-full border border-[#E9EAEB] bg-white px-3.5 py-1.5 text-[13px] font-medium text-[#0A0D12]">
              {t("eyebrow")}
            </span>
            <h2
              className="mt-5 text-3xl leading-[1.1] text-[#0A0D12] sm:text-[2.5rem] lg:whitespace-nowrap"
              style={HEADLINE_FONT}
            >
              {t("title")}
            </h2>
          </div>

          <MotionDiv
            variants={fadeInUp}
            className="mt-12 flex flex-wrap justify-center gap-4"
          >
            {ITEMS.map((key) => (
              <div
                key={key}
                className="inline-flex h-14 items-center gap-3 rounded-full border border-[#E9EAEB] bg-white pl-4 pr-7"
              >
                <CheckCircleIcon className="h-[22px] w-[22px] shrink-0" />
                <span className="text-[15px] text-[#414651]">{t(`items.${key}`)}</span>
              </div>
            ))}
          </MotionDiv>
        </SectionReveal>
      </div>
    </section>
  );
}
