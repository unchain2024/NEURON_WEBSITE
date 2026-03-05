"use client";

import { useTranslations } from "next-intl";
import { BlurReveal, MotionDiv, blurIn } from "@/components/motion-wrapper";
import { motion } from "framer-motion";

const TESTIMONIAL_KEYS = ["1", "2", "3"] as const;

export default function Testimonials() {
  const t = useTranslations("Testimonials");

  return (
    <section className="section-padding">
      <BlurReveal>
        <div className="section-container">
          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-20">
            <MotionDiv variants={blurIn}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
                {t("heading")}
              </h2>
            </MotionDiv>
          </div>

          {/* Testimonials grid — first card featured, two below */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {TESTIMONIAL_KEYS.map((key, idx) => {
              const name = t(`name${key}` as "name1");
              const initials = name
                .split(" ")
                .map((n) => n[0])
                .join("");
              const isFeatured = idx === 0;

              return (
                <MotionDiv
                  key={key}
                  variants={blurIn}
                  className={isFeatured ? "lg:col-span-2" : ""}
                >
                  <motion.div
                    className={`relative rounded-2xl border border-slate-100 bg-white p-8 md:p-10 h-full flex ${
                      isFeatured
                        ? "lg:flex-row lg:items-center lg:gap-12"
                        : "flex-col"
                    } group hover:border-emerald-200/80 hover:shadow-lg hover:shadow-emerald-50 transition-all duration-300`}
                    whileHover={{ y: -3 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                  >
                    {/* Emerald accent bar */}
                    <div className="absolute left-0 top-8 bottom-8 w-[3px] rounded-full bg-gradient-to-b from-emerald-400 to-teal-400 opacity-60 group-hover:opacity-100 transition-opacity" />

                    {/* Quote content */}
                    <div
                      className={`flex-1 ${isFeatured ? "" : "mb-8"} pl-4`}
                    >
                      {/* Decorative quote mark */}
                      <svg
                        className="h-8 w-8 md:h-10 md:w-10 text-emerald-400/40 mb-4"
                        viewBox="0 0 32 32"
                        fill="currentColor"
                      >
                        <path d="M4 20.8C4 14.4 7.6 8.8 13.2 5.6l1.6 2.4C10 11.2 8.4 15.2 8 18.4h4.8V28H4V20.8zm16 0c0-6.4 3.6-12 9.2-15.2l1.6 2.4C26 11.2 24.4 15.2 24 18.4h4.8V28H20V20.8z" />
                      </svg>

                      <blockquote
                        className={`text-slate-700 leading-relaxed ${
                          isFeatured
                            ? "text-lg md:text-xl lg:text-2xl"
                            : "text-base md:text-lg"
                        }`}
                      >
                        {t(`quote${key}` as "quote1")}
                      </blockquote>
                    </div>

                    {/* Author */}
                    <div
                      className={`flex items-center gap-4 pl-4 ${
                        isFeatured
                          ? "lg:border-l lg:border-slate-100 lg:pl-12 lg:min-w-[260px] shrink-0"
                          : "pt-6 border-t border-slate-100"
                      }`}
                    >
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-sm font-bold shadow-md shadow-emerald-200/50 shrink-0">
                        {initials}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{name}</p>
                        <p className="text-sm text-text-muted">
                          {t(`title${key}` as "title1")}
                        </p>
                        <p className="text-sm font-medium text-emerald-600">
                          {t(`company${key}` as "company1")}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </MotionDiv>
              );
            })}
          </div>
        </div>
      </BlurReveal>
    </section>
  );
}
