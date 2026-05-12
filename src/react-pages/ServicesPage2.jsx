import { useRef, useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { motion, useInView, useMotionValue, useMotionTemplate, useAnimationFrame } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Cpu, Layers, GitBranch, Bot, MessageSquare, Workflow,
  GraduationCap, Briefcase, Database, Sparkles, Network, Settings,
  RefreshCw, Zap, Code2, CircleDot, Rocket, AppWindow, Palette,
  Shield, Users, Star, TrendingUp, FileText, Check, BarChart3, Lock, Brain,
  ArrowUpRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";

/* ── Brand ──────────────────────────────────────────────────────── */
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

/* ══════════════════════════════════════════
   HERO — Infinite Grid background
══════════════════════════════════════════ */
function HeroGridPattern({ offsetX, offsetY }) {
  return (
    <svg className="w-full h-full">
      <defs>
        <motion.pattern
          id="svc-grid-pattern"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-muted-foreground"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#svc-grid-pattern)" />
    </svg>
  );
}

function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  useAnimationFrame(() => {
    gridOffsetX.set((gridOffsetX.get() + 0.4) % 40);
    gridOffsetY.set((gridOffsetY.get() + 0.4) % 40);
  });

  const maskImage = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background dark:bg-[#171717] pt-20 pb-[60px]"
      onMouseMove={handleMouseMove}
    >
      {/* Faint base grid */}
      <div className="absolute inset-0 z-0 opacity-[0.06]">
        <HeroGridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>

      {/* Cursor-revealed bright grid */}
      <motion.div
        className="absolute inset-0 z-0 opacity-50"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <HeroGridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </motion.div>

      {/* Brand gradient blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute right-[-15%] top-[-15%] w-[40%] h-[40%] rounded-full blur-[120px]"
          style={{ background: "oklch(0.57 0.22 25 / 0.25)" }} />
        <div className="absolute left-[-10%] bottom-[-15%] w-[40%] h-[40%] rounded-full blur-[120px]"
          style={{ background: "oklch(0.52 0.24 292 / 0.20)" }} />
      </div>

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
            Our services
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-moralana text-5xl md:text-7xl font-light leading-[1.06] tracking-tight text-foreground"
        >
          Engineering that<br />
          <span style={GT}>transforms</span> business.
        </motion.h1>

        {/* Sub-heading */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-base sm:text-lg font-light text-muted-foreground max-w-xl leading-relaxed"
        >
          From product engineering and AI agents to model training and team enablement — end-to-end capabilities designed to accelerate your enterprise.
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
              Get Started <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </a>
          <a href="/contact">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg text-sm font-mono font-medium border border-border text-foreground bg-background/60 backdrop-blur-sm"
            >
              Book a Strategy Call
            </motion.button>
          </a>
        </motion.div>

        {/* Service pillars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="pt-4"
        >
          <p className="text-[10px] font-mono text-muted-foreground/40 tracking-widest mb-4 uppercase">What we deliver</p>
          <div className="flex flex-wrap items-center justify-center gap-6 opacity-35">
            {["Product Engineering", "AI Agents", "Team Enablement", "LLM Integration", "Model Training"].map((name) => (
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
   CLOSING CTA — Welcome to the Future
══════════════════════════════════════════ */
function ClosingCTA() {
  return (
    <section className="py-36 px-6 max-w-6xl mx-auto">
      <div className="border-t border-border w-full" />
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

/* ── CountUp ────────────────────────────────────────────────────── */
function CountUp({ end, suffix = "", duration = 1.6 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(ease * end));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─────────────────────────────────────────────────────────────────
   PREMIUM BENTO — AI-Powered Product Engineering (Section 01)
   5 cards · each with unique micro-interaction
   ───────────────────────────────────────────────────────────────── */

/* ── Animation configs ────────────────────────────────────────── */
const cardRest  = { scale: 1 };
const cardHover = { scale: 1.02 };
const cardTransition = { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] };

const containerStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const itemFade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 22 } },
};

/* ── Reusable bento card shell ───────────────────────────────── */
function PremiumCard({ children, title, desc, className = "" }) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={{ rest: cardRest, hover: cardHover }}
      transition={cardTransition}
      className={`relative rounded-2xl bg-white dark:bg-[#252525] overflow-hidden flex flex-col ${className}`}
    >
      <div className="flex-1 p-5 min-h-[180px] flex items-center justify-center">{children}</div>
      <div className="px-5 pb-5 pt-2">
        <h3 className="text-sm font-semibold text-foreground tracking-tight">{title}</h3>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

/* ── 1. AI-Assisted Development (typing + suggestion) ────────── */
function AIAssistedAnim({ inView }) {
  const lines = [
    { num: 1, content: <><span className="text-violet-500">const</span> <span className="text-foreground">agent</span> <span className="text-muted-foreground">=</span> <span className="text-rose-500">new</span> <span className="text-foreground">Agent()</span></> },
    { num: 2, content: <><span className="text-foreground">agent</span><span className="text-muted-foreground">.</span><span className="text-blue-500">train</span><span className="text-muted-foreground">(</span><span className="text-emerald-500">data</span><span className="text-muted-foreground">)</span></> },
    { num: 3, content: <span className="text-muted-foreground/60">// AI suggests:</span> },
  ];
  return (
    <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={containerStagger}
      className="relative w-full h-32 rounded-lg bg-muted/40 border border-border/50 p-3 font-mono text-[10px] leading-[1.6] overflow-hidden"
    >
      {lines.map((l, i) => (
        <motion.div key={i} variants={itemFade} className="flex gap-2">
          <span className="text-muted-foreground/40 select-none">{l.num}</span>
          <span>{l.content}</span>
        </motion.div>
      ))}
      <motion.div variants={itemFade} className="flex gap-2 items-center">
        <span className="text-muted-foreground/40 select-none">4</span>
        <span className="text-foreground">agent</span>
        <span className="text-muted-foreground">.</span>
        <span className="text-blue-500">fineTune</span>
        <span className="text-muted-foreground">()</span>
        <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}
          className="inline-block w-[2px] h-3 bg-rose-500 ml-0.5" />
      </motion.div>

      {/* AI Suggestion popup */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.4, type: "spring", stiffness: 180, damping: 20 }}
        className="absolute bottom-2.5 right-2.5 px-2 py-1 rounded-md bg-rose-500/10 border border-rose-500/30 text-[9px] font-medium text-rose-500 flex items-center gap-1"
      >
        <motion.span animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <Sparkles className="w-2.5 h-2.5" />
        </motion.span>
        AI Suggestion
      </motion.div>
      {/* glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: [0, 0.4, 0] } : {}}
        transition={{ delay: 1.4, duration: 2, repeat: Infinity }}
        className="absolute bottom-1 right-1 w-20 h-8 rounded-full bg-rose-500/30 blur-xl pointer-events-none"
      />
    </motion.div>
  );
}

/* ── 2. Intelligent Architecture (node system) ──────────────── */
function ArchitectureAnim() {
  const nodes = 6;
  return (
    <div className="relative w-full h-32 flex items-center justify-center">
      {/* center pulse */}
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.4, repeat: Infinity }}
        className="absolute w-12 h-12 rounded-full bg-rose-500/30"
      />
      <div className="absolute w-3 h-3 rounded-full bg-rose-500 z-10 shadow-[0_0_20px_rgba(255,77,79,0.6)]" />

      {/* connecting lines */}
      <svg className="absolute w-32 h-32" viewBox="-60 -60 120 120">
        {[...Array(nodes)].map((_, i) => {
          const angle = (i / nodes) * Math.PI * 2;
          const x = Math.cos(angle) * 50;
          const y = Math.sin(angle) * 50;
          return (
            <motion.line
              key={i} x1="0" y1="0" x2={x} y2={y}
              stroke="rgba(255,77,79,0.4)" strokeWidth="0.5"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 2.5, delay: i * 0.2, repeat: Infinity }}
            />
          );
        })}
      </svg>

      {/* orbiting nodes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute w-32 h-32"
      >
        {[...Array(nodes)].map((_, i) => {
          const angle = (i / nodes) * Math.PI * 2;
          const x = Math.cos(angle) * 50;
          const y = Math.sin(angle) * 50;
          return (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-violet-500/80 shadow-[0_0_8px_rgba(124,58,237,0.6)]"
              style={{ left: `calc(50% + ${x}px - 4px)`, top: `calc(50% + ${y}px - 4px)` }}
            />
          );
        })}
      </motion.div>

      {/* floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[3px] h-[3px] rounded-full bg-rose-400/60"
          animate={{
            x: [0, Math.cos(i) * 80, 0],
            y: [0, Math.sin(i * 1.5) * 50, 0],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 4 + i * 0.3, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ── 3. Legacy → Modern transition ──────────────────────────── */
function LegacyModernAnim({ inView }) {
  return (
    <div className="w-full h-32 flex items-center justify-center gap-6">
      {/* Legacy label */}
      <div className="flex flex-col items-center gap-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: [0.35, 0.2, 0.35] } : {}}
          transition={{ delay: 0.2, duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="w-10 h-10 rounded-lg border border-dashed border-muted-foreground/30 flex items-center justify-center"
        >
          <Code2 className="w-4 h-4 text-muted-foreground/40" strokeWidth={1.5} />
        </motion.div>
        <span className="text-[8px] font-semibold text-muted-foreground/50 uppercase tracking-wider">Legacy</span>
      </div>

      {/* Arrow with traveling dot */}
      <div className="relative w-20 h-6 flex items-center">
        <div className="absolute inset-x-0 top-1/2 h-px bg-muted-foreground/20" />
        {inView && (
          <motion.div
            animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.6, times: [0, 0.15, 0.85, 1], repeat: Infinity, repeatDelay: 0.4, ease: "linear" }}
            className="absolute w-1.5 h-1.5 rounded-full -translate-y-1/2 top-1/2"
            style={{ background: BG, boxShadow: "0 0 6px rgba(255,77,79,0.5)" }}
          />
        )}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full p-[1.5px]"
          style={{ background: BG }}
        >
          <div className="w-full h-full rounded-full bg-white dark:bg-[#252525] flex items-center justify-center">
            <RefreshCw className="w-2.5 h-2.5" color="url(#brand-grad)" strokeWidth={2} />
          </div>
        </motion.div>
      </div>

      {/* Modern label */}
      <div className="flex flex-col items-center gap-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: [1, 1.05, 1] } : {}}
          transition={{ delay: 0.5, duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="w-10 h-10 rounded-lg p-[1.5px]"
          style={{ background: BG }}
        >
          <div className="w-full h-full rounded-lg bg-white dark:bg-[#252525] flex items-center justify-center">
            <Zap className="w-4 h-4" color="url(#brand-grad)" strokeWidth={1.8} />
          </div>
        </motion.div>
        <span className="text-[8px] font-semibold uppercase tracking-wider" style={GT}>Modern</span>
      </div>
    </div>
  );
}

/* ── 4. Rapid MVP Delivery (Design/Build/Launch → AI merge → MVP) ── */
function MVPStepperAnim({ inView }) {
  const inputs = [
    { label: "Design", icon: Palette, y: 8 },
    { label: "Build",  icon: Code2,   y: 50 },
    { label: "Launch", icon: Rocket,  y: 92 },
  ];
  const mergeCenter = { x: 122, y: 64 };
  const mvpCenter   = { x: 204, y: 64 };

  /* Dot timing:
     duration 2.4s, delay 1.1 + i*0.2
     arrives merge at delay + 2.4*0.4
     arrives MVP   at delay + 2.4*0.95
     Last dot (i=2): merge ≈ 2.46s, MVP ≈ 3.78s */
  const CENTER_ACTIVATE = 2.5;
  const MVP_ACTIVATE    = 3.8;

  const pct = (v, base) => `${(v / base) * 100}%`;

  return (
    <div className="relative w-full h-32">
      {/* ── SVG layer: lines + flowing dots ──────────────── */}
      <svg
        viewBox="0 0 240 128"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        fill="none"
      >
        <defs>
          <linearGradient id="mvpArrowGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.57 0.22 25)" />
            <stop offset="100%" stopColor="oklch(0.52 0.24 292)" />
          </linearGradient>
        </defs>

        {/* input → merge dashed lines */}
        {inputs.map((n, i) => (
          <motion.line
            key={`l-${i}`}
            x1={64} y1={n.y + 14} x2={mergeCenter.x} y2={mergeCenter.y}
            stroke="currentColor" strokeWidth="0.8"
            className="text-foreground/25"
            strokeDasharray="3 3"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
          />
        ))}

        {/* merge → MVP line */}
        <motion.line
          x1={144} y1={64} x2={172} y2={64}
          stroke="currentColor" strokeWidth="1"
          className="text-foreground/40"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.4 }}
        />

        {/* flowing dots from each input through merge to MVP */}
        {inView && inputs.map((n, i) => (
          <motion.circle
            key={`dot-${i}`}
            r="2.2"
            fill="url(#mvpArrowGrad)"
            animate={{
              cx: [64, mergeCenter.x, mergeCenter.x, mvpCenter.x, mvpCenter.x],
              cy: [n.y + 14, mergeCenter.y, mergeCenter.y, mvpCenter.y, mvpCenter.y],
              opacity: [0, 1, 1, 1, 0],
            }}
            transition={{
              duration: 2.4,
              times: [0, 0.4, 0.5, 0.95, 1],
              delay: 1.1 + i * 0.2,
              repeat: Infinity,
              repeatDelay: 0.4,
              ease: "easeInOut",
            }}
            style={{ filter: "drop-shadow(0 0 3px rgba(255,77,79,0.6))" }}
          />
        ))}
      </svg>

      {/* ── input blocks ── */}
      {inputs.map((n, i) => {
        const Icon = n.icon;
        return (
          <motion.div
            key={n.label}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 220, damping: 22 }}
            className="absolute flex items-center gap-1 px-1.5 rounded-md bg-card border border-border shadow-sm"
            style={{
              left: pct(4, 240), top: pct(n.y, 128),
              width: pct(60, 240), height: pct(28, 128),
            }}
          >
            <Icon className="w-3 h-3 text-rose-500 shrink-0" strokeWidth={2} />
            <span className="text-[10px] font-medium text-foreground whitespace-nowrap">{n.label}</span>
          </motion.div>
        );
      })}

      {/* ── merge block — disabled by default, activates when dots arrive ── */}
      <div
        className="absolute rounded-md overflow-hidden"
        style={{
          left: pct(100, 240), top: pct(50, 128),
          width: pct(44, 240), height: pct(28, 128),
        }}
      >
        {/* disabled base */}
        <div className="absolute inset-0 rounded-md bg-muted border border-border flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
        </div>
        {/* activated overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: CENTER_ACTIVATE, duration: 0.35 }}
          className="absolute inset-0 rounded-md p-[1.5px]"
          style={{ background: BG, boxShadow: "0 4px 18px rgba(255,77,79,0.18)" }}
        >
          <div className="relative w-full h-full rounded-md bg-card flex items-center justify-center overflow-hidden">
            <motion.div
              initial={{ scale: 1, opacity: 0 }}
              animate={inView ? { scale: [1, 1.35, 1], opacity: [0.4, 0, 0.4] } : {}}
              transition={{ delay: CENTER_ACTIVATE, duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-md border-2 border-rose-400/40"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ delay: CENTER_ACTIVATE, duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ delay: CENTER_ACTIVATE, duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="w-3.5 h-3.5" color="url(#brand-grad)" strokeWidth={1.8} />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── MVP block — disabled by default, activates when dots arrive ── */}
      <div
        className="absolute rounded-md overflow-hidden"
        style={{
          left: pct(172, 240), top: pct(50, 128),
          width: pct(64, 240), height: pct(28, 128),
        }}
      >
        {/* disabled base */}
        <div className="absolute inset-0 rounded-md bg-muted border border-border flex items-center justify-center">
          <span className="font-bold tracking-[0.15em] text-[11px] text-muted-foreground/40">MVP</span>
        </div>
        {/* activated overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: MVP_ACTIVATE, duration: 0.5, type: "spring", stiffness: 200, damping: 18 }}
          className="absolute inset-0 rounded-md p-[1.5px]"
          style={{ background: BG }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: [0, 0.5, 0.15, 0.5] } : {}}
            transition={{ delay: MVP_ACTIVATE + 0.1, duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-1 rounded-lg pointer-events-none"
            style={{ background: BG, filter: "blur(10px)" }}
          />
          <div className="relative w-full h-full rounded-md bg-card flex items-center justify-center">
            <span className="font-bold tracking-[0.15em] text-[11px]" style={GT}>MVP</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ── 5. AI-Native Applications (Live system UI) ─────────────── */
function LiveSystemAnim({ inView }) {
  return (
    <div className="relative w-full h-32 rounded-lg bg-muted/30 border border-border/50 p-3 overflow-hidden">
      {/* shimmer */}
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/8 to-transparent skew-x-12"
      />

      {/* Live indicator */}
      <div className="flex items-center gap-1.5 mb-3">
        <motion.div
          animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
        />
        <span className="text-[9px] uppercase tracking-widest text-emerald-600 font-semibold">Live</span>
        <span className="ml-auto text-[9px] text-muted-foreground font-mono">v2.4.1</span>
      </div>

      {/* model tags */}
      <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={containerStagger}
        className="flex flex-wrap gap-1.5"
      >
        {["GPT-4o", "Claude 4", "Llama 3", "Gemini"].map((tag) => (
          <motion.span
            key={tag} variants={itemFade}
            className="text-[9px] px-1.5 py-0.5 rounded border border-border bg-card font-medium"
          >
            {tag}
          </motion.span>
        ))}
      </motion.div>

      {/* Toast */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.4, type: "spring", stiffness: 180, damping: 22 }}
        className="absolute bottom-2.5 right-2.5 px-2 py-1.5 rounded-md bg-card border border-border shadow-lg flex items-center gap-1.5 text-[9px]"
      >
        <Zap className="w-2.5 h-2.5 text-emerald-500 fill-emerald-500" />
        Indexing improved by{" "}
        <span className="font-semibold" style={GT}>3.2x</span>
      </motion.div>
    </div>
  );
}

/* ── Premium Bento Section ───────────────────────────────────── */
function EngineeringBento() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 md:py-28 bg-[#F8F9FB] dark:bg-[#171717]">
      <div className="mx-auto max-w-3xl lg:max-w-5xl px-6">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-12 max-w-2xl"
        >
          <span className="text-xs font-mono text-muted-foreground tracking-widest">01</span>
          <h2 className="font-helvetica text-4xl sm:text-5xl font-light tracking-tight mt-2 text-foreground">
            <span className="font-moralana" style={GT}>AI-Powered</span> Product Engineering.
          </h2>
          <p className="text-muted-foreground mt-4 text-base max-w-xl">
            End-to-end product development with AI embedded into every layer — from architecture to deployment.
          </p>
        </motion.div>

        {/* 5-card bento */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          <PremiumCard
            title="AI-Assisted Development"
            desc="Real-time code suggestions and intelligent autocompletion across every commit."
            className="lg:col-span-2"
          >
            <AIAssistedAnim inView={inView} />
          </PremiumCard>

          <PremiumCard
            title="Intelligent Architecture"
            desc="Self-organizing systems that adapt to load, route traffic, and scale automatically."
            className="lg:col-span-2"
          >
            <ArchitectureAnim />
          </PremiumCard>

          <PremiumCard
            title="Rapid MVP Delivery"
            desc="From discovery to launch in weeks. Ship validated products fast."
            className="lg:col-span-2"
          >
            <MVPStepperAnim inView={inView} />
          </PremiumCard>

          <PremiumCard
            title="Legacy Modernization with AI"
            desc="Incremental migration with zero downtime. Refactor, re-architect, and modernize."
            className="lg:col-span-3"
          >
            <LegacyModernAnim inView={inView} />
          </PremiumCard>

          <PremiumCard
            title="AI-Native Applications"
            desc="Production-ready apps powered by agents, copilots, and adaptive interfaces."
            className="lg:col-span-3"
          >
            <LiveSystemAnim inView={inView} />
          </PremiumCard>
        </div>
      </div>
    </section>
  );
}

/* ── Shared BentoHeader ─────────────────────────────────────────── */
function BentoHeader({ num, gradient, rest, desc, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55 }}
      className="mb-12 max-w-2xl"
    >
      <span className="text-xs font-mono text-muted-foreground tracking-widest">{num}</span>
      <h2 className="font-helvetica text-4xl sm:text-5xl font-light tracking-tight mt-2 text-foreground">
        <span className="font-moralana" style={GT}>{gradient}</span> {rest}
      </h2>
      <p className="text-muted-foreground mt-4 text-base max-w-xl">{desc}</p>
    </motion.div>
  );
}

/* ═════════════════════════════════════════════════════════════════
   SECTION 02 — AI Agent Development & Deployment
   ═════════════════════════════════════════════════════════════════ */

/* 02.1 Multi-Agent Orchestration */
function MultiAgentAnim({ inView }) {
  const workers = [{ y: 18 }, { y: 64 }, { y: 110 }];
  return (
    <div className="relative w-full h-32">
      <svg viewBox="0 0 240 128" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" fill="none">
        {workers.map((w, i) => (
          <motion.line key={i} x1={34} y1={w.y} x2={120} y2={64}
            stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" className="text-foreground/25"
            initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
          />
        ))}
        {inView && workers.map((w, i) => (
          <motion.circle key={`d${i}`} r="2" fill="rgba(255,77,79,0.85)"
            animate={{ cx: [34, 120], cy: [w.y, 64], opacity: [0, 1, 0] }}
            transition={{ duration: 2, delay: 1 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>
      {workers.map((w, i) => (
        <motion.div key={i}
          initial={{ scale: 0, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: i * 0.1, type: "spring", stiffness: 220, damping: 20 }}
          className="absolute w-6 h-6 rounded-md bg-card border border-border shadow-sm flex items-center justify-center"
          style={{ left: `${(22 - 12) / 240 * 100}%`, top: `${(w.y - 12) / 128 * 100}%` }}
        >
          <Bot className="w-3 h-3 text-rose-500" strokeWidth={1.8} />
        </motion.div>
      ))}
      <motion.div
        initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 18 }}
        className="absolute rounded-xl p-[1.5px]"
        style={{
          left: `${(120 - 18) / 240 * 100}%`, top: `${(64 - 18) / 128 * 100}%`,
          width: `${36 / 240 * 100}%`, height: `${36 / 128 * 100}%`,
          background: BG, boxShadow: "0 4px 18px rgba(255,77,79,0.2)",
        }}
      >
        <div className="relative w-full h-full rounded-xl bg-card flex items-center justify-center">
          <Network className="w-4 h-4" color="url(#brand-grad)" strokeWidth={1.8} />
          <motion.div
            animate={inView ? { scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] } : {}}
            transition={{ delay: 0.6, duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-xl border-2 border-rose-400/50"
          />
        </div>
      </motion.div>
    </div>
  );
}

/* 02.2 Autonomous Workflows (kanban) */
function WorkflowKanbanAnim({ inView }) {
  const cols = [
    { label: "Todo",  count: 2, delay: 0.0 },
    { label: "Doing", count: 2, delay: 0.35 },
    { label: "Done",  count: 3, delay: 0.7 },
  ];
  return (
    <div className="w-full h-32 flex gap-2">
      {cols.map((col, ci) => (
        <div key={col.label} className="flex-1 rounded-md bg-muted/40 border border-border/50 p-1.5 relative overflow-hidden">
          <div className="text-[8px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">{col.label}</div>
          {[...Array(col.count)].map((_, ti) => (
            <motion.div key={ti}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + col.delay + ti * 0.12, type: "spring", stiffness: 200, damping: 22 }}
              className="mb-1 h-3 rounded bg-card border border-border/70 shadow-sm relative overflow-hidden"
              style={ci === 2 ? { background: BG, borderColor: "transparent" } : {}}
            >
              {ci === 2 && (
                <motion.div
                  animate={inView ? { x: ["-120%", "220%"] } : {}}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 1.6 + ti * 0.4,
                  }}
                  className="absolute inset-y-0 w-1/3"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)" }}
                />
              )}
            </motion.div>
          ))}
          {ci < 2 && (
            <motion.div
              animate={inView ? { x: [0, 6, 0], opacity: [0.3, 0.9, 0.3] } : {}}
              transition={{ duration: 1.6, repeat: Infinity, delay: 1 + ci * 0.4, ease: "easeInOut" }}
              className="absolute right-1 bottom-1.5 text-rose-500/70"
            >
              <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 5h7m-2-2l2 2-2 2" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" /></svg>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}

/* 02.3 RPA + AI Hybrid (gear + brain merge) */
function HybridRPAAnim({ inView }) {
  return (
    <div className="w-full h-32 flex items-center justify-center gap-2">
      <div className="flex flex-col items-center gap-1">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center"
        >
          <Settings className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
        </motion.div>
        <span className="text-[8px] font-semibold text-muted-foreground uppercase tracking-wider">Rules</span>
      </div>

      <div className="flex flex-col items-center">
        <svg width="40" height="32" viewBox="0 0 40 32" fill="none">
          <motion.path d="M4 8 Q 20 8 20 16" stroke="rgba(255,77,79,0.5)" strokeWidth="1" strokeDasharray="3 2"
            initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ delay: 0.3, duration: 0.6 }} />
          <motion.path d="M36 8 Q 20 8 20 16" stroke="rgba(255,77,79,0.5)" strokeWidth="1" strokeDasharray="3 2"
            initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ delay: 0.3, duration: 0.6 }} />
          <motion.path d="M20 16 L 20 28" stroke="url(#hybrid-grad)" strokeWidth="1.5"
            initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ delay: 0.9, duration: 0.4 }} />
          <defs>
            <linearGradient id="hybrid-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.57 0.22 25)" />
              <stop offset="100%" stopColor="oklch(0.52 0.24 292)" />
            </linearGradient>
          </defs>
        </svg>
        <motion.div
          initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
          className="w-6 h-6 rounded-md p-[1.5px] -mt-1"
          style={{ background: BG, boxShadow: "0 2px 10px rgba(255,77,79,0.25)" }}
        >
          <div className="w-full h-full rounded-md bg-card flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Workflow className="w-3 h-3" color="url(#brand-grad)" strokeWidth={2} />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-10 h-10 rounded-full p-[1.5px]"
          style={{ background: BG, boxShadow: "0 3px 14px rgba(124,58,237,0.2)" }}
        >
          <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
            <Brain className="w-5 h-5" color="url(#brand-grad)" strokeWidth={1.6} />
          </div>
        </motion.div>
        <span className="text-[8px] font-semibold uppercase tracking-wider" style={GT}>AI</span>
      </div>
    </div>
  );
}

/* 02.4 Conversational AI (chat stream) */
function ConversationAnim({ inView }) {
  const CYCLE = 5.2;
  return (
    <div className="relative w-full h-32 rounded-lg bg-muted/30 border border-border/50 p-2.5 flex flex-col gap-1.5 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={inView ? { opacity: [0, 1, 1, 0], x: [10, 0, 0, 0] } : {}}
        transition={{ duration: CYCLE, times: [0, 0.08, 0.92, 1], repeat: Infinity, ease: "easeInOut" }}
        className="self-end max-w-[70%] rounded-lg rounded-br-sm"
        style={{ background: BG, padding: "1.5px" }}
      >
        <div className="bg-card rounded-[7px] rounded-br-[1px] px-2 py-1 text-[9px] text-foreground">
          Summarize Q3 sales data
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: [0, 1, 1, 0] } : {}}
        transition={{ duration: CYCLE, times: [0.15, 0.2, 0.35, 0.4], repeat: Infinity, ease: "easeInOut" }}
        className="self-start flex gap-0.5 px-2 py-1.5 rounded-lg bg-card border border-border"
      >
        {[0, 1, 2].map((i) => (
          <motion.span key={i}
            animate={inView ? { y: [0, -2, 0], opacity: [0.4, 1, 0.4] } : {}}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.12 }}
            className="w-1 h-1 rounded-full bg-muted-foreground"
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={inView ? { opacity: [0, 1, 1, 0], x: [-10, 0, 0, 0] } : {}}
        transition={{ duration: CYCLE, times: [0.42, 0.5, 0.92, 1], repeat: Infinity, ease: "easeInOut" }}
        className="self-start max-w-[80%] text-[9px] text-foreground px-2 py-1 rounded-lg rounded-bl-sm bg-card border border-border shadow-sm"
      >
        Revenue up <span className="font-semibold" style={GT}>32%</span>. Top segment: Enterprise.
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
        className="absolute bottom-1.5 right-1.5 flex items-center gap-1 text-[8px] text-muted-foreground"
      >
        <motion.div animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
          className="w-1 h-1 rounded-full bg-emerald-500" />
        Live
      </motion.div>
    </div>
  );
}

/* 02.5 Agent Analytics (dial + bars) */
function AgentAnalyticsAnim({ inView }) {
  const bars = [48, 72, 55, 88, 66, 92];
  return (
    <div className="w-full h-32 flex items-center gap-4 px-1">
      <div className="relative w-20 h-20 shrink-0">
        <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
          <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="4" fill="none" className="text-muted/60" />
          <motion.circle cx="40" cy="40" r="32" stroke="url(#dial-grad)" strokeWidth="4" fill="none" strokeLinecap="round"
            strokeDasharray="201" initial={{ strokeDashoffset: 201 }}
            animate={inView ? { strokeDashoffset: 201 - 201 * 0.96 } : {}}
            transition={{ delay: 0.3, duration: 1.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          <defs>
            <linearGradient id="dial-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.57 0.22 25)" />
              <stop offset="100%" stopColor="oklch(0.52 0.24 292)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-bold" style={GT}><CountUp end={96} suffix="%" duration={1.3} /></span>
          <span className="text-[8px] text-muted-foreground uppercase tracking-wider">Uptime</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-1.5 min-w-0">
        <div className="flex items-end gap-1 h-12">
          {bars.map((h, i) => (
            <motion.div key={i}
              initial={{ height: 0 }}
              animate={inView ? { height: [`${h}%`, `${Math.max(20, h - 14)}%`, `${Math.min(100, h + 6)}%`, `${h}%`] } : {}}
              transition={{
                delay: 0.5 + i * 0.07,
                duration: 3.2,
                times: [0, 0.35, 0.7, 1],
                repeat: Infinity,
                repeatDelay: 0.4,
                ease: "easeInOut",
              }}
              className="flex-1 rounded-t"
              style={{ background: i === bars.length - 1 ? BG : "rgba(124,58,237,0.35)" }}
            />
          ))}
        </div>
        <div className="flex items-center gap-1 text-[8px] text-muted-foreground">
          <BarChart3 className="w-2.5 h-2.5" />
          <span>Tasks / day</span>
          <span className="ml-auto font-semibold text-foreground"><CountUp end={1248} /></span>
        </div>
      </div>
    </div>
  );
}

/* ── Section 02 wrapper ────────────────────────────────── */
function AgentsBento() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="py-16 md:py-28 bg-gray-50 dark:bg-[#171717]">
      <div className="mx-auto max-w-3xl lg:max-w-5xl px-6">
        <BentoHeader num="02" gradient="AI Agent" rest="Development & Deployment." inView={inView}
          desc="Custom AI agents that automate workflows, orchestrate tasks, and operate autonomously at enterprise scale." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          <PremiumCard title="Multi-Agent Orchestration" desc="Coordinate dozens of specialized agents working in parallel." className="lg:col-span-2">
            <MultiAgentAnim inView={inView} />
          </PremiumCard>
          <PremiumCard title="Autonomous Workflows" desc="Tasks move through stages on their own — no manual hand-off." className="lg:col-span-2">
            <WorkflowKanbanAnim inView={inView} />
          </PremiumCard>
          <PremiumCard title="RPA + AI Hybrid" desc="Rule-based automation fused with reasoning agents." className="lg:col-span-2">
            <HybridRPAAnim inView={inView} />
          </PremiumCard>
          <PremiumCard title="Conversational AI & Chatbots" desc="Production-ready chat experiences across every channel." className="lg:col-span-3">
            <ConversationAnim inView={inView} />
          </PremiumCard>
          <PremiumCard title="Live Agent Analytics" desc="Real-time insights into agent health, throughput, and quality." className="lg:col-span-3">
            <AgentAnalyticsAnim inView={inView} />
          </PremiumCard>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════════════════════════════════════════════
   SECTION 03 — AI Readiness & Team Enablement
   ═════════════════════════════════════════════════════════════════ */

/* 03.1 Structured Learning Paths (skill tree) */
function LearningPathAnim({ inView }) {
  const nodes = ["Basics", "Prompting", "Tooling", "Mastery"];
  return (
    <div className="w-full h-32 flex flex-col justify-center gap-2 px-1">
      {nodes.map((n, i) => (
        <div key={n} className="flex items-center gap-2">
          <motion.div
            initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.2 + i * 0.25, type: "spring", stiffness: 220, damping: 18 }}
            className="w-5 h-5 rounded-full p-[1.5px] shrink-0"
            style={{ background: BG, boxShadow: "0 2px 8px rgba(255,77,79,0.18)" }}
          >
            <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
              <Check className="w-2.5 h-2.5" color="url(#brand-grad)" strokeWidth={3} />
            </div>
          </motion.div>
          <span className="text-[10px] font-medium text-foreground w-16 shrink-0">{n}</span>
          <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
            <motion.div
              initial={{ width: 0 }} animate={inView ? { width: "100%" } : {}}
              transition={{ delay: 0.2 + i * 0.25 + 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="h-full rounded-full relative overflow-hidden" style={{ background: BG }}
            >
              <motion.div
                animate={{ x: ["-100%", "300%"] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 1.4 + i * 0.2 }}
                className="absolute inset-y-0 w-1/3"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)" }}
              />
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* 03.2 AI Fluency Score (ring + stars) */
function FluencyScoreAnim({ inView }) {
  return (
    <div className="w-full h-32 flex items-center justify-center gap-5">
      <div className="relative w-20 h-20 shrink-0">
        <motion.div
          animate={inView ? { scale: [1, 1.06, 1], opacity: [0.25, 0.5, 0.25] } : {}}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
          className="absolute inset-1 rounded-full"
          style={{ background: BG, filter: "blur(10px)" }}
        />
        <svg viewBox="0 0 80 80" className="relative w-full h-full -rotate-90">
          <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="5" fill="none" className="text-muted/60" />
          <motion.circle cx="40" cy="40" r="34" stroke="url(#fluency-grad)" strokeWidth="5" fill="none" strokeLinecap="round"
            strokeDasharray="213" initial={{ strokeDashoffset: 213 }}
            animate={inView ? { strokeDashoffset: 213 - 213 * 0.88 } : {}}
            transition={{ delay: 0.3, duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          <defs>
            <linearGradient id="fluency-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.57 0.22 25)" />
              <stop offset="100%" stopColor="oklch(0.52 0.24 292)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-base font-bold" style={GT}><CountUp end={88} suffix="%" duration={1.5} /></span>
          <span className="text-[8px] text-muted-foreground uppercase tracking-wider">Fluency</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-0.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: [0, 1, 1.18, 1], opacity: 1 } : {}}
              transition={{
                delay: 0.8 + i * 0.1,
                duration: 1.6,
                times: [0, 0.35, 0.7, 1],
                repeat: Infinity,
                repeatDelay: 1.8 + (4 - i) * 0.15,
                ease: "easeInOut",
              }}
            >
              <Star className="w-3 h-3 fill-rose-500 text-rose-500" strokeWidth={0} />
            </motion.div>
          ))}
        </div>
        <div className="text-[9px] text-muted-foreground leading-tight">
          <div className="font-semibold text-foreground">Advanced</div>
          <div>org-wide AI fluency</div>
        </div>
      </div>
    </div>
  );
}

/* 03.3 Playbook Library (card fan) */
function PlaybookFanAnim({ inView }) {
  const cards = [
    { label: "Eng.",    rot: -10, x: -16 },
    { label: "Sales",   rot: -3,  x: -5 },
    { label: "Mktg.",   rot: 4,   x: 6 },
    { label: "Ops.",    rot: 11,  x: 17 },
  ];
  return (
    <div className="relative w-full h-32 flex items-center justify-center">
      {cards.map((c, i) => (
        <motion.div key={c.label}
          initial={{ opacity: 0, y: 20, rotate: 0 }}
          animate={inView ? {
            opacity: 1,
            y: [0, -3, 0],
            rotate: c.rot,
            x: `${c.x * 4}%`,
          } : {}}
          transition={{
            opacity: { delay: 0.25 + i * 0.12, duration: 0.4 },
            rotate: { delay: 0.25 + i * 0.12, type: "spring", stiffness: 180, damping: 20 },
            x: { delay: 0.25 + i * 0.12, type: "spring", stiffness: 180, damping: 20 },
            y: {
              delay: 1.4 + i * 0.15,
              duration: 2.6,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="absolute w-14 h-20 rounded-lg bg-card border border-border shadow-md flex flex-col items-center justify-center gap-1"
          style={{ zIndex: i }}
        >
          <Briefcase className="w-4 h-4 text-rose-500" strokeWidth={1.6} />
          <span className="text-[9px] font-semibold text-foreground">{c.label}</span>
          <div className="flex flex-col gap-0.5 w-8">
            <div className="h-0.5 rounded bg-muted" />
            <div className="h-0.5 rounded bg-muted w-3/4" />
            <div className="h-0.5 rounded bg-muted w-2/3" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* 03.4 Cross-Functional Adoption (expanding rings) */
function TeamNetworkAnim({ inView }) {
  const depts = ["Eng", "Sales", "Ops", "Fin"];
  return (
    <div className="relative w-full h-32 flex items-center justify-center">
      {/* expanding rings */}
      {inView && [0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ scale: [0.3, 1.8], opacity: [0.45, 0] }}
          transition={{ duration: 2.8, delay: i * 0.9, repeat: Infinity, ease: "easeOut" }}
          className="absolute w-14 h-14 rounded-full border"
          style={{ borderColor: "oklch(0.57 0.22 25 / 0.4)" }}
        />
      ))}

      {/* center dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 240, damping: 18 }}
        className="relative z-10 w-6 h-6 rounded-full p-[1.5px]"
        style={{ background: BG }}
      >
        <div className="w-full h-full rounded-full bg-white dark:bg-[#252525] flex items-center justify-center">
          <Users className="w-3 h-3" color="url(#brand-grad)" strokeWidth={2} />
        </div>
      </motion.div>

      {/* department labels orbiting */}
      {depts.map((d, i) => {
        const angle = (i / depts.length) * Math.PI * 2 - Math.PI / 2;
        const rx = 72;
        const ry = 44;
        return (
          <motion.span
            key={d}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: [0, 1, 1, 0.6, 1] } : {}}
            transition={{ delay: 0.6 + i * 0.2, duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute text-[9px] font-semibold text-foreground"
            style={{
              left: `calc(50% + ${Math.cos(angle) * rx}px - 12px)`,
              top: `calc(50% + ${Math.sin(angle) * ry}px - 6px)`,
            }}
          >
            {d}
          </motion.span>
        );
      })}
    </div>
  );
}

/* 03.5 Adoption Velocity (line chart) */
function AdoptionCurveAnim({ inView }) {
  return (
    <div className="relative w-full h-32 rounded-lg bg-muted/30 border border-border/50 p-2.5 overflow-hidden">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
          <TrendingUp className="w-2.5 h-2.5 text-emerald-500" />
          Adoption
        </div>
        <span className="text-[11px] font-bold" style={GT}><CountUp end={88} suffix="%" duration={1.8} /></span>
      </div>
      <svg viewBox="0 0 240 80" preserveAspectRatio="none" className="w-full h-16" fill="none">
        <defs>
          <linearGradient id="curve-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.57 0.22 25)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="oklch(0.52 0.24 292)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="curve-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.57 0.22 25)" />
            <stop offset="100%" stopColor="oklch(0.52 0.24 292)" />
          </linearGradient>
        </defs>
        <motion.path d="M 0 70 Q 60 68 100 52 T 180 24 L 240 12 L 240 80 L 0 80 Z"
          fill="url(#curve-fill)"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1, duration: 0.6 }}
        />
        <motion.path d="M 0 70 Q 60 68 100 52 T 180 24 L 240 12"
          stroke="url(#curve-stroke)" strokeWidth="1.5" fill="none" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
          transition={{ delay: 0.3, duration: 1.4, ease: "easeOut" }}
        />
        {[{ x: 100, y: 52 }, { x: 180, y: 24 }, { x: 240, y: 12 }].map((p, i) => (
          <motion.circle key={i} cx={p.x} cy={p.y} r="2.5" fill="white" stroke="url(#curve-stroke)" strokeWidth="1.5"
            initial={{ scale: 0, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 1.2 + i * 0.15, type: "spring", stiffness: 240, damping: 16 }}
          />
        ))}
        {inView && (
          <>
            <motion.circle cx="240" cy="12" r="4" fill="url(#curve-stroke)"
              animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
              style={{ transformOrigin: "240px 12px" }}
            />
            <motion.circle r="2" fill="url(#curve-stroke)"
              animate={{
                cx: [0, 100, 180, 240],
                cy: [70, 52, 24, 12],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.6,
                delay: 2.2,
                repeat: Infinity,
                repeatDelay: 1.2,
                ease: "easeInOut",
              }}
              style={{ filter: "drop-shadow(0 0 3px rgba(255,77,79,0.7))" }}
            />
          </>
        )}
      </svg>
      <div className="flex justify-between text-[7px] text-muted-foreground uppercase tracking-wider">
        <span>W1</span><span>W4</span><span>W8</span><span>W12</span>
      </div>
    </div>
  );
}

/* ── Section 03 wrapper ────────────────────────────────── */
function ReadinessBento() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="py-16 md:py-28 bg-[#F8F9FB] dark:bg-[#171717]">
      <div className="mx-auto max-w-3xl lg:max-w-5xl px-6">
        <BentoHeader num="03" gradient="AI Readiness" rest="& Team Enablement." inView={inView}
          desc="Prepare every department to adopt AI — from engineering to operations, with structured enablement programs." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          <PremiumCard title="Structured Learning Paths" desc="Role-specific curricula designed for measurable AI fluency." className="lg:col-span-2">
            <LearningPathAnim inView={inView} />
          </PremiumCard>
          <PremiumCard title="AI Fluency Score" desc="Track mastery across teams with a single, honest number." className="lg:col-span-2">
            <FluencyScoreAnim inView={inView} />
          </PremiumCard>
          <PremiumCard title="Department Playbooks" desc="Tailored AI workflows for every function in your org." className="lg:col-span-2">
            <PlaybookFanAnim inView={inView} />
          </PremiumCard>
          <PremiumCard title="Cross-Functional Adoption" desc="Enablement programs that connect every team." className="lg:col-span-3">
            <TeamNetworkAnim inView={inView} />
          </PremiumCard>
          <PremiumCard title="Adoption Velocity" desc="Weekly tracking of org-wide AI uptake and outcomes." className="lg:col-span-3">
            <AdoptionCurveAnim inView={inView} />
          </PremiumCard>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════════════════════════════════════════════
   SECTION 04 — LLM & SLM Integration + Model Training
   ═════════════════════════════════════════════════════════════════ */

/* 04.1 RAG Pipelines (query → docs → answer) */
function RAGPipelineAnim({ inView }) {
  return (
    <div className="relative w-full h-32 flex items-center justify-between px-1">
      <motion.div
        initial={{ opacity: 0, x: -6 }} animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center gap-1"
      >
        <div className="w-6 h-6 rounded-md bg-card border border-border flex items-center justify-center">
          <MessageSquare className="w-3 h-3 text-rose-500" strokeWidth={1.8} />
        </div>
        <span className="text-[8px] font-semibold text-muted-foreground uppercase tracking-wider">Query</span>
      </motion.div>

      <div className="flex flex-col items-center gap-0.5 relative">
        {[0, 1, 2].map((i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 4 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 + i * 0.1, type: "spring", stiffness: 220, damping: 20 }}
            className="w-10 h-3 rounded bg-card border border-border flex items-center px-1 gap-0.5"
            style={i === 1 ? { boxShadow: "0 0 0 1px rgba(255,77,79,0.5), 0 0 12px rgba(255,77,79,0.3)" } : {}}
          >
            <FileText className={`w-2 h-2 ${i === 1 ? "text-rose-500" : "text-muted-foreground"}`} strokeWidth={1.8} />
            <div className={`flex-1 h-0.5 rounded ${i === 1 ? "bg-rose-500/40" : "bg-muted"}`} />
          </motion.div>
        ))}
        <span className="text-[8px] font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">Docs</span>
      </div>

      <motion.div
        initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 1.3, type: "spring", stiffness: 200, damping: 18 }}
        className="flex flex-col items-center gap-1"
      >
        <div className="w-8 h-8 rounded-md p-[1.5px]" style={{ background: BG, boxShadow: "0 3px 12px rgba(255,77,79,0.2)" }}>
          <div className="w-full h-full rounded-md bg-card flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: [0, 8, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-4 h-4" color="url(#brand-grad)" strokeWidth={1.8} />
            </motion.div>
          </div>
        </div>
        <span className="text-[8px] font-semibold uppercase tracking-wider" style={GT}>Answer</span>
      </motion.div>

      <svg viewBox="0 0 240 40" preserveAspectRatio="none" className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-4 pointer-events-none" fill="none">
        <motion.line x1="30" y1="20" x2="100" y2="20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2"
          className="text-foreground/30"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ delay: 0.35, duration: 0.3 }}
        />
        <motion.line x1="140" y1="20" x2="200" y2="20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2"
          className="text-foreground/30"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ delay: 1, duration: 0.3 }}
        />
        {inView && [0, 1].map((i) => (
          <motion.circle key={i} r="1.8" fill="rgba(255,77,79,0.9)"
            animate={{
              cx: [30, 100, 100, 140, 140, 200],
              opacity: [0, 1, 1, 1, 1, 0],
            }}
            transition={{
              duration: 3,
              times: [0, 0.28, 0.38, 0.58, 0.7, 1],
              delay: 1.8 + i * 1.2,
              repeat: Infinity,
              repeatDelay: 0.3,
              ease: "easeInOut",
            }}
            cy={20}
            style={{ filter: "drop-shadow(0 0 2px rgba(255,77,79,0.6))" }}
          />
        ))}
      </svg>
    </div>
  );
}

