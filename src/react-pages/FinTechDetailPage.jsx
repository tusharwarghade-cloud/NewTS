import Footer from "@/components/Footer";
import AuroraBg from "@/components/AuroraBg";
import ScrollHero from "@/components/ScrollHero";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  BrainCircuit,
  Network,
  Zap,
  Lock,
  Layers,
  CreditCard,
  Landmark,
  LineChart,
  TrendingUp,
  Building2,
  Code2,
  BarChart3,
  Wallet,
  Database,
  Globe,
  RefreshCw,
  FileCheck,
  Users,
  GitBranch,
} from "lucide-react";

const BG   = "linear-gradient(135deg, oklch(0.57 0.22 25) 0%, oklch(0.52 0.24 292) 100%)";
const GLOW = "0 0 28px color-mix(in oklch, oklch(0.57 0.22 25) 32%, transparent)";
const GT   = { backgroundImage: BG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };

function GradientDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute", overflow: "hidden" }} aria-hidden>
      <defs>
        <linearGradient id="fintech-icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function GBadge({ children }) {
  return (
    <Badge
      variant="outline"
      className="mb-4 rounded-full px-4 text-xs uppercase tracking-widest font-semibold border-primary/30 bg-primary/5"
      style={GT}
    >
      {children}
    </Badge>
  );
}

