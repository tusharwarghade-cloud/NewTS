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
  Stethoscope, Heart, ShieldCheck, Users, FileText,
  Video, Calendar, CreditCard, Bell, Database, Pill,
  Baby, MessageSquare, Lock, Server, Cloud, Code2,
  Smartphone, BarChart3, Network, Layers, Zap,
  RefreshCw, Globe, TrendingUp, Activity,
} from "lucide-react";

/* ── Brand ──────────────────────────────────────────────────────── */
const BG   = "linear-gradient(135deg, oklch(0.57 0.22 25) 0%, oklch(0.52 0.24 292) 100%)";
const GLOW = "0 0 28px color-mix(in oklch, oklch(0.57 0.22 25) 32%, transparent)";
const GT   = { backgroundImage: BG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };

function GradientDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute", overflow: "hidden" }} aria-hidden>
      <defs>
        <linearGradient id="hc-icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
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
  { icon: Heart,       label: "End-to-End Patient Platforms",    sub: "Full journey from booking to billing" },
  { icon: FileText,    label: "EMR & Health Records",             sub: "Structured electronic medical records" },
  { icon: Video,       label: "Telemedicine Systems",             sub: "Audio, video & in-clinic modes" },
  { icon: ShieldCheck, label: "Secure & Compliant",               sub: "HIPAA-compliant data architecture" },
];

const SOLUTIONS = [
  {
    icon: Stethoscope,
    title: "Doctor-Patient Consultation Platforms",
    desc: "Multi-mode consultation systems supporting audio calls, video calls, and in-clinic visits with integrated scheduling, reminders, and post-visit follow-ups.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80&sat=-30",
  },
  {
    icon: FileText,
    title: "EMR & Health Record Management",
    desc: "Structured electronic medical record systems with short and detailed EMR templates, diagnosis history, treatment plans, and lab result integrations.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80&sat=-30",
  },
  {
    icon: Video,
    title: "Telemedicine Platforms",
    desc: "Fully integrated telemedicine infrastructure supporting real-time audio/video consultations, waiting room queues, and seamless EMR documentation during calls.",
    image: "https://images.unsplash.com/photo-1587370560942-ad2a04eabb6d?w=800&q=80&sat=-30",
  },
  {
    icon: CreditCard,
    title: "Healthcare Billing & Payment Systems",
    desc: "End-to-end billing engines with UPI, card, and partial payment support — automated invoicing, insurance claim workflows, and financial settlement dashboards.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&sat=-30",
  },
  {
    icon: Bell,
    title: "Patient Engagement & Communication",
    desc: "Automated SMS, WhatsApp, and email communication for appointment confirmations, reminders, prescription delivery, and post-care follow-ups.",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80&sat=-30",
  },
  {
    icon: Network,
    title: "Multi-Clinic Management Platforms",
    desc: "Centralised control panels for operating multiple clinic branches — unified scheduling, cross-clinic patient records, staff management, and analytics.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80&sat=-30",
  },
  {
    icon: Lock,
    title: "Healthcare API & Secure Data Platforms",
    desc: "HIPAA-compliant API layers and data platforms with AES-256 encryption, role-based access control, and secure cross-organisation health data exchange.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&sat=-30",
  },
];

const FEATURES = [
  { icon: Calendar,      title: "Appointment Management",            desc: "Audio, video, and in-clinic booking with smart scheduling, queue management, and automated reminders." },
  { icon: FileText,      title: "Electronic Medical Records",        desc: "Short and detailed EMR templates, diagnosis history, treatment plans, and structured clinical notes." },
  { icon: Pill,          title: "Digital Prescriptions & Records",   desc: "Digital prescription generation, pharmacy integration, and secure health record sharing." },
  { icon: CreditCard,    title: "Billing & Payment Systems",         desc: "UPI, card, and partial payment support with automated invoicing and insurance workflows." },
  { icon: Database,      title: "Drug Database & Pharmacy",          desc: "Integrated drug database for accurate prescribing with pharmacy fulfilment and stock management." },
  { icon: Baby,          title: "Vaccine & Paediatric Tracking",     desc: "Child immunisation schedules, growth tracking, and paediatric health record management." },
  { icon: MessageSquare, title: "SMS & WhatsApp Communication",      desc: "Automated patient notifications via SMS and WhatsApp for appointments, prescriptions, and follow-ups." },
  { icon: ShieldCheck,   title: "Role-Based Access Control",         desc: "Granular permissions for Doctors, Patients, Admins, and Receptionists with audit trail logging." },
];

