"use client";

import { useState, useEffect } from "react";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import Lottie from "lottie-react";
import blobAnimationData from "@/public/logos/neuron-blob.json";

const MotionLink = motion.create(Link);

const NAV_LINK_KEYS = [
  { key: "product", href: "/product" },
  { key: "caseStudies", href: "/case-studies" },
  { key: "integrations", href: "/integrations" },
  { key: "pricing", href: "/pricing" },
] as const;

const RESOURCES_LINKS = [
  { key: "docs", href: "/docs" },
  { key: "blog", href: "/blog" },
  { key: "company", href: "/company" },
] as const;

export default function Navbar() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

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
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <Lottie
                animationData={blobAnimationData}
                loop
                autoplay
                className="h-8 w-8"
              />
            </motion.div>
            <span className="text-xl font-bold tracking-tight text-slate-900">NEURON</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 ml-auto mr-8">
            {NAV_LINK_KEYS.map((link, i) => (
              <MotionLink
                key={link.key}
                href={link.href}
                className="text-sm text-text-secondary hover:text-slate-900 transition-colors relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                {t(link.key)}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300" />
              </MotionLink>
            ))}

            {/* Resources dropdown */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + NAV_LINK_KEYS.length * 0.05 }}
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <button
                className="flex items-center gap-1 text-sm text-text-secondary hover:text-slate-900 transition-colors"
                aria-haspopup="true"
                aria-expanded={resourcesOpen}
              >
                {t("resources")}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    resourcesOpen && "rotate-180"
                  )}
                />
              </button>
              <AnimatePresence>
                {resourcesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full pt-3"
                  >
                    <div className="glass-nav rounded-xl border border-border/60 shadow-lg shadow-black/5 p-2 min-w-[180px]">
                      {RESOURCES_LINKS.map((link) => (
                        <Link
                          key={link.key}
                          href={link.href}
                          className="block px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        >
                          {t(link.key)}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={switchLocale}
              className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-slate-900 transition-colors px-3 py-2 rounded-lg hover:bg-slate-100"
              aria-label="Switch language"
            >
              <Globe className="h-4 w-4" />
              <span className="font-medium">{locale === "ja" ? "EN" : "JA"}</span>
            </button>
            <a
              href="#"
              className="text-sm text-text-secondary hover:text-slate-900 transition-colors px-3 py-2"
            >
              {t("logIn")}
            </a>
            <MotionLink
              href="/get-demo"
              className="text-sm bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
              <div className="px-4 pb-6 pt-4 space-y-4">
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

                {/* Resources group */}
                <div className="pt-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-1">
                    {t("resources")}
                  </p>
                  {RESOURCES_LINKS.map((link) => (
                    <Link
                      key={link.key}
                      href={link.href}
                      className="block text-text-secondary hover:text-slate-900 transition-colors py-2 pl-3"
                      onClick={() => setMobileOpen(false)}
                    >
                      {t(link.key)}
                    </Link>
                  ))}
                </div>

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
                  <a href="#" className="block text-text-secondary hover:text-slate-900 transition-colors py-2">
                    {t("logIn")}
                  </a>
                  <Link
                    href="/get-demo"
                    className="block text-center bg-primary hover:bg-primary-600 text-white px-4 py-2.5 rounded-lg transition-colors font-medium"
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
