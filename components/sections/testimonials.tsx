"use client";

import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
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

export default function Testimonials() {
  return (
    <section className="section-padding">
      <BlurReveal>
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <MotionDiv variants={blurIn}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                What product teams say
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
                {TESTIMONIALS.map((testimonial, idx) => (
                  <CarouselItem
                    key={idx}
                    className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                  >
                    <motion.div
                      className="glass-card p-6 md:p-8 h-full flex flex-col group hover:border-primary/30 transition-colors duration-300"
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {/* Stars */}
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: testimonial.stars }).map((_, i) => (
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
                        &ldquo;{testimonial.quote}&rdquo;
                      </blockquote>

                      {/* Author */}
                      <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold group-hover:bg-primary/30 transition-colors">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{testimonial.name}</p>
                          <p className="text-xs text-text-muted">
                            {testimonial.title}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-4 mt-8">
                <CarouselPrevious className="static translate-y-0 bg-surface border-border hover:bg-surface/80 hover:border-primary/30 text-white transition-colors" />
                <CarouselNext className="static translate-y-0 bg-surface border-border hover:bg-surface/80 hover:border-primary/30 text-white transition-colors" />
              </div>
            </Carousel>
          </MotionDiv>
        </div>
      </BlurReveal>
    </section>
  );
}
