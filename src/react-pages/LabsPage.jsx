import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import Footer from "@/components/Footer";
import AuroraBg from "@/components/AuroraBg";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight, Search, Users, Rocket, TrendingUp, CheckCircle2,
  Play, ChevronRight, ChevronLeft, MapPin, Mail, Phone, Send, BookOpen,
  Lightbulb, Code2, Megaphone, BarChart3, Target, ShieldCheck,
  Globe, Building2, UserPlus, DollarSign, Brain, Zap,
  Crosshair, PieChart, ShieldAlert, Activity, HeartPulse, Crown,
  Building, LineChart, Briefcase, Lock, Network, FileText,
  Sparkles, Monitor, Link2, Eye, RefreshCw, CreditCard, Repeat, Cable, Layers,
  Battery, Map, Star, Heart, Car, Clock, Navigation,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";



/* ── Brand ──────────────────────────────────────────────────────── */
const BG   = "linear-gradient(135deg, oklch(0.57 0.22 25) 0%, oklch(0.52 0.24 292) 100%)";
const GLOW = "0 0 28px color-mix(in oklch, oklch(0.57 0.22 25) 32%, transparent)";
const GT   = { backgroundImage: BG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };

function GradientDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute", overflow: "hidden" }} aria-hidden>
      <defs>
        <linearGradient id="lab-icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#DC2626" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function GBadge({ children }) {
  return (
    <Badge variant="outline" className="mb-4 rounded-full px-4 text-xs uppercase tracking-widest font-semibold border-primary/30 bg-primary/5" style={GT}>
      {children}
    </Badge>
  );
}

/* ── Data ───────────────────────────────────────────────────────── */
const STAGES = [
  {
    id: "ideation",
    number: "01",
    title: "Ideation",
    hook: "You have an idea.",
    line: "We validate it, size the market, and build a pitch that gets investors leaning in.",
    icon: Lightbulb,
  },
  {
    id: "build",
    number: "02",
    title: "Build",
    hook: "You're ready to ship.",
    line: "We architect, prototype, and develop your MVP — fast, production-grade, no shortcuts.",
    icon: Code2,
  },
  {
    id: "launch",
    number: "03",
    title: "Launch",
    hook: "You hit the market.",
    line: "We drive go-to-market, PR, and legal readiness so day one actually counts.",
    icon: Rocket,
  },
  {
    id: "scale",
    number: "04",
    title: "Scale",
    hook: "You're growing.",
    line: "We secure funding, build your team, and open new markets — globally.",
    icon: TrendingUp,
  },
];

const PRODUCTS = [
  {
    name: "Jarvis",
    tagline: "Investing Powered by AI",
    desc: "Explore solutions curated to simplify and streamline every aspect of a customer's journey in the equity markets — powered by AI-neural network design analysing 300 million data points per market.",
    stats: [{ label: "Countries", value: "5" }, { label: "Entrusted Clients", value: "250K+" }, { label: "Assets Under Advisory", value: "$20M+" }],
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

const BLOG_POSTS = [
  {
    category: "Business Growth · Entrepreneurship",
    date: "10 October 2024",
    author: "Olivia Wilson",
    title: "How Startup Accelerators Fuel Growth: A Founder's Journey",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
  },
  {
    category: "Funding · Strategy",
    date: "22 September 2024",
    author: "James Carter",
    title: "Raising Your First Round: What Investors Actually Look For",
    image: "https://images.unsplash.com/photo-1553484771-047a44eee27a?w=800&q=80",
  },
  {
    category: "Product · MVP",
    date: "5 August 2024",
    author: "Priya Nair",
    title: "From Zero to Launch: Building Your MVP in 8 Weeks",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
  },
];

const PARTNERS = ["Y Combinator", "Sequoia", "Andreessen Horowitz", "Tiger Global", "SoftBank", "Accel"];

/* ── Typewriter loop ────────────────────────────────────────────── */
function TypewriterLoop({ text, typingSpeed = 120, holdDuration = 2000, erasingSpeed = 60, pauseDuration = 500 }) {
  const [displayed, setDisplayed] = useState("");
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    let timeout;
    if (!erasing) {
      if (displayed.length < text.length) {
        timeout = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), typingSpeed);
      } else {
        timeout = setTimeout(() => setErasing(true), holdDuration);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), erasingSpeed);
      } else {
        timeout = setTimeout(() => setErasing(false), pauseDuration);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, erasing, text, typingSpeed, holdDuration, erasingSpeed, pauseDuration]);

  return (
    <span
      style={{ filter: "drop-shadow(0 0 20px rgba(255,255,255,0.6)) drop-shadow(0 0 50px rgba(255,255,255,0.3))" }}
      className="font-moralana text-white"
    >
      {displayed}
      <motion.span
        className="inline-block w-[3px] h-[0.85em] bg-white ml-1 align-middle"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "steps(2)" }}
      />
    </span>
  );
}

