import { useRef, useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

/* ── Brand ──────────────────────────────────────────────────────── */
const BG = "linear-gradient(135deg, oklch(0.57 0.22 25) 0%, oklch(0.52 0.24 292) 100%)";
const GT = { backgroundImage: BG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };

/* ── CountUp (lightweight inline version) ──────────────────────── */
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

/* ── Data ──────────────────────────────────────────────────────── */
const SERVICES = [
  {
    id: 1,
    num: "01",
    title: "AI-Powered Product Engineering.",
    desc: "End-to-end product development with AI embedded into every layer — from architecture to deployment.",
    tags: [
      "AI-Assisted Development",
      "Intelligent Architecture",
      "Legacy Modernization with AI",
      "Rapid MVP Delivery",
      "AI-Native Applications",
      "Data Engineering & Pipelines",
    ],
    metrics: [
      { value: 40, suffix: "%", label: "Faster Delivery", sub: "Compared to traditional builds" },
      { value: 95, suffix: "%", label: "Code Quality Score", sub: "Automated CI/CD pipeline" },
    ],
    illustration: <IllustrationEngineering />,
  },
  {
    id: 2,
    num: "02",
    title: "AI Agent Development & Deployment.",
    desc: "Custom AI agents that automate workflows, orchestrate tasks, and operate autonomously at enterprise scale.",
    tags: [
      "Custom AI Agents",
      "Pre-Built Agent Integration",
      "Agent Monitoring & Governance",
      "Multi-Agent Orchestration",
      "Conversational AI & Chatbots",
      "RPA + AI Hybrid Automation",
    ],
    metrics: [
      { value: 3, suffix: "x", label: "Efficiency Gain", sub: "Across automated workflows" },
      { value: 70, suffix: "%", label: "Cost Reduction", sub: "In operational overhead" },
    ],
    illustration: <IllustrationAgents />,
  },
  {
    id: 3,
    num: "03",
    title: "AI Readiness & Team Enablement.",
    desc: "Prepare every department to adopt AI — from engineering to operations, with structured enablement programs.",
    tags: ["Engineering", "Marketing", "Finance", "Legal", "Sales", "Operations", "HR", "Customer Support"],
    metrics: [
      { value: 2, suffix: "x", label: "Faster Onboarding", sub: "AI tool adoption rate" },
      { value: 88, suffix: "%", label: "Team Adoption", sub: "Organization-wide rollout" },
    ],
    illustration: <IllustrationReadiness />,
  },
  {
    id: 4,
    num: "04",
    title: "LLM & SLM Integration + Model Training.",
    desc: "Integrate, fine-tune, and deploy language models — from cloud APIs to on-premise private deployments.",
    tags: [
      "LLM API Integration",
      "RAG Pipelines",
      "SLM for Edge & Mobile",
      "On-Premise / Private LLM Deployment",
      "Fine-Tuning & Domain Adaptation",
      "MLOps & Model Lifecycle",
    ],
    metrics: [
      { value: 99, suffix: "%", label: "Model Uptime", sub: "Production SLA guarantee" },
      { value: 60, suffix: "%", label: "Inference Cost Saved", sub: "With SLM optimization" },
    ],
    illustration: <IllustrationLLM />,
  },
];

/* ── Dot grid helper ────────────────────────────────────────────── */
function DotGrid({ cols = 14, rows = 8, cx = 60, cy = 40, spacing = 8, color = "#dc2626" }) {
  const dots = [];
  const startX = cx - ((cols - 1) * spacing) / 2;
  const startY = cy - ((rows - 1) * spacing) / 2;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = startX + c * spacing;
      const y = startY + r * spacing;
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      const opacity = Math.max(0.04, 0.22 - dist * 0.003);
      dots.push(<circle key={`${r}-${c}`} cx={x} cy={y} r="1" fill={color} fillOpacity={opacity} />);
    }
  }
  return <>{dots}</>;
}

