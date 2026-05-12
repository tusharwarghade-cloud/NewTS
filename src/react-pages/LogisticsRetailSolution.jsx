import { useState, useEffect, useRef } from "react";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import AuroraBg from "@/components/AuroraBg";
import ScrollHero from "@/components/ScrollHero";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight, CheckCircle2, ChevronRight, Truck, Package,
  BarChart3, Bell, Smartphone, Server, Database, Cloud,
  Code2, RefreshCw, Zap, ShieldCheck, Layers, Network,
  Store, Boxes, Receipt, Wifi, Settings, TrendingUp,
  AlertCircle, FileText, Users, Globe,
} from "lucide-react";

/* ── Brand ──────────────────────────────────────────────────────── */
const BG   = "linear-gradient(135deg, oklch(0.57 0.22 25) 0%, oklch(0.52 0.24 292) 100%)";
const GLOW = "0 0 28px color-mix(in oklch, oklch(0.57 0.22 25) 32%, transparent)";
const GT   = { backgroundImage: BG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };

function GradientDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute", overflow: "hidden" }} aria-hidden>
      <defs>
        <linearGradient id="lr-icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
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
const TRUST_ITEMS = [
  { icon: Store,    label: "Multi-Store Operations",     sub: "Centralised management at scale" },
  { icon: RefreshCw,label: "Real-Time Synchronisation",  sub: "Live data across distributed systems" },
  { icon: Receipt,  label: "POS & Backend Integration",  sub: "End-to-end transaction platforms" },
  { icon: BarChart3,label: "Data-Driven Intelligence",   sub: "Elasticsearch-powered analytics" },
];

const SOLUTIONS = [
  {
    icon: Settings,
    title: "POS Backoffice Systems",
    desc: "Centralised cloud backoffice for managing store items, departments, pricing configurations, and inventory synchronisation across all locations.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&sat=-30",
  },
  {
    icon: RefreshCw,
    title: "Real-Time Sync & Messaging Systems",
    desc: "RabbitMQ-based distributed messaging infrastructure enabling real-time communication between cloud backends, POS terminals, and analytics engines.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&sat=-30",
  },
  {
    icon: BarChart3,
    title: "Retail Data Processing Platforms",
    desc: "Elasticsearch-powered analytics platforms for processing high-volume sales data, vendor categorisation, trend analysis, and automated reporting.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&sat=-30",
  },
  {
    icon: Smartphone,
    title: "Android POS Systems",
    desc: "Mobile-first Android POS applications with full backend API integration, supporting real-time transaction processing, inventory sync, and offline mode.",
    image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&q=80&sat=-30",
  },
  {
    icon: Bell,
    title: "Notification & Alert Systems",
    desc: "Automated SMS and email notification engines with day-close reporting, threshold alerts, and scheduled delivery for operations teams.",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80&sat=-30",
  },
  {
    icon: Boxes,
    title: "Inventory & Transaction Management",
    desc: "Real-time inventory tracking, multi-store product management, and transaction reconciliation systems designed for high-frequency retail operations.",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80&sat=-30",
  },
];

const FEATURES = [
  { icon: RefreshCw,  title: "Real-Time Data Synchronisation",      desc: "Millisecond-level sync across POS terminals, warehouses, and cloud backends." },
  { icon: Settings,   title: "Multi-Store Configuration Management", desc: "Centralised control of pricing, products, and policies across hundreds of stores." },
  { icon: Receipt,    title: "Transaction Processing & Billing",     desc: "High-throughput billing engines with tax computation and receipt automation." },
  { icon: Boxes,      title: "Inventory Tracking & Management",      desc: "Live stock levels, shrinkage detection, and automated reorder triggers." },
  { icon: FileText,   title: "Automated Reporting Systems",          desc: "Scheduled daily, weekly, and monthly reports delivered via email or dashboard." },
  { icon: ShieldCheck,title: "Role-Based Access & Control",          desc: "Granular permission layers for store managers, operators, and administrators." },
  { icon: Zap,        title: "Low-Latency System Performance",       desc: "Optimised for high-concurrency environments with sub-100ms response targets." },
];

