"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Lottie from "lottie-react";
import blobAnimationData from "@/public/logos/neuron-blob.json";

type FooterLink = {
  key: string;
  href: string | { ja: string; en: string };
  external?: boolean;
};

const FOOTER_STRUCTURE: { titleKey: string; links: FooterLink[] }[] = [
  {
    titleKey: "col1Title",
    links: [
      { key: "col1Link1", href: "/#features" },
      { key: "col1Link2", href: "/why-neuron" },
      { key: "col1Link3", href: "/integrations" },
      { key: "col1Link4", href: "/pricing" },
      { key: "col1Link5", href: "/blog" },
      { key: "col1Link6", href: "/get-demo" },
    ],
  },
  {
    titleKey: "col2Title",
    links: [
      { key: "col2Link1", href: "https://www.the-unchain.com/", external: true },
      { key: "col2Link2", href: "https://www.the-unchain.com/news", external: true },
      { key: "col2Link3", href: "https://www.the-unchain.com/career", external: true },
      { key: "col2Link4", href: "https://www.the-unchain.com/contact", external: true },
    ],
  },
  {
    titleKey: "col4Title",
    links: [
      {
        key: "col4Link1",
        external: true,
        href: {
          ja: "https://www.the-unchain.com/privacy-policy",
          en: "https://www.the-unchain.com/en/privacy-policy",
        },
      },
      { key: "col4Link2", href: "/terms" },
      { key: "col4Link3", href: "/commercial-disclosure" },
    ],
  },
];

function resolveHref(href: string | { ja: string; en: string }, locale: string): string {
  if (typeof href === "string") return href;
  return locale === "en" ? href.en : href.ja;
}

export default function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();

  return (
    <footer className="bg-[#0D0F14] text-white border-t border-[#1E2535]/40 pt-16 pb-8">
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Logo column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Lottie
                animationData={blobAnimationData}
                loop
                autoplay
                className="h-8 w-8"
              />
              <span className="text-xl font-bold tracking-tight">NEURON</span>
            </Link>
            <p className="text-sm text-slate-400 max-w-xs">
              {t("tagline")}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4 mt-6">
              <a href="https://x.com/theunchainai" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="X">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href={locale === "en" ? "https://www.linkedin.com/company/unchain-us" : "https://www.linkedin.com/company/unchain-inc"} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="https://medium.com/@unchain_the_world" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="Medium">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_STRUCTURE.map((column) => (
            <div key={column.titleKey}>
              <h4 className="text-sm font-semibold mb-4 text-white">
                {t(column.titleKey)}
              </h4>
              <ul className="space-y-2.5">
                {column.links.map((link) => {
                  const resolved = resolveHref(link.href, locale);
                  return (
                    <li key={link.key}>
                      {link.external ? (
                        <a
                          href={resolved}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-slate-400 hover:text-white transition-colors"
                        >
                          {t(link.key)}
                        </a>
                      ) : resolved === "#" ? (
                        <a
                          href="#"
                          className="text-sm text-slate-400 hover:text-white transition-colors"
                        >
                          {t(link.key)}
                        </a>
                      ) : (
                        <Link
                          href={resolved}
                          className="text-sm text-slate-400 hover:text-white transition-colors"
                        >
                          {t(link.key)}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-[#1E2535]/40 pt-8">
          <p className="text-sm text-slate-400 text-center">
            {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