/* 04.2 Fine-Tuning (loss curve) */
function FineTuneAnim({ inView }) {
  return (
    <div className="relative w-full h-32 rounded-lg bg-muted/30 border border-border/50 p-2.5 overflow-hidden">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[9px] text-muted-foreground">Training loss</span>
        <span className="text-[9px] font-mono text-muted-foreground">
          epoch <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.5 }} className="font-semibold text-foreground">12</motion.span>/12
        </span>
      </div>
      <svg viewBox="0 0 240 70" preserveAspectRatio="none" className="w-full h-16" fill="none">
        <defs>
          <linearGradient id="tune-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.57 0.22 25)" />
            <stop offset="100%" stopColor="oklch(0.52 0.24 292)" />
          </linearGradient>
          <linearGradient id="tune-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.57 0.22 25)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="oklch(0.52 0.24 292)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* grid */}
        {[14, 28, 42, 56].map((y) => (
          <line key={y} x1="0" y1={y} x2="240" y2={y} stroke="currentColor" className="text-border/40" strokeWidth="0.3" strokeDasharray="2 3" />
        ))}
        <motion.path d="M 0 8 Q 30 18 55 28 T 110 46 T 180 58 T 240 62 L 240 70 L 0 70 Z"
          fill="url(#tune-fill)"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.2, duration: 0.6 }}
        />
        <motion.path d="M 0 8 Q 30 18 55 28 T 110 46 T 180 58 T 240 62"
          stroke="url(#tune-stroke)" strokeWidth="1.5" fill="none" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
          transition={{ delay: 0.3, duration: 1.5, ease: "easeOut" }}
        />
        <motion.circle cx="240" cy="62" r="3" fill="url(#tune-stroke)"
          initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 1.7, type: "spring", stiffness: 240, damping: 14 }}
        />
        {inView && (
          <motion.circle cx="240" cy="62" r="4" fill="url(#tune-stroke)"
            animate={{ scale: [1, 2.2, 1], opacity: [0.55, 0, 0.55] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            style={{ transformOrigin: "240px 62px" }}
          />
        )}
      </svg>
      <motion.div
        initial={{ opacity: 0, y: 4 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.8 }}
        className="absolute bottom-1.5 right-1.5 text-[8px] flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 font-semibold"
      >
        <Check className="w-2.5 h-2.5" strokeWidth={3} />
        converged
      </motion.div>
    </div>
  );
}

