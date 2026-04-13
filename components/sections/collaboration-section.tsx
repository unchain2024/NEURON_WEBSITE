"use client";

import {
  LayoutDashboard,
  MessageCircle,
  FolderKanban,
  Radio,
  Puzzle,
  BookOpen,
  HelpCircle,
  Send,
  Layers,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionReveal, MotionDiv, fadeInUp } from "@/components/motion-wrapper";

export default function CollaborationSection() {
  const t = useTranslations("Collaboration");

  const navItems = [
    { icon: LayoutDashboard, label: t("navDashboard"), key: "dashboard" },
    { icon: MessageCircle, label: t("navChat"), key: "chat" },
    { icon: FolderKanban, label: t("navProjects"), key: "projects" },
    { icon: Radio, label: t("navSignals"), key: "signals" },
    { icon: Puzzle, label: t("navIntegrations"), key: "integrations" },
  ];
  const bottomItems = [
    { icon: BookOpen, label: t("navKnowledge"), key: "knowledge" },
    { icon: HelpCircle, label: t("navGuide"), key: "guide" },
  ];

  const threads = [
    t("thread1"),
    t("thread2"),
    t("thread3"),
    t("thread4"),
  ];

  const signalCards = [
    { title: t("sig1Title"), desc: t("sig1Desc"), author: t("sig1Author"), authorInitials: t("sig1AI"), date: t("sig1Date"), match: t("sig1Match") },
    { title: t("sig2Title"), desc: t("sig2Desc"), author: t("sig2Author"), authorInitials: t("sig2AI"), date: t("sig2Date"), match: t("sig2Match") },
    { title: t("sig3Title"), desc: t("sig3Desc"), author: t("sig3Author"), authorInitials: t("sig3AI"), date: t("sig3Date"), match: t("sig3Match") },
  ];

  return (
    <section className="section-padding">
      <SectionReveal>
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
            <MotionDiv variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
                {t("heading")}
              </h2>
              <p className="mt-4 text-lg text-text-secondary leading-relaxed">
                {t("subheading")}
              </p>
            </MotionDiv>
          </div>

          <MotionDiv variants={fadeInUp}>
            <div className="rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden">
              <div className="flex h-[440px] md:h-[500px]">
                {/* Sidebar */}
                <div className="hidden md:flex flex-col w-40 lg:w-44 border-r border-slate-100 bg-slate-50/50 shrink-0">
                  <div className="flex items-center gap-2 px-3 py-3 border-b border-slate-100">
                    <div className="h-6 w-6 rounded-md bg-emerald-500 flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">N</span>
                    </div>
                    <span className="text-xs font-bold text-slate-900">NEURON</span>
                  </div>
                  <nav className="flex-1 px-1.5 py-2 space-y-0.5">
                    {navItems.map((item) => (
                      <div key={item.key} className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[11px] ${item.key === "chat" ? "bg-emerald-50 text-emerald-700 font-medium" : "text-slate-500"}`}>
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
                      <span className="text-[8px] font-semibold text-slate-500">{t("navUserInitials")}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-medium text-slate-700 truncate">{t("navUserName")}</p>
                      <p className="text-[8px] text-slate-400 truncate">{t("navUserTeam")}</p>
                    </div>
                  </div>
                </div>

                {/* Chat thread list */}
                <div className="hidden lg:flex flex-col w-48 border-r border-slate-100 shrink-0">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900">{t("navChat")}</h3>
                  </div>
                  <div className="px-2 py-2">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide px-2 mb-1.5">{t("recents")}</p>
                    {threads.map((thread, i) => (
                      <div
                        key={i}
                        className={`px-2.5 py-1.5 rounded-md text-[11px] truncate ${i === 0 ? "bg-emerald-50 text-emerald-700 font-medium" : "text-slate-500"}`}
                      >
                        {thread}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chat content */}
                <div className="flex-1 flex flex-col min-w-0">
                  {/* Chat header */}
                  <div className="px-4 md:px-5 py-3 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 truncate">{t("thread1")}</h3>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto px-4 md:px-5 py-4 space-y-4">
                    {/* User message (PM) */}
                    <div className="flex justify-end">
                      <div className="max-w-[80%] sm:max-w-[70%]">
                        <div className="bg-emerald-500 text-white rounded-2xl rounded-br-md px-4 py-2.5">
                          <p className="text-[12px] leading-relaxed">{t("userMsg")}</p>
                        </div>
                        <div className="flex items-center justify-end gap-1.5 mt-1">
                          <div className="h-4 w-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                            <span className="text-[7px] font-bold text-white">{t("pmInitials")}</span>
                          </div>
                          <span className="text-[9px] text-slate-400">{t("pmName")}</span>
                        </div>
                      </div>
                    </div>

                    {/* NEURON response */}
                    <div className="flex gap-2.5">
                      <div className="h-6 w-6 rounded-md bg-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-white text-[9px] font-bold">N</span>
                      </div>
                      <div className="flex-1 min-w-0 space-y-3">
                        <div className="bg-slate-50 rounded-2xl rounded-tl-md px-4 py-3">
                          <p className="text-[11px] text-slate-700 leading-relaxed whitespace-pre-line">{t("aiResponse")}</p>
                          <ul className="mt-2 space-y-0.5">
                            {[t("aiPoint1"), t("aiPoint2"), t("aiPoint3"), t("aiPoint4")].map((point, i) => (
                              <li key={i} className="text-[10px] text-slate-500 flex items-start gap-1.5">
                                <span className="text-slate-300 mt-0.5">•</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Relevant Signals section */}
                        <div>
                          <p className="text-[10px] font-semibold text-slate-500 mb-2">{t("relevantSignals")}</p>
                          <div className="flex gap-2 overflow-x-auto pb-1">
                            {signalCards.map((sig, i) => (
                              <div key={i} className="rounded-lg border border-slate-100 p-2.5 min-w-[160px] max-w-[180px] shrink-0 hover:border-slate-200 transition-colors">
                                <div className="flex items-center gap-1 mb-1.5 flex-wrap">
                                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[8px] font-medium border bg-emerald-50 text-emerald-700 border-emerald-200">
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    {t("tagDecision")}
                                  </span>
                                  <span className="text-[8px] text-emerald-600 font-medium">{sig.match}</span>
                                </div>
                                <h4 className="text-[10px] font-semibold text-slate-700 mb-0.5 leading-snug line-clamp-2">{sig.title}</h4>
                                <p className="text-[9px] text-slate-400 leading-relaxed line-clamp-2 mb-1.5">{sig.desc}</p>
                                <div className="flex items-center gap-1.5 text-[8px] text-slate-400">
                                  <div className="h-3 w-3 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center">
                                    <span className="text-[6px] font-bold text-white">{sig.authorInitials}</span>
                                  </div>
                                  <span>@{sig.author}</span>
                                  <span>{sig.date}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Engineer follow-up */}
                        <div className="flex justify-end">
                          <div className="max-w-[85%]">
                            <div className="bg-slate-100 rounded-2xl rounded-br-md px-4 py-2.5">
                              <p className="text-[11px] text-slate-700 leading-relaxed">{t("engMsg")}</p>
                            </div>
                            <div className="flex items-center justify-end gap-1.5 mt-1">
                              <div className="h-4 w-4 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center">
                                <span className="text-[7px] font-bold text-white">{t("engInitials")}</span>
                              </div>
                              <span className="text-[9px] text-slate-400">{t("engName")}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Input bar */}
                  <div className="px-4 md:px-5 py-3 border-t border-slate-100">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-white">
                      <span className="text-[11px] text-slate-400 flex-1 truncate">{t("inputPlaceholder")}</span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-[9px] text-slate-500">
                          <Layers className="h-2.5 w-2.5" />
                          <span>{t("multiPerspective")}</span>
                        </button>
                        <button className="p-1.5 rounded-lg bg-emerald-500 text-white">
                          <Send className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>
      </SectionReveal>
    </section>
  );
}