const STAKEHOLDERS = [
  {
    icon: Store,
    title: "Retail Chains",
    items: ["Multi-store product management", "Centralised pricing & promotions", "Sales analytics dashboards", "Staff access management"],
  },
  {
    icon: Truck,
    title: "Logistics Companies",
    items: ["Fleet & delivery tracking", "Warehouse inventory systems", "Route optimisation APIs", "Proof-of-delivery workflows"],
  },
  {
    icon: Boxes,
    title: "Warehouse Operators",
    items: ["Real-time stock management", "Inbound & outbound tracking", "Automated reorder systems", "Bin & location management"],
  },
  {
    icon: Network,
    title: "Supply Chain Operators",
    items: ["Vendor & supplier portals", "Order fulfilment automation", "Cross-location sync", "Data processing pipelines"],
  },
];

const CASE_ITEMS = [
  {
    id: "cstore-backoffice",
    label: "CStore Backoffice",
    icon: Settings,
    tag: "Retail · POS Platform",
    title: "CStore POS Backoffice System",
    challenge: "Build a cloud-based backoffice for a multi-store retail chain to manage store configurations, inventory, and real-time POS synchronisation.",
    outcome: "Deployed a centralised backoffice managing 300+ store locations with RabbitMQ-based real-time sync, reducing configuration errors by 90%.",
    metrics: [["300+", "Stores"], ["90%", "Error Reduction"], ["Real-time", "Sync"]],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80&sat=-30",
  },
  {
    id: "cstore-scandata",
    label: "CStore ScanData",
    icon: BarChart3,
    tag: "Retail · Data Platform",
    title: "CStore ScanData Processing System",
    challenge: "Process and categorise high-volume sales scan data from multiple vendors and store locations with automated reporting and analytics.",
    outcome: "Built an Elasticsearch-powered platform processing millions of scan records daily with vendor-based categorisation and automated report delivery.",
    metrics: [["Millions", "Records/Day"], ["Automated", "Reporting"], ["Vendor", "Categorised"]],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&sat=-30",
  },
  {
    id: "android-pos",
    label: "Android POS",
    icon: Smartphone,
    tag: "Retail · Mobile POS",
    title: "Android POS Transaction System",
    challenge: "Develop a mobile Android POS application with full backend integration for transaction processing, inventory sync, and offline capabilities.",
    outcome: "Delivered a production-grade Android POS system with real-time backend sync, offline transaction queue, and 95% uptime across all deployments.",
    metrics: [["95%", "Uptime"], ["Offline", "Ready"], ["Real-time", "Sync"]],
    image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=900&q=80&sat=-30",
  },
  {
    id: "notification-system",
    label: "Notification Engine",
    icon: Bell,
    tag: "Retail · Automation",
    title: "Notification & Report Automation System",
    challenge: "Automate day-close reporting, SMS/email alert delivery, and operational notifications for a distributed retail operations network.",
    outcome: "Built a notification engine achieving 95% delivery success rate with automated day-close reports, threshold alerts, and multi-channel dispatch.",
    metrics: [["95%", "Delivery Rate"], ["80%", "Manual Reduction"], ["Multi-channel", "Alerts"]],
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=80&sat=-30",
  },
];

const CS_INTERVAL = 4500;
const CS_CHIP_H   = 84;
const csWrap = (min, max, v) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

const TECH_STACK = [
  { label: "Messaging",  items: ["RabbitMQ", "Redis", "Kafka"],        icon: RefreshCw },
  { label: "Search",     items: ["Elasticsearch", "OpenSearch"],        icon: BarChart3 },
  { label: "Database",   items: ["SQL Server", "PostgreSQL", "MySQL"],  icon: Database },
  { label: "Mobile",     items: ["Android", "React Native"],            icon: Smartphone },
  { label: "Backend",    items: [".NET", "Node.js", "Java"],            icon: Server },
  { label: "Cloud",      items: ["Azure", "AWS", "GCP"],                icon: Cloud },
];

const METRICS = [
  { value: "90%",  label: "Reduction in configuration errors across store networks" },
  { value: "300+", label: "Stores managed through centralised backoffice platforms" },
  { value: "95%",  label: "Notification delivery success rate across channels" },
  { value: "80%",  label: "Reduction in manual operational follow-ups" },
];

