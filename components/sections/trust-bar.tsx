import { TRUST_LOGOS } from "@/lib/constants";

export default function TrustBar() {
  // Duplicate logos for seamless infinite scroll
  const allLogos = [...TRUST_LOGOS, ...TRUST_LOGOS];

  return (
    <section className="py-12 md:py-16 overflow-hidden">
      <div className="section-container">
        <p className="text-center text-sm text-text-muted mb-8">
          Connects to the tools you already use
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
              key={`${logo}-${i}`}
              className="flex items-center justify-center mx-8 md:mx-12 shrink-0"
            >
              <span className="text-text-muted/60 text-lg md:text-xl font-semibold whitespace-nowrap select-none grayscale">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
