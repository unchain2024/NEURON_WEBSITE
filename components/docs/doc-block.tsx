import { Lightbulb } from "lucide-react";
import { localizeDocImageSrc, type DocBlock } from "@/lib/docs-config";

// Loose translator shape so both the server `getTranslations` result and
// the client `useTranslations` result satisfy it without us importing
// next-intl's internal types here.
type Translator = (key: string) => string;

// `t` belongs to the topic's namespace (e.g. `DocsQuickStart`). The renderer
// looks up keys inside that namespace — never across namespaces — so the
// caller is the one source of truth for namespace selection.
// `locale` is used to pick locale-specific image variants
// (e.g. `i1.webp` → `i1_ja.webp` for `ja`).
export default function Block({
  block,
  t,
  locale,
}: {
  block: DocBlock;
  t: Translator;
  locale: string;
}) {
  if (block.type === "paragraph") {
    return (
      <p className="text-base leading-relaxed text-text-secondary whitespace-pre-line">
        {t(block.key)}
      </p>
    );
  }

  if (block.type === "tip") {
    return (
      <div className="flex gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
        <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <p className="text-sm leading-relaxed text-slate-700">{t(block.key)}</p>
      </div>
    );
  }

  if (block.type === "ordered-list") {
    return (
      <ol className="space-y-4">
        {block.keys.map((k, i) => (
          <li key={k} className="flex items-start gap-3">
            {/* Dark gradient numbered badge (24px) — mirrors the wireframe. */}
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0A0D12] to-[#0A0D12]/60 text-xs font-medium text-white">
              {i + 1}
            </span>
            <span className="text-base leading-relaxed text-text-secondary">
              {t(k)}
            </span>
          </li>
        ))}
      </ol>
    );
  }

  if (block.type === "video") {
    // Drive "view" links become inline players via /preview.
    const embedUrl = block.url.replace(/\/view.*$/, "/preview");
    return (
      <figure className="overflow-hidden rounded-lg border border-[#E9EAEB]">
        <div className="relative aspect-video w-full bg-slate-900">
          <iframe
            src={embedUrl}
            title={t(block.labelKey)}
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </figure>
    );
  }

  // image — pick a locale-specific variant when one exists.
  return (
    <figure className="my-2 overflow-hidden rounded-xl border border-slate-200/70 bg-slate-50">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={localizeDocImageSrc(block.src, locale)}
        alt={t(block.altKey)}
        className="block w-full h-auto"
      />
    </figure>
  );
}