/* ── SVG Illustrations (transparent bg) ────────────────────────── */
function IllustrationEngineering() {
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      <svg viewBox="0 0 240 140" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="eng-glow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#dc2626" stopOpacity="0.06" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="eng-blur"><feGaussianBlur stdDeviation="3" /></filter>
        </defs>
        <rect width="240" height="140" fill="url(#eng-glow)" />
        <DotGrid cols={20} rows={12} cx={120} cy={70} spacing={11} color="#dc2626" />
        {/* code window */}
        <rect x="35" y="22" width="80" height="56" rx="6" fill="none" stroke="#dc2626" strokeWidth="0.8" strokeOpacity="0.25" />
        <rect x="35" y="22" width="80" height="12" rx="6" fill="#dc2626" fillOpacity="0.05" />
        <circle cx="44" cy="28" r="2" fill="#dc2626" fillOpacity="0.5" />
        <circle cx="51" cy="28" r="2" fill="#f59e0b" fillOpacity="0.4" />
        <circle cx="58" cy="28" r="2" fill="#22c55e" fillOpacity="0.4" />
        {/* animated code lines */}
        <motion.rect x="42" y="40" height="3" rx="1.5" fill="#dc2626" fillOpacity="0.6" initial={{ width: 0 }} animate={{ width: 36 }} transition={{ duration: 1, delay: 0.3 }} />
        <motion.rect x="42" y="48" height="3" rx="1.5" fill="#7c3aed" fillOpacity="0.5" initial={{ width: 0 }} animate={{ width: 52 }} transition={{ duration: 1, delay: 0.5 }} />
        <motion.rect x="42" y="56" height="3" rx="1.5" fill="#dc2626" fillOpacity="0.35" initial={{ width: 0 }} animate={{ width: 28 }} transition={{ duration: 1, delay: 0.7 }} />
        <motion.rect x="42" y="64" height="3" rx="1.5" fill="#7c3aed" fillOpacity="0.3" initial={{ width: 0 }} animate={{ width: 44 }} transition={{ duration: 1, delay: 0.9 }} />
        {/* gear */}
        <motion.circle cx="170" cy="55" r="20" fill="none" stroke="#dc2626" strokeWidth="0.8" strokeDasharray="5 4" strokeOpacity="0.3"
          animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "170px 55px" }} />
        <motion.circle cx="170" cy="55" r="12" fill="none" stroke="#dc2626" strokeWidth="1" strokeOpacity="0.4"
          animate={{ rotate: -360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "170px 55px" }} />
        <circle cx="170" cy="55" r="4" fill="#dc2626" fillOpacity="0.12" filter="url(#eng-blur)" />
        <circle cx="170" cy="55" r="2" fill="#dc2626" fillOpacity="0.6" />
        <motion.line x1="115" y1="50" x2="150" y2="55" stroke="#dc2626" strokeWidth="0.6" strokeOpacity="0.25" strokeDasharray="3 3"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 1.1 }} />
      </svg>
    </div>
  );
}

function IllustrationAgents() {
  const NODES = [
    { cx: 55, cy: 25 }, { cx: 185, cy: 25 },
    { cx: 35, cy: 80 }, { cx: 120, cy: 100 }, { cx: 205, cy: 80 },
  ];
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      <svg viewBox="0 0 240 140" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="agt-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.06" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect width="240" height="140" fill="url(#agt-glow)" />
        <DotGrid cols={20} rows={12} cx={120} cy={70} spacing={11} color="#7c3aed" />
        {/* central hub */}
        <circle cx="120" cy="60" r="16" fill="none" stroke="#7c3aed" strokeWidth="1" strokeOpacity="0.4" />
        <circle cx="120" cy="60" r="5" fill="#7c3aed" fillOpacity="0.5" />
        {/* pulse */}
        <motion.circle cx="120" cy="60" r="16" fill="none" stroke="#7c3aed" strokeWidth="0.6"
          animate={{ r: [16, 32], opacity: [0.4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }} />
        {/* satellites */}
        {NODES.map((p, i) => (
          <g key={i}>
            <motion.line x1="120" y1="60" x2={p.cx} y2={p.cy} stroke="#7c3aed" strokeWidth="0.6" strokeOpacity="0.25" strokeDasharray="4 3"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: i * 0.12 }} />
            <motion.circle cx={p.cx} cy={p.cy} r="9" fill="none" stroke="#dc2626" strokeWidth="0.8" strokeOpacity="0.4"
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: i * 0.12 + 0.4 }} style={{ transformOrigin: `${p.cx}px ${p.cy}px` }} />
            <motion.circle cx={p.cx} cy={p.cy} r="3" fill="#dc2626" fillOpacity="0.5"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.12 + 0.6 }} />
          </g>
        ))}
        <motion.path d="M55 25 Q120 -10 185 25" fill="none" stroke="#dc2626" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="3 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1 }} />
        <motion.path d="M35 80 Q120 130 205 80" fill="none" stroke="#dc2626" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="3 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.2 }} />
      </svg>
    </div>
  );
}

