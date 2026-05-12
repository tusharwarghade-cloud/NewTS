import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, useScroll, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Zap, Shield, Eye, Layers, GitBranch, Users, Check, ChevronDown, Bot, Code2, TestTube2, Rocket, GitCommit, Clock, DollarSign, Wrench, Shuffle, TrendingDown, AlertTriangle, EyeOff, Puzzle, Lock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";
import { GridPattern } from "@/components/ui/grid-pattern";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import FeaturesSection from "@/components/ui/features";

const BG   = "linear-gradient(135deg, oklch(0.57 0.22 25) 0%, oklch(0.52 0.24 292) 100%)";
const GT   = { backgroundImage: BG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };
const GLOW = "0 0 40px color-mix(in oklch, oklch(0.57 0.22 25) 35%, transparent)";

/* ── Fade-in on scroll ── */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ── Section divider ── */
function Divider() { return <div className="border-t border-border w-full" />; }

/* ── Tag pill ── */
function Tag({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono tracking-widest border border-border text-muted-foreground">
      {children}
    </span>
  );
}


/* ══════════════════════════════════════════
   1. HERO
══════════════════════════════════════════ */
function Hero() {
  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
    >
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto space-y-6">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest border border-border text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" style={{ boxShadow: "0 0 8px #4ade80" }} />
            AI-native engineering studio
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-moralana text-5xl md:text-7xl font-light leading-[1.06] tracking-tight text-foreground"
        >
          Build. Ship. Scale.<br />
          <span style={GT}>10x Faster.</span>
        </motion.h1>

        {/* Sub-heading */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-base sm:text-lg font-light text-muted-foreground max-w-xl leading-relaxed"
        >
          We embed into your teams, build AI systems, and own the transformation —
          from first model to production at scale.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto"
        >
          <a href="/contact">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg text-sm font-mono font-semibold text-white shadow-lg"
              style={{ background: BG, boxShadow: GLOW }}
            >
              Book a Strategy Call <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </a>
          <a href="/services">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg text-sm font-mono font-medium border border-border text-foreground bg-background/60 backdrop-blur-sm"
            >
              See Our Work
            </motion.button>
          </a>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="pt-4"
        >
          <p className="text-[10px] font-mono text-muted-foreground/40 tracking-widest mb-4 uppercase">Trusted across industries</p>
          <div className="flex flex-wrap items-center justify-center gap-6 opacity-35">
            {["Enterprise AI", "Fintech", "HealthTech", "PropTech", "CleanTech", "EdTech"].map((name) => (
              <span key={name} className="text-xs font-semibold tracking-wide text-foreground">{name}</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] text-muted-foreground/40 tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-border to-transparent"
        />
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════
   1b. AI PARTNER — INDIA'S MID-MARKET
══════════════════════════════════════════ */
const MIDMARKET_STATS = [
  { val: "$100M+", label: "Client Valuation" },
  { val: "100+", label: "Projects Delivered" },
  { val: "150+", label: "Engineers & AI Experts" },
  { val: "100+", label: "Enterprise Clients" },
  { val: "42%", label: "Avg Cost Reduction" },
];


/* ── Scalability live monitor graph ── */
function ScalabilityGraph() {
  return (
    <div className="rounded-xl border border-[#e0e0e0] dark:border-[#e0e0e0]/20 bg-background/50 backdrop-blur-md p-4 w-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-[9px] font-mono tracking-widest text-muted-foreground">INFRASTRUCTURE</p>
        <motion.div
          className="flex items-center gap-1 text-[9px] font-mono tracking-wider"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "oklch(0.72 0.19 155)" }} />
          LIVE
        </motion.div>
      </div>

      {/* Animated EKG-style line — scrolls continuously */}
      <svg className="w-full" viewBox="0 0 240 60" fill="none" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="sc-pulse-grad" x1="0" y1="0" x2="240" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="oklch(0.57 0.22 25)" />
            <stop offset="1" stopColor="oklch(0.52 0.24 292)" />
          </linearGradient>
        </defs>
        <motion.g
          animate={{ x: [0, -240] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          {/* Two copies for seamless loop */}
          <path d="M0 35 L20 35 L28 18 L36 48 L44 10 L52 42 L60 30 L80 35 L100 33 L108 15 L116 50 L124 8 L132 44 L140 28 L160 35 L180 33 L188 20 L196 46 L204 12 L212 40 L220 32 L240 35" stroke="url(#sc-pulse-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M240 35 L260 35 L268 18 L276 48 L284 10 L292 42 L300 30 L320 35 L340 33 L348 15 L356 50 L364 8 L372 44 L380 28 L400 35 L420 33 L428 20 L436 46 L444 12 L452 40 L460 32 L480 35" stroke="url(#sc-pulse-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
      </svg>

      {/* Live metrics row */}
      <div className="grid grid-cols-3 gap-2 mt-3">
        {[
          { label: "Uptime", val: "99.9%" },
          { label: "Latency", val: "12ms" },
          { label: "Throughput", val: "4.2k/s" },
        ].map((m, i) => (
          <div key={m.label} className="text-center">
            <motion.p
              className="text-sm font-medium"
              style={GT}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            >
              {m.val}
            </motion.p>
            <p className="text-[8px] font-mono text-muted-foreground tracking-wider">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Animated bar equalizer */}
      <div className="flex items-end gap-[3px] h-8 mt-3 justify-center">
        {Array.from({ length: 16 }, (_, i) => (
          <motion.div
            key={i}
            className="w-[6px] rounded-t-sm"
            style={{ background: BG }}
            animate={{ height: [`${12 + Math.random() * 10}px`, `${22 + Math.random() * 10}px`, `${12 + Math.random() * 10}px`] }}
            transition={{ duration: 0.8 + Math.random() * 0.6, repeat: Infinity, delay: i * 0.05 }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── India Mid-Market animated graph illustration ── */
const SECTORS = [
  { label: "Manufacturing", pct: 72, delay: 0 },
  { label: "BFSI",          pct: 85, delay: 0.1 },
  { label: "Healthcare",    pct: 58, delay: 0.2 },
  { label: "Retail",        pct: 65, delay: 0.3 },
  { label: "Logistics",     pct: 48, delay: 0.4 },
];

function MidMarketGraph() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div
      ref={ref}
      className="relative w-full rounded-xl border border-[#e0e0e0] dark:border-[#e0e0e0]/20 bg-background/50 backdrop-blur-md p-6 overflow-hidden"
      style={{ minHeight: 340 }}
    >
      {/* Background grid dots */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none" aria-hidden>
        <defs>
          <pattern id="mm-dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mm-dots)" />
      </svg>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <div>
          <p className="text-[10px] font-mono tracking-widest text-muted-foreground">INDIA MID-MARKET</p>
          <p className="text-lg font-medium text-foreground mt-0.5">AI Adoption by Sector</p>
        </div>
        <motion.div
          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider border border-border"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "oklch(0.72 0.19 155)" }} />
          LIVE 2026
        </motion.div>
      </div>

      {/* Sector bars */}
      <div className="relative z-10 space-y-4">
        {SECTORS.map((s, i) => (
          <div key={s.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground font-mono">{s.label}</span>
              <motion.span
                className="text-xs font-semibold"
                style={GT}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: s.delay + 0.4 }}
              >
                {s.pct}%
              </motion.span>
            </div>
            <div className="h-2.5 rounded-full bg-border/40 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: BG }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${s.pct}%` } : {}}
                transition={{ duration: 1, delay: s.delay, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Animated trend line SVG */}
      <svg className="relative z-10 w-full mt-6" viewBox="0 0 500 80" fill="none" aria-hidden>
        <defs>
          <linearGradient id="mm-line-grad" x1="0" y1="0" x2="500" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="oklch(0.57 0.22 25)" />
            <stop offset="1" stopColor="oklch(0.52 0.24 292)" />
          </linearGradient>
          <linearGradient id="mm-area-grad" x1="0" y1="0" x2="0" y2="80">
            <stop stopColor="oklch(0.57 0.22 25)" stopOpacity="0.2" />
            <stop offset="1" stopColor="oklch(0.57 0.22 25)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Area fill */}
        <motion.path
          d="M0 70 C60 65, 100 55, 160 48 C220 41, 260 38, 300 28 C340 18, 400 12, 500 5 L500 80 L0 80 Z"
          fill="url(#mm-area-grad)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        />
        {/* Trend line */}
        <motion.path
          d="M0 70 C60 65, 100 55, 160 48 C220 41, 260 38, 300 28 C340 18, 400 12, 500 5"
          stroke="url(#mm-line-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        />
        {/* Data points */}
        {[
          { cx: 0, cy: 70, label: "2020" },
          { cx: 160, cy: 48, label: "2022" },
          { cx: 300, cy: 28, label: "2024" },
          { cx: 500, cy: 5, label: "2026" },
        ].map((p, i) => (
          <g key={i}>
            <motion.circle
              cx={p.cx}
              cy={p.cy}
              r="4"
              fill="oklch(0.57 0.22 25)"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.6 + i * 0.2 }}
            />
            <motion.text
              x={p.cx}
              y={p.cy - 10}
              textAnchor="middle"
              className="fill-muted-foreground"
              fontSize="9"
              fontFamily="monospace"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.7 } : {}}
              transition={{ delay: 0.8 + i * 0.2 }}
            >
              {p.label}
            </motion.text>
          </g>
        ))}
      </svg>

      {/* Floating insight badges */}
      <div className="relative z-10 flex flex-wrap gap-2 mt-4">
        {["$500B+ Market", "12% CAGR", "45% AI-Ready", "3x ROI Potential"].map((tag, i) => (
          <motion.span
            key={tag}
            className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono tracking-wider border border-border bg-background/60"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1 + i * 0.1 }}
          >
            <span className="w-1 h-1 rounded-full mr-1.5" style={{ background: i % 2 === 0 ? "oklch(0.57 0.22 25)" : "oklch(0.52 0.24 292)" }} />
            {tag}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function MidMarketPartner() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <Divider />

        {/* Showcase block (asymmetric 2+1 grid from feature-sections demo) */}
        <Reveal delay={0.2}>
          <div className="relative max-w-5xl mx-auto mt-16 px-4">
            <div className="absolute -z-10 size-[400px] -top-10 -left-20 aspect-square rounded-full blur-3xl" style={{ background: "oklch(0.52 0.24 292 / 0.15)" }} />
            <h2 className="font-moralana text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-foreground leading-tight text-left max-w-3xl">
              The AI Partner for<br /><span style={GT}>India's Mid-Market.</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-10">
              <div className="md:col-span-2">
                <MidMarketGraph />
              </div>
              <div className="md:col-span-1">
                <ScalabilityGraph />
                <h3 className="text-2xl leading-tight text-foreground font-medium mt-6">
                  Scalable AI infrastructure with measurable outcomes
                </h3>
                <p className="text-muted-foreground mt-2">
                  From rapid MVPs to enterprise-grade platforms — we own the full delivery lifecycle so you can focus on growth.
                </p>
                <a href="/services" className="group flex items-center gap-2 mt-4 transition" style={{ color: "oklch(0.57 0.22 25)" }}>
                  Explore our services
                  <ArrowUpRight className="size-5 group-hover:translate-x-0.5 transition duration-300" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-5 gap-4">
          {MIDMARKET_STATS.map(({ val, label }, i) => (
            <Reveal key={label} delay={i * 0.06}>
              <div className="p-5 rounded-2xl border border-[#e0e0e0] dark:border-[#e0e0e0]/20 bg-background/50 backdrop-blur-md text-center">
                <motion.p
                  className="text-3xl sm:text-4xl font-light tracking-tight"
                  style={GT}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                >
                  {val}
                </motion.p>
                <p className="text-[11px] font-mono text-muted-foreground mt-1.5 tracking-wide">{label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   2. PROBLEM
══════════════════════════════════════════ */
const PROBLEM_ITEMS = [
  { icon: Clock,          label: "6-month timelines"          },
  { icon: DollarSign,     label: "Billing hours, not outcomes"},
  { icon: Wrench,         label: "AI bolted on"               },
  { icon: Shuffle,        label: "Too many hand-offs"         },
  { icon: TrendingDown,   label: "No prod ownership"          },
  { icon: Puzzle,         label: "Fragmented stack"           },
  { icon: AlertTriangle,  label: "Scope creep"                },
  { icon: EyeOff,         label: "Black-box systems"          },
];

function Problem() {
  return (
    <section className="py-28 px-6 max-w-6xl mx-auto">
      <Divider />
      <div className="pt-16 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* ── Left: Animations & illustrations ── */}
        <div className="space-y-5">
          {/* Minimal: three dots that fail to connect */}
          <div className="rounded-2xl border border-[#e0e0e0] dark:border-[#e0e0e0]/20 bg-background/50 backdrop-blur-md p-5">
            <p className="text-[9px] font-mono tracking-widest text-muted-foreground mb-4">TYPICAL VENDOR PIPELINE</p>
            <div className="flex items-center justify-between px-2">
              {["Spec", "Build", "Ship"].map((step, i) => (
                <div key={step} className="flex flex-col items-center gap-2">
                  <motion.div
                    className="w-10 h-10 rounded-full border flex items-center justify-center"
                    style={{ borderColor: "oklch(0.57 0.22 25 / 0.3)" }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                  >
                    <div className="w-3 h-3 rounded-full" style={{ background: i === 2 ? "oklch(0.52 0.24 292 / 0.4)" : "oklch(0.57 0.22 25 / 0.5)" }} />
                  </motion.div>
                  <span className="text-[9px] font-mono text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>
            {/* Broken dashes between dots */}
            <svg viewBox="0 0 300 10" className="w-full mt-[-32px] mb-4 px-8" aria-hidden>
              <motion.line x1="55" y1="5" x2="135" y2="5" stroke="oklch(0.57 0.22 25 / 0.3)" strokeWidth="1.5" strokeDasharray="4 6" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
              <motion.line x1="165" y1="5" x2="245" y2="5" stroke="oklch(0.52 0.24 292 / 0.3)" strokeWidth="1.5" strokeDasharray="4 6" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
            </svg>
          </div>

          {/* Scrolling problem pills — two rows, opposite directions */}
          <div className="space-y-3 overflow-hidden rounded-2xl border border-[#e0e0e0] dark:border-[#e0e0e0]/20 bg-background/50 backdrop-blur-md py-4">
            {[0, 1].map((row) => {
              const items = row === 0 ? PROBLEM_ITEMS.slice(0, 4) : PROBLEM_ITEMS.slice(4);
              const tripled = [...items, ...items, ...items];
              return (
                <div key={row} className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent" />
                  <motion.div
                    className="flex gap-3 w-max px-2"
                    animate={{ x: row === 0 ? ["0%", "-33.33%"] : ["-33.33%", "0%"] }}
                    transition={{ duration: row === 0 ? 18 : 20, repeat: Infinity, ease: "linear" }}
                  >
                    {tripled.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 shrink-0 rounded-lg border border-border/50 bg-background/60 px-3 py-2"
                      >
                        <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0" style={{ background: "oklch(0.57 0.22 25 / 0.1)" }}>
                          <item.icon className="w-3 h-3" strokeWidth={1.5} style={{ color: "oklch(0.57 0.22 25)" }} />
                        </div>
                        <span className="text-xs font-medium text-foreground whitespace-nowrap">{item.label}</span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Declining efficiency bars — continuously animating */}
          <div className="rounded-2xl border border-[#e0e0e0] dark:border-[#e0e0e0]/20 bg-background/50 backdrop-blur-md p-5">
            <p className="text-[9px] font-mono tracking-widest text-muted-foreground mb-3">DELIVERY EFFICIENCY</p>
            <div className="flex items-end gap-[5px] h-16">
              {Array.from({ length: 20 }, (_, i) => {
                const maxH = 60 - i * 2.2;
                return (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-t-sm"
                    style={{ background: BG, opacity: 1 - i * 0.035 }}
                    animate={{ height: [`${maxH}%`, `${maxH * 0.5}%`, `${maxH}%`] }}
                    transition={{ duration: 2.5 + i * 0.1, repeat: Infinity, ease: "easeInOut" }}
                  />
                );
              })}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[8px] font-mono text-muted-foreground">MONTH 1</span>
              <span className="text-[8px] font-mono text-muted-foreground">MONTH 12</span>
            </div>
          </div>
        </div>

        {/* ── Right: Title + description ── */}
        <div className="lg:pl-4">
          <Reveal delay={0.1}>
            <Badge variant="outline" className="mb-4 font-mono text-xs tracking-widest">the problem</Badge>
            <h2 className="font-helvetica text-4xl sm:text-5xl font-light tracking-tight text-foreground leading-tight">
              Too Many Vendors.<br />
              Not Enough <span style={GT} className="font-moralana">Outcomes.</span>
            </h2>
            <p className="mt-5 text-base font-light text-muted-foreground leading-relaxed max-w-md">
              Firms take your spec, disappear for months, then hand back something that barely works — broken by design.
            </p>
          </Reveal>
        </div>

      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   3. SOLUTIONS (Feature Grid)
══════════════════════════════════════════ */
const SOLUTIONS = [
  {
    icon: Zap,
    title: "AI-Native by Default",
    desc: "Agents, embeddings, and reasoning loops are designed into the architecture from day one — not bolted on as an afterthought.",
    tags: ["LLM", "Agents", "Embeddings"],
  },
  {
    icon: Layers,
    title: "One Partner, Full Stack",
    desc: "Strategy, design, engineering, QA, and DevOps under one roof. No hand-offs. No blame games. One team, one outcome.",
    tags: ["Strategy", "Build", "Deploy"],
  },
  {
    icon: Rocket,
    title: "Production from Week One",
    desc: "We ship working software in the first sprint. No 6-month discovery. No endless meetings. Just code in production.",
    tags: ["Sprint", "CI/CD", "Live"],
  },
  {
    icon: Eye,
    title: "Observable Systems",
    desc: "Every action, decision, and workflow is logged, reviewable, and auditable. No black boxes — ever.",
    tags: ["Transparent", "Auditable", "Governed"],
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    desc: "Systems run in your infrastructure. Your data never leaves your control. SOC2-aligned delivery from sprint one.",
    tags: ["SOC2", "On-Prem", "Zero-Retention"],
  },
  {
    icon: GitBranch,
    title: "Elastic Scale",
    desc: "Start with a focused pod. Scale to a full engineering org. Our structure adapts to your stage without re-platforming.",
    tags: ["Startup", "Mid-Market", "Enterprise"],
  },
];

function Solutions() {


  return (
    <section className="py-16 md:py-28 px-6 max-w-5xl mx-auto">
      <Divider />
      <div className="pt-16">
        <Reveal>
          <span className="font-mono text-xs tracking-widest text-muted-foreground">how we solve it</span>
          <h2 className="font-helvetica mt-5 text-4xl sm:text-5xl font-light tracking-tight text-foreground">
            The New Physics of<br />
            <span style={GT} className="font-moralana">Software Delivery.</span>
          </h2>
          <p className="mt-4 text-base font-light text-muted-foreground max-w-xl">
            Agentic engineering where AI systems and elite humans work in parallel — compressing months into days.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-6 gap-3">

          {/* ── Card 1 — AI-Native by Default — blob breathing ── */}
          <Card
            className="shine-border col-span-6 lg:col-span-2 overflow-hidden cursor-default bg-background/50 backdrop-blur-md border border-[#e0e0e0] dark:border-[#e0e0e0]/20 ring-0"

          >
            <CardContent className="relative flex flex-col items-center justify-center pt-8 pb-6 gap-4">
              <div className="relative flex h-24 w-40 items-center justify-center">
                <motion.div
                  className="absolute inset-0 rounded-full opacity-20"
                  style={{ background: BG }}
                  animate={{ scale: [1, 1.14, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative flex flex-col items-center gap-1">
                  <Bot className="w-8 h-8 text-muted-foreground" strokeWidth={1.2} />
                  <span className="font-mono text-xs text-muted-foreground tracking-widest">AI FIRST</span>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-center text-foreground">AI-Native by Default</h3>
              <p className="text-sm text-muted-foreground text-center max-w-[200px]">Agents, embeddings, and reasoning loops designed in from day one — not bolted on.</p>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {["LLM", "Agents", "Embeddings"].map(t => <Tag key={t}>{t}</Tag>)}
              </div>
            </CardContent>
          </Card>

          {/* ── Card 2 — One Partner, Full Stack — arc draws in ── */}
          <Card
            className="shine-border col-span-6 sm:col-span-3 lg:col-span-2 overflow-hidden cursor-default bg-background/50 backdrop-blur-md border border-[#e0e0e0] dark:border-[#e0e0e0]/20 ring-0"

          >
            <CardContent className="pt-6">
              <div className="relative mx-auto flex aspect-square size-28 rounded-full border border-border items-center justify-center before:absolute before:-inset-2 before:rounded-full before:border before:border-border/40">
                <div className="flex flex-col items-center gap-1">
                  <Layers className="w-7 h-7 text-muted-foreground" strokeWidth={1.2} />
                  <span className="font-mono text-xs text-muted-foreground tracking-widest">FULL STACK</span>
                </div>
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <motion.circle
                    cx="50" cy="50" r="46"
                    fill="none" stroke="url(#arc-sol)" strokeWidth="3" strokeLinecap="round"
                    initial={{ strokeDasharray: "0 289" }}
                    animate={{ strokeDasharray: ["0 289", "72 217", "0 289"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <defs>
                    <linearGradient id="arc-sol" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="oklch(0.57 0.22 25)"/>
                      <stop offset="100%" stopColor="oklch(0.52 0.24 292)"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="mt-6 space-y-2 text-center">
                <h3 className="text-lg font-semibold text-foreground">One Partner, Full Stack</h3>
                <p className="text-sm text-muted-foreground">Strategy, design, engineering, QA, and DevOps under one roof. No hand-offs. One outcome.</p>
              </div>
              <div className="flex flex-wrap gap-1.5 justify-center mt-4">
                {["Strategy", "Build", "Deploy"].map(t => <Tag key={t}>{t}</Tag>)}
              </div>
            </CardContent>
          </Card>

          {/* ── Card 3 — Production from Week One — velocity chart ── */}
          <Card
            className="shine-border col-span-6 sm:col-span-3 lg:col-span-2 overflow-hidden cursor-default bg-background/50 backdrop-blur-md border border-[#e0e0e0] dark:border-[#e0e0e0]/20 ring-0"

          >
            <CardContent className="pt-6">
              <div className="px-4">
                <svg className="w-full" viewBox="0 0 320 100" fill="none">
                  <defs>
                    <linearGradient id="sol-chart-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.57 0.22 25)" stopOpacity="0.25"/>
                      <stop offset="100%" stopColor="oklch(0.57 0.22 25)" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M0 95 L0 80 C40 75 60 65 90 55 C120 45 140 35 170 28 C200 20 230 14 260 10 C280 7 300 5 320 4 L320 95 Z"
                    fill="url(#sol-chart-fill)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  />
                  <motion.path
                    d="M0 80 C40 75 60 65 90 55 C120 45 140 35 170 28 C200 20 230 14 260 10 C280 7 300 5 320 4"
                    stroke="oklch(0.57 0.22 25)" strokeWidth="2.5" strokeLinecap="round" fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  />
                  {[[0,80],[90,55],[170,28],[320,4]].map(([x,y],i) => (
                    <motion.circle
                      key={i} cx={x} cy={y} r="3.5" fill="oklch(0.57 0.22 25)"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 + i * 0.2 }}
                      style={{ transformOrigin: `${x}px ${y}px` }}
                    />
                  ))}
                  <motion.circle
                    r="3" fill="oklch(0.57 0.22 25)"
                    animate={{ cx: [0, 90, 170, 320], cy: [80, 55, 28, 4], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5, repeatDelay: 0.8 }}
                    style={{ filter: "drop-shadow(0 0 4px oklch(0.57 0.22 25 / 0.6))" }}
                  />
                  {["W1","W2","W3","Now"].map((l,i) => (
                    <text key={l} x={[0,90,170,315][i]} y="98" fontSize="8" fill="currentColor" className="text-muted-foreground" textAnchor={i===3?"end":"middle"}>{l}</text>
                  ))}
                </svg>
              </div>
              <div className="mt-8 space-y-2 text-center">
                <h3 className="text-lg font-semibold text-foreground">Production from Week One</h3>
                <p className="text-sm text-muted-foreground">No 6-month discovery. No endless meetings. Working software ships in the first sprint.</p>
              </div>
              <div className="flex flex-wrap gap-1.5 justify-center mt-4">
                {["Sprint", "CI/CD", "Live"].map(t => <Tag key={t}>{t}</Tag>)}
              </div>
            </CardContent>
          </Card>

          {/* ── Card 4 — Observable Systems — split with log lines ── */}
          <Card
            className="shine-border col-span-6 lg:col-span-3 overflow-hidden cursor-default bg-background/50 backdrop-blur-md border border-[#e0e0e0] dark:border-[#e0e0e0]/20 ring-0"

          >
            <CardContent className="grid sm:grid-cols-2 pt-6 h-full">
              <div className="relative z-10 flex flex-col justify-between space-y-10 lg:space-y-6">
                <motion.div
                  className="relative flex aspect-square size-12 rounded-full border border-border items-center justify-center before:absolute before:-inset-2 before:rounded-full before:border before:border-border/40"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Eye className="size-5 text-muted-foreground" strokeWidth={1.2} />
                </motion.div>
                <div className="space-y-2">
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground">FULL VISIBILITY</span>
                  <h3 className="text-lg font-semibold text-foreground">Observable Systems</h3>
                  <p className="text-sm text-muted-foreground">Every action, decision, and workflow is logged, reviewable, and auditable. No black boxes — ever.</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["Transparent", "Auditable", "Governed"].map(t => <Tag key={t}>{t}</Tag>)}
                  </div>
                </div>
              </div>
              <div className="relative -mb-6 -mr-6 mt-6 sm:ml-6 rounded-tl-xl border-l border-t border-border overflow-hidden bg-muted/30">
                <div className="absolute left-3 top-2 flex gap-1">
                  <span className="block size-2 rounded-full bg-border"/>
                  <span className="block size-2 rounded-full bg-border"/>
                  <span className="block size-2 rounded-full bg-border"/>
                </div>
                <div className="mt-7 px-3 flex flex-col gap-1.5">
                  {[
                    { t: "INFO",  msg: "Agent decision logged",    c: "text-emerald-500" },
                    { t: "AUDIT", msg: "Workflow step recorded",   c: "text-blue-400"   },
                    { t: "INFO",  msg: "API call traced",          c: "text-emerald-500" },
                    { t: "AUDIT", msg: "LLM output stored",        c: "text-blue-400"   },
                    { t: "INFO",  msg: "Context window saved",     c: "text-emerald-500" },
                  ].map(({ t, msg, c }, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2 font-mono text-[10px]"
                      animate={{ opacity: [0, 1, 1, 0], x: [-6, 0, 0, 0] }}
                      transition={{ duration: 3.5, delay: i * 0.5, repeat: Infinity, times: [0, 0.1, 0.85, 1], ease: "easeInOut" }}
                    >
                      <span className={`${c} font-bold shrink-0`}>[{t}]</span>
                      <span className="text-muted-foreground truncate">{msg}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ── Card 5 — Enterprise Security — split with nodes ── */}
          <Card
            className="shine-border col-span-6 lg:col-span-3 overflow-hidden cursor-default bg-background/50 backdrop-blur-md border border-[#e0e0e0] dark:border-[#e0e0e0]/20 ring-0"

          >
            <CardContent className="grid sm:grid-cols-2 pt-6 h-full">
              <div className="relative z-10 flex flex-col justify-between space-y-10 lg:space-y-6">
                <motion.div
                  className="relative flex aspect-square size-12 rounded-full border border-border items-center justify-center before:absolute before:-inset-2 before:rounded-full before:border before:border-border/40"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Shield className="size-5 text-muted-foreground" strokeWidth={1.2} />
                </motion.div>
                <div className="space-y-2">
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground">YOUR INFRA</span>
                  <h3 className="text-lg font-semibold text-foreground">Enterprise-Grade Security</h3>
                  <p className="text-sm text-muted-foreground">Systems run in your infrastructure. Your data never leaves your control. SOC2-aligned from sprint one.</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["SOC2", "On-Prem", "Zero-Retention"].map(t => <Tag key={t}>{t}</Tag>)}
                  </div>
                </div>
              </div>
              <div className="relative mt-6 sm:-my-6 sm:-mr-6">
                <motion.div
                  className="absolute inset-0 mx-auto w-px bg-border"
                  animate={{ scaleY: [0, 1, 1, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", times: [0, 0.2, 0.75, 1] }}
                  style={{ originY: 0 }}
                />
                <div className="relative flex h-full flex-col justify-center space-y-5 py-6">
                  {[
                    { label: "Data Encrypted",  side: "right" },
                    { label: "SOC2 Aligned",    side: "left"  },
                    { label: "On-Prem Deploy",  side: "right" },
                  ].map(({ label, side }, i) => (
                    <motion.div
                      key={label}
                      className={`relative flex items-center gap-2 ${side === "right" ? "w-[calc(50%+0.875rem)] justify-end" : "ml-[calc(50%-1rem)]"}`}
                      animate={{ opacity: [0, 1, 1, 0], x: [side === "right" ? 16 : -16, 0, 0, side === "right" ? 16 : -16] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.3 + i * 0.2, times: [0, 0.2, 0.75, 1] }}
                    >
                      {side === "left" && (
                        <motion.div
                          className="size-8 rounded-full border border-border flex items-center justify-center ring-4 ring-background bg-background"
                          animate={{ scale: [0, 1, 1, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 + i * 0.2, times: [0, 0.2, 0.75, 1] }}
                        >
                          <Lock className="size-3.5" strokeWidth={1.5} color="url(#brand-grad)" />
                        </motion.div>
                      )}
                      <span className="block h-fit rounded border border-border px-2 py-1 text-xs text-foreground bg-card shadow-sm">{label}</span>
                      {side === "right" && (
                        <motion.div
                          className="size-7 rounded-full border border-border flex items-center justify-center ring-4 ring-background bg-background"
                          animate={{ scale: [0, 1, 1, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 + i * 0.2, times: [0, 0.2, 0.75, 1] }}
                        >
                          <Lock className="size-3" strokeWidth={1.5} color="url(#brand-grad)" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ── Card 6 — Elastic Scale — full width, orbit nodes ── */}
          <Card
            className="shine-border col-span-6 overflow-hidden cursor-default bg-background/50 backdrop-blur-md border border-[#e0e0e0] dark:border-[#e0e0e0]/20 ring-0"

          >
            <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 pt-6 gap-6 items-center">
              <div className="space-y-4">
                <div className="relative flex aspect-square size-12 rounded-full border border-border items-center justify-center before:absolute before:-inset-2 before:rounded-full before:border before:border-border/40">
                  <GitBranch className="size-5 text-muted-foreground" strokeWidth={1.2} />
                </div>
                <div className="space-y-2">
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground">ANY STAGE</span>
                  <h3 className="text-lg font-semibold text-foreground">Elastic Scale</h3>
                  <p className="text-sm text-muted-foreground">Start with a focused pod. Scale to a full engineering org. Our structure adapts to your stage without re-platforming.</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["Startup", "Mid-Market", "Enterprise"].map(t => <Tag key={t}>{t}</Tag>)}
                </div>
              </div>
              <div className="lg:col-span-2 flex items-center justify-center gap-6 py-4">
                {[
                  { label: "Startup Pod",    nodes: 3,  r: 26, borderColor: "oklch(0.57 0.22 25 / 0.5)" },
                  { label: "Growth Team",    nodes: 5,  r: 34, borderColor: "oklch(0.55 0.23 158 / 0.5)" },
                  { label: "Enterprise Org", nodes: 8,  r: 44, borderColor: "oklch(0.52 0.24 292 / 0.5)" },
                ].map(({ label, nodes, r, borderColor }, gi) => {
                  const size = r * 2 + 20;
                  return (
                    <div key={label} className="flex flex-col items-center gap-3">
                      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-dashed"
                          style={{ borderColor }}
                          animate={{ rotate: gi % 2 === 0 ? 360 : -360 }}
                          transition={{ duration: 8 + gi * 3, repeat: Infinity, ease: "linear" }}
                        />
                        <div className="size-6 rounded-full border border-border bg-card flex items-center justify-center">
                          <GitBranch className="size-3 text-muted-foreground" strokeWidth={1.5} />
                        </div>
                        {Array.from({ length: nodes }).map((_, ni) => {
                          const angle = (ni / nodes) * 2 * Math.PI - Math.PI / 2;
                          const x = Math.cos(angle) * r;
                          const y = Math.sin(angle) * r;
                          return (
                            <motion.div
                              key={ni}
                              className="absolute size-2.5 rounded-full"
                              style={{ left: `calc(50% + ${x}px - 5px)`, top: `calc(50% + ${y}px - 5px)`, background: BG }}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.3, delay: 0.1 + ni * 0.08, type: "spring", stiffness: 350 }}
                            />
                          );
                        })}
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground text-center">{label}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   4. SPEED COMPARISON TABLE
══════════════════════════════════════════ */
const COMPARISON_ROWS = [
  { id: "1", phase: "Discovery",    without: "6-week discovery phase",      with: "Day 1: System deep-dive"      },
  { id: "2", phase: "Architecture", without: "Architecture planning",        with: "Day 2: Architecture + plan"   },
  { id: "3", phase: "First Commit", without: "Sprint planning & grooming",   with: "Day 3: First code commits"    },
  { id: "4", phase: "Development",  without: "Development (weeks 8–20)",     with: "Week 1: Working MVP"          },
  { id: "5", phase: "QA",           without: "QA cycle (week 21)",           with: "Week 2: QA + hardening"       },
  { id: "6", phase: "DevOps",       without: "DevOps setup (week 22)",       with: "Week 2: DevOps + deploy"      },
  { id: "7", phase: "Production",   without: "Production (week 24+)",        with: "Week 2: Live in production"   },
];

function SpeedTable() {
  return (
    <section className="py-28 px-6 max-w-4xl mx-auto">
      <Divider />
      <div className="pt-16">
        <Reveal>
          <span className="font-mono text-xs tracking-widest text-muted-foreground">before & after</span>
          <h2 className="font-helvetica mt-5 text-4xl sm:text-5xl font-light tracking-tight text-foreground">
            The <span style={GT} className="font-moralana">radical</span> difference,<br />line by line.
          </h2>
        </Reveal>

        <Reveal delay={0.12} className="mt-14">
          <Accordion type="multiple" defaultValue={["1"]} className="w-full">
            {COMPARISON_ROWS.map((row) => (
              <AccordionItem
                key={row.id}
                value={row.id}
                className="last:border-b"
              >
                <AccordionTrigger className="text-left pl-6 md:pl-14 overflow-hidden text-foreground/20 duration-200 hover:no-underline cursor-pointer -space-y-6 data-[state=open]:space-y-0 data-[state=open]:text-foreground [&>svg]:hidden">
                  <div className="flex flex-1 items-start gap-4">
                    <p className="text-xs font-mono mt-1 shrink-0">{row.id}</p>
                    <h3 className="font-helvetica uppercase text-3xl md:text-5xl font-light tracking-tight">
                      {row.phase}
                    </h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pl-6 md:pl-20">
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <div className="flex-1 flex items-start gap-3 rounded-xl border border-[#e0e0e0] dark:border-[#e0e0e0]/20 bg-background/50 backdrop-blur-md px-4 py-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                      <p className="text-sm text-muted-foreground font-light">{row.without}</p>
                    </div>
                    <div className="flex-1 flex items-start gap-3 rounded-xl px-4 py-3 border" style={{ borderColor: "oklch(0.57 0.22 25 / 0.35)", background: "oklch(0.57 0.22 25 / 0.05)" }}>
                      <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "oklch(0.57 0.22 25)" }} strokeWidth={2.5} />
                      <p className="text-sm font-medium" style={GT}>{row.with}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        {/* Big stat */}
        <Reveal delay={0.2} className="mt-12 text-center">
          <p className="text-[88px] sm:text-[120px] font-black tracking-tighter leading-none" style={GT}>Weeks.</p>
          <p className="text-base font-light text-muted-foreground mt-2">Not months. From problem to production, every time.</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   5. DELIVERY MODEL (Process)
══════════════════════════════════════════ */
const PROCESS = [
  {
    num: "01",
    title: "System Deep Dive",
    desc: "We align on the problem, constraints, and decision flow. Clarify users, data dependencies, and success criteria. No 6-week discovery — we move on Day 1.",
    icon: Code2,
    time: "Day 1",
  },
  {
    num: "02",
    title: "Weekly Delivery",
    desc: "Work progresses in steady weekly sprints with CI/CD, continuous integration, and live demos. Scope adapts without losing momentum.",
    icon: GitBranch,
    time: "Week 1+",
  },
  {
    num: "03",
    title: "Production-Ready Handover",
    desc: "Security, reliability, and operational readiness are built in from the start. Clear documentation, monitoring, and smooth handover.",
    icon: Rocket,
    time: "Week 2",
  },
];

/* ══════════════════════════════════════════
   SCROLL-REVEAL VIDEO COMPARISON
══════════════════════════════════════════ */
function VideoScrollReveal({ beforeSrc, afterSrc, beforeLabel = "Before", afterLabel = "After" }) {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      // Only start progress once the container top reaches the viewport top
      // scrollableDistance = container height - viewport height (the sticky scroll range)
      const scrollable = rect.height - viewH;
      const scrolled = -rect.top; // how far past the top
      const raw = scrollable > 0 ? scrolled / scrollable : 0;
      setProgress(Math.max(0, Math.min(1, raw)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // After video slides up: 100% → 0% as progress goes 0 → 1
  const afterY = (1 - progress) * 100;

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: "150vh" }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center px-6">
        <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-[#e0e0e0] dark:border-[#e0e0e0]/20 shadow-2xl" style={{ aspectRatio: "16/9" }}>
          {/* Before video (always visible underneath) */}
          <video
            src={beforeSrc}
            autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-4 left-5 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-widest text-white bg-black/50 backdrop-blur-sm pointer-events-none z-10">
            {beforeLabel}
          </div>

          {/* After video slides up over the before video */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{ transform: `translateY(${afterY}%)`, transition: "transform 0.05s linear" }}
          >
            <video
              src={afterSrc}
              autoPlay loop muted playsInline
              className="w-full h-full object-cover"
            />
            <div
              className="absolute top-4 left-5 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-widest text-white backdrop-blur-sm pointer-events-none"
              style={{ background: BG }}
            >
              {afterLabel}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   BEFORE & AFTER SECTION
══════════════════════════════════════════ */
const BEFORE_AFTER = [
  { before: "6–12 months to ship", after: "3–6 weeks to production" },
  { before: "AI bolted on post-launch", after: "AI designed into the architecture" },
  { before: "Spec doc → disappear → invoice", after: "Embedded team, accountable outcomes" },
  { before: "Discovery phases eat 30% of budget", after: "We start with code on day one" },
];

function BeforeAfter() {
  return (
    <section className="py-28">
      <div className="px-6 max-w-6xl mx-auto">
        <Divider />
        <div className="pt-16">
          <Reveal>
            <span className="font-mono text-xs tracking-widest text-muted-foreground">the transformation</span>
            <h2 className="font-helvetica mt-5 text-4xl sm:text-5xl font-light tracking-tight text-foreground leading-tight">
              Before &amp; after<br /><span style={GT} className="font-moralana">TechStalwarts.</span>
            </h2>
            <p className="mt-4 text-base font-light text-muted-foreground max-w-lg">
              Scroll to reveal the difference between the old way of building software and the TechStalwarts way.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-14">
        <VideoScrollReveal
          beforeSrc="/images/before.mp4"
          afterSrc="/images/after.mp4"
          beforeLabel="Old way"
          afterLabel="TechStalwarts"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6">

        {/* Comparison table */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {BEFORE_AFTER.map((item, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="flex items-stretch rounded-2xl border border-[#e0e0e0] dark:border-[#e0e0e0]/20 overflow-hidden bg-background/50 backdrop-blur-md">
                <div className="flex-1 px-5 py-4">
                  <p className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest mb-1">Before</p>
                  <p className="text-sm font-light text-muted-foreground line-through decoration-muted-foreground/40">{item.before}</p>
                </div>
                <div className="w-px bg-border shrink-0" />
                <div className="flex-1 px-5 py-4" style={{ background: "oklch(0.57 0.22 25 / 0.05)" }}>
                  <p className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: "oklch(0.57 0.22 25)" }}>After</p>
                  <p className="text-sm font-medium text-foreground">{item.after}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function DeliveryModel() {


  const TEAM = [
    { label: "AI Engineer", side: "right" },
    { label: "Product Lead", side: "left"  },
    { label: "DevOps",       side: "right" },
  ];

  return (
    <section className="py-16 md:py-28 px-6 max-w-5xl mx-auto">
      <Divider />
      <div className="pt-16">
        <Reveal>
          <span className="font-mono text-xs tracking-widest text-muted-foreground">delivery model</span>
          <h2 className="font-helvetica mt-5 text-4xl sm:text-5xl font-light tracking-tight text-foreground">
            Production Speed.<br />
            <span style={GT} className="font-moralana">By Design.</span>
          </h2>
          <p className="mt-4 text-base font-light text-muted-foreground max-w-xl">
            Outcome-driven delivery where AI agents and senior engineers work in parallel — compressing the path from problem to production system.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-6 gap-3">

          {/* ── Card 1 — big stat + breathing blob ── */}
          <Card
            className="col-span-6 lg:col-span-2 overflow-hidden cursor-default bg-background/50 backdrop-blur-md border border-[#e0e0e0] dark:border-[#e0e0e0]/20 ring-0"

          >
            <CardContent className="relative flex flex-col items-center justify-center pt-8 pb-6 gap-4">
              <div className="relative flex h-24 w-56 items-center justify-center">
                <motion.svg
                  className="text-muted-foreground absolute inset-0 size-full opacity-20"
                  viewBox="0 0 254 104" fill="none"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path d="M112.891 97.7022C140.366 97.0802 171.004 94.6715 201.087 87.5116C210.43 85.2881 219.615 82.6412 228.284 78.2473C232.198 76.3179 235.905 73.9942 239.348 71.3124C241.85 69.2557 243.954 66.7571 245.555 63.9408C249.34 57.3235 248.281 50.5341 242.498 45.6109C239.033 42.7237 235.228 40.2703 231.169 38.3054C219.443 32.7209 207.141 28.4382 194.482 25.534C184.013 23.1927 173.358 21.7755 162.64 21.2989C161.376 21.3512 160.113 21.181 158.908 20.796C158.034 20.399 156.857 19.1682 156.962 18.4535C157.115 17.8927 157.381 17.3689 157.743 16.9139C158.104 16.4588 158.555 16.0821 159.067 15.8066C160.14 15.4683 161.274 15.3733 162.389 15.5286C179.805 15.3566 196.626 18.8373 212.998 24.462C220.978 27.2494 228.798 30.4747 236.423 34.1232C240.476 36.1159 244.202 38.7131 247.474 41.8258C254.342 48.2578 255.745 56.9397 251.841 65.4892C249.793 69.8582 246.736 73.6777 242.921 76.6327C236.224 82.0192 228.522 85.4602 220.502 88.2924C205.017 93.7847 188.964 96.9081 172.738 99.2109C153.442 101.949 133.993 103.478 114.506 103.79C91.1468 104.161 67.9334 102.97 45.1169 97.5831C36.0094 95.5616 27.2626 92.1655 19.1771 87.5116C13.839 84.5746 9.1557 80.5802 5.41318 75.7725C-0.54238 67.7259 -1.13794 59.1763 3.25594 50.2827C5.82447 45.3918 9.29572 41.0315 13.4863 37.4319C24.2989 27.5721 37.0438 20.9681 50.5431 15.7272C68.1451 8.8849 86.4883 5.1395 105.175 2.83669C129.045 0.0992292 153.151 0.134761 177.013 2.94256C197.672 5.23215 218.04 9.01724 237.588 16.3889C240.089 17.3418 242.498 18.5197 244.933 19.6446C246.627 20.4387 247.725 21.6695 246.997 23.615C246.455 25.1105 244.814 25.5605 242.63 24.5811C230.322 18.9961 217.233 16.1904 204.117 13.4376C188.761 10.3438 173.2 8.36665 157.558 7.52174C129.914 5.70776 102.154 8.06792 75.2124 14.5228C60.6177 17.8788 46.5758 23.2977 33.5102 30.6161C26.6595 34.3329 20.4123 39.0673 14.9818 44.658C12.9433 46.8071 11.1336 49.1622 9.58207 51.6855C4.87056 59.5336 5.61172 67.2494 11.9246 73.7608C15.2064 77.0494 18.8775 79.925 22.8564 82.3236C31.6176 87.7101 41.3848 90.5291 51.3902 92.5804C70.6068 96.5773 90.0219 97.7419 112.891 97.7022Z" fill="currentColor"/>
                </motion.svg>
                <motion.span
                  className="relative text-5xl font-semibold text-foreground"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  3 Weeks
                </motion.span>
              </div>
              <h3 className="text-2xl font-semibold text-center text-foreground">First Production Deploy</h3>
              <p className="text-sm text-muted-foreground text-center max-w-[200px]">From kickoff to live system — not months, weeks.</p>
            </CardContent>
          </Card>

          {/* ── Card 2 — arc draws in on hover ── */}
          <Card
            className="col-span-6 sm:col-span-3 lg:col-span-2 overflow-hidden cursor-default bg-background/50 backdrop-blur-md border border-[#e0e0e0] dark:border-[#e0e0e0]/20 ring-0"

          >
            <CardContent className="pt-6">
              <div className="relative mx-auto flex aspect-square size-28 rounded-full border border-border items-center justify-center before:absolute before:-inset-2 before:rounded-full before:border before:border-border/40">
                <motion.div
                  className="flex flex-col items-center gap-1"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Code2 className="w-7 h-7 text-muted-foreground" strokeWidth={1.2} />
                  <span className="font-mono text-xs text-muted-foreground tracking-widest">DAY 1</span>
                </motion.div>
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <motion.circle
                    cx="50" cy="50" r="46"
                    fill="none" stroke="url(#arc1)" strokeWidth="3" strokeLinecap="round"
                    animate={{ strokeDasharray: ["0 289", "72 217", "0 289"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <defs>
                    <linearGradient id="arc1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="oklch(0.57 0.22 25)"/>
                      <stop offset="100%" stopColor="oklch(0.52 0.24 292)"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="mt-6 space-y-2 text-center">
                <h3 className="text-lg font-semibold text-foreground">System Deep Dive</h3>
                <p className="text-sm text-muted-foreground">Align on the problem, constraints, and decision flow. We move on Day 1 — no 6-week discovery.</p>
              </div>
            </CardContent>
          </Card>

          {/* ── Card 3 — velocity chart draws on hover ── */}
          <Card
            className="col-span-6 sm:col-span-3 lg:col-span-2 overflow-hidden cursor-default bg-background/50 backdrop-blur-md border border-[#e0e0e0] dark:border-[#e0e0e0]/20 ring-0"

          >
            <CardContent className="pt-6">
              <div className="px-4">
                <svg className="w-full" viewBox="0 0 320 100" fill="none">
                  <defs>
                    <linearGradient id="vel-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.57 0.22 25)" stopOpacity="0.25"/>
                      <stop offset="100%" stopColor="oklch(0.57 0.22 25)" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M0 95 L0 80 C40 75 60 65 90 55 C120 45 140 35 170 28 C200 20 230 14 260 10 C280 7 300 5 320 4 L320 95 Z"
                    fill="url(#vel-fill)"
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", times: [0, 0.2, 0.7, 1] }}
                  />
                  <motion.path
                    d="M0 80 C40 75 60 65 90 55 C120 45 140 35 170 28 C200 20 230 14 260 10 C280 7 300 5 320 4"
                    stroke="oklch(0.57 0.22 25)" strokeWidth="2.5" strokeLinecap="round" fill="none"
                    animate={{ pathLength: [0, 1, 1, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", times: [0, 0.3, 0.7, 1] }}
                  />
                  {[[0,80],[90,55],[170,28],[320,4]].map(([x,y],i) => (
                    <motion.circle
                      key={i} cx={x} cy={y} r="3.5" fill="oklch(0.57 0.22 25)"
                      animate={{ scale: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.15, times: [0, 0.2, 0.7, 1] }}
                      style={{ transformOrigin: `${x}px ${y}px` }}
                    />
                  ))}
                  {["W1","W2","W3","Now"].map((l,i,a) => (
                    <text key={l} x={[0,90,170,315][i]} y="98" fontSize="8" fill="currentColor" className="text-muted-foreground" textAnchor={i===a.length-1?"end":"middle"}>{l}</text>
                  ))}
                </svg>
              </div>
              <div className="mt-8 space-y-2 text-center">
                <h3 className="text-lg font-semibold text-foreground">Weekly Delivery</h3>
                <p className="text-sm text-muted-foreground">Steady sprints with CI/CD, live demos, and scope that adapts without losing momentum.</p>
              </div>
            </CardContent>
          </Card>

          {/* ── Card 4 — production chart draws on hover ── */}
          <Card
            className="col-span-6 lg:col-span-3 overflow-hidden cursor-default bg-background/50 backdrop-blur-md border border-[#e0e0e0] dark:border-[#e0e0e0]/20 ring-0"

          >
            <CardContent className="grid sm:grid-cols-2 pt-6 h-full">
              <div className="relative z-10 flex flex-col justify-between space-y-10 lg:space-y-6">
                <motion.div
                  className="relative flex aspect-square size-12 rounded-full border border-border items-center justify-center before:absolute before:-inset-2 before:rounded-full before:border before:border-border/40"
                  animate={{ rotate: [0, -15, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Rocket className="size-5 text-muted-foreground" strokeWidth={1.2} />
                </motion.div>
                <div className="space-y-2">
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground">WEEK 2+</span>
                  <h3 className="text-lg font-semibold text-foreground">Production-Ready Handover</h3>
                  <p className="text-sm text-muted-foreground">Security, reliability, and operational readiness built in from sprint one — with monitoring, docs, and a smooth handover.</p>
                </div>
              </div>
              <div className="relative -mb-6 -mr-6 mt-6 sm:ml-6 rounded-tl-xl border-l border-t border-border overflow-hidden">
                <div className="absolute left-3 top-2 flex gap-1">
                  <span className="block size-2 rounded-full bg-border"/>
                  <span className="block size-2 rounded-full bg-border"/>
                  <span className="block size-2 rounded-full bg-border"/>
                </div>
                <svg className="w-full mt-4" viewBox="0 0 260 160" fill="none">
                  <defs>
                    <linearGradient id="prod-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.52 0.24 292)" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="oklch(0.52 0.24 292)" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M0 140 L0 110 C30 105 50 95 80 80 C110 65 130 50 160 38 C190 26 220 18 260 12 L260 140 Z"
                    fill="url(#prod-fill)"
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", times: [0, 0.2, 0.7, 1] }}
                  />
                  <motion.path
                    d="M0 110 C30 105 50 95 80 80 C110 65 130 50 160 38 C190 26 220 18 260 12"
                    stroke="oklch(0.52 0.24 292)" strokeWidth="2" strokeLinecap="round" fill="none"
                    animate={{ pathLength: [0, 1, 1, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", times: [0, 0.3, 0.7, 1] }}
                  />
                </svg>
              </div>
            </CardContent>
          </Card>

          {/* ── Card 5 — team bubbles stagger on hover ── */}
          <Card
            className="col-span-6 lg:col-span-3 overflow-hidden cursor-default bg-background/50 backdrop-blur-md border border-[#e0e0e0] dark:border-[#e0e0e0]/20 ring-0"

          >
            <CardContent className="grid sm:grid-cols-2 pt-6 h-full">
              <div className="relative z-10 flex flex-col justify-between space-y-10 lg:space-y-6">
                <motion.div
                  className="relative flex aspect-square size-12 rounded-full border border-border items-center justify-center before:absolute before:-inset-2 before:rounded-full before:border before:border-border/40"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Users className="size-5 text-muted-foreground" strokeWidth={1.2} />
                </motion.div>
                <div className="space-y-2">
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground">EMBEDDED</span>
                  <h3 className="text-lg font-semibold text-foreground">AI Engineers + Senior Builders</h3>
                  <p className="text-sm text-muted-foreground">Your team is never a bench of resources — it's a tight group of engineers who own outcomes alongside you.</p>
                </div>
              </div>
              <div className="relative mt-6 sm:-my-6 sm:-mr-6">
                <motion.div
                  className="absolute inset-0 mx-auto w-px bg-border"
                  animate={{ scaleY: [0, 1, 1, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.15, 0.75, 1] }}
                  style={{ originY: 0 }}
                />
                <div className="relative flex h-full flex-col justify-center space-y-5 py-6">
                  {TEAM.map(({ label, side }, i) => (
                    <motion.div
                      key={label}
                      className={`relative flex items-center gap-2 ${side === "right" ? "w-[calc(50%+0.875rem)] justify-end" : "ml-[calc(50%-1rem)]"}`}
                      animate={{ opacity: [0, 1, 1, 0], x: [side === "right" ? 16 : -16, 0, 0, side === "right" ? 16 : -16] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 + i * 0.2, times: [0, 0.15, 0.75, 1] }}
                    >
                      {side === "left" && (
                        <motion.div
                          className="size-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white ring-4 ring-background"
                          style={{ background: BG }}
                          animate={{ scale: [0, 1, 1.1, 1, 1, 0] }}
                          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 + i * 0.2, times: [0, 0.1, 0.15, 0.2, 0.75, 1] }}
                        >
                          {label[0]}
                        </motion.div>
                      )}
                      <span className="block h-fit rounded border border-border px-2 py-1 text-xs text-foreground bg-card shadow-sm">{label}</span>
                      {side === "right" && (
                        <motion.div
                          className="size-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white ring-4 ring-background"
                          style={{ background: BG }}
                          animate={{ scale: [0, 1, 1.1, 1, 1, 0] }}
                          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 + i * 0.2, times: [0, 0.1, 0.15, 0.2, 0.75, 1] }}
                        >
                          {label[0]}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   6. AI AGENTS
══════════════════════════════════════════ */
function AgentsSection() {
  return (
    <section className="py-28 px-6 max-w-5xl mx-auto">
      <Divider />
      <div className="pt-16">
        <Reveal>
          <span className="font-mono text-xs tracking-widest text-muted-foreground">our system</span>
          <h2 className="font-helvetica mt-5 text-4xl sm:text-5xl font-light tracking-tight text-foreground">
            Our System of<br />
            <span style={GT} className="font-moralana">AI Agents.</span>
          </h2>
          <p className="mt-4 text-base font-light text-muted-foreground max-w-xl">
            Built in-house. They write specs, spin code, run tests, and deploy infra — alongside our AI-native engineers.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <div className="grid md:grid-cols-2 rounded-2xl border border-[#e0e0e0] dark:border-[#e0e0e0]/20 overflow-hidden bg-background/50 backdrop-blur-md">

            {/* ── PM Agent ── */}
            <div className="p-6 sm:p-10 border-b md:border-b-0 md:border-r border-border">
              <span className="text-muted-foreground flex items-center gap-2 text-sm">
                <Bot className="size-4" />
                Product Management Agent
              </span>
              <p className="mt-6 text-2xl font-semibold">Writes specs, breaks tasks, prioritises sprints.</p>
              <div aria-hidden className="mt-8 flex flex-col gap-2">
                {["Define user auth flow", "Prioritise API rate-limiting", "Break checkout into 3 tasks"].map((task, i) => (
                  <motion.div
                    key={task}
                    className="flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2 text-sm"
                    animate={{ opacity: [0, 1, 1, 0], x: [-10, 0, 0, -10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.25, times: [0, 0.15, 0.7, 1] }}
                  >
                    <div className="size-4 rounded flex items-center justify-center shrink-0" style={{ background: BG }}>
                      <Check className="size-2.5 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-muted-foreground">{task}</span>
                  </motion.div>
                ))}
                <motion.div
                  className="flex items-center gap-3 rounded-lg border border-dashed border-border px-3 py-2 text-sm text-muted-foreground/40"
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.75, times: [0, 0.15, 0.7, 1] }}
                >
                  <div className="size-4 rounded border border-border/40 shrink-0" />
                  <span className="animate-pulse">Generating next task…</span>
                </motion.div>
              </div>
            </div>

            {/* ── Code Agent ── */}
            <div className="p-6 sm:p-10 border-b border-border bg-zinc-50 dark:bg-transparent">
              <span className="text-muted-foreground flex items-center gap-2 text-sm">
                <Code2 className="size-4" />
                Code Generation Agent
              </span>
              <p className="mt-6 text-2xl font-semibold">Generates, reviews, and refactors production code.</p>
              <div aria-hidden className="mt-8 rounded-xl border border-[#e0e0e0] dark:border-[#e0e0e0]/20 overflow-hidden bg-background/50 backdrop-blur-md">
                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border">
                  <span className="size-2 rounded-full bg-red-400" />
                  <span className="size-2 rounded-full bg-yellow-400" />
                  <span className="size-2 rounded-full bg-green-400" />
                  <span className="ml-2 font-mono text-[10px] text-muted-foreground">agent.generate.ts</span>
                </div>
                <div className="px-4 py-3 font-mono text-[11px] flex flex-col gap-1">
                  {[
                    { c: "text-blue-400",        l: "async function processPayment(" },
                    { c: "text-muted-foreground", l: "  amount: number," },
                    { c: "text-muted-foreground", l: "  currency: string" },
                    { c: "text-emerald-400",      l: "+ const v = await schema.parse()" },
                    { c: "text-emerald-400",      l: "+ return stripe.charge(v)" },
                  ].map(({ c, l }, i) => (
                    <motion.p key={i} className={c}
                      animate={{ opacity: [0, 1, 1, 0], x: [6, 0, 0, 6] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2, times: [0, 0.15, 0.7, 1] }}
                    >{l}</motion.p>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Stat banner ── */}
            <div className="col-span-full border-b border-border p-10 text-center">
              <p className="font-helvetica text-3xl font-semibold lg:text-5xl">
                <span style={GT} className="font-moralana">4 AI Agents.</span> One Engineering Team.
              </p>
            </div>

            {/* ── QA Agent ── */}
            <div className="p-6 sm:p-10 md:border-r border-border">
              <span className="text-muted-foreground flex items-center gap-2 text-sm">
                <TestTube2 className="size-4" />
                Quality Assurance Agent
              </span>
              <p className="mt-6 text-2xl font-semibold">Automates test coverage, flags regressions instantly.</p>
              <div aria-hidden className="mt-8 flex flex-col gap-3">
                {[
                  { label: "Unit tests",        pass: 142, total: 142 },
                  { label: "Integration tests", pass: 38,  total: 40  },
                  { label: "E2E tests",         pass: 21,  total: 21  },
                ].map(({ label, pass, total }, i) => (
                  <motion.div key={label} className="space-y-1.5"
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2, times: [0, 0.15, 0.7, 1] }}
                  >
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{label}</span>
                      <span className="font-mono" style={pass === total ? GT : {}}>{pass}/{total}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-border overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: BG }}
                        animate={{ width: ["0%", `${(pass / total) * 100}%`, `${(pass / total) * 100}%`, "0%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2, times: [0, 0.2, 0.7, 1] }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── DevOps Agent ── */}
            <div className="p-6 sm:p-10 bg-zinc-50 dark:bg-transparent">
              <span className="text-muted-foreground flex items-center gap-2 text-sm">
                <Rocket className="size-4" />
                DevOps &amp; Infrastructure Agent
              </span>
              <p className="mt-6 text-2xl font-semibold">Provisions infra, runs CI/CD, monitors production.</p>
              <div aria-hidden className="mt-8 flex flex-col gap-2">
                {[
                  { step: "Build",   status: "passed",  time: "1m 12s" },
                  { step: "Test",    status: "passed",  time: "2m 04s" },
                  { step: "Deploy",  status: "running", time: "…"      },
                  { step: "Monitor", status: "pending", time: "—"      },
                ].map(({ step, status, time }, i) => (
                  <motion.div key={step}
                    className="flex items-center gap-3 text-sm"
                    animate={{ opacity: [0, 1, 1, 0], y: [4, 0, 0, 4] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2, times: [0, 0.15, 0.7, 1] }}
                  >
                    <div
                      className={`size-2 rounded-full shrink-0 ${status === "running" ? "animate-pulse" : ""}`}
                      style={status === "passed" ? { background: "oklch(0.62 0.19 145)" } : status === "running" ? { background: BG } : { background: "var(--color-border)" }}
                    />
                    <span className="text-muted-foreground w-16">{step}</span>
                    <span className={`font-mono text-xs ${status === "passed" ? "text-emerald-500" : status === "running" ? "text-blue-400" : "text-muted-foreground/40"}`}>{status}</span>
                    <span className="ml-auto font-mono text-xs text-muted-foreground">{time}</span>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   6b. TECH CAPABILITIES & AI SERVICES (Bento)
══════════════════════════════════════════ */
function TechCapabilities() {
  return (
    <section className="py-16 md:py-28 px-6 max-w-5xl mx-auto">
      <Divider />
      <div className="pt-16">
        <Reveal>
          <span className="font-mono text-xs tracking-widest text-muted-foreground">our tech capabilities</span>
          <h2 className="font-helvetica mt-5 text-4xl sm:text-5xl font-light tracking-tight text-foreground leading-tight">
            What We<br /><span style={GT} className="font-moralana">Build & Deliver.</span>
          </h2>
          <p className="mt-4 text-base font-light text-muted-foreground max-w-xl">
            Three core capabilities. Six production-grade AI services. One team that owns the outcome.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-6 gap-3">

          {/* ── Card 1 — AI Product Engineering (wide) ── */}
          <Card className="col-span-6 lg:col-span-4 overflow-hidden cursor-default bg-background/50 backdrop-blur-md border border-[#e0e0e0] dark:border-[#e0e0e0]/20 ring-0">
            <CardContent className="grid sm:grid-cols-2 pt-6 h-full">
              <div className="relative z-10 flex flex-col justify-between space-y-6">
                <motion.div
                  className="relative flex aspect-square size-12 rounded-full border border-border items-center justify-center before:absolute before:-inset-2 before:rounded-full before:border before:border-border/40"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Layers className="size-5" color="url(#brand-grad)" strokeWidth={1.2} />
                </motion.div>
                <div className="space-y-2">
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground">CAPABILITY 01</span>
                  <h3 className="text-lg font-semibold text-foreground">AI Product Engineering</h3>
                  <p className="text-sm text-muted-foreground">Build AI-native platforms, MVPs, custom agents, and intelligent apps end-to-end.</p>
                </div>
              </div>
              {/* Animated code blocks */}
              <div className="relative mt-6 sm:-my-6 sm:-mr-6 rounded-tl-xl border-l border-t border-border overflow-hidden bg-muted/30">
                <div className="absolute left-3 top-2 flex gap-1">
                  <span className="block size-2 rounded-full bg-border" />
                  <span className="block size-2 rounded-full bg-border" />
                  <span className="block size-2 rounded-full bg-border" />
                </div>
                <div className="px-4 py-8 mt-2 font-mono text-[11px] flex flex-col gap-1.5">
                  {[
                    { c: "text-blue-400", l: "import { Agent } from '@ts/core'" },
                    { c: "text-muted-foreground", l: "" },
                    { c: "text-emerald-400", l: "const ai = new Agent({" },
                    { c: "text-muted-foreground", l: "  model: 'gpt-4-turbo'," },
                    { c: "text-muted-foreground", l: "  tools: [search, code, deploy]" },
                    { c: "text-emerald-400", l: "})" },
                  ].map(({ c, l }, i) => (
                    <motion.p key={i} className={c}
                      animate={{ opacity: [0, 1, 1, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.25, times: [0, 0.15, 0.7, 1] }}
                    >{l || "\u00A0"}</motion.p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ── Card 2 — AI Agents & Automation (tall) ── */}
          <Card className="col-span-6 sm:col-span-3 lg:col-span-2 overflow-hidden cursor-default bg-background/50 backdrop-blur-md border border-[#e0e0e0] dark:border-[#e0e0e0]/20 ring-0">
            <CardContent className="pt-6">
              <div className="relative mx-auto flex aspect-square size-28 rounded-full border border-border items-center justify-center before:absolute before:-inset-2 before:rounded-full before:border before:border-border/40">
                <motion.div
                  className="flex flex-col items-center gap-1"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Bot className="w-7 h-7" color="url(#brand-grad)" strokeWidth={1.2} />
                  <span className="font-mono text-xs text-muted-foreground tracking-widest">AGENTS</span>
                </motion.div>
                {/* Orbiting dots */}
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <motion.circle
                    cx="50" cy="50" r="46"
                    fill="none" stroke="url(#brand-grad)" strokeWidth="1.5" strokeLinecap="round"
                    animate={{ strokeDasharray: ["0 289", "72 217", "144 145", "0 289"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </svg>
              </div>
              <div className="mt-6 space-y-2 text-center">
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground">CAPABILITY 02</span>
                <h3 className="text-lg font-semibold text-foreground">AI Agents & Automation</h3>
                <p className="text-sm text-muted-foreground">Custom agents, agentic workflows, AI-powered ops, and autonomous pipelines.</p>
              </div>
            </CardContent>
          </Card>

          {/* ── Card 3 — LLM & SLM Integration ── */}
          <Card className="col-span-6 sm:col-span-3 lg:col-span-2 overflow-hidden cursor-default bg-background/50 backdrop-blur-md border border-[#e0e0e0] dark:border-[#e0e0e0]/20 ring-0">
            <CardContent className="pt-6">
              <div className="relative mx-auto flex aspect-square size-28 rounded-full border border-border items-center justify-center before:absolute before:-inset-2 before:rounded-full before:border before:border-border/40">
                <GitBranch className="w-7 h-7" color="url(#brand-grad)" strokeWidth={1.2} />
                {/* Pulsing rings */}
                {[0, 1, 2].map((r) => (
                  <motion.div
                    key={r}
                    className="absolute inset-0 rounded-full border"
                    style={{ borderColor: "oklch(0.57 0.22 25 / 0.15)" }}
                    animate={{ scale: [1, 1.6, 1.6], opacity: [0.4, 0, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: r * 1 }}
                  />
                ))}
              </div>
              <div className="mt-6 space-y-2 text-center">
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground">CAPABILITY 03</span>
                <h3 className="text-lg font-semibold text-foreground">LLM & SLM Integration</h3>
                <p className="text-sm text-muted-foreground">Fine-tune, deploy, and manage large & small language models for your domain.</p>
              </div>
            </CardContent>
          </Card>

          {/* ── Card 4 — AI-Powered Product Engineering (wide) ── */}
          <Card className="col-span-6 lg:col-span-4 overflow-hidden cursor-default bg-background/50 backdrop-blur-md border border-[#e0e0e0] dark:border-[#e0e0e0]/20 ring-0">
            <CardContent className="grid sm:grid-cols-2 pt-6 h-full">
              <div className="relative z-10 flex flex-col justify-between space-y-6">
                <motion.div
                  className="relative flex aspect-square size-12 rounded-full border border-border items-center justify-center before:absolute before:-inset-2 before:rounded-full before:border before:border-border/40"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Layers className="size-5" color="url(#brand-grad)" strokeWidth={1.2} />
                </motion.div>
                <div className="space-y-2">
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground">SERVICE 01</span>
                  <h3 className="text-lg font-semibold text-foreground">AI-Powered Product Engineering</h3>
                  <p className="text-sm text-muted-foreground">End-to-end product builds — from architecture to deployment — with AI woven into every layer.</p>
                </div>
              </div>
              {/* Stacking layers animation */}
              <div className="relative mt-6 sm:-my-6 sm:-mr-6 flex items-center justify-center overflow-hidden">
                <div className="relative w-32 h-32">
                  {[0, 1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-lg border"
                      style={{
                        width: `${100 - i * 12}%`,
                        height: "28px",
                        left: `${i * 6}%`,
                        borderColor: `oklch(0.57 0.22 25 / ${0.5 - i * 0.1})`,
                        background: `oklch(0.57 0.22 25 / ${0.08 - i * 0.015})`,
                      }}
                      animate={{ y: [60 + i * 10, 20 + i * 28, 20 + i * 28, 60 + i * 10] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.15, times: [0, 0.25, 0.7, 1] }}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ── Card 5 — AI Agent Development (wide) ── */}
          <Card className="col-span-6 lg:col-span-3 overflow-hidden cursor-default bg-background/50 backdrop-blur-md border border-[#e0e0e0] dark:border-[#e0e0e0]/20 ring-0">
            <CardContent className="grid sm:grid-cols-2 pt-6 h-full">
              <div className="relative z-10 flex flex-col justify-between space-y-6">
                <motion.div
                  className="relative flex aspect-square size-12 rounded-full border border-border items-center justify-center before:absolute before:-inset-2 before:rounded-full before:border before:border-border/40"
                  animate={{ rotate: [0, -10, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Bot className="size-5" color="url(#brand-grad)" strokeWidth={1.2} />
                </motion.div>
                <div className="space-y-2">
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground">SERVICE 02</span>
                  <h3 className="text-lg font-semibold text-foreground">AI Agent Development</h3>
                  <p className="text-sm text-muted-foreground">Purpose-built autonomous agents that handle tasks, make decisions, and integrate into your workflows.</p>
                </div>
              </div>
              {/* Agent network animation */}
              <div className="relative mt-6 sm:-my-6 sm:-mr-6 flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 120 120" className="w-32 h-32">
                  {/* Connection lines */}
                  {[[60,30,30,90],[60,30,90,90],[30,90,90,90]].map(([x1,y1,x2,y2], i) => (
                    <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke="oklch(0.57 0.22 25 / 0.3)" strokeWidth="1"
                      animate={{ opacity: [0, 0.6, 0.6, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3, times: [0, 0.2, 0.7, 1] }}
                    />
                  ))}
                  {/* Nodes */}
                  {[[60,30],[30,90],[90,90]].map(([cx,cy], i) => (
                    <motion.circle key={i} cx={cx} cy={cy} r="8"
                      fill="url(#brand-grad)"
                      animate={{ scale: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.25, times: [0, 0.2, 0.7, 1] }}
                      style={{ transformOrigin: `${cx}px ${cy}px` }}
                    />
                  ))}
                  {/* Labels */}
                  {[["60","22","PM"],["22","98","QA"],["98","98","Dev"]].map(([x,y,t], i) => (
                    <motion.text key={i} x={x} y={y} fontSize="7" fill="currentColor" textAnchor="middle"
                      className="text-muted-foreground font-mono"
                      animate={{ opacity: [0, 1, 1, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 + i * 0.2, times: [0, 0.2, 0.7, 1] }}
                    >{t}</motion.text>
                  ))}
                </svg>
              </div>
            </CardContent>
          </Card>

          {/* ── Card 6 — AI Readiness & Training ── */}
          <Card className="col-span-6 sm:col-span-3 lg:col-span-3 overflow-hidden cursor-default bg-background/50 backdrop-blur-md border border-[#e0e0e0] dark:border-[#e0e0e0]/20 ring-0">
            <CardContent className="pt-6">
              <div className="relative mx-auto flex aspect-square size-28 rounded-full border border-border items-center justify-center before:absolute before:-inset-2 before:rounded-full before:border before:border-border/40">
                <motion.div
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Zap className="w-7 h-7" color="url(#brand-grad)" strokeWidth={1.2} />
                </motion.div>
                {/* Progress arc */}
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <motion.circle
                    cx="50" cy="50" r="46" fill="none" stroke="url(#brand-grad)" strokeWidth="2" strokeLinecap="round"
                    animate={{ strokeDasharray: ["0 289", "217 72", "0 289"] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </svg>
              </div>
              <div className="mt-6 space-y-2 text-center">
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground">SERVICE 03</span>
                <h3 className="text-lg font-semibold text-foreground">AI Readiness & Training</h3>
                <p className="text-sm text-muted-foreground">Upskill your teams with hands-on workshops, assessments, and an AI adoption roadmap.</p>
              </div>
            </CardContent>
          </Card>

          {/* ── Card 7 — Custom Model Training ── */}
          <Card className="col-span-6 sm:col-span-3 lg:col-span-2 overflow-hidden cursor-default bg-background/50 backdrop-blur-md border border-[#e0e0e0] dark:border-[#e0e0e0]/20 ring-0">
            <CardContent className="pt-6">
              <div className="relative mx-auto flex aspect-square size-28 rounded-full border border-border items-center justify-center before:absolute before:-inset-2 before:rounded-full before:border before:border-border/40">
                <Code2 className="w-7 h-7" color="url(#brand-grad)" strokeWidth={1.2} />
                {/* Training pulse rings */}
                {[0, 1, 2].map((r) => (
                  <motion.div
                    key={r}
                    className="absolute inset-0 rounded-full"
                    style={{ border: "1.5px solid oklch(0.52 0.24 292 / 0.2)" }}
                    animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: r * 0.8 }}
                  />
                ))}
              </div>
              <div className="mt-6 space-y-2 text-center">
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground">SERVICE 04</span>
                <h3 className="text-lg font-semibold text-foreground">Custom Model Training</h3>
                <p className="text-sm text-muted-foreground">Fine-tune foundation models on your proprietary data for domain-specific accuracy.</p>
              </div>
            </CardContent>
          </Card>

          {/* ── Card 8 — AI Strategy Consulting (wide) ── */}
          <Card className="col-span-6 sm:col-span-3 lg:col-span-4 overflow-hidden cursor-default bg-background/50 backdrop-blur-md border border-[#e0e0e0] dark:border-[#e0e0e0]/20 ring-0">
            <CardContent className="grid sm:grid-cols-2 pt-6 h-full">
              <div className="relative z-10 flex flex-col justify-between space-y-6">
                <motion.div
                  className="relative flex aspect-square size-12 rounded-full border border-border items-center justify-center before:absolute before:-inset-2 before:rounded-full before:border before:border-border/40"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Eye className="size-5" color="url(#brand-grad)" strokeWidth={1.2} />
                </motion.div>
                <div className="space-y-2">
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground">SERVICE 05</span>
                  <h3 className="text-lg font-semibold text-foreground">AI Strategy Consulting</h3>
                  <p className="text-sm text-muted-foreground">Roadmaps, feasibility studies, and executive workshops to align AI with business outcomes.</p>
                </div>
              </div>
              {/* Radar / scanning animation */}
              <div className="relative mt-6 sm:-my-6 sm:-mr-6 flex items-center justify-center overflow-hidden">
                <div className="relative size-36">
                  {/* Concentric rings */}
                  {[0, 1, 2].map((r) => (
                    <div
                      key={r}
                      className="absolute rounded-full border border-border/30"
                      style={{
                        width: `${(r + 1) * 33}%`,
                        height: `${(r + 1) * 33}%`,
                        top: `${50 - (r + 1) * 16.5}%`,
                        left: `${50 - (r + 1) * 16.5}%`,
                      }}
                    />
                  ))}
                  {/* Scanning sweep */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-px origin-bottom"
                    style={{ height: "50%", background: "linear-gradient(to top, oklch(0.57 0.22 25 / 0.6), transparent)", translateX: "-50%", translateY: "-100%" }}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                  {/* Center dot */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{ background: BG }}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  {/* Blip dots */}
                  {[[25, 30], [70, 45], [40, 75]].map(([x, y], i) => (
                    <motion.div
                      key={i}
                      className="absolute size-2 rounded-full"
                      style={{ left: `${x}%`, top: `${y}%`, background: "oklch(0.57 0.22 25)" }}
                      animate={{ scale: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 + i * 1.2, times: [0, 0.15, 0.6, 1] }}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   6c. AI TRANSFORMATION SUITE (Bento)
══════════════════════════════════════════ */
function TransformationSuite() {
  return (
    <section className="py-16 md:py-28 px-6 max-w-6xl mx-auto">
      <Divider />
      <div className="pt-16 grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16">
        {/* Left — sticky title & description */}
        <div className="lg:sticky lg:top-28 self-start">
          <Reveal>
            <span className="font-mono text-xs tracking-widest text-muted-foreground">ai transformation suite</span>
            <h2 className="font-helvetica mt-5 text-4xl sm:text-5xl font-light tracking-tight text-foreground leading-tight">
              Partner in Your AI<br /><span style={GT} className="font-moralana">Transformation.</span>
            </h2>
            <p className="mt-4 text-base font-light text-muted-foreground max-w-md">
              End-to-end AI products designed for India's mid-market — modular, scalable, and production-ready.
            </p>
          </Reveal>
        </div>

        {/* Right — feature cards */}
        <div>
          <FeaturesSection />
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   6d. AI TOOL & PLATFORM ECOSYSTEM
══════════════════════════════════════════ */
const ECOSYSTEM = [
  { category: "LLM & AI Models", tools: ["OpenAI GPTs", "Claude", "DeepSeek", "Llama 3.1", "Mistral", "Google Gemini", "PaLM-2 (LLM)", "Phi-3 (SLM)"] },
  { category: "AI Frameworks", tools: ["LangChain", "LlamaIndex", "Semantic Kernel", "CrewAI", "AutoGen", "Hugging Face", "Flowise"] },
  { category: "Vector DB & RAG", tools: ["Pinecone", "Weaviate", "Chroma", "Milvus", "FAISS", "Qdrant", "pgvector"] },
  { category: "Cloud & Infra", tools: ["AWS Bedrock", "Azure OpenAI", "Google Vertex AI", "Docker", "Kubernetes", "Terraform"] },
  { category: "Data & Integration", tools: ["PostgreSQL", "MongoDB", "Snowflake", "Apache Kafka", "Redis", "API Gateway"] },
  { category: "Frontend & UI", tools: ["React", "Next.js", "Python / FastAPI", "Streamlit", "Gradio", "Vercel"] },
];

function TechEcosystem() {
  return (
    <section className="py-28 px-6 max-w-6xl mx-auto">
      <Divider />
      <div className="pt-16">
        <Reveal>
          <span className="font-mono text-xs tracking-widest text-muted-foreground">ai tool & platform ecosystem</span>
          <h2 className="font-helvetica mt-5 text-4xl sm:text-5xl font-light tracking-tight text-foreground leading-tight">
            Built on the<br /><span style={GT} className="font-moralana">Best in Class.</span>
          </h2>
          <p className="mt-4 text-base font-light text-muted-foreground max-w-lg">
            End-to-end AI infrastructure powering the client's AI transformation.
          </p>
        </Reveal>

        <div className="mt-14 rounded-2xl border border-[#e0e0e0] dark:border-[#e0e0e0]/20 bg-background/50 backdrop-blur-md overflow-hidden">
          {ECOSYSTEM.map((row, i) => (
            <Reveal key={row.category} delay={i * 0.05}>
              <div className={`grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr] items-start ${i !== ECOSYSTEM.length - 1 ? "border-b border-[#e0e0e0] dark:border-[#e0e0e0]/20" : ""}`}>
                <div className="px-5 py-4 font-mono text-xs tracking-wider text-muted-foreground border-r border-[#e0e0e0] dark:border-[#e0e0e0]/20 h-full flex items-center" style={i === 0 ? GT : {}}>
                  {row.category}
                </div>
                <div className="px-5 py-4 flex flex-wrap gap-2">
                  {row.tools.map((tool) => (
                    <span key={tool} className="inline-flex px-3 py-1.5 rounded-lg border border-[#e0e0e0] dark:border-[#e0e0e0]/20 text-xs font-medium text-foreground bg-background/60">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-6 text-xs text-muted-foreground text-center font-light max-w-2xl mx-auto">
            Stack is modular and vendor-agnostic — we select the best tools based on client's existing infrastructure, security requirements, and scale needs.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   7. TESTIMONIALS
══════════════════════════════════════════ */
const TESTIMONIALS = [
  {
    quote: "Techstalwarts has been an exceptional partner in developing our AI-based Equity Stock Suggestion product. Their expertise surpassed our expectations at every milestone.",
    author: "Sumit Chanda",
    role: "CEO",
    company: "Jarvis Invest",
    tag: "AI Advisory · Fintech",
    avatar: "https://ui-avatars.com/api/?name=Sumit+Chanda&background=dc2626&color=fff&size=96",
  },
  {
    quote: "It's been a pleasure working with the TechStalwarts team. They're fast, responsive, and deliver with precision. We've come to trust them as a go-to team for all things tech.",
    author: "Chavan B",
    role: "Cofounder",
    company: "Strike",
    tag: "Product Engineering",
    avatar: "https://ui-avatars.com/api/?name=Chavan+B&background=7c3aed&color=fff&size=96",
  },
  {
    quote: "Working with TechStalwarts has been an outstanding experience. Consistently exceeding our expectations and going the extra mile to deliver results.",
    author: "Jebu Ittiachen",
    role: "CTO",
    company: "SPRY",
    tag: "Enterprise Platform",
    avatar: "https://ui-avatars.com/api/?name=Jebu+Ittiachen&background=dc2626&color=fff&size=96",
  },
  {
    quote: "The advanced platform they developed has significantly improved the speed and efficiency of our operations, enabling us to streamline tracking, billing, and communication.",
    author: "Soumalya Mukherjee",
    role: "Founder",
    company: "Tan90 Thermal",
    tag: "Supply Chain · B2B",
    avatar: "https://ui-avatars.com/api/?name=Soumalya+Mukherjee&background=7c3aed&color=fff&size=96",
  },
];

function TestimonialSplitText({ text }) {
  return (
    <span className="inline">
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.4, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered]     = useState(false);
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useSpring(mouseX, { damping: 25, stiffness: 150 });
  const cursorY = useSpring(mouseY, { damping: 25, stiffness: 150 });

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);

  const handleNext = () => setActiveIndex((p) => (p + 1) % TESTIMONIALS.length);
  const current = TESTIMONIALS[activeIndex];

  return (
    <section className="py-28 px-6 max-w-6xl mx-auto">
      <Divider />
      <div className="pt-16">
        <Reveal>
          <span className="font-mono text-xs tracking-widest text-muted-foreground">client stories</span>
          <h2 className="font-helvetica mt-5 text-4xl sm:text-5xl font-light tracking-tight text-foreground">
            We Don't Just Claim.<br />
            <span style={GT} className="font-moralana">We Prove.</span>
          </h2>
        </Reveal>

        <div className="mt-14 flex justify-center">
          <div
            ref={containerRef}
            className="relative w-full max-w-xl py-20 px-8"
            style={{ cursor: "none" }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleNext}
          >
            {/* Magnetic cursor */}
            <motion.div
              className="pointer-events-none absolute z-50 mix-blend-difference"
              style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
            >
              <motion.div
                className="rounded-full bg-foreground flex items-center justify-center"
                animate={{ width: isHovered ? 80 : 0, height: isHovered ? 80 : 0, opacity: isHovered ? 1 : 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 200 }}
              >
                <motion.span
                  className="text-background text-xs font-medium tracking-wider uppercase"
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Next
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Index indicator */}
            <motion.div
              className="absolute top-8 right-8 flex items-baseline gap-1 font-mono text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.span
                className="text-2xl font-light text-foreground"
                key={activeIndex}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </motion.span>
              <span className="text-muted-foreground">/</span>
              <span className="text-muted-foreground">{String(TESTIMONIALS.length).padStart(2, "0")}</span>
            </motion.div>

            {/* Stacked avatar previews */}
            <motion.div
              className="absolute top-8 left-8 flex -space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.6 }}
            >
              {TESTIMONIALS.map((t, i) => (
                <motion.div
                  key={i}
                  className={`w-6 h-6 rounded-full border-2 border-background overflow-hidden transition-all duration-300 ${
                    i === activeIndex ? "ring-1 ring-offset-1 ring-offset-background" : "grayscale opacity-50"
                  }`}
                  style={i === activeIndex ? { ringColor: "oklch(0.57 0.22 25)" } : {}}
                  whileHover={{ scale: 1.1, opacity: 1 }}
                >
                  <img src={t.avatar} alt={t.author} className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </motion.div>

            {/* Quote */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  className="text-xl md:text-2xl font-light leading-relaxed tracking-tight text-foreground"
                >
                  <TestimonialSplitText text={current.quote} />
                </motion.blockquote>
              </AnimatePresence>

              {/* Author */}
              <motion.div className="mt-12 relative" layout>
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 shrink-0">
                    <motion.div
                      className="absolute -inset-1.5 rounded-full border border-border"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    {TESTIMONIALS.map((t, i) => (
                      <motion.img
                        key={t.avatar}
                        src={t.avatar}
                        alt={t.author}
                        className="absolute inset-0 w-12 h-12 rounded-full object-cover"
                        animate={{ opacity: i === activeIndex ? 1 : 0, zIndex: i === activeIndex ? 1 : 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      />
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      className="relative pl-4"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-px"
                        style={{ background: BG, originY: 0 }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                      />
                      <span className="block text-sm font-medium text-foreground tracking-wide">{current.author}</span>
                      <span className="block text-xs text-muted-foreground mt-0.5 font-mono uppercase tracking-widest">
                        {current.role} — {current.company}
                      </span>
                      <span className="block text-[10px] text-muted-foreground/50 mt-1 font-mono tracking-widest">{current.tag}</span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Progress bar */}
              <div className="mt-16 h-px bg-border relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0"
                  style={{ background: BG }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${((activeIndex + 1) / TESTIMONIALS.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>

            {/* Hint */}
            <motion.div
              className="absolute bottom-8 left-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0.4 : 0.2 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">Click anywhere to advance</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   8. PROOF / DIFFERENTIATORS
══════════════════════════════════════════ */
const PROOFS = [
  { num: "01", title: "Outcomes, Not Hours", desc: "Fixed weekly outcomes eliminate planning drag and billable-hour friction. You pay for results." },
  { num: "02", title: "AI-Native Engineering", desc: "Senior engineers trained to ship real systems — not experiments. AI is in every line of our workflow." },
  { num: "03", title: "Internal Agent System", desc: "Our agents accelerate specs, code, testing, and deployment simultaneously — not sequentially." },
  { num: "04", title: "Built for Production", desc: "Enterprise constraints — security, compliance, scale — are addressed in sprint one, not after launch." },
];

function Proof() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springCfg = { damping: 25, stiffness: 200 };
  const sx = useSpring(mouseX, springCfg);
  const sy = useSpring(mouseY, springCfg);
  const numberX = useTransform(sx, [-200, 200], [-20, 20]);
  const numberY = useTransform(sy, [-200, 200], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    }
  };

  const goNext = () => setActiveIndex((p) => (p + 1) % PROOFS.length);
  const goPrev = () => setActiveIndex((p) => (p - 1 + PROOFS.length) % PROOFS.length);

  useEffect(() => {
    const t = setInterval(goNext, 6000);
    return () => clearInterval(t);
  }, []);

  const current = PROOFS[activeIndex];

  return (
    <section className="py-28 px-6 max-w-6xl mx-auto">
      <Divider />
      <div className="pt-16">
        <Reveal>
          <span className="font-mono text-xs tracking-widest text-muted-foreground">why us</span>
          <h2 className="font-helvetica mt-5 text-4xl sm:text-5xl font-light tracking-tight text-foreground leading-tight">
            Speed Without<br /><span style={GT} className="font-moralana">Compromising Control.</span>
          </h2>
        </Reveal>

        <div
          ref={containerRef}
          className="relative mt-16 w-full"
          onMouseMove={handleMouseMove}
        >
          {/* Oversized index number */}
          <motion.div
            className="absolute -left-4 top-1/2 -translate-y-1/2 text-[18rem] font-bold text-foreground/[0.03] select-none pointer-events-none leading-none tracking-tighter"
            style={{ x: numberX, y: numberY }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {current.num}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Layout */}
          <div className="relative flex">
            {/* Left vertical sidebar */}
            <div className="flex flex-col items-center justify-center pr-12 border-r border-border">
              <motion.span
                className="text-xs font-mono text-muted-foreground tracking-widest uppercase"
                style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Differentiators
              </motion.span>
              <div className="relative h-28 w-px bg-border mt-8">
                <motion.div
                  className="absolute top-0 left-0 w-full bg-foreground origin-top"
                  animate={{ height: `${((activeIndex + 1) / PROOFS.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 pl-12 py-10">
              {/* Badge */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                  className="mb-8"
                >
                  <span className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground border border-border rounded-full px-3 py-1">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: BG }} />
                    {current.num}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Quote — word-by-word flip-in */}
              <div className="relative mb-12 min-h-[130px]">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={activeIndex}
                    className="text-3xl md:text-4xl font-light text-foreground leading-[1.2] tracking-tight"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {current.desc.split(" ").map((word, i) => (
                      <motion.span
                        key={i}
                        className="inline-block mr-[0.3em]"
                        variants={{
                          hidden: { opacity: 0, y: 20, rotateX: 90 },
                          visible: {
                            opacity: 1, y: 0, rotateX: 0,
                            transition: { duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] },
                          },
                          exit: {
                            opacity: 0, y: -10,
                            transition: { duration: 0.2, delay: i * 0.02 },
                          },
                        }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              {/* Author row */}
              <div className="flex items-end justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex items-center gap-4"
                  >
                    <motion.div
                      className="w-8 h-px bg-foreground"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      style={{ originX: 0 }}
                    />
                    <div>
                      <p className="text-base font-medium text-foreground">{current.title}</p>
                      <p className="text-sm text-muted-foreground">{current.num} — Why us</p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={goPrev}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors duration-200"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.button>
                  <motion.button
                    onClick={goNext}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors duration-200"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom ticker */}
          <div className="mt-16 overflow-hidden opacity-[0.06] pointer-events-none">
            <motion.div
              className="flex whitespace-nowrap text-5xl font-bold tracking-tight text-foreground"
              animate={{ x: [0, -1000] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(10)].map((_, i) => (
                <span key={i} className="mx-8">
                  {PROOFS.map((p) => p.title).join(" • ")} •
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats row */}
        <Reveal delay={0.2} className="mt-12 grid grid-cols-2 sm:grid-cols-5 gap-5">
          {[["$100M+", "Client Valuation"], ["100+", "Projects Delivered"], ["150+", "Engineers & AI Experts"], ["100+", "Enterprise Clients"], ["42%", "Avg Cost Reduction"]].map(([val, lbl]) => (
            <div key={lbl} className="p-6 rounded-2xl border border-[#e0e0e0] dark:border-[#e0e0e0]/20 bg-background/50 backdrop-blur-md text-center">
              <p className="text-3xl font-light tracking-tight" style={GT}>{val}</p>
              <p className="text-xs font-mono text-muted-foreground mt-1 tracking-wide">{lbl}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   9. FAQ
══════════════════════════════════════════ */
const FAQS = [
  { q: "How do you define a Sprint?", a: "A sprint is one week of committed, production-bound delivery. Every sprint ends with working software — not tickets, not docs, not demos. Code that runs." },
  { q: "How is TechStalwarts different from a traditional dev shop?", a: "We build the product, not just the resources. We own outcomes. When something ships broken, that's on us. When you scale, we scale with you. We're your technical co-founder, not a vendor." },
  { q: "What tech stack do you support?", a: "We're stack-agnostic. Our engineers are proficient in Node.js, Python, Go, React, Next.js, Vue, AWS, GCP, Azure, Kubernetes, and all major AI frameworks including LangChain, LlamaIndex, and OpenAI." },
  { q: "Can you integrate with existing enterprise systems?", a: "Yes. We've integrated with SAP, Salesforce, Oracle, and dozens of internal enterprise systems. Security and data governance are addressed from sprint one — not after." },
  { q: "How does pricing work?", a: "Sprint-based for defined scope. Retainer for ongoing engineering. Fixed-cost for clear-scope projects. We'll tell you which model fits before we start — no surprises." },
  { q: "Do you work on fixed-cost projects?", a: "Yes, where scope is clear. For exploratory builds, we prefer milestone-based engagements — it aligns incentives and keeps momentum. We'll tell you which model fits." },
];

/* ── SVG Logo Zoom + Horizontal Scroll Projects ────────────────── */
const SHOWCASE_PROJECTS = [
  { img: "/images/111.jpg", title: "Jarvis", desc: "AI-Powered Investment Advisory" },
  { img: "/images/222.jpg", title: "TransBnk", desc: "Open Finance Infrastructure" },
  { img: "/images/333.jpg", title: "EVJoints", desc: "Unified EV Charging Platform" },
];

function TextZoomReveal() {
  /* ── Part 1: SVG Logo Zoom ── */
  const zoomRef = useRef(null);
  const { scrollYProgress: zoomProgress } = useScroll({
    target: zoomRef,
    offset: ["start start", "end end"],
  });
  const logoScale = useTransform(zoomProgress, [0, 1], [1, 30]);
  const zoomBg    = useTransform(zoomProgress, [0, 0.8, 0.9], ["#000", "#000", "#fff"]);
  const logoFill  = useTransform(zoomProgress, [0, 0.8, 0.9], ["#fff", "#fff", "#000"]);

  /* ── Part 2: Horizontal Scroll Projects ── */
  const hScrollRef = useRef(null);
  const { scrollYProgress: hProgress } = useScroll({
    target: hScrollRef,
    offset: ["start start", "end end"],
  });
  const xPercent = useTransform(hProgress, [0, 1], ["0%", "-66.666%"]);

  return (
    <>
      {/* SVG Logo Zoom Section */}
      <section ref={zoomRef} style={{ height: "200vh", position: "relative" }}>
        <motion.div style={{
          position: "sticky", top: 0, height: "100vh", overflow: "hidden",
          background: zoomBg, display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1800 140"
            style={{
              width: "clamp(320px, 70vw, 1000px)",
              fill: logoFill,
              scale: logoScale,
              willChange: "transform",
            }}
          >
            <text
              x="900" y="110"
              textAnchor="middle"
              style={{
                fontSize: 128,
                fontWeight: 800,
                letterSpacing: "0.12em",
                fontFamily: "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif",
              }}
            >
              TECHSTALWARTS
            </text>
          </motion.svg>
        </motion.div>
      </section>

      {/* Horizontal Scroll Projects Section */}
      <section ref={hScrollRef} style={{ height: "300vw", position: "relative" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
          <motion.div
            style={{
              display: "flex", flexFlow: "row nowrap",
              height: "100%", width: "300vw",
              x: xPercent,
              willChange: "transform",
            }}
          >
            {SHOWCASE_PROJECTS.map((p) => (
              <div key={p.title} style={{ position: "relative", flexShrink: 0, height: "100%", width: "100vw" }}>
                <img
                  src={p.img}
                  alt={p.title}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                  loading="lazy"
                />
                {/* Overlay with title */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
                  display: "flex", flexDirection: "column", justifyContent: "flex-end",
                  padding: "clamp(2rem, 5vw, 4rem)",
                }}>
                  <h3 style={{ color: "white", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.1 }}>
                    {p.title}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(0.875rem, 1.2vw, 1.1rem)", marginTop: 8, letterSpacing: "0.03em", textTransform: "uppercase", fontWeight: 500 }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}

/* ── FAQ Section (standalone) ────────────────────────────────────── */
function FAQSection() {
  return (
    <section className="py-28 px-6 max-w-6xl mx-auto">
      <Divider />
      <div className="pt-16">
        <Reveal>
          <span className="font-mono text-xs tracking-widest text-muted-foreground">faq</span>
          <h2 className="font-helvetica mt-5 text-4xl sm:text-5xl font-light tracking-tight text-foreground">
            Got <span style={GT} className="font-moralana">Questions?</span>
          </h2>
        </Reveal>
        <div className="mt-14">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={String(i)} className="border-b border-border">
                <AccordionTrigger className="py-6 text-left text-base font-semibold text-foreground hover:no-underline [&>svg]:text-muted-foreground">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-sm font-light text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   10. FINAL CTA
══════════════════════════════════════════ */
function ClosingCTA() {
  return (
    <section className="py-36 px-6 max-w-6xl mx-auto">
      <Divider />
      <div className="pt-24 text-center relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[300px] rounded-full"
            style={{ background: "radial-gradient(ellipse, oklch(0.57 0.22 25 / 0.08) 0%, transparent 70%)", filter: "blur(40px)" }} />
        </div>

        <Reveal className="relative z-10">
          <span className="font-mono text-xs text-muted-foreground/40 tracking-widest">welcome to the future</span>
          <h2 className="font-helvetica mt-6 text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-tight text-foreground">
            Welcome to the<br />
            <span style={GT} className="font-moralana">AI-Powered Era</span><br />
            of software delivery.
          </h2>
          <p className="mt-6 text-base font-light text-muted-foreground max-w-md mx-auto">
            Book a free strategy session and get a sprint roadmap, tailored to your goals. We respond within one business day.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-mono font-semibold text-white"
                style={{ background: BG, boxShadow: GLOW }}
              >
                Book a Strategy Call <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            </a>
            <a href="mailto:hello@techstalwarts.com">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-mono font-medium border border-border text-foreground"
              >
                hello@techstalwarts.com
              </motion.button>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function HomePage3() {
  return (
    <div className="relative bg-background text-foreground">
      {/* Global SVG gradient def for icons */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="brand-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.57 0.22 25)" />
            <stop offset="100%" stopColor="oklch(0.52 0.24 292)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Page-wide grid pattern background */}
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="fixed inset-0 z-0 h-full w-full [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] fill-muted-foreground/10 stroke-muted-foreground/20"
      />

      {/* Page-wide gradient blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute right-[-15%] top-[-15%] w-[40%] h-[40%] rounded-full blur-[120px]"
          style={{ background: "oklch(0.57 0.22 25 / 0.25)" }} />
        <div className="absolute left-[-10%] bottom-[-15%] w-[40%] h-[40%] rounded-full blur-[120px]"
          style={{ background: "oklch(0.52 0.24 292 / 0.20)" }} />
      </div>

      <div className="relative z-10">
        <Hero />
        <MidMarketPartner />
        <Problem />
        <Solutions />
        <BeforeAfter />
        <DeliveryModel />
        <AgentsSection />
        <TechCapabilities />
        <TransformationSuite />
        <TechEcosystem />
        <Testimonials />
        <Proof />
        <TextZoomReveal />
        <FAQSection />
        <ClosingCTA />
        <Footer />
      </div>
    </div>
  );
}
