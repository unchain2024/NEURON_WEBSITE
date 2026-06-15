import {
  Cpu,
  Factory,
  Car,
  Plane,
  Landmark,
  CreditCard,
  Umbrella,
  AppWindow,
  HeartPulse,
  FlaskConical,
  ShoppingCart,
  Clapperboard,
  Gamepad2,
  Truck,
  Zap,
  Antenna,
  Briefcase,
  Scale,
  Building2,
  GraduationCap,
  HardHat,
  Megaphone,
  TrendingUp,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";

export type Sector =
  | "Technology"
  | "Industrial"
  | "Finance"
  | "Health & Science"
  | "Commerce & Media"
  | "Services"
  | "Public & Social";

export const SECTORS: Sector[] = [
  "Technology",
  "Industrial",
  "Finance",
  "Health & Science",
  "Commerce & Media",
  "Services",
  "Public & Social",
];

export interface CaseStudyMeta {
  /** URL slug */
  slug: string;
  /** key into the `CaseStudies` translation namespace */
  i18nKey: string;
  sector: Sector;
  icon: LucideIcon;
  /** key into COLOR_MAP in the hub/article components */
  color: string;
}

export const CASE_STUDIES: CaseStudyMeta[] = [
  { slug: "information-technology", i18nKey: "informationTechnology", sector: "Technology", icon: Cpu, color: "emerald" },
  { slug: "manufacturing", i18nKey: "manufacturing", sector: "Industrial", icon: Factory, color: "amber" },
  { slug: "automotive", i18nKey: "automotive", sector: "Industrial", icon: Car, color: "blue" },
  { slug: "aerospace-defense", i18nKey: "aerospaceDefense", sector: "Industrial", icon: Plane, color: "cyan" },
  { slug: "financial-services", i18nKey: "financialServices", sector: "Finance", icon: Landmark, color: "teal" },
  { slug: "fintech", i18nKey: "fintech", sector: "Finance", icon: CreditCard, color: "emerald" },
  { slug: "insurance", i18nKey: "insurance", sector: "Finance", icon: Umbrella, color: "violet" },
  { slug: "saas-product", i18nKey: "saasProduct", sector: "Technology", icon: AppWindow, color: "blue" },
  { slug: "healthcare", i18nKey: "healthcare", sector: "Health & Science", icon: HeartPulse, color: "rose" },
  { slug: "pharma-life-sciences", i18nKey: "pharmaLifeSciences", sector: "Health & Science", icon: FlaskConical, color: "violet" },
  { slug: "ecommerce-retail", i18nKey: "ecommerceRetail", sector: "Commerce & Media", icon: ShoppingCart, color: "amber" },
  { slug: "media-entertainment", i18nKey: "mediaEntertainment", sector: "Commerce & Media", icon: Clapperboard, color: "rose" },
  { slug: "gaming", i18nKey: "gaming", sector: "Commerce & Media", icon: Gamepad2, color: "violet" },
  { slug: "logistics-supply-chain", i18nKey: "logisticsSupplyChain", sector: "Industrial", icon: Truck, color: "teal" },
  { slug: "energy-utilities", i18nKey: "energyUtilities", sector: "Industrial", icon: Zap, color: "amber" },
  { slug: "telecommunications", i18nKey: "telecommunications", sector: "Technology", icon: Antenna, color: "cyan" },
  { slug: "professional-services", i18nKey: "professionalServices", sector: "Services", icon: Briefcase, color: "blue" },
  { slug: "legal", i18nKey: "legal", sector: "Services", icon: Scale, color: "teal" },
  { slug: "government-public-sector", i18nKey: "governmentPublicSector", sector: "Public & Social", icon: Building2, color: "cyan" },
  { slug: "education-academia", i18nKey: "educationAcademia", sector: "Public & Social", icon: GraduationCap, color: "emerald" },
  { slug: "construction-real-estate", i18nKey: "constructionRealEstate", sector: "Industrial", icon: HardHat, color: "amber" },
  { slug: "marketing-advertising", i18nKey: "marketingAdvertising", sector: "Commerce & Media", icon: Megaphone, color: "rose" },
  { slug: "venture-capital-private-equity", i18nKey: "ventureCapitalPrivateEquity", sector: "Finance", icon: TrendingUp, color: "emerald" },
  { slug: "nonprofit-ngo", i18nKey: "nonprofitNgo", sector: "Public & Social", icon: HeartHandshake, color: "violet" },
];

export const CASE_STUDY_SLUGS = CASE_STUDIES.map((c) => c.slug);

export function getCaseStudy(slug: string): CaseStudyMeta | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
