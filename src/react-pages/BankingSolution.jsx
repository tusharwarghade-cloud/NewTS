import Footer from "@/components/Footer";
import AuroraBg from "@/components/AuroraBg";
import ScrollHero from "@/components/ScrollHero";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight, ShieldCheck, Code2, Landmark, GitBranch,
  BrainCircuit, BarChart3, Layers, Network, CheckCircle2,
  RefreshCw, Clock, FileCheck, Headphones, Users, Lock,
} from "lucide-react";

/* ─── Brand ─────────────────────────────────────────────────────── */
const BG   = "linear-gradient(135deg, oklch(0.57 0.22 25) 0%, oklch(0.52 0.24 292) 100%)";
const GLOW = "0 0 28px color-mix(in oklch, oklch(0.57 0.22 25) 32%, transparent)";
const GT   = { backgroundImage: BG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };

function GradientDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute", overflow: "hidden" }} aria-hidden>
      <defs>
        <linearGradient id="banking-icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
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

/* ─── Mock Dashboard Placeholder ──────────────────────────────── */
function DashboardPlaceholder({ rows = 3, bars = true, label = "Analytics Dashboard" }) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden" style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.3)" }}>
      {/* Titlebar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <span className="text-xs text-muted-foreground ml-2">{label}</span>
      </div>
      <div className="p-5">
        {/* Stat row */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {["₹24.8Cr", "1,482", "99.97%"].map((v, i) => (
            <div key={i} className="rounded-xl border border-border bg-background/60 px-3 py-2.5">
              <div className="text-base font-bold" style={GT}>{v}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{["Volume", "Transactions", "Uptime"][i]}</div>
            </div>
          ))}
        </div>
        {/* Bar chart mock */}
        {bars && (
          <div className="flex items-end gap-1.5 h-20 mb-4">
            {[40, 65, 50, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i % 3 === 0 ? BG : "color-mix(in oklch, oklch(0.57 0.22 25) 25%, var(--color-border))", opacity: 0.85 }} />
            ))}
          </div>
        )}
        {/* Row items */}
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 py-2 border-b border-border/40 last:border-0">
            <div className="w-6 h-6 rounded-full bg-border/60 shrink-0" />
            <div className="flex-1 h-2 rounded-full bg-border/50" style={{ width: `${60 + i * 12}%` }} />
            <div className="w-12 h-2 rounded-full" style={{ background: BG, opacity: 0.7 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── API Flow Diagram ─────────────────────────────────────────── */
function ApiFlowDiagram() {
  const nodes = [
    { label: "Bank Core", sub: "Legacy / Modern" },
    { label: "API Gateway", sub: "OAuth 2.0 · TLS" },
    { label: "Financial Apps", sub: "AIS · PIS · TPPs" },
  ];
  return (
    <div className="rounded-2xl border border-border bg-card p-6" style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.3)" }}>
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-5 font-medium">Open Banking Architecture</p>
      <div className="flex items-center gap-2">
        {nodes.map((n, i) => (
          <div key={i} className="flex items-center gap-2 flex-1">
            <div className="flex-1 rounded-xl border border-border bg-secondary/30 p-3 text-center">
              <div className="text-xs font-bold text-foreground">{n.label}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{n.sub}</div>
            </div>
            {i < nodes.length - 1 && (
              <div className="flex flex-col items-center gap-0.5 shrink-0">
                <div className="w-8 h-0.5 rounded-full" style={{ background: BG }} />
                <div className="text-[9px] text-muted-foreground">API</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {["256-bit Encryption", "OAuth 2.0 Auth", "Rate Limiting", "Audit Logs"].map((t) => (
          <div key={t} className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <ShieldCheck className="w-3 h-3 shrink-0" stroke="url(#banking-icon-grad)" strokeWidth={1.75} />
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Compliance Engine Diagram ────────────────────────────────── */
function ComplianceDiagram() {
  const stages = ["Ingest Regulations", "AI Gap Analysis", "Risk Scoring", "Audit Report"];
  return (
    <div className="rounded-2xl border border-border bg-card p-6" style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.3)" }}>
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-5 font-medium">AI Compliance Engine</p>
      <div className="flex flex-col gap-2">
        {stages.map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0" style={{ background: BG }}>
              {i + 1}
            </div>
            <div className="flex-1 rounded-lg border border-border bg-secondary/20 px-3 py-2 text-xs font-medium text-foreground">
              {s}
            </div>
            {i < stages.length - 1 && (
              <div className="absolute ml-3 mt-8 w-0.5 h-2 bg-border" />
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 flex items-center gap-3">
        <BrainCircuit className="w-5 h-5 shrink-0" stroke="url(#banking-icon-grad)" strokeWidth={1.5} />
        <div>
          <div className="text-xs font-semibold text-foreground">Real-time gap detection</div>
          <div className="text-[11px] text-muted-foreground">RBI · SEBI · IRDAI frameworks loaded</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Data ─────────────────────────────────────────────────────── */
const TRUST_ITEMS = [
  { icon: Code2,      label: "Open Banking Infrastructure",       sub: "AIS & PIS compliant APIs" },
  { icon: ShieldCheck,label: "Regulatory-Compliant Architecture",  sub: "RBI, SEBI, PCI-DSS ready" },
  { icon: Lock,       label: "Secure API Integrations",            sub: "OAuth 2.0 · TLS 1.3 · HSM" },
  { icon: Layers,     label: "Enterprise Banking Platforms",       sub: "Core banking & transaction infra" },
];

const SOLUTIONS = [
  { icon: Network,      title: "Open Banking Solutions",              desc: "Account Information Services and Payment Initiation Services built on secure, consent-driven APIs compliant with open banking mandates.", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80&sat=-30" },
  { icon: BarChart3,    title: "Transaction Banking Platform",        desc: "End-to-end collections, corporate payouts, and escrow management with multi-bank integration and real-time reconciliation.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&sat=-30" },
  { icon: BrainCircuit, title: "AI-Powered Fraud Management",        desc: "Automated fraud detection, alert optimization, and investigation workflow automation with a unified monitoring dashboard.", image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80&sat=-30" },
  { icon: FileCheck,    title: "Agentic AI Regulatory Gap Assessment",desc: "Automated regulatory compliance checks, clause-by-clause risk scoring, and audit-ready reports for regulators.", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80&sat=-30" },
  { icon: GitBranch,    title: "Co-Lending & Embedded Finance",       desc: "Bank-fintech partnership enablement — co-lending infrastructure, FLDG management, and white-label embedded finance APIs.", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&sat=-30" },
  { icon: Code2,        title: "API-Based Banking Integrations",      desc: "Connectors for core banking systems, payment rails, KYC providers, and financial data APIs — pre-built and production-ready.", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&sat=-30" },
];

const OB_FEATURES = [
  { title: "Account Information Services (AIS)", desc: "Consent-driven access to account data across banks for enrichment, underwriting, and personal finance management." },
  { title: "Payment Initiation Services (PIS)",  desc: "Initiate payments directly from customer accounts via secure, regulated API channels without card network dependency." },
  { title: "Secure API-Based Data Sharing",      desc: "TLS 1.3 encrypted, OAuth 2.0 authenticated API gateway with rate limiting, audit trails, and SLA monitoring." },
  { title: "Open Finance Ecosystem",             desc: "Connect to insurance, investments, and pension providers — building a unified financial data layer for customers." },
];

const TXN_FEATURES = [
  { icon: RefreshCw,   title: "Collections Management",   desc: "Automate inbound payments, NACH mandates, and UPI AutoPay with real-time reconciliation and exception handling." },
  { icon: ArrowRight,  title: "Corporate Payouts",        desc: "High-volume bulk disbursements to vendors, employees, and partners across NEFT, RTGS, IMPS, and UPI rails." },
  { icon: Layers,      title: "Escrow Accounts",          desc: "Regulated escrow infrastructure for marketplaces, real estate, and lending — with conditional release workflows." },
  { icon: Network,     title: "Multi-Bank Integrations",  desc: "Single integration layer connecting to multiple banking partners with failover, routing intelligence, and unified reporting." },
];

const COMPLIANCE_FEATURES = [
  "AI-driven regulatory gap analysis across RBI, SEBI, and IRDAI frameworks",
  "Clause-by-clause risk scoring with severity classification",
  "Automated compliance checks triggered by regulation updates",
  "Audit-ready reports formatted for regulatory submissions",
];

const FRAUD_FEATURES = [
  { title: "Fraud Detection Automation", desc: "ML models trained on transaction patterns detect anomalies in real time — flagging mule accounts, account takeovers, and synthetic identity fraud." },
  { title: "Alert Optimization",         desc: "Reduce false positives with adaptive thresholds. Prioritize high-risk alerts and suppress noise, cutting investigation workload by 60%." },
  { title: "Investigation Workflow",     desc: "Structured case management for fraud analysts — evidence collection, timeline reconstruction, and SAR filing workflows built in." },
  { title: "Unified Fraud Dashboard",    desc: "Real-time monitoring across all channels — digital, branch, and card — in a single operations console with drill-down analytics." },
];

const INTEGRATIONS = [
  { category: "Core Banking Systems",    items: ["Finacle", "Flexcube", "Temenos", "BankWare"] },
  { category: "Fraud Monitoring",        items: ["NICE Actimize", "SAS Fraud", "Featurespace", "Custom ML"] },
  { category: "KYC Providers",           items: ["CKYC Registry", "Aadhaar eKYC", "Video KYC", "NSDL PAN"] },
  { category: "Payment Gateways",        items: ["NPCI / UPI", "Visa / Mastercard", "SWIFT", "RBI RTGS"] },
  { category: "Banking APIs",            items: ["Account Aggregator", "OCEN", "ONDC Financial", "Sahamati"] },
];

const TIMELINE = [
  { step: "01", title: "Discovery",            desc: "Regulatory mapping, existing infra audit, integration scope definition." },
  { step: "02", title: "Architecture Design",  desc: "Solution blueprint, API contracts, data flow diagrams, and security model." },
  { step: "03", title: "API Integration",      desc: "Sandbox development, core banking connectors, and payment rail setup." },
  { step: "04", title: "Compliance Testing",   desc: "UAT against RBI/SEBI requirements, penetration testing, audit trail verification." },
  { step: "05", title: "Deployment",           desc: "Phased go-live with feature flags, canary releases, and rollback controls." },
  { step: "06", title: "Ongoing Support",      desc: "24×7 SLA-backed support, regulatory update monitoring, and quarterly reviews." },
];

const WHY_US = [
  {
    icon: Landmark,
    title: "Enterprise Banking Expertise",
    desc: "Decade of experience building and integrating banking infrastructure for scheduled banks, NBFCs, and fintech lenders across India and Southeast Asia.",
    points: ["Worked with 40+ regulated institutions", "Deep RBI NBFC-P2P & AA framework knowledge", "Core banking migration experience"],
  },
  {
    icon: FileCheck,
    title: "Regulatory Compliance Knowledge",
    desc: "In-house regulatory team continuously monitors RBI, SEBI, IRDAI, and NPCI circulars — ensuring your platform stays compliant without scrambling after each update.",
    points: ["PCI-DSS Level 1 certified infrastructure", "DPDP Act compliance built-in", "ISO 27001 security practices"],
  },
  {
    icon: Lock,
    title: "Secure Financial Architecture",
    desc: "Bank-grade security by design — HSM-backed key management, end-to-end encryption, zero-trust network architecture, and SOC 2 Type II audit readiness.",
    points: ["HSM key management", "Zero-trust architecture", "99.99% uptime SLA"],
  },
];

/* ─── Page ─────────────────────────────────────────────────────── */
export default function BankingSolution() {
  return (
    <div className="bg-background">
      <GradientDefs />

      {/* 1. Hero */}
      <ScrollHero
        badge="Enterprise Banking Technology"
        badgeDot={false}
        pills={["Banks", "NBFCs", "Financial Institutions", "Regulated Fintechs"]}
        headline={<>Banking Infrastructure<br /><span className="brand-text">Built for Regulated Markets</span></>}
        subheadline="Deploy secure, compliant banking infrastructure — Open Banking APIs with consent-driven data sharing, transaction banking platforms, ML fraud detection, and automated regulatory compliance."
        primaryCta="Talk to Experts"
        secondaryCta="Explore Banking Solutions"
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80&sat=-30"
        imageAlt="Banking technology infrastructure"
        expandedBadge="Trusted by Banks & NBFCs"
        expandedHeadline={<>Secure Banking Infrastructure<br />Built for Regulated Markets</>}
        expandedCta="See All Solutions"
        onSecondary={() => document.getElementById("banking-solutions")?.scrollIntoView({ behavior: "smooth" })}
      />

      {/* 2. Trust & Compliance Strip */}
      <section className="border-y border-border bg-card/40">
        <div className="page-grid py-7">
          {TRUST_ITEMS.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="col-span-12 sm:col-span-6 lg:col-span-3 flex items-center gap-4">
              <Icon className="w-7 h-7 shrink-0" stroke="url(#banking-icon-grad)" strokeWidth={1.6} />
              <div>
                <div className="text-sm font-semibold text-foreground leading-tight">{label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Core Banking Solutions */}
      <section id="banking-solutions" className="page-grid py-12 sm:py-24">
        <div className="col-span-12 mb-12">
          <GBadge>Core Solutions</GBadge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
            Banking Infrastructure<br />
            <span className="brand-text">Built for Enterprise Scale</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
            Purpose-built modules for banks, NBFCs, and financial institutions —
            each designed around regulatory requirements, not retrofitted for compliance.
          </p>
        </div>

        {SOLUTIONS.map(({ icon: Icon, title, desc, image }) => (
          <div
            key={title}
            className="col-span-12 sm:col-span-6 lg:col-span-4 rounded-2xl overflow-hidden relative group"
            style={{ minHeight: "280px" }}
          >
            {/* Background image */}
            <img
              src={image}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.80) 35%, rgba(0,0,0,0.30) 65%, rgba(0,0,0,0.08) 100%)" }} />
            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-6" style={{ minHeight: "280px" }}>
              <Icon className="w-6 h-6 mb-3" stroke="url(#banking-icon-grad)" strokeWidth={1.6} />
              <h3 className="text-sm font-bold text-white mb-2">{title}</h3>
              <p className="text-xs text-white/70 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="page-grid"><div className="col-span-12"><Separator /></div></div>

      {/* 4. Open Banking Solutions */}
      <section className="page-grid py-12 sm:py-24">
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-center">
          <GBadge>Open Banking</GBadge>
          <h2 className="text-3xl font-bold text-foreground mb-4 leading-tight">
            Open Banking APIs for<br />
            <span className="brand-text">Modern Financial Services</span>
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            Enable consent-driven data sharing and programmable payments across your banking ecosystem — compliant with RBI Account Aggregator and open banking mandates.
          </p>
          <div className="flex flex-col gap-5">
            {OB_FEATURES.map(({ title, desc }) => (
              <div key={title} className="flex gap-3">
                <div className="w-1 rounded-full shrink-0 mt-1" style={{ background: BG, minHeight: "100%" }} />
                <div>
                  <div className="text-sm font-semibold text-foreground mb-1">{title}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
          <Button className="mt-8 w-fit rounded-full gap-2 group font-semibold text-white border-none" style={{ background: BG, boxShadow: GLOW }}>
            Explore Open Banking APIs <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="hidden lg:block col-span-1" />

        <div className="col-span-12 lg:col-span-6 flex items-center">
          <div className="w-full">
            <ApiFlowDiagram />
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[["99.99%", "API Uptime SLA"], ["<80ms", "Median Latency"], ["10M+", "Daily API Calls"], ["256-bit", "Encryption"]].map(([v, l]) => (
                <div key={l} className="rounded-xl border border-border bg-card px-4 py-3">
                  <div className="text-lg font-bold" style={GT}>{v}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="page-grid"><div className="col-span-12"><Separator /></div></div>

      {/* 5. Transaction Banking Platform */}
      <section className="page-grid py-12 sm:py-24">
        <div className="col-span-12 mb-10">
          <GBadge>Transaction Banking</GBadge>
          <h2 className="text-3xl font-bold text-foreground mb-4 leading-tight">
            Collections, Payouts & Escrow —<br />
            <span className="brand-text">Unified in One Platform</span>
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
            A single transaction banking platform handling inbound collections, outbound disbursements, escrow workflows, and multi-bank reconciliation at enterprise scale.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-5 grid grid-cols-1 gap-5 self-start">
          {TXN_FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4 p-5 rounded-xl border border-border bg-card">
              <Icon className="w-5 h-5 shrink-0 mt-0.5" stroke="url(#banking-icon-grad)" strokeWidth={1.6} />
              <div>
                <div className="text-sm font-bold text-foreground mb-1">{title}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden lg:block col-span-1" />

        <div className="col-span-12 lg:col-span-6 self-center">
          <DashboardPlaceholder label="Transaction Banking Console" rows={4} bars={true} />
        </div>
      </section>

      <div className="page-grid"><div className="col-span-12"><Separator /></div></div>

      {/* 6. AI Compliance Automation — white aurora section */}
      <section className="relative overflow-hidden py-12 sm:py-24" style={{ background: "#ffffff" }}>
        <AuroraBg variant="light" />
        <div className="page-grid relative" style={{ zIndex: 1 }}>
          <div className="col-span-12 lg:col-span-6 flex flex-col justify-center">
            <Badge variant="outline" className="mb-4 w-fit rounded-full px-4 text-xs uppercase tracking-widest font-semibold"
              style={{ borderColor: "color-mix(in oklch, oklch(0.57 0.22 25) 30%, transparent)", background: "color-mix(in oklch, oklch(0.57 0.22 25) 7%, transparent)", ...GT }}>
              AI Compliance
            </Badge>
            <h2 className="text-3xl font-bold mb-4 leading-tight" style={{ color: "#111827" }}>
              Automate Regulatory Compliance<br />
              <span style={GT}>with AI</span>
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "#6B7280", maxWidth: "480px" }}>
              Our agentic AI continuously monitors RBI, SEBI, and IRDAI regulations,
              identifies gaps in your policies, and generates audit-ready compliance reports —
              so your compliance team focuses on decisions, not manual reviews.
            </p>
            <div className="flex flex-col gap-4 mb-8">
              {COMPLIANCE_FEATURES.map((f) => (
                <div key={f} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" stroke="url(#banking-icon-grad)" strokeWidth={1.75} />
                  <span className="text-sm" style={{ color: "#374151" }}>{f}</span>
                </div>
              ))}
            </div>
            <Button className="w-fit rounded-full gap-2 group font-semibold text-white border-none" style={{ background: BG, boxShadow: GLOW }}>
              Request Compliance Demo <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="col-span-12 lg:col-span-6 flex items-center">
            <div className="w-full space-y-4">
              <ComplianceDiagram />
              <div
                className="rounded-2xl p-5"
                style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
              >
                <div className="text-xs font-semibold mb-3" style={{ color: "#111827" }}>Recent Compliance Alerts</div>
                {[
                  ["RBI Master Direction Amendment", "3 gaps identified", "High"],
                  ["DPDP Act — Data Retention Clause", "Policy update required", "Medium"],
                  ["PCI-DSS v4.0 Transition", "2 controls pending", "Low"],
                ].map(([title, note, sev]) => (
                  <div key={title} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                    <div>
                      <div className="text-xs font-medium" style={{ color: "#111827" }}>{title}</div>
                      <div className="text-[11px]" style={{ color: "#9CA3AF" }}>{note}</div>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: sev === "High" ? "#FEE2E2" : sev === "Medium" ? "#FEF3C7" : "#DCFCE7", color: sev === "High" ? "#DC2626" : sev === "Medium" ? "#D97706" : "#16A34A" }}>
                      {sev}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-grid"><div className="col-span-12"><Separator /></div></div>

      {/* 7. AI Fraud Management */}
      <section className="page-grid py-12 sm:py-24">
        <div className="col-span-12 mb-10">
          <GBadge>Fraud Management</GBadge>
          <h2 className="text-3xl font-bold text-foreground mb-4 leading-tight">
            AI-Powered Fraud Detection &<br />
            <span className="brand-text">Investigation Automation</span>
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
            Reduce fraud losses and investigation costs with ML-based detection, intelligent alert triage, and structured investigation workflows — all in a unified fraud operations platform.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <DashboardPlaceholder label="Fraud Operations Console" rows={3} bars={true} />
        </div>

        <div className="hidden lg:block col-span-1" />

        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 self-center">
          {FRAUD_FEATURES.map(({ title, desc }) => (
            <div key={title} className="p-5 rounded-xl border border-border bg-card">
              <div className="text-sm font-bold text-foreground mb-1.5">{title}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="page-grid"><div className="col-span-12"><Separator /></div></div>

      {/* 8. Integration Ecosystem */}
      <section className="page-grid py-12 sm:py-24">
        <div className="col-span-12 mb-10">
          <GBadge>Integrations</GBadge>
          <h2 className="text-3xl font-bold text-foreground mb-3">Integration Ecosystem</h2>
          <p className="text-muted-foreground text-base max-w-xl">
            Pre-built connectors across the banking technology stack — deploy faster without rebuilding integrations from scratch.
          </p>
        </div>

        {INTEGRATIONS.map(({ category, items }) => (
          <div key={category} className="col-span-12 sm:col-span-6 lg:col-span-4 rounded-2xl border border-border bg-card p-5 mb-4">
            <div className="text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-3">{category}</div>
            <div className="grid grid-cols-2 gap-2">
              {items.map((item) => (
                <div key={item} className="rounded-lg border border-border bg-background/60 px-3 py-2 text-xs font-medium text-foreground text-center">
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="col-span-12 mt-2 rounded-xl border border-dashed border-border px-6 py-4 text-center">
          <span className="text-sm text-muted-foreground">+ Custom integrations available for any core banking or third-party system</span>
        </div>
      </section>

      <div className="page-grid"><div className="col-span-12"><Separator /></div></div>

      {/* 9. Implementation Process */}
      <section className="page-grid py-12 sm:py-24">
        <div className="col-span-12 mb-12">
          <GBadge>Implementation</GBadge>
          <h2 className="text-3xl font-bold text-foreground mb-3">Structured Deployment Process</h2>
          <p className="text-muted-foreground text-base max-w-xl">
            A proven delivery methodology built for regulated financial environments — with compliance checkpoints at every phase.
          </p>
        </div>

        <div className="col-span-12">
          {/* Mobile: vertical stack; sm+: horizontal timeline */}
          <div className="flex flex-col gap-6 sm:hidden">
            {TIMELINE.map(({ step, title, desc }, i) => (
              <div key={step} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: BG }}>
                  {i + 1}
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground mb-1">{title}</div>
                  <div className="text-[11px] text-muted-foreground leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="relative hidden sm:flex items-start gap-0">
            {/* Connecting line */}
            <div className="absolute top-4 left-0 right-0 h-0.5 mx-8" style={{ background: "linear-gradient(to right, oklch(0.57 0.22 25), oklch(0.52 0.24 292))", zIndex: 0 }} />
            {TIMELINE.map(({ step, title, desc }, i) => (
              <div key={step} className="relative flex flex-col items-center flex-1 px-4" style={{ zIndex: 1 }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold mb-4 shrink-0" style={{ background: BG }}>
                  {i + 1}
                </div>
                <div className="text-xs font-bold text-foreground mb-1.5 text-center">{title}</div>
                <div className="text-[11px] text-muted-foreground leading-relaxed text-center">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="page-grid"><div className="col-span-12"><Separator /></div></div>

      {/* 10. Why Partner With Us */}
      <section className="page-grid py-12 sm:py-24">
        <div className="col-span-12 mb-10">
          <GBadge>Why NexaSoft</GBadge>
          <h2 className="text-3xl font-bold text-foreground mb-3">Why Partner With Us</h2>
          <p className="text-muted-foreground text-base max-w-xl">
            We don't sell generic software. We build regulated banking infrastructure with institutions that can't afford to get it wrong.
          </p>
        </div>

        {WHY_US.map(({ icon: Icon, title, desc, points }) => (
          <div key={title} className="col-span-12 sm:col-span-6 lg:col-span-4 rounded-2xl border border-border bg-card p-7">
            <Icon className="w-7 h-7 mb-5" stroke="url(#banking-icon-grad)" strokeWidth={1.6} />
            <h3 className="text-base font-bold text-foreground mb-3">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">{desc}</p>
            <div className="flex flex-col gap-2">
              {points.map((p) => (
                <div key={p} className="flex items-center gap-2.5 text-xs text-muted-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" stroke="url(#banking-icon-grad)" strokeWidth={1.75} />
                  {p}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* 11. Final CTA — dark aurora */}
      <section className="page-grid pb-12 sm:pb-24">
        <div
          className="col-span-12 rounded-2xl overflow-hidden relative"
          style={{ border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 25%, transparent)", background: "var(--color-card)" }}
        >
          <AuroraBg variant="dark" />
          <div aria-hidden className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ zIndex: 1, backgroundImage: "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div className="relative px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-10" style={{ zIndex: 2 }}>
            <div className="max-w-xl">
              <Badge variant="outline" className="mb-4 rounded-full border-primary/30 bg-primary/5 uppercase tracking-widest text-xs font-semibold" style={GT}>
                Get Started
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-foreground mb-4 leading-tight">
                Ready to Build the Impossible<br />
                <span className="brand-text">with Next-Gen Innovation?</span>
              </h2>
              <p className="text-muted-foreground text-base max-w-md">
                Take the next step — join us and turn your vision into reality with the power of innovation and expert guidance.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Button size="lg" className="rounded-full gap-2 group font-semibold text-white border-none min-w-52" style={{ background: BG, boxShadow: GLOW }}>
                Talk to Banking Experts
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-border bg-card/60 text-foreground hover:bg-secondary min-w-52">
                Request Proposal
              </Button>
              <a href="/solutions" className="text-xs text-muted-foreground hover:text-foreground transition-colors text-center mt-1">
                ← Back to all solutions
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
