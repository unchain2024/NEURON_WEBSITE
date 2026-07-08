"use client";

import { useTranslations } from "next-intl";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

/**
 * Integration showcase band built on public/Integration-new.svg.
 *
 * The exported SVG had its heading/subtitle baked in as outlined vector paths
 * (not translatable). Those two paths were stripped from the asset, and the
 * text is re-rendered here as live HTML so it flows through next-intl
 * (`IntegrationsPage.cloudTitle` / `cloudSubtitle`) and translates to JA.
 *
 * The overlay is positioned/sized in container units (`cqw`, `%`) against the
 * SVG's native 1440×778 frame so it tracks the artwork at every width.
 */
export default function IntegrationShowcase() {
  const t = useTranslations("IntegrationsPage");

  return (
    <section className="relative w-full overflow-hidden">
      <SectionReveal>
        <div className="relative min-h-[440px] w-full [container-type:inline-size] md:min-h-[100svh]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Integration-new.svg"
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          <MotionDiv
            variants={fadeInUp}
            className="absolute inset-x-0 top-[7%] px-6 text-center md:top-[11.4%] md:px-[5%]"
          >
            <h2
              className="mx-auto max-w-[19rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#0A0D12] md:leading-[1.08] md:[max-width:46cqw]"
              style={{ fontSize: "clamp(23px, 2.9cqw, 44px)" }}
            >
              {t("cloudTitle")}
            </h2>
            <p
              className="mx-auto mt-3 max-w-sm text-[#414651] md:max-w-none md:[margin-top:1.6cqw]"
              style={{ fontSize: "clamp(12px, 1.12cqw, 16px)" }}
            >
              {t("cloudSubtitle")}
            </p>
          </MotionDiv>
        </div>
      </SectionReveal>
    </section>
  );
}
