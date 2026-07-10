"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, Globe, ChevronDown, Play, Rocket, Plug } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  TechIcon,
  IndustrialIcon,
  FinanceIcon,
  RegulatedIcon,
  OperationsIcon,
  CommerceIcon,
  ServicesIcon,
} from "@/components/solutions-icons";
import { INTEGRATION_SLUGS } from "@/lib/docs-config";

const MotionLink = motion.create(Link);
const MotionA = motion.a;

/* Match the hero headline's typeface across the nav. */
const HEADLINE_FONT = {
  fontFamily: '"Inter Display", var(--font-inter), sans-serif',
  fontWeight: 500,
  letterSpacing: "-0.02em",
} as const;

/**
 * Solutions mega-menu — mirrors `public/Solutions.svg`. Labels come from the
 * `SolutionsMenu` namespace, icons are extracted verbatim from the SVG, and each
 * industry links to its solution page (`/solutions/<slug>`, see
 * `lib/case-studies-data.ts`).
 */
const SOLUTION_CATEGORIES = [
  {
    key: "tech",
    Icon: TechIcon,
    items: [
      { key: "it", slug: "information-technology" },
      { key: "saas", slug: "saas-product" },
      { key: "gaming", slug: "gaming" },
    ],
  },
  {
    key: "industrial",
    Icon: IndustrialIcon,
    items: [
      { key: "manufacturing", slug: "manufacturing" },
      { key: "automotive", slug: "automotive" },
      { key: "aerospace", slug: "aerospace-defense" },
      { key: "energy", slug: "energy-utilities" },
      { key: "construction", slug: "construction-real-estate" },
    ],
  },
  {
    key: "finance",
    Icon: FinanceIcon,
    items: [
      { key: "financialServices", slug: "financial-services" },
      { key: "fintech", slug: "fintech" },
      { key: "insurance", slug: "insurance" },
      { key: "vc", slug: "venture-capital-private-equity" },
    ],
  },
  {
    key: "regulated",
    Icon: RegulatedIcon,
    items: [
      { key: "healthcare", slug: "healthcare" },
      { key: "pharma", slug: "pharma-life-sciences" },
      { key: "government", slug: "government-public-sector" },
      { key: "education", slug: "education-academia" },
    ],
  },
  {
    key: "operations",
    Icon: OperationsIcon,
    items: [
      { key: "logistics", slug: "logistics-supply-chain" },
      { key: "telecom", slug: "telecommunications" },
    ],
  },
  {
    key: "commerce",
    Icon: CommerceIcon,
    items: [
      { key: "ecommerce", slug: "ecommerce-retail" },
      { key: "mediaEnt", slug: "media-entertainment" },
      { key: "marketing", slug: "marketing-advertising" },
    ],
  },
  {
    key: "services",
    Icon: ServicesIcon,
    items: [
      { key: "consulting", slug: "professional-services" },
      { key: "legal", slug: "legal" },
      { key: "nonprofit", slug: "nonprofit-ngo" },
    ],
  },
] as const;

const COMPANY_URLS = {
  ja: "https://www.the-unchain.com",
  en: "https://www.the-unchain.com/en",
} as const;

type NavLink = {
  key: string;
  href: string;
  external?: boolean;
};

const NAV_LINK_KEYS: readonly NavLink[] = [
  { key: "integrations", href: "/integrations" },
  { key: "pricing", href: "/pricing" },
  { key: "company", href: "", external: true },
];

/**
 * Docs dropdown — labels come from the `Nav` namespace. Placeholder routes for
 * now; point these at the real docs destinations when they exist.
 */
const DOCS_ITEMS: readonly {
  key: string;
  href: string;
  Icon: typeof Rocket;
}[] = [
  { key: "quickstart", href: "/docs/quick-start", Icon: Rocket },
  { key: "integrations", href: `/docs/integrations/${INTEGRATION_SLUGS[0]}`, Icon: Plug },
];

