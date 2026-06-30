"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

/* Match the navbar logo wordmark exactly. */
const HEADLINE_FONT = {
  fontFamily: '"Inter Display", var(--font-inter), sans-serif',
  fontWeight: 500,
  letterSpacing: "-0.02em",
} as const;

type FooterLink = {
  key: string;
  href?: string | { ja: string; en: string };
  external?: boolean;
};

/* Matches the "Desktop - Footer" design: Product / Company / Legal.
   Links point at the routes that exist today; where the design names a page we
   don't have yet (Features, Careers, Contact) we send it to the closest one. */
const FOOTER_STRUCTURE: { titleKey: string; links: FooterLink[] }[] = [
  {
    titleKey: "col1Title", // Product
    links: [
      { key: "col1Link1" }, // Features → href TBD
      { key: "col1Link2", href: "/ai-driven-ontology" }, // Why NEURON
      { key: "col1Link3", href: "/integrations" },
      { key: "col1Link4", href: "/pricing" },
    ],
  },
  {
    titleKey: "col2Title", // Company
    links: [
      {
        key: "col2Link1", // About
        external: true,
        href: {
          ja: "https://www.the-unchain.com",
          en: "https://www.the-unchain.com/en",
        },
      },
      { key: "col3Link2", href: "/blog" }, // Blog
      { key: "col2Link3", href: "/company#careers" }, // Careers
      { key: "col2Link4", href: "/get-demo" }, // Contact
    ],
  },
  {
    titleKey: "col4Title", // Legal
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

function resolveHref(
  href: string | { ja: string; en: string },
  locale: string,
): string {
  if (typeof href === "string") return href;
  return locale === "en" ? href.en : href.ja;
}

export default function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();

  return (
    <footer className="border-t border-[#E9EAEB] bg-white">
      <div className="section-container py-14 lg:py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          {/* Logo — matches the navbar */}
          <Link href="/" className="flex h-fit items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/neuron-logo-dark.svg" alt="Neuron" className="h-6 w-6" />
            <span className="text-xl text-slate-900" style={HEADLINE_FONT}>Neuron</span>
          </Link>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:gap-20">
            {FOOTER_STRUCTURE.map((column) => (
              <div key={column.titleKey}>
                <h4 className="mb-4 text-sm font-semibold text-[#717680]">
                  {t(column.titleKey)}
                </h4>
                <ul className="space-y-3">
                  {column.links.map((link) => {
                    const resolved = link.href
                      ? resolveHref(link.href, locale)
                      : null;
                    return (
                      <li key={link.key}>
                        {!resolved ? (
                          <span className="text-sm text-[#414651]">
                            {t(link.key)}
                          </span>
                        ) : link.external ? (
                          <a
                            href={resolved}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[#414651] transition-colors hover:text-[#0A0D12]"
                          >
                            {t(link.key)}
                          </a>
                        ) : (
                          <Link
                            href={resolved}
                            className="text-sm text-[#414651] transition-colors hover:text-[#0A0D12]"
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
        </div>

        {/* Bottom row: copyright + social */}
        <div className="mt-14 flex flex-col gap-4 border-t border-[#E9EAEB] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#717680]">{t("copyright")}</p>

          <div className="flex items-center gap-5">
            <a
              href={locale === "en" ? "https://www.linkedin.com/company/unchain-us" : "https://www.linkedin.com/company/unchain-inc"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#717680] transition-colors hover:text-[#0A0D12]"
              aria-label="LinkedIn"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://x.com/theunchainai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#717680] transition-colors hover:text-[#0A0D12]"
              aria-label="X"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