/* 04.3 Private LLM Deployment (shield + model) */
function PrivateLLMAnim({ inView }) {
  return (
    <div className="relative w-full h-32 flex items-center justify-center">
      <motion.div
        animate={inView ? { scale: [1, 1.25, 1], opacity: [0.4, 0, 0.4] } : {}}
        transition={{ duration: 2.4, repeat: Infinity }}
        className="absolute w-24 h-24 rounded-full bg-rose-500/20 blur-xl"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.2, type: "spring", stiffness: 180, damping: 18 }}
        className="relative"
      >
        <Shield className="w-20 h-20 text-rose-500" strokeWidth={1.2} fill="rgba(255,77,79,0.08)" />
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 pt-2"
        >
          <div className="px-1.5 py-0.5 rounded text-[8px] font-bold text-white" style={{ background: BG }}>LLM</div>
          <Lock className="w-2.5 h-2.5 text-foreground/70" strokeWidth={2} />
        </motion.div>
      </motion.div>

      {/* floating security badges */}
      {["SOC-2", "HIPAA", "GDPR"].map((label, i) => (
        <motion.div key={label}
          initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 + i * 0.15, type: "spring", stiffness: 200, damping: 20 }}
          className="absolute text-[7px] font-semibold text-muted-foreground px-1.5 py-0.5 rounded border border-border bg-card"
          style={{
            top: `${[18, 52, 86][i]}%`,
            right: `${[10, 6, 10][i]}%`,
          }}
        >
          {label}
        </motion.div>
      ))}
    </div>
  );
}