function IllustrationReadiness() {
  const CHECKS = [
    { x: 45, y: 30 }, { x: 75, y: 30 }, { x: 105, y: 30 },
    { x: 45, y: 60 }, { x: 75, y: 60 }, { x: 105, y: 60 },
    { x: 45, y: 90 }, { x: 75, y: 90 }, { x: 105, y: 90 },
  ];
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      <svg viewBox="0 0 240 140" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="rdy-glow" cx="35%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#dc2626" stopOpacity="0.05" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="rdy-blur"><feGaussianBlur stdDeviation="3" /></filter>
        </defs>
        <rect width="240" height="140" fill="url(#rdy-glow)" />
        <DotGrid cols={20} rows={12} cx={120} cy={70} spacing={11} color="#dc2626" />
        {/* grid lines */}
        {[30, 60, 90].map((y) => (
          <line key={`h${y}`} x1="30" y1={y} x2="120" y2={y} stroke="#dc2626" strokeWidth="0.4" strokeOpacity="0.1" />
        ))}
        {[45, 75, 105].map((x) => (
          <line key={`v${x}`} x1={x} y1="15" x2={x} y2="105" stroke="#dc2626" strokeWidth="0.4" strokeOpacity="0.1" />
        ))}
        {/* checkboxes */}
        {CHECKS.map((p, i) => (
          <g key={i}>
            <rect x={p.x - 8} y={p.y - 8} width="16" height="16" rx="3" fill="none" stroke="#dc2626" strokeWidth="0.6" strokeOpacity={i < 6 ? 0.4 : 0.15} />
            {i < 6 && (
              <motion.path
                d={`M${p.x - 4} ${p.y} L${p.x - 1} ${p.y + 3} L${p.x + 4} ${p.y - 3}`}
                stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeOpacity="0.7"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: i * 0.12 + 0.3 }}
              />
            )}
          </g>
        ))}
        {/* progress line */}
        <motion.path
          d="M145 95 C155 85, 165 70, 175 65 S195 45, 205 35 S215 25, 220 20"
          stroke="#dc2626" strokeWidth="1.2" strokeLinecap="round" fill="none" strokeOpacity="0.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.8 }}
        />
        <motion.circle cx="220" cy="20" r="3" fill="#dc2626" fillOpacity="0.5"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} />
      </svg>
    </div>
  );
}

function IllustrationLLM() {
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      <svg viewBox="0 0 240 140" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="llm-glow" cx="60%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.06" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect width="240" height="140" fill="url(#llm-glow)" />
        <DotGrid cols={20} rows={12} cx={120} cy={70} spacing={11} color="#7c3aed" />
        {/* magnifying glass */}
        <motion.circle cx="165" cy="55" r="22" fill="none" stroke="#7c3aed" strokeWidth="1.2" strokeOpacity="0.5"
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} style={{ transformOrigin: "165px 55px" }} />
        <motion.line x1="181" y1="71" x2="198" y2="88" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.5 }} />
        {/* formula */}
        <motion.text x="152" y="50" fontSize="8" fill="#dc2626" fontFamily="monospace" fontWeight="600" fillOpacity="0.6"
          initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 0.7 }}>
          {"f₀ = Σ p·q"}
        </motion.text>
        <motion.text x="155" y="64" fontSize="7" fill="#7c3aed" fontFamily="monospace" fontWeight="500" fillOpacity="0.5"
          initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 0.9 }}>
          {"Σ p₀·q₁"}
        </motion.text>
        {/* neural network */}
        {[
          [30, 30], [30, 55], [30, 80],
          [70, 35], [70, 65],
          [110, 50],
        ].map(([x, y], i) => (
          <motion.circle key={i} cx={x} cy={y} r="4" fill="none" stroke="#dc2626" strokeWidth="0.6" strokeOpacity="0.35"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: i * 0.08 }} style={{ transformOrigin: `${x}px ${y}px` }} />
        ))}
        {[
          [30, 30, 70, 35], [30, 30, 70, 65],
          [30, 55, 70, 35], [30, 55, 70, 65],
          [30, 80, 70, 35], [30, 80, 70, 65],
          [70, 35, 110, 50], [70, 65, 110, 50],
        ].map(([x1, y1, x2, y2], i) => (
          <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#dc2626" strokeWidth="0.4" strokeOpacity="0.18"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: i * 0.05 + 0.3 }} />
        ))}
        <motion.path d="M110 50 Q135 45 143 50" fill="none" stroke="#7c3aed" strokeWidth="0.6" strokeOpacity="0.3" strokeDasharray="3 3"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 1 }} />
        <motion.ellipse cx="200" cy="115" rx="18" ry="8" fill="none" stroke="#7c3aed" strokeWidth="0.5" strokeOpacity="0.15"
          animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "200px 115px" }} />
        <circle cx="200" cy="115" r="3" fill="#7c3aed" fillOpacity="0.25" />
      </svg>
    </div>
  );
}

