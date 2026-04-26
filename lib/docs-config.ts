// Centralized, config-driven structure for the documentation section.
// Strings live in `messages/{en,ja}.json`; this file holds only the
// structural skeleton and references the translation keys to look up.
//
// TODO: Split long-form content into MDX/CMS-backed sources as the
//       documentation grows.

// ─── Card grid (/docs landing) ───────────────────────────────────────────
//
// `titleKey` and `descriptionKey` resolve against the `Docs` namespace.
export type DocCardEntry = {
  slug: string;
  titleKey: string;
  descriptionKey: string;
};

export const DOC_CARDS: DocCardEntry[] = [
  {
    slug: "quick-start",
    titleKey: "cardQuickStartTitle",
    descriptionKey: "cardQuickStartDescription",
  },
  // Re-enable as real pages come online.
  // { slug: "core-concepts", titleKey: "cardCoreConceptsTitle", descriptionKey: "cardCoreConceptsDescription" },
  // { slug: "configuration", titleKey: "cardConfigurationTitle", descriptionKey: "cardConfigurationDescription" },
  // { slug: "integrations",  titleKey: "cardIntegrationsTitle",  descriptionKey: "cardIntegrationsDescription" },
  // { slug: "api-reference", titleKey: "cardApiReferenceTitle",  descriptionKey: "cardApiReferenceDescription" },
  // { slug: "troubleshooting", titleKey: "cardTroubleshootingTitle", descriptionKey: "cardTroubleshootingDescription" },
];

// ─── FAQ (/docs landing) ─────────────────────────────────────────────────
//
// Keys resolve against the `Docs` namespace.
export type FAQEntry = {
  id: string;
  questionKey: string;
  answerKey: string;
};

export const DOCS_FAQ: FAQEntry[] = [
  { id: "faq-1", questionKey: "faq1Q", answerKey: "faq1A" },
  { id: "faq-2", questionKey: "faq2Q", answerKey: "faq2A" },
  { id: "faq-3", questionKey: "faq3Q", answerKey: "faq3A" },
  { id: "faq-4", questionKey: "faq4Q", answerKey: "faq4A" },
  { id: "faq-5", questionKey: "faq5Q", answerKey: "faq5A" },
];

// ─── Per-doc content ─────────────────────────────────────────────────────
//
// A section's body is a sequence of blocks rendered top-to-bottom. Each
// block stores translation keys (resolved against the topic's namespace)
// rather than literal strings.
export type DocBlock =
  | { type: "paragraph"; key: string }
  | { type: "tip"; key: string }
  | { type: "image"; src: string; altKey: string };

export type DocSection = {
  id: string;
  titleKey: string;
  blocks: DocBlock[];
};

export type DocSubtopic = {
  slug: string;
  titleKey: string;
};

export type DocTopic = {
  slug: string;
  // Translation namespace owned by this topic (e.g. "DocsQuickStart").
  // Lets the renderer look up titleKey, sections[].titleKey, blocks[].*Key
  // against the right slice of the messages JSON.
  namespace: string;
  titleKey: string;
  subtopics: DocSubtopic[];
  sections: DocSection[];
};

// Per-doc content. Keyed by slug so pages can be generated from config.
// For now only "quick-start" is rendered as a real page; other card slugs
// temporarily redirect here.
//
// TODO: Add an entry per real doc and split into separate route files
//       (e.g., /docs/core-concepts, /docs/configuration, ...).
export const docsConfig: Record<string, DocTopic> = {
  "quick-start": {
    slug: "quick-start",
    namespace: "DocsQuickStart",
    titleKey: "title",
    // TODO: Add subtopic entries when sub-pages exist (e.g. installation,
    //       configuration, first-steps).
    subtopics: [],
    sections: [
      {
        id: "create-account",
        titleKey: "createAccountTitle",
        blocks: [
          { type: "paragraph", key: "createAccountP1" },
          {
            type: "image",
            src: "/docs_images/i1.webp",
            altKey: "createAccountImgAlt",
          },
        ],
      },
      {
        id: "create-workspace",
        titleKey: "createWorkspaceTitle",
        blocks: [
          { type: "paragraph", key: "createWorkspaceP1" },
          {
            type: "image",
            src: "/docs_images/i2.webp",
            altKey: "createWorkspaceImgAlt",
          },
        ],
      },
      {
        id: "select-industry",
        titleKey: "selectIndustryTitle",
        blocks: [
          { type: "paragraph", key: "selectIndustryP1" },
          {
            type: "image",
            src: "/docs_images/i3.webp",
            altKey: "selectIndustryImgAlt",
          },
        ],
      },
      {
        id: "choose-agents",
        titleKey: "chooseAgentsTitle",
        blocks: [
          { type: "paragraph", key: "chooseAgentsP1" },
          { type: "tip", key: "chooseAgentsTip" },
          {
            type: "image",
            src: "/docs_images/i4.webp",
            altKey: "chooseAgentsImgAlt",
          },
        ],
      },
      {
        id: "integrations",
        titleKey: "integrationsTitle",
        blocks: [
          { type: "paragraph", key: "integrationsP1" },
          {
            type: "image",
            src: "/docs_images/i5.webp",
            altKey: "integrationsImg1Alt",
          },
          { type: "paragraph", key: "integrationsP2" },
          {
            type: "image",
            src: "/docs_images/i6.webp",
            altKey: "integrationsImg2Alt",
          },
        ],
      },
      {
        id: "sync-data",
        titleKey: "syncDataTitle",
        blocks: [
          { type: "paragraph", key: "syncDataP1" },
          {
            type: "image",
            src: "/docs_images/i7.webp",
            altKey: "syncDataImg1Alt",
          },
          { type: "paragraph", key: "syncDataP2" },
          {
            type: "image",
            src: "/docs_images/i8.webp",
            altKey: "syncDataImg2Alt",
          },
        ],
      },
    ],
  },
};

// Parent topics rendered in the left sidebar on doc pages.
export const SIDEBAR_TOPICS: DocTopic[] = [docsConfig["quick-start"]];
