import { useState, useEffect, useRef } from "react";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import AuroraBg from "@/components/AuroraBg";
import ScrollHero from "@/components/ScrollHero";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight, ChevronRight, CheckCircle2,
  Building2, Globe, Layers, Network, ShieldCheck,
  BarChart3, Database, Cloud, Server, Code2,
  Cpu, Zap, RefreshCw, Users, TrendingUp,
  Settings, FileText, Lock, Workflow, BrainCircuit,
  Puzzle, GitMerge, Monitor, Briefcase,
} from "lucide-react";

/* ── Brand ──────────────────────────────────────────────────────── */
const BG   = "linear-gradient(135deg, oklch(0.57 0.22 25) 0%, oklch(0.52 0.24 292) 100%)";
const GLOW = "0 0 28px color-mix(in oklch, oklch(0.57 0.22 25) 32%, transparent)";
const GT   = { backgroundImage: BG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };

function GradientDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute", overflow: "hidden" }} aria-hidden>
      <defs>
        <linearGradient id="ent-icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
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
  { icon: Building2,   label: "Digital Transformation",      sub: "End-to-end enterprise modernisation" },
  { icon: GitMerge,    label: "Legacy System Migration",      sub: "Zero-disruption modernisation strategy" },
  { icon: Puzzle,      label: "ERP & System Integration",     sub: "SAP, Oracle, Microsoft & custom ERPs" },
  { icon: BrainCircuit,label: "Intelligent Automation",       sub: "AI-powered workflow & process automation" },
];

const SOLUTIONS = [
  {
    icon: RefreshCw,
    title: "Legacy System Modernisation",
    desc: "Structured migration from monolithic and legacy systems to modern cloud-native architectures — preserving business logic while unlocking scalability, maintainability, and performance.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&sat=-30",
  },
  {
    icon: Puzzle,
    title: "ERP Integration & Custom Development",
    desc: "Deep integration with SAP, Oracle, Microsoft Dynamics, and custom ERP systems — connecting enterprise data silos into unified operational workflows with real-time sync.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80&sat=-30",
  },
  {
    icon: BrainCircuit,
    title: "Intelligent Workflow Automation",
    desc: "AI-driven automation platforms replacing manual, repetitive enterprise processes — from document processing and approvals to cross-department workflow orchestration.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80&sat=-30",
  },
  {
    icon: Cloud,
    title: "Cloud Migration & Infrastructure",
    desc: "Strategic cloud migration planning and execution across AWS, Azure, and GCP — from lift-and-shift to full cloud-native re-architecture with DevOps and CI/CD pipelines.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80&sat=-30",
  },
  {
    icon: BarChart3,
    title: "Enterprise Analytics & BI Platforms",
    desc: "Executive-grade business intelligence platforms with real-time dashboards, KPI monitoring, predictive analytics, and cross-system data aggregation for leadership decision-making.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&sat=-30",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security & Compliance Platforms",
    desc: "IAM, role-based access control, audit trails, SSO integration, and compliance frameworks — built for enterprises operating under SOC 2, ISO 27001, GDPR, and sector-specific regulations.",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80&sat=-30",
  },
  {
    icon: Monitor,
    title: "Custom Enterprise Software Development",
    desc: "Bespoke internal tools, portals, dashboards, and operational systems designed around your organisation's unique workflows — built for scale, reliability, and long-term maintainability.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&sat=-30",
  },
  {
    icon: Network,
    title: "API & Microservices Architecture",
    desc: "Design and delivery of API-first, microservices-based enterprise platforms — decoupled, independently deployable services with robust API gateways and service mesh infrastructure.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&sat=-30",
  },
];

