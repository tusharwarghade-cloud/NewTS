import { useState, useRef } from "react";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import AuroraBg from "@/components/AuroraBg";
import ScrollHero from "@/components/ScrollHero";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight, CheckCircle2, QrCode, Users, Bell, Database,
  BarChart3, Smartphone, Server, Cloud, Zap, ShieldCheck,
  Layers, Network, Globe, TrendingUp, Wifi, WifiOff,
  UserCheck, MessageSquare, Calendar, BookOpen, Settings,
  AlertCircle, FileText, RefreshCw, Lock, Headphones,
  ScanLine, Contact, ClipboardList,
} from "lucide-react";

/* ── Brand ──────────────────────────────────────────────────────── */
const BG   = "linear-gradient(135deg, oklch(0.57 0.22 25) 0%, oklch(0.52 0.24 292) 100%)";
const GLOW = "0 0 28px color-mix(in oklch, oklch(0.57 0.22 25) 32%, transparent)";
const GT   = { backgroundImage: BG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };

function GradientDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute", overflow: "hidden" }} aria-hidden>
      <defs>
        <linearGradient id="ev-icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
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
  { icon: QrCode,       label: "QR & Card Scanning",           sub: "Instant attendee data capture" },
  { icon: WifiOff,      label: "Offline-Capable Apps",         sub: "Works without internet connectivity" },
  { icon: UserCheck,    label: "Lead Capture Systems",         sub: "Structured interaction management" },
  { icon: Bell,         label: "Automated Follow-Ups",         sub: "Post-event engagement automation" },
];

const PROBLEMS = [
  { icon: Contact,      title: "Manual Business Card Exchange",     desc: "Attendees collect hundreds of paper cards that get lost, forgotten, or never followed up — resulting in wasted networking opportunities." },
  { icon: AlertCircle,  title: "Networking Data Lost After Events", desc: "Valuable contacts and interaction details are scattered across notes, photos, and emails — with no centralised record or searchable history." },
  { icon: ClipboardList,title: "No Structured Follow-Up System",   desc: "Without reminders or automated workflows, post-event follow-ups depend entirely on individual memory and manual effort." },
  { icon: BarChart3,    title: "Fragmented Interaction Tracking",   desc: "Organisers have no unified view of who met whom, what was discussed, or which leads are warm — making ROI measurement impossible." },
  { icon: Globe,        title: "Limited Engagement Visibility",     desc: "Exhibitors and sponsors lack real-time data on booth visits, session attendance, and attendee interest signals during the event." },
  { icon: WifiOff,      title: "Connectivity Issues On-Site",       desc: "Crowded venues overwhelm Wi-Fi infrastructure, causing apps to fail precisely when attendees need to capture contacts most." },
];

const SOLUTIONS = [
  {
    icon: Users,
    title: "Event Networking Platforms",
    desc: "End-to-end attendee interaction management — profile discovery, meeting scheduling, and connection tracking across the entire event lifecycle.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80&sat=-30",
  },
  {
    icon: QrCode,
    title: "Lead Capture & Scanning Systems",
    desc: "QR code generation, business card scanning with OCR data extraction, and structured contact capture for exhibitors and booth operators.",
    image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=800&q=80&sat=-30",
  },
  {
    icon: Database,
    title: "Event CRM & Data Management",
    desc: "Centralised interaction database with tagging, notes, lead scoring, and export capabilities — structured for sales and business development workflows.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&sat=-30",
  },
  {
    icon: Bell,
    title: "Follow-Up & Reminder Systems",
    desc: "Automated post-event reminder sequences, follow-up scheduling, and engagement tracking — keeping leads warm after the venue lights go off.",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80&sat=-30",
  },
  {
    icon: WifiOff,
    title: "Offline-Enabled Event Apps",
    desc: "Mobile apps with local storage and background sync — capturing every interaction even when venue Wi-Fi is unreliable or unavailable.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&sat=-30",
  },
  {
    icon: Headphones,
    title: "Event Communication & Support",
    desc: "In-app help centers, live support chat, attendee announcements, and communication tools for organisers to run responsive event operations.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&sat=-30",
  },
];

