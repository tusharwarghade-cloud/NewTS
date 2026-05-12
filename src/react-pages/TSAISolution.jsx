import { useState, useEffect, useRef, createContext, useContext, memo, useCallback, lazy, Suspense } from "react";
const MeshGradient = lazy(() =>
  import("@paper-design/shaders-react").then((m) => ({ default: m.MeshGradient }))
);
import Footer from "@/components/Footer";
import { motion, animate, useInView, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import AuroraBg from "@/components/AuroraBg";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Bot, Sparkles, Brain, Network, ShieldCheck, BarChart3, Eye, Zap,
  TrendingUp, MessageSquare, Search, Settings, Database, Cloud,
  CheckCircle2, ArrowRight, Layers, Code2, Target, Lock, RefreshCw,
  Cpu, Activity, BrainCircuit, GitBranch, Lightbulb, Gauge,
  FlaskConical, Rocket, Workflow, Blocks,
} from "lucide-react";

/* ── Brand ──────────────────────────────────────────────────────── */
const BG   = "linear-gradient(135deg, oklch(0.57 0.22 25) 0%, oklch(0.52 0.24 292) 100%)";
const GLOW = "0 0 28px color-mix(in oklch, oklch(0.57 0.22 25) 32%, transparent)";
const GT   = { backgroundImage: BG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };

function GradientDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute", overflow: "hidden" }} aria-hidden>
      <defs>
        <linearGradient id="ai-icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
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

