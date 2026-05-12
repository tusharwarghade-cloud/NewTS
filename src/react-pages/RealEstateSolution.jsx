import { useState, useEffect, useRef } from "react";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import AuroraBg from "@/components/AuroraBg";
import ScrollHero from "@/components/ScrollHero";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight, CheckCircle2, ShieldCheck, BrainCircuit, Network, Zap,
  Building2, Home, Users, CreditCard, BarChart3, Search, Calendar,
  FileText, PieChart, Key, Lock, Globe, Layers, MapPin, Database,
  TrendingUp, Code2, Cloud, Smartphone, Server, RefreshCw, ChevronRight,
} from "lucide-react";

/* ── Brand ──────────────────────────────────────────────────────── */
const BG   = "linear-gradient(135deg, oklch(0.57 0.22 25) 0%, oklch(0.52 0.24 292) 100%)";
const GLOW = "0 0 28px color-mix(in oklch, oklch(0.57 0.22 25) 32%, transparent)";
const GT   = { backgroundImage: BG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };

function GradientDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute", overflow: "hidden" }} aria-hidden>
      <defs>
        <linearGradient id="re-icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
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
  { icon: Building2,  label: "Enterprise PropTech Platforms", sub: "Developer & builder-grade systems" },
  { icon: Home,       label: "Government Housing Systems",     sub: "SRA, PMAY & rehabilitation platforms" },
  { icon: CreditCard, label: "Financing & Loan Integration",   sub: "Bank & NBFC API connections" },
  { icon: Users,      label: "CRM & Sales Automation",         sub: "Lead-to-closure pipelines" },
];

const SOLUTIONS = [
  {
    icon: Calendar,
    title: "Property Booking & Sales Platforms",
    desc: "Digital booking platforms covering property discovery, unit selection, token payments, agreement generation, and possession tracking — deployed end to end for developers.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80&sat=-30",
  },
  {
    icon: Network,
    title: "Channel Partner Management Systems",
    desc: "Platforms that manage broker networks at scale — lead assignments, real-time inventory visibility, automated commission tracking, and performance analytics.",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80&sat=-30",
  },
  {
    icon: ShieldCheck,
    title: "Slum Rehabilitation & Government Housing",
    desc: "Beneficiary management, eligibility verification, unit allotment, and compliance tracking systems for SRA, PMAY, and urban housing authorities.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&sat=-30",
  },
  {
    icon: CreditCard,
    title: "Real Estate Financing & Loan Platforms",
    desc: "Loan origination, sanction, and disbursement platforms with direct bank and NBFC API integration — supporting home loans, project financing, and balance transfer workflows.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&sat=-30",
  },
  {
    icon: BrainCircuit,
    title: "CRM & Lead Management Systems",
    desc: "Lead capture, automated nurturing, and conversion pipelines built for real estate sales teams — with follow-up automation, pipeline tracking, and site visit scheduling.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&sat=-30",
  },
];

const FEATURES = [
  { icon: Search,     title: "Advanced Property Search & Filters",   desc: "Multi-parameter search across location, budget, unit type, and live availability." },
  { icon: Database,   title: "Real-Time Inventory Management",        desc: "Live unit status with colour-coded floor plans, booking locks, and instant sync." },
  { icon: CreditCard, title: "Booking & Payment Integration",         desc: "Token to possession — online payments, automated receipts, and escrow workflows." },
  { icon: Users,      title: "Lead & CRM Management",                 desc: "Pipeline tracking, automated follow-ups, and site-visit scheduling." },
  { icon: FileText,   title: "Document Management & eSign",           desc: "Automated agreement generation, eSign integration, and secure document storage." },
  { icon: BarChart3,  title: "Analytics & Reporting Dashboards",      desc: "Track sales velocity, inventory ageing, and broker performance in real time." },
  { icon: Key,        title: "Role-Based Access Controls",            desc: "Granular permissions for developers, brokers, customers, and admins." },
];

const STAKEHOLDERS = [
  {
    icon: Building2,
    title: "Developers & Builders",
    items: ["Inventory & unit management", "Sales pipeline automation", "Booking & collection tracking", "Project-level dashboards"],
  },
  {
    icon: Users,
    title: "Channel Partners & Brokers",
    items: ["Lead assignment & tracking", "Commission calculation & payouts", "Inventory visibility portals", "Performance analytics"],
  },
  {
    icon: ShieldCheck,
    title: "Government Bodies",
    items: ["Beneficiary registration & KYC", "Allotment & lottery systems", "Compliance & audit tracking", "Rehabilitation workflow management"],
  },
  {
    icon: Home,
    title: "End Customers",
    items: ["Property discovery & comparison", "Online booking & payment", "EMI & financing applications", "Post-sale communication portals"],
  },
];