const FEATURES = [
  { icon: QrCode,       title: "QR Code Attendee Scanning",         desc: "Generate unique QR profiles per attendee for instant tap-to-connect at booths, sessions, and networking areas." },
  { icon: ScanLine,     title: "Business Card Data Extraction",     desc: "OCR-powered card scanning converts physical cards to structured digital contacts in seconds." },
  { icon: BarChart3,    title: "Interaction Tracking Dashboard",    desc: "Real-time visibility into contact frequency, lead quality, and follow-up status for organisers and exhibitors." },
  { icon: Contact,      title: "Contact Storage & Organisation",    desc: "Tag, segment, and search all captured contacts with notes, custom fields, and interaction history." },
  { icon: Calendar,     title: "Reminder & Follow-Up Scheduling",   desc: "Set automated reminders and follow-up tasks tied to individual contacts — configurable per event type." },
  { icon: WifiOff,      title: "Offline Mode Functionality",        desc: "Full app functionality without internet — all data queued locally and synced when connectivity returns." },
  { icon: Lock,         title: "Secure Data Storage & Privacy",     desc: "GDPR-ready data handling with role-based access controls, encrypted storage, and consent management." },
  { icon: Headphones,   title: "User Support & Help Center",        desc: "In-app support with FAQs, live chat, and ticketing — ensuring attendees can get help without leaving the floor." },
];

const CAPABILITIES = [
  { icon: Zap,          title: "Real-Time Interaction Capture",     desc: "Instant contact capture with server sync — attendee data available to organisers in real time during the event." },
  { icon: Database,     title: "Centralised Event Data Storage",    desc: "All interactions, contacts, and engagement signals stored in a single queryable cloud database per event." },
  { icon: Calendar,     title: "Multi-Event Support",               desc: "Manage multiple concurrent and sequential events from one platform — with isolated data per event." },
  { icon: Settings,     title: "Role-Based Access Control",         desc: "Granular permissions for attendees, exhibitors, organisers, and administrators — each seeing only relevant data." },
  { icon: Smartphone,   title: "Mobile-First Platform Design",      desc: "Designed for on-the-floor use — thumb-friendly UI, fast scanning, and minimal taps to capture a lead." },
  { icon: Lock,         title: "Secure Data Handling",              desc: "End-to-end encryption, GDPR compliance controls, and secure cloud infrastructure for attendee data." },
];

const WORKFLOW_STEPS = [
  { icon: QrCode,       num: "01", label: "Scan",     desc: "QR scan or business card photo at point of contact" },
  { icon: FileText,     num: "02", label: "Capture",  desc: "Auto-extract and confirm contact details" },
  { icon: Database,     num: "03", label: "Store",    desc: "Save to event CRM with notes and tags" },
  { icon: Bell,         num: "04", label: "Remind",   desc: "Schedule follow-up reminder post-event" },
  { icon: MessageSquare,num: "05", label: "Follow Up",desc: "Automated outreach and engagement tracking" },
];

const STAKEHOLDERS = [
  {
    icon: Users,
    title: "Event Organisers",
    items: ["Attendee interaction dashboards", "Lead source analytics", "Exhibitor performance reports", "Post-event data exports"],
  },
  {
    icon: BookOpen,
    title: "Exhibition Companies",
    items: ["Booth-level lead capture", "Visitor footfall tracking", "Multi-exhibitor management", "ROI measurement tools"],
  },
  {
    icon: Network,
    title: "Conference Organisers",
    items: ["Speaker & attendee networking", "Session engagement tracking", "Sponsor visibility metrics", "Certificate & badge management"],
  },
  {
    icon: TrendingUp,
    title: "B2B Enterprises",
    items: ["Sales team lead management", "CRM integration connectors", "Event ROI dashboards", "Automated follow-up sequences"],
  },
];