/* 04.4 Multi-Model Support (chips lighting up) */
function MultiModelAnim({ inView }) {
  const models = [
    { name: "GPT-4o",   color: "#10a37f" },
    { name: "Claude 4", color: "#dc8e4a" },
    { name: "Llama 3",  color: "#7c3aed" },
    { name: "Gemini",   color: "#4285f4" },
    { name: "Mistral",  color: "#ff7000" },
  ];
  return (
    <div className="relative w-full h-32 flex items-center justify-center">
      <motion.div initial="hidden" animate={inView ? "show" : "hidden"}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
        className="flex flex-wrap gap-1.5 justify-center max-w-[90%]"
      >
        {models.map((m) => (
          <motion.div key={m.name}
            variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}
            transition={{ type: "spring", stiffness: 240, damping: 16 }}
            className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-card border border-border shadow-sm"
          >
            <motion.span
              animate={{ boxShadow: [`0 0 0 0 ${m.color}00`, `0 0 0 3px ${m.color}30`, `0 0 0 0 ${m.color}00`] }}
              transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: m.color }}
            />
            <span className="text-[9px] font-medium text-foreground">{m.name}</span>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.2 }}
        className="absolute bottom-1 right-1 text-[8px] font-semibold uppercase tracking-wider" style={GT}
      >
        5 providers · 1 API
      </motion.div>
    </div>
  );
}

