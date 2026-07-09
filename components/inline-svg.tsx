import { type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/* Renders an SVG's markup inline in the DOM instead of through `<img src>`.

   Figma exports carry `feGaussianBlur` filters (shadows/glows). When a filtered
   SVG is drawn via `<img>`, mobile Safari/Chrome rasterise the filter region at
   the SVG's intrinsic viewBox size — ignoring the device pixel ratio — then
   upscale it, so the art looks blurry on phones while staying crisp on desktop.
   Inline `<svg>` is rendered in the live pipeline at device resolution, so it
   stays sharp everywhere.

   Pass the markup from a `*.svg?raw` import (enabled in next.config.mjs). The
   child `<svg>` is forced fluid via CSS so it fills the wrapper regardless of
   the width/height baked into the export (the viewBox keeps the aspect ratio).
   This is a plain, serialisable component, so it works inside both server and
   client components. */
export function InlineSvg({
  svg,
  className,
  style,
  ariaLabel,
}: {
  svg: string;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
}) {
  return (
    <div
      className={cn("[&>svg]:block [&>svg]:h-auto [&>svg]:w-full", className)}
      style={style}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