/* ── 1. Hero ─────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="relative h-screen flex flex-col justify-center bg-black pt-16">
      {/* Background video */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden>
        <video
          src="/images/lab.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      {/* Overlay — between video and text */}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.85) 100%)" }} />
      {/* Hero content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="font-helvetica text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white mb-6 leading-[1.08] max-w-4xl mx-auto">
            Build What Matters.<br />
            <TypewriterLoop
              text="Scale What Works."
              typingSpeed={120}
              holdDuration={2000}
              erasingSpeed={60}
              pauseDuration={500}
            />
          </h1>
          <p className="text-white/70 text-base md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            From concept to scale — expert guidance, capital networks, and enterprise infrastructure at every stage.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap w-full sm:w-auto">
            <div
              className="relative rounded-full p-[2px] w-full sm:w-auto lab-glow-border"
              style={{
                background: "conic-gradient(from var(--glow-angle, 0deg), oklch(0.57 0.22 25), oklch(0.52 0.24 292), oklch(0.57 0.22 25))",
                boxShadow: "0 0 20px oklch(0.57 0.22 25 / 0.4), 0 0 40px oklch(0.52 0.24 292 / 0.2)",
              }}
            >
              <Button
                size="lg"
                className="rounded-full gap-2 group font-semibold text-white border-none px-8 w-full backdrop-blur-xl"
                style={{ background: "rgba(0,0,0,0.6)" }}
                onClick={() => document.getElementById("lab-contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Apply to the Program <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-white/20 bg-white/10 text-white hover:bg-white/20 px-8 w-full sm:w-auto"
              onClick={() => document.getElementById("lab-stages")?.scrollIntoView({ behavior: "smooth" })}
            >
              Start Building
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


/* ── 2. Message to Founders ──────────────────────────────────────── */
function FoundersMessageSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <GBadge>For Founders</GBadge>
          <h2 className="my-6 mt-0 text-3xl sm:text-4xl lg:text-5xl font-light text-balance text-foreground leading-tight">
            We Don't Advise.<br />
            <span style={GT} className="font-moralana">We Build With You.</span>
          </h2>
          <p className="mb-8 max-w-xl text-muted-foreground lg:text-lg leading-relaxed">
            You don't need another advisor. You need a team that writes the code, closes the round, and stays until it scales. We've turned $1 into $130. We've built products used by 250K+ people. Now we're looking for the next founder who refuses to settle.
          </p>
          <div className="flex w-full flex-col justify-center gap-3 sm:flex-row">
            <a href="#lab-contact">
              <Button className="rounded-full gap-2 font-semibold text-white border-none px-8" style={{ background: BG, boxShadow: GLOW }}>
                Apply to StalwartsLAB <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <a href="#lab-stages">
              <Button variant="outline" className="rounded-full gap-2 font-semibold px-8">
                See How It Works <ChevronRight className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 3. Stages We Support — Sticky left + cards right ──────────── */
function StagesSection() {
  const stageCards = STAGES.map((s) => ({
    id: s.id,
    title: s.title,
    hook: s.hook,
    summary: s.line,
    image: `/images/${s.id}-light.png`,
  }));

  return (
    <section id="lab-stages" className="relative border-t border-border bg-white">

      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1.9fr] gap-0 items-start">
          {/* Left — sticky with video bg, 100vh */}
          <div className="lg:sticky lg:top-0 lg:h-screen flex items-end overflow-hidden">
            <div className="absolute inset-0 hidden lg:block pointer-events-none">
              <video
                src="/images/lab2.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.85) 100%)" }} />
            </div>
            <div className="relative z-10 py-12 lg:pb-16 px-6 lg:px-12">
              <h2 className="font-helvetica text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white mb-4 leading-tight">
                Every Stage. <span style={{ filter: "drop-shadow(0 0 20px rgba(255,255,255,0.6)) drop-shadow(0 0 50px rgba(255,255,255,0.3))" }} className="font-moralana text-white">Full Support.</span>
              </h2>
              <p className="text-white/60 max-w-md text-base">
                Four chapters. One mission — take you from napkin sketch to global scale.
              </p>
            </div>
          </div>

          {/* Right — stage cards */}
          <div className="space-y-16 py-24 px-6 lg:px-12">
            {stageCards.map((item) => (
              <FadeIn key={item.id}>
                <div className="relative overflow-hidden h-[280px] sm:h-[320px]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="px-1 pt-4">
                  <p className="text-gray-500 text-sm italic mb-1">{item.hook}</p>
                  <h3 className="text-lg font-bold text-black mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.summary}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FadeIn helper ───────────────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Jarvis Case Study ──────────────────────────────────────────── */
const JARVIS_INPUTS = [
  { title: "Fundamentals", desc: "Balance Sheets, Income Statements, Financial Ratios." },
  { title: "Price & Volume Time Series", desc: "Real-Time And Historical Market Prices, OHLC, Trade Volumes." },
  { title: "Corporate Actions", desc: "Dividends, Stock Splits, Buybacks, And Market-Moving Events." },
  { title: "Government Policies", desc: "Repo Rates, Stimulus Packages, Legislative Reforms." },
  { title: "Regulations & Compliance", desc: "Exchange Filings, Regional Laws, Tax Policy." },
  { title: "Global & Domestic Events", desc: "Elections, Inflation Updates, And Key Economic Indicators." },
  { title: "Sentiment Data", desc: "News, Analyst Opinions, Investor Sentiment, And Social Buzz." },
  { title: "Other Macros", desc: "Currency, Commodity Flows, Interest Rates, And Global Signals." },
];

const JARVIS_OUTPUTS = [
  { label: "Fundamental", w: "70%" },
  { label: "Technical", w: "60%" },
  { label: "Macro Sentiment", w: "55%" },
  { label: "People Sentiment", w: "65%" },
  { label: "Company Sentiment", w: "50%" },
  { label: "Predictive Analysis", w: "80%" },
];

function JarvisFlowIllustration() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  /* SVG dimensions */
  const W = 1200, H = 560;

  /* Column X positions */
  const inputPillX = 10;
  const inputPillW = 220;
  const inputDotX = inputPillX + inputPillW + 8;

  const jarvisX = 440;
  const jarvisLetters = ["J", "A", "R", "V", "I", "S"];

  const outputPillX = 730;
  const outputPillW = 180;
  const outputDotX = outputPillX - 8;

  const finalX = 990;
  const finalW = 180;

  /* Y positions for inputs (8 items) */
  const inputSpacing = (H - 100) / (JARVIS_INPUTS.length - 1);
  const inputYs = JARVIS_INPUTS.map((_, i) => 65 + i * inputSpacing);

  /* Y positions for JARVIS letters (6 items) */
  const letterSpacing = (H - 140) / (jarvisLetters.length - 1);
  const letterYs = jarvisLetters.map((_, i) => 90 + i * letterSpacing);

  /* Y positions for outputs (6 items) */
  const outputSpacing = (H - 140) / (JARVIS_OUTPUTS.length - 1);
  const outputYs = JARVIS_OUTPUTS.map((_, i) => 90 + i * outputSpacing);

  /* Final outputs */
  const finalOutputs = ["Jarvis Verdict", "Live Market Experience"];
  const finalYs = [H / 2 - 40, H / 2 + 40];

  return (
    <div ref={ref} className="w-full overflow-x-auto">
      <motion.svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-5xl mx-auto"
        style={{ minWidth: 700 }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <defs>
          <linearGradient id="jarvis-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
          <linearGradient id="jarvis-line-in" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#1e40af" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="jarvis-line-out" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="jarvis-line-final" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#1e40af" stopOpacity="0.4" />
          </linearGradient>
          <filter id="jarvis-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="jarvis-glow-lg">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Top label: Positive Reinforcement Learning ── */}
        <motion.text
          x={W / 2}
          y={16}
          textAnchor="middle"
          className="fill-muted-foreground text-[11px] font-semibold uppercase"
          letterSpacing="0.12em"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.7 } : {}}
          transition={{ duration: 0.5, delay: 2.5 }}
        >
          Positive Reinforcement Learning
        </motion.text>

        {/* ── Bottom label: Negative Reinforcement Learning ── */}
        <motion.text
          x={W / 2}
          y={H - 4}
          textAnchor="middle"
          className="fill-muted-foreground text-[11px] font-semibold uppercase"
          letterSpacing="0.12em"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.7 } : {}}
          transition={{ duration: 0.5, delay: 2.7 }}
        >
          Negative Reinforcement Learning
        </motion.text>

        {/* ── Input pills ── */}
        {JARVIS_INPUTS.map((item, i) => {
          const y = inputYs[i];
          return (
            <motion.g
              key={`in-${i}`}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
            >
              <rect
                x={inputPillX}
                y={y - 16}
                width={inputPillW}
                height={32}
                rx="16"
                fill="white"
                stroke="url(#jarvis-grad)"
                strokeWidth="0.8"
                strokeOpacity="0.3"
              />
              <text
                x={inputPillX + inputPillW / 2}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                className="fill-foreground text-[11px] font-semibold"
              >
                {item.title}
              </text>
            </motion.g>
          );
        })}

        {/* ── Neural mesh: inputs → JARVIS letters ── */}
        {JARVIS_INPUTS.map((_, ii) => {
          const iy = inputYs[ii];
          return jarvisLetters.map((_, li) => {
            const ly = letterYs[li];
            const pathD = `M ${inputDotX + 20} ${iy} C ${inputDotX + 100} ${iy}, ${jarvisX - 80} ${ly}, ${jarvisX - 18} ${ly}`;
            return (
              <motion.path
                key={`mesh-in-${ii}-${li}`}
                d={pathD}
                fill="none"
                stroke="url(#jarvis-line-in)"
                strokeWidth="0.8"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 0.6 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + ii * 0.04 + li * 0.02 }}
              />
            );
          });
        })}

        {/* ── Neural mesh: JARVIS letters → outputs ── */}
        {jarvisLetters.map((_, li) => {
          const ly = letterYs[li];
          return JARVIS_OUTPUTS.map((_, oi) => {
            const oy = outputYs[oi];
            const pathD = `M ${jarvisX + 18} ${ly} C ${jarvisX + 100} ${ly}, ${outputDotX - 100} ${oy}, ${outputPillX} ${oy}`;
            return (
              <motion.path
                key={`mesh-out-${li}-${oi}`}
                d={pathD}
                fill="none"
                stroke="url(#jarvis-line-out)"
                strokeWidth="0.8"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 0.6 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + li * 0.04 + oi * 0.02 }}
              />
            );
          });
        })}

        {/* ── JARVIS letter nodes (center column) ── */}
        {jarvisLetters.map((letter, i) => {
          const y = letterYs[i];
          return (
            <motion.g
              key={`letter-${i}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
            >
              {/* Outer glow */}
              <motion.circle
                cx={jarvisX}
                cy={y}
                r="22"
                fill="none"
                stroke="url(#jarvis-grad)"
                strokeWidth="1"
                animate={inView ? { opacity: [0.2, 0.5, 0.2], r: [22, 24, 22] } : {}}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
              />
              {/* Node circle */}
              <circle
                cx={jarvisX}
                cy={y}
                r="18"
                fill="white"
                stroke="url(#jarvis-grad)"
                strokeWidth="1.5"
              />
              {/* Letter */}
              <text
                x={jarvisX}
                y={y + 1}
                textAnchor="middle"
                dominantBaseline="central"
                className="text-[16px] font-bold"
                fill="url(#jarvis-grad)"
              >
                {letter}
              </text>
            </motion.g>
          );
        })}

        {/* ── Animated flowing dots on input mesh ── */}
        {inView && JARVIS_INPUTS.map((_, ii) => {
          const iy = inputYs[ii];
          const li = ii % jarvisLetters.length;
          const ly = letterYs[li];
          const pathD = `M ${inputDotX + 20} ${iy} C ${inputDotX + 100} ${iy}, ${jarvisX - 80} ${ly}, ${jarvisX - 18} ${ly}`;
          return (
            <motion.circle
              key={`dot-in-${ii}`}
              r="2"
              fill="url(#jarvis-grad)"
              filter="url(#jarvis-glow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.2, delay: 1.2 + ii * 0.25, repeat: Infinity, repeatDelay: 2 }}
            >
              <animateMotion
                dur="2.2s"
                begin={`${1.2 + ii * 0.25}s`}
                repeatCount="indefinite"
                path={pathD}
              />
            </motion.circle>
          );
        })}

        {/* ── Animated flowing dots on output mesh ── */}
        {inView && JARVIS_OUTPUTS.map((_, oi) => {
          const oy = outputYs[oi];
          const li = oi % jarvisLetters.length;
          const ly = letterYs[li];
          const pathD = `M ${jarvisX + 18} ${ly} C ${jarvisX + 100} ${ly}, ${outputDotX - 100} ${oy}, ${outputPillX} ${oy}`;
          return (
            <motion.circle
              key={`dot-out-${oi}`}
              r="2"
              fill="url(#jarvis-grad)"
              filter="url(#jarvis-glow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2, delay: 1.8 + oi * 0.3, repeat: Infinity, repeatDelay: 2.5 }}
            >
              <animateMotion
                dur="2s"
                begin={`${1.8 + oi * 0.3}s`}
                repeatCount="indefinite"
                path={pathD}
              />
            </motion.circle>
          );
        })}

        {/* ── Output analysis pills ── */}
        {JARVIS_OUTPUTS.map((item, i) => {
          const y = outputYs[i];
          return (
            <motion.g
              key={`out-${i}`}
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 1 + i * 0.08 }}
            >
              <rect
                x={outputPillX}
                y={y - 16}
                width={outputPillW}
                height={32}
                rx="16"
                fill="white"
                stroke="url(#jarvis-grad)"
                strokeWidth="0.8"
                strokeOpacity="0.3"
              />
              <text
                x={outputPillX + outputPillW / 2}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                className="fill-foreground text-[11px] font-semibold"
              >
                {item.label}
              </text>
            </motion.g>
          );
        })}

        {/* ── Lines: output pills → final outputs ── */}
        {JARVIS_OUTPUTS.map((_, oi) => {
          const oy = outputYs[oi];
          return finalOutputs.map((_, fi) => {
            const fy = finalYs[fi];
            const pathD = `M ${outputPillX + outputPillW} ${oy} C ${outputPillX + outputPillW + 60} ${oy}, ${finalX - 60} ${fy}, ${finalX} ${fy}`;
            return (
              <motion.path
                key={`final-line-${oi}-${fi}`}
                d={pathD}
                fill="none"
                stroke="url(#jarvis-line-final)"
                strokeWidth="0.8"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 0.5 } : {}}
                transition={{ duration: 0.6, delay: 1.4 + oi * 0.05 }}
              />
            );
          });
        })}

        {/* ── Final output nodes ── */}
        {finalOutputs.map((label, i) => {
          const y = finalYs[i];
          return (
            <motion.g
              key={`final-${i}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.8 + i * 0.15 }}
            >
              {/* Glow */}
              <motion.rect
                x={finalX - 4}
                y={y - 22}
                width={finalW + 8}
                height={44}
                rx="22"
                fill="none"
                stroke="url(#jarvis-grad)"
                strokeWidth="1"
                animate={inView ? { opacity: [0.2, 0.45, 0.2] } : {}}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
              />
              <rect
                x={finalX}
                y={y - 18}
                width={finalW}
                height={36}
                rx="18"
                fill="white"
                stroke="url(#jarvis-grad)"
                strokeWidth="1.5"
              />
              <text
                x={finalX + finalW / 2}
                y={y + 1}
                textAnchor="middle"
                dominantBaseline="central"
                className="text-[11px] font-bold"
                fill="url(#jarvis-grad)"
              >
                {label}
              </text>
            </motion.g>
          );
        })}
      </motion.svg>
    </div>
  );
}