const FEATURES = [
  { icon: GitMerge,    title: "Legacy-to-Modern Migration",       desc: "Structured refactoring and re-platforming with full business continuity throughout transition." },
  { icon: Puzzle,      title: "Third-Party System Integration",   desc: "Pre-built connectors for ERP, CRM, HRMS, and cloud platforms with real-time data sync." },
  { icon: BrainCircuit,title: "AI & Process Automation",          desc: "Intelligent document processing, decision automation, and workflow orchestration engines." },
  { icon: BarChart3,   title: "Real-Time Analytics Dashboards",   desc: "Executive BI dashboards with live KPIs, drill-down reporting, and predictive models." },
  { icon: ShieldCheck, title: "Enterprise IAM & SSO",             desc: "Role-based access, SSO integration, MFA, and audit logging for all enterprise users." },
  { icon: Cloud,       title: "Multi-Cloud Architecture",         desc: "Cloud-agnostic infrastructure design across AWS, Azure, and GCP with cost optimisation." },
  { icon: Zap,         title: "High-Availability Systems",        desc: "99.9%+ uptime architectures with auto-scaling, load balancing, and zero-downtime deployments." },
  { icon: Lock,        title: "Compliance & Audit Frameworks",    desc: "SOC 2, ISO 27001, GDPR, and industry-specific compliance built into platform architecture." },
];

const STAKEHOLDERS = [
  {
    icon: Briefcase,
    title: "CIOs & CTOs",
    items: ["Technology roadmap execution", "Legacy modernisation strategy", "Vendor & architecture governance", "Engineering team augmentation"],
  },
  {
    icon: TrendingUp,
    title: "Digital Transformation Teams",
    items: ["Process automation delivery", "Cross-system integration", "Change management support", "Platform rollout coordination"],
  },
  {
    icon: Users,
    title: "Operations & IT Teams",
    items: ["Internal tooling & portals", "Workflow digitisation", "System reliability & uptime", "IT infrastructure management"],
  },
  {
    icon: BarChart3,
    title: "Executive Leadership",
    items: ["Real-time BI dashboards", "Operational KPI visibility", "Data-driven decision systems", "ROI and impact reporting"],
  },
];

const CASE_ITEMS = [
  {
    id: "erp-integration",
    label: "ERP Integration Platform",
    icon: Puzzle,
    tag: "Enterprise · ERP Integration",
    title: "Enterprise ERP Integration & Data Unification Platform",
    challenge: "Unify fragmented data across SAP, Oracle, and legacy systems for a multi-division enterprise with 3,000+ employees, eliminating manual reconciliation workflows.",
    outcome: "Delivered a real-time integration layer connecting 6 enterprise systems, reducing manual reconciliation by 85% and providing unified operational visibility across all divisions.",
    metrics: [["6 Systems", "Integrated"], ["85%", "Manual Reduction"], ["Real-time", "Data Sync"]],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80&sat=-30",
  },
  {
    id: "legacy-migration",
    label: "Legacy Modernisation",
    icon: RefreshCw,
    tag: "Enterprise · Cloud Migration",
    title: "Legacy System Cloud Migration & Modernisation",
    challenge: "Migrate a 15-year-old monolithic enterprise system to a microservices architecture on AWS with zero business disruption across 200+ concurrent users.",
    outcome: "Completed phased migration in 9 months with zero downtime, achieving 60% infrastructure cost reduction and 4× improvement in deployment frequency.",
    metrics: [["Zero", "Downtime"], ["60%", "Cost Reduction"], ["4×", "Deploy Speed"]],
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&q=80&sat=-30",
  },
  {
    id: "automation-platform",
    label: "Automation Platform",
    icon: BrainCircuit,
    tag: "Enterprise · AI Automation",
    title: "Intelligent Workflow Automation Platform",
    challenge: "Automate document-heavy approval workflows and cross-department processes for a financial services enterprise processing 10,000+ transactions monthly.",
    outcome: "Built an AI-powered automation platform reducing document processing time by 78%, with automated routing, exception handling, and real-time audit trails.",
    metrics: [["78%", "Faster Processing"], ["10K+", "Monthly Txns"], ["Full", "Audit Trail"]],
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&q=80&sat=-30",
  },
];

const CS_INTERVAL = 4500;
const CS_CHIP_H   = 84;
const csWrap = (min, max, v) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