/* ── Case Studies ───────────────────────────────────────────────── */
const CASE_ITEMS = [
  {
    id: "aditya-birla",
    label: "Aditya Birla Partner Platform",
    icon: Building2,
    tag: "PropTech · Channel Management",
    title: "Aditya Birla Channel Partner Management Platform",
    challenge: "Digitise broker onboarding, inventory visibility, and commission workflows for one of India's largest real estate groups.",
    outcome: "Deployed a unified partner portal managing 2,000+ brokers with real-time inventory, automated commissions, and a 60% reduction in manual operations.",
    metrics: [["2,000+", "Brokers"], ["60%", "Ops Reduction"], ["Real-time", "Inventory"]],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=80&sat=-30",
  },
  {
    id: "sra",
    label: "Slum Rehabilitation System",
    icon: Home,
    tag: "GovTech · Housing",
    title: "Slum Rehabilitation Authority Management System",
    challenge: "Build a government-grade beneficiary tracking, eligibility verification, and allotment platform for an urban housing authority.",
    outcome: "Processed 50,000+ beneficiary records with full audit trails, lottery management, and real-time compliance dashboards for regulatory reviews.",
    metrics: [["50K+", "Beneficiaries"], ["100%", "Audit Trail"], ["Compliant", "Platform"]],
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80&sat=-30",
  },
  {
    id: "getkredit",
    label: "GetKredit Financing Platform",
    icon: CreditCard,
    tag: "FinTech · Real Estate Finance",
    title: "GetKredit – Real Estate Financing & Loan Platform",
    challenge: "Create an end-to-end home loan origination and processing platform connecting borrowers, developers, and 15+ financial institutions.",
    outcome: "Enabled digital loan processing in under 48 hours with bank API integrations, automated credit scoring, and a 3× improvement in disbursement speed.",
    metrics: [["15+", "Banks Integrated"], ["48hr", "Loan TAT"], ["3×", "Faster Disbursement"]],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80&sat=-30",
  },
];

const CS_INTERVAL = 4500;
const CS_CHIP_H   = 84;
const csWrap = (min, max, v) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

const TECH_STACK = [
  { label: "Frontend",  items: ["React", "Angular", "Next.js"], icon: Code2 },
  { label: "Mobile",    items: ["React Native", "Flutter"],       icon: Smartphone },
  { label: "Backend",   items: ["Node.js", ".NET", "Java"],       icon: Server },
  { label: "Database",  items: ["MongoDB", "PostgreSQL", "SQL"],  icon: Database },
  { label: "Cloud",     items: ["AWS", "Azure", "GCP"],           icon: Cloud },
];

const WHY_US = [
  { icon: Building2,  title: "Deep Domain Expertise",         desc: "5+ years building real estate platforms for developers, government bodies, and financial institutions across India." },
  { icon: ShieldCheck,title: "Compliance-Ready Systems",      desc: "RERA compliance, government housing standards, and banking regulatory requirements built into every platform." },
  { icon: Network,    title: "API Integration Capabilities",  desc: "Pre-built connectors for payment gateways, banking APIs, KYC providers, and government data sources." },
  { icon: TrendingUp, title: "Proven Enterprise Deployments", desc: "Successfully delivered platforms handling 50K+ transactions for Tier-1 developers and government authorities." },
  { icon: Layers,     title: "Scalable Architecture",         desc: "Microservices-first platforms designed to scale from 100 to 1M+ units without re-architecture." },
];

const TIMELINE = [
  { step: "01", title: "Requirement Understanding",   desc: "Stakeholder workshops, user journey mapping, and platform scope definition." },
  { step: "02", title: "Market & Workflow Analysis",  desc: "Competitive research, regulatory review, and existing system audit." },
  { step: "03", title: "UI/UX Design",                desc: "Wireframes, prototypes, and design system aligned to enterprise UX standards." },
  { step: "04", title: "Development & Integration",   desc: "Agile sprints with continuous delivery, API integrations, and CMS setup." },
  { step: "05", title: "Testing & Compliance",        desc: "QA, UAT, RERA compliance checks, and security penetration testing." },
  { step: "06", title: "Deployment",                  desc: "Phased go-live with feature flags, canary releases, and rollback controls." },
  { step: "07", title: "Post-Go-Live Support",        desc: "24×7 SLA-backed support, performance monitoring, and continuous improvement." },
];

