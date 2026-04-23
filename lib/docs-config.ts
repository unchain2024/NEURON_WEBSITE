// Centralized, config-driven structure for the documentation section.
// Placeholder (lorem ipsum) content is used everywhere until real copy and
// routing are wired up.
//
// TODO: Replace placeholder slugs/titles with real documentation entries
//       and split long-form content into MDX/CMS-backed sources.

const LOREM_SHORT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const LOREM_LONG = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur.

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla
gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros
bibendum elit, nec luctus magna felis sollicitudin mauris.`;

export type DocCardEntry = {
  slug: string;
  title: string;
  description: string;
};

export type DocSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export type DocSubtopic = {
  slug: string;
  title: string;
};

export type DocTopic = {
  slug: string;
  title: string;
  subtopics: DocSubtopic[];
  sections: DocSection[];
};

export type FAQEntry = {
  id: string;
  question: string;
  answer: string;
};

// Cards shown on the /docs landing grid (3 columns × 2 rows).
export const DOC_CARDS: DocCardEntry[] = [
  { slug: "getting-started", title: "Lorem Ipsum", description: LOREM_SHORT },
  { slug: "core-concepts", title: "Lorem Ipsum", description: LOREM_SHORT },
  { slug: "configuration", title: "Lorem Ipsum", description: LOREM_SHORT },
  { slug: "integrations", title: "Lorem Ipsum", description: LOREM_SHORT },
  { slug: "api-reference", title: "Lorem Ipsum", description: LOREM_SHORT },
  { slug: "troubleshooting", title: "Lorem Ipsum", description: LOREM_SHORT },
];

// FAQ block rendered below the card grid on /docs.
export const DOCS_FAQ: FAQEntry[] = [
  { id: "faq-1", question: "Lorem ipsum dolor sit amet?", answer: LOREM_SHORT },
  { id: "faq-2", question: "Consectetur adipiscing elit?", answer: LOREM_SHORT },
  { id: "faq-3", question: "Sed do eiusmod tempor incididunt?", answer: LOREM_SHORT },
  { id: "faq-4", question: "Ut labore et dolore magna aliqua?", answer: LOREM_SHORT },
  { id: "faq-5", question: "Quis nostrud exercitation ullamco?", answer: LOREM_SHORT },
];

// Per-doc content. Keyed by slug so pages can be generated from config.
// For now only "getting-started" is rendered as a real page; other card slugs
// temporarily redirect here.
//
// TODO: Add an entry per real doc and split into separate route files
//       (e.g., /docs/core-concepts, /docs/configuration, ...).
export const docsConfig: Record<string, DocTopic> = {
  "getting-started": {
    slug: "getting-started",
    title: "Lorem Ipsum",
    subtopics: [
      { slug: "installation", title: "Lorem Ipsum" },
      { slug: "quick-start", title: "Lorem Ipsum" },
      { slug: "configuration", title: "Lorem Ipsum" },
      { slug: "first-steps", title: "Lorem Ipsum" },
    ],
    sections: [
      {
        id: "section-1",
        title: "Lorem Ipsum",
        paragraphs: [LOREM_LONG, LOREM_SHORT],
      },
      {
        id: "section-2",
        title: "Lorem Ipsum",
        paragraphs: [LOREM_LONG, LOREM_SHORT],
      },
      {
        id: "section-3",
        title: "Lorem Ipsum",
        paragraphs: [LOREM_LONG, LOREM_SHORT],
      },
      {
        id: "section-4",
        title: "Lorem Ipsum",
        paragraphs: [LOREM_LONG, LOREM_SHORT],
      },
      {
        id: "section-5",
        title: "Lorem Ipsum",
        paragraphs: [LOREM_LONG, LOREM_SHORT],
      },
    ],
  },
};

// Parent topics rendered in the left sidebar on doc pages.
// Each parent is expandable and holds its subtopic links.
export const SIDEBAR_TOPICS: DocTopic[] = [docsConfig["getting-started"]];
