// Per-industry one-pager PDFs in public/download/onepagers/,
// named <case-study-slug>-<en|ja>.pdf (one pair per CASE_STUDIES entry).

export function onepagerPath(slug: string, lang: "en" | "ja") {
  return `/download/onepagers/${slug}-${lang}.pdf`;
}