/* 04.5 Prompt → Streaming Response */
function PromptStreamAnim({ inView }) {
  const tokens = ["Growth", " is", " driven", " by", " product", "-led", " adoption", "."];
  const CYCLE = 4.2;
  const PER = CYCLE / (tokens.length + 4);
  return (
    <div className="relative w-full h-32 rounded-lg bg-muted/40 border border-border/50 p-2.5 font-mono text-[9px] overflow-hidden flex flex-col gap-1.5">
      <motion.div
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
        className="flex items-start gap-1.5"
      >
        <span className="text-rose-500 shrink-0">»</span>
        <span className="text-muted-foreground">Summarize growth drivers…</span>
      </motion.div>
      <div className="flex-1 flex items-start gap-1.5">
        <span className="shrink-0" style={GT}>✦</span>
        <div className="leading-[1.55] text-foreground">
          {tokens.map((t, i) => (
            <motion.span key={i}
              animate={inView ? { opacity: [0, 0, 1, 1, 0] } : {}}
              transition={{
                duration: CYCLE,
                times: [0, (0.4 + i * PER) / CYCLE, (0.45 + i * PER) / CYCLE, 0.9, 1],
                repeat: Infinity,
                delay: 0.4,
                ease: "linear",
              }}
            >{t}</motion.span>
          ))}
          <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.9, repeat: Infinity }}
            className="inline-block w-[2px] h-2.5 ml-0.5 bg-rose-500 align-middle" />
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 6 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.8 }}
        className="absolute bottom-1.5 right-1.5 text-[8px] flex items-center gap-1 px-1.5 py-0.5 rounded bg-card border border-border shadow-sm"
      >
        <motion.span
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Zap className="w-2.5 h-2.5 text-emerald-500" fill="currentColor" />
        </motion.span>
        <span className="font-semibold text-foreground">1.2s</span>
      </motion.div>
    </div>
  );
}

