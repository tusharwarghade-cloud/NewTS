import { useState, useRef } from "react";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import AuroraBg from "@/components/AuroraBg";
import ScrollHero from "@/components/ScrollHero";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight, CheckCircle2, MapPin, Navigation, Route, Wallet,
  BarChart3, Smartphone, Server, Database, Cloud, Zap, ShieldCheck,
  Layers, Network, Users, Globe, TrendingUp, Search, Calendar,
  CreditCard, History, Star, RefreshCw, Map, Car, Bike, Bus,
  AlertCircle, Settings, Package,
} from "lucide-react";

/* ── Brand ──────────────────────────────────────────────────────── */
const BG   = "linear-gradient(135deg, oklch(0.57 0.22 25) 0%, oklch(0.52 0.24 292) 100%)";
const GLOW = "0 0 28px color-mix(in oklch, oklch(0.57 0.22 25) 32%, transparent)";
const GT   = { backgroundImage: BG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };

function GradientDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute", overflow: "hidden" }} aria-hidden>
      <defs>
        <linearGradient id="tm-icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
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
  { icon: Route,     label: "Route Planning Systems",       sub: "Intelligent multi-stop optimisation" },
  { icon: RefreshCw, label: "Real-Time Availability",       sub: "Live data across mobility networks" },
  { icon: Wallet,    label: "Unified Payment Platforms",    sub: "UPI, wallets & multi-provider billing" },
  { icon: BarChart3, label: "Travel Analytics Engines",     sub: "Behaviour insights & route analytics" },
];

const PROBLEMS = [
  { icon: AlertCircle, title: "Fragmented Provider Landscape",      desc: "Users juggle multiple apps — separate ones for EVs, taxis, buses, trains — creating a broken experience with no unified view." },
  { icon: RefreshCw,   title: "No Real-Time Availability Data",     desc: "Lack of live inventory and availability feeds forces users to try multiple platforms before finding an open slot or station." },
  { icon: Wallet,      title: "Disjointed Booking & Payment",       desc: "Different wallets, payment flows, and booking UX across providers lead to friction and abandoned transactions." },
  { icon: Route,       title: "Missing Route Intelligence",         desc: "Platforms rarely optimise routes considering multi-modal options, stops, traffic, or alternative mobility providers." },
  { icon: BarChart3,   title: "Opaque Pricing Across Options",      desc: "Comparing fares, tariffs, or charging costs across providers requires manual effort, reducing user confidence." },
  { icon: AlertCircle, title: "Limited Data for Decision-Making",   desc: "Operators lack unified dashboards showing utilisation rates, route performance, and demand patterns across their network." },
];

const SOLUTIONS = [
  {
    icon: Route,
    title: "Trip Planning Platforms",
    desc: "Intelligent multi-stop route planning systems with provider aggregation, time-of-day optimisation, and alternate-route suggestions.",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80&sat=-30",
  },
  {
    icon: MapPin,
    title: "Location & Availability Systems",
    desc: "Real-time availability tracking for EV stations, mobility hubs, parking, and transport nodes via geo-indexed live feeds.",
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?w=800&q=80&sat=-30",
  },
  {
    icon: CreditCard,
    title: "Unified Booking & Payment Systems",
    desc: "Single-flow booking with UPI, wallet, card, and BNPL support — across multiple mobility providers in one checkout experience.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&sat=-30",
  },
  {
    icon: Network,
    title: "Mobility Aggregation Platforms",
    desc: "API-level integration layer connecting multiple transport providers, EV networks, and third-party services into one platform.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&sat=-30",
  },
  {
    icon: BarChart3,
    title: "Travel Analytics & Insights",
    desc: "Behaviour analytics, route performance dashboards, demand heatmaps, and operational BI for platform and fleet operators.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&sat=-30",
  },
  {
    icon: Smartphone,
    title: "User Experience Platforms",
    desc: "Polished mobile apps and web dashboards for end users — search, plan, book, track, and pay in a unified interface.",
    image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=800&q=80&sat=-30",
  },
];

