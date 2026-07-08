import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  /** The brief that follows `[IMAGE:` in the v7 spec, e.g. "NEURON app — Signals / Dashboard". */
  caption: string;
  className?: string;
  /** Aspect ratio utility class, defaults to a wide 16:9 block. */
  aspect?: string;
}

/**
 * Renders the spec's `[IMAGE: …]` markers as a styled placeholder block.
 * Real screenshots/photography are dropped in later — until then this keeps
 * the layout honest and labels exactly what art goes here (brief for design).
 */
export default function ImagePlaceholder({
  caption,
  className,
  aspect = "aspect-[16/9]",
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-dashed border-border bg-surface",
        "flex flex-col items-center justify-center gap-3 text-center p-6",
        aspect,
        className
      )}
      role="img"
      aria-label={caption}
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.04)_0%,transparent_70%)]" />
      <ImageIcon className="h-7 w-7 text-text-muted" />
      <span className="text-xs font-medium uppercase tracking-wide text-text-muted">
        [IMAGE]
      </span>
      <span className="max-w-md text-sm text-text-secondary">{caption}</span>
    </div>
  );
}
