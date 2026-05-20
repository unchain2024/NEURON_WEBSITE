import { Lightbulb, PlayCircle } from "lucide-react";
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
      <ol className="list-decimal space-y-2 pl-6 text-base leading-relaxed text-text-secondary marker:text-primary marker:font-semibold">
        {block.keys.map((k) => (
          <li key={k} className="pl-1">
            {t(k)}
          </li>
        ))}
      </ol>
    );
  }

  if (block.type === "video") {
    return (
      <a
        href={block.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-primary shadow-sm transition-colors hover:border-primary/40 hover:bg-primary/5"
      >
        <PlayCircle className="h-4 w-4" aria-hidden />
        {t(block.labelKey)}
      </a>
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