/* ── Tag list with stagger ──────────────────────────────────────── */
function TagList({ tags, inView }) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {tags.map((tag, i) => (
        <motion.span
          key={tag}
          initial={{ opacity: 0, y: 6 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.06, duration: 0.3 }}
        >
          <Badge variant="outline" className="rounded-full text-xs font-normal px-3 py-1 border-border text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors cursor-default">
            {tag}
          </Badge>
        </motion.span>
      ))}
    </div>
  );
}

/* ── Metric stat ────────────────────────────────────────────────── */
function MetricStat({ value, suffix, label, sub }) {
  return (
    <div className="flex flex-col gap-1 p-6">
      <p className="text-2xl font-medium text-foreground sm:text-4xl">
        <CountUp end={value} suffix={suffix} />
      </p>
      <p className="font-medium text-foreground text-sm">{label}</p>
      {sub && <p className="text-muted-foreground text-xs">{sub}</p>}
    </div>
  );
}

/* ── Case study row ─────────────────────────────────────────────── */
function ServiceRow({ study, reversed }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="grid gap-12 lg:grid-cols-3 xl:gap-24 items-center border-b border-border pb-12"
    >
      {/* Left: illustration + content (2 cols) */}
      <div
        className={[
          "flex flex-col sm:flex-row gap-10 lg:col-span-2 lg:border-r lg:pr-12 xl:pr-16 text-left",
          reversed
            ? "lg:order-2 lg:border-r-0 lg:border-l border-border lg:pl-12 xl:pl-16 lg:pr-0"
            : "border-border",
        ].join(" ")}
      >
        {/* Illustration */}
        <div className="aspect-[29/35] h-auto w-full max-w-60 rounded-2xl ring-1 ring-border overflow-hidden shrink-0 hover:scale-[1.03] transition-transform duration-300">
          {study.illustration}
        </div>

        {/* Text content */}
        <div className="flex flex-col justify-between gap-6 text-left">
          <div>
            <span className="text-xs font-mono text-muted-foreground tracking-widest">{study.num}</span>
            <h3 className="mt-2 text-lg sm:text-xl lg:text-2xl font-semibold text-foreground leading-relaxed">
              {study.title}
            </h3>
            <p className="text-muted-foreground text-sm mt-2">{study.desc}</p>
            <TagList tags={study.tags} inView={inView} />
          </div>
        </div>
      </div>

      {/* Right: metrics (1 col) */}
      <div className={["grid grid-cols-1 gap-6 self-center", reversed ? "lg:order-1" : ""].join(" ")}>
        {study.metrics.map((m, i) => (
          <MetricStat key={i} {...m} />
        ))}
      </div>
    </motion.div>
  );
}

/* ── Main page ──────────────────────────────────────────────────── */
export default function ServicesPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col gap-4 text-center max-w-2xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-helvetica text-4xl font-semibold md:text-5xl text-foreground"
            >
              AI-First{" "}
              <span className="font-moralana" style={GT}>Product Ecosystem</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-muted-foreground"
            >
              From design systems to deployment — four interconnected capabilities that power teams with speed, clarity, and consistency.
            </motion.p>
          </div>

          {/* ── Service rows ───────────────────────────────────── */}
          <div className="mt-20 flex flex-col gap-20">
            {SERVICES.map((study, idx) => (
              <ServiceRow key={study.id} study={study} reversed={idx % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