const TECH_STACK = [
  { label: "Backend",     items: ["Java", ".NET", "Node.js", "Go"],       icon: Server },
  { label: "Frontend",    items: ["React", "Angular", "Next.js"],          icon: Code2 },
  { label: "Cloud",       items: ["AWS", "Azure", "GCP"],                  icon: Cloud },
  { label: "Database",    items: ["PostgreSQL", "Oracle", "SQL Server"],   icon: Database },
  { label: "Integration", items: ["SAP", "Oracle ERP", "REST / GraphQL"],  icon: Puzzle },
  { label: "Automation",  items: ["Python", "Temporal", "Apache Airflow"], icon: BrainCircuit },
];

const METRICS = [
  { value: "85%",  label: "Average reduction in manual operational processes after automation deployment" },
  { value: "60%",  label: "Infrastructure cost reduction achieved through cloud migration and optimisation" },
  { value: "4×",   label: "Improvement in deployment frequency post legacy-to-microservices migration" },
  { value: "99.9%",label: "Platform uptime SLA delivered across production enterprise deployments" },
];

const WHY_US = [
  { icon: Building2,    title: "Deep Enterprise Domain Experience",  desc: "250+ engineers with hands-on delivery in large-scale enterprise transformation, migration, and integration projects." },
  { icon: GitMerge,     title: "Proven Legacy Migration Track Record", desc: "Structured methodology for migrating complex monolithic systems with zero business disruption and full data integrity." },
  { icon: ShieldCheck,  title: "Compliance-Ready Architecture",       desc: "Every platform designed with SOC 2, ISO 27001, GDPR, and industry regulatory requirements from day one." },
  { icon: Layers,       title: "End-to-End Delivery Capability",      desc: "Strategy, design, engineering, testing, deployment, and support — a single partner across the full transformation lifecycle." },
];

const TIMELINE = [
  { step: "01", title: "Discovery & Assessment",     desc: "Enterprise audit, stakeholder mapping, legacy system analysis, and transformation scope definition." },
  { step: "02", title: "Strategy & Roadmap",         desc: "Phased transformation roadmap, architecture blueprint, risk assessment, and business case development." },
  { step: "03", title: "Architecture Design",        desc: "Target architecture design, integration strategy, cloud topology, and security framework." },
  { step: "04", title: "Development & Integration",  desc: "Agile delivery with parallel workstreams, continuous integration, and incremental go-lives." },
  { step: "05", title: "Testing & Validation",       desc: "Performance testing, UAT, compliance validation, security penetration testing, and disaster recovery drills." },
  { step: "06", title: "Deployment & Migration",     desc: "Phased cutover with zero-downtime releases, data migration validation, and rollback controls." },
  { step: "07", title: "Optimisation & Support",     desc: "SLA-backed operations support, performance monitoring, cost optimisation, and continuous improvement." },
];

