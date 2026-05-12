import Footer from "@/components/Footer";
import AuroraBg from "@/components/AuroraBg";
import ScrollHero from "@/components/ScrollHero";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight, Landmark, ShieldCheck, Zap, Globe, CreditCard, LineChart,
  Wallet, Building2, Layers, BrainCircuit, Lock, Code2, BarChart3,
  Network, TrendingUp, CheckCircle2,
} from "lucide-react";

/* ─── Brand ─────────────────────────────────────────────────────── */
const BG   = "linear-gradient(135deg, oklch(0.57 0.22 25) 0%, oklch(0.52 0.24 292) 100%)";
const GLOW = "0 0 28px color-mix(in oklch, oklch(0.57 0.22 25) 32%, transparent)";
const GT   = { backgroundImage: BG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };

/* ─── Helper Components ─────────────────────────────────────────── */
function GradientDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute", overflow: "hidden" }} aria-hidden>
      <defs>
        <linearGradient id="fintech-icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
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

/* ─── Data ─────────────────────────────────────────────────────── */
const TRUST_ITEMS = [
  { icon: ShieldCheck,   label: "Regulatory-Ready Architecture",    sub: "RBI, SEBI, PCI-DSS compliant" },
  { icon: BrainCircuit,  label: "AI-Powered Fintech Stack",         sub: "ML models for credit, fraud & risk" },
  { icon: Lock,          label: "Bank-Grade Security",              sub: "End-to-end encryption · Zero-trust" },
  { icon: Zap,           label: "High-Performance Infrastructure",  sub: "99.99% uptime · Sub-50ms latency" },
];

const SOLUTIONS = [
  {
    icon: Landmark,
    title: "Digital Lending Platforms",
    desc: "Peer-to-peer lending, loan origination, AI credit scoring, and end-to-end loan management systems.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80&sat=-30",
    hash: "#fintech-digital-lending",
  },
  {
    icon: LineChart,
    title: "Wealth Management Platforms",
    desc: "Robo-advisory, portfolio management, investment analytics, and client advisory dashboards.",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80&sat=-30",
    hash: "#fintech-wealth-management",
  },
  {
    icon: CreditCard,
    title: "Payment & Wallet Solutions",
    desc: "Payment gateways, digital wallets, P2P payments, and settlement & reconciliation systems.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&sat=-30",
    hash: "#fintech-payments",
  },
  {
    icon: TrendingUp,
    title: "Investment & Trading Platforms",
    desc: "Stock trading apps, algorithmic trading, portfolio analytics, and market data integration.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80&sat=-30",
    hash: "#fintech-investment-trading",
  },
  {
    icon: Building2,
    title: "Neo Banking Platforms",
    desc: "Digital banking experiences with eKYC, account management, card systems, and API-first infrastructure.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80&sat=-30",
    hash: "#fintech-neo-banking",
  },
  {
    icon: Layers,
    title: "Embedded Finance Platforms",
    desc: "Financial services integrated into digital products — payments, lending, wallets, and insurance APIs.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&sat=-30",
    hash: "#fintech-embedded-finance",
  },
];

const WHY_US = [
  {
    icon: BrainCircuit,
    title: "AI-First Fintech Engineering",
    desc: "Our engineering teams specialize in ML-powered credit, fraud, and risk models — built production-ready from day one.",
    points: ["Custom credit scoring models", "Real-time fraud detection", "AI-powered risk analytics"],
  },
  {
    icon: ShieldCheck,
    title: "Compliance-by-Design",
    desc: "Every fintech platform we build has regulatory compliance baked in — not bolted on — covering RBI, SEBI, PCI-DSS, and DPDP Act.",
    points: ["RBI & SEBI framework ready", "PCI-DSS Level 1 infrastructure", "DPDP Act compliance built-in"],
  },
  {
    icon: Network,
    title: "Deep Integration Ecosystem",
    desc: "Pre-built connectors for banks, payment rails, KYC providers, and financial data APIs — reducing integration time by 60%.",
    points: ["50+ pre-built integrations", "UPI, NEFT, RTGS, SWIFT rails", "Account Aggregator & OCEN ready"],
  },
];