/* ── Section 04 wrapper ────────────────────────────────── */
function ModelsBento() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="py-16 md:py-28 bg-gray-50 dark:bg-[#171717]">
      <div className="mx-auto max-w-3xl lg:max-w-5xl px-6">
        <BentoHeader num="04" gradient="LLM & SLM" rest="Integration + Model Training." inView={inView}
          desc="Integrate, fine-tune, and deploy language models — from cloud APIs to on-premise private deployments." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          <PremiumCard title="RAG Pipelines" desc="Retrieval-augmented systems that ground every answer in your data." className="lg:col-span-2">
            <RAGPipelineAnim inView={inView} />
          </PremiumCard>
          <PremiumCard title="Fine-Tuning & Domain Adaptation" desc="Custom-trained models tuned to your domain and tone." className="lg:col-span-2">
            <FineTuneAnim inView={inView} />
          </PremiumCard>
          <PremiumCard title="Private LLM Deployment" desc="Sovereign deployments behind your firewall — full control, full compliance." className="lg:col-span-2">
            <PrivateLLMAnim inView={inView} />
          </PremiumCard>
          <PremiumCard title="Multi-Model Support" desc="Switch between providers at will — one abstraction layer, zero rewrites." className="lg:col-span-3">
            <MultiModelAnim inView={inView} />
          </PremiumCard>
          <PremiumCard title="Prompt & Response Engineering" desc="Crafted prompts, streaming tokens, and sub-second output." className="lg:col-span-3">
            <PromptStreamAnim inView={inView} />
          </PremiumCard>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═════════════════════════════════════════════════════════════════ */
export default function ServicesPage2() {
  return (
    <div className="bg-background dark:bg-[#171717] text-foreground min-h-screen">
      <Navbar />

      {/* Global gradient def — referenced by all icons via color="url(#brand-grad)" */}
      <svg width="0" height="0" aria-hidden style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="brand-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.57 0.22 25)" />
            <stop offset="100%" stopColor="oklch(0.52 0.24 292)" />
          </linearGradient>
        </defs>
      </svg>

      <HeroSection />

      <EngineeringBento />
      <AgentsBento />
      <ReadinessBento />
      <ModelsBento />

      <ClosingCTA />
      <Footer />
    </div>
  );
}