const FEATURES = [
  { icon: MapPin,      title: "Find Nearest Locations",            desc: "Geo-indexed search for stations, stops, hubs, and providers with distance, ETA, and capacity data." },
  { icon: RefreshCw,   title: "Real-Time Availability Tracking",   desc: "Live slot, seat, and charging-point availability pulled from provider APIs at sub-second intervals." },
  { icon: Route,       title: "Intelligent Route Planning",        desc: "Multi-modal route calculation with stop-level recommendations and dynamic re-routing." },
  { icon: BarChart3,   title: "Compare Pricing Across Providers",  desc: "Transparent fare comparison across providers with filters for speed, cost, and availability." },
  { icon: History,     title: "Usage History & Analytics",         desc: "Trip history, spend analytics, and usage pattern summaries for both users and operators." },
  { icon: Star,        title: "Save Preferences & Favourites",     desc: "Store preferred routes, locations, and payment methods for one-tap repeat journeys." },
  { icon: Globe,       title: "Explore Nearby Services",           desc: "Contextual discovery of amenities, services, and mobility options near the user's location." },
  { icon: Users,       title: "Multi-User Access & Sharing",       desc: "Team accounts, family plans, and fleet access management for enterprise and B2C use cases." },
];

const CAPABILITIES = [
  { icon: Network,    title: "Multi-Network Integration",        desc: "Connect EV networks, cab aggregators, public transport, and logistics APIs via a normalised integration layer." },
  { icon: RefreshCw,  title: "Real-Time Data Aggregation",       desc: "Live data pipelines pulling availability, pricing, and status from heterogeneous provider systems." },
  { icon: Map,        title: "Geo-Location & Mapping Systems",   desc: "Google Maps and OpenStreetMap integrations with custom overlays for mobility and availability data." },
  { icon: Wallet,     title: "Payment & Wallet Integrations",    desc: "UPI, Stripe, Razorpay, and wallet SDK integrations for seamless multi-method checkout." },
  { icon: BarChart3,  title: "Data-Driven Recommendations",      desc: "ML-powered route and provider suggestions based on user history, demand, and contextual signals." },
  { icon: Cloud,      title: "Scalable Cloud Architecture",      desc: "Auto-scaling infrastructure on AWS/GCP designed for traffic spikes during peak travel periods." },
];

const WORKFLOW_STEPS = [
  { icon: Search,     num: "01", label: "Search",   desc: "User searches destination or service type" },
  { icon: Globe,      num: "02", label: "Discover",  desc: "View available options, prices & ETA" },
  { icon: Route,      num: "03", label: "Plan",      desc: "Intelligent route with multi-stop support" },
  { icon: Calendar,   num: "04", label: "Reserve",   desc: "Book slot, seat, or charging point" },
  { icon: Navigation, num: "05", label: "Travel",    desc: "Navigate and track trip in real time" },
  { icon: CreditCard, num: "06", label: "Pay",       desc: "Unified payment + receipt & history" },
];

const STAKEHOLDERS = [
  {
    icon: Globe,
    title: "Travel Platforms",
    items: ["Multi-provider booking aggregation", "GDS & API integrations", "Loyalty and reward programmes", "User journey analytics"],
  },
  {
    icon: Car,
    title: "Mobility Startups",
    items: ["MVP travel apps", "Location & availability systems", "Route optimisation engines", "Driver & fleet management"],
  },
  {
    icon: Zap,
    title: "EV Ecosystem Companies",
    items: ["Charging station availability APIs", "Trip planner integration", "Wallet & payment systems", "Usage analytics dashboards"],
  },
  {
    icon: Bus,
    title: "Transport & Logistics",
    items: ["Fleet visibility platforms", "Route performance analytics", "Passenger experience apps", "Intermodal journey planning"],
  },
];

