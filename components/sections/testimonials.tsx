"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlurReveal, MotionDiv, blurIn } from "@/components/motion-wrapper";
import { cn } from "@/lib/utils";

const INTERVAL = 6000; // ms between auto-advances

/* Two testimonials, both translatable via the `Testimonials` namespace.
   Each slide has its own photo. */
const SLIDES = [
  { quote: "quote1", name: "name1", title: "title1", company: "company1", src: "/testimonial.jpg" },
  { quote: "quote2", name: "name2", title: "title2", company: "company2", src: "/testimonial2.jpg" },
];

export default function Testimonials() {
  const t = useTranslations("Testimonials");
  const [index, setIndex] = useState(0);

  const goTo = (i: number) => setIndex((i + SLIDES.length) % SLIDES.length);
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  // Auto-advance; resets whenever `index` changes (incl. manual clicks).
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), INTERVAL);
    return () => clearInterval(id);
  }, [index]);

  const slide = SLIDES[index];

  return (
    <section className="section-padding" id="testimonials">
      <BlurReveal>
        <div className="section-container">
          <MotionDiv variants={blurIn}>
            <div className="overflow-hidden rounded-xl border border-[#E9EAEB] bg-white p-3">
              <MotionDiv
                key={index}
                variants={blurIn}
                initial="hidden"
                animate="visible"
                className="grid gap-3 md:grid-cols-[395px_1fr]"
              >
                {/* photo */}
                <div className="overflow-hidden rounded-md bg-[#4B6148]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.src}
                    alt=""
                    aria-hidden
                    className="aspect-[395/300] h-full w-full object-cover md:aspect-[395/476]"
                  />
                </div>

                {/* content */}
                <div className="flex flex-col justify-between px-2 py-6 md:px-10 md:py-10">
                  <p className="text-xl font-medium leading-snug text-[#0A0D12] md:text-[30px] md:leading-[1.3]">
                    &ldquo;{t(slide.quote)}&rdquo;
                  </p>

                  <div className="mt-10 flex items-end justify-between gap-4">
                    <div>
                      <div className="text-lg font-semibold text-[#0A0D12] md:text-xl">
                        {t(slide.name)}
                      </div>
                      <div className="text-base text-[#717680] md:text-lg">
                        {t(slide.title)} {t(slide.company)}
                      </div>
                    </div>

                    <div className="flex shrink-0 gap-3">
                      <button
                        type="button"
                        onClick={prev}
                        aria-label="Previous testimonial"
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E9EAEB] text-[#0A0D12] transition-colors hover:bg-[#F5F5F5] md:h-[52px] md:w-[52px]"
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={next}
                        aria-label="Next testimonial"
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E9EAEB] text-[#0A0D12] transition-colors hover:bg-[#F5F5F5] md:h-[52px] md:w-[52px]"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </MotionDiv>
            </div>

            {/* dots */}
            <div className="mt-6 flex justify-center gap-2">
              {SLIDES.map((s, i) => (
                <button
                  key={s.quote}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-current={index === i}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    index === i ? "w-6 bg-[#0A0D12]" : "w-2 bg-slate-300 hover:bg-slate-400",
                  )}
                />
              ))}
            </div>
          </MotionDiv>
        </div>
      </BlurReveal>
    </section>
  );
}