/* ── FadeIn helper ───────────────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >{children}</motion.div>
  );
}

/* ── GlowingEffect (Aceternity) ──────────────────────────────────── */
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
      if (distanceFromCenter < inactiveRadius) { element.style.setProperty("--active", "0"); return; }
      const isActive =
        mouseX > left - proximity && mouseX < left + width + proximity &&
        mouseY > top - proximity && mouseY < top + height + proximity;
      element.style.setProperty("--active", isActive ? "1" : "0");
      if (!isActive) return;
      const currentAngle = parseFloat(element.style.getPropertyValue("--start")) || 0;
      const targetAngle = (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90;
      const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
      animate(currentAngle, currentAngle + angleDiff, {
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
        <div className="glow rounded-[inherit]
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

/* ── AI Bento Item ───────────────────────────────────────────────── */
function AIBentoItem({ icon: Icon, title, desc, span, index }) {
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
        <GlowingEffect spread={40} borderWidth={1.5} proximity={64} inactiveZone={0.1} />
        <div ref={glowRef} className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300" style={{ opacity: 0 }} />
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 rounded-tl-2xl pointer-events-none border-border/60" />
        <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 rounded-tr-2xl pointer-events-none border-border/60" />
        <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 rounded-bl-2xl pointer-events-none border-border/60" />
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 rounded-br-2xl pointer-events-none border-border/60" />

        <div className="relative">
          <Icon className="w-6 h-6" stroke="url(#ai-icon-grad)" strokeWidth={1.6} />
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

/* ── AI System Card (Hero visual) ───────────────────────────────── */
function NeuralNetSVG() {
  const iX = 42, hX = 150, oX = 258;
  const inputY  = [40, 90, 140];
  const hiddenY = [28, 68, 108, 148];
  const outputY = [60, 110];
  const connections = [];
  inputY.forEach(iy => hiddenY.forEach(hy => connections.push([iX, iy, hX, hy])));
  hiddenY.forEach(hy => outputY.forEach(oy => connections.push([hX, hy, oX, oy])));
  return (
    <svg viewBox="0 0 300 178" className="w-full" style={{ height: 100 }}>
      {connections.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="oklch(0.57 0.22 25)" strokeWidth={0.7} opacity={0.18} />
      ))}
      {inputY.map((y, i) => (
        <circle key={`i${i}`} cx={iX} cy={y} r={7} fill="oklch(0.57 0.22 25)" opacity={0.75}>
          <animate attributeName="opacity" values="0.75;1;0.75" dur={`${1.4 + i * 0.3}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {hiddenY.map((y, i) => (
        <circle key={`h${i}`} cx={hX} cy={y} r={6} fill="oklch(0.52 0.24 292)" opacity={0.65}>
          <animate attributeName="opacity" values="0.65;1;0.65" dur={`${1.1 + i * 0.25}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {outputY.map((y, i) => (
        <circle key={`o${i}`} cx={oX} cy={y} r={8} fill="oklch(0.57 0.22 25)" opacity={0.85}>
          <animate attributeName="opacity" values="0.85;1;0.85" dur={`${1.7 + i * 0.4}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

function AISystemCard() {
  const [queries, setQueries] = useState(12847);
  useEffect(() => {
    const t = setInterval(() => setQueries(q => q + Math.floor(Math.random() * 3) + 1), 900);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative w-full">
      <div className="rounded-2xl border border-border bg-card overflow-hidden" style={{ boxShadow: "0 8px 48px rgba(0,0,0,0.4)" }}>
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/20">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="text-xs text-muted-foreground ml-2 font-mono">TS AI · Inference Engine v2.4</span>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-emerald-400/80 font-mono">LIVE</span>
          </div>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-3 gap-2.5 mb-4">
            {[["98.7%", "Model Accuracy"], ["<12ms", "Avg Latency"], [queries.toLocaleString(), "Inferences"]].map(([v, l]) => (
              <div key={l} className="rounded-xl border border-border bg-background/50 px-3 py-2.5 text-center">
                <div className="text-sm font-bold" style={GT}>{v}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{l}</div>
              </div>
            ))}
          </div>
          <NeuralNetSVG />
          <div className="flex items-end gap-1 h-10 mt-3">
            {[60,80,50,90,70,85,55,95,75,88,65,92].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i % 3 === 0 ? BG : "color-mix(in oklch, oklch(0.57 0.22 25) 22%, var(--color-border))", opacity: 0.85 }} />
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {["NLP", "Gen AI", "Computer Vision", "Fraud ML", "Predictive AI", "AIOps"].map(c => (
              <span key={c} className="px-2.5 py-1 rounded-full text-[10px] font-medium border border-border text-muted-foreground">{c}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute -top-4 -right-4 rounded-xl border border-border bg-card px-3 py-2.5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.35)" }}>
        <div className="text-[10px] text-muted-foreground mb-0.5">Models Deployed</div>
        <div className="text-lg font-bold leading-tight" style={GT}>240+</div>
      </div>
      <div className="absolute -bottom-4 -left-4 rounded-xl border border-border bg-card px-3 py-2.5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.35)" }}>
        <div className="text-[10px] text-muted-foreground mb-0.5">Industries Served</div>
        <div className="text-lg font-bold leading-tight" style={GT}>12+</div>
      </div>
    </div>
  );
}

/* ── AI Terminal (Dev section) ──────────────────────────────────── */
function AITerminal() {
  const lines = [
    { t: "cmd",  s: "$ ts-ai train --model=fraud-detection --data=transactions.csv" },
    { t: "info", s: "> Loading dataset: 842,391 samples" },
    { t: "info", s: "> Feature engineering complete [128 features]" },
    { t: "muted",s: "> Splitting train / val / test — 70 / 15 / 15" },
    { t: "prog", s: "> [████████████████░░░░] 82%  epoch 41 / 50" },
    { t: "ok",   s: "> Val AUC: 0.987  ·  F1: 0.941  ·  Precision: 0.963" },
    { t: "cmd",  s: "$ ts-ai deploy --model=fraud-detection --env=production" },
    { t: "ok",   s: "> Model registered: fraud-detection-v3.2" },
    { t: "ok",   s: "> Endpoint: https://api.ts-ai.io/v1/infer/fraud" },
    { t: "ok",   s: "> Monitoring active  ·  Drift detection enabled" },
    { t: "info", s: "> Ready to serve  ·  Latency p95: 11ms" },
  ];
  const c = { cmd: "#e2e8f0", info: "#94a3b8", muted: "#64748b", prog: "#a78bfa", ok: "#4ade80" };
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10" style={{ background: "#0d1117", boxShadow: "0 8px 48px rgba(0,0,0,0.55)" }}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8" style={{ background: "rgba(255,255,255,0.03)" }}>
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="text-xs ml-2 font-mono" style={{ color: "rgba(255,255,255,0.28)" }}>ts-ai-cli · model training</span>
      </div>
      <div className="p-5 font-mono text-xs flex flex-col gap-1.5">
        {lines.map((l, i) => <div key={i} style={{ color: c[l.t] }}>{l.s}</div>)}
        <div className="flex items-center gap-1 mt-1">
          <span style={{ color: c.cmd }}>$ </span>
          <span className="inline-block w-1.5 h-3.5 animate-pulse" style={{ background: "rgba(255,255,255,0.6)" }} />
        </div>
      </div>
    </div>
  );
}

/* ── Service Subsection (reusable for sections 4–10) ────────────── */
function ServiceSubsection({ badge, title, desc, items, altBg = false }) {
  return (
    <section className={`page-grid py-16 border-t border-border${altBg ? " bg-card/20" : ""}`}>
      <div className="col-span-12 lg:col-span-4 lg:pr-10 flex flex-col justify-start pt-1">
        <GBadge>{badge}</GBadge>
        <h2 className="text-2xl font-bold text-foreground mb-3 leading-tight">{title}</h2>
        {desc && <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>}
      </div>
      <div className="col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3 rounded-xl border border-border bg-card/60 px-4 py-3 group hover:border-primary/30 hover:bg-card transition-all cursor-default">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "color-mix(in oklch, oklch(0.57 0.22 25) 10%, transparent)", border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 20%, transparent)" }}>
              <Icon className="w-4 h-4" stroke="url(#ai-icon-grad)" strokeWidth={1.6} />
            </div>
            <span className="text-sm font-medium text-foreground leading-tight">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Data ───────────────────────────────────────────────────────── */
const CORE_SERVICES = [
  { icon: Bot,          title: "Conversational AI & Virtual Agents",        desc: "Deploy context-aware agents that automate enterprise and customer-facing workflows end to end.",                    span: 4 },
  { icon: Sparkles,     title: "Personalized Recommendation Engines",       desc: "Power ML-driven personalization for products, content, and service discovery at scale.",                            span: 4 },
  { icon: ShieldCheck,  title: "Fraud Detection & Risk Intelligence",       desc: "Real-time fraud scoring, anomaly detection, credit risk assessment, and AML enforcement.",                          span: 4 },
  { icon: Zap,          title: "Customer Operations Automation",            desc: "Automate ticket routing, resolution, and intelligent escalation across support channels.",                           span: 3 },
  { icon: Eye,          title: "Computer Vision & Visual Intelligence",     desc: "Deploy object detection, OCR, document parsing, and video analytics pipelines at scale.",                           span: 3 },
  { icon: BarChart3,    title: "Advanced Analytics & Data Science",         desc: "Build predictive models and automated insight pipelines that drive operational decisions.",                          span: 3 },
  { icon: Lock,         title: "Secure & Governed AI Systems",              desc: "Enforce explainability, bias auditing, governance frameworks, and compliance audit trails.",                         span: 3 },
  { icon: Cloud,        title: "AIOps & Intelligent Operations",            desc: "Automate incident response with self-healing infrastructure and log intelligence engines.",                          span: 4 },
  { icon: TrendingUp,   title: "Predictive Analytics Platforms",            desc: "Advance demand forecasting, churn prediction, and behavioral modeling in production.",                              span: 4 },
  { icon: MessageSquare,title: "Natural Language Processing (NLP)",         desc: "Build text classification, entity extraction, sentiment analysis, and summarization pipelines — from raw text to production-ready insight engines.",  span: 12 },
];

const CONSULTING_ITEMS = [
  { icon: Target,       label: "AI Roadmap & Strategy" },
  { icon: Sparkles,     label: "Generative AI Adoption Planning" },
  { icon: Search,       label: "AI Readiness Assessment" },
  { icon: Layers,       label: "AI Systems Integration" },
  { icon: Code2,        label: "Custom AI Solution Build" },
  { icon: Settings,     label: "AI Performance Optimization" },
  { icon: GitBranch,    label: "AI Program Execution Planning" },
  { icon: CheckCircle2, label: "Model Validation & QA" },
  { icon: Database,     label: "Data Engineering & Pipeline Design" },
  { icon: ShieldCheck,  label: "AI Ethics & Regulatory Governance" },
  { icon: Activity,     label: "Production Monitoring & Observability" },
];

const CHATBOT_ITEMS = [
  { icon: Lightbulb, label: "Conversational AI Strategy" },
  { icon: MessageSquare, label: "Dialogue Flow Engineering" },
  { icon: GitBranch, label: "Chatbot Architecture Design" },
  { icon: Code2,     label: "Custom Chatbot Build & Deployment" },
  { icon: Layers,    label: "Enterprise Chatbot Integration" },
  { icon: RefreshCw, label: "Ongoing Optimization & Support" },
];

const GENAI_DEV_ITEMS = [
  { icon: Brain,     label: "Custom LLM & Gen AI Model Build" },
  { icon: RefreshCw, label: "Model Replication & Adaptation" },
  { icon: Rocket,    label: "Model Integration & Production Deployment" },
  { icon: Settings,  label: "Model Lifecycle Management" },
  { icon: Gauge,     label: "Domain-Specific Fine-Tuning" },
  { icon: BrainCircuit, label: "Model Architecture Engineering" },
];

const GENAI_CONSULTING_ITEMS = [
  { icon: Target,    label: "Generative AI Enterprise Strategy" },
  { icon: Sparkles,  label: "Gen AI Use-Case Identification & Build" },
  { icon: Layers,    label: "Gen AI Workflow Integration" },
  { icon: Gauge,     label: "Latency & Throughput Optimization" },
  { icon: Database,  label: "Training Data Engineering" },
  { icon: ShieldCheck, label: "Regulatory Compliance & Safety" },
  { icon: Settings,  label: "Instruction Tuning & RLHF" },
];

const AGENT_ITEMS = [
  { icon: Target,    label: "AI Agent Strategy Consulting" },
  { icon: Code2,     label: "AI Agent Design & Development" },
  { icon: Layers,    label: "AI Agent Integration" },
  { icon: Lock,      label: "Security, Compliance & Support" },
  { icon: Gauge,     label: "Advanced Model Optimization" },
  { icon: RefreshCw, label: "Ongoing Maintenance" },
];

const INTEGRATION_ITEMS = [
  { icon: Search,      label: "AI Readiness Assessment" },
  { icon: BrainCircuit,label: "Custom AI Solution Design" },
  { icon: Database,    label: "Data Strategy & Governance" },
  { icon: Code2,       label: "Custom AI Development" },
  { icon: Sparkles,    label: "Generative AI Integration" },
];

const ML_DEV_ITEMS = [
  { icon: Lightbulb, label: "Machine Learning Consulting" },
  { icon: Code2,     label: "ML Development" },
  { icon: Network,   label: "Neural Network Development" },
  { icon: Cpu,       label: "ML Engineering" },
  { icon: Rocket,    label: "ML Implementation" },
  { icon: Cloud,     label: "ML as a Service" },
  { icon: Settings,  label: "MLOps" },
];

const WHY_ITEMS = [
  {
    icon: Brain,
    title: "End-to-End AI Expertise",
    desc: "From strategy and data engineering to model deployment and monitoring — we cover the full AI lifecycle in-house.",
    points: ["Custom model development & fine-tuning", "MLOps and production-grade deployment", "Continuous monitoring and retraining pipelines"],
  },
  {
    icon: ShieldCheck,
    title: "Scalable & Secure Systems",
    desc: "Every system we build is architected for enterprise scale with bank-grade security, compliance, and auditability.",
    points: ["Zero-trust AI infrastructure", "SOC 2 and ISO 27001 aligned", "Explainable and auditable AI outputs"],
  },
  {
    icon: Target,
    title: "Industry-Specific AI Solutions",
    desc: "Deep domain knowledge across fintech, banking, healthcare, and logistics — not generic AI templates.",
    points: ["Pre-built domain connectors", "Regulatory-aware model design", "Sector-specific training data frameworks"],
  },
  {
    icon: BarChart3,
    title: "Advanced Data & ML Capabilities",
    desc: "State-of-the-art ML stack with LLMs, computer vision, NLP, and real-time inference built for enterprise workloads.",
    points: ["LLM fine-tuning & RAG architectures", "Real-time streaming inference pipelines", "AutoML and federated learning support"],
  },
];

const APPROACH_STEPS = [
  { step: "01", title: "Discovery",             desc: "Business context mapping, use-case scoping, and feasibility analysis." },
  { step: "02", title: "Data Preparation",      desc: "Data audit, cleaning, labeling, and pipeline architecture design." },
  { step: "03", title: "Model Design",          desc: "Architecture selection, feature engineering, and training strategy." },
  { step: "04", title: "Development",           desc: "Model training, hyperparameter tuning, and iterative validation." },
  { step: "05", title: "Integration",           desc: "API wrapping, system connectors, and enterprise platform integration." },
  { step: "06", title: "Testing",               desc: "Accuracy benchmarking, bias auditing, and adversarial testing." },
  { step: "07", title: "Deployment",            desc: "Containerized rollout with blue/green deployment and rollback controls." },
  { step: "08", title: "Monitoring",            desc: "Drift detection, performance dashboards, and automated retraining triggers." },
];

const SERVICE_SECTIONS = [
  { badge: "AI Consulting",          title: "AI Consulting",            desc: "Strategic AI guidance to align technology investments with measurable business outcomes.",                               items: CONSULTING_ITEMS,     altBg: false },
  { badge: "Chatbot Development",    title: "AI Chatbot Development",   desc: "Design, build, and deploy intelligent conversational agents for enterprise and customer-facing use cases.",              items: CHATBOT_ITEMS,        altBg: true  },
  { badge: "Generative AI",         title: "Generative AI Development", desc: "Build and fine-tune large language models, diffusion models, and multimodal systems on your data.",                   items: GENAI_DEV_ITEMS,      altBg: false },
  { badge: "Gen AI Consulting",     title: "Generative AI Consulting",  desc: "End-to-end advisory on adopting, integrating, and scaling generative AI within enterprise workflows.",                  items: GENAI_CONSULTING_ITEMS,altBg: true  },
  { badge: "AI Agents",             title: "AI Agent Development",      desc: "Autonomous AI agents that plan, reason, and execute multi-step tasks across your systems and data.",                    items: AGENT_ITEMS,          altBg: false },
  { badge: "AI Integration",        title: "AI Integration",            desc: "Seamlessly embed AI capabilities into your existing products, workflows, and infrastructure.",                          items: INTEGRATION_ITEMS,    altBg: true  },
  { badge: "Machine Learning",      title: "Machine Learning Development", desc: "Custom machine learning models, pipelines, and production-grade systems built for enterprise data environments.", items: ML_DEV_ITEMS,          altBg: false },
];

/* ── Animated Video on Scroll (YoucefBnm) ───────────────────────── */
const _VidCtx = createContext(null);

function _ContainerScroll({ children, className }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end end"] });
  return (
    <_VidCtx.Provider value={{ scrollYProgress }}>
      <div ref={ref} className={`relative w-full${className ? ` ${className}` : ""}`}>{children}</div>
    </_VidCtx.Provider>
  );
}

function _ContainerSticky({ children, className }) {
  return (
    <div className={`sticky left-0 top-0 min-h-svh w-full${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
}

function _ContainerAnimated({ children, className }) {
  const { scrollYProgress } = useContext(_VidCtx);
  const y = useTransform(scrollYProgress, [0.2, 0.8], [80, 0]);
  return (
    <motion.div
      className={className}
      initial={{ filter: "blur(10px)", opacity: 0 }}
      whileInView={{ filter: "blur(0px)", opacity: 1 }}
      viewport={{ once: true }}
      style={{ y }}
      transition={{ type: "spring", stiffness: 100, damping: 16, mass: 0.75 }}
    >
      {children}
    </motion.div>
  );
}

function _ContainerInset({ children, className }) {
  const { scrollYProgress } = useContext(_VidCtx);
  const insetY      = useTransform(scrollYProgress, [0, 0.8], [35, 0]);
  const insetX      = useTransform(scrollYProgress, [0, 0.8], [35, 0]);
  const roundedness = useTransform(scrollYProgress, [0, 1],   [800, 16]);
  const clipPath    = useMotionTemplate`inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${roundedness}px)`;
  return (
    <motion.div
      className={`relative pointer-events-none overflow-hidden w-full${className ? ` ${className}` : ""}`}
      style={{ clipPath }}
    >
      {children}
    </motion.div>
  );
}

function _HeroVideo({ src, poster }) {
  const { scrollYProgress } = useContext(_VidCtx);
  const scale = useTransform(scrollYProgress, [0, 0.8], [0.7, 1]);
  return (
    <motion.video
      className="relative z-10 w-full h-full object-cover"
      autoPlay muted loop playsInline
      poster={poster}
      src={src}
      style={{ scale, maxHeight: "55vh" }}
    />
  );
}

/* ── 1. Hero ─────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <_ContainerScroll className="h-[280vh]">
      <_ContainerSticky className="flex flex-col items-center justify-center gap-8 px-6 overflow-hidden bg-background">

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 40%, color-mix(in oklch, oklch(0.57 0.22 25) 8%, transparent) 0%, transparent 65%)" }} />
        </div>

        {/* Headline */}
        <_ContainerAnimated className="relative z-20 text-center space-y-3 max-w-2xl">
          <GBadge>Enterprise AI Engineering</GBadge>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-foreground leading-[1.1]">
            Build AI Systems That<br /><span className="brand-text">Drive Results</span>
          </h1>
          <p className="text-muted-foreground text-base max-w-lg mx-auto leading-relaxed pt-1">
            We design, build, and deploy production-grade AI systems that automate operations, accelerate decisions, and scale across your enterprise.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4">
            {[["240+", "AI Models in Production"], ["50+", "Enterprise Deployments"], ["12+", "Industries Automated"]].map(([v, l]) => (
              <div key={l} className="text-center">
                <div className="text-xl font-bold leading-tight" style={GT}>{v}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </_ContainerAnimated>

        {/* Expanding video */}
        <_ContainerInset>
          <_HeroVideo
            src="/images/TS-AI.mp4"
            poster="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1800&q=80&sat=-30"
          />
        </_ContainerInset>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          className="relative z-20 flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
          style={{ background: BG, boxShadow: GLOW }}
          onClick={() => document.getElementById("ai-services-content")?.scrollIntoView({ behavior: "smooth" })}
        >
          Deploy AI Now <ArrowRight className="w-4 h-4" />
        </motion.button>

      </_ContainerSticky>
    </_ContainerScroll>
  );
}

/* ── 2. Core Services ────────────────────────────────────────────── */
function CoreServicesSection() {
  return (
    <section id="ai-services-content" className="border-t border-border py-24">
      <div className="page-grid mb-14">
        <FadeIn className="col-span-12 text-center">
          <GBadge>AI Capabilities</GBadge>
          <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
            AI Systems Built for<br /><span className="brand-text">Enterprise Scale</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
            From intelligent automation and real-time fraud detection to generative AI and computer vision — every capability engineered for production deployment and measurable ROI.
          </p>
        </FadeIn>
      </div>
      <div className="bento-grid px-[120px] max-[1280px]:px-[60px] max-[768px]:px-5">
        {CORE_SERVICES.map((s, i) => (
          <AIBentoItem key={s.title} {...s} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ── 3. AI Development ───────────────────────────────────────────── */
const AI_DEV_POINTS = [
  { icon: BrainCircuit, label: "End-to-end model lifecycle management" },
  { icon: Database,     label: "Custom training pipelines on proprietary data" },
  { icon: Layers,       label: "LLM fine-tuning and RAG architectures" },
  { icon: Cloud,        label: "Edge and cloud deployment with MLOps" },
  { icon: Eye,          label: "Explainability, monitoring, and drift detection" },
];

function AIDevelopmentSection() {
  const sectionRef = useRef(null);
  const [dims, setDims] = useState({ width: 1440, height: 700 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => {
      if (sectionRef.current) {
        const { width, height } = sectionRef.current.getBoundingClientRect();
        setDims({ width: Math.round(width), height: Math.round(height) });
      }
    };
    update();
    const ro = new ResizeObserver(update);
    if (sectionRef.current) ro.observe(sectionRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-border"
      style={{ minHeight: "680px" }}
    >
      {/* ── Mesh gradient background (light mode) ── */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          <Suspense fallback={null}>
          <MeshGradient
            width={dims.width}
            height={dims.height}
            colors={["#c7d9f5", "#e8d5f0", "#ffd1bd", "#d4f0e8", "#b5d9f9", "#f5e6ff"]}
            distortion={0.75}
            swirl={0.55}
            grainMixer={0}
            grainOverlay={0}
            speed={0.38}
            offsetX={0.06}
          />
          </Suspense>
          {/* Soft white veil for text readability */}
          <div className="absolute inset-0 bg-white/35" />
        </div>
      )}

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-28 flex flex-col items-center text-center">
        {/* Badge */}
        <span
          className="inline-flex mb-6 rounded-full px-5 py-1.5 text-xs font-bold uppercase tracking-widest border"
          style={{
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(8px)",
            borderColor: "rgba(0,0,0,0.1)",
            color: "#374151",
          }}
        >
          AI Development
        </span>

        {/* Headline */}
        <h2
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          style={{ color: "#111827" }}
        >
          Custom AI Model{" "}
          <span
            style={{
              backgroundImage: BG,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Development
          </span>
        </h2>

        {/* Description */}
        <p
          className="text-lg leading-relaxed mb-10 max-w-2xl"
          style={{ color: "#4B5563" }}
        >
          We architect, build, and deploy custom AI models and intelligent systems tailored to your business logic, data landscape, and compliance requirements — from proof-of-concept to full-scale production.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {AI_DEV_POINTS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border"
              style={{
                background: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(12px)",
                borderColor: "rgba(0,0,0,0.09)",
                color: "#1F2937",
              }}
            >
              <Icon className="w-4 h-4 shrink-0" stroke="url(#ai-icon-grad)" strokeWidth={1.75} />
              {label}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="/contact">
            <Button
              size="lg"
              className="rounded-full gap-2 font-semibold text-white border-none px-8"
              style={{ background: BG, boxShadow: GLOW }}
            >
              Discuss Your AI Project
              <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8 font-semibold"
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(8px)",
              borderColor: "rgba(0,0,0,0.12)",
              color: "#1F2937",
            }}
            onClick={() => document.getElementById("ai-services")?.scrollIntoView({ behavior: "smooth" })}
          >
            Explore Services
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ── 4–10. Service Subsections (rendered from data) ─────────────── */

/* ── 11. Why Choose ──────────────────────────────────────────────── */
function WhyChooseSection() {
  return (
    <section className="page-grid py-24 border-t border-border">
      <div className="col-span-12 mb-12">
        <GBadge>Why Choose TS AI</GBadge>
        <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
          Why Choose<br /><span className="brand-text">TS AI</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
          Purpose-built AI systems backed by deep engineering expertise, industry knowledge, and a commitment to responsible deployment.
        </p>
      </div>

      {WHY_ITEMS.map(({ icon: Icon, title, desc, points }) => (
        <div key={title} className="col-span-12 sm:col-span-6 lg:col-span-3 rounded-2xl border border-border bg-card p-7 group hover:border-primary/30 transition-all relative overflow-hidden">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(400px circle at 50% 0%, color-mix(in oklch, oklch(0.57 0.22 25) 8%, transparent), transparent 70%)" }} />
          <div className="relative">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: "color-mix(in oklch, oklch(0.57 0.22 25) 12%, transparent)", border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 25%, transparent)" }}>
              <Icon className="w-5 h-5" stroke="url(#ai-icon-grad)" strokeWidth={1.6} />
            </div>
            <h3 className="text-base font-bold text-foreground mb-2">{title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">{desc}</p>
            <div className="flex flex-col gap-2">
              {points.map(pt => (
                <div key={pt} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" stroke="url(#ai-icon-grad)" strokeWidth={1.75} />
                  {pt}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ── 12. Development Approach ────────────────────────────────────── */
function ApproachSection() {
  return (
    <section className="page-grid py-24 border-t border-border">
      <div className="col-span-12 mb-12">
        <GBadge>Our Process</GBadge>
        <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
          Our AI Development<br /><span className="brand-text">Approach</span>
        </h2>
      </div>
      <div className="col-span-12">
        <div className="relative">
          <div className="absolute top-8 left-0 right-0 h-[2px] hidden lg:block" style={{ background: "linear-gradient(90deg, transparent 0%, oklch(0.20 0.01 30) 5%, oklch(0.20 0.01 30) 95%, transparent 100%)" }} />
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {APPROACH_STEPS.map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-sm font-bold mb-5 relative z-10 transition-transform duration-300 group-hover:scale-110" style={{ background: BG, boxShadow: GLOW }}>
                  {step}
                </div>
                <h4 className="text-xs font-bold text-foreground mb-1.5 leading-tight">{title}</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 13. CTA ──────────────────────────────────────────────────────── */
function CTASection() {
  return (
    <section className="page-grid py-24 border-t border-border">
      <div className="col-span-12 rounded-2xl overflow-hidden relative" style={{ border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 25%, transparent)", background: "var(--color-card)" }}>
        <AuroraBg variant="dark" />
        <div aria-hidden className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ zIndex: 1, backgroundImage: "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative px-4 sm:px-16 py-20 flex flex-col lg:flex-row items-center justify-between gap-10" style={{ zIndex: 2 }}>
          <div className="max-w-xl">
            <GBadge>Get Started</GBadge>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-foreground mb-4 leading-tight">
              Build Intelligent<br /><span className="brand-text">AI Systems</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-md">
              Leverage AI to automate, optimize, and scale your business operations with enterprise-grade intelligent systems.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <Button size="lg" className="rounded-full gap-2 group font-semibold text-white border-none min-w-52" style={{ background: BG, boxShadow: GLOW }}>
              Talk to AI Experts <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-border bg-card/60 text-foreground hover:bg-secondary min-w-52">
              Start Your AI Project
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Page export ─────────────────────────────────────────────────── */
export default function TSAISolution() {
  return (
    <div className="bg-background">
      <GradientDefs />
      <HeroSection />

      <div className="page-grid"><div className="col-span-12"><Separator /></div></div>

      <CoreServicesSection />
      <AIDevelopmentSection />

      {/* Service subsections 4–10 */}
      {SERVICE_SECTIONS.map(s => <ServiceSubsection key={s.title} {...s} />)}

      <div className="page-grid"><div className="col-span-12"><Separator /></div></div>

      <WhyChooseSection />
      <ApproachSection />
      <CTASection />
      <Footer />
    </div>
  );
}
