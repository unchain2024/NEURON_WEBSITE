"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { BlurReveal, MotionDiv, blurIn } from "@/components/motion-wrapper";

const INTEGRATIONS = [
  { key: "slack", logo: "/logos/slack.svg" },
  { key: "jira", logo: "/logos/jira.svg" },
  { key: "notion", logo: "/logos/notion.svg" },
  { key: "linear", logo: "/logos/linear.svg" },
  { key: "github", logo: "/logos/github.svg" },
  { key: "confluence", logo: "/logos/confluence.svg" },
  { key: "google", logo: "/logos/googledocs.svg" },
  { key: "hubspot", logo: "/logos/hubspot.svg" },
  { key: "discord", logo: "/logos/discord.svg" },
  { key: "figma", logo: "/logos/figma.svg" },
] as const;

export default function IntegrationDetails() {
  const t = useTranslations("IntegrationDetails");

  return (
    <section className="section-padding">
      <div className="section-container">
        <BlurReveal>
          <MotionDiv variants={blurIn} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              {t("heading")}
            </h2>
          </MotionDiv>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INTEGRATIONS.map((integration) => (
              <MotionDiv
                key={integration.key}
                variants={blurIn}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="glass-card p-6 rounded-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm">
                    <Image
                      src={integration.logo}
                      alt=""
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">
                      {t(`${integration.key}Name`)}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {t(`${integration.key}Description`)}
                    </p>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
        </BlurReveal>
      </div>
    </section>
  );
}
