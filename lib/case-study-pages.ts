import type { Sector } from "@/lib/case-studies-data";

/* ──────────────────────────────────────────────────────────────
   Config for the redesigned, data-driven case-study pages.
   Content lives in the `CaseStudyPages` i18n namespace (per industry,
   keyed by its i18nKey); this file holds the non-text bits: which photo
   + tint the hero card uses (by sector archetype) and the persona card
   palette. The Ontology graphic and the CTA banner are identical across
   every industry, so they have no per-industry config.
   ────────────────────────────────────────────────────────────── */

export type Archetype =
  | "tech"
  | "commerce"
  | "finance"
  | "industrial"
  | "operations"
  | "services"
  | "public";

interface ArchetypeAsset {
  /** B&W photo behind the hero card (object-cover) */
  photo: string;
  /** color-blend tint laid over the photo */
  tint: string;
}

export const ARCHETYPE_ASSETS: Record<Archetype, ArchetypeAsset> = {
  tech: { photo: "/case-studies/hero/tech.jpg", tint: "#185BC0" },
  commerce: { photo: "/case-studies/hero/commerce.jpg", tint: "#BC0B36" },
  finance: { photo: "/case-studies/hero/finance.jpg", tint: "#37C574" },
  industrial: { photo: "/case-studies/hero/industrial.jpg", tint: "#ED9638" },
  operations: { photo: "/case-studies/hero/operations.jpg", tint: "#437E77" },
  services: { photo: "/case-studies/hero/services.jpg", tint: "#2F3F57" },
  public: { photo: "/case-studies/hero/public.jpg", tint: "#400E9D" },
};

/**
 * Pre-rendered hero card per archetype — exact copies of the Figma sector cards
 * (`public/case-studies/Type=*.svg`), rendered to webp at 1032×952 (2× of the
 * 516×476 card). These bake in the sector pill, the Risk/Decision/Outcome pills,
 * the icons, and the tinted B&W background exactly as designed, so the hero uses
 * the image instead of the HTML reconstruction.
 */
export const ARCHETYPE_HERO_CARD: Record<Archetype, string> = {
  tech: "/case-studies/hero-tech.webp",
  commerce: "/case-studies/hero-commerce.webp",
  finance: "/case-studies/hero-finance.webp",
  industrial: "/case-studies/hero-industrial.webp",
  operations: "/case-studies/hero-operations.webp",
  services: "/case-studies/hero-services.webp",
  public: "/case-studies/hero-public.webp",
};

/** Each sector maps to one hero-card archetype. */
export const SECTOR_ARCHETYPE: Record<Sector, Archetype> = {
  Technology: "tech",
  Industrial: "industrial",
  Finance: "finance",
  "Health & Science": "operations",
  "Commerce & Media": "commerce",
  Services: "services",
  "Public & Social": "public",
};

/**
 * Persona card backgrounds — cycled by index. The first three are the exact
 * IT persona cards (baked node-graph motifs); the 4th/5th are the Figma
 * "Property" gradient cards for industries with more than three personas.
 */
export const PERSONA_CARDS: string[] = [
  "/case-studies/it5-lead.webp", // orange — concentric rings
  "/case-studies/it5-eng.webp", // blue — hexagon graph
  "/case-studies/it5-ops.webp", // green — diamond graph
  "/case-studies/persona-red(2).jpg", // red gradient
  "/case-studies/persona-purple(2).jpg", // purple gradient
];

/** Named persona cards — a persona can pin a specific card via its `card` key. */
export const PERSONA_CARD_BY_NAME: Record<string, string> = {
  lead: "/case-studies/it5-lead.webp",
  eng: "/case-studies/it5-eng.webp",
  ops: "/case-studies/it5-ops.webp",
  red: "/case-studies/persona-red(2).jpg",
  purple: "/case-studies/persona-purple(2).jpg",
};

/**
 * Industries (by i18nKey) that use a pre-rendered hero card image instead of
 * the HTML reconstruction. SaaS reuses the exact IT hero card.
 */
export const HERO_CARD_IMAGE: Record<string, string> = {
  saasProduct: "/case-studies/it-hero-card.webp",
};

/**
 * Slugs that have been migrated to the new design (i.e. have content under the
 * `CaseStudyPages` namespace). The [slug] route renders the new page for these
 * and falls back to the legacy article for the rest. `information-technology`
 * keeps its own bespoke static route, so it is intentionally absent here.
 */
export const MIGRATED_SLUGS: string[] = [
  "financial-services",
  "healthcare",
  "manufacturing",
  "ecommerce-retail",
  "saas-product",
  "automotive",
  "aerospace-defense",
  "fintech",
  "insurance",
  "pharma-life-sciences",
  "media-entertainment",
  "gaming",
  "logistics-supply-chain",
  "energy-utilities",
  "telecommunications",
  "professional-services",
  "legal",
  "government-public-sector",
  "education-academia",
  "construction-real-estate",
  "marketing-advertising",
  "venture-capital-private-equity",
  "nonprofit-ngo",
];

export function isMigrated(slug: string): boolean {
  return MIGRATED_SLUGS.includes(slug);
}
