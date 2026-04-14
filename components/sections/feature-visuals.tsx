"use client";

import Lottie from "lottie-react";
import blobAnimationData from "@/public/logos/neuron-blob.json";
import {
  LayoutDashboard,
  MessageCircle,
  FolderKanban,
  Radio,
  Puzzle,
  BookOpen,
  HelpCircle,
  Search,
  SlidersHorizontal,
  List,
  LayoutGrid,
  ChevronDown,
  ChevronLeft,
  AlertTriangle,
  ArrowUp,
  MoreHorizontal,
} from "lucide-react";

/* ─── Types ─── */

interface SignalTag {
  label: string;
  variant: "risk" | "decision" | "alert" | "neutral";
}

interface Signal {
  tags: SignalTag[];
  title: string;
  desc: string;
  project: string;
  author: string;
  authorInitials: string;
  date: string;
  score: number;
  scoreColor: string;
  status?: "rising" | "contested";
}

interface Section {
  label: string;
  count: number;
  signals: Signal[];
}

interface NavLabels {
  dashboard: string;
  chat: string;
  projects: string;
  signals: string;
  integrations: string;
  knowledge: string;
  guide: string;
}

interface UserInfo {
  name: string;
  initials: string;
  team: string;
}

interface BreakdownCol {
  label: string;
  value?: string;
  valueColor?: string;
  desc: string;
}

interface LinkedItem {
  tags: SignalTag[];
  title: string;
  desc: string;
}

/* ─── Tag styles ─── */

const TAG_STYLES: Record<string, string> = {
  risk: "bg-amber-50 text-amber-700 border-amber-200",
  decision: "bg-emerald-50 text-emerald-700 border-emerald-200",
  alert: "bg-red-50 text-red-700 border-red-200",
  neutral: "bg-slate-50 text-slate-500 border-slate-200",
};

const SEVERITY_STYLES: Record<string, string> = {
  critical: "bg-red-500 text-white",
  high: "bg-amber-500 text-white",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-slate-100 text-slate-600",
};

/* ─── Shared sidebar ─── */

function Sidebar({ nav, user }: { nav: NavLabels; user: UserInfo; activeNav?: string }) {
  const navItems = [
    { icon: LayoutDashboard, label: nav.dashboard, key: "dashboard" },
    { icon: MessageCircle, label: nav.chat, key: "chat" },
    { icon: FolderKanban, label: nav.projects, key: "projects" },
    { icon: Radio, label: nav.signals, key: "signals" },
    { icon: Puzzle, label: nav.integrations, key: "integrations" },
  ];
  const bottomItems = [
    { icon: BookOpen, label: nav.knowledge, key: "knowledge" },
    { icon: HelpCircle, label: nav.guide, key: "guide" },
  ];

  return (
    <div className="hidden md:flex flex-col w-40 lg:w-44 border-r border-slate-100 bg-slate-50/50 shrink-0">
      <div className="flex items-center gap-2 px-3 py-3 border-b border-slate-100">
        <Lottie animationData={blobAnimationData} loop autoplay className="h-6 w-6" />
        <span className="text-xs font-bold text-slate-900">NEURON</span>
      </div>
      <nav className="flex-1 px-1.5 py-2 space-y-0.5">
        {navItems.map((item) => (
          <div key={item.key} className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[11px] ${item.key === "signals" ? "bg-emerald-50 text-emerald-700 font-medium" : "text-slate-500"}`}>
            <item.icon className="h-3.5 w-3.5" />
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
      <div className="px-1.5 py-1.5 space-y-0.5 border-t border-slate-100">
        {bottomItems.map((item) => (
          <div key={item.key} className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[11px] text-slate-500">
            <item.icon className="h-3.5 w-3.5" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      <div className="px-2.5 py-2.5 border-t border-slate-100 flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center">
          <span className="text-[8px] font-semibold text-slate-500">{user.initials}</span>
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-medium text-slate-700 truncate">{user.name}</p>
          <p className="text-[8px] text-slate-400 truncate">{user.team}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Signal card (reused in list + linked items) ─── */

function SignalCard({ sig, contested, compact }: { sig: Signal; contested?: string; compact?: boolean }) {
  return (
    <div className="rounded-lg border border-slate-100 p-3 hover:border-slate-200 transition-colors">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1 flex-wrap">
          {sig.tags.map((tag, ti) => (
            <span key={ti} className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-medium border ${TAG_STYLES[tag.variant]}`}>
              {tag.variant === "risk" && <AlertTriangle className="h-2 w-2" />}
              {tag.variant === "decision" && <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
              {tag.variant === "alert" && <AlertTriangle className="h-2 w-2" />}
              {tag.label}
            </span>
          ))}
        </div>
        {!compact && (
          <div className="flex items-center gap-1.5 shrink-0 ml-2">
            <div className="hidden sm:flex items-center gap-1">
              <div className="w-8 h-1 rounded-full bg-slate-100 overflow-hidden">
                <div className={`h-full rounded-full ${sig.scoreColor}`} style={{ width: `${Math.min(sig.score * 100, 100)}%` }} />
              </div>
              <span className="text-[9px] font-semibold text-slate-500 tabular-nums">{sig.score.toFixed(1)}</span>
            </div>
            {sig.status === "rising" && <ArrowUp className="h-3 w-3 text-red-500" />}
            {sig.status === "contested" && <span className="text-[9px] font-medium text-amber-600">{contested}</span>}
            <MoreHorizontal className="h-3 w-3 text-slate-300" />
          </div>
        )}
      </div>
      <h4 className="text-[11px] font-semibold text-slate-800 mb-0.5 leading-snug">{sig.title}</h4>
      <p className="text-[10px] text-slate-500 leading-relaxed line-clamp-2 mb-1.5">{sig.desc}</p>
      <div className="flex items-center gap-2 text-[9px] text-slate-400">
        <span className="inline-flex items-center gap-0.5 px-1 py-0.5 bg-slate-50 rounded border border-slate-100">
          <FolderKanban className="h-2 w-2" />
          {sig.project}
        </span>
        <div className="flex items-center gap-1">
          <div className="h-3.5 w-3.5 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center">
            <span className="text-[7px] font-bold text-white">{sig.authorInitials}</span>
          </div>
          <span>@{sig.author}</span>
        </div>
        <span>{sig.date}</span>
      </div>
    </div>
  );
}