/* ─── Page ─────────────────────────────────────────────────────── */
export default function FinTechSolution() {
  return (
    <div className="bg-background">
      <GradientDefs />

      {/* 1. Hero */}
      <ScrollHero
        badge="Fintech Solutions"
        badgeDot={false}
        pills={["Digital Lending", "Wealth Management", "Payments", "Trading", "Neo Banking", "Embedded Finance"]}
        headline={<>Fintech Platforms That<br /><span className="brand-text">Power Financial Products</span></>}
        subheadline="Deploy scalable, compliant fintech infrastructure — digital lending with automated underwriting, wealth management analytics, embedded finance APIs, and neo banking architecture."
        primaryCta="Explore Solutions"
        secondaryCta="Talk to Experts"
        image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1800&q=80&sat=-30"
        imageAlt="Fintech solutions"
        expandedBadge="Trusted by Fintechs & Banks"
        expandedHeadline={<>Intelligent Fintech Platforms<br />Built for Scale</>}
        expandedCta="See All Solutions"
        onSecondary={() => document.getElementById("fintech-solutions")?.scrollIntoView({ behavior: "smooth" })}
      />

      {/* 2. Trust Strip */}
      <section className="border-y border-border bg-card/40">
        <div className="page-grid py-7">
          {TRUST_ITEMS.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="col-span-12 sm:col-span-6 lg:col-span-3 flex items-center gap-4">
              <Icon className="w-7 h-7 shrink-0" stroke="url(#fintech-icon-grad)" strokeWidth={1.6} />
              <div>
                <div className="text-sm font-semibold text-foreground leading-tight">{label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Solutions Grid */}
      <section id="fintech-solutions" className="page-grid py-12 sm:py-24">
        <div className="col-span-12 mb-12">
          <GBadge>Our Solutions</GBadge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
            Six Powerful<br />
            <span className="brand-text">Fintech Platforms</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
            End-to-end fintech platforms purpose-built for modern financial products —
            each engineered for compliance, scale, and intelligent automation.
          </p>
        </div>

        {SOLUTIONS.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="col-span-12 sm:col-span-6 lg:col-span-4 rounded-2xl overflow-hidden relative group"
              style={{ minHeight: "300px" }}
            >
              {/* Background image */}
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Dark gradient overlay */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.80) 40%, rgba(0,0,0,0.20) 100%)" }}
              />
              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6" style={{ minHeight: "300px" }}>
                <Icon className="w-6 h-6 mb-3" stroke="url(#fintech-icon-grad)" strokeWidth={1.6} />
                <h3 className="text-sm font-bold text-white mb-2">{card.title}</h3>
                <p className="text-xs text-white/70 leading-relaxed mb-4">{card.desc}</p>
                <Button
                  size="sm"
                  className="w-fit rounded-full text-white border-none font-semibold"
                  style={{ background: BG }}
                  onClick={() => {
                    window.location.hash = card.hash;
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  View Details
                </Button>
              </div>
            </div>
          );
        })}
      </section>

      <div className="page-grid"><div className="col-span-12"><Separator /></div></div>

      {/* 4. Why Choose Section */}
      <section className="page-grid py-12 sm:py-24 border-t border-border">
        <div className="col-span-12 mb-12">
          <GBadge>Why Choose Us</GBadge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
            Why Fintechs Choose<br />
            <span className="brand-text">Techstalwarts</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
            We build fintech platforms that are intelligent by design, compliant by default, and integrated out of the box.
          </p>
        </div>

        {WHY_US.map(({ icon: Icon, title, desc, points }) => (
          <div
            key={title}
            className="col-span-12 sm:col-span-6 lg:col-span-4 rounded-2xl border border-border bg-card p-8 group overflow-hidden relative"
          >
            {/* Hover radial glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 50% 0%, color-mix(in oklch, oklch(0.57 0.22 25) 10%, transparent) 0%, transparent 70%)" }}
            />
            <div className="relative">
              {/* Icon badge */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "color-mix(in oklch, oklch(0.57 0.22 25) 12%, var(--color-card))" }}
              >
                <Icon className="w-6 h-6" stroke="url(#fintech-icon-grad)" strokeWidth={1.6} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{desc}</p>
              <div className="flex flex-col gap-2">
                {points.map((point) => (
                  <div key={point} className="flex items-center gap-2.5 text-xs text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" stroke="url(#fintech-icon-grad)" strokeWidth={1.75} />
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 5. CTA Section */}
      <section className="page-grid py-12 sm:py-24 border-t border-border">
        <div
          className="col-span-12 rounded-2xl overflow-hidden relative"
          style={{ border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 25%, transparent)", background: "var(--color-card)" }}
        >
          <AuroraBg variant="dark" />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              zIndex: 1,
              backgroundImage: "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-10" style={{ zIndex: 2 }}>
            <div className="max-w-xl">
              <GBadge>Get Started</GBadge>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-foreground mb-4 leading-tight">
                Ready to Build Your<br />
                <span className="brand-text">Fintech Product?</span>
              </h2>
              <p className="text-muted-foreground text-base max-w-md">
                Partner with Techstalwarts to build intelligent, compliant, and scalable fintech platforms — from concept to production.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Button
                size="lg"
                className="rounded-full gap-2 group font-semibold text-white border-none min-w-52"
                style={{ background: BG, boxShadow: GLOW }}
              >
                Book a Consultation
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-border bg-card/60 text-foreground hover:bg-secondary min-w-52"
              >
                View All Solutions
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
