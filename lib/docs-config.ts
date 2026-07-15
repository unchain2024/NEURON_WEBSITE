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
  // `urls` holds one video URL per locale (keyed by locale code, e.g. `en`/`ja`).
  // The renderer picks `urls[locale]` so the player swaps when the language does.
  | { type: "video"; urls: Record<string, string>; labelKey: string };

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

// Per-integration namespace + per-locale video URLs.
// Step counts vary per platform (see `Doc for Integrations.pdf`).
//
// `videoUrls` holds one Google Drive "view" link per locale. The link is
// swapped automatically when the site language changes. To add/replace a
// video, paste the Drive share link (…/file/d/<id>/view?usp=drive_link) into
// the matching `en` / `ja` slot below. Leave a slot as "" until you have that
// language's video — the player falls back to the other locale's URL, and
// shows a "coming soon" placeholder only if BOTH are empty.
type IntegrationMeta = {
  namespace: string;
  videoUrls: { en: string; ja: string };
  stepCount: number;
};

const INTEGRATION_META: Record<IntegrationSlug, IntegrationMeta> = {
  chatwork: {
    namespace: "DocsIntegrationChatwork",
    videoUrls: {
      en: "https://drive.google.com/file/d/1j2yDEj6VaUeC43wJ1UAJh1x_ZnHpq1gx/view?usp=drive_link", 
      ja: "https://drive.google.com/file/d/1F6ICIrdhPJl5DbgsGvB73FQpcMEvogCc/view?usp=drive_link",
    },
    stepCount: 5,
  },
  github: {
    namespace: "DocsIntegrationGithub",
    videoUrls: {
      en: "https://drive.google.com/file/d/1obxHvq_ksswQUOLGDLwiEAxktkRq949c/view?usp=drive_link", // TODO: add English video link
      ja: "https://drive.google.com/file/d/1tsC3qpbme6DVwDT42QT-NUPB-WbnO9NE/view?usp=drive_link",
    },
    stepCount: 10,
  },
  discord: {
    namespace: "DocsIntegrationDiscord",
    videoUrls: {
      en: "https://drive.google.com/file/d/1d5ixOWh8HPWQD1V1THZquLOQ_0drgswV/view?usp=drive_link", // TODO: add English video link
      ja: "https://drive.google.com/file/d/1qbycTOGrGzy88V7hJIgynfpQEmhrPdTP/view?usp=drive_link",
    },
    stepCount: 8,
  },
  granola: {
    namespace: "DocsIntegrationGranola",
    videoUrls: {
      en: "", // TODO: add English video link
      ja: "",
    },
    stepCount: 6,
  },
  hubspot: {
    namespace: "DocsIntegrationHubspot",
    videoUrls: {
      en: "https://drive.google.com/file/d/1fWAsPiQUZYTCDDjHtNc-4KeWx7NDQhPg/view?usp=drive_link", // TODO: add English video link
      ja: "https://drive.google.com/file/d/1HSYTYvOGDYaj62aLsscsuHU9qNStWHDj/view?usp=drive_link",
    },
    stepCount: 7,
  },
  jira: {
    namespace: "DocsIntegrationJira",
    videoUrls: {
      en: "https://drive.google.com/file/d/1SCz_xncUiOCT2sSo5v6oqwXCT77VVstj/view?usp=drive_link", // TODO: add English video link
      ja: "https://drive.google.com/file/d/1AJDtwQfjl7KJKpqpI3k60rzBTq2BkyxZ/view?usp=drive_link",
    },
    stepCount: 8,
  },
  kintone: {
    namespace: "DocsIntegrationKintone",
    videoUrls: {
      en: "https://drive.google.com/file/d/1CNMKd7bKw2H2N_lTnU_SFsFEp3JyMmJt/view?usp=drive_link", // TODO: add English video link
      ja: "https://drive.google.com/file/d/1CtNHM8qNGp_puL5mfEfEi-FjeIcSl0wo/view?usp=drive_link",
    },
    stepCount: 8,
  },
  linear: {
    namespace: "DocsIntegrationLinear",
    videoUrls: {
      en: "https://drive.google.com/file/d/1DXMTaRlA4X7vaA94x-fp53L2gzi_IaOw/view?usp=drive_link", // TODO: add English video link
      ja: "https://drive.google.com/file/d/1t23j-ODXWGWgdHEd84gVh8XOCdR8XDaL/view?usp=drive_link",
    },
    stepCount: 7,
  },
  monday: {
    namespace: "DocsIntegrationMonday",
    videoUrls: {
      en: "https://drive.google.com/file/d/11m7A3ydsuqtldvdrgLk-wQBaJBuuKA5S/view?usp=drive_link", // TODO: add English video link
      ja: "https://drive.google.com/file/d/15AlVQ9m_tFZ5r2ClyrkzYD9qXyxm-5cp/view?usp=drive_link",
    },
    stepCount: 5,
  },
  notion: {
    namespace: "DocsIntegrationNotion",
    videoUrls: {
      en: "https://drive.google.com/file/d/1bi5y230vJPHOv-kk5DG7iC5n93CA4AaH/view?usp=drive_link", // TODO: add English video link
      ja: "https://drive.google.com/file/d/1MzCjsdbzZ5z7V5G6Ca0scNWEzY04XvCG/view?usp=drive_link",
    },
    stepCount: 6,
  },
  recallai: {
    namespace: "DocsIntegrationRecallai",
    videoUrls: {
      en: "https://drive.google.com/file/d/1wWGjWr4ZKJo-Vu8aAWGyjs2UfduZZDdv/view?usp=drive_link", // TODO: add English video link
      ja: "https://drive.google.com/file/d/1zQ9TwKRXa_NaJRMZxWSmdMuRzsc1yh5i/view?usp=drive_link",
    },
    stepCount: 6,
  },
  slack: {
    namespace: "DocsIntegrationSlack",
    videoUrls: {
      en: "https://drive.google.com/file/d/1yBdk2UYZNZVtpGWhjzozmq6EzihtfGy5/view?usp=drive_link", // TODO: add English video link
      ja: "https://drive.google.com/file/d/1vPi75M8vZB3jI3AdR9N1_pif3ylxUCiE/view?usp=drive_link",
    },
    stepCount: 7,
  },
};

// Builds a leaf integration topic from its meta. All 12 share the same
// section shape (overview → setup steps → video), so the body is generated
// rather than copy-pasted.
function buildIntegrationTopic(slug: IntegrationSlug): DocTopic {
  const { namespace, videoUrls, stepCount } = INTEGRATION_META[slug];
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
          { type: "video", urls: videoUrls, labelKey: "videoLabel" },
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
