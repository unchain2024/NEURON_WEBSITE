"use client";

import { useTranslations } from "next-intl";
import { BlurReveal, MotionDiv, blurIn } from "@/components/motion-wrapper";
import { Link } from "@/i18n/navigation";

export default function FinalCTA() {
  const t = useTranslations("FinalCTA");

  return (
    <section>
      <BlurReveal>
        <MotionDiv variants={blurIn}>
          {/* Full-bleed CTA panel art. The "Book a demo" button is baked into
              the SVG (133×44 at x=180 y=250 in the 1408×374 frame); we overlay
              a transparent link on it. */}
          <div className="relative w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/demo.svg"
              alt="Give your organization a second brain"
              width={1408}
              height={374}
              className="block h-auto w-full"
            />
            <Link
              href="/get-demo"
              aria-label={t("cta")}
              className="absolute rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              style={{
                left: `${(180 / 1408) * 100}%`,
                top: `${(250 / 374) * 100}%`,
                width: `${(133 / 1408) * 100}%`,
                height: `${(44 / 374) * 100}%`,
              }}
            />
          </div>
        </MotionDiv>
      </BlurReveal>
    </section>
  );
}