/* ─── List view ─── */

interface NeuronListProps {
  nav: NavLabels;
  search: string;
  user: UserInfo;
  pageTitle: string;
  sections: Section[];
  contested?: string;
}

function NeuronListScreen({ nav, search, user, pageTitle, sections, contested = "Contested" }: NeuronListProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden">
      <div className="flex h-[400px] md:h-[440px]">
        <Sidebar nav={nav} user={user} />
        <div className="flex-1 flex flex-col min-w-0">
          <div className="px-3 md:px-5 py-3 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">{pageTitle}</h3>
              <div className="flex items-center gap-1.5">
                <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-md border border-slate-200 text-slate-400 text-[11px]">
                  <Search className="h-3 w-3" />
                  <span>{search}</span>
                </div>
                <button className="p-1 rounded hover:bg-slate-100 text-slate-400"><SlidersHorizontal className="h-3 w-3" /></button>
                <button className="p-1 rounded hover:bg-slate-100 text-slate-400"><List className="h-3 w-3" /></button>
                <button className="p-1 rounded hover:bg-slate-100 text-slate-400"><LayoutGrid className="h-3 w-3" /></button>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-3 md:px-5 py-3 space-y-4">
            {sections.map((section, si) => (
              <div key={si}>
                <div className="flex items-center gap-1.5 mb-2">
                  <ChevronDown className="h-3 w-3 text-slate-400" />
                  <span className="text-[11px] font-semibold text-slate-600">{section.label}</span>
                  <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{section.count}</span>
                </div>
                <div className="space-y-2">
                  {section.signals.map((sig, i) => (
                    <SignalCard key={i} sig={sig} contested={contested} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Detail view ─── */

interface NeuronDetailProps {
  nav: NavLabels;
  user: UserInfo;
  back: string;
  openItem: string;
  statusLabel: string;
  severity: string;
  severityLevel: "critical" | "high" | "medium" | "low";
  tags: SignalTag[];
  title: string;
  desc: string;
  project: string;
  author: string;
  authorInitials: string;
  date: string;
  breakdown: BreakdownCol[];
  linkedLabel: string;
  linkedItems: LinkedItem[];
}

function NeuronDetailScreen(props: NeuronDetailProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden">
      <div className="flex h-[400px] md:h-[440px]">
        <Sidebar nav={props.nav} user={props.user} />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <div className="px-3 md:px-5 py-2.5 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-700">
                  <ChevronLeft className="h-3 w-3" />
                  <span>{props.back}</span>
                </button>
                <div className="hidden sm:flex items-center gap-1.5">
                  <span className="text-[10px] px-2 py-0.5 rounded border border-slate-200 text-slate-500">{props.openItem}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded border border-slate-200 text-slate-500">{props.statusLabel}</span>
                </div>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${SEVERITY_STYLES[props.severityLevel]}`}>
                {props.severity}
              </span>
            </div>
          </div>

          {/* Detail content */}
          <div className="flex-1 overflow-y-auto px-3 md:px-5 py-3 space-y-4">
            {/* Tags */}
            <div className="flex items-center gap-1 flex-wrap">
              {props.tags.map((tag, ti) => (
                <span key={ti} className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-medium border ${TAG_STYLES[tag.variant]}`}>
                  {tag.variant === "risk" && <AlertTriangle className="h-2 w-2" />}
                  {tag.variant === "decision" && <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
                  {tag.variant === "alert" && <AlertTriangle className="h-2 w-2" />}
                  {tag.label}
                </span>
              ))}
            </div>

            {/* Title + desc */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1.5">{props.title}</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">{props.desc}</p>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-2 text-[9px] text-slate-400">
              <span className="inline-flex items-center gap-0.5 px-1 py-0.5 bg-slate-50 rounded border border-slate-100">
                <FolderKanban className="h-2 w-2" />
                {props.project}
              </span>
              <div className="flex items-center gap-1">
                <div className="h-3.5 w-3.5 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center">
                  <span className="text-[7px] font-bold text-white">{props.authorInitials}</span>
                </div>
                <span>@{props.author}</span>
              </div>
              <span>{props.date}</span>
            </div>

            {/* Score breakdown — 3 columns */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-100">
              {props.breakdown.map((col, i) => (
                <div key={i} className="rounded-lg bg-slate-50 p-2.5">
                  <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide mb-1">{col.label}</p>
                  {col.value && (
                    <p className={`text-lg font-bold mb-0.5 ${col.valueColor || "text-slate-900"}`}>{col.value}</p>
                  )}
                  <p className="text-[10px] text-slate-500 leading-relaxed">{col.desc}</p>
                </div>
              ))}
            </div>

            {/* Linked items */}
            <div className="pt-2">
              <p className="text-[11px] font-semibold text-slate-700 mb-2">{props.linkedLabel}</p>
              <div className="space-y-1.5">
                {props.linkedItems.map((item, i) => (
                  <div key={i} className="rounded-lg border border-slate-100 p-2.5">
                    <div className="flex items-center gap-1 mb-1">
                      {item.tags.map((tag, ti) => (
                        <span key={ti} className={`px-1.5 py-0.5 rounded text-[8px] font-medium border ${TAG_STYLES[tag.variant]}`}>
                          {tag.label}
                        </span>
                      ))}
                    </div>
                    <h4 className="text-[10px] font-semibold text-slate-700 mb-0.5">{item.title}</h4>
                    <p className="text-[9px] text-slate-400 leading-relaxed line-clamp-2">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Helpers ─── */

function buildNav(t: (k: string) => string): NavLabels {
  return { dashboard: t("navDashboard"), chat: t("navChat"), projects: t("navProjects"), signals: t("navSignals"), integrations: t("navIntegrations"), knowledge: t("navKnowledge"), guide: t("navGuide") };
}

function buildUser(t: (k: string) => string): UserInfo {
  return { name: t("navUserName"), initials: t("navUserInitials"), team: t("navUserTeam") };
}

/* ═══════════════ PM Visuals ═══════════════ */

/* PM1: Risk Detection — LIST */
export function PMVisual1({ t }: { t: (k: string) => string }) {
  return (
    <NeuronListScreen
      nav={buildNav(t)} search={t("navSearch")} user={buildUser(t)} pageTitle={t("navSignals")} contested={t("navContested")}
      sections={[
        { label: t("v1Sec"), count: 12, signals: [
          { tags: [{ label: t("v1T1"), variant: "risk" }, { label: t("v1T2"), variant: "neutral" }], title: t("v1S1Title"), desc: t("v1S1Desc"), project: t("v1S1Proj"), author: t("v1S1Author"), authorInitials: t("v1S1AI"), date: t("v1S1Date"), score: 1.1, scoreColor: "bg-red-500", status: "rising" },
          { tags: [{ label: t("v1T1"), variant: "risk" }, { label: t("v1T3"), variant: "neutral" }], title: t("v1S2Title"), desc: t("v1S2Desc"), project: t("v1S2Proj"), author: t("v1S2Author"), authorInitials: t("v1S2AI"), date: t("v1S2Date"), score: 0.85, scoreColor: "bg-amber-500" },
        ]},
        { label: t("v1Sec2"), count: 8, signals: [] },
      ]}
    />
  );
}

/* PM2: Health Score — DETAIL */
export function PMVisual2({ t }: { t: (k: string) => string }) {
  return (
    <NeuronDetailScreen
      nav={buildNav(t)} user={buildUser(t)}
      back={t("dBack")} openItem={t("dOpenItem")} statusLabel={t("dUnresolved")}
      severity={t("d2Severity")} severityLevel="high"
      tags={[{ label: t("v2T1"), variant: "risk" }, { label: t("v2T2"), variant: "neutral" }]}
      title={t("d2Title")} desc={t("d2Desc")}
      project={t("d2Proj")} author={t("d2Author")} authorInitials={t("d2AI")} date={t("d2Date")}
      breakdown={[
        { label: t("d2Col1Label"), value: "72", valueColor: "text-amber-500", desc: t("d2Col1Desc") },
        { label: t("d2Col2Label"), desc: t("d2Col2Desc") },
        { label: t("d2Col3Label"), desc: t("d2Col3Desc") },
      ]}
      linkedLabel={t("dLinked") + " 2"}
      linkedItems={[
        { tags: [{ label: t("v2T1"), variant: "risk" }], title: t("d2L1Title"), desc: t("d2L1Desc") },
        { tags: [{ label: t("v2T1"), variant: "risk" }], title: t("d2L2Title"), desc: t("d2L2Desc") },
      ]}
    />
  );
}

/* PM3: Risk Categories — LIST */
export function PMVisual3({ t }: { t: (k: string) => string }) {
  return (
    <NeuronListScreen
      nav={buildNav(t)} search={t("navSearch")} user={buildUser(t)} pageTitle={t("navSignals")} contested={t("navContested")}
      sections={[
        { label: t("v3Sec1"), count: 4, signals: [
          { tags: [{ label: t("v3T1"), variant: "risk" }, { label: t("v3T2"), variant: "neutral" }], title: t("v3S1Title"), desc: t("v3S1Desc"), project: t("v3S1Proj"), author: t("v3S1Author"), authorInitials: t("v3S1AI"), date: t("v3S1Date"), score: 1.1, scoreColor: "bg-red-500", status: "rising" },
        ]},
        { label: t("v3Sec2"), count: 3, signals: [
          { tags: [{ label: t("v3T1"), variant: "risk" }, { label: t("v3T3"), variant: "neutral" }], title: t("v3S2Title"), desc: t("v3S2Desc"), project: t("v3S2Proj"), author: t("v3S2Author"), authorInitials: t("v3S2AI"), date: t("v3S2Date"), score: 0.68, scoreColor: "bg-amber-500" },
        ]},
        { label: t("v3Sec3"), count: 2, signals: [] },
      ]}
    />
  );
}

/* PM4: Decision Support — DETAIL */
export function PMVisual4({ t }: { t: (k: string) => string }) {
  return (
    <NeuronDetailScreen
      nav={buildNav(t)} user={buildUser(t)}
      back={t("dBack")} openItem={t("dOpenItem")} statusLabel={t("dContested")}
      severity={t("d4Severity")} severityLevel="medium"
      tags={[{ label: t("v4T1"), variant: "decision" }, { label: t("v4T2"), variant: "neutral" }, { label: t("v4T3"), variant: "neutral" }]}
      title={t("d4Title")} desc={t("d4Desc")}
      project={t("d4Proj")} author={t("d4Author")} authorInitials={t("d4AI")} date={t("d4Date")}
      breakdown={[
        { label: t("d4Col1Label"), value: "0.82", valueColor: "text-amber-500", desc: t("d4Col1Desc") },
        { label: t("d4Col2Label"), desc: t("d4Col2Desc") },
        { label: t("d4Col3Label"), desc: t("d4Col3Desc") },
      ]}
      linkedLabel={t("dLinked") + " 2"}
      linkedItems={[
        { tags: [{ label: t("v4T1"), variant: "decision" }], title: t("d4L1Title"), desc: t("d4L1Desc") },
        { tags: [{ label: t("v4T1"), variant: "decision" }], title: t("d4L2Title"), desc: t("d4L2Desc") },
      ]}
    />
  );
}

/* PM5: Decision Log — DETAIL */
export function PMVisual5({ t }: { t: (k: string) => string }) {
  return (
    <NeuronDetailScreen
      nav={buildNav(t)} user={buildUser(t)}
      back={t("dBack")} openItem={t("dOpenItem")} statusLabel={t("dResolved")}
      severity={t("d5Severity")} severityLevel="low"
      tags={[{ label: t("v5T1"), variant: "decision" }, { label: t("v5T2"), variant: "neutral" }]}
      title={t("d5Title")} desc={t("d5Desc")}
      project={t("d5Proj")} author={t("d5Author")} authorInitials={t("d5AI")} date={t("d5Date")}
      breakdown={[
        { label: t("d5Col1Label"), desc: t("d5Col1Desc") },
        { label: t("d5Col2Label"), desc: t("d5Col2Desc") },
        { label: t("d5Col3Label"), desc: t("d5Col3Desc") },
      ]}
      linkedLabel={t("dLinked") + " 3"}
      linkedItems={[
        { tags: [{ label: t("v5T1"), variant: "decision" }], title: t("d5L1Title"), desc: t("d5L1Desc") },
        { tags: [{ label: t("v5T1"), variant: "decision" }], title: t("d5L2Title"), desc: t("d5L2Desc") },
      ]}
    />
  );
}

/* ═══════════════ Engineer Visuals ═══════════════ */

/* Eng1: Task Context — DETAIL */
export function EngVisual1({ t }: { t: (k: string) => string }) {
  return (
    <NeuronDetailScreen
      nav={buildNav(t)} user={buildUser(t)}
      back={t("dBack")} openItem={t("dOpenItem")} statusLabel={t("dUnresolved")}
      severity={t("d1Severity")} severityLevel="medium"
      tags={[{ label: t("v1T1"), variant: "alert" }, { label: t("v1T2"), variant: "neutral" }]}
      title={t("d1Title")} desc={t("d1Desc")}
      project={t("d1Proj")} author={t("d1Author")} authorInitials={t("d1AI")} date={t("d1Date")}
      breakdown={[
        { label: t("d1Col1Label"), desc: t("d1Col1Desc") },
        { label: t("d1Col2Label"), desc: t("d1Col2Desc") },
        { label: t("d1Col3Label"), desc: t("d1Col3Desc") },
      ]}
      linkedLabel={t("dLinked") + " 3"}
      linkedItems={[
        { tags: [{ label: t("v1T1"), variant: "alert" }], title: t("d1L1Title"), desc: t("d1L1Desc") },
        { tags: [{ label: t("d1L2Tag"), variant: "decision" }], title: t("d1L2Title"), desc: t("d1L2Desc") },
      ]}
    />
  );
}

/* Eng2: Impact Analysis — LIST */
export function EngVisual2({ t }: { t: (k: string) => string }) {
  return (
    <NeuronListScreen
      nav={buildNav(t)} search={t("navSearch")} user={buildUser(t)} pageTitle={t("navSignals")} contested={t("navContested")}
      sections={[
        { label: t("v2Sec"), count: 9, signals: [
          { tags: [{ label: t("v2T1"), variant: "alert" }, { label: t("v2T2"), variant: "neutral" }, { label: t("v2T3"), variant: "neutral" }], title: t("v2S1Title"), desc: t("v2S1Desc"), project: t("v2S1Proj"), author: t("v2S1Author"), authorInitials: t("v2S1AI"), date: t("v2S1Date"), score: 1.3, scoreColor: "bg-red-500", status: "rising" },
          { tags: [{ label: t("v2T1"), variant: "alert" }, { label: t("v2T4"), variant: "neutral" }], title: t("v2S2Title"), desc: t("v2S2Desc"), project: t("v2S2Proj"), author: t("v2S2Author"), authorInitials: t("v2S2AI"), date: t("v2S2Date"), score: 0.65, scoreColor: "bg-amber-500" },
        ]},
      ]}
    />
  );
}

/* Eng3: Review Patterns — DETAIL */
export function EngVisual3({ t }: { t: (k: string) => string }) {
  return (
    <NeuronDetailScreen
      nav={buildNav(t)} user={buildUser(t)}
      back={t("dBack")} openItem={t("dOpenItem")} statusLabel={t("dUnresolved")}
      severity={t("d3Severity")} severityLevel="medium"
      tags={[{ label: t("v3T1"), variant: "risk" }, { label: t("v3T2"), variant: "neutral" }]}
      title={t("d3Title")} desc={t("d3Desc")}
      project={t("d3Proj")} author={t("d3Author")} authorInitials={t("d3AI")} date={t("d3Date")}
      breakdown={[
        { label: t("d3Col1Label"), value: "3x", valueColor: "text-red-500", desc: t("d3Col1Desc") },
        { label: t("d3Col2Label"), desc: t("d3Col2Desc") },
        { label: t("d3Col3Label"), desc: t("d3Col3Desc") },
      ]}
      linkedLabel={t("dLinked") + " 2"}
      linkedItems={[
        { tags: [{ label: t("v3T1"), variant: "risk" }], title: t("d3L1Title"), desc: t("d3L1Desc") },
        { tags: [{ label: t("v3T1"), variant: "risk" }], title: t("d3L2Title"), desc: t("d3L2Desc") },
      ]}
    />
  );
}

/* Eng4: Past Failures — DETAIL */
export function EngVisual4({ t }: { t: (k: string) => string }) {
  return (
    <NeuronDetailScreen
      nav={buildNav(t)} user={buildUser(t)}
      back={t("dBack")} openItem={t("dOpenItem")} statusLabel={t("dUnresolved")}
      severity={t("d4Severity")} severityLevel="critical"
      tags={[{ label: t("v4T1"), variant: "alert" }, { label: t("v4T2"), variant: "neutral" }]}
      title={t("d4Title")} desc={t("d4Desc")}
      project={t("d4Proj")} author={t("d4Author")} authorInitials={t("d4AI")} date={t("d4Date")}
      breakdown={[
        { label: t("d4Col1Label"), desc: t("d4Col1Desc") },
        { label: t("d4Col2Label"), desc: t("d4Col2Desc") },
        { label: t("d4Col3Label"), desc: t("d4Col3Desc") },
      ]}
      linkedLabel={t("dLinked") + " 2"}
      linkedItems={[
        { tags: [{ label: t("v4T1"), variant: "alert" }], title: t("d4L1Title"), desc: t("d4L1Desc") },
        { tags: [{ label: t("d4L2Tag"), variant: "risk" }], title: t("d4L2Title"), desc: t("d4L2Desc") },
      ]}
    />
  );
}

/* Eng5: Org Knowledge — LIST */
export function EngVisual5({ t }: { t: (k: string) => string }) {
  return (
    <NeuronListScreen
      nav={buildNav(t)} search={t("navSearch")} user={buildUser(t)} pageTitle={t("navSignals")} contested={t("navContested")}
      sections={[
        { label: t("v5Sec"), count: 3, signals: [
          { tags: [{ label: t("v5T1"), variant: "decision" }, { label: t("v5T2"), variant: "neutral" }], title: t("v5S1Title"), desc: t("v5S1Desc"), project: t("v5S1Proj"), author: t("v5S1Author"), authorInitials: t("v5S1AI"), date: t("v5S1Date"), score: 0.95, scoreColor: "bg-emerald-500" },
          { tags: [{ label: t("v5T1"), variant: "decision" }], title: t("v5S2Title"), desc: t("v5S2Desc"), project: t("v5S2Proj"), author: t("v5S2Author"), authorInitials: t("v5S2AI"), date: t("v5S2Date"), score: 0.88, scoreColor: "bg-emerald-500" },
        ]},
      ]}
    />
  );
}