const CASE_ITEMS = [
  {
    id: "evjoints",
    label: "EV Charging Platform",
    icon: Zap,
    tag: "Mobility · EV Ecosystem",
    title: "EVJoints — Charging & Trip Planning Platform",
    challenge: "Build a unified platform for EV users to find charging stations, plan multi-stop trips, compare pricing, and pay through a single app — replacing fragmented provider-specific apps.",
    outcome: "Delivered a full-stack EV platform with real-time station availability, route planning with intelligent stops, wallet integrations, and usage analytics — reducing trip planning time by 70%.",
    metrics: [["Real-time", "Availability"], ["70%", "Planning Time Cut"], ["Multi-wallet", "Payments"]],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&sat=-30",
  },
  {
    id: "route-planner",
    label: "Multi-Modal Planner",
    icon: Route,
    tag: "Travel Tech · Route Planning",
    title: "Intelligent Multi-Modal Journey Platform",
    challenge: "Enable travellers to plan end-to-end journeys across taxi, metro, bus, and EV options from a single interface with live pricing and availability.",
    outcome: "Built a route aggregation platform connecting 4 provider APIs, delivering real-time journey options with fare comparisons and one-step booking.",
    metrics: [["4+", "Providers Connected"], ["Live", "Fare Comparison"], ["One-step", "Booking"]],
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&q=80&sat=-30",
  },
  {
    id: "mobility-analytics",
    label: "Mobility Analytics",
    icon: BarChart3,
    tag: "Travel Tech · Analytics",
    title: "Fleet & Route Analytics Dashboard",
    challenge: "Provide transport operators with real-time visibility into fleet utilisation, route performance, demand heatmaps, and revenue analytics.",
    outcome: "Deployed an analytics platform processing millions of trip events daily, surfacing operational insights that increased route efficiency by 35%.",
    metrics: [["Millions", "Events/Day"], ["35%", "Route Efficiency"], ["Real-time", "Dashboards"]],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&sat=-30",
  },
  {
    id: "booking-payment",
    label: "Booking & Payment",
    icon: CreditCard,
    tag: "Travel Tech · Payments",
    title: "Unified Mobility Booking & Payment System",
    challenge: "Aggregate bookings across multiple transport providers with a unified checkout supporting wallets, UPI, and cards — with automated receipts and history.",
    outcome: "Launched a payment orchestration layer handling multi-provider transactions with 99.5% success rate, full receipt history, and sub-2s checkout flows.",
    metrics: [["99.5%", "Payment Success"], ["<2s", "Checkout Time"], ["Unified", "History"]],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80&sat=-30",
  },
];

const CS_INTERVAL = 4500;
const CS_CHIP_H   = 84;
const csWrap = (min, max, v) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

const TECH_STACK = [
  { label: "Mapping",    items: ["Google Maps API", "Mapbox", "OpenStreetMap"],    icon: Map },
  { label: "Backend",    items: ["Node.js", "Go", "Java", "Python"],               icon: Server },
  { label: "Database",   items: ["PostgreSQL", "Redis", "MongoDB"],                icon: Database },
  { label: "Mobile",     items: ["React Native", "Flutter", "Android"],            icon: Smartphone },
  { label: "Payments",   items: ["Razorpay", "Stripe", "UPI", "Juspay"],          icon: CreditCard },
  { label: "Cloud",      items: ["AWS", "GCP", "Azure"],                           icon: Cloud },
];

const METRICS = [
  { value: "70%",   label: "Reduction in trip planning time for end users" },
  { value: "99.5%", label: "Payment transaction success rate" },
  { value: "4+",    label: "Mobility provider networks integrated per platform" },
  { value: "35%",   label: "Improvement in route efficiency for operators" },
];

const WHY_US = [
  { icon: Layers,     title: "Platform-First Approach",              desc: "We build product platforms, not one-off apps — with APIs, configurability, and multi-tenant capability from day one." },
  { icon: RefreshCw,  title: "Real-Time System Expertise",           desc: "Deep experience in live data feeds, WebSocket systems, and geo-indexed availability — essential for travel tech." },
  { icon: Network,    title: "Multi-Provider Integration",           desc: "Proven track record integrating heterogeneous provider APIs, GDS systems, and third-party mobility networks." },
  { icon: Cloud,      title: "Scalable Cloud Architecture",          desc: "Infrastructure designed to absorb travel demand peaks without performance degradation or downtime." },
];

const TIMELINE = [
  { step: "01", title: "Discovery & Scoping",       desc: "Platform goals, user journeys, provider APIs, and integration landscape assessment." },
  { step: "02", title: "Architecture Design",        desc: "API gateway, geo-services, data aggregation layer, and payment flow design." },
  { step: "03", title: "Core Platform Development",  desc: "Sprint-based delivery of booking, planning, map, and payment modules." },
  { step: "04", title: "Provider Integration",       desc: "API connections to mobility providers, EV networks, and payment gateways." },
  { step: "05", title: "QA & Performance Testing",   desc: "Load tests, real-time data stress tests, and end-to-end user flow validation." },
  { step: "06", title: "Launch & Scale Support",     desc: "Go-live, monitoring, SLA-backed support, and iterative feature growth." },
];

