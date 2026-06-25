"use client";

import { useState, useEffect } from "react";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

/* Match the hero headline's typeface across the nav. */
const HEADLINE_FONT = {
  fontFamily: '"Inter Display", var(--font-inter), sans-serif',
  fontWeight: 500,
  letterSpacing: "-0.02em",
} as const;

const SOLUTIONS_LINKS = [
  { key: "product", href: "/product" },
  { key: "cognitionLayer", href: "/cognition-layer" },
  { key: "whyNeuron", href: "/why-neuron" },
  { key: "caseStudies", href: "/case-studies" },
] as const;

const NAV_LINK_KEYS = [
  { key: "integrations", href: "/integrations" },
  { key: "pricing", href: "/pricing" },
  { key: "company", href: "/company" },
] as const;

export default function Navbar() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  function switchLocale() {
    const next = locale === "ja" ? "en" : "ja";
    router.replace(pathname, { locale: next });
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled ? "glass-nav shadow-lg shadow-black/10" : "bg-transparent"
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
            {/* Solutions — dropdown */}
            <motion.div
              className="relative group/solutions"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Link
                href="/solutions"
                className="flex items-center gap-1 text-sm text-text-secondary hover:text-slate-900 transition-colors"
              >
                {t("solutions")}
                <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover/solutions:rotate-180" />
              </Link>
              <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover/solutions:visible group-hover/solutions:opacity-100">
                <div className="min-w-[220px] rounded-2xl border border-border/60 bg-white p-2 shadow-xl shadow-slate-900/10">
                  {SOLUTIONS_LINKS.map((link) => (
                    <Link
                      key={link.key}
                      href={link.href}
                      className="block rounded-xl px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-slate-50 hover:text-slate-900"
                    >
                      {t(link.key)}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>

            {NAV_LINK_KEYS.map((link, i) => (
              <MotionLink
                key={link.key}
                href={link.href}
                className="text-sm text-text-secondary hover:text-slate-900 transition-colors relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
              >
                {t(link.key)}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300" />
              </MotionLink>
            ))}
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
            <MotionLink
              href="/get-demo"
              className="text-sm border border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50 text-slate-900 px-5 py-2 rounded-full transition-colors"
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
              <div className="px-4 pb-6 pt-4 space-y-4" style={HEADLINE_FONT}>
                {/* Solutions + its sublinks */}
                <div>
                  <Link
                    href="/solutions"
                    className="block text-text-secondary hover:text-slate-900 transition-colors py-2"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t("solutions")}
                  </Link>
                  <div className="ml-3 mt-1 space-y-1 border-l border-border/40 pl-3">
                    {SOLUTIONS_LINKS.map((link) => (
                      <Link
                        key={link.key}
                        href={link.href}
                        className="block py-1.5 text-sm text-text-muted hover:text-slate-900 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {t(link.key)}
                      </Link>
                    ))}
                  </div>
                </div>

                {NAV_LINK_KEYS.map((link, i) => (
                  <MotionLink
                    key={link.key}
                    href={link.href}
                    className="block text-text-secondary hover:text-slate-900 transition-colors py-2"
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {t(link.key)}
                  </MotionLink>
                ))}

                <div className="pt-4 border-t border-border/40 space-y-3">
                  <button
                    onClick={() => {
                      switchLocale();
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-2 text-text-secondary hover:text-slate-900 transition-colors py-2 w-full"
                  >
                    <Globe className="h-4 w-4" />
                    <span>{locale === "ja" ? "English" : "日本語"}</span>
                  </button>
                  <Link
                    href="/get-demo"
                    className="block text-center border border-slate-300 bg-white hover:bg-slate-50 text-slate-900 px-4 py-2.5 rounded-full transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t("bookDemo")}
                  </Link>
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