const CASE_ITEMS = [
  {
    id: "deardoc",
    label: "DearDoc",
    icon: Stethoscope,
    tag: "HealthTech · Consultation Platform",
    title: "DearDoc – Doctor-Patient Consultation Platform",
    challenge: "Build a comprehensive healthcare platform supporting multi-mode consultations, structured EMR, billing, and multi-clinic management for a growing healthcare network.",
    outcome: "Delivered a full-stack healthcare platform with EMR, audio/video/in-clinic consultation modes, digital billing, drug database, and WhatsApp-integrated patient communication across multiple clinic branches.",
    metrics: [["Multi-mode", "Consultations"], ["EMR + Billing", "Integrated"], ["Multi-clinic", "Platform"]],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=80&sat=-30",
  },
  {
    id: "hipaasafe",
    label: "HipaaSafe",
    icon: ShieldCheck,
    tag: "HealthTech · Compliance Platform",
    title: "HipaaSafe – HIPAA-Compliant Healthcare Platform",
    challenge: "Design and build a HIPAA-compliant multi-organisation healthcare communication and data platform with end-to-end encryption and role-based access control.",
    outcome: "Deployed a secure healthcare platform with AES-256 encrypted medical data, OTP-based authentication, HIPAA-compliant audit trails, and secure cross-organisation health data exchange.",
    metrics: [["AES-256", "Encryption"], ["HIPAA", "Compliant"], ["Multi-org", "Architecture"]],
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&q=80&sat=-30",
  },
];

const CS_INTERVAL = 4500;
const CS_CHIP_H   = 84;
const csWrap = (min, max, v) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

const COMPLIANCE = [
  { icon: ShieldCheck,   title: "HIPAA-Compliant Systems",      desc: "Architecture and workflows designed to meet HIPAA requirements for protected health information." },
  { icon: Lock,          title: "End-to-End Encryption",         desc: "AES-256 encryption for all medical data at rest and in transit across the platform." },
  { icon: Database,      title: "Secure Patient Data Storage",   desc: "Isolated patient data storage with backup, recovery, and retention policies." },
  { icon: Users,         title: "Role-Based Access Control",     desc: "Granular, auditable access permissions for every user role across the platform." },
  { icon: Zap,           title: "OTP-Based Authentication",      desc: "Two-factor authentication via OTP for all user logins and sensitive data access." },
];

const TECH_STACK = [
  { label: "Backend",        items: ["Scala", "Java", "Node.js"],              icon: Server },
  { label: "Frontend",       items: ["Angular", "React"],                      icon: Code2 },
  { label: "Database",       items: ["PostgreSQL", "Redis"],                   icon: Database },
  { label: "Search",         items: ["Elasticsearch"],                         icon: BarChart3 },
  { label: "Cloud",          items: ["AWS EC2", "AWS S3", "AWS RDS"],          icon: Cloud },
  { label: "Communication",  items: ["Twilio", "SendGrid", "CometChat"],       icon: MessageSquare },
];

const METRICS = [
  { value: "↓ 70%",  label: "Reduction in manual paperwork and operational overhead at clinics" },
  { value: "↑ 3×",   label: "Improvement in patient appointment booking and consultation speed" },
  { value: "95%",    label: "Patient engagement rate via automated SMS and WhatsApp communication" },
  { value: "Multi",  label: "Clinic branches managed centrally from a single operations platform" },
];

