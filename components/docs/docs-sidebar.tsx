"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
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
}

export default function DocsSidebar({
  topics,
  activeSlug,
  activeSubSlug,
  className,
  ariaLabel = "Documentation navigation",
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
}: {
  topic: SidebarTopic;
  isActive: boolean;
  activeSubSlug?: string;
}) {
  // Default the active parent open so the visitor can see the rest of the
  // section they're in without an extra click.
  const [open, setOpen] = useState(isActive);
  const hasSubtopics = topic.subtopics.length > 0;

  // Without subtopics there's nothing to expand — render the parent as a
  // direct link to its page instead of a toggle.
  if (!hasSubtopics) {
    return (
      <li>
        <Link
          href={`/docs/${topic.slug}`}
          className={cn(
            "block rounded-lg px-3 py-2 font-semibold transition-colors",
            isActive
              ? "bg-primary/5 text-primary"
              : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
          )}
        >
          {topic.title}
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
          "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left font-semibold transition-colors",
          isActive
            ? "text-slate-900"
            : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
        )}
      >
        <span>{topic.title}</span>
        <ChevronRight
          className={cn(
            "h-4 w-4 text-text-muted transition-transform duration-200",
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
        <ul className="min-h-0 ml-3 border-l border-slate-200/80 pl-3">
          {topic.subtopics.map((sub) => {
            const subActive = sub.slug === activeSubSlug;
            return (
              <li key={sub.slug}>
                <Link
                  href={`/docs/${topic.slug}/${sub.slug}`}
                  className={cn(
                    "block rounded-md px-3 py-1.5 text-sm transition-colors",
                    subActive
                      ? "bg-primary/5 font-medium text-primary"
                      : "text-text-secondary hover:bg-slate-100 hover:text-slate-900",
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
