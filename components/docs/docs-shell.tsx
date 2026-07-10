"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import DocsSidebar, { type SidebarTopic } from "./docs-sidebar";
import TableOfContents, { type TocItem } from "./table-of-contents";

export interface DocsShellProps {
  topics: SidebarTopic[];
  activeSlug: string;
  activeSubSlug?: string;
  // Heading above the sidebar / label on the mobile dropdown ("Documentation").
  navHeading: string;
  navAriaLabel: string;
  tocItems: TocItem[];
  tocLabel: string;
  // Optional "Next: <title>" link shown at the foot of the article.
  next?: { href: string; label: string; title: string };
  children: ReactNode;
}

export default function DocsShell({
  topics,
  activeSlug,
  activeSubSlug,
  navHeading,
  navAriaLabel,
  tocItems,
  tocLabel,
  next,
  children,
}: DocsShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="relative pt-20 md:pt-24 pb-16 scroll-smooth">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mobile: collapsible "Documentation" navigation dropdown. Replaces the
            desktop left sidebar below the lg breakpoint. */}
        <div className="lg:hidden mb-8">
          <button
            type="button"
            onClick={() => setMobileNavOpen((o) => !o)}
            aria-expanded={mobileNavOpen}
            className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm"
          >
            <span>{navHeading}</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-text-muted transition-transform duration-200",
                mobileNavOpen && "rotate-180",
              )}
            />
          </button>

          {mobileNavOpen && (
            <div className="no-scrollbar mt-2 max-h-[60vh] overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
              <DocsSidebar
                topics={topics}
                activeSlug={activeSlug}
                activeSubSlug={activeSubSlug}
                ariaLabel={navAriaLabel}
                onNavigate={() => setMobileNavOpen(false)}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[200px_minmax(0,1fr)] xl:grid-cols-[200px_minmax(0,1fr)_200px] gap-8 xl:gap-10">
          {/* Left: sidebar (desktop) */}
          <aside className="hidden lg:block">
            <div className="no-scrollbar sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
              <p className="mb-3 px-4 text-sm font-normal text-text-muted">
                {navHeading}
              </p>
              <DocsSidebar
                topics={topics}
                activeSlug={activeSlug}
                activeSubSlug={activeSubSlug}
                ariaLabel={navAriaLabel}
              />
            </div>
          </aside>

          {/* Middle: content */}
          <article className="min-w-0 max-w-3xl">
            {children}

            {next && (
              <div className="mt-16 flex justify-end border-t border-slate-200/70 pt-6">
                <Link
                  href={next.href}
                  className="group inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-slate-900"
                >
                  <span>
                    {next.label}:{" "}
                    <span className="font-medium text-slate-900 group-hover:text-primary">
                      {next.title}
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            )}
          </article>

          {/* Right: table of contents (wide screens only) */}
          <aside className="hidden xl:block">
            <div className="no-scrollbar sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
              <TableOfContents items={tocItems} label={tocLabel} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