const CASE_ITEMS = [
  {
    id: "helpie",
    label: "Helpie",
    icon: Users,
    tag: "Event Tech · Networking Platform",
    title: "Helpie — Event Networking & Interaction Platform",
    challenge: "Design and build a mobile event networking app enabling attendees to replace manual business card exchange with QR scanning, capture interactions with notes, and receive automated post-event follow-up reminders — with full offline support for unreliable venue connectivity.",
    outcome: "Delivered a cross-platform mobile app with QR & business card scanning, an offline-first architecture with background sync, interaction tracking dashboard, and automated reminder system — reducing manual follow-up effort by 80%.",
    metrics: [["80%", "Follow-Up Effort Reduction"], ["Offline", "First Architecture"], ["QR + OCR", "Dual Scanning"]],
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80&sat=-30",
  },
  {
    id: "lead-capture",
    label: "Exhibition Lead Capture",
    icon: QrCode,
    tag: "Exhibition · Lead Management",
    title: "Multi-Booth Lead Capture & CRM Platform",
    challenge: "Enable exhibition organisers to deploy a standardised lead capture system across all exhibitor booths — replacing printed forms and business card collection with structured digital data.",
    outcome: "Built a booth-level scanning platform with centralised lead aggregation, exhibitor-level access, and CSV export — increasing post-show lead conversion rate by 45%.",
    metrics: [["45%", "Higher Lead Conversion"], ["Multi-Booth", "Management"], ["Real-Time", "Lead Sync"]],
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=900&q=80&sat=-30",
  },
  {
    id: "conference-networking",
    label: "Conference Networking",
    icon: Network,
    tag: "Conference · B2B Networking",
    title: "B2B Conference Networking & Matchmaking Platform",
    challenge: "Build a web and mobile platform enabling conference attendees to discover relevant peers, request meetings, and manage their networking schedule — with post-event follow-up tracking.",
    outcome: "Launched a full matchmaking system with interest-based attendee discovery, meeting request flows, calendar integration, and post-event engagement tracking for a 2,000-person conference.",
    metrics: [["2,000+", "Attendees"], ["Meeting", "Matchmaking"], ["Post-Event", "Tracking"]],
    image: "https://images.unsplash.com/photo-1560439513-74b037a25d84?w=900&q=80&sat=-30",
  },
];

const TECH_STACK = [
  { label: "Mobile",    items: ["React Native", "Flutter", "Android"],       icon: Smartphone },
  { label: "Backend",   items: ["Node.js", "Go", "Python"],                  icon: Server },
  { label: "Database",  items: ["PostgreSQL", "SQLite", "Redis"],            icon: Database },
  { label: "Scanning",  items: ["ML Kit", "Tesseract OCR", "ZXing"],        icon: QrCode },
  { label: "Sync",      items: ["Background Sync", "WorkManager", "PWA"],   icon: RefreshCw },
  { label: "Cloud",     items: ["AWS", "Firebase", "GCP"],                   icon: Cloud },
];

const METRICS = [
  { value: "80%",  label: "Reduction in manual follow-up effort post-event" },
  { value: "45%",  label: "Increase in lead conversion rates for exhibitors" },
  { value: "100%", label: "Contact capture success rate with offline mode" },
  { value: "3×",   label: "More networking interactions per attendee" },
];

const WHY_US = [
  { icon: Smartphone,  title: "Event Platform Expertise",         desc: "Deep experience building mobile-first event apps — from attendee onboarding to post-event analytics." },
  { icon: WifiOff,     title: "Offline-Capable Architecture",     desc: "Our apps work in signal-dead event halls — all data captured locally and synced when connectivity returns." },
  { icon: QrCode,      title: "Proven Scanning Systems",          desc: "Battle-tested QR and OCR scanning pipelines designed for high-volume, fast-paced event floor conditions." },
  { icon: TrendingUp,  title: "Scalable Event Ecosystems",        desc: "From 50-person networking dinners to 10,000-attendee exhibitions — our platforms scale without re-architecture." },
];

const TIMELINE = [
  { step: "01", title: "Requirement Analysis",    desc: "Event workflow discovery, attendee persona mapping, and integration needs assessment." },
  { step: "02", title: "Event Flow Mapping",      desc: "Design interaction journeys from registration to post-event follow-up." },
  { step: "03", title: "UX Design",               desc: "Mobile-first wireframes and UI prototypes optimised for on-floor usability." },
  { step: "04", title: "Development",             desc: "Sprint-based delivery of scanning, CRM, notifications, and offline modules." },
  { step: "05", title: "Testing",                 desc: "Device testing, offline simulation, load testing, and UAT with event teams." },
  { step: "06", title: "Deployment & Support",    desc: "App store release, event-day support, and post-event data delivery." },
];

