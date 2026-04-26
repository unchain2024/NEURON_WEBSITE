"use client";

import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export interface DocCardProps {
  title: string;
  description: string;
  href: string;
  className?: string;
}

export default function DocCard({ title, description, href, className }: DocCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border border-slate-200/70 bg-white p-6",
        "shadow-sm transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <span
          aria-hidden
          className="shrink-0 rounded-full bg-slate-100 p-1.5 text-text-muted transition-all duration-300 group-hover:bg-primary/10 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
        {description}
      </p>

      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Read more
        <ArrowUpRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}
