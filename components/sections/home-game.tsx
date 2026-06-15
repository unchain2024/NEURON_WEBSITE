"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Sparkles, Clock, ListChecks, Layers } from "lucide-react";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

const GAME_URL = "";

const STATS = [
  { key: "gameStat1", Icon: ListChecks },
  { key: "gameStat2", Icon: Clock },
  { key: "gameStat3", Icon: Layers },
] as const;

export default function HomeGame() {
  const t = useTranslations("Home");

  return (
    <section className="section-padding bg-white">
      <SectionReveal>
        <div className="section-container">
          <MotionDiv variants={fadeInUp}>
            <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/[0.07] via-surface to-white p-8 sm:p-12 lg:p-16">
              {/* decorative glow */}
              <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-primary/[0.06] blur-3xl" />

              <div className="relative grid items-center gap-10 lg:grid-cols-2">
                {/* Left: copy */}
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary-600">
                    <Sparkles className="h-3.5 w-3.5" />
                    {t("gameBadge")}
                  </span>

                  <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                    {t("gameHeading")}
                  </h2>

                  <p className="mt-4 max-w-md text-base leading-relaxed text-text-secondary sm:text-lg">
                    {t("gameBody")}
                  </p>

                  <a
                    href={GAME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-600 hover:shadow-primary/30"
                  >
                    {t("gameCta")}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </a>

                  <p className="mt-3 text-xs text-text-muted">{t("gameNote")}</p>
                </div>

                {/* Right: stat cards */}
                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:gap-3">
                  {STATS.map(({ key, Icon }) => (
                    <MotionDiv
                      key={key}
                      variants={fadeInUp}
                      className="flex items-center gap-4 rounded-2xl border border-border bg-white/80 p-5 backdrop-blur-sm"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold leading-none text-slate-900">
                          {t(`${key}Value`)}
                        </p>
                        <p className="mt-1 text-sm text-text-secondary">
                          {t(`${key}Label`)}
                        </p>
                      </div>
                    </MotionDiv>
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