const WHY_US = [
  { icon: Heart,       title: "Healthcare Domain Expertise",          desc: "Deep experience building clinical platforms — from EMR and billing to telemedicine and pharmacy integrations." },
  { icon: ShieldCheck, title: "Compliance-Heavy System Experience",   desc: "Proven delivery of HIPAA-compliant, audit-ready healthcare platforms with enterprise-grade security architecture." },
  { icon: Network,     title: "Scalable Multi-Clinic Architectures",  desc: "Systems designed to manage single clinics or grow to hundreds of branches without platform re-architecture." },
  { icon: Layers,      title: "Strong Backend & Integration Skills",  desc: "Robust API integration capabilities with Twilio, payment gateways, drug databases, and EHR standards." },
];

const TIMELINE = [
  { step: "01", title: "Requirement Analysis",        desc: "Stakeholder discovery, clinical workflow mapping, and platform scope definition." },
  { step: "02", title: "Healthcare Workflow Mapping",  desc: "Map patient journeys, doctor workflows, billing cycles, and compliance requirements." },
  { step: "03", title: "UI/UX Design",                desc: "Clinical-grade interface design prioritising workflow efficiency and data clarity." },
  { step: "04", title: "Development & Integration",   desc: "Agile delivery of core modules with third-party API and EHR integrations." },
  { step: "05", title: "Testing & Compliance",        desc: "QA, UAT, HIPAA compliance validation, and security penetration testing." },
  { step: "06", title: "Deployment",                  desc: "Phased go-live with zero-downtime releases and rollback controls." },
  { step: "07", title: "Post-Go-Live Support",        desc: "SLA-backed support, performance monitoring, and continuous platform improvement." },
];