/* ── Mock Enterprise Dashboard ──────────────────────────────────── */
function EnterpriseDashboard() {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden" style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.3)" }}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <span className="text-xs text-muted-foreground ml-2">Enterprise Operations Dashboard</span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-emerald-500 font-mono">LIVE</span>
        </div>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[["99.9%", "System Uptime"], ["6", "Systems Integrated"], ["3,200+", "Active Users"]].map(([v, l]) => (
            <div key={l} className="rounded-xl border border-border bg-background/60 px-3 py-2.5">
              <div className="text-base font-bold" style={GT}>{v}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{l}</div>
            </div>
          ))}
        </div>
        <div className="flex items-end gap-1.5 h-20 mb-4">
          {[45, 60, 52, 78, 58, 88, 66, 82, 70, 94, 74, 90].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i % 3 === 0 ? BG : "color-mix(in oklch, oklch(0.57 0.22 25) 25%, var(--color-border))", opacity: 0.85 }} />
          ))}
        </div>
        {[["ERP Integration Layer", "Operational · Real-time", "99.8%"], ["Workflow Automation", "52K tasks/month", "Active"], ["Analytics Platform", "Executive dashboards", "Live"]].map(([name, status, pct]) => (
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
  const layers = [
    { label: "Presentation Layer",   items: ["Web Portals", "Mobile Apps", "Executive Dashboards"],        icon: Monitor },
    { label: "API & Integration",    items: ["API Gateway", "ERP Connectors", "Event Bus"],                icon: Network },
    { label: "Core Services",        items: ["Workflow Engine", "Auth & IAM", "Business Logic"],           icon: Layers },
    { label: "Data & Analytics",     items: ["Data Warehouse", "BI Engine", "Real-time Streams"],          icon: BarChart3 },
    { label: "Infrastructure",       items: ["AWS / Azure / GCP", "Kubernetes", "CI/CD Pipelines"],       icon: Cloud },
  ];
  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">Platform Architecture Layers</p>
      <div className="flex flex-col gap-3">
        {layers.map(({ label, items, icon: Icon }, i) => (
          <div key={label} className="flex items-center gap-4 rounded-xl border border-border/60 bg-background/50 p-4">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "color-mix(in oklch, oklch(0.57 0.22 25) 12%, transparent)", border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 25%, transparent)" }}>
              <Icon className="w-4 h-4" stroke="url(#ent-icon-grad)" strokeWidth={1.6} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-foreground mb-1">{label}</p>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <span key={item} className="text-[10px] px-2 py-0.5 rounded-full border border-border/60 bg-background text-muted-foreground">{item}</span>
                ))}
              </div>
            </div>
            {i < layers.length - 1 && (
              <div className="hidden sm:flex flex-col items-center shrink-0">
                <div className="w-px h-3 mt-1" style={{ background: BG }} />
              </div>
            )}
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
      badge="Enterprise Solutions"
      badgeDot={false}
      pills={["Large Enterprises", "CIOs & CTOs", "Digital Transformation Teams", "IT Operations", "Mid-Market Businesses"]}
      headline={<>Enterprise Digital<br /><span className="brand-text">Transformation Solutions</span></>}
      subheadline="End-to-end modernisation for large organisations — legacy migration, ERP integration, intelligent automation, and executive-grade analytics platforms."
      primaryCta="Talk to Enterprise Experts"
      secondaryCta="Explore Solutions"
      image="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=80&sat=-30"
      imageAlt="Enterprise technology platform"
      expandedBadge="Trusted by Global Enterprises"
      expandedHeadline={<>Digital Transformation<br />at Enterprise Scale</>}
      expandedCta="See All Solutions"
      onSecondary={() => document.getElementById("ent-solutions")?.scrollIntoView({ behavior: "smooth" })}
    />
  );
}