/* ── Mock Dashboard ─────────────────────────────────────────────── */
function EventDashboard() {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden" style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.3)" }}>
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <span className="text-xs text-muted-foreground ml-2">Event Networking Dashboard</span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-emerald-500 font-mono">LIVE</span>
        </div>
      </div>
      <div className="p-5">
        {/* KPI row */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[["1,842", "Connections Made"], ["94%", "Scan Success"], ["312", "Follow-Ups Sent"]].map(([v, l]) => (
            <div key={l} className="rounded-xl border border-border bg-background/60 px-3 py-2.5">
              <div className="text-base font-bold" style={GT}>{v}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{l}</div>
            </div>
          ))}
        </div>
        {/* Recent scans */}
        <div className="mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Recent Interactions</p>
          {[
            { name: "Rahul M.",   company: "FinCore Ltd",      time: "2m ago",  status: "Followed up" },
            { name: "Priya K.",   company: "MobiTech Inc",     time: "8m ago",  status: "Reminder set" },
            { name: "Arjun S.",   company: "LogiSmart Corp",   time: "15m ago", status: "Captured" },
          ].map(({ name, company, time, status }) => (
            <div key={name} className="flex items-center gap-3 py-2 border-b border-border/40 last:border-0">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0" style={{ background: BG }}>
                {name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-semibold text-foreground truncate">{name}</div>
                <div className="text-[10px] text-muted-foreground">{company}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[10px] font-medium" style={GT}>{status}</div>
                <div className="text-[10px] text-muted-foreground">{time}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Scan activity bar chart */}
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Scan Activity (Today)</p>
        <div className="flex items-end gap-1 h-14">
          {[30, 55, 45, 75, 90, 60, 80, 95, 70, 85, 65, 78].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i % 3 === 0 ? BG : "color-mix(in oklch, oklch(0.57 0.22 25) 25%, var(--color-border))", opacity: 0.85 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Architecture Diagram ───────────────────────────────────────── */
function ArchitectureDiagram() {
  const nodes = [
    { label: "User App",        sub: "Mobile / Web",         col: 1 },
    { label: "Local Storage",   sub: "SQLite / Cache",       col: 2 },
    { label: "Sync Engine",     sub: "Background Sync",      col: 3 },
    { label: "Cloud Database",  sub: "PostgreSQL / Firebase", col: 4 },
    { label: "Notifications",   sub: "Push / Email / SMS",   col: 5 },
  ];
  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">Platform Architecture</p>
      <div className="flex items-center justify-between gap-2 mb-8 overflow-x-auto pb-2">
        {nodes.map((node, i) => (
          <div key={node.label} className="flex items-center gap-2 shrink-0">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-xl border border-border bg-background px-3 py-3 mb-2 min-w-[90px]" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.12)" }}>
                <div className="text-xs font-bold text-foreground">{node.label}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{node.sub}</div>
              </div>
            </div>
            {i < nodes.length - 1 && (
              <div className="flex items-center gap-1 shrink-0">
                <div className="h-px w-6 sm:w-8" style={{ background: BG }} />
                <ArrowRight className="w-3 h-3 shrink-0" style={{ color: "oklch(0.57 0.22 25)" }} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { icon: Smartphone, label: "Mobile app layer",             desc: "Cross-platform mobile app with scanning, CRM, and reminder features" },
          { icon: WifiOff,    label: "Offline local storage",        desc: "SQLite-based local persistence ensuring zero data loss without connectivity" },
          { icon: RefreshCw,  label: "Background sync engine",       desc: "Automatic data reconciliation when connectivity is restored" },
          { icon: Database,   label: "Cloud database",               desc: "Centralised event CRM with real-time access for organisers" },
          { icon: Bell,       label: "Notification system",          desc: "Push, email, and SMS reminders for post-event follow-ups" },
          { icon: Lock,       label: "Security layer",               desc: "End-to-end encryption and GDPR-compliant data handling across all layers" },
        ].map(({ icon: Icon, label, desc }) => (
          <div key={label} className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/50 p-3">
            <Icon className="w-4 h-4 mt-0.5 shrink-0" stroke="url(#ev-icon-grad)" strokeWidth={1.6} />
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

/* ── Case Study Carousel ─────────────────────────────────────────── */
function CaseStudiesSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="border-t border-border py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 mb-10">
        <GBadge>Our Event Platforms</GBadge>
        <h2 className="text-4xl font-bold text-foreground">Platforms We've Built</h2>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 items-start">
          {/* Chip list */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
            {CASE_ITEMS.map((c, i) => {
              const Icon = c.icon;
              const isActive = i === active;
              return (
                <button
                  key={c.id}
                  onClick={() => setActive(i)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-left shrink-0 border transition-all duration-200"
                  style={{
                    minHeight: 56,
                    border: isActive
                      ? `1px solid color-mix(in oklch, oklch(0.57 0.22 25) 40%, transparent)`
                      : "1px solid var(--color-border)",
                    background: isActive
                      ? "color-mix(in oklch, oklch(0.57 0.22 25) 8%, var(--color-card))"
                      : "var(--color-card)",
                  }}
                >
                  <Icon
                    className="w-4 h-4 shrink-0"
                    stroke={isActive ? "url(#ev-icon-grad)" : "currentColor"}
                    strokeWidth={1.6}
                    style={{ color: isActive ? undefined : "var(--color-muted-foreground)" }}
                  />
                  <div>
                    <div className="text-xs font-semibold" style={isActive ? GT : { color: "var(--color-foreground)" }}>
                      {c.label}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{c.tag}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail card */}
          <AnimatePresence mode="wait">
            {CASE_ITEMS.map((c, i) =>
              i !== active ? null : (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28 }}
                  className="rounded-2xl border border-border overflow-hidden bg-card"
                >
                  <div className="relative h-52 sm:h-64">
                    <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }}
                    />
                    <div className="absolute bottom-0 left-0 p-6">
                      <Badge variant="outline" className="mb-2 rounded-full text-[10px] border-white/20 bg-white/10 text-white/80">
                        {c.tag}
                      </Badge>
                      <h3 className="text-lg font-bold text-white">{c.title}</h3>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Challenge</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{c.challenge}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Outcome</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{c.outcome}</p>
                    </div>
                    <div className="sm:col-span-2 flex flex-wrap gap-3">
                      {c.metrics.map(([v, l]) => (
                        <div key={l} className="rounded-xl border border-border bg-background px-5 py-3 text-center">
                          <div className="text-lg font-bold" style={GT}>{v}</div>
                          <div className="text-[10px] text-muted-foreground mt-0.5">{l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ── 1. Hero ─────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <ScrollHero
      badge="Event & Exhibition Technology"
      badgeDot={false}
      pills={["Event Organisers", "Exhibition Companies", "Conference Organisers", "B2B Networking Platforms", "Enterprise Events"]}
      headline={<>Event & Exhibition<br /><span className="brand-text">Technology Solutions</span></>}
      subheadline="Build intelligent platforms to manage event networking, capture interactions, and streamline attendee engagement."
      primaryCta="Build Your Event Platform"
      secondaryCta="Explore Solutions"
      image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1800&q=80&sat=-30"
      imageAlt="Event and exhibition technology"
      expandedBadge="Trusted by Event Organisers & Exhibitions"
      expandedHeadline={<>Intelligent Platforms for<br />Events & Exhibitions</>}
      expandedCta="See All Solutions"
      onSecondary={() => document.getElementById("ev-solutions")?.scrollIntoView({ behavior: "smooth" })}
    />
  );
}

/* ── 2. Problem Section ─────────────────────────────────────────── */
function ProblemSection() {
  return (
    <section id="ev-solutions" className="border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start mb-12">
          <div className="flex-1">
            <GBadge>Industry Challenges</GBadge>
            <h2 className="text-4xl font-bold text-foreground mb-4">Challenges in Event Networking & Engagement</h2>
            <p className="text-muted-foreground max-w-xl">
              Events create high-value networking moments — but most of that value is lost to manual processes, unreliable connectivity, and the absence of structured follow-up systems.
            </p>
          </div>
          <div className="w-full lg:w-[42%] shrink-0">
            <EventDashboard />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROBLEMS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: "color-mix(in oklch, oklch(0.57 0.22 25) 12%, var(--color-card))",
                  border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 20%, transparent)",
                }}
              >
                <Icon className="w-5 h-5" stroke="url(#ev-icon-grad)" strokeWidth={1.6} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground mb-1.5">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 3. Solutions Grid ──────────────────────────────────────────── */
function SolutionsSection() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-6 mb-12">
        <GBadge>What We Build</GBadge>
        <h2 className="text-4xl font-bold text-foreground">Event Technology Solutions</h2>
      </div>
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SOLUTIONS.map(({ icon: Icon, title, desc, image }) => (
          <div key={title} className="rounded-2xl border border-border bg-card overflow-hidden group">
            <div className="relative h-40 overflow-hidden">
              <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }} />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Icon className="w-5 h-5 shrink-0" stroke="url(#ev-icon-grad)" strokeWidth={1.6} />
                <h3 className="text-sm font-bold text-foreground">{title}</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 4. Key Features ────────────────────────────────────────────── */
function FeaturesSection() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-6 mb-12">
        <GBadge>Core Capabilities</GBadge>
        <h2 className="text-4xl font-bold text-foreground">Key Features We Build</h2>
      </div>
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-3">
            <Icon className="w-5 h-5" stroke="url(#ev-icon-grad)" strokeWidth={1.6} />
            <h3 className="text-sm font-bold text-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 5. Platform Capabilities ───────────────────────────────────── */
function CapabilitiesSection() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-6 mb-12">
        <GBadge>Platform Capabilities</GBadge>
        <h2 className="text-4xl font-bold text-foreground">Built for the Event Floor</h2>
      </div>
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CAPABILITIES.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: BG }}>
              <Icon className="w-5 h-5 text-white" strokeWidth={1.6} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground mb-1.5">{title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 6. Workflow Section ─────────────────────────────────────────── */
function WorkflowSection() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-6 mb-12">
        <GBadge>Interaction Flow</GBadge>
        <h2 className="text-4xl font-bold text-foreground">Event Interaction Flow</h2>
        <p className="text-muted-foreground mt-3 max-w-xl">
          From first scan to post-event follow-up — every touchpoint captured, stored, and actioned automatically.
        </p>
      </div>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {WORKFLOW_STEPS.map(({ icon: Icon, num, label, desc }, i) => (
            <div key={num} className="relative flex flex-col items-center text-center gap-3 p-4">
              {i < WORKFLOW_STEPS.length - 1 && (
                <div
                  className="absolute top-[26px] left-[calc(50%+24px)] w-full h-px hidden lg:block"
                  style={{ background: "linear-gradient(to right, color-mix(in oklch, oklch(0.57 0.22 25) 50%, transparent), transparent)" }}
                />
              )}
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center relative z-10" style={{ background: BG, boxShadow: GLOW }}>
                <Icon className="w-5 h-5 text-white" strokeWidth={1.6} />
              </div>
              <div className="text-[10px] font-black text-muted-foreground/50 tracking-widest">{num}</div>
              <div className="text-sm font-bold text-foreground">{label}</div>
              <div className="text-[11px] text-muted-foreground leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 7. Architecture Section ─────────────────────────────────────── */
function ArchitectureSection() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-6 mb-12">
        <GBadge>Platform Architecture</GBadge>
        <h2 className="text-4xl font-bold text-foreground mb-4">How the Platform Is Built</h2>
        <p className="text-muted-foreground max-w-xl">
          An offline-first architecture ensuring zero data loss — from on-floor scanning to cloud storage and automated notifications.
        </p>
      </div>
      <div className="mx-auto max-w-7xl px-6">
        <ArchitectureDiagram />
      </div>
    </section>
  );
}

/* ── 8. Stakeholders Section ─────────────────────────────────────── */
function StakeholdersSection() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-6 mb-12">
        <GBadge>Who We Serve</GBadge>
        <h2 className="text-4xl font-bold text-foreground">Stakeholders We Serve</h2>
      </div>
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STAKEHOLDERS.map(({ icon: Icon, title, items }) => (
          <div key={title} className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5" stroke="url(#ev-icon-grad)" strokeWidth={1.6} />
              <h3 className="text-sm font-bold text-foreground">{title}</h3>
            </div>
            <ul className="flex flex-col gap-2">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" stroke="url(#ev-icon-grad)" strokeWidth={1.6} />
                  <span className="text-xs text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 9. Business Impact ─────────────────────────────────────────── */
function ImpactSection() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-6 mb-12">
        <GBadge>Business Impact</GBadge>
        <h2 className="text-4xl font-bold text-foreground">Measurable Results</h2>
      </div>
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 lg:grid-cols-4 gap-5">
        {METRICS.map(({ value, label }) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-6 text-center flex flex-col gap-2">
            <div className="text-4xl font-black" style={GT}>{value}</div>
            <p className="text-xs text-muted-foreground leading-relaxed">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 10. Why Choose Us ──────────────────────────────────────────── */
function WhyUsSection() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-6 mb-12">
        <GBadge>Why TechStalwarts</GBadge>
        <h2 className="text-4xl font-bold text-foreground">Why Choose Us</h2>
      </div>
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {WHY_US.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: BG }}>
              <Icon className="w-5 h-5 text-white" strokeWidth={1.6} />
            </div>
            <h3 className="text-sm font-bold text-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 11. Tech Stack ─────────────────────────────────────────────── */
function TechStackSection() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-6 mb-12">
        <GBadge>Technology</GBadge>
        <h2 className="text-4xl font-bold text-foreground">Tech Stack</h2>
      </div>
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {TECH_STACK.map(({ label, items, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4" stroke="url(#ev-icon-grad)" strokeWidth={1.6} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
            </div>
            <div className="flex flex-col gap-1">
              {items.map((item) => (
                <span key={item} className="text-xs font-medium text-foreground">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 12. Approach Timeline ──────────────────────────────────────── */
function ApproachSection() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-6 mb-12">
        <GBadge>Our Approach</GBadge>
        <h2 className="text-4xl font-bold text-foreground">How We Deliver</h2>
      </div>
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
        {TIMELINE.map(({ step, title, desc }) => (
          <div key={step} className="flex flex-col gap-3 pl-4 border-l border-border">
            <div className="text-4xl font-black leading-none" style={GT}>{step}</div>
            <h3 className="text-sm font-bold text-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 13. CTA Section ────────────────────────────────────────────── */
function CtaSection() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div
          className="rounded-2xl overflow-hidden relative"
          style={{
            background: "var(--color-card)",
            border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 25%, transparent)",
            boxShadow: "0 4px 48px color-mix(in oklch, oklch(0.57 0.22 25) 12%, transparent)",
          }}
        >
          <AuroraBg variant="dark" />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ zIndex: 1, backgroundImage: "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
          />
          <div className="relative px-10 py-20 flex flex-col lg:flex-row items-center justify-between gap-8" style={{ zIndex: 2 }}>
            <div className="max-w-2xl text-center lg:text-left">
              <GBadge>Get Started</GBadge>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                Build Smarter<br />Event Experiences
              </h2>
              <p className="text-muted-foreground text-base max-w-lg">
                Transform event networking with intelligent, data-driven platforms. Talk to our platform engineers and start your project today.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <a href="/contact">
                <Button size="lg" className="rounded-full gap-2 group font-semibold text-white border-none min-w-52 w-full" style={{ background: BG, boxShadow: GLOW }}>
                  Talk to Experts
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
              <a href="/contact">
                <Button size="lg" variant="outline" className="rounded-full border-border bg-card/60 text-foreground hover:bg-secondary min-w-52 w-full">
                  Start Your Project
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Main Export ────────────────────────────────────────────────── */
export default function EventExhibitionSolution() {
  return (
    <div className="bg-background">
      <GradientDefs />
      <HeroSection />

      {/* Trust strip */}
      <section className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-6 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_ITEMS.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-4">
              <Icon className="w-7 h-7 shrink-0" stroke="url(#ev-icon-grad)" strokeWidth={1.75} />
              <div>
                <div className="text-sm font-bold text-foreground">{label}</div>
                <div className="text-xs text-muted-foreground">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ProblemSection />
      <SolutionsSection />
      <FeaturesSection />
      <CapabilitiesSection />
      <WorkflowSection />
      <ArchitectureSection />
      <CaseStudiesSection />
      <TechStackSection />
      <ImpactSection />
      <WhyUsSection />
      <ApproachSection />
      <StakeholdersSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