/* ── Mock EMR Dashboard ─────────────────────────────────────────── */
function HealthcareDashboard() {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden" style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.3)" }}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <span className="text-xs text-muted-foreground ml-2">EMR & Clinic Dashboard</span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-emerald-500 font-mono">LIVE</span>
        </div>
      </div>
      <div className="p-5">
        {/* KPI row */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[["148", "Today's Appointments"], ["94%", "Consultation Rate"], ["2,340", "Active Patients"]].map(([v, l]) => (
            <div key={l} className="rounded-xl border border-border bg-background/60 px-3 py-2.5">
              <div className="text-base font-bold" style={GT}>{v}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{l}</div>
            </div>
          ))}
        </div>
        {/* Appointment mode chart */}
        <div className="flex items-end gap-1.5 h-20 mb-4">
          {[50, 70, 55, 85, 60, 90, 65, 80, 72, 95, 68, 88].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i % 3 === 0 ? BG : "color-mix(in oklch, oklch(0.57 0.22 25) 25%, var(--color-border))", opacity: 0.85 }} />
          ))}
        </div>
        {/* Consultation mode breakdown */}
        {[["Video Consultations", "62 sessions", "42%"], ["Audio Consultations", "45 sessions", "30%"], ["In-Clinic Visits", "41 sessions", "28%"]].map(([name, status, pct]) => (
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
    { label: "Users",             sub: "Doctors & Patients" },
    { label: "Healthcare Platform", sub: "API Gateway" },
    { label: "Core Modules",     sub: "EMR · Appt · Billing" },
    { label: "Database & Cloud", sub: "PostgreSQL · AWS" },
  ];
  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">Platform Architecture</p>
      {/* Flow */}
      <div className="flex items-center justify-between gap-2 mb-8 overflow-x-auto pb-2">
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
                <div className="h-px w-6 sm:w-10" style={{ background: BG }} />
                <ArrowRight className="w-3 h-3 shrink-0" style={{ color: "oklch(0.57 0.22 25)" }} />
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Module breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { icon: FileText,      label: "EMR System",                  desc: "Structured medical records, diagnosis, and treatment history" },
          { icon: Calendar,      label: "Appointment Service",         desc: "Multi-mode scheduling with queue management and reminders" },
          { icon: MessageSquare, label: "Communication System",        desc: "SMS, WhatsApp, and in-app messaging via Twilio & SendGrid" },
          { icon: CreditCard,    label: "Payment & Billing Modules",   desc: "UPI, card, and partial payment with automated invoicing" },
          { icon: BarChart3,     label: "Data Indexing & Search",      desc: "Elasticsearch-powered patient and record search at scale" },
          { icon: Users,         label: "Queue Management",            desc: "Real-time patient queue tracking for in-clinic operations" },
        ].map(({ icon: Icon, label, desc }) => (
          <div key={label} className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/50 p-3">
            <Icon className="w-4 h-4 mt-0.5 shrink-0" stroke="url(#hc-icon-grad)" strokeWidth={1.6} />
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
      badge="Healthcare Technology Solutions"
      badgeDot={false}
      pills={["Hospitals & Clinics", "Healthcare Startups", "Multi-Clinic Operators", "Healthtech Companies", "Enterprise Healthcare"]}
      headline={<>Healthcare<br /><span className="brand-text">Technology Solutions</span></>}
      subheadline="Build scalable healthcare platforms for patient management, consultations, EMR systems, and secure medical data workflows."
      primaryCta="Talk to Healthcare Experts"
      secondaryCta="Explore Solutions"
      image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1800&q=80&sat=-30"
      imageAlt="Healthcare technology platform"
      expandedBadge="Trusted by Healthcare Enterprises"
      expandedHeadline={<>Enterprise Platforms for<br />Digital Healthcare Delivery</>}
      expandedCta="See All Solutions"
      onSecondary={() => document.getElementById("hc-solutions")?.scrollIntoView({ behavior: "smooth" })}
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
              <Icon className="w-7 h-7 shrink-0" stroke="url(#hc-icon-grad)" strokeWidth={1.6} />
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
            Healthcare<br />
            <span className="brand-text">Domain Expertise</span>
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            We build enterprise healthcare technology platforms across the full clinical and operational spectrum — from EMR and appointment management to telemedicine, billing, and HIPAA-compliant data platforms. Our teams understand the workflow complexity, compliance requirements, and integration landscape that defines modern healthcare technology.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Whether you're a hospital digitising operations, a healthcare startup building a clinical SaaS product, or an enterprise creating a multi-clinic management system — we design and deliver platforms that scale with patient volume and regulatory needs.
          </p>
          <div className="flex flex-col gap-3 mt-8">
            {[
              "End-to-end patient journey platforms",
              "EMR (Electronic Medical Records) systems",
              "Multi-clinic management platforms",
              "Secure and HIPAA-compliant systems",
              "Telemedicine and hybrid consultation systems",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-sm text-foreground">
                <CheckCircle2 className="w-4 h-4 shrink-0" stroke="url(#hc-icon-grad)" strokeWidth={2} />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="hidden lg:block lg:col-span-1" />
        <div className="col-span-12 lg:col-span-6">
          <HealthcareDashboard />
        </div>
      </section>
    </>
  );
}

/* ── 3. Solutions Grid ───────────────────────────────────────────── */
function SolutionsSection() {
  return (
    <section id="hc-solutions" className="page-grid py-12 sm:py-24 border-t border-border">
      <div className="col-span-12 mb-8 sm:mb-12">
        <GBadge>Healthcare Solutions</GBadge>
        <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
          Healthcare Software Solutions<br />
          <span className="brand-text">We Deliver</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
          Purpose-built platforms for every layer of digital healthcare — designed for clinical accuracy, regulatory compliance, and operational scale.
        </p>
      </div>

      {SOLUTIONS.map(({ icon: Icon, title, desc, image }) => (
        <div key={title} className="col-span-12 sm:col-span-6 lg:col-span-4 rounded-2xl overflow-hidden relative group" style={{ minHeight: "300px" }}>
          <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.80) 35%, rgba(0,0,0,0.20) 65%, rgba(0,0,0,0.04) 100%)" }} />
          <div className="relative h-full flex flex-col justify-end p-6" style={{ minHeight: "300px" }}>
            <Icon className="w-6 h-6 mb-3" stroke="url(#hc-icon-grad)" strokeWidth={1.6} />
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

      {FEATURES.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="col-span-12 sm:col-span-6 lg:col-span-3 rounded-2xl border border-border bg-card p-6 group hover:border-primary/30 transition-colors relative overflow-hidden">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(300px circle at 0% 0%, color-mix(in oklch, oklch(0.57 0.22 25) 6%, transparent), transparent 70%)" }} />
          <div className="relative">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "color-mix(in oklch, oklch(0.57 0.22 25) 12%, transparent)", border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 25%, transparent)" }}>
              <Icon className="w-4.5 h-4.5" stroke="url(#hc-icon-grad)" strokeWidth={1.6} />
            </div>
            <h3 className="text-sm font-bold text-foreground mb-2">{title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ── 5. Platform Architecture ────────────────────────────────────── */
function ArchitectureSection() {
  return (
    <section className="page-grid py-12 sm:py-24 border-t border-border">
      <div className="col-span-12 mb-8 sm:mb-12">
        <GBadge>Platform Architecture</GBadge>
        <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
          Healthcare Platform<br />
          <span className="brand-text">Architecture</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
          A modular, API-driven architecture connecting EMR, appointments, communication, billing, and analytics — built for clinical reliability and data security.
        </p>
      </div>
      <div className="col-span-12">
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
            Our Healthcare <span className="brand-text">Platforms</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base">
            Production healthcare platforms serving real clinics, hospitals, and healthtech enterprises.
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

/* ── 7. Compliance & Security ────────────────────────────────────── */
function ComplianceSection() {
  return (
    <section className="page-grid py-12 sm:py-24 border-t border-border">
      <div className="col-span-12 mb-8 sm:mb-12">
        <GBadge>Security & Compliance</GBadge>
        <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
          Enterprise-Grade<br />
          <span className="brand-text">Security & Compliance</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
          Healthcare data demands the highest security standards. Every platform we build is architected for compliance, encryption, and audit-ready access control.
        </p>
      </div>

      {COMPLIANCE.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="col-span-12 sm:col-span-6 lg:col-span-4 rounded-2xl border border-border bg-card p-6 sm:p-8 group hover:border-primary/30 transition-colors relative overflow-hidden">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(400px circle at 0% 0%, color-mix(in oklch, oklch(0.57 0.22 25) 6%, transparent), transparent 70%)" }} />
          <div className="relative">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: "color-mix(in oklch, oklch(0.57 0.22 25) 12%, transparent)", border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 25%, transparent)" }}>
              <Icon className="w-5 h-5" stroke="url(#hc-icon-grad)" strokeWidth={1.6} />
            </div>
            <h3 className="text-base font-bold text-foreground mb-3">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
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
        <div key={label} className="col-span-6 sm:col-span-4 md:col-span-2 rounded-2xl border border-border bg-card p-5 group hover:border-primary/30 transition-colors relative overflow-hidden">
          <Icon className="w-5 h-5 mb-3" stroke="url(#hc-icon-grad)" strokeWidth={1.6} />
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
            Outcomes delivered across live healthcare platform deployments.
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
          <span className="brand-text">Healthcare Solutions</span>
        </h2>
      </div>

      {WHY_US.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="col-span-12 sm:col-span-6 lg:col-span-3 rounded-2xl border border-border bg-card p-6 sm:p-8 group hover:border-primary/30 transition-colors relative overflow-hidden">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(400px circle at 0% 0%, color-mix(in oklch, oklch(0.57 0.22 25) 6%, transparent), transparent 70%)" }} />
          <div className="relative">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: "color-mix(in oklch, oklch(0.57 0.22 25) 12%, transparent)", border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 25%, transparent)" }}>
              <Icon className="w-5 h-5" stroke="url(#hc-icon-grad)" strokeWidth={1.6} />
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
          Our Development<br />
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
              Build Scalable<br />
              <span className="brand-text">Healthcare Platforms</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-md">
              Transform healthcare delivery with secure, scalable, and patient-centric digital systems built for enterprise demands.
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
export default function HealthcareSolution() {
  return (
    <div className="bg-background">
      <GradientDefs />
      <HeroSection />
      <DomainExpertiseSection />
      <SolutionsSection />
      <FeaturesSection />
      <ArchitectureSection />
      <CaseStudiesSection />
      <ComplianceSection />
      <TechStackSection />
      <ImpactSection />
      <WhyUsSection />
      <ApproachSection />
      <CTASection />
      <Footer />
    </div>
  );
}
