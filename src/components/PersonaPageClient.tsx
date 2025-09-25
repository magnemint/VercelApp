"use client";

import React, { JSX, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pen, BookOpen, Layers, Users, Sparkles, Brain, LucideGlasses, Check, Eye, ChevronDown, ArrowUpRight, ArrowUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import DownloadButton from "@/components/DownloadButton";
import Image from "next/image";
import HeroInteractive from "@/components/HeroInteractive";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";

const chartData = [
  { name: "GPTZero", Persona: 20, "ChatGPT 5": 40, "Claude Sonnet 4": 66 },
  { name: "QuillBot", Persona: 30, "ChatGPT 5": 90, "Claude Sonnet 4": 67 },
  { name: "ZeroGPT", Persona: 20, "ChatGPT 5": 70, "Claude Sonnet 4": 64 },
  { name: "Undetectable AI", Persona: 10, "ChatGPT 5": 100, "Claude Sonnet 4": 22 },
];

/* ---------- Types ---------- */
interface Feature {
  id: number;
  title: string;
  desc: string;
  cat: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

interface FeatureCardProps {
  feature: Feature;
  onHover: () => void;
  onLeave: () => void;
  isHovered: boolean;
}

/* ---------- Data (typed) ---------- */
const FEATURES: Feature[] = [
  {
    id: 1,
    title: "Nuanced Expression",
    desc: "Generate responses that capture the subtleties that forge the human essence. Lexical choice and tone are priorities.",
    cat: "Creativity",
    icon: (props) => <Pen {...props} />,
  },
  {
    id: 2,
    title: "Deep Analysis",
    desc: "Recognise and understand delicate conventions across varieties of texts. From poetry to prose, Persona gets it.",
    cat: "Understanding",
    icon: (props) => <BookOpen {...props} />,
  },
  {
    id: 3,
    title: "Subtle Devices",
    desc: "Layer levels of faint yet efficacious literary devices without sounding heavy-handed or redundant.",
    cat: "Integration",
    icon: (props) => <Layers {...props} />,
  },
  {
    id: 4,
    title: "Distinct Persona",
    desc: "Each user can train their persona model to speak with their image at its core, it learns what you teach.",
    cat: "Integration",
    icon: (props) => <Users {...props} />,
  },
  {
    id: 5,
    title: "Micro-Intentions",
    desc: "Tiny responsive behaviors that make the text feel alive: emphasis, pacing, and reveal.",
    cat: "Creativity",
    icon: (props) => <Sparkles {...props} />,
  },
  {
    id: 6,
    title: "Organic Authenticity",
    desc: "Natural inflection and thoughtfulness are the core of the model, allowing even the keenest AI detectors to turn a blind eye*",
    cat: "Creativity",
    icon: (props) => <Check {...props} />,
  },
  {
    id: 7,
    title: "Adaptive Comprehension",
    desc: "Persona learns from every interaction, adapting to the styles and preferences of each user posesseses.",
    cat: "Understanding",
    icon: (props) => <Brain {...props} />,
  },
  {
    id: 8,
    title: "Contextual Alignment",
    desc: "Persona adjusts your voice to suit each medium, from emails to essays, without losing your unique signature",
    cat: "Integration",
    icon: (props) => <LucideGlasses {...props} />,
  },
  {
    id: 9,
    title: "Pragmatic Awareness",
    desc: "Persona sees past the literal to grasp intent and audience, having a better understanding of your words.",
    cat: "Understanding",
    icon: (props) => <Eye {...props} />,
  },
];

/* ---------- FAQ Data ---------- */
const FAQS: { id: number; q: string; a: string | JSX.Element }[] = [
  {
    id: 1,
    q: "How does Persona learn my voice?",
    a: (
      <>
        During the inital onboarding of the app, Persona will ask you for samples of your writing. Required samples will range from different emails, creative writing, analytical essays, and whatever else you are willing to share; the more you give, the more Persona will learn about what makes your writing special. For the best results, you should personally (and without the assistance of LLMs) write all samples that you provide, otherwise we cannot protect the claim that generated responses will be coherent and natural.
      </>
    ),
  },
  {
  id: 2,
  q: "Is my data private?",
  a: (
    <>
      We aim to be as transparent as possible when we say this, but... yes your data is private 🥳. 
      We don&apos;t collect or even store any of your data in any servers that we have access to, 
      unless you explicitly allow us (it&apos;s the setting called{" "}
      <Link href="/persona/data-donating" target="_blank" rel="noopener noreferrer">
      <span className="inline-flex items-center gap-1 text-blue-300 hover:underline cursor-pointer">
        data donating<ArrowUpRight width={12} className="inline-block align-middle" />
      </span>{" "}
      </Link>
      that&apos;s turned off by default and can be toggled in settings). 
      If you do enable the setting, we will use it to further improve the Persona model in a general sense.
    </>
  ),
  },
  {
    id: 3,
    q: "Can Persona imitate other writers?",
    a: (
      <>
        Technically, yes. Persona can imitate other writers, but you will need to collect their samples in a healthy quality and quantity. It&apos;s unethical to do this without their consent.
      </>
    ),
  },
  {
    id: 4,
    q: "Which formats does Persona support?",
    a: "Persona can generate emails, blog posts, any form of creative writing, social captions, code comments, and essays. Persona will adapt the necessary formatting and register to your desired medium (per request).",
  },
  {
    id: 5,
    q: "How was Persona trained?",
    a: "Persona was trained using human-written texts collected from friends, family and shareholders with their consent, using payment for their work if necessary. We pride ourselves on Persona's ethical training and plan to keep it this way.",
  },
];

/* ---------- Component ---------- */
export default function PersonaLanding() {
  const [filter, setFilter] = useState<string>("All");
  const [hovered, setHovered] = useState<number | null>(null);
  const categories = ["All", ...Array.from(new Set(FEATURES.map((f) => f.cat)))];
  const filtered = FEATURES.filter((f) => filter === "All" || f.cat === filter);

  // --- Graph UI state (inside the component) ---
  const [viewMode, setViewMode] = useState<"grouped" | "stacked">("grouped");
  const [visible, setVisible] = useState<Record<string, boolean>>({
    Persona: true,
    "ChatGPT 5": true,
    "Claude Sonnet 4": true,
  });
  const [hoverInfo, setHoverInfo] = useState<{ name?: string; key?: string; value?: number } | null>(null);

  // visibility for lazy-loading the chart (false until user scrolls to it)
  const [graphVisible, setGraphVisible] = useState<boolean>(false);
  const chartRef = useRef<HTMLDivElement | null>(null);

  // helper to normalize values from recharts (handles number | [number,number])
  const extractValue = (v: number | [number, number] | undefined): number => {
    if (Array.isArray(v) && v.length >= 2) {
      const start = Number(v[0] ?? 0);
      const end = Number(v[1] ?? 0);
      return end - start;
    }
    return typeof v === "number" ? v : Number(v ?? 0);
  };

  // IntersectionObserver to lazy-render the chart when scrolled into view
  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;

    // if already visible (server-client hydration), skip
    if (graphVisible) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setGraphVisible(true);
            obs.disconnect(); // we only need it once
          }
        });
      },
      {
        root: null,
        rootMargin: "300px", // preload a little before it appears
        threshold: 0.05,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef]);

  return (
    <div className="bg-gradient-to-br from-[#0f0a14] via-[#171219] to-[#241a2d] text-[#F8E5EE] min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center py-20 md:py-32 px-6 md:px-0 h-[90vh]">
        <div className="absolute inset-0 z-0 blur-[3px] pointer-events-none">
          <HeroInteractive className="w-full h-full" />
        </div>

        <div className="relative z-20 max-w-4xl w-full px-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3 pb-2">
              <div className="relative w-9 h-9 -mr-1">
                <Image src="/persona-ip/persona-THICK.png" alt="Persona logo" fill sizes="36px" className="object-contain" />
              </div>
              <h3 className="text-gray-400 text-sm">| Persona by Destiny</h3>
            </div>
          </div>

          <h1 className="relative text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold mb-4 md:mb-6 leading-tight">
            Nuance crafts <span className="animated-gradient-text" data-text="persona">persona</span>.
          </h1>

          <p className="relative text-[#c4b8bb] text-sm sm:text-base md:text-lg max-w-3xl mx-auto mb-6 md:mb-10">
            Make the little details your design language. Let the letters glorify you, let the pixels envision you, and let every
            interaction carry the personality you choose to teach.
          </p>

          <div className="flex items-center justify-center gap-4">
            <DownloadButton href="#" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-12 md:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-6 md:mb-8">
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                What <span className="text-transparent bg-clip-text animated-gradient-text">Persona</span> Excels At.
              </h2>
              <p className="mt-2 text-[#c4b8bb] max-w-2xl">A modern LLM that speaks with intention. Teach what makes you, and watch your text blossom.</p>
              <p className="mt-2 text-[#c4b8bb] max-w-2xl text-[10px]">*We cannot heavily protect this claim, all generation is subject to margin of error.</p>
            </div>

            <div className="w-full md:w-auto flex-shrink-0 flex items-center gap-3">
              <div className="hidden md:flex items-center gap-3">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setFilter(c)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm border ${
                      filter === c ? "scale-105 border-white/30 bg-white/6" : "border-transparent hover:border-white/10 hover:bg-white/2"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* mobile category scroller */}
              <div className="md:hidden mb-0 flex gap-3 overflow-x-auto">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setFilter(c)}
                    className={`px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                      filter === c ? "bg-white/6 border border-white/20" : "bg-transparent border border-white/5"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* GRID — responsive columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((f) => (
                <motion.div
                  key={f.id}
                  layout
                  layoutId={`card-${f.id}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ opacity: { duration: 0.18 }, layout: { duration: 0.32, ease: [0.22, 0.9, 0.31, 1] } }}
                >
                  <FeatureCard
                    feature={f}
                    onHover={() => setHovered(f.id)}
                    onLeave={() => setHovered(null)}
                    isHovered={hovered === f.id}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* --- Modern interactive graph section (lazy load on scroll) --- */}
      <section className="py-16 md:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between gap-6 mb-6">
            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* view toggle */}
              <div className="flex items-center gap-1 rounded-full bg-white/3 px-1 py-1">
                <button
                  onClick={() => setViewMode("grouped")}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                    viewMode === "grouped" ? "bg-white/6 border border-white/20" : "text-[#c4b8bb] opacity-80"
                  }`}
                >
                  Grouped
                </button>
                <button
                  onClick={() => setViewMode("stacked")}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                    viewMode === "stacked" ? "bg-white/6 border border-white/20" : "text-[#c4b8bb] opacity-80"
                  }`}
                >
                  Stacked
                </button>
              </div>

              {/* legend toggles */}
              <div className="flex items-center gap-2">
                {(["Persona", "ChatGPT 5", "Claude Sonnet 4"] as const).map((k) => (
                  <button
                    key={k}
                    onClick={() => setVisible((s) => ({ ...s, [k]: !s[k] }))}
                    className={`text-xs px-3 py-1 rounded-full flex items-center gap-2 font-semibold transition ${
                      visible[k] ? "bg-white/6 border border-white/10" : "bg-transparent border border-white/5 opacity-50"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`w-2 h-2 rounded-full ${
                        k === "Persona" ? "bg-emerald-400" : k === "ChatGPT 5" ? "bg-violet-400" : "bg-pink-400"
                      }`}
                    />
                    {k}
                  </button>
                ))}
              </div>
              <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-1 text-right pl-30">
                <span className="animated-gradient-text">Persona</span> Versus The Industry.
              </h2>
              <p className="text-[#c4b8bb] text-sm font-normal text-right">AI detection rates across popular tools; lower is better.</p>
            </div>
            </div>
          </div>

          <div className="rounded-3xl p-6 bg-white/6 backdrop-blur-lg border border-white/6 shadow-lg">
            {/* chart container — observed for lazy loading */}
            <div
              ref={chartRef}
              className="w-full h-72 md:h-96 focus:outline-none"
              role="region"
              aria-label="Persona vs industry chart"
            >
              {!graphVisible ? (
                // lightweight skeleton placeholder while we wait to render the real chart
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-full max-w-3xl animate-pulse">
                    <div className="h-44 md:h-64 bg-gradient-to-r from-white/4 to-white/6 rounded-xl" />
                    <div className="mt-4 flex gap-3">
                      <div className="h-4 flex-1 bg-white/4 rounded" />
                      <div className="h-4 flex-1 bg-white/4 rounded" />
                      <div className="h-4 flex-1 bg-white/4 rounded" />
                    </div>
                  </div>
                </div>
              ) : (
                // render the full chart only when graphVisible === true
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    barGap={12}
                    barCategoryGap="20%"
                    margin={{ top: 8, right: 16, left: 8, bottom: 8 }}
                  >
                    {/* Gradient defs */}
                    <defs>
                      <linearGradient id="gPersona" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0%" stopColor="#34d399d9" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#a1e8afe3" stopOpacity="0.85" />
                      </linearGradient>
                      <linearGradient id="gChatGPT" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6d9" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#8a5cf6f4" stopOpacity="0.85" />
                      </linearGradient>
                      <linearGradient id="gClaude" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0%" stopColor="#f472b6d9" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#f472b5ef" stopOpacity="0.85" />
                      </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" stroke="#2b2730" />
                    <XAxis dataKey="name" stroke="#c4b8bb" tick={{ fontSize: 12 }} />
                    <YAxis
                      stroke="#c4b8bb"
                      domain={[0, 100]}
                      tickFormatter={(v) => `${v}%`}
                      tick={{ fontSize: 12 }}
                    />

                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (!active || !payload || payload.length === 0) return null;
                        const shown = payload.filter((p) => visible[p.dataKey as string]);
                        return (
                          <div
                            className="rounded-lg p-3 text-sm"
                            style={{ background: "#0f0a14", color: "#F8E5EE", border: "1px solid rgba(255,255,255,0.04)" }}
                          >
                            <div className="font-semibold mb-1">{label}</div>
                            {shown.map((p) => {
                              const v = extractValue(p.value);
                              return (
                                <div key={p.dataKey} className="flex justify-between">
                                  <div className="flex items-center gap-2">
                                    <span
                                      className="w-10 h-2 rounded-full"
                                      style={{
                                        background:
                                          p.fill ||
                                          (p.dataKey === "Persona"
                                            ? "#34d399d9"
                                            : p.dataKey === "ChatGPT 5"
                                            ? "#8b5cf6d9"
                                            : "#f472b6d9"),
                                      }}
                                    />
                                    <div className="min-w-[110px]">{p.dataKey}</div>
                                  </div>
                                  <div className="font-semibold">{Math.round(v)}%</div>
                                </div>
                              );
                            })}
                          </div>
                        );
                      }}
                      cursor={{ fill: "rgba(255,255,255,0.03)" }}
                    />

                    {/* Bars — apply stackId when stacked, only render if visible */}
                    {visible["Persona"] && (
                      <Bar
                        dataKey="Persona"
                        fill="url(#gPersona)"
                        barSize={36}
                        radius={[6, 6, 0, 0]}
                        stackId={viewMode === "stacked" ? "a" : undefined}
                        isAnimationActive
                        animationDuration={800}
                        onMouseOver={(data: { name?: string; payload?: Record<string, number>; value?: number | [number, number] }) => {
                          const raw = data?.value ?? (data && data.payload && data.payload.Persona);
                          setHoverInfo({ name: data?.name, key: "Persona", value: extractValue(raw) });
                        }}
                        onMouseOut={() => setHoverInfo(null)}
                        onClick={() => setHoverInfo(null)}
                        stroke="none"
                      />
                    )}

                    {visible["ChatGPT 5"] && (
                      <Bar
                        dataKey="ChatGPT 5"
                        fill="url(#gChatGPT)"
                        barSize={36}
                        radius={[6, 6, 0, 0]}
                        stackId={viewMode === "stacked" ? "a" : undefined}
                        isAnimationActive
                        animationDuration={900}
                        onMouseOver={(data: { name?: string; payload?: Record<string, number>; value?: number | [number, number] }) => {
                          const raw = data?.value ?? (data && data.payload && data.payload["ChatGPT 5"]);
                          setHoverInfo({ name: data?.name, key: "ChatGPT 5", value: extractValue(raw) });
                        }}
                        onMouseOut={() => setHoverInfo(null)}
                        stroke="none"
                      />
                    )}

                    {visible["Claude Sonnet 4"] && (
                      <Bar
                        dataKey="Claude Sonnet 4"
                        fill="url(#gClaude)"
                        barSize={36}
                        radius={[6, 6, 0, 0]}
                        stackId={viewMode === "stacked" ? "a" : undefined}
                        isAnimationActive
                        animationDuration={1000}
                        onMouseOver={(data: { name?: string; payload?: Record<string, number>; value?: number | [number, number] }) => {
                          const raw = data?.value ?? (data && data.payload && data.payload["Claude Sonnet 4"]);
                          setHoverInfo({ name: data?.name, key: "Claude Sonnet 4", value: extractValue(raw) });
                        }}
                        onMouseOut={() => setHoverInfo(null)}
                        stroke="none"
                      />
                    )}
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Hover info badge */}
            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-[#c4b8bb]">Tip: toggle series using the chips above. Click “Stacked” for stacked view.</div>

              <div className="min-w-[160px]">
                {hoverInfo ? (
                  <div className="inline-flex items-center gap-3 px-3 py-2 rounded-full bg-black/50 border border-white/6">
                    <div className="text-xs opacity-80">{hoverInfo.name}</div>
                    <div className="text-sm font-bold">{Math.round(hoverInfo.value ?? 0)}%</div>
                    <div className="text-[10px] text-[#c4b8bb]">({hoverInfo.key})</div>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-3 px-3 py-2 rounded-full bg-transparent border border-white/4 text-xs text-[#c4b8bb]">
                    Hover a bar to preview
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- SUBSCRIPTION / PRICING PANEL (inserted above FAQ) ---------- */}
  {/* ---------- SUBSCRIPTION / PRICING PANEL (updated with liquid glass buttons) ---------- */}
  <section id="pricing" className="py-12 md:py-16 bg-black">
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Write your world with <span className="animated-gradient-text">Persona</span>.</h2>
      </div>

      {/* Single large rounded panel divided into two sections */}
      <div className="rounded-3xl overflow-hidden bg-white/6 backdrop-blur-lg border border-white/6 shadow-lg">
        <div className="flex flex-col md:flex-row">
          {/* Left half */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between" style={{background: 'linear-gradient(180deg, rgba(13,14,16,0.6), rgba(20,18,22,0.45))'}}>
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-extrabold">Persona Basic</h3>
                  <p className="text-xs text-[#c4b8bb] mt-1">Everyone starts here; not too little, but not too much.</p>
                </div>
                <div className="text-4xl font-extrabold">$0<span className="text-sm font-medium ml-1">/mo</span></div>
              </div>

              <div className="mt-6 space-y-3 text-sm text-[#c4b8bb]">
                <div className="flex items-start gap-3"><span className="text-emerald-400"><Check width={20} strokeWidth={4}/></span> 3 personalised generations a week</div>
                <div className="flex items-start gap-3"><span className="text-emerald-400"><Check width={20} strokeWidth={4}/></span> All other generations will be generically human</div>
              </div>
            </div>

            <div className="mt-6">
              <a 
                href="#" 
                className="relative inline-flex w-full items-center justify-center rounded-full px-6 py-3 font-semibold text-[#F8E5EE] hover:scale-105 transition-all duration-300 group overflow-hidden"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(12px) saturate(120%)",
                  WebkitBackdropFilter: "blur(12px) saturate(120%)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)"
                }}
              >
                {/* Subtle gradient overlay that appears on hover */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/20 via-teal-400/10 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/8 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
                
                <span className="relative z-10">Try now</span>
              </a>
            </div>
          </div>

          {/* Divider (visible on md+) */}
          <div className="hidden md:block w-px bg-white/6" />

          {/* Right half */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between" style={{background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.006))'}}>
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-extrabold">Persona Elite</h3>
                  <p className="text-xs text-[#c4b8bb] mt-1">The plan with the most value.</p>
                </div>
                <div className="text-4xl font-extrabold">$15<span className="text-sm font-medium ml-1">/mo</span></div>
              </div>

              <div className="mt-6 space-y-3 text-sm text-[#c4b8bb]">
                <div className="flex items-start gap-3"><span className="text-emerald-400"><Check width={20} strokeWidth={4}/></span> Unlimited personalised generations</div>
                <div className="flex items-start gap-3"><span className="text-emerald-400"><Check width={20} strokeWidth={4}/></span> Early access to new features</div>
                <div className="flex items-start gap-3"><span className="text-emerald-400"><Check width={20} strokeWidth={4}/></span> Access to unlimited file uploads¹</div>
                <div className="flex items-start gap-3 -mt-[1px]">
                  <span className="text-emerald-400"><Check width={20} strokeWidth={4} /></span>

                  {/* inline-flex wrapper: the border-b applies to both text and icon */}
                  Credits from
                  <Link href="/persona/data-donating">
                  <span
                  role="link"
                  aria-label="Credits from data donating (external)"
                  className="relative inline-flex items-center gap-1 -ml-[8px] -mt-5 text-sm text-blue-300 group hover:cursor-pointer"
                  >
                  <span className="inline-flex items-center gap-1">
                    data donating
                    <ArrowUpRight
                      width={15}
                      className="inline-block align-middle"
                      aria-hidden="true"
                    />
                  </span>
                  {/* absolute underline — doesn't push content */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 bg-current transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-150 pointer-events-none"
                    style={{
                      bottom: "1px",   // move the line up (closer to glyph)
                      height: "1px",   // thin, closer to native text-decoration
                      borderRadius: "9999px"
                    }}
                  />
                </span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <a 
                href="#" 
                className="relative inline-flex w-full items-center justify-center rounded-full px-6 py-3 font-semibold text-black hover:scale-105 transition-all duration-300 group overflow-hidden"
                style={{
                  background: "linear-gradient(180deg, rgba(52, 211, 153, 0.95), rgba(16, 185, 129, 0.9))",
                  border: "1px solid rgba(255,255,255,0.2)",
                  backdropFilter: "blur(12px) saturate(120%)",
                  WebkitBackdropFilter: "blur(12px) saturate(120%)",
                  boxShadow: "0 8px 32px rgba(52, 211, 153, 0.25), inset 0 1px 0 rgba(255,255,255,0.2)"
                }}
              >
                {/* Subtle glass overlay */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-40 pointer-events-none" />
                
                {/* Enhanced shimmer effect for premium button */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
                
                <span className="relative z-10">Get 1 month free</span>
              </a>
            </div>
          </div>
        </div>

        <div className="p-4 text-xs text-[#c4b8bb] text-center">Multiple account (family) plans are in the works.</div>
      </div>
    </div>
    
    <p className="text-right text-[#c4b8bb] text-[0.6rem] pt-5 pr-30">¹Depending on your device&apos;s hardware capabilities, you may not be able to run Persona&apos;s multimodal model. Check <Link href="/persona/hardware-requirements" className="hover:underline text-blue-300">our specifications</Link> to see if your device can run our product.</p>
  </section>

      {/* --- MODERN FAQ SECTION (new) --- */}
      <section id="faq" className="py-16 md:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Not So Frequently Asked Questions.</h2>
            <p className="text-[#c4b8bb] max-w-2xl mx-auto">Our product is still fairly new, so here&apos;s the answers to what we think you guys are thinking.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* right — accordion list */}
            <div className="space-y-3">
              {FAQS.map((f) => (
                <FAQItem key={f.id} faq={f} />
              ))}
            </div>

            <div className="rounded-3xl p-6 bg-white/6 backdrop-blur-lg border border-white/6 shadow-lg flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">We didn&apos;t answer your question? Let us know!</h3>
                <p className="text-[#c4b8bb] mb-4">If you&apos;re still puzzled, let us personally put the pieces together, we&apos;d love to put your worries to rest.</p>

                <ul className="text-sm space-y-2 text-[#c4b8bb]">
                  <li>→ Roughly a 24 hour to 2 week response time</li>
                  <li>→ Our plates are a tad bit full 😅</li>
                  <li>→ We apologies for any and all inconveniences</li>
                </ul>
              </div>

              <div className="mt-6">
                <a href="#" className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/20 hover:scale-105 transition-transform">
                  <span className="text-sm font-semibold">Contact support</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative flex flex-col items-center justify-center text-center py-16 md:py-28 px-6 md:px-0 bg-black">
        <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
          <div className="w-[340px] sm:w-[520px] md:w-[700px] h-[340px] sm:h-[520px] md:h-[700px] bg-gradient-to-br from-pink-500/30 via-purple-400/30 to-teal-400/30 blur-3xl rounded-full mx-auto opacity-50" />
        </div>

        <div className="relative rounded-3xl p-6 sm:p-8 md:p-12 max-w-2xl bg-white/8 backdrop-blur-2xl border border-white/10 shadow-lg shadow-black/30">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-30 pointer-events-none" />
          <h2 className="relative text-xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold mb-4 md:mb-6 bg-gradient-to-r from-pink-300 via-purple-200 to-green-300 bg-clip-text text-transparent">
            Ready to Explore Yourself?
          </h2>
          <p className="relative text-[#f8e5ee] mb-6">Step into a new era of self-discovery, powered by cutting-edge AI.</p>
          <a
            href="#"
            className="relative inline-block bg-white/10 backdrop-blur-2xl border border-white/20 border-t-white/40 border-b-white/10 shadow-lg shadow-black/30 px-8 py-3 sm:px-10 sm:py-4 rounded-full font-semibold text-[#F8E5EE] hover:scale-105 transition-transform"
          >
            <span className="relative z-10">Start Now</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-40 pointer-events-none" />
          </a>
        </div>
      </section>

      <footer className="py-8 md:py-10 bg-black text-center text-[#847577] text-sm">&copy; {new Date().getFullYear()} Destiny. All rights reserved.</footer>
    </div>
  );
}

/* ---------- FeatureCard (typed, subtle pointer + liquid glass) ---------- */
function FeatureCard({ feature, onHover, onLeave, isHovered }: FeatureCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId = 0;
    let targetRx = 0;
    let targetRy = 0;
    let currRx = 0;
    let currRy = 0;

    const tiltStrength = 28;
    const maxRx = 28;
    const maxRy = 28;
    const translateZ = 3;
    const lerpFactor = 0.28;

    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

    const updateTargetsFromPointer = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) {
        targetRx = 0;
        targetRy = 0;
        return;
      }
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const px = (x / rect.width - 0.5) * tiltStrength;
      const py = (y / rect.height - 0.5) * -(tiltStrength * 0.45);
      targetRx = clamp(py, -maxRx, maxRx);
      targetRy = clamp(px, -maxRy, maxRy);
    };

    const pointerHandler = (e: PointerEvent) => {
      updateTargetsFromPointer(e.clientX, e.clientY);
      if (!rafId) rafId = requestAnimationFrame(animate);
    };

    const animate = () => {
      rafId = 0;
      currRx = currRx + (targetRx - currRx) * lerpFactor;
      currRy = currRy + (targetRy - currRy) * lerpFactor;
      el.style.transform = `perspective(900px) rotateX(${currRx}deg) rotateY(${currRy}deg) translateZ(${translateZ}px)`;
      const dx = Math.abs(currRx - targetRx);
      const dy = Math.abs(currRy - targetRy);
      const threshold = 0.02;
      if (dx > threshold || dy > threshold) {
        rafId = requestAnimationFrame(animate);
      } else {
        el.style.transform = `perspective(900px) rotateX(${targetRx}deg) rotateY(${targetRy}deg) translateZ(${translateZ}px)`;
        rafId = 0;
      }
    };

    const leave = () => {
      targetRx = 0;
      targetRy = 0;
      if (!rafId) rafId = requestAnimationFrame(animate);
    };

    el.addEventListener("pointermove", pointerHandler as EventListener);
    el.addEventListener("pointerleave", leave as EventListener);
    el.addEventListener("pointercancel", leave as EventListener);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.removeEventListener("pointermove", pointerHandler as EventListener);
      el.removeEventListener("pointerleave", leave as EventListener);
      el.removeEventListener("pointercancel", leave as EventListener);
    };
  }, []);

  const Icon = feature.icon;
  return (
    <article
      ref={ref}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`group relative overflow-hidden rounded-2xl p-4 sm:p-6 md:p-8 will-change-transform transition-shadow ${
        isHovered ? "shadow-2xl shadow-black/40 z-20" : "shadow-md"
      } min-h-[120px] sm:min-h-[140px]`}
      style={{
        background: "linear-gradient(180deg, rgba(57, 57, 57, 0.45), rgba(40, 40, 40, 0.4))",
        border: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(10px) saturate(120%)",
        WebkitBackdropFilter: "blur(10px) saturate(120%)",
      }}
    >
      <div className="relative z-10 flex items-start gap-4">
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center p-2 transition-all duration-300 
                group-hover:shadow-[0_0_20px_rgba(16,185,129,0.8)] group-hover:border-emerald-400/50`}
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(6px)",
          }}
        >
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 text-emerald-400" />
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold">{feature.title}</h3>
          <p className="mt-1 text-sm sm:text-sm text-[#c4b8bb] max-w-xs">{feature.desc}</p>
        </div>
      </div>

      <div className="mt-4 sm:mt-6 flex items-center justify-between relative z-10">
        <div className="text-xs py-1 px-3 rounded-full bg-white/3 border border-white/6">{feature.cat}</div>
        <div className="text-xs opacity-80">Learn more →</div>
      </div>
    </article>
  );
}

/* ---------- FAQ Item (accessible accordion) ---------- */
function FAQItem({ faq }: { faq: { id: number; q: string; a: string | JSX.Element } }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden bg-white/4 border border-white/6 backdrop-blur-sm">
      <button
        className="w-full flex items-center justify-between px-4 py-4 text-left"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
      >
        <div>
          <div className="text-sm font-semibold">{faq.q}</div>
          <div className="text-xs text-[#c4b8bb] mt-1">Tap to expand</div>
        </div>

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.28, ease: [0.22, 0.9, 0.31, 1] }}
          className="ml-4"
        >
          <ChevronDown className="w-5 h-5 text-[#c4b8bb]" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 0.9, 0.31, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-4 pb-4 text-sm text-[#c4b8bb]">
              {typeof faq.a === "string" ? <p>{faq.a}</p> : faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
