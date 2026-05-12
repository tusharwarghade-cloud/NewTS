import { useState, useEffect, useRef, memo, useCallback } from "react";
import Footer from "@/components/Footer";
import { motion, animate, useInView, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SparklesCore from "@/components/SparklesCore";
import { EtherealBeams } from "@/components/ui/ethereal-beams";
import AuroraBg from "@/components/AuroraBg";
import {
  ArrowLeft, ArrowRight, ChevronDown, ChevronLeft, ChevronRight,
  BrainCircuit, Cpu, Bot, FlaskConical, Code2, Building2,
  Sliders, Wand2, Plus, Minus, Users, Briefcase, TrendingUp, DollarSign,
  Rocket, Globe, Mail, Linkedin, Twitter, Github, Star,
  CheckCircle2, Palette, Wrench, BarChart3, Zap,
} from "lucide-react";

/* ─── Brand ────────────────────────────────────────────────────── */
const BG   = "linear-gradient(135deg, oklch(0.57 0.22 25) 0%, oklch(0.52 0.24 292) 100%)";
const GLOW = "0 0 28px color-mix(in oklch, oklch(0.57 0.22 25) 32%, transparent)";
const GT   = { backgroundImage: BG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };

function GradientDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute", overflow: "hidden" }} aria-hidden>
      <defs>
        <linearGradient id="home-icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#DC2626" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function GBadge({ children, dark = true }) {
  return (
    <Badge variant="outline"
      className={`mb-4 rounded-full px-4 text-xs uppercase tracking-widest font-semibold w-fit ${dark ? "border-primary/30 bg-primary/5" : "border-black/20 bg-black/5"}`}
      style={dark ? GT : { backgroundImage: BG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
    >
      {children}
    </Badge>
  );
}

/* ─── Fade-in wrapper ────────────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   1. HERO — Shader / Mesh-gradient animation
═══════════════════════════════════════════════════════════════════ */
function HeroSection({ onPrimary, onSecondary }) {
  const STATS = [
    { icon: Users,      value: "250+",   label: "Engineers & Experts" },
    { icon: Briefcase,  value: "200+",   label: "Platforms Delivered" },
    { icon: TrendingUp, value: "25+",    label: "Startups Scaled" },
    { icon: DollarSign, value: "$150M+", label: "Business Value Created" },
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* ── Background layers ── */}
      <div className="absolute inset-0">
        {/* 1. Base dark fill */}
        <div className="absolute inset-0 bg-background" />

        {/* 2. Ethereal Beams — Three.js noise-displaced light beams */}
        <EtherealBeams
          beamWidth={2.5}
          beamHeight={18}
          beamNumber={15}
          lightColor="#ffffff"
          speed={2.5}
          noiseIntensity={2}
          scale={0.15}
          rotation={43}
        />

        {/* 3. Dark overlay — tones down the beams so text stays readable */}
        <div className="absolute inset-0 pointer-events-none hero-shader-overlay" />

        {/* 4. Brand colour tint (red-purple) blended over the shader */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 20% 40%, color-mix(in oklch, oklch(0.57 0.22 25) 18%, transparent) 0%, transparent 65%)," +
              "radial-gradient(ellipse 55% 45% at 80% 65%, color-mix(in oklch, oklch(0.52 0.24 292) 16%, transparent) 0%, transparent 65%)",
          }}
        />

        {/* 5. Sparkles — twinkling stars on top of the shader */}
        <div className="absolute inset-0 pointer-events-none hero-sparkles">
          <SparklesCore
            particleDensity={100}
            minSize={0.4}
            maxSize={1.4}
            speed={0.7}
            particleColor="#ffffff"
          />
        </div>

        {/* 6. Grid dot overlay */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
          backgroundImage: "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }} />

        {/* 7. Edge vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 85% 65% at 50% 50%, transparent 35%, var(--color-background) 100%)",
        }} />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-28 pb-12 max-w-7xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Badge variant="outline"
            className="mb-6 gap-2 rounded-full px-4 py-1.5 border-primary/30 bg-primary/5 text-xs tracking-wide uppercase font-semibold"
            style={GT}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" style={{ WebkitTextFillColor: "initial" }} />
            Enterprise AI & Software
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-[2rem] sm:text-[2.75rem] lg:text-[4.25rem] font-bold text-foreground leading-[1.04] tracking-tight mb-6 max-w-5xl"
        >
          Build the Systems That<br />
          <span className="brand-text">Power the Next Decade</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="max-w-2xl text-lg text-muted-foreground mb-10 leading-relaxed"
        >
          We build AI-powered platforms and enterprise software that automate operations, accelerate growth, and create measurable business outcomes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.34 }}
          className="flex flex-col sm:flex-row gap-3 mb-20"
        >
          <Button size="lg" className="rounded-full gap-2 group font-semibold text-white border-none"
            style={{ background: BG, boxShadow: GLOW, transition: "box-shadow .25s, transform .2s" }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 48px color-mix(in oklch, oklch(0.57 0.22 25) 55%, transparent)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = GLOW; e.currentTarget.style.transform = "translateY(0)"; }}
            onClick={onPrimary}
          >
            Build Your Platform <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button size="lg" variant="outline"
            className="rounded-full gap-2 border-border bg-card/60 text-foreground hover:bg-secondary hover:border-primary/40"
            onClick={onSecondary}
          >
            Explore Solutions
          </Button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.52 }}
          className="flex flex-wrap justify-center rounded-2xl border border-border overflow-hidden"
        >
          {STATS.map(({ icon: Icon, value, label }, i) => (
            <div key={label} className={`flex items-center gap-3 px-4 sm:px-8 py-4 sm:py-5 bg-card/60 backdrop-blur-sm ${i > 0 ? "border-t sm:border-t-0 sm:border-l border-border" : ""} w-1/2 sm:w-auto`}>
              <Icon className="w-5 h-5 shrink-0" stroke="url(#home-icon-grad)" strokeWidth={1.6} />
              <div>
                <div className="text-2xl font-bold tabular-nums text-white">{value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground/40 text-xs z-10">
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
        <span>Scroll to discover</span>
      </div>
    </div>
  );
}

/* ─── Magic scroll-reveal text ──────────────────────────────────── */

/* Plain word — ghost behind + motion reveal (inherits color from parent) */
function MagicWord({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative inline-block mr-[0.28em]">
      <span style={{ opacity: 0.2 }} aria-hidden>{children}</span>
      <motion.span className="absolute inset-0" style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

/* React element token (e.g. MorphingWord) — just fade in, no ghost */
function MagicElement({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <motion.span className="inline-block mr-[0.28em]" style={{ opacity }}>
      {children}
    </motion.span>
  );
}

/* Accepts a flat array of strings and/or React elements */
function MagicParagraph({ parts, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.2"] });

  // Flatten: strings → split into words, elements → single tokens
  const tokens = [];
  parts.forEach((part) => {
    if (typeof part === "string") {
      part.trim().split(/\s+/).filter(Boolean).forEach((w) => tokens.push({ kind: "word", content: w }));
    } else {
      tokens.push({ kind: "el", content: part });
    }
  });

  return (
    <p ref={ref} className={`flex flex-wrap items-baseline ${className}`}>
      {tokens.map((tok, i) => {
        const start = i / tokens.length;
        const end   = start + 1 / tokens.length;
        return tok.kind === "word"
          ? <MagicWord    key={i} progress={scrollYProgress} range={[start, end]}>{tok.content}</MagicWord>
          : <MagicElement key={i} progress={scrollYProgress} range={[start, end]}>{tok.content}</MagicElement>;
      })}
    </p>
  );
}

/* Convenience wrapper for plain-string paragraphs */
function MagicText({ text, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.2"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end   = start + 1 / words.length;
        return (
          <MagicWord key={i} progress={scrollYProgress} range={[start, end]}>{word}</MagicWord>
        );
      })}
    </p>
  );
}

/* ─── Morphing cursor word ───────────────────────────────────────── */
function MorphingWord({ text, hoverText }) {
  const containerRef = useRef(null);
  const circleRef    = useRef(null);
  const innerRef     = useRef(null);
  const [hovered, setHovered]           = useState(false);
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
  const mouse   = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf     = useRef(null);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setContainerSize({ w: containerRef.current.offsetWidth, h: containerRef.current.offsetHeight });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      current.current.x = lerp(current.current.x, mouse.current.x, 0.15);
      current.current.y = lerp(current.current.y, mouse.current.y, 0.15);
      if (circleRef.current) {
        circleRef.current.style.transform =
          `translate(${current.current.x}px, ${current.current.y}px) translate(-50%, -50%)`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform =
          `translate(${-current.current.x}px, ${-current.current.y}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return (
    <span
      ref={containerRef}
      className="relative inline-block cursor-none select-none"
      onMouseMove={(e) => {
        const r = containerRef.current.getBoundingClientRect();
        mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
      }}
      onMouseEnter={(e) => {
        const r = containerRef.current.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        mouse.current = { x, y };
        current.current = { x, y };
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="brand-text">{text}</span>
      {/* Expanding circle that follows cursor */}
      <span
        ref={circleRef}
        style={{
          position: "absolute", top: 0, left: 0,
          display: "block", borderRadius: "9999px", overflow: "hidden",
          width: hovered ? 110 : 0, height: hovered ? 110 : 0,
          background: BG, pointerEvents: "none", zIndex: 50,
          transition: "width 0.45s cubic-bezier(0.33,1,0.68,1), height 0.45s cubic-bezier(0.33,1,0.68,1)",
          willChange: "transform, width, height",
        }}
      >
        <span
          ref={innerRef}
          style={{
            position: "absolute", top: "50%", left: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            width: containerSize.w, height: containerSize.h,
            willChange: "transform",
          }}
        >
          <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {hoverText}
          </span>
        </span>
      </span>
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   2. ABOUT — Hero Highlight
═══════════════════════════════════════════════════════════════════ */
function AboutSection() {
  return (
    <section className="relative py-16 sm:py-28 border-t border-border overflow-hidden">
      {/* Subtle bg glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 50% at 50% 100%, color-mix(in oklch, oklch(0.52 0.24 292) 6%, transparent) 0%, transparent 70%)"
      }} />
      <div className="page-grid relative">
        <FadeIn className="col-span-10 col-start-2 lg:col-span-8 lg:col-start-3">
          <GBadge>About Techstalwarts</GBadge>
          <MagicParagraph
            parts={[
              "Built on",
              <><MorphingWord text="creativity" hoverText="DESIGN" />,</>,
              <><MorphingWord text="collaboration" hoverText="TOGETHER" />,</>,
              "and",
              <><MorphingWord text="technical excellence" hoverText="PRECISION" />,</>,
              "Techstalwarts is a dynamic team of industry experts committed to achieving exceptionally great results.",
            ]}
            className="text-3xl lg:text-[2.625rem] font-bold text-foreground leading-[1.35] mb-8 tracking-tight"
          />
          <MagicText
            text="We're not just a technology partner — we're co-builders who embed deeply into your vision, your team, and your goals. Every solution we deliver is crafted with precision, driven by data, and designed to last."
            className="text-lg leading-relaxed max-w-2xl mb-10"
          />
          <Button size="lg" variant="outline" className="rounded-full gap-2 border-border hover:border-primary/40 hover:bg-secondary">
            About Us <ArrowRight className="w-4 h-4" />
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   3. CLIENTS — Sparkles / Infinite Marquee
═══════════════════════════════════════════════════════════════════ */
const CLIENTS = [
  "HDFC Bank", "Axis Bank", "Kotak Mahindra", "SBI Capital", "Bajaj Finance",
  "Paytm", "PhonePe", "CRED", "Zerodha", "Razorpay",
  "TransBnk", "Jarvis Invest", "Xtend Value", "FinanceHub", "GrowthScale",
];

/* Sparkle particle */
function Sparkle({ x, y, size, delay }) {
  return (
    <motion.div className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
      animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
      transition={{ duration: 2.5, delay, repeat: Infinity, repeatDelay: Math.random() * 3 }}
    >
      <svg viewBox="0 0 16 16" fill="none">
        <path d="M8 0L9.6 6.4L16 8L9.6 9.6L8 16L6.4 9.6L0 8L6.4 6.4L8 0Z"
          fill="url(#home-icon-grad)" opacity="0.6" />
      </svg>
    </motion.div>
  );
}

const SPARKLES = Array.from({ length: 12 }, (_, i) => ({
  x: (i * 31 + 7) % 100, y: (i * 47 + 13) % 100,
  size: 8 + (i % 3) * 6, delay: i * 0.4,
}));

function ClientsSection() {
  const doubled = [...CLIENTS, ...CLIENTS];
  return (
    <section className="relative py-24 border-t border-border overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {SPARKLES.map((s, i) => <Sparkle key={i} {...s} />)}
      </div>

      <FadeIn className="page-grid mb-12">
        <div className="col-span-12 text-center">
          <GBadge>Our Clients</GBadge>
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Trusted by <span className="brand-text">Ambitious Brands</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
            We partner with fast-growing startups and established businesses that rely on us to bring their vision to life.
          </p>
        </div>
      </FadeIn>

      {/* Marquee row 1 */}
      <div className="relative overflow-hidden mb-4">
        <div className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--color-background), transparent)" }} />
        <div className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--color-background), transparent)" }} />
        <motion.div className="flex gap-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        >
          {doubled.map((name, i) => (
            <div key={i} className="shrink-0 flex items-center gap-2.5 px-6 py-3 rounded-full border border-border bg-card/50 text-sm font-semibold text-muted-foreground whitespace-nowrap backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: BG }} />
              {name}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Marquee row 2 — reversed */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--color-background), transparent)" }} />
        <div className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--color-background), transparent)" }} />
        <motion.div className="flex gap-4"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
        >
          {[...doubled].reverse().map((name, i) => (
            <div key={i} className="shrink-0 flex items-center gap-2.5 px-6 py-3 rounded-full border border-border bg-card/30 text-sm font-semibold text-muted-foreground whitespace-nowrap">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: BG, opacity: 0.5 }} />
              {name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   4. SERVICES — Cybernetic Bento Grid
═══════════════════════════════════════════════════════════════════ */
const SERVICES = [
  { icon: BrainCircuit, title: "AI/ML Strategy Consulting",      desc: "Expert guidance to plan, implement, and scale AI/ML solutions that drive long-term business growth.",                            span: 4 },
  { icon: Cpu,          title: "AI Integration",                 desc: "Seamlessly integrate AI into your workflows to boost efficiency, productivity, and innovation with minimal disruption.",            span: 4 },
  { icon: Bot,          title: "AI Agent / Copilot Development", desc: "Custom AI copilots powered by leading LLMs to streamline operations and enhance user experiences.",                              span: 4 },
  { icon: FlaskConical, title: "PoC & MVP Development",          desc: "Validate concepts and release fast MVPs that let you test assumptions, gather insights, and iterate with speed.",                 span: 3 },
  { icon: Code2,        title: "Custom AI App Development",      desc: "End-to-end development of secure, high-performance AI apps built with ethical, scalable, and robust technology.",               span: 3 },
  { icon: Building2,    title: "Enterprise AI Development",      desc: "Scalable AI systems designed for large organizations — optimizing processes, enabling smarter decisions, and driving innovation.", span: 3 },
  { icon: Sliders,      title: "Fine-Tuning LLMs",              desc: "Customized LLM tuning for better precision, relevance, and results tailored to your use-case.",                                 span: 3 },
  { icon: Wand2,        title: "Generative AI Development",      desc: "GenAI solutions using latest models for advanced content generation, virtual assistants, and personalized user experiences.",     span: 12 },
];

/* ─── GlowingEffect ──────────────────────────────────────────── */
const GlowingEffect = memo(({
  blur = 0, inactiveZone = 0.7, proximity = 0, spread = 20,
  glow = false, className, movementDuration = 2, borderWidth = 1, disabled = false,
}) => {
  const containerRef = useRef(null);
  const lastPosition = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(0);

  const handleMove = useCallback((e) => {
    if (!containerRef.current) return;
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(() => {
      const element = containerRef.current;
      if (!element) return;
      const { left, top, width, height } = element.getBoundingClientRect();
      const mouseX = e?.x ?? lastPosition.current.x;
      const mouseY = e?.y ?? lastPosition.current.y;
      if (e) lastPosition.current = { x: mouseX, y: mouseY };
      const center = [left + width * 0.5, top + height * 0.5];
      const distanceFromCenter = Math.hypot(mouseX - center[0], mouseY - center[1]);
      const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;
      if (distanceFromCenter < inactiveRadius) {
        element.style.setProperty("--active", "0");
        return;
      }
      const isActive =
        mouseX > left - proximity && mouseX < left + width + proximity &&
        mouseY > top - proximity && mouseY < top + height + proximity;
      element.style.setProperty("--active", isActive ? "1" : "0");
      if (!isActive) return;
      const currentAngle = parseFloat(element.style.getPropertyValue("--start")) || 0;
      const targetAngle = (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90;
      const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
      const newAngle = currentAngle + angleDiff;
      animate(currentAngle, newAngle, {
        duration: movementDuration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (value) => element.style.setProperty("--start", String(value)),
      });
    });
  }, [inactiveZone, proximity, movementDuration]);

  useEffect(() => {
    if (disabled) return;
    const onScroll = () => handleMove();
    const onPointer = (e) => handleMove(e);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.body.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("scroll", onScroll);
      document.body.removeEventListener("pointermove", onPointer);
    };
  }, [handleMove, disabled]);

  return (
    <>
      <div className={`pointer-events-none absolute -inset-px rounded-[inherit] border border-transparent opacity-0 transition-opacity${glow ? " opacity-100" : ""}${disabled ? " !block" : " hidden"}`} />
      <div
        ref={containerRef}
        style={{
          "--blur": `${blur}px`,
          "--spread": spread,
          "--start": "0",
          "--active": "0",
          "--glowingeffect-border-width": `${borderWidth}px`,
          "--repeating-conic-gradient-times": "5",
          "--gradient": `repeating-conic-gradient(from 236.84deg at 50% 50%, #dc2626 0%, #7c3aed calc(25% / var(--repeating-conic-gradient-times)), #dc2626 calc(50% / var(--repeating-conic-gradient-times)), #7c3aed calc(75% / var(--repeating-conic-gradient-times)), #dc2626 calc(100% / var(--repeating-conic-gradient-times)))`,
        }}
        className={`pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity${blur > 0 ? " blur-[var(--blur)]" : ""}${className ? ` ${className}` : ""}${disabled ? " !hidden" : ""}`}
      >
        <div
          className="glow rounded-[inherit]
            after:content-[''] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]
            after:[border:var(--glowingeffect-border-width)_solid_transparent]
            after:[background:var(--gradient)] after:[background-attachment:fixed]
            after:opacity-[var(--active)] after:transition-opacity after:duration-300
            after:[mask-clip:padding-box,border-box] after:[mask-composite:intersect]
            after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
        />
      </div>
    </>
  );
});
GlowingEffect.displayName = "GlowingEffect";

function CyberneticBentoItem({ icon: Icon, title, desc, span, index }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glow.style.background = `radial-gradient(380px circle at ${x}px ${y}px, color-mix(in oklch, oklch(0.57 0.22 25) 18%, transparent), transparent 70%)`;
  };

  return (
    <FadeIn delay={index * 0.06} className={`col-span-${span}`}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => { if (glowRef.current) glowRef.current.style.opacity = "1"; }}
        onMouseLeave={() => { if (glowRef.current) glowRef.current.style.opacity = "0"; }}
        className="relative rounded-2xl border border-border bg-card p-6 flex flex-col gap-4 cursor-default overflow-hidden h-full group"
      >
        {/* Aceternity glowing border */}
        <GlowingEffect spread={40} borderWidth={1.5} proximity={64} inactiveZone={0.1} />
        {/* Mouse-tracking radial glow */}
        <div ref={glowRef} className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300" style={{ opacity: 0 }} />
        {/* Cybernetic corner accents — subtle border color */}
        <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 rounded-tl-2xl pointer-events-none border-border/60" />
        <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 rounded-tr-2xl pointer-events-none border-border/60" />
        <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 rounded-bl-2xl pointer-events-none border-border/60" />
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 rounded-br-2xl pointer-events-none border-border/60" />

        <div className="relative">
          <Icon className="w-6 h-6" stroke="url(#home-icon-grad)" strokeWidth={1.6} />
        </div>
        <div className="relative flex flex-col gap-1 flex-1">
          <h3 className={`font-bold text-foreground leading-snug ${span === 12 ? "text-xl" : "text-sm"}`}>{title}</h3>
          <p className={`text-muted-foreground leading-relaxed ${span === 12 ? "text-base max-w-3xl" : "text-xs"}`}>{desc}</p>
        </div>
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity" style={GT}>
            Learn more <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </FadeIn>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="border-t border-border py-24">
      <div className="page-grid mb-14">
        <FadeIn className="col-span-12 text-center">
          <GBadge>Our Services</GBadge>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            AI-Powered Services for<br />
            <span className="brand-text">Future-Driven Businesses</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
            Our cutting-edge AI solutions are designed to transform businesses, enhance efficiency, and drive innovation.
          </p>
        </FadeIn>
      </div>
      <div className="bento-grid px-[120px] max-[1280px]:px-[60px] max-[768px]:px-5">
        {SERVICES.map((s, i) => (
          <CyberneticBentoItem key={s.title} {...s} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
═══════════════════════════════════════════════════════════════════ */

const PROCESS_STEPS = [
  {
    icon: Palette,
    num: "01",
    label: "Design",
    title: "Advanced AI, Streamlined Design",
    desc: "Techstalwarts blends cutting-edge AI with sleek modern design. Built for brands that need to showcase technology in a user-friendly and visually compelling way.",
    points: ["UX research & wireframing", "AI-enhanced design systems", "Accessibility & performance"],
  },
  {
    icon: Wrench,
    num: "02",
    label: "Build",
    title: "Adaptive Tech Built for Your Workflow",
    desc: "Our systems integrate seamlessly with your existing tools. With modular architecture, you can expand, optimize, and automate without friction.",
    points: ["API-first architecture", "Modular & scalable codebase", "CI/CD & DevSecOps pipelines"],
  },
  {
    icon: Rocket,
    num: "03",
    label: "Scale",
    title: "Future-Proof & Scalable Solutions",
    desc: "From MVPs to full-scale platforms, our solutions are built to grow with your business — ensuring performance, reliability, and long-term impact.",
    points: ["Auto-scaling infrastructure", "Performance monitoring & SRE", "Growth & market expansion"],
  },
];

function ProcessSection() {
  return (
    <section className="border-t border-border py-24">
      {/* Header */}
      <div className="page-grid mb-16">
        <FadeIn className="col-span-12 text-center">
          <GBadge>Our AI Driven Process</GBadge>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Tech That <span className="brand-text">Thinks Ahead</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base leading-relaxed">
            We design and develop intelligent digital products that move industries forward.
          </p>
        </FadeIn>
      </div>

      {/* Sticky layout — steps left, video right */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* Left — scrolling steps */}
          <div className="flex-1 flex flex-col gap-0 border border-border rounded-2xl overflow-hidden">
            {PROCESS_STEPS.map(({ icon: Icon, num, label, title, desc, points }, i) => (
              <FadeIn key={num} delay={i * 0.1}>
                <div className={`p-8 sm:p-10 flex flex-col gap-5 ${i < PROCESS_STEPS.length - 1 ? "border-b border-border" : ""}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: BG }}>
                      <Icon className="w-5 h-5 text-white" strokeWidth={1.6} />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-widest" style={GT}>{num} — {label}</p>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground leading-tight">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  <div className="flex flex-col gap-2.5">
                    {points.map((p) => (
                      <div key={p} className="flex items-center gap-2.5 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" stroke="url(#home-icon-grad)" strokeWidth={1.75} />
                        {p}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Right — sticky video */}
          <div className="w-full lg:w-[45%] shrink-0 lg:sticky lg:top-24 rounded-2xl overflow-hidden border border-border bg-black" style={{ height: "520px" }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover block"
            >
              <source src="/images/AI Process 4.mp4" type="video/mp4" />
            </video>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════

   6. PRODUCTS — Feature Carousel
═══════════════════════════════════════════════════════════════════ */
const PRODUCTS = [
  {
    name: "Jarvis",
    tagline: "Your Personalized Investment Journey",
    desc: "India's first AI stock advisory platform — delivering data-driven equity recommendations powered by advanced ML models and real-time market intelligence.",
    stats: [{ label: "Countries", value: "3" }, { label: "Entrusted Clients", value: "2L+" }, { label: "Brokers Integrated", value: "28+" }],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80&sat=-30",
    tag: "Fintech · AI Advisory",
  },
  {
    name: "TransBnk",
    tagline: "Account Monitoring and Escrow Management System",
    desc: "A comprehensive banking infrastructure platform enabling account aggregation, escrow management, and real-time payment reconciliation across 300+ connected banks.",
    stats: [{ label: "Connected Banks", value: "300" }, { label: "Monthly Users", value: "35K" }, { label: "Platform Rating", value: "4.5★" }],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1400&q=80&sat=-30",
    tag: "Banking · Escrow",
  },
  {
    name: "EVJoints",
    tagline: "Empowering Electric Vehicle Charging for a Greener Future",
    desc: "An end-to-end EV charging network management platform — from station discovery and booking to fleet analytics and smart grid optimization.",
    stats: [{ label: "Charging Stations", value: "500" }, { label: "Platform Users", value: "5M" }, { label: "Platform Rating", value: "5★" }],
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1400&q=80&sat=-30",
    tag: "CleanTech · Mobility",
  },
];

function ProductsSection() {
  const [current, setCurrent] = useState(0);
  const total = PRODUCTS.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  useEffect(() => {
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, []);

  const p = PRODUCTS[current];

  return (
    <section className="relative py-24" style={{ background: "#f9fafb", borderTop: "1px solid #e2e8f0", overflow: "clip" }}>
      {/* Aceternity aurora — light mode */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="aurora-light" />
        <div className="aurora-light-alt" />
      </div>

      <div className="page-grid mb-14 relative z-10">
        <FadeIn className="col-span-12 text-center">
          <GBadge dark={false}>Our Products</GBadge>
          <h2 className="text-4xl font-bold mb-4" style={{ color: "#0f172a" }}>
            Showcasing Our Best Work<br />
            <span className="brand-text">with Pure Precision.</span>
          </h2>
          <p className="max-w-xl mx-auto text-base" style={{ color: "#303030" }}>
            A portfolio is more than just projects — it's your story, vision, and expertise.
          </p>
        </FadeIn>
      </div>

      <div className="page-grid relative z-10">
        <div className="col-span-12 relative rounded-3xl overflow-hidden shadow-2xl" style={{ minHeight: "520px" }}>
          <AnimatePresence mode="wait">
            <motion.div key={current}
              initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-0"
            >
              <img src={p.image} alt={p.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.25) 75%, rgba(0,0,0,0.05) 100%)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 60%)" }} />
            </motion.div>
          </AnimatePresence>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-end p-5 sm:p-12" style={{ minHeight: "520px" }}>
            <AnimatePresence mode="wait">
              <motion.div key={`content-${current}`}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="max-w-2xl"
              >
                <span className="inline-block mb-4 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest text-white/60 border border-white/20 bg-white/5 backdrop-blur-sm">
                  {p.tag}
                </span>
                <h3 className="text-4xl font-bold text-white mb-2">{p.name}</h3>
                <p className="text-white/70 text-base font-medium mb-4">{p.tagline}</p>
                <p className="text-white/55 text-sm leading-relaxed mb-8 max-w-lg">{p.desc}</p>
                <div className="flex flex-wrap gap-4 sm:gap-8 mb-8">
                  {p.stats.map(({ label, value }) => (
                    <div key={label}>
                      <div className="text-2xl font-bold text-white">{value}</div>
                      <div className="text-xs text-white/50 mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="rounded-full gap-2 border-white/25 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">
                  View Case Study <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="absolute right-8 bottom-8 z-20 flex items-center gap-3">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-1.5">
              {PRODUCTS.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className="rounded-full transition-all"
                  style={{ width: i === current ? 24 : 8, height: 8, background: i === current ? "white" : "rgba(255,255,255,0.35)" }}
                />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   7. LABS — Sticky Section Tabs
═══════════════════════════════════════════════════════════════════ */
const LABS_TABS = [
  {
    label: "Start & Validate",
    sub: "For aspiring entrepreneurs who want to build a business and need support.",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80&sat=-30",
    features: ["Ideation & concept workshops", "Market research & validation", "Business model design", "MVP scoping & tech stack advisory", "Investor pitch deck support"],
    cta: "Get Started",
  },
  {
    label: "Building a Product",
    sub: "For teams building out products and taking them to market.",
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=900&q=80&sat=-30",
    features: ["Full-stack product development", "AI & ML feature integration", "Design system & UX research", "API architecture & backend engineering", "QA, testing & DevOps pipelines"],
    cta: "Start Building",
  },
  {
    label: "Launch & Scale",
    sub: "For scaleups growing to meet the needs of new customers and markets.",
    icon: Rocket,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&sat=-30",
    features: ["Cloud infrastructure & auto-scaling", "Growth analytics & A/B testing", "Performance optimization & SRE", "Market expansion engineering", "Ongoing SLA-backed engineering support"],
    cta: "Scale Now",
  },
];

function LabsSection() {
  return (
    <section className="relative border-t border-border" style={{ overflow: "clip" }}>
      {/* Aurora blobs — dark background, indigo/violet glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <motion.div
          style={{ position: "absolute", width: "75%", height: "90%", left: "-20%", top: "-40%",
            background: "radial-gradient(ellipse, rgba(99,102,241,0.35) 0%, rgba(79,70,229,0.15) 40%, transparent 70%)",
            filter: "blur(80px)" }}
          animate={{ x: [0, 50, -20, 70, 0], y: [0, -40, 55, -20, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          style={{ position: "absolute", width: "65%", height: "75%", right: "-15%", bottom: "-30%",
            background: "radial-gradient(ellipse, rgba(139,92,246,0.3) 0%, rgba(167,139,250,0.12) 40%, transparent 70%)",
            filter: "blur(90px)" }}
          animate={{ x: [0, -40, 30, -55, 0], y: [0, 35, -45, 20, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        />
        <motion.div
          style={{ position: "absolute", width: "55%", height: "60%", left: "25%", top: "25%",
            background: "radial-gradient(ellipse, rgba(196,181,253,0.2) 0%, rgba(99,102,241,0.08) 50%, transparent 70%)",
            filter: "blur(70px)" }}
          animate={{ x: [0, 30, -40, 20, 0], y: [0, -35, 50, -15, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut", delay: 10 }}
        />
      </div>

      {/* Section header */}
      <div className="page-grid py-20 pb-10 relative z-10">
        <FadeIn className="col-span-12 text-center">
          <GBadge>Techstalwarts Labs</GBadge>
          <h2 className="text-4xl font-bold text-foreground mb-4 leading-tight">
            Helping Startups<br />
            <span className="brand-text">At Every Stage</span>
          </h2>
          <p className="max-w-lg mx-auto text-base leading-relaxed text-white">
            Supporting driven startups who dare to build what others only imagine.
          </p>
        </FadeIn>
      </div>

      {/* One section per tab — erikx sticky-section-tabs pattern */}
      {LABS_TABS.map((tab, i) => (
        <div key={tab.label} className="relative z-10 border-t border-border" style={{ overflow: "clip", marginTop: i > 0 ? "-1px" : 0 }}>
          {/* Sticky header — glass effect */}
          <div
            className="sticky z-20 flex items-center justify-between px-[120px] max-[1280px]:px-[60px] max-[768px]:px-5 py-4 border-b border-white/10"
            style={{ top: "63px", background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
          >
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-semibold tabular-nums text-white/30">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: BG }}>
                <tab.icon className="w-3.5 h-3.5 text-white" strokeWidth={1.8} />
              </div>
              <h3 className="text-sm font-bold text-foreground">{tab.label}</h3>
            </div>
            <p className="text-xs text-muted-foreground hidden md:block max-w-xs">{tab.sub}</p>
          </div>

          {/* Section body */}
          <div className="page-grid py-10 sm:py-20">
            <div className="col-span-12 lg:col-span-5 flex flex-col justify-center">
              <p className="text-muted-foreground text-base leading-relaxed mb-8">{tab.sub}</p>
              <div className="flex flex-col gap-3 mb-8">
                {tab.features.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 shrink-0" stroke="url(#home-icon-grad)" strokeWidth={1.75} />
                    <span className="text-sm text-foreground">{f}</span>
                  </div>
                ))}
              </div>
              <Button className="w-fit rounded-full gap-2 group font-semibold text-white border-none"
                style={{ background: BG, boxShadow: GLOW }}
              >
                {tab.cta} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            <div className="col-span-12 lg:col-span-7 rounded-2xl overflow-hidden" style={{ minHeight: "280px" }}>
              <div className="relative w-full h-full" style={{ minHeight: "280px" }}>
                <img src={tab.image} alt={tab.label} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.45) 0%, transparent 55%)" }} />
                <div className="absolute top-6 left-6">
                  <span className="inline-block px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-widest text-white/70 border border-white/20 bg-white/5 backdrop-blur-sm">
                    {tab.label}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   8. CASE STUDIES — Feature Carousel (0xUrvish pattern)
═══════════════════════════════════════════════════════════════════ */
const CASE_ITEMS = [
  {
    id: "jarvis",
    label: "AI Stock Advisory",
    icon: BarChart3,
    tag: "AI Advisory · Fintech",
    title: "Scaling India's First AI Stock Advisory to 2L+ Users",
    challenge: "Build an intelligent stock recommendation engine that adapts to individual risk profiles across diverse investor segments.",
    outcome: "Deployed ML-driven equity advisory across 3 countries, integrating 28+ brokers and growing to 2L+ entrusted clients.",
    metrics: [["2L+", "Clients"], ["28+", "Brokers"], ["3", "Countries"]],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80&sat=-30",
  },
  {
    id: "transbnk",
    label: "Banking Infrastructure",
    icon: Building2,
    tag: "Banking · Escrow Infrastructure",
    title: "Building Real-Time Escrow & Account Monitoring at Scale",
    challenge: "Modernize payment reconciliation and escrow operations across 300+ banks with sub-second transaction tracking.",
    outcome: "Delivered a unified banking platform now serving 35K monthly users with 99.9% uptime and a 4.5-star rating.",
    metrics: [["300", "Banks"], ["35K", "Monthly Users"], ["99.9%", "Uptime"]],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&q=80&sat=-30",
  },
  {
    id: "evjoints",
    label: "EV Charging Network",
    icon: Zap,
    tag: "CleanTech · Mobility",
    title: "Powering India's EV Charging Network with Smart Infrastructure",
    challenge: "Create an end-to-end EV charging ecosystem — from user discovery to station management and fleet analytics.",
    outcome: "Launched across 500 charging stations with 5M users and a perfect 5-star rating, accelerating India's EV transition.",
    metrics: [["500", "Stations"], ["5M", "Users"], ["5★", "Rating"]],
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&q=80&sat=-30",
  },
];

const CS_INTERVAL  = 4000;
const CS_CHIP_H    = 84;
const csWrap = (min, max, v) => { const r = max - min; return ((((v - min) % r) + r) % r) + min; };

function CaseStudiesSection() {
  const n = CASE_ITEMS.length;
  const [step,   setStep]   = useState(0);
  const [paused, setPaused] = useState(false);
  const cur = ((step % n) + n) % n;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setStep((s) => s + 1), CS_INTERVAL);
    return () => clearInterval(t);
  }, [paused]);

  const jumpTo = (idx) => {
    const diff = (idx - cur + n) % n;
    if (diff > 0) setStep((s) => s + diff);
  };

  const getStatus = (idx) => {
    let nd = idx - cur;
    if (nd > n / 2)  nd -= n;
    if (nd < -n / 2) nd += n;
    if (nd === 0)  return "active";
    if (nd === -1) return "prev";
    if (nd === 1)  return "next";
    return "hidden";
  };

  return (
    <section className="border-t border-border py-24">
      <div className="page-grid mb-14">
        <FadeIn className="col-span-12 text-center">
          <GBadge>Case Studies</GBadge>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Results That <span className="brand-text">Speak for Themselves.</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base">
            Real products, real scale, real impact.
          </p>
        </FadeIn>
      </div>

      <div className="w-full max-w-7xl mx-auto px-[120px] max-[1280px]:px-[60px] max-[768px]:px-5">
        <div className="relative overflow-hidden rounded-[2.5rem] flex flex-col lg:flex-row border border-border" style={{ minHeight: 540 }}>

          {/* ── Left panel — animated chips ── */}
          <div
            className="w-full lg:w-[38%] relative z-30 flex flex-col items-start justify-center overflow-hidden px-10 lg:px-12"
            style={{ background: "var(--color-card)", borderRight: "1px solid var(--color-border)", minHeight: 280 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* fade masks */}
            <div className="absolute inset-x-0 top-0 h-16 z-40 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, var(--color-card), transparent)" }} />
            <div className="absolute inset-x-0 bottom-0 h-16 z-40 pointer-events-none"
              style={{ background: "linear-gradient(to top, var(--color-card), transparent)" }} />

            <div className="relative w-full h-full flex items-center justify-start z-20" style={{ minHeight: 280 }}>
              {CASE_ITEMS.map((item, idx) => {
                const isActive = idx === cur;
                const dist     = item.id === CASE_ITEMS[cur].id ? 0 : idx - cur;
                const wd       = csWrap(-(n / 2), n / 2, dist);
                const Icon     = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    style={{ height: CS_CHIP_H, width: "fit-content" }}
                    animate={{ y: wd * CS_CHIP_H, opacity: 1 - Math.abs(wd) * 0.3 }}
                    transition={{ type: "spring", stiffness: 90, damping: 22, mass: 1 }}
                    className="absolute flex items-center"
                  >
                    <button
                      onClick={() => jumpTo(idx)}
                      className="flex items-center gap-4 px-6 py-4 rounded-full border transition-all duration-500 text-left"
                      style={isActive
                        ? { background: BG, borderColor: "transparent", color: "#fff", boxShadow: GLOW }
                        : { background: "transparent", borderColor: "var(--color-border)", color: "var(--color-muted-foreground)" }
                      }
                    >
                      <Icon className="w-4 h-4 shrink-0" strokeWidth={1.8} />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest whitespace-nowrap">{item.label}</p>
                        {isActive && <p className="text-[10px] opacity-70 mt-0.5 whitespace-nowrap font-normal">{item.tag}</p>}
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* progress dots */}
            <div className="absolute bottom-7 left-0 right-0 flex justify-center gap-2 z-50">
              {CASE_ITEMS.map((_, i) => (
                <button key={i} onClick={() => jumpTo(i)}
                  className="rounded-full transition-all duration-300"
                  style={{ width: i === cur ? 20 : 6, height: 6, background: i === cur ? "oklch(0.57 0.22 25)" : "var(--color-border)" }}
                />
              ))}
            </div>
          </div>

          {/* ── Right panel — image cards ── */}
          <div
            className="flex-1 relative flex items-center justify-center py-12 px-6 lg:px-10 overflow-hidden"
            style={{ background: "var(--color-background)", minHeight: 420 }}
          >
            <div className="relative w-full max-w-[380px] aspect-[4/5]">
              {CASE_ITEMS.map((item, idx) => {
                const status   = getStatus(idx);
                const isActive = status === "active";
                const isPrev   = status === "prev";
                const isNext   = status === "next";
                return (
                  <motion.div
                    key={item.id}
                    initial={false}
                    animate={{
                      x:      isActive ? 0 : isPrev ? -90 : isNext ? 90 : 0,
                      scale:  isActive ? 1 : (isPrev || isNext) ? 0.86 : 0.72,
                      opacity: isActive ? 1 : (isPrev || isNext) ? 0.4 : 0,
                      rotate: isPrev ? -3 : isNext ? 3 : 0,
                      zIndex: isActive ? 20 : (isPrev || isNext) ? 10 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 25, mass: 0.8 }}
                    className="absolute inset-0 rounded-[2rem] overflow-hidden border-4 border-border origin-center"
                    style={{ pointerEvents: isActive ? "auto" : "none" }}
                  >
                    <img
                      src={item.image} alt={item.title}
                      className={`w-full h-full object-cover transition-all duration-700 ${isActive ? "" : "grayscale blur-sm brightness-50"}`}
                    />

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                          className="absolute inset-x-0 bottom-0 p-7 pt-28 pointer-events-none"
                          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.65) 55%, transparent 100%)" }}
                        >
                          <span className="inline-block px-3 py-1 rounded-full text-[9px] font-semibold uppercase tracking-widest text-white/65 border border-white/20 bg-white/5 mb-3">
                            {item.tag}
                          </span>
                          <p className="text-white font-bold text-sm leading-snug mb-4">{item.title}</p>
                          <div className="flex gap-5">
                            {item.metrics.map(([val, lbl]) => (
                              <div key={lbl}>
                                <div className="text-lg font-bold text-white">{val}</div>
                                <div className="text-[9px] text-white/50 mt-0.5">{lbl}</div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {isActive && (
                      <div className="absolute top-5 left-5 flex items-center gap-2 pointer-events-none">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" style={{ boxShadow: "0 0 8px #4ade80" }} />
                        <span className="text-white/65 text-[9px] font-mono uppercase tracking-[0.25em]">Live Case</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   9. TESTIMONIALS — Image slider with directional animations
═══════════════════════════════════════════════════════════════════ */
const REVIEWS = [
  {
    quote: "Techstalwarts has been an exceptional partner in developing our AI-based Equity Stock Suggestion product. Their expertise in AI and financial markets surpassed our expectations at every milestone.",
    name: "Sumit Chanda",
    role: "CEO & Founder",
    company: "Jarvis Invest",
    stars: 5,
    image: "/images/sumit-chanda.jpg",
  },
  {
    quote: "Techstalwarts has exceeded our expectations with Xtend Nach. Their dedication and innovation have been invaluable, and we highly recommend their services to anyone building in fintech.",
    name: "Lavin Kotian",
    role: "Founder",
    company: "Xtend Value",
    stars: 5,
    image: "/images/lavin-kotian.jpg",
  },
  {
    quote: "Techstalwarts brought our vision to life with the TransBnk system. Their expertise in financial software development was evident throughout. They delivered beyond what we expected.",
    name: "Vaibhav Tambe",
    role: "Founder",
    company: "TransBnk",
    stars: 5,
    image: "/images/vaibhav-tambe.jpg",
  },
];

function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (idx) => {
    setDir(idx > current ? 1 : -1);
    setCurrent(idx);
  };
  const prev = () => go((current - 1 + REVIEWS.length) % REVIEWS.length);
  const next = () => go((current + 1) % REVIEWS.length);

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [current]);

  const r = REVIEWS[current];

  return (
    <section className="relative border-t border-border py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 55% 45% at 50% 50%, color-mix(in oklch, oklch(0.57 0.22 25) 5%, transparent), transparent 70%)"
      }} />

      <div className="page-grid mb-14">
        <FadeIn className="col-span-12 text-center">
          <GBadge>Testimonials</GBadge>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            What Our Clients<br />
            <span className="brand-text">Say About Us</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base">
            See how we've helped clients achieve meaningful results and long-term impact.
          </p>
        </FadeIn>
      </div>

      <div className="page-grid">
        <div className="col-span-12">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-0 rounded-2xl border border-border overflow-hidden" style={{ minHeight: "480px" }}>

            {/* Left — pagination + thumbnails */}
            <div className="hidden sm:flex sm:col-span-2 flex-col items-center justify-center gap-5 border-r border-border px-4 py-8 bg-card/30">
              <span className="text-xs text-muted-foreground tabular-nums font-semibold">
                {String(current + 1).padStart(2, "0")} / {String(REVIEWS.length).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-3">
                {REVIEWS.map((rev, i) => (
                  <button key={i} onClick={() => go(i)}
                    className="relative overflow-hidden rounded-lg transition-all duration-300"
                    style={{ width: 52, height: 68, opacity: i === current ? 1 : 0.4, outline: i === current ? "2px solid oklch(0.57 0.22 25)" : "none", outlineOffset: "2px" }}
                  >
                    <img src={rev.image} alt={rev.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Center — portrait image, directional y-slide */}
            <div className="col-span-1 sm:col-span-5 relative overflow-hidden" style={{ minHeight: "260px" }}>
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div key={current}
                  custom={dir}
                  initial={{ y: dir * 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: dir * -60, opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute inset-0"
                >
                  <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)" }} />
                  <div className="absolute bottom-6 left-6">
                    <p className="text-white font-bold text-sm">{r.name}</p>
                    <p className="text-white/55 text-xs mt-0.5">{r.role} · {r.company}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right — quote + navigation, directional x-slide */}
            <div className="col-span-1 sm:col-span-5 flex flex-col justify-center px-5 sm:px-10 py-8 sm:py-10 bg-card/10">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div key={current}
                  custom={dir}
                  initial={{ x: dir * 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: dir * -40, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: r.stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg text-foreground leading-relaxed font-medium mb-8">
                    "{r.quote}"
                  </p>
                  <div className="mb-8">
                    <p className="text-sm font-bold text-foreground">{r.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{r.role} · {r.company}</p>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={prev}
                      className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button onClick={next}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors"
                      style={{ background: BG }}>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   10. FAQ
═══════════════════════════════════════════════════════════════════ */
const FAQS = [
  { q: "What makes Techstalwarts different from other software development companies?", a: "We combine deep domain expertise in AI and financial technology with a product-first mindset. We don't just build what you ask — we challenge assumptions, validate ideas, and co-create solutions that genuinely move your business forward. Our team has built products used by millions." },
  { q: "How does your project engagement process work?", a: "We start with a discovery workshop to map your goals, constraints, and technical landscape. From there we define scope, build an architecture blueprint, and execute in focused sprints with clear milestones. You get visibility at every step — no black boxes." },
  { q: "Do you offer ongoing maintenance and support?", a: "Yes. All production deployments include a structured handover with documentation. We offer SLA-backed support plans ranging from business-hours assistance to 24×7 on-call engineering — tailored to the criticality of your platform." },
  { q: "Can you integrate AI into our existing products or workflows?", a: "Absolutely. AI integration is one of our core offerings. We audit your existing systems, identify high-impact automation opportunities, and build AI layers — from LLM-powered copilots to ML-based analytics — that fit seamlessly into your stack." },
  { q: "What's the typical timeline for a project?", a: "A focused PoC or MVP typically takes 6–10 weeks. A full product build ranges from 3 to 6 months depending on complexity. Enterprise platform projects may span longer with phased delivery. We scope timelines honestly — and we hold ourselves to them." },
  { q: "How do you ensure the solutions you build match our business needs?", a: "Every engagement starts with deep discovery — not just technical requirements, but business context, user journeys, and success metrics. We maintain continuous alignment through weekly demos, stakeholder reviews, and adjustable sprint backlogs." },
];

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return (
    <FadeIn delay={index * 0.05}>
      <div className={`border-b border-border transition-colors ${open ? "" : "hover:border-primary/20"}`}>
        <button className="w-full flex items-center justify-between gap-4 py-5 text-left" onClick={() => setOpen((o) => !o)}>
          <span className="text-sm font-semibold text-foreground pr-4">{q}</span>
          <div className="w-6 h-6 rounded-full border border-border flex items-center justify-center shrink-0 transition-colors"
            style={open ? { background: BG, borderColor: "transparent" } : {}}>
            {open
              ? <Minus className="w-3 h-3 text-white" />
              : <Plus className="w-3 h-3 text-muted-foreground" />
            }
          </div>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }} className="overflow-hidden">
              <p className="text-sm text-muted-foreground leading-relaxed pb-5">{a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  );
}

/* ─── We Are Techstalwarts — Cinematic Scroll ─────────────────── */
function WeTechstalwartsSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  /* Phase breakpoints (0–1 mapped across 300vh):
     0.00–0.35  Text zoom
     0.30–0.50  BG fades to black, text fades out
     0.45–0.70  Video scales in + fades in
     0.65–1.00  Video holds, FAQ overlays  */

  /* Scroll-mapped motion values */
  const textScale     = useTransform(scrollYProgress, [0, 0.30],   [1, 16]);
  const textOpacity   = useTransform(scrollYProgress, [0.22, 0.35],[1, 0]);
  const phase1Opacity = useTransform(scrollYProgress, [0.28, 0.40],[1, 0]);
  const videoScale    = useTransform(scrollYProgress, [0.35, 0.55],[0.85, 1]);
  const videoOpacity  = useTransform(scrollYProgress, [0.35, 0.50],[0, 1]);
  const faqY          = useTransform(scrollYProgress, [0.60, 0.75],[100, 0]);
  const faqOpacity    = useTransform(scrollYProgress, [0.60, 0.75],[0, 1]);

  return (
    <section ref={containerRef} style={{ height: "350vh", position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

        {/* Base — black background (always present behind everything) */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "#000" }} />

        {/* Layer 1 — Light bg + zooming text (fades away) */}
        <motion.div
          style={{
            position: "absolute", inset: 0, zIndex: 2,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "var(--color-background)",
            opacity: phase1Opacity,
            willChange: "opacity",
          }}
        >
          <motion.h2
            style={{
              scale: textScale,
              opacity: textOpacity,
              willChange: "transform, opacity",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 4.5vw, 4rem)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              userSelect: "none",
              whiteSpace: "nowrap",
              margin: 0,
              color: "var(--color-foreground)",
            }}
          >
            TECHSTALWARTS
          </motion.h2>
        </motion.div>

        {/* Layer 2 — Video (sits behind phase1, revealed as it fades) */}
        <motion.div
          style={{
            position: "absolute", inset: 0, zIndex: 1,
            opacity: videoOpacity,
            scale: videoScale,
            willChange: "transform, opacity",
          }}
        >
          <video
            src="/images/lab.mp4"
            autoPlay muted loop playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, rgba(30,64,175,0.12) 0%, rgba(124,58,237,0.12) 100%)",
          }} />
        </motion.div>

        {/* Layer 3 — FAQ parallax overlay */}
        <motion.div
          style={{
            position: "absolute", inset: 0, zIndex: 3,
            opacity: faqOpacity,
            y: faqY,
            willChange: "transform, opacity",
            overflowY: "auto",
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.82) 35%, rgba(0,0,0,0.95) 100%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1, padding: "8vh clamp(1rem, 5vw, 4rem)", maxWidth: 1280, margin: "0 auto" }}>
            {/* FAQ header */}
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <Badge variant="outline" className="mb-4 rounded-full px-4 text-xs uppercase tracking-widest font-semibold border-white/20 bg-white/5 text-white/80">
                FAQ
              </Badge>
              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700, color: "rgba(255,255,255,0.95)", marginBottom: "0.5rem", lineHeight: 1.2 }}>
                Frequently Asked{" "}
                <span style={{ backgroundImage: BG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Questions</span>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", maxWidth: 480, margin: "0 auto" }}>
                Have questions? We've got quick answers to the most common inquiries.
              </p>
            </div>
            {/* FAQ items */}
            <div style={{ maxWidth: 720, margin: "0 auto", width: "100%" }}>
              {FAQS.map((f, i) => (
                <FAQItemDark key={i} q={f.q} a={f.a} index={i} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* FAQ item styled for dark/video overlay */
function FAQItemDark({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", transition: "border-color 0.3s" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 16, padding: "1.25rem 0", textAlign: "left", background: "none", border: "none", cursor: "pointer",
        }}
      >
        <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "rgba(255,255,255,0.9)", paddingRight: 16 }}>{q}</span>
        <div style={{
          width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, transition: "all 0.3s",
          background: open ? BG : "transparent",
          border: open ? "none" : "1px solid rgba(255,255,255,0.2)",
        }}>
          {open
            ? <Minus className="w-3 h-3 text-white" />
            : <Plus className="w-3 h-3" style={{ color: "rgba(255,255,255,0.5)" }} />
          }
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, paddingBottom: "1.25rem" }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Original FAQ kept as standalone for other pages if needed */
function FAQSection() {
  return null;
}

/* ═══════════════════════════════════════════════════════════════════
   11. CTA — Typewriter Effect
═══════════════════════════════════════════════════════════════════ */
function useTypewriter(text, speed, started) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (!started || idx >= text.length) return;
    const t = setTimeout(() => setIdx((i) => i + 1), speed);
    return () => clearTimeout(t);
  }, [started, idx, text, speed]);
  return text.slice(0, idx);
}

function CTASection() {
  return (
    <section className="page-grid py-24 border-t border-border">
      <div
        className="col-span-12 rounded-2xl overflow-hidden relative"
        style={{ border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 25%, transparent)", background: "var(--color-card)" }}
      >
        <AuroraBg variant="dark" />
        <div aria-hidden className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ zIndex: 1, backgroundImage: "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative px-5 sm:px-10 lg:px-16 py-10 sm:py-16 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10" style={{ zIndex: 2 }}>
          <div className="max-w-xl">
            <Badge variant="outline" className="mb-4 rounded-full border-primary/30 bg-primary/5 uppercase tracking-widest text-xs font-semibold" style={GT}>
              Get Started
            </Badge>
            <h2 className="text-4xl lg:text-[2.75rem] font-bold text-foreground mb-4 leading-tight">
              Ready to Build the Impossible<br />
              <span className="brand-text">with Next-Gen Innovation?</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-md">
              Take the next step — join us and turn your vision into reality with the power of innovation and expert guidance.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0 w-full lg:w-auto">
            <Button size="lg" className="rounded-full gap-2 group font-semibold text-white border-none w-full lg:min-w-52"
              style={{ background: BG, boxShadow: GLOW }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 48px color-mix(in oklch, oklch(0.57 0.22 25) 55%, transparent)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = GLOW; }}
            >
              Book an Appointment <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-border bg-card/60 text-foreground hover:bg-secondary w-full lg:min-w-52">
              Explore Our Work
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   12. FOOTER
═══════════════════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════════════════
   Main Export
═══════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <div className="bg-background">
      <GradientDefs />
      <HeroSection
        onPrimary={() => { window.location.href = "/contact"; }}
        onSecondary={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
      />
      <AboutSection />
      <ClientsSection />
      <ServicesSection />
      <ProcessSection />
      <ProductsSection />
      <CaseStudiesSection />
      <LabsSection />
      <TestimonialsSection />
      <WeTechstalwartsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}