const WHY_US = [
  { icon: Layers,     title: "Enterprise-Scale System Design",        desc: "Architecture built for hundreds of stores and millions of transactions — not prototypes that collapse under load." },
  { icon: RefreshCw,  title: "Real-Time Data Architecture Expertise",  desc: "Deep experience with RabbitMQ, Elasticsearch, and distributed sync systems for mission-critical retail operations." },
  { icon: Store,      title: "Proven Multi-Store Deployments",         desc: "Production systems running across 300+ locations with verified uptime, reliability, and performance SLAs." },
  { icon: Network,    title: "Strong Backend + Frontend Integration",  desc: "Full-stack teams bridging cloud backoffice, POS terminals, mobile apps, and analytics in one cohesive platform." },
];

const TIMELINE = [
  { step: "01", title: "Requirement Analysis",    desc: "Stakeholder discovery, workflow mapping, and system scope definition." },
  { step: "02", title: "Architecture Design",     desc: "Cloud topology, messaging architecture, and data pipeline design." },
  { step: "03", title: "Development",             desc: "Agile sprints delivering backend systems, POS clients, and integrations." },
  { step: "04", title: "Integration & Testing",   desc: "End-to-end API integration, load testing, and UAT with operations teams." },
  { step: "05", title: "Deployment",              desc: "Phased rollout across store locations with zero-downtime deployments." },
  { step: "06", title: "Monitoring & Support",    desc: "24×7 operations monitoring, alerting, and SLA-backed support." },
];