export default function Navbar() {
  const t = useTranslations("Nav");
  const tm = useTranslations("SolutionsMenu");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);

  // Solutions mega-menu: hover opens it; clicking the trigger "locks" it open
  // (survives mouse-leave); clicking a link or outside closes it.
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [solutionsLocked, setSolutionsLocked] = useState(false);
  const [mobileDocsOpen, setMobileDocsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Docs dropdown — hover opens a small anchored menu; leaving closes it after
  // a short grace period so the pointer can travel into the panel.
  const [docsOpen, setDocsOpen] = useState(false);
  const docsCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openDocs = () => {
    if (docsCloseTimer.current) clearTimeout(docsCloseTimer.current);
    setDocsOpen(true);
  };
  const scheduleCloseDocs = () => {
    if (docsCloseTimer.current) clearTimeout(docsCloseTimer.current);
    docsCloseTimer.current = setTimeout(() => setDocsOpen(false), 120);
  };

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const openSolutions = () => {
    clearCloseTimer();
    setSolutionsOpen(true);
  };
  const scheduleCloseSolutions = () => {
    if (solutionsLocked) return;
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setSolutionsOpen(false), 120);
  };
  const closeSolutions = () => {
    clearCloseTimer();
    setSolutionsOpen(false);
    setSolutionsLocked(false);
  };
  const toggleSolutionsLock = () => {
    clearCloseTimer();
    setSolutionsLocked((prev) => {
      const next = !prev;
      setSolutionsOpen(next);
      return next;
    });
  };

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // When locked open, close on outside click or Escape.
  useEffect(() => {
    if (!solutionsLocked) return;
    const onPointerDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setSolutionsOpen(false);
        setSolutionsLocked(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSolutionsOpen(false);
        setSolutionsLocked(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [solutionsLocked]);

  // Close the menu whenever navigation lands on a new path.
  useEffect(() => {
    clearCloseTimer();
    setSolutionsOpen(false);
    setSolutionsLocked(false);
    setDocsOpen(false);
  }, [pathname]);

  function switchLocale() {
    const next = locale === "ja" ? "en" : "ja";
    router.replace(pathname, { locale: next });
  }

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled || solutionsOpen ? "glass-nav shadow-lg shadow-black/10" : "bg-transparent"
        )}
      >
        <div className="section-container flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/neuron-logo-dark.svg" alt="Neuron" className="h-6 w-6" />
            </motion.div>
            <span className="text-xl text-slate-900" style={HEADLINE_FONT}>Neuron</span>
          </Link>

          {/* Desktop Nav — centered */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-8" style={HEADLINE_FONT}>
            {/* How Neuron Works — redirects to the AI-Driven Ontology page */}
            <MotionLink
              href="/ai-driven-ontology"
              className="text-sm text-text-secondary hover:text-slate-900 transition-colors"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
            >
              {t("howNeuronWorks")}
            </MotionLink>

            {/* Solutions — full-width mega-menu trigger */}
            <motion.button
              type="button"
              onClick={toggleSolutionsLock}
              onMouseEnter={openSolutions}
              onMouseLeave={scheduleCloseSolutions}
              aria-expanded={solutionsOpen}
              className="flex items-center gap-1 text-sm text-text-secondary hover:text-slate-900 transition-colors"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {t("solutions")}
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-300",
                  solutionsOpen && "rotate-180"
                )}
              />
            </motion.button>

            {NAV_LINK_KEYS.map((link, i) => {
              const sharedProps = {
                className:
                  "text-sm text-text-secondary hover:text-slate-900 transition-colors",
                initial: { opacity: 0, y: -10 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.15 + i * 0.05 },
              };
              const content = <>{t(link.key)}</>;
              return link.external ? (
                <MotionA
                  key={link.key}
                  href={COMPANY_URLS[locale === "en" ? "en" : "ja"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...sharedProps}
                >
                  {content}
                </MotionA>
              ) : (
                <MotionLink key={link.key} href={link.href} {...sharedProps}>
                  {content}
                </MotionLink>
              );
            })}

            {/* Docs — small anchored dropdown (Quickstart / Integrations) */}
            <div
              className="relative"
              onMouseEnter={openDocs}
              onMouseLeave={scheduleCloseDocs}
            >
              <motion.button
                type="button"
                onClick={() => setDocsOpen((v) => !v)}
                aria-expanded={docsOpen}
                className="flex items-center gap-1 text-sm text-text-secondary hover:text-slate-900 transition-colors"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {t("docs")}
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-300",
                    docsOpen && "rotate-180"
                  )}
                />
              </motion.button>
              <AnimatePresence>
                {docsOpen && (
                  <motion.div
                    key="docs-panel"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                    className="absolute left-1/2 top-full mt-3 w-56 -translate-x-1/2 rounded-xl border border-border/60 bg-white p-2 shadow-xl shadow-slate-900/10"
                  >
                    {DOCS_ITEMS.map((item) => (
                      <Link
                        key={item.key}
                        href={item.href}
                        onClick={() => setDocsOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#535862] transition-colors hover:bg-slate-50 hover:text-[#0A0D12]"
                      >
                        <item.Icon className="h-[18px] w-[18px] text-slate-500" />
                        {t(item.key)}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button
              onClick={switchLocale}
              className="flex items-center justify-center h-9 w-9 text-text-secondary hover:text-slate-900 transition-colors rounded-full hover:bg-slate-100"
              aria-label="Switch language"
              title={locale === "ja" ? "English" : "日本語"}
            >
              <Globe className="h-4 w-4" />
            </button>
            {/* Login — placeholder for now; wire up to the auth destination later. */}
            <button
              type="button"
              className="text-sm text-text-secondary hover:text-slate-900 transition-colors px-3 py-2"
              style={HEADLINE_FONT}
            >
              {t("logIn")}
            </button>
            <MotionLink
              href="/get-demo"
              className="text-sm bg-[#0A0D12] hover:bg-[#0A0D12]/90 text-white px-5 py-2 rounded-full transition-colors"
              style={HEADLINE_FONT}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {t("bookDemo")}
            </MotionLink>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-slate-900 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Solutions mega-menu — full-width panel below the nav */}
        <AnimatePresence>
          {solutionsOpen && (
            <motion.div
              key="solutions-panel"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onMouseEnter={openSolutions}
              onMouseLeave={scheduleCloseSolutions}
              className="absolute inset-x-0 top-full hidden border-b border-border/60 bg-white shadow-xl shadow-slate-900/10 md:block"
            >
              <div className="section-container py-10" style={HEADLINE_FONT}>
                {/* Top row — 4 categories */}
                <div className="grid grid-cols-4 gap-x-8 gap-y-2">
                  {SOLUTION_CATEGORIES.slice(0, 4).map((cat) => (
                    <SolutionCategory key={cat.key} cat={cat} tm={tm} onNavigate={closeSolutions} />
                  ))}
                </div>
                <div className="my-7 h-px bg-border/70" />
                {/* Bottom row — 3 categories */}
                <div className="grid grid-cols-4 gap-x-8 gap-y-2">
                  {SOLUTION_CATEGORIES.slice(4).map((cat) => (
                    <SolutionCategory key={cat.key} cat={cat} tm={tm} onNavigate={closeSolutions} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden glass-nav border-t border-border/40 overflow-hidden"
            >
              <div
                className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain px-5 pb-6 pt-1"
                style={HEADLINE_FONT}
              >
                {/* How Neuron Works */}
                <Link
                  href="/ai-driven-ontology"
                  className="block border-b border-border/40 py-4 text-[15px] text-slate-900 transition-colors hover:text-slate-600"
                  onClick={() => setMobileOpen(false)}
                >
                  {t("howNeuronWorks")}
                </Link>

                {/* Solutions — collapsible dropdown */}
                <div className="border-b border-border/40">
                  <button
                    type="button"
                    onClick={() => setMobileSolutionsOpen((v) => !v)}
                    aria-expanded={mobileSolutionsOpen}
                    className="flex w-full items-center justify-between py-4 text-left text-[15px] text-slate-900 transition-colors hover:text-slate-600"
                  >
                    {t("solutions")}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-slate-500 transition-transform duration-300",
                        mobileSolutionsOpen && "rotate-180"
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileSolutionsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-3 pb-4 pl-1">
                          {SOLUTION_CATEGORIES.map((cat) => (
                            <div key={cat.key}>
                              <div className="flex items-center gap-2 py-1 text-sm font-medium text-slate-900">
                                <cat.Icon className="h-4 w-4 text-slate-700" />
                                {tm(cat.key)}
                              </div>
                              <div className="ml-6 space-y-0.5">
                                {cat.items.map((item) => (
                                  <Link
                                    key={item.key}
                                    href={`/solutions/${item.slug}`}
                                    className="block py-1 text-sm text-text-muted transition-colors hover:text-slate-900"
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    {tm(`items.${item.key}`)}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Integrations / Pricing / Company */}
                {NAV_LINK_KEYS.map((link) =>
                  link.external ? (
                    <a
                      key={link.key}
                      href={COMPANY_URLS[locale === "en" ? "en" : "ja"]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block border-b border-border/40 py-4 text-[15px] text-slate-900 transition-colors hover:text-slate-600"
                    >
                      {t(link.key)}
                    </a>
                  ) : (
                    <Link
                      key={link.key}
                      href={link.href}
                      className="block border-b border-border/40 py-4 text-[15px] text-slate-900 transition-colors hover:text-slate-600"
                      onClick={() => setMobileOpen(false)}
                    >
                      {t(link.key)}
                    </Link>
                  )
                )}

                {/* Docs — collapsible dropdown */}
                <div className="border-b border-border/40">
                  <button
                    type="button"
                    onClick={() => setMobileDocsOpen((v) => !v)}
                    aria-expanded={mobileDocsOpen}
                    className="flex w-full items-center justify-between py-4 text-left text-[15px] text-slate-900 transition-colors hover:text-slate-600"
                  >
                    {t("docs")}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-slate-500 transition-transform duration-300",
                        mobileDocsOpen && "rotate-180"
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileDocsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-0.5 pb-4 pl-1">
                          {DOCS_ITEMS.map((item) => (
                            <Link
                              key={item.key}
                              href={item.href}
                              className="flex items-center gap-2.5 py-1.5 text-sm text-text-muted transition-colors hover:text-slate-900"
                              onClick={() => setMobileOpen(false)}
                            >
                              <item.Icon className="h-4 w-4 text-slate-500" />
                              {t(item.key)}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom CTAs */}
                <div className="mt-8 space-y-3">
                  {/* Login — placeholder for now; wire up to the auth destination later. */}
                  <button
                    type="button"
                    className="flex w-full items-center justify-center rounded-full border border-[#E9EAEB] bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t("logIn")}
                  </button>
                  <Link
                    href="/get-demo"
                    className="flex w-full items-center justify-center rounded-full bg-[#0A0D12] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0A0D12]/90"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t("bookDemo")}
                  </Link>
                  <Link
                    href="/ai-driven-ontology"
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-[#E9EAEB] bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Play className="h-3.5 w-3.5" fill="currentColor" />
                    {t("howNeuronWorks")}
                  </Link>
                  <button
                    onClick={() => {
                      switchLocale();
                      setMobileOpen(false);
                    }}
                    className="mt-1 flex w-full items-center justify-center gap-2 py-2 text-sm text-text-secondary transition-colors hover:text-slate-900"
                  >
                    <Globe className="h-4 w-4" />
                    <span>{locale === "ja" ? "English" : "日本語"}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      {/* Spacer */}
      <div className="h-16 md:h-18" />
    </>
  );
}

function SolutionCategory({
  cat,
  tm,
  onNavigate,
}: {
  cat: (typeof SOLUTION_CATEGORIES)[number];
  tm: (key: string) => string;
  onNavigate?: () => void;
}) {
  const { Icon } = cat;
  return (
    <div>
      <div className="mb-3 flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-b from-[#F7F7F8] to-[#E4E6E7] text-[#0A0D12]">
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <span className="text-sm font-semibold text-[#0A0D12]">{tm(cat.key)}</span>
      </div>
      <ul className="space-y-1.5">
        {cat.items.map((item) => (
          <li key={item.key}>
            <Link
              href={`/solutions/${item.slug}`}
              onClick={onNavigate}
              className="block text-sm text-[#535862] transition-colors hover:text-[#0A0D12]"
            >
              {tm(`items.${item.key}`)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
