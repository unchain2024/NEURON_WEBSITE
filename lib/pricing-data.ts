export type TierId = "starter" | "team" | "business" | "enterprise";
export type Locale = "en" | "ja";
export type Role = "pm" | "engineer";

export interface TierPrices {
  monthlyPerSeat: number | null;
  annualPerSeat: number | null;
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

const ENTERPRISE_TIER: PricingTier = {
  id: "enterprise",
  prices: {
    en: { monthlyPerSeat: null, annualPerSeat: null, currency: "USD", locale: "en-US" },
    ja: { monthlyPerSeat: null, annualPerSeat: null, currency: "JPY", locale: "ja-JP" },
  },
  minSeats: 30,
  badge: null,
  ctaType: "contactSales",
};

export const PM_PRICING_TIERS: PricingTier[] = [
  {
    id: "starter",
    prices: {
      en: { monthlyPerSeat: 34, annualPerSeat: 360, currency: "USD", locale: "en-US" },
      ja: { monthlyPerSeat: 4980, annualPerSeat: 52560, currency: "JPY", locale: "ja-JP" },
    },
    minSeats: 3,
    badge: null,
    ctaType: "trial",
  },
  {
    id: "team",
    prices: {
      en: { monthlyPerSeat: 57, annualPerSeat: 600, currency: "USD", locale: "en-US" },
      ja: { monthlyPerSeat: 7980, annualPerSeat: 84240, currency: "JPY", locale: "ja-JP" },
    },
    minSeats: 5,
    badge: "mostPopular",
    ctaType: "trial",
  },
  {
    id: "business",
    prices: {
      en: { monthlyPerSeat: 92, annualPerSeat: 972, currency: "USD", locale: "en-US" },
      ja: { monthlyPerSeat: 12980, annualPerSeat: 137040, currency: "JPY", locale: "ja-JP" },
    },
    minSeats: 15,
    badge: null,
    ctaType: "trial",
  },
  ENTERPRISE_TIER,
];

export const ENG_PRICING_TIERS: PricingTier[] = [
  {
    id: "starter",
    prices: {
      en: { monthlyPerSeat: 17, annualPerSeat: 180, currency: "USD", locale: "en-US" },
      ja: { monthlyPerSeat: 2280, annualPerSeat: 24072, currency: "JPY", locale: "ja-JP" },
    },
    minSeats: 3,
    badge: null,
    ctaType: "trial",
  },
  {
    id: "team",
    prices: {
      en: { monthlyPerSeat: 34, annualPerSeat: 360, currency: "USD", locale: "en-US" },
      ja: { monthlyPerSeat: 4980, annualPerSeat: 52560, currency: "JPY", locale: "ja-JP" },
    },
    minSeats: 5,
    badge: "mostPopular",
    ctaType: "trial",
  },
  {
    id: "business",
    prices: {
      en: { monthlyPerSeat: 57, annualPerSeat: 600, currency: "USD", locale: "en-US" },
      ja: { monthlyPerSeat: 7980, annualPerSeat: 84240, currency: "JPY", locale: "ja-JP" },
    },
    minSeats: 15,
    badge: null,
    ctaType: "trial",
  },
  ENTERPRISE_TIER,
];

/** @deprecated Use PM_PRICING_TIERS or ENG_PRICING_TIERS instead */
export const PRICING_TIERS: PricingTier[] = PM_PRICING_TIERS;

export function getPricingTiers(role: Role): PricingTier[] {
  return role === "pm" ? PM_PRICING_TIERS : ENG_PRICING_TIERS;
}

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
      { i18nKey: "adminsPerWorkspace", starter: "admins0", team: "admins3", business: "admins5", enterprise: "adminsUnlimited" },
    ],
  },
  {
    i18nKey: "integrationsData",
    features: [
      { i18nKey: "integrations", starter: "integrations3", team: "integrations7", business: "integrations15", enterprise: "integrationsUnlimited" },
      { i18nKey: "managementToolIntegrations", starter: false, team: true, business: true, enterprise: true },
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
      { i18nKey: "rbac", starter: false, team: "rbacBasic", business: "rbacBasic", enterprise: "rbacCustom" },
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
