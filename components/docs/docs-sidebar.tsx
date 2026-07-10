"use client";

import { useState } from "react";
import { ChevronRight, Plug, Rocket, type LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export interface SidebarSubtopic {
  slug: string;
  title: string;
}

export interface SidebarTopic {
  slug: string;
  title: string;
  subtopics: SidebarSubtopic[];
}

export interface DocsSidebarProps {
  topics: SidebarTopic[];
  activeSlug?: string;
  activeSubSlug?: string;
  className?: string;
  ariaLabel?: string;
  // Fired whenever a link is followed — lets the mobile dropdown close itself.
  onNavigate?: () => void;
}

// Icon per top-level topic slug. Mirrors the icons used in the navbar's Docs
// dropdown so the two navigations stay visually consistent.
const TOPIC_ICONS: Record<string, LucideIcon> = {
  "quick-start": Rocket,
  integrations: Plug,
};

export default function DocsSidebar({
  topics,
  activeSlug,
  activeSubSlug,
  className,
  ariaLabel = "Documentation navigation",
  onNavigate,
}: DocsSidebarProps) {
  return (
    <nav aria-label={ariaLabel} className={cn("w-full text-sm", className)}>
      <ul className="space-y-1">
        {topics.map((topic) => (
          <SidebarTopicNode
            key={topic.slug}
            topic={topic}
            isActive={topic.slug === activeSlug}
            activeSubSlug={activeSubSlug}
            onNavigate={onNavigate}
          />
        ))}
      </ul>
    </nav>
  );
}

function SidebarTopicNode({
  topic,
  isActive,
  activeSubSlug,
  onNavigate,
}: {
  topic: SidebarTopic;
  isActive: boolean;
  activeSubSlug?: string;
  onNavigate?: () => void;
}) {
  // Default the active parent open so the visitor can see the rest of the
  // section they're in without an extra click.
  const [open, setOpen] = useState(isActive);
  const hasSubtopics = topic.subtopics.length > 0;
  const Icon = TOPIC_ICONS[topic.slug];

  // Without subtopics there's nothing to expand — render the parent as a
  // direct link to its page instead of a toggle.
  if (!hasSubtopics) {
    return (
      <li>
        <Link
          href={`/docs/${topic.slug}`}
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-2.5 rounded-full px-4 py-2.5 font-medium transition-colors",
            isActive
              ? "bg-slate-100 text-slate-900"
              : "text-slate-800 hover:bg-slate-100 hover:text-slate-900",
          )}
        >
          {Icon && <Icon className="h-[18px] w-[18px] shrink-0 text-slate-500" />}
          <span>{topic.title}</span>
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={cn(
          "flex w-full items-center gap-2.5 rounded-full px-4 py-2.5 text-left font-medium transition-colors",
          isActive
            ? "bg-slate-100 text-slate-900"
            : "text-slate-800 hover:bg-slate-100 hover:text-slate-900",
        )}
      >
        {Icon && <Icon className="h-[18px] w-[18px] shrink-0 text-slate-500" />}
        <span className="flex-1">{topic.title}</span>
        <ChevronRight
          className={cn(
            "h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200",
            open && "rotate-90",
          )}
        />
      </button>

      <div
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <ul className="min-h-0 space-y-1 pt-1">
          {topic.subtopics.map((sub) => {
            const subActive = sub.slug === activeSubSlug;
            return (
              <li key={sub.slug}>
                <Link
                  href={`/docs/${topic.slug}/${sub.slug}`}
                  onClick={onNavigate}
                  className={cn(
                    "block rounded-full px-4 py-2.5 transition-colors",
                    subActive
                      ? "bg-slate-100 font-medium text-slate-900"
                      : "font-normal text-slate-500 hover:bg-slate-100 hover:text-slate-900",
                  )}
                >
                  {sub.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}
