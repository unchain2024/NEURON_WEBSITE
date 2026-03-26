export type TierId = "starter" | "team" | "business" | "enterprise";
export type Locale = "en" | "ja";

export interface TierPrices {
  monthlyPerSeat: number | null;
  annualPerSeat: number | null;
  savingsPerSeat: number | null;
  currency: string;
  locale: string;
}

export interface PricingTier {
  id: TierId;
  prices: Record<Locale, TierPrices>;
  minSeats: number;
  badge: "mostPopular" | null;
  ctaType: "trial" | "contactSales";
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "starter",
    prices: {
      en: { monthlyPerSeat: 50, annualPerSeat: 500, savingsPerSeat: 100, currency: "USD", locale: "en-US" },
      ja: { monthlyPerSeat: 7500, annualPerSeat: 75000, savingsPerSeat: 15000, currency: "JPY", locale: "ja-JP" },
    },
    minSeats: 3,
    badge: null,
    ctaType: "trial",
  },
  {
    id: "team",
    prices: {
      en: { monthlyPerSeat: 70, annualPerSeat: 700, savingsPerSeat: 140, currency: "USD", locale: "en-US" },
      ja: { monthlyPerSeat: 10500, annualPerSeat: 105000, savingsPerSeat: 21000, currency: "JPY", locale: "ja-JP" },
    },
    minSeats: 5,
    badge: "mostPopular",
    ctaType: "trial",
  },
  {
    id: "business",
    prices: {
      en: { monthlyPerSeat: 120, annualPerSeat: 1200, savingsPerSeat: 240, currency: "USD", locale: "en-US" },
      ja: { monthlyPerSeat: 18000, annualPerSeat: 180000, savingsPerSeat: 36000, currency: "JPY", locale: "ja-JP" },
    },
    minSeats: 15,
    badge: null,
    ctaType: "trial",
  },
  {
    id: "enterprise",
    prices: {
      en: { monthlyPerSeat: null, annualPerSeat: null, savingsPerSeat: null, currency: "USD", locale: "en-US" },
      ja: { monthlyPerSeat: null, annualPerSeat: null, savingsPerSeat: null, currency: "JPY", locale: "ja-JP" },
    },
    minSeats: 30,
    badge: null,
    ctaType: "contactSales",
  },
];

export type FeatureValue = boolean | string;

export interface FeatureRow {
  i18nKey: string;
  starter: FeatureValue;
  team: FeatureValue;
  business: FeatureValue;
  enterprise: FeatureValue;
}

export interface FeatureCategory {
  i18nKey: string;
  features: FeatureRow[];
}

export const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    i18nKey: "corePlatform",
    features: [
      { i18nKey: "decisionExtraction", starter: true, team: true, business: true, enterprise: true },
      { i18nKey: "decisionBoards", starter: "unlimited", team: "unlimited", business: "unlimited", enterprise: "unlimited" },
      { i18nKey: "chatWithCitations", starter: true, team: true, business: true, enterprise: true },
      { i18nKey: "syncOut", starter: true, team: true, business: true, enterprise: true },
      { i18nKey: "queriesPerMonth", starter: "queries200", team: "queries500", business: "queries1500", enterprise: "queriesUnlimited" },
      { i18nKey: "workspaces", starter: "workspaces1", team: "workspaces3", business: "workspaces5", enterprise: "workspacesUnlimited" },
      { i18nKey: "adminsPerWorkspace", starter: "admins1", team: "admins3", business: "admins5", enterprise: "adminsUnlimited" },
    ],
  },
  {
    i18nKey: "integrationsData",
    features: [
      { i18nKey: "integrations", starter: "integrations3", team: "integrations7", business: "integrations15", enterprise: "integrationsUnlimited" },
      { i18nKey: "fileUploads", starter: true, team: true, business: true, enterprise: true },
      { i18nKey: "storage", starter: "storage2gb", team: "storage15gb", business: "storage50gb", enterprise: "storageUnlimited" },
      { i18nKey: "dataRetention", starter: "retention6mo", team: "retention1yr", business: "retentionUnlimited", enterprise: "retentionUnlimited" },
      { i18nKey: "autoSyncInterval", starter: "sync30min", team: "sync10min", business: "syncConfigurable", enterprise: "syncConfigurable" },
    ],
  },
  {
    i18nKey: "intelligence",
    features: [
      { i18nKey: "crossSourceLinking", starter: true, team: true, business: true, enterprise: true },
      { i18nKey: "decisionGraph", starter: false, team: true, business: true, enterprise: true },
      { i18nKey: "multiAgentAnalysis", starter: false, team: true, business: true, enterprise: true },
      { i18nKey: "customAiAgents", starter: false, team: false, business: true, enterprise: true },
      { i18nKey: "industryAgentCatalog", starter: false, team: true, business: true, enterprise: true },
      { i18nKey: "exportDecisions", starter: false, team: true, business: true, enterprise: true },
    ],
  },
  {
    i18nKey: "accessSecurity",
    features: [
      { i18nKey: "rbac", starter: "rbacBasic", team: "rbacBasic", business: "rbacBasic", enterprise: "rbacCustom" },
      { i18nKey: "sourcePermissions", starter: false, team: true, business: true, enterprise: true },
      { i18nKey: "ssoSaml", starter: false, team: false, business: true, enterprise: true },
      { i18nKey: "auditLog", starter: false, team: "audit30days", business: "audit1yr", enterprise: "auditUnlimited" },
      { i18nKey: "apiAccess", starter: false, team: "apiReadOnly", business: "apiFull", enterprise: "apiFullWebhooks" },
    ],
  },
  {
    i18nKey: "support",
    features: [
      { i18nKey: "supportChannel", starter: "supportChat", team: "supportEmail48h", business: "supportPriority4h", enterprise: "supportDedicatedCsm" },
      { i18nKey: "onboarding", starter: "onboardingSelfServe", team: "onboardingGuided", business: "onboardingWhiteGlove", enterprise: "onboardingDedicated" },
      { i18nKey: "sla", starter: false, team: false, business: "sla995", enterprise: "sla999" },
    ],
  },
];

export const FAQ_KEYS = [
  "tryBeforeBuying",
  "trialEnds",
  "changePlans",
  "whatIsSeat",
  "whatIsQuery",
  "integrations",
  "dataSecurity",
  "nonprofitDiscount",
] as const;

export const ENTERPRISE_EXTRA_COUNT = 11;

export function formatCurrency(amount: number, currency: string, formatLocale: string): string {
  return new Intl.NumberFormat(formatLocale, {
    style: "currency",
    currency,
    minimumFractionDigits: currency === "JPY" ? 0 : 0,
    maximumFractionDigits: currency === "JPY" ? 0 : 2,
  }).format(amount);
}

export function capitalizeTierId(id: TierId): string {
  return id.charAt(0).toUpperCase() + id.slice(1);
}