/* ── 2. Domain Expertise ─────────────────────────────────────────── */
function DomainExpertiseSection() {
  return (
    <>
      <section className="border-y border-border bg-card/40">
        <div className="page-grid py-7">
          {TRUST_ITEMS.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="col-span-6 sm:col-span-3 flex items-center gap-4">
              <Icon className="w-7 h-7 shrink-0" stroke="url(#ent-icon-grad)" strokeWidth={1.6} />
              <div>
                <div className="text-sm font-semibold text-foreground leading-tight">{label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="page-grid py-12 sm:py-24">
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-center">
          <GBadge>Domain Expertise</GBadge>
          <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-5 leading-tight">
            Enterprise Technology<br />
            <span className="brand-text">Domain Expertise</span>
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            We deliver end-to-end enterprise digital transformation — from auditing legacy systems and designing target architectures to building integrations, automating workflows, and migrating critical workloads to the cloud. Our 250+ engineers have delivered large-scale programmes for enterprises across financial services, manufacturing, healthcare, and retail.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Whether you're modernising a 20-year-old monolith, integrating disparate enterprise systems, or building an intelligent automation layer across your operations — we deliver with the rigour, governance, and technical depth that enterprise programmes demand.
          </p>
          <div className="flex flex-col gap-3 mt-8">
            {[
              "Legacy system modernisation & cloud migration",
              "ERP & enterprise system integration",
              "AI-powered workflow & process automation",
              "Executive analytics & BI platforms",
              "Enterprise security, IAM & compliance",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-sm text-foreground">
                <CheckCircle2 className="w-4 h-4 shrink-0" stroke="url(#ent-icon-grad)" strokeWidth={2} />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="hidden lg:block lg:col-span-1" />
        <div className="col-span-12 lg:col-span-6">
          <EnterpriseDashboard />
        </div>
      </section>
    </>
  );
}

/* ── 3. Solutions Grid ───────────────────────────────────────────── */
function SolutionsSection() {
  return (
    <section id="ent-solutions" className="page-grid py-12 sm:py-24 border-t border-border">
      <div className="col-span-12 mb-8 sm:mb-12">
        <GBadge>Enterprise Solutions</GBadge>
        <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
          Enterprise Software Solutions<br />
          <span className="brand-text">We Deliver</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
          Full-spectrum enterprise technology services — from legacy modernisation and ERP integration to cloud migration and intelligent automation.
        </p>
      </div>

      {SOLUTIONS.map(({ icon: Icon, title, desc, image }) => (
        <div key={title} className="col-span-12 sm:col-span-6 lg:col-span-3 rounded-2xl overflow-hidden relative group" style={{ minHeight: "300px" }}>
          <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.80) 35%, rgba(0,0,0,0.20) 65%, rgba(0,0,0,0.04) 100%)" }} />
          <div className="relative h-full flex flex-col justify-end p-6" style={{ minHeight: "300px" }}>
            <Icon className="w-6 h-6 mb-3" stroke="url(#ent-icon-grad)" strokeWidth={1.6} />
            <h3 className="text-sm font-bold text-white mb-2">{title}</h3>
            <p className="text-xs text-white/70 leading-relaxed">{desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ── 4. Key Features ─────────────────────────────────────────────── */
function FeaturesSection() {
  return (
    <section className="page-grid py-12 sm:py-24 border-t border-border">
      <div className="col-span-12 mb-8 sm:mb-12">
        <GBadge>Platform Capabilities</GBadge>
        <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
          Key Capabilities<br />
          <span className="brand-text">We Deliver</span>
        </h2>
      </div>

      {FEATURES.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="col-span-12 sm:col-span-6 lg:col-span-3 rounded-2xl border border-border bg-card p-6 group hover:border-primary/30 transition-colors relative overflow-hidden">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(300px circle at 0% 0%, color-mix(in oklch, oklch(0.57 0.22 25) 6%, transparent), transparent 70%)" }} />
          <div className="relative">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "color-mix(in oklch, oklch(0.57 0.22 25) 12%, transparent)", border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 25%, transparent)" }}>
              <Icon className="w-4.5 h-4.5" stroke="url(#ent-icon-grad)" strokeWidth={1.6} />
            </div>
            <h3 className="text-sm font-bold text-foreground mb-2">{title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ── 5. Architecture ─────────────────────────────────────────────── */
function ArchitectureSection() {
  return (
    <section className="page-grid py-12 sm:py-24 border-t border-border">
      <div className="col-span-12 lg:col-span-5 flex flex-col justify-center mb-8 lg:mb-0">
        <GBadge>Platform Architecture</GBadge>
        <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-5 leading-tight">
          Enterprise Platform<br />
          <span className="brand-text">Architecture</span>
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          We design layered enterprise architectures — presentation, integration, core services, data, and infrastructure — each independently scalable, independently deployable, and secured at every boundary.
        </p>
        <div className="flex flex-col gap-3">
          {[
            "API-first, microservices-based design",
            "Event-driven integration between systems",
            "Multi-cloud and hybrid cloud support",
            "Zero-trust security model throughout",
            "Observability and monitoring built in",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2.5 text-sm text-foreground">
              <ChevronRight className="w-4 h-4 shrink-0" style={{ color: "oklch(0.57 0.22 25)" }} />
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="hidden lg:block lg:col-span-1" />
      <div className="col-span-12 lg:col-span-6">
        <ArchitectureDiagram />
      </div>
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
            Enterprise <span className="brand-text">Platforms We've Built</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base">
            Large-scale transformation programmes delivered for real enterprise organisations.
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

/* ── 7. Stakeholders ─────────────────────────────────────────────── */
function StakeholdersSection() {
  return (
    <section className="page-grid py-12 sm:py-24 border-t border-border">
      <div className="col-span-12 mb-8 sm:mb-12">
        <GBadge>Who We Serve</GBadge>
        <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
          Stakeholders<br />
          <span className="brand-text">We Work With</span>
        </h2>
      </div>

      {STAKEHOLDERS.map(({ icon: Icon, title, items }) => (
        <div key={title} className="col-span-12 sm:col-span-6 lg:col-span-3 rounded-2xl border border-border bg-card overflow-hidden group hover:border-primary/30 transition-colors relative">
          <div className="p-7">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: "color-mix(in oklch, oklch(0.57 0.22 25) 12%, transparent)", border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 25%, transparent)" }}>
              <Icon className="w-5 h-5" stroke="url(#ent-icon-grad)" strokeWidth={1.6} />
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

/* ── 8. Tech Stack ───────────────────────────────────────────────── */
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
        <div key={label} className="col-span-6 sm:col-span-4 md:col-span-2 rounded-2xl border border-border bg-card p-5 group hover:border-primary/30 transition-colors">
          <Icon className="w-5 h-5 mb-3" stroke="url(#ent-icon-grad)" strokeWidth={1.6} />
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

/* ── 9. Business Impact ──────────────────────────────────────────── */
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
            Outcomes delivered across large-scale enterprise transformation programmes.
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

/* ── 10. Why Choose Us ───────────────────────────────────────────── */
function WhyUsSection() {
  return (
    <section className="page-grid py-12 sm:py-24 border-t border-border">
      <div className="col-span-12 mb-8 sm:mb-12">
        <GBadge>Why Choose Us</GBadge>
        <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
          Why Choose Us for<br />
          <span className="brand-text">Enterprise Solutions</span>
        </h2>
      </div>

      {WHY_US.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="col-span-12 sm:col-span-6 lg:col-span-3 rounded-2xl border border-border bg-card p-6 sm:p-8 group hover:border-primary/30 transition-colors relative overflow-hidden">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(400px circle at 0% 0%, color-mix(in oklch, oklch(0.57 0.22 25) 6%, transparent), transparent 70%)" }} />
          <div className="relative">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: "color-mix(in oklch, oklch(0.57 0.22 25) 12%, transparent)", border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 25%, transparent)" }}>
              <Icon className="w-5 h-5" stroke="url(#ent-icon-grad)" strokeWidth={1.6} />
            </div>
            <h3 className="text-base font-bold text-foreground mb-3">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ── 11. Development Approach ────────────────────────────────────── */
function ApproachSection() {
  return (
    <section className="page-grid py-12 sm:py-24 border-t border-border">
      <div className="col-span-12 mb-8 sm:mb-12">
        <GBadge>Our Process</GBadge>
        <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
          Our Delivery<br />
          <span className="brand-text">Approach</span>
        </h2>
      </div>

      <div className="col-span-12">
        <div className="relative">
          <div className="absolute top-8 left-0 right-0 h-[2px] hidden lg:block" style={{ background: "linear-gradient(90deg, transparent 0%, oklch(0.20 0.01 30) 5%, oklch(0.20 0.01 30) 95%, transparent 100%)" }} />
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
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
              Start Your Enterprise<br />
              <span className="brand-text">Transformation</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-md">
              Modernise legacy systems, integrate enterprise platforms, and build automation — with a team that delivers at enterprise scale.
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
export default function EnterpriseSolution() {
  return (
    <div className="bg-background">
      <GradientDefs />
      <HeroSection />
      <DomainExpertiseSection />
      <SolutionsSection />
      <FeaturesSection />
      <ArchitectureSection />
      <CaseStudiesSection />
      <StakeholdersSection />
      <TechStackSection />
      <ImpactSection />
      <WhyUsSection />
      <ApproachSection />
      <CTASection />
      <Footer />
    </div>
  );
}
