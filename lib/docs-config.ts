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
  {
    slug: "integrations",
    titleKey: "cardIntegrationsTitle",
    descriptionKey: "cardIntegrationsDescription",
  },
  // Re-enable as real pages come online.
  // { slug: "core-concepts", titleKey: "cardCoreConceptsTitle", descriptionKey: "cardCoreConceptsDescription" },
  // { slug: "configuration", titleKey: "cardConfigurationTitle", descriptionKey: "cardConfigurationDescription" },
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
  | { type: "image"; src: string; altKey: string }
  | { type: "ordered-list"; keys: string[] }
  | { type: "video"; url: string; labelKey: string };

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

// ─── Integrations ────────────────────────────────────────────────────────

export const INTEGRATION_SLUGS = [
  "chatwork",
  "github",
  "discord",
  "granola",
  "hubspot",
  "jira",
  "kintone",
  "linear",
  "monday",
  "notion",
  "recallai",
  "slack",
] as const;

export type IntegrationSlug = (typeof INTEGRATION_SLUGS)[number];

export const INTEGRATION_LOGOS: Record<IntegrationSlug, string> = {
  chatwork: "/logos/chatwork.svg",
  github: "/logos/github.svg",
  discord: "/logos/discord.svg",
  granola: "/logos/granola.svg",
  hubspot: "/logos/hubspot.svg",
  jira: "/logos/jira.svg",
  kintone: "/logos/kintone.svg",
  linear: "/logos/linear.svg",
  monday: "/logos/monday.svg",
  notion: "/logos/notion.svg",
  recallai: "/logos/recallai.svg",
  slack: "/logos/slack.svg",
};

// Per-integration namespace + video URL.
// Step counts vary per platform (see `Doc for Integrations.pdf`).
type IntegrationMeta = {
  namespace: string;
  videoUrl: string;
  stepCount: number;
};

const INTEGRATION_META: Record<IntegrationSlug, IntegrationMeta> = {
  chatwork: {
    namespace: "DocsIntegrationChatwork",
    videoUrl:
      "https://drive.google.com/file/d/12iFRhhSJQszazLxjHyWDtzM4-O70Vvgw/view?usp=drive_link",
    stepCount: 5,
  },
  github: {
    namespace: "DocsIntegrationGithub",
    videoUrl:
      "https://drive.google.com/file/d/1l-YlQvMPiqa0lWS58O4GZVU-peJGO4Gd/view?usp=drive_link",
    stepCount: 10,
  },
  discord: {
    namespace: "DocsIntegrationDiscord",
    videoUrl:
      "https://drive.google.com/file/d/1R10MZpjOIVu-Hf7XSDiAyfPqOzrajj-P/view?usp=drive_link",
    stepCount: 8,
  },
  granola: {
    namespace: "DocsIntegrationGranola",
    videoUrl:
      "https://drive.google.com/file/d/1S4zK0FnInRKQcQ47cF1qyCEh0Rc7NwH0/view?usp=drive_link",
    stepCount: 6,
  },
  hubspot: {
    namespace: "DocsIntegrationHubspot",
    videoUrl:
      "https://drive.google.com/file/d/1NGFY2Smn2Ij5ZKKEx6xfM2s93ae9tBev/view?usp=drive_link",
    stepCount: 7,
  },
  jira: {
    namespace: "DocsIntegrationJira",
    videoUrl:
      "https://drive.google.com/file/d/1dJftyjke_r_0c_uYLQbd_SwVXq4msQt4/view?usp=drive_link",
    stepCount: 8,
  },
  kintone: {
    namespace: "DocsIntegrationKintone",
    videoUrl:
      "https://drive.google.com/file/d/1DolI4oCdVgiWgs_6-VE7q8k85mwj6PNm/view?usp=drive_link",
    stepCount: 8,
  },
  linear: {
    namespace: "DocsIntegrationLinear",
    videoUrl:
      "https://drive.google.com/file/d/1jMb9ucTbYwtoZ5SaU5Za8nc0WXUaRGCy/view?usp=drive_link",
    stepCount: 7,
  },
  monday: {
    namespace: "DocsIntegrationMonday",
    videoUrl:
      "https://drive.google.com/file/d/1bXnoNiB1taajSKyPQzRq1DIDS-Tmcjp2/view?usp=drive_link",
    stepCount: 5,
  },
  notion: {
    namespace: "DocsIntegrationNotion",
    videoUrl:
      "https://drive.google.com/file/d/1CmZj6cTKGnzHFt8-XSMfZeDBoXXgPBMZ/view?usp=drive_link",
    stepCount: 6,
  },
  recallai: {
    namespace: "DocsIntegrationRecallai",
    videoUrl:
      "https://drive.google.com/file/d/1Qk5_N5o6qUkEPpOMPDZBkCCUeeuRXumg/view?usp=drive_link",
    stepCount: 6,
  },
  slack: {
    namespace: "DocsIntegrationSlack",
    videoUrl:
      "https://drive.google.com/file/d/1NgVfpoZJwdqHhPc0SaBtXA1u0tL3Iv7M/view?usp=drive_link",
    stepCount: 7,
  },
};

// Builds a leaf integration topic from its meta. All 12 share the same
// section shape (overview → setup steps → video), so the body is generated
// rather than copy-pasted.
function buildIntegrationTopic(slug: IntegrationSlug): DocTopic {
  const { namespace, videoUrl, stepCount } = INTEGRATION_META[slug];
  const stepKeys = Array.from({ length: stepCount }, (_, i) => `step${i + 1}`);
  return {
    slug,
    namespace,
    titleKey: "title",
    subtopics: [],
    sections: [
      {
        id: "overview",
        titleKey: "overviewTitle",
        blocks: [{ type: "paragraph", key: "overviewP1" }],
      },
      {
        id: "setup",
        titleKey: "setupTitle",
        blocks: [{ type: "ordered-list", keys: stepKeys }],
      },
      {
        id: "video",
        titleKey: "videoTitle",
        blocks: [
          { type: "video", url: videoUrl, labelKey: "videoLabel" },
        ],
      },
    ],
  };
}

// Parent topic exposed in the sidebar — purely structural, no body.
const integrationsParent: DocTopic = {
  slug: "integrations",
  namespace: "DocsIntegrations",
  titleKey: "title",
  subtopics: INTEGRATION_SLUGS.map((slug) => ({
    slug,
    titleKey: `${slug}Title`,
  })),
  sections: [],
};

// Per-doc content. Keyed by slug so pages can be generated from config.
// Integration leaves are namespaced under `integrations/<slug>` to keep
// future top-level topics safe from collisions.
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
  // 12 integration leaves, generated from INTEGRATION_META.
  ...Object.fromEntries(
    INTEGRATION_SLUGS.map((slug) => [
      `integrations/${slug}`,
      buildIntegrationTopic(slug),
    ]),
  ),
};

// Looks up the leaf topic for an integration slug.
export function getIntegrationTopic(slug: string): DocTopic | undefined {
  return docsConfig[`integrations/${slug}`];
}

// Parent topics rendered in the left sidebar on doc pages.
export const SIDEBAR_TOPICS: DocTopic[] = [
  docsConfig["quick-start"],
  integrationsParent,
];

// Resolves a doc image src for the given locale. Non-default locales fall back
// to a sibling file with a `_<locale>` suffix before the extension
// (e.g. `/docs_images/i1.webp` → `/docs_images/i1_ja.webp`). The default locale
// (`en`) keeps the base filename.
export function localizeDocImageSrc(src: string, locale: string): string {
  if (locale === "en") return src;
  return src.replace(/(\.[^./]+)$/, `_${locale}$1`);
}
