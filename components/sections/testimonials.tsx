"use client";

import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { BlurReveal, MotionDiv, blurIn } from "@/components/motion-wrapper";
import { motion } from "framer-motion";

const TESTIMONIAL_KEYS = ["1", "2", "3"] as const;

export default function Testimonials() {
  const t = useTranslations("Testimonials");

  return (
    <section className="section-padding">
      <BlurReveal>
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <MotionDiv variants={blurIn}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
                {t("heading")}
              </h2>
            </MotionDiv>
          </div>

          <MotionDiv variants={blurIn}>
            <Carousel
              opts={{ loop: true, align: "start" }}
              plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {TESTIMONIAL_KEYS.map((key) => {
                  const name = t(`name${key}` as "name1");
                  const initials = name
                    .split(" ")
                    .map((n) => n[0])
                    .join("");

                  return (
                    <CarouselItem
                      key={key}
                      className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                    >
                      <motion.div
                        className="glass-card p-6 md:p-8 h-full flex flex-col group hover:border-primary/30 transition-colors duration-300"
                        whileHover={{ y: -4 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        {/* Stars */}
                        <div className="flex gap-1 mb-4">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                            >
                              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            </motion.div>
                          ))}
                        </div>

                        {/* Quote */}
                        <blockquote className="text-text-secondary leading-relaxed flex-1 mb-6">
                          &ldquo;{t(`quote${key}` as "quote1")}&rdquo;
                        </blockquote>

                        {/* Author */}
                        <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold group-hover:bg-primary/30 transition-colors">
                            {initials}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">{name}</p>
                            <p className="text-xs text-text-muted">
                              {t(`title${key}` as "title1")}, {t(`company${key}` as "company1")}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <div className="flex justify-center gap-4 mt-8">
                <CarouselPrevious className="static translate-y-0 bg-white border-border hover:bg-slate-50 hover:border-primary/30 text-slate-900 transition-colors" />
                <CarouselNext className="static translate-y-0 bg-white border-border hover:bg-slate-50 hover:border-primary/30 text-slate-900 transition-colors" />
              </div>
            </Carousel>
          </MotionDiv>
        </div>
      </BlurReveal>
    </section>
  );
}