/* ── Mock Dashboard ─────────────────────────────────────────────── */
function TravelDashboard() {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden" style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.3)" }}>
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <span className="text-xs text-muted-foreground ml-2">Mobility Platform Dashboard</span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-emerald-500 font-mono">LIVE</span>
        </div>
      </div>
      <div className="p-5">
        {/* KPI row */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[["1,248", "Active Sessions"], ["94.3%", "Booking Rate"], ["₹2.4L", "Txns Today"]].map(([v, l]) => (
            <div key={l} className="rounded-xl border border-border bg-background/60 px-3 py-2.5">
              <div className="text-base font-bold" style={GT}>{v}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{l}</div>
            </div>
          ))}
        </div>
        {/* Mini map placeholder */}
        <div className="rounded-xl border border-border bg-background/40 h-24 mb-4 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          {/* Route dots */}
          {[
            { x: "15%", y: "55%", color: BG },
            { x: "38%", y: "35%", color: BG },
            { x: "62%", y: "50%", color: BG },
            { x: "82%", y: "30%", color: BG },
          ].map((dot, i) => (
            <div key={i} className="absolute w-3 h-3 rounded-full border-2 border-white/40" style={{ left: dot.x, top: dot.y, background: BG, boxShadow: GLOW }} />
          ))}
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.4 }}>
            <polyline points="15%,55% 38%,35% 62%,50% 82%,30%" stroke="url(#tm-icon-grad)" strokeWidth="2" fill="none" strokeDasharray="4 3" vectorEffect="non-scaling-stroke" />
          </svg>
          <span className="relative text-[10px] text-muted-foreground bg-background/60 px-2 py-1 rounded font-mono">Route Map · Live</span>
        </div>
        {/* Provider availability */}
        {[["EV Stations", "42/50 available", "84%"], ["Cab Providers", "3 active networks", "100%"], ["Transit Links", "Metro + Bus online", "98%"]].map(([name, status, pct]) => (
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
    { label: "User Interface",    sub: "Web / Mobile App",        col: 1 },
    { label: "Platform API",      sub: "Routing + Booking Layer", col: 2 },
    { label: "Provider APIs",     sub: "EV / Cab / Transit",      col: 3 },
    { label: "Data Engine",       sub: "Analytics + Insights",    col: 4 },
    { label: "Payment System",    sub: "UPI / Wallets / Cards",   col: 5 },
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
          { icon: Smartphone, label: "User interface",             desc: "Web and mobile apps for end users and operators" },
          { icon: Route,      label: "Routing & booking engine",   desc: "Core trip planning, availability, and reservation logic" },
          { icon: Network,    label: "Provider API gateway",       desc: "Normalised integrations to EV, cab, and transit networks" },
          { icon: BarChart3,  label: "Analytics engine",           desc: "Real-time event processing for insights and recommendations" },
          { icon: CreditCard, label: "Payment orchestration",      desc: "Multi-method checkout with retry, refund, and ledger support" },
          { icon: Map,        label: "Geo & mapping layer",        desc: "Location services, geo-indexing, and map rendering APIs" },
        ].map(({ icon: Icon, label, desc }) => (
          <div key={label} className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/50 p-3">
            <Icon className="w-4 h-4 mt-0.5 shrink-0" stroke="url(#tm-icon-grad)" strokeWidth={1.6} />
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
  const n = CASE_ITEMS.length;

  return (
    <section className="border-t border-border py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 mb-10">
        <GBadge>Case Studies</GBadge>
        <h2 className="text-4xl font-bold text-foreground">Platforms We've Built</h2>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
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
                    border: isActive ? `1px solid color-mix(in oklch, oklch(0.57 0.22 25) 40%, transparent)` : "1px solid var(--color-border)",
                    background: isActive ? "color-mix(in oklch, oklch(0.57 0.22 25) 8%, var(--color-card))" : "var(--color-card)",
                  }}
                >
                  <Icon className="w-4 h-4 shrink-0" stroke={isActive ? "url(#tm-icon-grad)" : "currentColor"} strokeWidth={1.6} style={{ color: isActive ? undefined : "var(--color-muted-foreground)" }} />
                  <div>
                    <div className="text-xs font-semibold" style={isActive ? GT : { color: "var(--color-foreground)" }}>{c.label}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{c.tag}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail card */}
          <AnimatePresence mode="wait">
            {CASE_ITEMS.map((c, i) => i !== active ? null : (
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
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />
                  <div className="absolute bottom-0 left-0 p-6">
                    <Badge variant="outline" className="mb-2 rounded-full text-[10px] border-white/20 bg-white/10 text-white/80">{c.tag}</Badge>
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
            ))}
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
      badge="Travel & Smart Mobility"
      badgeDot={false}
      pills={["Travel Platforms", "Mobility Startups", "EV Ecosystem Companies", "Transport Operators", "Enterprise Travel Tech"]}
      headline={<>Travel & Smart<br /><span className="brand-text">Mobility Solutions</span></>}
      subheadline="Build intelligent travel platforms with real-time route planning, availability tracking, and integrated mobility ecosystems."
      primaryCta="Build Your Platform"
      secondaryCta="Explore Solutions"
      image="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1800&q=80&sat=-30"
      imageAlt="Travel and mobility technology"
      expandedBadge="Trusted by Travel & Mobility Platforms"
      expandedHeadline={<>Intelligent Platforms for<br />Travel & Smart Mobility</>}
      expandedCta="See All Solutions"
      onSecondary={() => document.getElementById("tm-solutions")?.scrollIntoView({ behavior: "smooth" })}
    />
  );
}