/* ── Mock dashboard visual ──────────────────────────────────────── */
function RealEstateDashboard() {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden" style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.3)" }}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <span className="text-xs text-muted-foreground ml-2">Property Sales Dashboard</span>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[["₹840Cr", "Sales Volume"], ["2,840", "Units Sold"], ["94%", "Collection Rate"]].map(([v, l]) => (
            <div key={l} className="rounded-xl border border-border bg-background/60 px-3 py-2.5">
              <div className="text-base font-bold" style={GT}>{v}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{l}</div>
            </div>
          ))}
        </div>
        <div className="flex items-end gap-1.5 h-20 mb-4">
          {[35, 55, 45, 70, 50, 85, 65, 90, 55, 95, 72, 88].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i % 3 === 0 ? BG : "color-mix(in oklch, oklch(0.57 0.22 25) 25%, var(--color-border))", opacity: 0.85 }} />
          ))}
        </div>
        {[["Tower A — 2BHK", "48/60 booked", "80%"], ["Tower B — 3BHK", "22/40 booked", "55%"], ["Penthouse — 4BHK", "8/10 booked", "80%"]].map(([name, status, pct]) => (
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

/* ── 1. Hero ─────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <ScrollHero
      badge="Real Estate Solutions"
      badgeDot={false}
      pills={["Developers", "Builders", "Channel Partners", "Government Bodies", "Financial Institutions"]}
      headline={<>Real Estate<br /><span className="brand-text">Digital Solutions</span></>}
      subheadline="End-to-end platforms for developers, brokers, and financial institutions to streamline property sales, operations, and customer experience."
      primaryCta="Discuss Your Project"
      secondaryCta="Explore Solutions"
      image="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1800&q=80&sat=-30"
      imageAlt="Premium residential towers"
      expandedBadge="Trusted by Developers & Government Bodies"
      expandedHeadline={<>Enterprise Platforms for the<br />Real Estate Ecosystem</>}
      expandedCta="See All Solutions"
      onSecondary={() => document.getElementById("re-solutions")?.scrollIntoView({ behavior: "smooth" })}
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
              <Icon className="w-7 h-7 shrink-0" stroke="url(#re-icon-grad)" strokeWidth={1.6} />
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
            Real Estate Domain<br />
            <span className="brand-text">Technology Expertise</span>
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            We've built real estate technology platforms across the entire value chain — from developer portals and channel partner systems to government housing management and financial integration platforms. Our teams understand the operational complexity, compliance requirements, and stakeholder diversity that defines enterprise real estate technology.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Whether you're a Tier-1 developer managing thousands of units, a housing authority running a rehabilitation scheme, or a financial institution powering home loans — we build platforms that handle your real-world workflows at scale.
          </p>
        </div>
        <div className="hidden lg:block lg:col-span-1" />
        <div className="col-span-12 lg:col-span-6">
          <RealEstateDashboard />
        </div>
      </section>
    </>
  );
}

/* ── 3. Solutions Grid ───────────────────────────────────────────── */
function SolutionsSection() {
  return (
    <section id="re-solutions" className="page-grid py-12 sm:py-24 border-t border-border">
      <div className="col-span-12 mb-8 sm:mb-12">
        <GBadge>Our Solutions</GBadge>
        <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
          Real Estate Software Solutions<br />
          <span className="brand-text">We Deliver</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
          Purpose-built platforms for every stakeholder in the real estate ecosystem — designed for scale, compliance, and seamless integration.
        </p>
      </div>

      {SOLUTIONS.map(({ icon: Icon, title, desc, image }) => (
        <div key={title} className="col-span-12 sm:col-span-6 lg:col-span-4 rounded-2xl overflow-hidden relative group" style={{ minHeight: "300px" }}>
          <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.80) 35%, rgba(0,0,0,0.20) 65%, rgba(0,0,0,0.04) 100%)" }} />
          <div className="relative h-full flex flex-col justify-end p-6" style={{ minHeight: "300px" }}>
            <Icon className="w-6 h-6 mb-3" stroke="url(#re-icon-grad)" strokeWidth={1.6} />
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
          Key Features<br />
          <span className="brand-text">We Build</span>
        </h2>
      </div>

      {FEATURES.map(({ icon: Icon, title, desc }, i) => (
        <div key={title} className="col-span-12 sm:col-span-6 lg:col-span-3 rounded-2xl border border-border bg-card p-6 group hover:border-primary/30 transition-colors relative overflow-hidden">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(300px circle at 0% 0%, color-mix(in oklch, oklch(0.57 0.22 25) 6%, transparent), transparent 70%)" }} />
          <div className="relative">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "color-mix(in oklch, oklch(0.57 0.22 25) 12%, transparent)", border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 25%, transparent)" }}>
              <Icon className="w-4.5 h-4.5" stroke="url(#re-icon-grad)" strokeWidth={1.6} />
            </div>
            <h3 className="text-sm font-bold text-foreground mb-2">{title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ── 5. Stakeholders ─────────────────────────────────────────────── */
function StakeholdersSection() {
  return (
    <section className="page-grid py-12 sm:py-24 border-t border-border">
      <div className="col-span-12 mb-8 sm:mb-12">
        <GBadge>Stakeholders</GBadge>
        <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
          Stakeholders<br />
          <span className="brand-text">We Serve</span>
        </h2>
      </div>

      {STAKEHOLDERS.map(({ icon: Icon, title, items }, i) => (
        <div key={title} className="col-span-12 sm:col-span-6 lg:col-span-3 rounded-2xl border border-border bg-card overflow-hidden group hover:border-primary/30 transition-colors relative">
          <div className="p-7">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: "color-mix(in oklch, oklch(0.57 0.22 25) 12%, transparent)", border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 25%, transparent)" }}>
              <Icon className="w-5 h-5" stroke="url(#re-icon-grad)" strokeWidth={1.6} />
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

/* ── 6. Case Studies (same style as homepage) ────────────────────── */
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
      {/* Aurora light background — same as homepage products section */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="aurora-light" />
        <div className="aurora-light-alt" />
      </div>

      <div className="page-grid mb-14 relative z-10">
        <div className="col-span-12 text-center">
          <GBadge>Case Studies</GBadge>
          <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4">
            Our Real Estate <span className="brand-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base">
            Real platforms built for real developers, government bodies, and financial institutions.
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

/* ── 7. Tech Stack ───────────────────────────────────────────────── */
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

      {TECH_STACK.map(({ label, items, icon: Icon }, i) => (
        <div key={label} className="col-span-6 sm:col-span-4 md:col-span-2 rounded-2xl border border-border bg-card p-5 group hover:border-primary/30 transition-colors relative overflow-hidden">
          <Icon className="w-5 h-5 mb-3" stroke="url(#re-icon-grad)" strokeWidth={1.6} />
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

/* ── 8. Why Choose Us ────────────────────────────────────────────── */
function WhyUsSection() {
  return (
    <section className="page-grid py-12 sm:py-24 border-t border-border">
      <div className="col-span-12 mb-8 sm:mb-12">
        <GBadge>Why Choose Us</GBadge>
        <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
          Why Choose Us for<br />
          <span className="brand-text">Real Estate Solutions</span>
        </h2>
      </div>

      {WHY_US.map(({ icon: Icon, title, desc }, i) => (
        <div key={title} className="col-span-12 sm:col-span-6 lg:col-span-4 rounded-2xl border border-border bg-card p-6 sm:p-8 group hover:border-primary/30 transition-colors relative overflow-hidden">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(400px circle at 0% 0%, color-mix(in oklch, oklch(0.57 0.22 25) 6%, transparent), transparent 70%)" }} />
          <div className="relative">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: "color-mix(in oklch, oklch(0.57 0.22 25) 12%, transparent)", border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 25%, transparent)" }}>
              <Icon className="w-5 h-5" stroke="url(#re-icon-grad)" strokeWidth={1.6} />
            </div>
            <h3 className="text-base font-bold text-foreground mb-3">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ── 9. Development Approach ─────────────────────────────────────── */
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
          {/* Connecting line */}
          <div className="absolute top-8 left-0 right-0 h-[2px] hidden lg:block" style={{ background: "linear-gradient(90deg, transparent 0%, oklch(0.20 0.01 30) 5%, oklch(0.20 0.01 30) 95%, transparent 100%)" }} />

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {TIMELINE.map(({ step, title, desc }, i) => (
              <div key={step} className="flex flex-col items-center text-center group">
                {/* Step bubble */}
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

/* ── 10. Final CTA ───────────────────────────────────────────────── */
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
              Build Your Real Estate<br />
              <span className="brand-text">Platform with Us</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-md">
              Transform your real estate operations with scalable digital solutions — built by a team that understands your domain.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <Button size="lg" className="rounded-full gap-2 group font-semibold text-white border-none min-w-52" style={{ background: BG, boxShadow: GLOW }}>
              Talk to Experts <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-border bg-card/60 text-foreground hover:bg-secondary min-w-52">
              Request Proposal
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Page export ─────────────────────────────────────────────────── */
export default function RealEstateSolution() {
  return (
    <div className="bg-background">
      <GradientDefs />
      <HeroSection />
      <DomainExpertiseSection />
      <SolutionsSection />
      <Separator className="max-w-7xl mx-auto" />
      <FeaturesSection />
      <StakeholdersSection />
      <CaseStudiesSection />
      <TechStackSection />
      <WhyUsSection />
      <ApproachSection />
      <CTASection />
      <Footer />
    </div>
  );
}
