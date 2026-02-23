"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FEATURE_TABS } from "@/lib/constants";
import { BlurReveal, MotionDiv, blurIn } from "@/components/motion-wrapper";
import { motion, AnimatePresence } from "framer-motion";
import MouseSpotlight from "@/components/mouse-spotlight";

export default function Features() {
  const [activeTab, setActiveTab] = useState(FEATURE_TABS[0].id);

  return (
    <section id="features" className="section-padding relative">
      <MouseSpotlight />
      <BlurReveal>
        <div className="section-container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <MotionDiv variants={blurIn}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Your <span className="gradient-text-animated">unfair advantage</span> in product decisions
              </h2>
            </MotionDiv>
          </div>

          <MotionDiv variants={blurIn}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto p-0 mb-12">
                {FEATURE_TABS.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="glass-card-light px-4 py-2.5 text-sm font-medium text-text-secondary data-[state=active]:bg-primary/20 data-[state=active]:text-white data-[state=active]:border-primary/30 transition-all rounded-xl"
                  >
                    <tab.icon className="h-4 w-4 mr-2 inline-block" />
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {FEATURE_TABS.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className="mt-0">
                  <AnimatePresence mode="wait">
                    {activeTab === tab.id && (
                      <motion.div
                        key={tab.id}
                        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="grid lg:grid-cols-2 gap-8 items-center"
                      >
                        {/* Left: text */}
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold mb-4">
                            {tab.title}
                          </h3>
                          <p className="text-text-secondary leading-relaxed mb-6">
                            {tab.description}
                          </p>
                          <ul className="space-y-3">
                            {tab.bullets.map((bullet, idx) => (
                              <motion.li
                                key={bullet}
                                className="flex items-start gap-3"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + idx * 0.08 }}
                              >
                                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                <span className="text-text-secondary">{bullet}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        {/* Right: mockup panel */}
                        <motion.div
                          className="glass-card p-6 relative overflow-hidden"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                        >
                          {/* Animated glow inside card */}
                          <div
                            className="absolute -top-20 -right-20 w-40 h-40 rounded-full animate-pulse-glow opacity-30"
                            style={{
                              background: "radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)",
                            }}
                          />
                          <div className="rounded-xl bg-surface border border-border/50 p-5 relative z-10">
                            <div className="flex items-center gap-2 mb-4">
                              <tab.icon className="h-5 w-5 text-primary" />
                              <span className="text-sm font-medium">{tab.label}</span>
                            </div>
                            <div className="space-y-3">
                              {tab.bullets.slice(0, 3).map((_, idx) => (
                                <motion.div
                                  key={idx}
                                  className="glass-card-light p-3"
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.3 + idx * 0.12 }}
                                >
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="h-2 w-2 rounded-full bg-primary/60" />
                                    <div
                                      className="h-2.5 bg-white/10 rounded"
                                      style={{ width: `${70 - idx * 15}%` }}
                                    />
                                  </div>
                                  <div
                                    className="h-2 bg-white/5 rounded"
                                    style={{ width: `${90 - idx * 10}%` }}
                                  />
                                </motion.div>
                              ))}
                            </div>
                            <div className="mt-4 flex gap-2">
                              <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                                Active
                              </span>
                              <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                                {tab.bullets.length} signals
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </TabsContent>
              ))}
            </Tabs>
          </MotionDiv>
        </div>
      </BlurReveal>
    </section>
  );
}