/* ── Mock Dashboard ─────────────────────────────────────────────── */
function LogisticsDashboard() {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden" style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.3)" }}>
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <span className="text-xs text-muted-foreground ml-2">Retail Operations Dashboard</span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-emerald-500 font-mono">LIVE</span>
        </div>
      </div>
      <div className="p-5">
        {/* KPI row */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[["312", "Active Stores"], ["98.7%", "Sync Uptime"], ["4.2M", "Txns Today"]].map(([v, l]) => (
            <div key={l} className="rounded-xl border border-border bg-background/60 px-3 py-2.5">
              <div className="text-base font-bold" style={GT}>{v}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{l}</div>
            </div>
          ))}
        </div>
        {/* Sync activity chart */}
        <div className="flex items-end gap-1.5 h-20 mb-4">
          {[40, 65, 50, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i % 3 === 0 ? BG : "color-mix(in oklch, oklch(0.57 0.22 25) 25%, var(--color-border))", opacity: 0.85 }} />
          ))}
        </div>
        {/* Store status list */}
        {[["North Region Stores", "124/130 synced", "95%"], ["South Region Stores", "98/100 synced", "98%"], ["Warehouse Network", "48/50 online", "96%"]].map(([name, status, pct]) => (
          <div key={name} className="flex items-center gap-3 py-2 border-b border-border/40 last:border-0">
            <div className="w-2 h-2 rounded-full shrink-0" style={{ background: BG }} />
            <div className="flex-1 text-[11px] text-foreground">{name}</div>
            <div className="text-[10px] text-muted-foreground">{status}</div>
            <div className="w-10 text-right text-[10px] font-semibold" style={GT}>{pct}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Architecture Diagram ───────────────────────────────────────── */
function ArchitectureDiagram() {
  const nodes = [
    { label: "Cloud Backend", sub: ".NET / Node.js APIs", col: 1 },
    { label: "Message Queue",  sub: "RabbitMQ broker",    col: 2 },
    { label: "POS Systems",    sub: "Android + Web POS",  col: 3 },
    { label: "Analytics",      sub: "Elasticsearch",      col: 4 },
  ];
  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">Platform Architecture</p>
      {/* Flow */}
      <div className="flex items-center justify-between gap-2 mb-8 overflow-x-auto">
        {nodes.map((node, i) => (
          <div key={node.label} className="flex items-center gap-2 shrink-0">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-xl border border-border bg-background px-4 py-3 mb-2 min-w-[100px]" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.12)" }}>
                <div className="text-xs font-bold text-foreground">{node.label}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{node.sub}</div>
              </div>
            </div>
            {i < nodes.length - 1 && (
              <div className="flex items-center gap-1 shrink-0">
                <div className="h-px w-8 sm:w-12" style={{ background: BG }} />
                <ArrowRight className="w-3 h-3 shrink-0" style={{ color: "oklch(0.57 0.22 25)" }} />
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Architecture points */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { icon: Cloud,      label: "Cloud backend systems",           desc: "Scalable API servers handling store configurations and data" },
          { icon: RefreshCw,  label: "Messaging queues",                desc: "RabbitMQ for reliable async communication between services" },
          { icon: Smartphone, label: "POS client systems",              desc: "Android and web-based POS terminals at store level" },
          { icon: BarChart3,  label: "Analytics engine",                desc: "Elasticsearch processing sales data for insights and reports" },
          { icon: Network,    label: "API integrations",                desc: "Third-party vendor, payment, and notification system hooks" },
          { icon: Database,   label: "Data pipelines",                  desc: "Automated ETL pipelines for multi-store data consolidation" },
        ].map(({ icon: Icon, label, desc }) => (
          <div key={label} className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/50 p-3">
            <Icon className="w-4 h-4 mt-0.5 shrink-0" stroke="url(#lr-icon-grad)" strokeWidth={1.6} />
            <div>
              <p className="text-xs font-semibold text-foreground">{label}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 1. Hero ─────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <ScrollHero
      badge="Logistics & Retail Solutions"
      badgeDot={false}
      pills={["Retail Chains", "Logistics Companies", "Warehouse Operators", "Multi-Store Businesses", "Supply Chain Operators"]}
      headline={<>Logistics & Retail<br /><span className="brand-text">Operations Solutions</span></>}
      subheadline="Build scalable platforms to manage store operations, inventory, transactions, and real-time data across distributed systems."
      primaryCta="Talk to Experts"
      secondaryCta="Explore Solutions"
      image="https://images.unsplash.com/photo-1553413077-190dd305871c?w=1800&q=80&sat=-30"
      imageAlt="Logistics and retail operations"
      expandedBadge="Trusted by Retail & Logistics Enterprises"
      expandedHeadline={<>Enterprise Platforms for<br />Retail & Logistics Operations</>}
      expandedCta="See All Solutions"
      onSecondary={() => document.getElementById("lr-solutions")?.scrollIntoView({ behavior: "smooth" })}
    />
  );
}

/* ── 2. Domain Expertise ─────────────────────────────────────────── */
function DomainExpertiseSection() {
  return (
    <>
      {/* Trust strip */}
      <section className="border-y border-border bg-card/40">
        <div className="page-grid py-7">
          {TRUST_ITEMS.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="col-span-6 sm:col-span-3 flex items-center gap-4">
              <Icon className="w-7 h-7 shrink-0" stroke="url(#lr-icon-grad)" strokeWidth={1.6} />
              <div>
                <div className="text-sm font-semibold text-foreground leading-tight">{label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Text + visual */}
      <section className="page-grid py-12 sm:py-24">
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-center">
          <GBadge>Domain Expertise</GBadge>
          <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-5 leading-tight">
            Logistics & Retail<br />
            <span className="brand-text">Domain Expertise</span>
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            We build enterprise technology platforms for the logistics and retail sector — from cloud-based POS backoffice systems and real-time messaging infrastructure to Elasticsearch-powered analytics and Android POS applications. Our teams understand the operational complexity of managing distributed store networks, high-frequency transactions, and multi-vendor data pipelines.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Whether you operate a multi-store retail chain, a logistics network, or a warehouse operation — we design and deliver platforms that synchronise data in real time, automate reporting, and scale with your business.
          </p>
          <div className="flex flex-col gap-3 mt-8">
            {["Multi-store operations platforms", "Real-time system synchronisation", "POS & backend integrations", "Data-driven retail intelligence", "Notification and monitoring systems"].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-sm text-foreground">
                <CheckCircle2 className="w-4 h-4 shrink-0" stroke="url(#lr-icon-grad)" strokeWidth={2} />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="hidden lg:block lg:col-span-1" />
        <div className="col-span-12 lg:col-span-6">
          <LogisticsDashboard />
        </div>
      </section>
    </>
  );
}

/* ── 3. Solutions Grid ───────────────────────────────────────────── */
function SolutionsSection() {
  return (
    <section id="lr-solutions" className="page-grid py-12 sm:py-24 border-t border-border">
      <div className="col-span-12 mb-8 sm:mb-12">
        <GBadge>Core Solutions</GBadge>
        <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
          Solutions<br />
          <span className="brand-text">We Deliver</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
          Purpose-built platforms for every layer of your retail and logistics operation — designed for scale, reliability, and real-time performance.
        </p>
      </div>

      {SOLUTIONS.map(({ icon: Icon, title, desc, image }) => (
        <div key={title} className="col-span-12 sm:col-span-6 lg:col-span-4 rounded-2xl overflow-hidden relative group" style={{ minHeight: "300px" }}>
          <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.80) 35%, rgba(0,0,0,0.20) 65%, rgba(0,0,0,0.04) 100%)" }} />
          <div className="relative h-full flex flex-col justify-end p-6" style={{ minHeight: "300px" }}>
            <Icon className="w-6 h-6 mb-3" stroke="url(#lr-icon-grad)" strokeWidth={1.6} />
            <h3 className="text-sm font-bold text-white mb-2">{title}</h3>
            <p className="text-xs text-white/70 leading-relaxed">{desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ── 4. Platform Architecture ────────────────────────────────────── */
function ArchitectureSection() {
  return (
    <section className="page-grid py-12 sm:py-24 border-t border-border">
      <div className="col-span-12 mb-8 sm:mb-12">
        <GBadge>Platform Architecture</GBadge>
        <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
          How We Build<br />
          <span className="brand-text">Platform Architecture</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
          A layered, event-driven architecture connecting cloud backends, messaging queues, POS terminals, and analytics engines in one cohesive system.
        </p>
      </div>
      <div className="col-span-12">
        <ArchitectureDiagram />
      </div>
    </section>
  );
}

/* ── 5. Key Features ─────────────────────────────────────────────── */
function FeaturesSection() {
  return (
    <section className="page-grid py-12 sm:py-24 border-t border-border">
      <div className="col-span-12 mb-8 sm:mb-12">
        <GBadge>Platform Capabilities</GBadge>
        <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
          Key Features<br />
          <span className="brand-text">We Build</span>
        </h2>
      </div>

      {FEATURES.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="col-span-12 sm:col-span-6 lg:col-span-3 rounded-2xl border border-border bg-card p-6 group hover:border-primary/30 transition-colors relative overflow-hidden">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(300px circle at 0% 0%, color-mix(in oklch, oklch(0.57 0.22 25) 6%, transparent), transparent 70%)" }} />
          <div className="relative">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "color-mix(in oklch, oklch(0.57 0.22 25) 12%, transparent)", border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 25%, transparent)" }}>
              <Icon className="w-4.5 h-4.5" stroke="url(#lr-icon-grad)" strokeWidth={1.6} />
            </div>
            <h3 className="text-sm font-bold text-foreground mb-2">{title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ── 6. Case Studies ─────────────────────────────────────────────── */
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
    <section className="relative py-24 border-t border-border overflow-clip" style={{ background: "#f9fafb" }}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="aurora-light" />
        <div className="aurora-light-alt" />
      </div>

      <div className="page-grid mb-14 relative z-10">
        <div className="col-span-12 text-center">
          <GBadge>Case Studies</GBadge>
          <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4">
            Our Logistics & Retail <span className="brand-text">Platforms</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base">
            Production-grade platforms deployed across real retail chains and logistics operations.
          </p>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-[120px] max-[1280px]:px-[60px] max-[768px]:px-5 relative z-10">
        <div className="relative overflow-hidden rounded-[2.5rem] flex flex-col lg:flex-row border border-border" style={{ minHeight: 540 }}>

          {/* Left panel */}
          <div
            className="w-full lg:w-[38%] relative z-30 flex flex-col items-start justify-center overflow-hidden px-4 sm:px-10 lg:px-12"
            style={{ background: "var(--color-card)", borderRight: "1px solid var(--color-border)", minHeight: 280 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="absolute inset-x-0 top-0 h-16 z-40 pointer-events-none" style={{ background: "linear-gradient(to bottom, var(--color-card), transparent)" }} />
            <div className="absolute inset-x-0 bottom-0 h-16 z-40 pointer-events-none" style={{ background: "linear-gradient(to top, var(--color-card), transparent)" }} />

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

            <div className="absolute bottom-7 left-0 right-0 flex justify-center gap-2 z-50">
              {CASE_ITEMS.map((_, i) => (
                <button key={i} onClick={() => jumpTo(i)}
                  className="rounded-full transition-all duration-300"
                  style={{ width: i === cur ? 20 : 6, height: 6, background: i === cur ? "oklch(0.57 0.22 25)" : "var(--color-border)" }}
                />
              ))}
            </div>
          </div>

          {/* Right panel */}
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
                      x:       isActive ? 0 : isPrev ? -90 : isNext ? 90 : 0,
                      scale:   isActive ? 1 : (isPrev || isNext) ? 0.86 : 0.72,
                      opacity: isActive ? 1 : (isPrev || isNext) ? 0.4 : 0,
                      rotate:  isPrev ? -3 : isNext ? 3 : 0,
                      zIndex:  isActive ? 20 : (isPrev || isNext) ? 10 : 0,
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

/* ── 7. Technology Stack ─────────────────────────────────────────── */
function TechStackSection() {
  return (
    <section className="page-grid py-12 sm:py-24 border-t border-border">
      <div className="col-span-12 mb-8 sm:mb-12">
        <GBadge>Technology</GBadge>
        <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
          Technology<br />
          <span className="brand-text">Expertise</span>
        </h2>
      </div>

      {TECH_STACK.map(({ label, items, icon: Icon }) => (
        <div key={label} className="col-span-6 sm:col-span-4 md:col-span-2 rounded-2xl border border-border bg-card p-5 group hover:border-primary/30 transition-colors relative overflow-hidden">
          <Icon className="w-5 h-5 mb-3" stroke="url(#lr-icon-grad)" strokeWidth={1.6} />
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">{label}</p>
          <div className="flex flex-col gap-1.5">
            {items.map((item) => (
              <span key={item} className="text-sm font-medium text-foreground">{item}</span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

/* ── 8. Business Impact ──────────────────────────────────────────── */
function ImpactSection() {
  return (
    <section className="border-t border-border" style={{ background: "var(--color-card)" }}>
      <div className="page-grid py-12 sm:py-24">
        <div className="col-span-12 mb-8 sm:mb-12 text-center">
          <GBadge>Business Impact</GBadge>
          <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4">
            Measurable <span className="brand-text">Business Impact</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Outcomes delivered across production retail and logistics deployments.
          </p>
        </div>

        {METRICS.map(({ value, label }) => (
          <div key={label} className="col-span-12 sm:col-span-6 lg:col-span-3 rounded-2xl border border-border bg-background p-8 text-center group hover:border-primary/30 transition-colors relative overflow-hidden">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(300px circle at 50% 0%, color-mix(in oklch, oklch(0.57 0.22 25) 6%, transparent), transparent 70%)" }} />
            <div className="relative">
              <div className="text-4xl sm:text-5xl font-black mb-3" style={GT}>{value}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 9. Why Choose Us ────────────────────────────────────────────── */
function WhyUsSection() {
  return (
    <section className="page-grid py-12 sm:py-24 border-t border-border">
      <div className="col-span-12 mb-8 sm:mb-12">
        <GBadge>Why Choose Us</GBadge>
        <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
          Why Choose Us for<br />
          <span className="brand-text">Logistics & Retail</span>
        </h2>
      </div>

      {WHY_US.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="col-span-12 sm:col-span-6 lg:col-span-3 rounded-2xl border border-border bg-card p-6 sm:p-8 group hover:border-primary/30 transition-colors relative overflow-hidden">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(400px circle at 0% 0%, color-mix(in oklch, oklch(0.57 0.22 25) 6%, transparent), transparent 70%)" }} />
          <div className="relative">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: "color-mix(in oklch, oklch(0.57 0.22 25) 12%, transparent)", border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 25%, transparent)" }}>
              <Icon className="w-5 h-5" stroke="url(#lr-icon-grad)" strokeWidth={1.6} />
            </div>
            <h3 className="text-base font-bold text-foreground mb-3">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ── 10. Development Approach ────────────────────────────────────── */
function ApproachSection() {
  return (
    <section className="page-grid py-12 sm:py-24 border-t border-border">
      <div className="col-span-12 mb-8 sm:mb-12">
        <GBadge>Our Process</GBadge>
        <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
          Our Development<br />
          <span className="brand-text">Approach</span>
        </h2>
      </div>

      <div className="col-span-12">
        <div className="relative">
          <div className="absolute top-8 left-0 right-0 h-[2px] hidden lg:block" style={{ background: "linear-gradient(90deg, transparent 0%, oklch(0.20 0.01 30) 5%, oklch(0.20 0.01 30) 95%, transparent 100%)" }} />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {TIMELINE.map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-sm font-bold mb-5 relative z-10 transition-transform duration-300 group-hover:scale-110" style={{ background: BG, boxShadow: GLOW }}>
                  {step}
                </div>
                <h4 className="text-xs font-bold text-foreground mb-2 leading-tight">{title}</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 11. Stakeholders ────────────────────────────────────────────── */
function StakeholdersSection() {
  return (
    <section className="page-grid py-12 sm:py-24 border-t border-border">
      <div className="col-span-12 mb-8 sm:mb-12">
        <GBadge>Who We Serve</GBadge>
        <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
          Stakeholders<br />
          <span className="brand-text">We Serve</span>
        </h2>
      </div>

      {STAKEHOLDERS.map(({ icon: Icon, title, items }) => (
        <div key={title} className="col-span-12 sm:col-span-6 lg:col-span-3 rounded-2xl border border-border bg-card overflow-hidden group hover:border-primary/30 transition-colors relative">
          <div className="p-7">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: "color-mix(in oklch, oklch(0.57 0.22 25) 12%, transparent)", border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 25%, transparent)" }}>
              <Icon className="w-5 h-5" stroke="url(#lr-icon-grad)" strokeWidth={1.6} />
            </div>
            <h3 className="text-base font-bold text-foreground mb-4">{title}</h3>
            <ul className="flex flex-col gap-2.5">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <ChevronRight className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "oklch(0.57 0.22 25)" }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ── 12. Final CTA ───────────────────────────────────────────────── */
function CTASection() {
  return (
    <section className="page-grid py-12 sm:py-24 border-t border-border">
      <div className="col-span-12 rounded-2xl overflow-hidden relative" style={{ border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 25%, transparent)", background: "var(--color-card)" }}>
        <AuroraBg variant="dark" />
        <div aria-hidden className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ zIndex: 1, backgroundImage: "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative px-6 sm:px-16 py-10 sm:py-20 flex flex-col lg:flex-row items-center justify-between gap-10" style={{ zIndex: 2 }}>
          <div className="max-w-xl">
            <GBadge>Get Started</GBadge>
            <h2 className="text-2xl sm:text-4xl lg:text-[2.75rem] font-bold text-foreground mb-4 leading-tight">
              Build Scalable Logistics<br />
              <span className="brand-text">& Retail Platforms</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-md">
              Transform operations with real-time, data-driven logistics and retail systems built for enterprise scale.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <a href="/contact">
              <Button size="lg" className="rounded-full gap-2 group font-semibold text-white border-none min-w-52" style={{ background: BG, boxShadow: GLOW }}>
                Talk to Experts <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <a href="/contact">
              <Button size="lg" variant="outline" className="rounded-full border-border bg-card/60 text-foreground hover:bg-secondary min-w-52">
                Start Your Project
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Page export ─────────────────────────────────────────────────── */
export default function LogisticsRetailSolution() {
  return (
    <div className="bg-background">
      <GradientDefs />
      <HeroSection />
      <DomainExpertiseSection />
      <SolutionsSection />
      <ArchitectureSection />
      <Separator className="max-w-7xl mx-auto" />
      <FeaturesSection />
      <CaseStudiesSection />
      <TechStackSection />
      <ImpactSection />
      <WhyUsSection />
      <ApproachSection />
      <StakeholdersSection />
      <CTASection />
      <Footer />
    </div>
  );
}