/* Animating ticker number — cycles through digits */
function TickerNumber({ value, duration = 3, isThree = false }) {
  const digits = String(value).padStart(isThree ? 3 : 2, "0");
  return (
    <span className="inline-flex overflow-hidden">
      {digits.split("").map((d, i) => (
        <motion.span
          key={i}
          className="text-xl font-bold text-foreground inline-block"
          animate={{ y: [12, 0, 0, -12], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
            times: [0, 0.15, 0.75, 1],
          }}
        >
          {d}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Mini animated illustrations for portfolio cards ─────────────── */
function JarvisMiniChart() {
  return (
    <svg viewBox="0 0 280 120" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      {/* Grid lines */}
      {[30, 55, 80].map((y) => (
        <line key={y} x1="20" y1={y} x2="260" y2={y} stroke="white" strokeOpacity="0.1" strokeDasharray="3 3" />
      ))}
      {/* Animated stock line */}
      <motion.path
        d="M20 90 L55 72 L90 78 L120 55 L150 60 L180 35 L210 42 L240 22 L260 28"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "loop", repeatDelay: 1, ease: "easeInOut" }}
      />
      {/* Glow area under line */}
      <motion.path
        d="M20 90 L55 72 L90 78 L120 55 L150 60 L180 35 L210 42 L240 22 L260 28 L260 110 L20 110Z"
        fill="url(#jarvis-mini-fill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0.4, 0] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
      />
      {/* Pulsing dot at peak */}
      <motion.circle
        cx="240" cy="22" r="4"
        fill="white"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1.3, 0] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
      />
      {/* Mini bars */}
      {[
        { x: 40, h: 18 }, { x: 56, h: 25 }, { x: 72, h: 14 }, { x: 88, h: 30 },
        { x: 104, h: 20 }, { x: 120, h: 35 }, { x: 136, h: 22 }, { x: 152, h: 28 },
      ].map(({ x, h }, i) => (
        <motion.rect
          key={i}
          x={x} y={110 - h} width="8" height={h} rx="2"
          fill="white" fillOpacity="0.15"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.4, delay: i * 0.1, repeat: Infinity, repeatType: "reverse", repeatDelay: 3 }}
          style={{ transformOrigin: `${x + 4}px 110px` }}
        />
      ))}
      <defs>
        <linearGradient id="jarvis-mini-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.3" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function TransBnkMiniFlow() {
  const nodes = [
    { x: 30, y: 60, label: "$" },
    { x: 140, y: 35, label: "B" },
    { x: 140, y: 85, label: "A" },
    { x: 250, y: 60, label: "✓" },
  ];
  return (
    <svg viewBox="0 0 280 120" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      {/* Connection lines */}
      {[
        { x1: 48, y1: 60, x2: 122, y2: 35 },
        { x1: 48, y1: 60, x2: 122, y2: 85 },
        { x1: 158, y1: 35, x2: 232, y2: 60 },
        { x1: 158, y1: 85, x2: 232, y2: 60 },
      ].map((l, i) => (
        <motion.line
          key={i}
          x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke="white" strokeOpacity="0.3" strokeWidth="1.5"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.5 + i * 0.2, repeat: Infinity, repeatDelay: 3 }}
        />
      ))}
      {/* Traveling dots */}
      {[
        { from: [48, 60], to: [122, 35], delay: 0.6 },
        { from: [48, 60], to: [122, 85], delay: 0.8 },
        { from: [158, 35], to: [232, 60], delay: 1.4 },
        { from: [158, 85], to: [232, 60], delay: 1.6 },
      ].map((d, i) => (
        <motion.circle
          key={`dot-${i}`}
          r="3" fill="white"
          initial={{ cx: d.from[0], cy: d.from[1], opacity: 0 }}
          animate={{ cx: [d.from[0], d.to[0]], cy: [d.from[1], d.to[1]], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1, delay: d.delay, repeat: Infinity, repeatDelay: 3 }}
        />
      ))}
      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          <motion.circle
            cx={n.x} cy={n.y} r="18"
            fill="white" fillOpacity="0.15"
            stroke="white" strokeOpacity="0.4" strokeWidth="1.5"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.15, repeat: Infinity, repeatType: "reverse", repeatDelay: 4 }}
          />
          <text x={n.x} y={n.y} textAnchor="middle" dominantBaseline="central" fill="white" fontSize="12" fontWeight="700">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function EVJointsMiniCharge() {
  return (
    <svg viewBox="0 0 280 120" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      {/* Battery outline */}
      <rect x="80" y="25" width="100" height="70" rx="10" fill="none" stroke="white" strokeOpacity="0.4" strokeWidth="2" />
      <rect x="180" y="48" width="10" height="24" rx="4" fill="white" fillOpacity="0.3" />
      {/* Animated fill */}
      <motion.rect
        x="86" y="31" width="0" height="58" rx="6"
        fill="white" fillOpacity="0.25"
        animate={{ width: [0, 88, 88, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Lightning bolt */}
      <motion.path
        d="M126 38 L118 56 L128 56 L120 82"
        fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        animate={{ opacity: [0.4, 1, 0.4], filter: ["drop-shadow(0 0 2px white)", "drop-shadow(0 0 8px white)", "drop-shadow(0 0 2px white)"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Percentage text */}
      <motion.text
        x="220" y="65" textAnchor="middle" dominantBaseline="central"
        fill="white" fontSize="16" fontWeight="800"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.tspan
          animate={{ text: ["0%", "25%", "50%", "75%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </motion.text>
      {/* Animated percentage - using separate elements */}
      {["0%", "25%", "50%", "75%", "100%"].map((pct, i) => (
        <motion.text
          key={pct}
          x="225" y="65" textAnchor="middle" dominantBaseline="central"
          fill="white" fontSize="14" fontWeight="800"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
          transition={{
            duration: 4, repeat: Infinity,
            times: [0, i * 0.2, i * 0.2 + 0.01, (i + 1) * 0.2, (i + 1) * 0.2 + 0.01, 1],
          }}
        >
          {pct}
        </motion.text>
      ))}
      {/* Charging station dots */}
      {[{ x: 30, y: 40 }, { x: 45, y: 70 }, { x: 20, y: 90 }, { x: 55, y: 95 }].map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x} cy={p.y} r="4"
          fill="white" fillOpacity="0.3"
          animate={{ fillOpacity: [0.2, 0.6, 0.2], r: [3, 5, 3] }}
          transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
        />
      ))}
    </svg>
  );
}

function PortfolioHighlightsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const highlights = [
    {
      id: "transbnk",
      title: "Open Finance Infrastructure For Transaction Banking",
      badge: "Strategic Exit",
      desc: "Open finance infrastructure for transaction banking — 130x ROI on strategic exit, backed by Bessemer Venture Partners.",
      cta: "View Exit Story",
      href: "#transbnk-section",
      bg: "linear-gradient(135deg, #065f46 0%, #16a34a 50%, #4ade80 100%)",
    },
    {
      id: "jarvis",
      title: "Investing Powered by AI",
      badge: "In-House Product",
      desc: "AI-powered investment advisory platform analysing 300M+ data points — serving 250K+ clients across 5 countries.",
      cta: "View Case Study",
      href: "#jarvis-section",
      bg: "linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)",
    },
    {
      id: "evjoints",
      title: "Unified EV Charging App",
      badge: "Product",
      desc: "Comprehensive EV charging solution — mobile apps, website, and portals for seamless booking, navigation, and management.",
      cta: "View Product",
      href: "#evjoints-section",
      bg: "linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)",
    },
  ];

  return (
    <section ref={ref} className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <GBadge>Portfolio</GBadge>
          <h2 className="font-helvetica text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight text-foreground mb-4 leading-tight">
            What We've <span style={GT} className="font-moralana">Built & Exited</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            From in-house products to strategic exits — proof that our co-build model delivers outsized returns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item, i) => (
            <motion.a
              key={item.title}
              href={item.href}
              className="rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[360px] group overflow-hidden relative"
              style={{ background: item.bg }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              {/* Mini illustration */}
              <div className="w-full h-32 mb-4 rounded-xl bg-white/10 backdrop-blur-sm overflow-hidden relative">
                {item.id === "jarvis" && <JarvisMiniChart />}
                {item.id === "transbnk" && <TransBnkMiniFlow />}
                {item.id === "evjoints" && <EVJointsMiniCharge />}
              </div>
              <div>
                <span className="inline-block bg-white/20 text-white text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3">
                  {item.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/80 text-xs leading-relaxed">{item.desc}</p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-white mt-4 group-hover:gap-3 transition-all">
                {item.cta} <ArrowRight className="w-4 h-4" />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function JarvisCaseStudySection() {

  return (
    <section className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-6">
          <GBadge>Case Study</GBadge>
          <h2 className="font-helvetica text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight text-foreground mb-4 leading-tight">
            Jarvis — <span style={{ backgroundImage: "linear-gradient(135deg, #1e40af, #3b82f6, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }} className="font-moralana">Investing Powered by AI</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
            Explore solutions curated to simplify and streamline every aspect of a customer's journey in the equity markets — analysing 300 million data points per market across 7+ years of legacy.
          </p>
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-center gap-8 sm:gap-16 mb-14 flex-wrap">
          {[
            ["250K+", "Entrusted Clients"],
            ["7+", "Years Legacy in India"],
            ["2200+", "Partners"],
            ["$20M+", "Assets Under Advisory"],
            ["05", "Countries"],
            ["30+", "Brokers"],
            ["20+", "Institutions"],
          ].map(([v, l]) => (
            <div key={l} className="text-center">
              <div className="text-2xl sm:text-3xl font-black mb-1 text-gray-500">{v}</div>
              <div className="text-xs text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>

        {/* Animated illustration */}
        <div className="rounded-2xl border border-border bg-white p-4 sm:p-8 lg:p-10">
          <JarvisFlowIllustration />
        </div>

        {/* ── Solutions & Tech Stack ── */}
        <div className="mt-16 rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto]">
            {/* Solutions grid */}
            <div className="p-8 sm:p-10">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Solutions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Stock Brokers", icon: BarChart3 },
                  { label: "Asset Management Companies", icon: Building2 },
                  { label: "Pension Funds", icon: Briefcase },
                  { label: "Banks", icon: Building },
                  { label: "Private Markets", icon: TrendingUp },
                  { label: "Wealth Management Companies", icon: Globe },
                  { label: "Research Analysts", icon: Search },
                  { label: "Insurers", icon: ShieldCheck },
                ].map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 border border-white/20 bg-white/10 backdrop-blur-sm"
                  >
                    <Icon className="w-5 h-5 text-white/80 shrink-0" strokeWidth={1.5} />
                    <span className="text-sm font-semibold text-white leading-tight">{label}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/50 mt-4">Offerings: JARVIS APIs · White Labelled Solutions · Custom Solutions</p>
            </div>

            {/* Tech Stack */}
            <div className="bg-white/10 backdrop-blur-sm p-8 sm:p-10 flex flex-col items-center justify-center lg:w-[240px] border-t lg:border-t-0 lg:border-l border-white/10">
              <h3 className="text-xl font-bold text-white mb-5">Tech Stack</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                  { name: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
                  { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
                  { name: "AWS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
                ].map(({ name, img }) => (
                  <div key={name} className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <img src={img} alt={name} className="w-8 h-8" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── TransBnk Case Study ───────────────────────────────────────── */
function TransBnkSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const TRANSBNK_FEATURES = [
    { label: "Value Added Services", icon: Sparkles },
    { label: "Co-Lending Platform", icon: Users },
    { label: "Digital Escrow Stack", icon: Monitor },
    { label: "API Orchestration", icon: Cable },
    { label: "Lending Ecosystem Enabler", icon: Layers },
    { label: "Repayment Hub", icon: CreditCard },
    { label: "Risk Radar", icon: Eye },
    { label: "Supply Chain Finance", icon: RefreshCw },
    { label: "Recurring Payments Infrastructure", icon: Repeat },
  ];

  const TRANSBNK_STATS = [
    { value: "$30M", label: "Total funding raised" },
    { value: "$25M", label: "Series B led by Bessemer Venture Partners" },
    { value: "7x", label: "Valuation growth from last round" },
    { value: "220+", label: "Clients across 40+ bank integrations" },
  ];

  const INVESTMENT_STORY = [
    "Early strategic investor in TransBnk — built the core technology platform as engineering partner",
    "Executed successful partial exit at 130x return on initial investment — validating our co-build equity model",
    "TransBnk now backed by Bessemer Venture Partners, Arkam Ventures, Fundamentum, expanding to SE Asia & Middle East",
  ];

  return (
    <section ref={ref} className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <GBadge>Portfolio Exit</GBadge>
          <h2 className="font-helvetica text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight text-foreground mb-4 leading-tight">
            TransBnk — <span style={{ backgroundImage: "linear-gradient(135deg, #065f46, #16a34a, #4ade80)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }} className="font-moralana">130x Return</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            India's Fastest-Growing Open Finance Infrastructure For Transaction Banking.
            Where 'Global Transaction Banking' Meets Our Technology, Excellence Emerges.
          </p>
        </div>

        {/* Strategic Exit highlight */}
        <motion.div
          className="rounded-2xl border border-border overflow-hidden mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr]">
            {/* Left — 130x */}
            <div className="p-8 sm:p-10 flex flex-col justify-center" style={{ background: "linear-gradient(135deg, oklch(0.97 0.01 150) 0%, oklch(0.95 0.02 150) 100%)" }}>
              <motion.p
                className="text-6xl sm:text-8xl font-black tracking-tight"
                style={{ color: "#16a34a" }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                130x
              </motion.p>
              <p className="text-lg font-bold text-foreground mt-2">Return On Investment</p>
              <p className="text-sm text-muted-foreground">Successful Partial Exit</p>
            </div>

            {/* Right — Stats */}
            <div className="p-8 sm:p-10 bg-card">
              <h3 className="text-xl font-bold text-foreground mb-1">TransBnk</h3>
              <p className="text-sm text-muted-foreground mb-6">India's Fastest-Growing Open Finance Infrastructure For Transaction Banking</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {TRANSBNK_STATS.map(({ value, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  >
                    <p className="text-2xl sm:text-3xl font-black" style={{ color: "#16a34a" }}>{value}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-tight">{label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Investment Story */}
        <motion.div
          className="mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6">TechStalwarts Investment Story</h3>
          <div className="space-y-4">
            {INVESTMENT_STORY.map((point, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.12 }}
              >
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg, #065f46, #16a34a)" }}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{point}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* App Features */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 text-center">App Features</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {TRANSBNK_FEATURES.map(({ label, icon: Icon }, i) => (
              <motion.div
                key={label}
                className="flex flex-col items-center text-center gap-3 rounded-xl border border-border bg-card p-5"
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35, delay: 0.8 + i * 0.06 }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "oklch(0.95 0.02 150)" }}>
                  <Icon className="w-5 h-5" style={{ color: "#16a34a" }} strokeWidth={1.5} />
                </div>
                <span className="text-sm font-semibold text-foreground leading-tight">{label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Precision Products */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto">
          {[
            { label: "Faster and Efficient Implementation", icon: Rocket },
            { label: "Comprehensive APIs and SDKs", icon: Code2 },
            { label: "Trustworthy & Highly Secure Solution", icon: Lock },
            { label: "Seamless and Effortless Integration", icon: Link2 },
          ].map(({ label, icon: Icon }, i) => (
            <motion.div
              key={label}
              className="text-center"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, delay: 1 + i * 0.08 }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ background: "oklch(0.95 0.02 150)" }}>
                <Icon className="w-5 h-5" style={{ color: "#16a34a" }} strokeWidth={1.5} />
              </div>
              <p className="text-sm font-semibold text-foreground leading-tight">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Awards */}
        <motion.div
          className="rounded-2xl p-8 sm:p-10 text-center"
          style={{ background: "linear-gradient(135deg, oklch(0.97 0.01 150) 0%, oklch(0.95 0.02 150) 100%)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <h3 className="text-xl font-bold text-foreground mb-6">A Symphony of Success</h3>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {[
              "Best Emerging Fintech Solution 2023",
              "Top Blockchain Tech to Watch 2022",
              "Top 30 Startups July 2023",
              "LAB 32 Cohort 9 Most Promising",
              "The Fintech Yatra Cohort 2023",
              "Top Disruptors 2023",
            ].map((award) => (
              <div key={award} className="flex items-center gap-2">
                <Crown className="w-4 h-4 shrink-0" style={{ color: "#16a34a" }} strokeWidth={1.5} />
                <span className="text-xs sm:text-sm font-medium text-muted-foreground">{award}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── EVJoints Case Study ──────────────────────────────────────────── */
function EVJointsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const EVJOINTS_FEATURES = [
    { label: "Charging History", icon: Clock },
    { label: "Booking History", icon: FileText },
    { label: "Plan a Trip", icon: Map },
    { label: "Favorite Charging Stations", icon: Star },
    { label: "Multiple Vehicle", icon: Car },
    { label: "Tag Your Family, Friends and Driver", icon: Heart },
  ];

  return (
    <section id="evjoints-section" ref={ref} className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <GBadge>Product</GBadge>
          <h2 className="font-helvetica text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight text-foreground mb-4 leading-tight">
            EVJoints — <span style={{ backgroundImage: "linear-gradient(135deg, #059669, #10b981, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }} className="font-moralana">Unified EV Charging App</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-base leading-relaxed">
            We developed EVJoints, a comprehensive EV charging solution, encompassing mobile apps, website, and portals for seamless booking, navigation, and management, revolutionizing the electric vehicle charging experience.
          </p>
        </div>

        {/* Overview card */}
        <motion.div
          className="rounded-2xl border border-border overflow-hidden mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr]">
            {/* Left — Tech Stack */}
            <div className="p-8 sm:p-10 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-border">
              <h3 className="text-lg font-bold text-foreground mb-5">Tech Stack</h3>
              <div className="flex items-center gap-4">
                {[
                  { name: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
                  { name: "Swift", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
                  { name: "Kotlin", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
                  { name: "Firebase", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
                ].map(({ name, img }) => (
                  <div key={name} className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center shadow-sm">
                    <img src={img} alt={name} className="w-7 h-7" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Features */}
            <div className="p-8 sm:p-10">
              <h3 className="text-lg font-bold text-foreground mb-5">Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EVJOINTS_FEATURES.map(({ label, icon: Icon }, i) => (
                  <motion.div
                    key={label}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -12 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.35, delay: 0.3 + i * 0.08 }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "oklch(0.95 0.03 160)" }}>
                      <Icon className="w-4 h-4" style={{ color: "#059669" }} strokeWidth={1.5} />
                    </div>
                    <span className="text-sm font-medium text-foreground">{label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hero showcase */}
        <motion.div
          className="rounded-2xl overflow-hidden p-8 sm:p-12 text-center"
          style={{ background: "linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)" }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Charge Your Electric Cars Across Various<br />
            <span className="font-moralana">Charging Station Networks</span>
          </h3>
          <p className="text-white/80 text-sm max-w-xl mx-auto mb-8">
            Find, book, navigate, and pay at charging stations — all from one unified app. Supporting multiple vehicles, trip planning, and family sharing.
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {[
              { icon: Navigation, label: "Find & Navigate" },
              { icon: Battery, label: "Smart Charging" },
              { icon: CreditCard, label: "Pay & Go" },
              { icon: Car, label: "Multi-Vehicle" },
            ].map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35, delay: 0.5 + i * 0.1 }}
              >
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-semibold text-white/90">{label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── 5. Founders Testimonial ─────────────────────────────────────── */
function TestimonialSection() {
  const [playing, setPlaying] = useState(false);
  return (
    <section className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <GBadge>Social Proof</GBadge>
          <h2 className="font-helvetica text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight text-foreground mb-4 leading-tight">
            Founders Who <span style={GT} className="font-moralana">Scaled With Us</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base">
            Hear directly from founders who built and scaled their ventures through StalwartsLAB.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden aspect-video cursor-pointer group" onClick={() => setPlaying(true)}>
            <img
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=80"
              alt="Testimonial"
              className="w-full h-full object-cover"
              style={{ filter: "saturate(0.5) brightness(0.6)" }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)" }} />

            {/* Play button */}
            {!playing && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-18 h-18 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ background: BG, boxShadow: GLOW, width: 72, height: 72 }}>
                  <Play className="w-7 h-7 text-white ml-1" fill="white" />
                </div>
              </div>
            )}

            {/* Name tag */}
            <div className="absolute bottom-6 left-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30">
                <img src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=100&q=80" alt="Chris Do" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Chris Do</p>
                <p className="text-xs text-white/60">CEO, The Futur</p>
              </div>
              <div className="ml-4 pl-4 border-l border-white/20">
                <p className="text-xs text-white/50 font-medium">Webflow</p>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {[0, 1, 2].map(i => (
              <div key={i} className="rounded-full" style={{ width: i === 0 ? 24 : 8, height: 8, background: i === 0 ? "oklch(0.57 0.22 25)" : "var(--color-border)", transition: "width 0.3s" }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 6. Blog ─────────────────────────────────────────────────────── */
function BlogSection() {
  return (
    <section className="py-24 border-t border-border bg-card/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-4">
          <div>
            <GBadge>Insights</GBadge>
            <h2 className="font-helvetica text-2xl sm:text-4xl font-light tracking-tight text-foreground leading-tight">
              Built to <span style={GT} className="font-moralana">Advance</span>
            </h2>
          </div>
          <a href="#" className="hidden lg:flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
            View all posts <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <article key={post.title} className="group cursor-pointer">
              <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-5">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ filter: "saturate(0.7)" }}
                />
              </div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                {post.category.split(" · ").map(c => (
                  <span key={c} className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border border-border text-muted-foreground">{c}</span>
                ))}
              </div>
              <h3 className="text-sm font-bold text-foreground mb-2 leading-snug group-hover:opacity-70 transition-opacity">
                {post.title}
              </h3>
              <p className="text-[11px] text-muted-foreground">{post.author} · {post.date}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 7. Contact Form ─────────────────────────────────────────────── */
function ContactSection() {
  const [form, setForm] = useState({
    name: "", phone: "", company: "", sector: "", email: "", cofounders: "", fundRaise: "",
  });
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const inputCls = "w-full rounded-xl border border-border bg-card/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-card transition-colors";
  const labelCls = "block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5";

  return (
    <section id="lab-contact" className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left */}
          <div className="lg:col-span-4">
            <GBadge>Talk to Experts</GBadge>
            <h2 className="font-helvetica text-2xl sm:text-4xl font-light tracking-tight text-foreground mb-4 leading-tight">
              Start the <span style={GT} className="font-moralana">Conversation.</span>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-10">
              Submit your details and our team will respond within 24 hours to advance your application.
            </p>
            <div className="flex flex-col gap-5">
              {[
                { icon: Mail,    text: "hello@techstalwarts.com" },
                { icon: Phone,   text: "+91 98765 43210" },
                { icon: MapPin,  text: "Mumbai · Bhopal · Dubai" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "color-mix(in oklch, oklch(0.57 0.22 25) 12%, transparent)", border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 20%, transparent)" }}>
                    <Icon className="w-4 h-4" stroke="url(#lab-icon-grad)" strokeWidth={1.6} />
                  </div>
                  <span className="text-sm text-muted-foreground">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-border bg-card/40 p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Your Full Name</label>
                  <input className={inputCls} placeholder="Jane Smith" value={form.name} onChange={set("name")} />
                </div>
                <div>
                  <label className={labelCls}>Your Contact Number</label>
                  <input className={inputCls} placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")} />
                </div>
                <div>
                  <label className={labelCls}>Company Name</label>
                  <input className={inputCls} placeholder="Big Kahuna Burger Ltd." value={form.company} onChange={set("company")} />
                </div>
                <div>
                  <label className={labelCls}>Company Sector</label>
                  <input className={inputCls} placeholder="Fintech, Healthcare, SaaS…" value={form.sector} onChange={set("sector")} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Your Email</label>
                  <input className={inputCls} type="email" placeholder="abc@gmail.com" value={form.email} onChange={set("email")} />
                </div>
                <div>
                  <label className={labelCls}>No. of Co-Founders</label>
                  <input className={inputCls} placeholder="2" value={form.cofounders} onChange={set("cofounders")} />
                </div>
                <div>
                  <label className={labelCls}>Looking to Fund Raise?</label>
                  <div className="flex items-center gap-3 mt-1">
                    {["Yes", "No"].map(opt => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, fundRaise: opt }))}
                        className="flex-1 py-3 rounded-xl border text-sm font-semibold transition-all"
                        style={form.fundRaise === opt
                          ? { background: BG, borderColor: "transparent", color: "#fff", boxShadow: GLOW }
                          : { borderColor: "var(--color-border)", background: "var(--color-card)", color: "var(--color-muted-foreground)" }
                        }
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <Button
                className="mt-6 w-full rounded-xl gap-2 font-semibold text-white border-none py-6 text-base"
                style={{ background: BG, boxShadow: GLOW }}
              >
                Submit <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CTA ─────────────────────────────────────────────────────────── */
function CTASection() {
  return (
    <section className="page-grid py-24 border-t border-border">
      <div className="col-span-12 rounded-2xl overflow-hidden relative" style={{ border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 25%, transparent)", background: "var(--color-card)" }}>
        <AuroraBg variant="dark" />
        <div aria-hidden className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ zIndex: 1, backgroundImage: "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative px-6 sm:px-12 lg:px-16 py-12 sm:py-16 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-10 text-center lg:text-left" style={{ zIndex: 2 }}>
          <div className="max-w-xl">
            <GBadge>Apply Now</GBadge>
            <h2 className="font-helvetica text-3xl sm:text-4xl lg:text-[2.75rem] font-light tracking-tight text-foreground mb-4 leading-tight">
              Your Venture Starts<br /><span style={GT} className="font-moralana">Here. Launch It.</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-md mx-auto lg:mx-0">
              Join StalwartsLAB. Access expert mentorship, capital networks, technical infrastructure, and a community of driven founders who execute.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0 w-full sm:w-auto">
            <Button size="lg" className="rounded-full gap-2 group font-semibold text-white border-none w-full sm:min-w-52" style={{ background: BG, boxShadow: GLOW }}>
              Apply to the Program <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-border bg-card/60 text-foreground hover:bg-secondary w-full sm:min-w-52">
              Talk to Experts
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Page ────────────────────────────────────────────────────────── */
export default function LabsPage() {
  return (
    <div className="bg-background">
      <GradientDefs />
      <HeroSection />
      <FoundersMessageSection />
      <StagesSection />
      <PortfolioHighlightsSection />
      <JarvisCaseStudySection />
      <TransBnkSection />
      <EVJointsSection />
      <TestimonialSection />
      <BlogSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </div>
  );
}
