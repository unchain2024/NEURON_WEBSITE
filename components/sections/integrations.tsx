"use client";

import { useTranslations } from "next-intl";
import { BlurReveal, MotionDiv, blurIn } from "@/components/motion-wrapper";
import { motion } from "framer-motion";

const INTEGRATIONS = [
  "Slack",
  "Jira",
  "Notion",
  "Linear",
  "GitHub",
  "Confluence",
  "Google Workspace",
  "HubSpot",
  "Discord",
  "Figma",
] as const;

export default function IntegrationsGrid() {
  const t = useTranslations("Integrations");

  return (
    <section id="integrations" className="section-padding">
      <BlurReveal>
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <MotionDiv variants={blurIn}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
                {t.rich("heading", {
                  highlight: (chunks) => (
                    <span className="gradient-text-animated">{chunks}</span>
                  ),
                })}
              </h2>
            </MotionDiv>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {INTEGRATIONS.map((integration) => (
              <MotionDiv key={integration} variants={blurIn}>
                <motion.div
                  className="glass-card-light p-6 flex flex-col items-center justify-center gap-3 text-center hover:border-primary/30 hover:bg-primary/5 transition-all cursor-default group relative overflow-hidden"
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "radial-gradient(circle at 50% 50%, rgba(99,102,241,0.1) 0%, transparent 70%)",
                    }}
                  />
                  <div className="relative z-10">
                    <div className="h-10 w-10 rounded-lg bg-slate-100 group-hover:bg-primary/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <span className="text-slate-700 font-bold text-sm">
                        {integration.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-text-secondary group-hover:text-slate-900 transition-colors relative z-10">
                    {integration}
                  </span>
                </motion.div>
              </MotionDiv>
            ))}
          </div>

          <MotionDiv variants={blurIn} className="text-center mt-8">
            <motion.a
              href="#"
              className="text-primary hover:text-primary/80 text-sm font-medium transition-colors inline-flex items-center gap-1"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {t("seeAll")}
              <span aria-hidden="true">&rarr;</span>
            </motion.a>
          </MotionDiv>
        </div>
      </BlurReveal>
    </section>
  );
}
