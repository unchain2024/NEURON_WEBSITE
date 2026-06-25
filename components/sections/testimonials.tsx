"use client";

import { useEffect, useState } from "react";
import { BlurReveal, MotionDiv, blurIn } from "@/components/motion-wrapper";

/* Each testimonial panel is delivered as a full-width 1080×500 SVG. */
const PANELS = ["/test1.svg", "/test2.svg"];
const INTERVAL = 5000; // ms between auto-advances

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const goTo = (i: number) => setIndex((i + PANELS.length) % PANELS.length);
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  // Auto-advance through the panels on a timer. Resets whenever `index`
  // changes (incl. manual arrow/dot clicks) so a click restarts the countdown.
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % PANELS.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [index]);

  return (
    <section className="section-padding">
      <BlurReveal>
        <div className="section-container">
          <MotionDiv variants={blurIn}>
            {/* Slider: panels stacked, crossfading; track width = #panels */}
            <div className="relative w-full overflow-hidden">
              <div className="relative aspect-[1080/500] w-full">
                {PANELS.map((src, i) => (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    key={src}
                    src={src}
                    alt="What teams using NEURON say"
                    width={1080}
                    height={500}
                    className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ease-out ${
                      index === i ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}

                {/* Transparent click targets over the arrow controls baked
                    into the panel art (43×43 circles at y=404.5, x=928.5 /
                    984.5 in the 1080×500 frame). */}
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="absolute cursor-pointer rounded-full focus:outline-none"
                  style={{
                    left: `${(928.5 / 1080) * 100}%`,
                    top: `${(404.5 / 500) * 100}%`,
                    width: `${(43 / 1080) * 100}%`,
                    height: `${(43 / 500) * 100}%`,
                  }}
                />
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next testimonial"
                  className="absolute cursor-pointer rounded-full focus:outline-none"
                  style={{
                    left: `${(984.5 / 1080) * 100}%`,
                    top: `${(404.5 / 500) * 100}%`,
                    width: `${(43 / 1080) * 100}%`,
                    height: `${(43 / 500) * 100}%`,
                  }}
                />
              </div>

              {/* Dots */}
              <div className="mt-6 flex justify-center gap-2">
                {PANELS.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Show testimonial ${i + 1}`}
                    aria-current={index === i}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === i ? "w-6 bg-[#0A0D12]" : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </MotionDiv>
        </div>
      </BlurReveal>
    </section>
  );
}
