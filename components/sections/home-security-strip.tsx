"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

/* "Inter Display" (Figma spec) is Inter at its display optical size; the loaded
   Inter renders that cut at large sizes, so we put it first for determinism. */
const DISPLAY_FONT = 'var(--font-inter), "Inter Display", Inter, sans-serif';

export default function HomeSecurityStrip() {
  const t = useTranslations("Home");

  return (
    <section className="section-padding">
      <SectionReveal>
        <div className="section-container flex flex-col items-center">
          {/* Header */}
          <MotionDiv variants={fadeInUp} className="mx-auto text-center">
            <h2
              className="text-slate-900"
              style={{
                fontFamily: DISPLAY_FONT,
                fontOpticalSizing: "auto",
                fontWeight: 500,
                fontSize: 40,
                lineHeight: "110%",
                letterSpacing: 0,
                textAlign: "center",
              }}
            >
              {t("securityHeading")}
            </h2>
            <p
              className="mx-auto mt-4 whitespace-nowrap text-text-secondary"
              style={{
                fontFamily: DISPLAY_FONT,
                fontOpticalSizing: "auto",
                fontWeight: 400,
                fontSize: 16,
                lineHeight: "140%",
                letterSpacing: 0,
                textAlign: "center",
              }}
            >
              {t("securityBody")}
            </p>
          </MotionDiv>

          {/* Shield graphic */}
          <MotionDiv variants={fadeInUp} className="mt-12 w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/enterprise.svg"
              alt="Enterprise-grade security: encryption in transit & at rest, read-only integrations, never used to train AI models, existing permissions preserved"
              width={860}
              height={475}
              className="mx-auto block h-auto w-full max-w-[860px]"
            />
          </MotionDiv>

          {/* CTA button */}
          <MotionDiv variants={fadeInUp} className="mt-10">
            <Link href="/security" aria-label="Security & Trust">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/sec.svg"
                alt="Security & Trust"
                width={177}
                height={44}
                className="h-11 w-auto transition-transform hover:-translate-y-0.5"
              />
            </Link>
          </MotionDiv>
        </div>
      </SectionReveal>
    </section>
  );
}