/* ── 2. Problem Section ─────────────────────────────────────────── */
function ProblemSection() {
  return (
    <section id="tm-solutions" className="border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start mb-12">
          <div className="flex-1">
            <GBadge>Industry Challenges</GBadge>
            <h2 className="text-4xl font-bold text-foreground mb-4">Challenges in Modern Travel & Mobility</h2>
            <p className="text-muted-foreground max-w-xl">
              Today's travel ecosystem is fragmented — multiple apps, inconsistent data, and broken payment experiences create friction for users and operators alike.
            </p>
          </div>
          <div className="w-full lg:w-[42%] shrink-0">
            <TravelDashboard />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROBLEMS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "color-mix(in oklch, oklch(0.57 0.22 25) 12%, var(--color-card))", border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 20%, transparent)" }}>
                <Icon className="w-5 h-5" stroke="url(#tm-icon-grad)" strokeWidth={1.6} />
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
        <h2 className="text-4xl font-bold text-foreground">Travel Solutions We Deliver</h2>
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
                <Icon className="w-5 h-5 shrink-0" stroke="url(#tm-icon-grad)" strokeWidth={1.6} />
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
            <Icon className="w-5 h-5" stroke="url(#tm-icon-grad)" strokeWidth={1.6} />
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
        <h2 className="text-4xl font-bold text-foreground">Built for Scale, Speed & Integration</h2>
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
        <GBadge>User Journey</GBadge>
        <h2 className="text-4xl font-bold text-foreground">User Journey Flow</h2>
        <p className="text-muted-foreground mt-3 max-w-xl">From discovery to payment — a seamless end-to-end travel experience built on our platform stack.</p>
      </div>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {WORKFLOW_STEPS.map(({ icon: Icon, num, label, desc }, i) => (
            <div key={num} className="relative flex flex-col items-center text-center gap-3 p-4">
              {/* Connector line */}
              {i < WORKFLOW_STEPS.length - 1 && (
                <div className="absolute top-[26px] left-[calc(50%+24px)] w-full h-px hidden lg:block" style={{ background: "linear-gradient(to right, color-mix(in oklch, oklch(0.57 0.22 25) 50%, transparent), transparent)" }} />
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
        <p className="text-muted-foreground max-w-xl">A layered architecture connecting users, planning engines, provider networks, analytics, and payments into one cohesive system.</p>
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
              <Icon className="w-5 h-5" stroke="url(#tm-icon-grad)" strokeWidth={1.6} />
              <h3 className="text-sm font-bold text-foreground">{title}</h3>
            </div>
            <ul className="flex flex-col gap-2">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" stroke="url(#tm-icon-grad)" strokeWidth={1.6} />
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
              <Icon className="w-4 h-4" stroke="url(#tm-icon-grad)" strokeWidth={1.6} />
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
                Build the Future of<br />Travel Platforms
              </h2>
              <p className="text-muted-foreground text-base max-w-lg">
                Enable seamless, intelligent, and connected travel experiences. Talk to our platform engineers and start your project today.
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
export default function TravelMobilitySolution() {
  return (
    <div className="bg-background">
      <GradientDefs />
      <HeroSection />

      {/* Trust strip */}
      <section className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-6 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_ITEMS.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-4">
              <Icon className="w-7 h-7 shrink-0" stroke="url(#tm-icon-grad)" strokeWidth={1.75} />
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