const SOLUTIONS_DATA = {
  "digital-lending": {
    scrollHero: {
      badge: "Digital Lending Platforms",
      pills: ["Loan Origination", "Credit Scoring", "LMS", "Collections", "Disbursement", "Embedded Lending"],
      headline: (<>Digital Lending<br /><span className="brand-text">Infrastructure Platforms</span></>),
      subheadline: "End-to-end digital lending infrastructure — from AI-powered credit scoring and loan origination to automated disbursement, collections, and embedded lending APIs.",
      primaryCta: "Schedule Consultation",
      secondaryCta: "Explore Solutions",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1800&q=80&sat=-30",
      imageAlt: "Digital lending platform",
      expandedBadge: "Trusted by Lenders & NBFCs",
      expandedHeadline: (<>Scalable Lending Infrastructure<br />Built for Modern Lenders</>),
      expandedCta: "See All Capabilities",
    },
    trustItems: [
      { icon: BrainCircuit, label: "AI Credit Scoring", sub: "ML models for risk assessment" },
      { icon: Zap, label: "Instant Loan Disbursement", sub: "Sub-second automated payouts" },
      { icon: ShieldCheck, label: "RBI/NBFC Compliant", sub: "Regulatory-ready architecture" },
      { icon: RefreshCw, label: "Automated Collections", sub: "NACH, UPI AutoPay & recovery" },
    ],
    features: [
      { icon: FileCheck, title: "Loan Origination Systems (LOS)", desc: "Digital loan application, document collection, credit bureau integration, and decisioning automation.", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&sat=-30" },
      { icon: BrainCircuit, title: "AI Credit Scoring & Risk Analytics", desc: "Custom ML models using bureau data, bank statements, and alternative data for accurate credit risk assessment.", image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80&sat=-30" },
      { icon: Database, title: "Loan Management Systems (LMS)", desc: "Full loan lifecycle management — EMI schedules, prepayments, restructuring, and customer self-service portals.", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80&sat=-30" },
      { icon: Zap, title: "Automated Loan Disbursement", desc: "Instant multi-rail disbursement via IMPS, NEFT, UPI with reconciliation and audit trail.", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&sat=-30" },
      { icon: RefreshCw, title: "Collections & Recovery Systems", desc: "Automated NACH debit, UPI AutoPay, and intelligent delinquency management with escalation workflows.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&sat=-30" },
      { icon: Network, title: "Embedded Lending Infrastructure", desc: "White-label lending APIs for e-commerce, BNPL, and enterprise platforms to offer credit to end users.", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&sat=-30" },
    ],
    capabilities: {
      title: "Platform Capabilities",
      subtitle: "Built for Modern Digital Lenders",
      items: [
        "End-to-end loan lifecycle automation from application to closure",
        "Multi-bureau integration (CIBIL, Experian, CRIF, Equifax)",
        "Account Aggregator (AA) and OCEN framework integration",
        "Real-time credit decisioning under 3 seconds",
        "Co-lending and FLDG management infrastructure",
        "RBI NBFC and P2P lending compliance architecture",
      ],
    },
    useCases: [
      { title: "Consumer Lending Apps", desc: "Personal loan, buy-now-pay-later, and salary advance apps with digital KYC and instant approval." },
      { title: "MSME Lending Platforms", desc: "Business loan origination with GST data, bank statement analysis, and collateral management." },
      { title: "P2P Lending Platforms", desc: "RBI-compliant P2P lending marketplaces with investor dashboards and borrower matching." },
      { title: "Co-Lending Systems", desc: "Bank-NBFC co-lending infrastructure with FLDG, split disbursement, and portfolio management." },
      { title: "Embedded BNPL", desc: "Buy-now-pay-later infrastructure for e-commerce and marketplace platforms." },
    ],
  },

  "wealth-management": {
    scrollHero: {
      badge: "Wealth Management Platforms",
      pills: ["Portfolio Management", "Robo-Advisory", "Investment Analytics", "Goal-Based Planning", "Multi-Broker", "Client Advisory"],
      headline: (<>Wealth Management<br /><span className="brand-text">Technology Platforms</span></>),
      subheadline: "Intelligent wealth management infrastructure — from robo-advisory and portfolio analytics to client advisory dashboards and multi-broker integrations.",
      primaryCta: "Schedule Consultation",
      secondaryCta: "Explore Solutions",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1800&q=80&sat=-30",
      imageAlt: "Wealth management platform",
      expandedBadge: "Trusted by Wealth Managers & RIAs",
      expandedHeadline: (<>Smart Wealth Platforms<br />Powered by AI & Analytics</>),
      expandedCta: "See All Capabilities",
    },
    trustItems: [
      { icon: LineChart, label: "Real-Time Portfolio Analytics", sub: "Live P&L, risk & attribution" },
      { icon: BrainCircuit, label: "AI-Powered Advisory", sub: "Robo and hybrid advisory engines" },
      { icon: ShieldCheck, label: "SEBI-Compliant Architecture", sub: "RIA & PMS regulatory ready" },
      { icon: Network, label: "Multi-Broker Integration", sub: "50+ broker & exchange connectors" },
    ],
    features: [
      { icon: BarChart3, title: "Portfolio Management Systems", desc: "Real-time portfolio tracking, rebalancing, tax-loss harvesting, and performance attribution across asset classes.", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80&sat=-30" },
      { icon: BrainCircuit, title: "Robo-Advisory Platforms", desc: "Algorithmic investment recommendations based on risk profiling, goal setting, and market conditions.", image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80&sat=-30" },
      { icon: Users, title: "Client Advisory Dashboards", desc: "Relationship manager portals with client 360° view, portfolio insights, and engagement workflows.", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&sat=-30" },
      { icon: LineChart, title: "Investment Analytics Platforms", desc: "Deep analytics on returns, benchmarking, sector exposure, and risk-adjusted performance metrics.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&sat=-30" },
      { icon: Network, title: "Multi-Broker Integrations", desc: "Consolidated portfolio view across brokers with real-time sync, order routing, and reconciliation.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&sat=-30" },
      { icon: TrendingUp, title: "Goal-Based Investment Platforms", desc: "Financial goal planning, SIP automation, and milestone tracking for retail and HNI investors.", image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80&sat=-30" },
    ],
    capabilities: {
      title: "Platform Capabilities",
      subtitle: "Built for Modern Wealth Managers",
      items: [
        "Real-time multi-asset portfolio valuation and P&L",
        "SEBI RIA and PMS regulatory compliance architecture",
        "Automated rebalancing and tax-loss harvesting",
        "MF, equity, bonds, PMS, and AIF support",
        "Risk profiling engines with suitability assessment",
        "White-label client portals and mobile apps",
      ],
    },
    useCases: [
      { title: "Retail Investment Apps", desc: "Digital investment platforms for mutual funds, stocks, and ETFs with goal-based recommendations." },
      { title: "HNI Wealth Platforms", desc: "Comprehensive HNI/UHNI portals with multi-asset reporting, tax optimization, and estate planning." },
      { title: "Robo-Advisory Services", desc: "Fully automated or hybrid advisory platforms for SEBI-registered investment advisors (RIAs)." },
      { title: "PMS Technology", desc: "Portfolio Management Service platforms for SEBI-registered PMS providers with client reporting." },
      { title: "Corporate Treasury", desc: "Corporate treasury management with liquidity, FX, and fixed income portfolio analytics." },
    ],
  },

  "payments": {
    scrollHero: {
      badge: "Payment & Wallet Solutions",
      pills: ["Digital Wallets", "Payment Gateways", "P2P Payments", "Merchant Payments", "Settlement", "Embedded Payments"],
      headline: (<>Payment & Wallet<br /><span className="brand-text">Infrastructure Platforms</span></>),
      subheadline: "Full-stack payment infrastructure — digital wallets, payment gateways, P2P platforms, merchant payment systems, and embedded payment APIs for any business model.",
      primaryCta: "Schedule Consultation",
      secondaryCta: "Explore Solutions",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1800&q=80&sat=-30",
      imageAlt: "Payment solutions",
      expandedBadge: "Trusted by Payment Companies & Banks",
      expandedHeadline: (<>Scalable Payment Infrastructure<br />Built for High Volume</>),
      expandedCta: "See All Capabilities",
    },
    trustItems: [
      { icon: Zap, label: "Sub-Second Transactions", sub: "High-throughput payment processing" },
      { icon: ShieldCheck, label: "PCI-DSS Level 1", sub: "Certified payment security" },
      { icon: Network, label: "Multi-Rail Support", sub: "UPI, NEFT, RTGS, IMPS, SWIFT" },
      { icon: RefreshCw, label: "Real-Time Reconciliation", sub: "Automated settlement & matching" },
    ],
    features: [
      { icon: Wallet, title: "Digital Wallet Platforms", desc: "Full-featured digital wallets with top-up, P2P transfer, bill payments, and loyalty integration.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&sat=-30" },
      { icon: CreditCard, title: "Payment Gateway Systems", desc: "Multi-method payment acceptance — cards, UPI, net banking, wallets — with 99.99% uptime and smart retry logic.", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80&sat=-30" },
      { icon: Users, title: "Peer-to-Peer Payment Platforms", desc: "Consumer P2P payment apps with UPI, contact-based transfers, and social payment features.", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&sat=-30" },
      { icon: Building2, title: "Merchant Payment Systems", desc: "POS, QR, and online payment solutions for merchants with analytics, settlements, and dispute management.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&sat=-30" },
      { icon: RefreshCw, title: "Settlement & Reconciliation Systems", desc: "Automated T+0 and T+1 settlement, multi-party reconciliation, and exception management.", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80&sat=-30" },
      { icon: Layers, title: "Embedded Payment Infrastructure", desc: "White-label payment APIs to embed checkout, wallets, and payouts into any product.", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&sat=-30" },
    ],
    capabilities: {
      title: "Platform Capabilities",
      subtitle: "Built for High-Volume Payment Processing",
      items: [
        "Multi-rail payment processing: UPI, NEFT, RTGS, IMPS, cards, SWIFT",
        "PCI-DSS Level 1 certified payment infrastructure",
        "Smart payment routing with failover and retry logic",
        "Real-time fraud detection and chargeback management",
        "Automated T+0/T+1 settlement and reconciliation",
        "NPCI, RBI, and international payment scheme compliance",
      ],
    },
    useCases: [
      { title: "Neobank Payment Apps", desc: "End-to-end payment infrastructure for neobanks — wallets, UPI, cards, and cross-border payments." },
      { title: "Merchant Acquiring Platforms", desc: "Payment acceptance platforms for merchant aggregators with onboarding, risk, and settlement." },
      { title: "B2B Payment Platforms", desc: "Corporate payment platforms for payroll, vendor payments, and expense management." },
      { title: "International Remittance", desc: "Cross-border payment platforms with FX management, SWIFT integration, and compliance workflows." },
      { title: "Super App Payments", desc: "Embedded payment infrastructure for super apps with wallet, checkout, and payout APIs." },
    ],
  },

  "investment-trading": {
    scrollHero: {
      badge: "Investment & Trading Platforms",
      pills: ["Trading Infrastructure", "Portfolio Analytics", "Algo Trading", "Market Data", "Broker Integration", "Research Platforms"],
      headline: (<>Investment & Trading<br /><span className="brand-text">Technology Platforms</span></>),
      subheadline: "High-performance trading and investment infrastructure — from algorithmic trading systems and portfolio analytics to market data integration and broker connectivity.",
      primaryCta: "Schedule Consultation",
      secondaryCta: "Explore Solutions",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1800&q=80&sat=-30",
      imageAlt: "Investment and trading platforms",
      expandedBadge: "Trusted by Brokers & Asset Managers",
      expandedHeadline: (<>High-Performance Trading Infrastructure<br />Built for Modern Markets</>),
      expandedCta: "See All Capabilities",
    },
    trustItems: [
      { icon: Zap, label: "Ultra-Low Latency", sub: "Microsecond order execution" },
      { icon: BarChart3, label: "Real-Time Market Data", sub: "Live feeds from 50+ exchanges" },
      { icon: ShieldCheck, label: "SEBI-Compliant Systems", sub: "Broker and AIF regulatory ready" },
      { icon: BrainCircuit, label: "Algorithmic Trading", sub: "Strategy backtesting & live execution" },
    ],
    features: [
      { icon: TrendingUp, title: "Trading Platform Infrastructure", desc: "High-performance order management, execution, and position management systems for equity, derivatives, and commodities.", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80&sat=-30" },
      { icon: BarChart3, title: "Portfolio Analytics Platforms", desc: "Real-time P&L, risk analytics, attribution analysis, and performance benchmarking across portfolios.", image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80&sat=-30" },
      { icon: BrainCircuit, title: "Algorithmic Trading Systems", desc: "Strategy development framework, backtesting engine, and live execution for quant and algo traders.", image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80&sat=-30" },
      { icon: Database, title: "Market Data Integration Systems", desc: "Real-time and historical market data aggregation from NSE, BSE, MCX, and international exchanges.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&sat=-30" },
      { icon: Network, title: "Broker Integration Platforms", desc: "Direct market access and broker API integrations with order routing, margin management, and trade reporting.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&sat=-30" },
      { icon: LineChart, title: "Investment Research Platforms", desc: "Fundamental and technical research platforms with data aggregation, report generation, and analyst workflows.", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80&sat=-30" },
    ],
    capabilities: {
      title: "Platform Capabilities",
      subtitle: "Built for Performance-Critical Trading",
      items: [
        "Sub-millisecond order routing and execution infrastructure",
        "Multi-asset class support: equity, F&O, currency, commodities",
        "SEBI broker, AIF, and PMS regulatory compliance",
        "Real-time risk management and margin monitoring",
        "Strategy backtesting with historical tick data",
        "FIX protocol and direct market access (DMA) support",
      ],
    },
    useCases: [
      { title: "Retail Trading Apps", desc: "Mobile-first trading apps for equity, F&O, and mutual funds with seamless broker integration." },
      { title: "Algo Trading Platforms", desc: "Quant and algorithmic trading platforms for hedge funds, proprietary desks, and HFT firms." },
      { title: "Wealth Management Integration", desc: "Portfolio management and trading integration for RIAs, PMS managers, and family offices." },
      { title: "Broker Technology", desc: "Complete brokerage technology stack with OMS, RMS, and back-office automation." },
      { title: "Market Data Platforms", desc: "Financial data platforms aggregating real-time and historical data for analytics and research." },
    ],
  },

  "neo-banking": {
    scrollHero: {
      badge: "Neo Banking Platforms",
      pills: ["Digital Accounts", "eKYC", "Payments", "Cards", "API Banking", "Customer Analytics"],
      headline: (<>Neo Banking<br /><span className="brand-text">Platform Infrastructure</span></>),
      subheadline: "Full-stack neo banking technology — digital account management, eKYC onboarding, payments infrastructure, card and wallet systems, and API-first banking architecture.",
      primaryCta: "Schedule Consultation",
      secondaryCta: "Explore Solutions",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1800&q=80&sat=-30",
      imageAlt: "Neo banking platform",
      expandedBadge: "Trusted by Neobanks & Fintechs",
      expandedHeadline: (<>API-First Banking Infrastructure<br />Built for Digital-Native Banks</>),
      expandedCta: "See All Capabilities",
    },
    trustItems: [
      { icon: Zap, label: "API-First Architecture", sub: "Modular, composable banking APIs" },
      { icon: ShieldCheck, label: "RBI-Compliant Platform", sub: "KYC, AML & banking regulations" },
      { icon: Users, label: "Digital Onboarding", sub: "Video KYC & Aadhaar eKYC" },
      { icon: Globe, label: "Multi-Currency Support", sub: "International banking ready" },
    ],
    features: [
      { icon: Building2, title: "Digital Account Management Systems", desc: "Current, savings, and fixed deposit account management with real-time balance, statements, and self-service portals.", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&sat=-30" },
      { icon: FileCheck, title: "Digital Onboarding & eKYC Platforms", desc: "Video KYC, Aadhaar eKYC, PAN verification, and liveness detection for seamless digital account opening.", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&sat=-30" },
      { icon: Network, title: "Payments & Transfers Infrastructure", desc: "UPI, NEFT, RTGS, IMPS, and international transfers with real-time notifications and transaction history.", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&sat=-30" },
      { icon: CreditCard, title: "Card & Wallet Systems", desc: "Virtual and physical card issuance, prepaid wallets, and card controls with spend analytics.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&sat=-30" },
      { icon: Code2, title: "API-Based Banking Infrastructure", desc: "Open banking APIs for third-party integrations, partner ecosystem, and embedded banking products.", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&sat=-30" },
      { icon: BarChart3, title: "Financial Analytics & Customer Insights", desc: "Behavioral analytics, spend categorization, and customer financial health scoring for personalized experiences.", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80&sat=-30" },
    ],
    capabilities: {
      title: "Platform Capabilities",
      subtitle: "Built for Digital-Native Banking",
      items: [
        "End-to-end digital account opening in under 5 minutes",
        "RBI KYC, AML, and banking compliance architecture",
        "Aadhaar eKYC, Video KYC, and PAN verification",
        "Core banking system integration (Finacle, Flexcube, Temenos)",
        "Multi-currency and cross-border payment support",
        "Real-time fraud monitoring and AML screening",
      ],
    },
    useCases: [
      { title: "Consumer Neobank", desc: "Digital-first consumer bank with account opening, payments, cards, and personalized financial insights." },
      { title: "Business Neobank", desc: "SMB and startup banking platform with current accounts, payroll, vendor payments, and expense management." },
      { title: "Banking-as-a-Service", desc: "White-label banking infrastructure for fintechs, NBFCs, and enterprises to embed banking products." },
      { title: "International Remittance", desc: "Digital banking for NRI and international customers with multi-currency accounts and remittance." },
      { title: "Youth & Student Banking", desc: "Digital banking products targeted at Gen-Z with spending controls, goals, and financial education." },
    ],
  },

  "embedded-finance": {
    scrollHero: {
      badge: "Embedded Finance Platforms",
      pills: ["Embedded Payments", "Embedded Lending", "Embedded Wallets", "Embedded Insurance", "Banking APIs", "Financial Data"],
      headline: (<>Embedded Finance<br /><span className="brand-text">Platform Infrastructure</span></>),
      subheadline: "Integrate financial services seamlessly into any digital product — embedded payments, lending, wallets, insurance, and banking APIs for non-financial businesses.",
      primaryCta: "Schedule Consultation",
      secondaryCta: "Explore Solutions",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1800&q=80&sat=-30",
      imageAlt: "Embedded finance platform",
      expandedBadge: "Trusted by Platforms & Enterprises",
      expandedHeadline: (<>Financial Services Inside<br />Your Digital Product</>),
      expandedCta: "See All Capabilities",
    },
    trustItems: [
      { icon: Code2, label: "API-First Integration", sub: "SDKs for web, mobile & backend" },
      { icon: ShieldCheck, label: "Regulatory Compliance", sub: "Finance-grade security & licensing" },
      { icon: Zap, label: "Fast Time-to-Market", sub: "Deploy finance features in weeks" },
      { icon: Layers, label: "Modular Architecture", sub: "Pick only what you need" },
    ],
    features: [
      { icon: CreditCard, title: "Embedded Payment Systems", desc: "In-app payment acceptance, payouts, and wallet infrastructure embedded directly into any platform.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&sat=-30" },
      { icon: Landmark, title: "Embedded Lending Platforms", desc: "BNPL, line of credit, and working capital loans embedded into e-commerce, SaaS, and marketplace platforms.", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80&sat=-30" },
      { icon: Wallet, title: "Embedded Wallet Infrastructure", desc: "Digital wallet APIs for storing value, cashback, loyalty points, and peer transfers inside any app.", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80&sat=-30" },
      { icon: ShieldCheck, title: "Embedded Insurance Platforms", desc: "Usage-based, parametric, and product-linked insurance integration via APIs for any consumer or B2B platform.", image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80&sat=-30" },
      { icon: Network, title: "Banking API Integrations", desc: "Open banking connectors for account data, payments, and KYC — enabling any app to use banking services.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&sat=-30" },
      { icon: BarChart3, title: "Financial Data & Analytics Platforms", desc: "Account aggregation, transaction enrichment, and financial health analytics APIs for any product.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&sat=-30" },
    ],
    capabilities: {
      title: "Platform Capabilities",
      subtitle: "Built for Platform Businesses",
      items: [
        "REST APIs and SDKs for rapid integration",
        "White-label UI components for payments and lending",
        "Regulatory licensing support and compliance layer",
        "Sandbox environment for rapid development and testing",
        "Account Aggregator and OCEN framework integration",
        "Real-time webhooks and event-driven architecture",
      ],
    },
    useCases: [
      { title: "E-Commerce Platforms", desc: "Embed BNPL, EMI, wallets, and seller payouts into e-commerce platforms without leaving the experience." },
      { title: "SaaS Platforms", desc: "Add invoicing, payments, and working capital loans to B2B SaaS products for SMB customers." },
      { title: "Mobility & Logistics", desc: "Driver and vendor payments, fuel wallets, and insurance products embedded in mobility apps." },
      { title: "Healthcare Platforms", desc: "Patient financing, insurance claims, and provider payouts embedded in health-tech platforms." },
      { title: "Agriculture & Rural Platforms", desc: "Crop insurance, input financing, and payment infrastructure for agri-tech platforms." },
    ],
  },
};

const SOLUTION_NAMES = {
  "digital-lending": "Digital Lending",
  "wealth-management": "Wealth Management",
  "payments": "Payments & Wallets",
  "investment-trading": "Investment & Trading",
  "neo-banking": "Neo Banking",
  "embedded-finance": "Embedded Finance",
};

export default function FinTechDetailPage({ solutionKey }) {
  const data = SOLUTIONS_DATA[solutionKey];

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
        Solution not found
      </div>
    );
  }

  const solutionName = SOLUTION_NAMES[solutionKey] || solutionKey;

  return (
    <div className="bg-background">
      <GradientDefs />

      {/* 1. Hero */}
      <ScrollHero
        {...data.scrollHero}
        onSecondary={() =>
          document.getElementById("fintech-detail-solutions")?.scrollIntoView({ behavior: "smooth" })
        }
      />

      {/* 2. Trust / Stats Strip */}
      <section className="border-y border-border bg-card/40">
        <div className="page-grid py-7">
          {data.trustItems.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="col-span-6 sm:col-span-3 flex items-center gap-4">
              <Icon
                className="w-7 h-7 shrink-0"
                stroke="url(#fintech-icon-grad)"
                strokeWidth={1.6}
              />
              <div>
                <div className="text-sm font-semibold text-foreground leading-tight">{label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Solutions / Features Grid */}
      <section id="fintech-detail-solutions" className="page-grid py-12 sm:py-24">
        <div className="col-span-12 mb-8 sm:mb-12">
          <GBadge>Our Solutions</GBadge>
          <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
            {solutionName}<br />
            <span className="brand-text">Built for Enterprise Scale</span>
          </h2>
        </div>
        {data.features.map(({ icon: Icon, title, desc, image }) => (
          <div
            key={title}
            className="col-span-12 sm:col-span-6 lg:col-span-4 rounded-2xl overflow-hidden relative group"
            style={{ minHeight: "280px" }}
          >
            <img
              src={image}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.80) 35%, rgba(0,0,0,0.30) 65%, rgba(0,0,0,0.08) 100%)",
              }}
            />
            <div
              className="relative h-full flex flex-col justify-end p-6"
              style={{ minHeight: "280px" }}
            >
              <Icon
                className="w-6 h-6 mb-3"
                stroke="url(#fintech-icon-grad)"
                strokeWidth={1.6}
              />
              <h3 className="text-sm font-bold text-white mb-2">{title}</h3>
              <p className="text-xs text-white/70 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* 4. Separator */}
      <div className="page-grid">
        <div className="col-span-12">
          <Separator />
        </div>
      </div>

      {/* 5. Platform Capabilities */}
      <section className="page-grid py-12 sm:py-24">
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-center">
          <GBadge>{data.capabilities.title}</GBadge>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 leading-tight">
            {data.capabilities.subtitle}<br />
            <span className="brand-text">At Enterprise Scale</span>
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            Purpose-built capabilities that power complex fintech products — designed for compliance,
            performance, and scale from day one.
          </p>
          <Button
            size="lg"
            className="rounded-full gap-2 group font-semibold text-white border-none self-start"
            style={{ background: BG, boxShadow: GLOW }}
          >
            Schedule Consultation{" "}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
        <div className="hidden lg:block lg:col-span-1" />
        <div className="col-span-12 lg:col-span-6 grid grid-cols-1 gap-3">
          {data.capabilities.items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card/60 px-5 py-4 flex items-start gap-3 group hover:border-primary/30 transition-colors"
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5"
                style={{ background: BG }}
              >
                {i + 1}
              </div>
              <span className="text-sm text-foreground leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Separator */}
      <div className="page-grid">
        <div className="col-span-12">
          <Separator />
        </div>
      </div>

      {/* 7. Use Cases */}
      <section className="page-grid py-12 sm:py-24">
        <div className="col-span-12 mb-8 sm:mb-12">
          <GBadge>Use Cases</GBadge>
          <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
            Who Builds With<br />
            <span className="brand-text">This Platform</span>
          </h2>
        </div>
        {data.useCases.map(({ title, desc }, i) => (
          <div
            key={title}
            className="col-span-12 sm:col-span-6 lg:col-span-4 rounded-2xl border border-border bg-card p-6 sm:p-7 group hover:border-primary/30 transition-colors relative overflow-hidden"
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  "radial-gradient(300px circle at 0% 0%, color-mix(in oklch, oklch(0.57 0.22 25) 6%, transparent), transparent 70%)",
              }}
            />
            <div className="relative">
              <div className="text-2xl font-bold mb-3" style={GT}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* 8. CTA Section */}
      <section className="page-grid py-12 sm:py-24 border-t border-border">
        <div
          className="col-span-12 rounded-2xl overflow-hidden relative"
          style={{
            border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 25%, transparent)",
            background: "var(--color-card)",
          }}
        >
          <AuroraBg variant="dark" />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              zIndex: 1,
              backgroundImage:
                "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div
            className="relative px-6 sm:px-16 py-10 sm:py-20 flex flex-col lg:flex-row items-center justify-between gap-10"
            style={{ zIndex: 2 }}
          >
            <div className="max-w-xl">
              <GBadge>Get Started</GBadge>
              <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
                Ready to Build Your<br />
                <span className="brand-text">Fintech Product?</span>
              </h2>
              <p className="text-muted-foreground text-base max-w-md">
                Our fintech engineering team is ready to help you design, build, and launch your
                platform — on time, on budget, and fully compliant.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Button
                size="lg"
                className="rounded-full gap-2 group font-semibold text-white border-none min-w-52"
                style={{ background: BG, boxShadow: GLOW }}
              >
                Book a Consultation{" "}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-border bg-card/60 text-foreground hover:bg-secondary min-w-52"
                onClick={() => {
                  window.location.hash = "#fintech";
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                View All Fintech Solutions
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
