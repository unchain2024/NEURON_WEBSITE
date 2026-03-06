"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

const TRUST_LOGOS = [
  { name: "Slack", src: "/logos/slack.svg" },
  { name: "Jira", src: "/logos/jira.svg" },
  { name: "Notion", src: "/logos/notion.svg" },
  { name: "Linear", src: "/logos/linear.svg" },
  { name: "GitHub", src: "/logos/github.svg" },
  { name: "Confluence", src: "/logos/confluence.svg" },
  { name: "Google Workspace", src: "/logos/google.svg" },
  { name: "Microsoft 365", src: "/logos/microsoft.svg" },
  { name: "Salesforce", src: "/logos/salesforce.svg" },
  { name: "ServiceNow", src: "/logos/servicenow.svg" },
  { name: "Dropbox", src: "/logos/dropbox.svg" },
  { name: "HubSpot", src: "/logos/hubspot.svg" },
];

export default function TrustBar() {
  const t = useTranslations("TrustBar");
  const allLogos = [...TRUST_LOGOS, ...TRUST_LOGOS];

  return (
    <section className="py-6 md:py-8 overflow-hidden">
      <div className="section-container">
        <p className="text-center text-sm text-text-muted mb-8">
          {t("heading")}
        </p>
      </div>

      <div className="relative">
        {/* Left fade mask */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        {/* Right fade mask */}
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-infinite-scroll hover:[animation-play-state:paused] w-max">
          {allLogos.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex items-center gap-3 mx-8 md:mx-12 shrink-0"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span className="text-text-muted/70 text-lg md:text-xl font-semibold whitespace-nowrap select-none">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
