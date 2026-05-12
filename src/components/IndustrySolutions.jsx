import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import AuroraBg from "@/components/AuroraBg";
import {
  Building2, Landmark, Wallet, Home,
  Stethoscope, Truck, Plane, CalendarDays,
  ArrowRight, TrendingUp, Users, Globe, ShieldCheck,
} from "lucide-react";

/* ─── Brand constants ────────────────────────────────────────────── */
const BRAND_GRADIENT = "linear-gradient(135deg, oklch(0.57 0.22 25) 0%, oklch(0.52 0.24 292) 100%)";
const BRAND_GLOW     = "0 0 28px color-mix(in oklch, oklch(0.57 0.22 25) 32%, transparent)";
const GRADIENT_TEXT  = {
  backgroundImage: BRAND_GRADIENT,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

/* ─── Hidden SVG gradient defs — referenced as stroke="url(#bg)" ── */
function GradientDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute", overflow: "hidden" }} aria-hidden>
      <defs>
        <linearGradient id="brand-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#DC2626" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─── Data ───────────────────────────────────────────────────────── */
const STATS = [
  { icon: Users,       value: "500+",      label: "Enterprise Clients" },
  { icon: Globe,       value: "18",        label: "Countries Served"   },
  { icon: TrendingUp,  value: "99.9%",     label: "Platform Uptime"    },
  { icon: ShieldCheck, value: "ISO 27001", label: "Certified Security" },
];

// All images share the same style: dark, moody, desaturated editorial photography
// Consistent: low-key lighting, cool-neutral tones, architectural/industrial subjects
const INDUSTRIES = [
  {
    id: "enterprise",
    icon: Building2,
    label: "Enterprise",
    tagline: "Digital Transformation at Scale",
    description: "End-to-end modernization for large organizations — legacy migration, ERP integration, intelligent workflow automation, and executive-grade analytics.",
    colSpan: 8,
    featured: true,
    href: "/solutions/enterprise",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80&sat=-30",
  },
  {
    id: "banking-nbfc",
    icon: Landmark,
    label: "Banking & NBFC",
    tagline: "Core Banking & Lending Platforms",
    description: "Regulatory-compliant platforms covering loan origination, core banking, KYC automation, and RBI reporting.",
    colSpan: 4,
    image: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=800&q=80&sat=-30",
  },
  {
    id: "fintech",
    icon: Wallet,
    label: "Fintech",
    tagline: "Payments, Neobanking & Open Finance",
    description: "UPI stacks, BNPL engines, neobank cores, and open banking APIs — built for startup velocity.",
    colSpan: 4,
    hash: "#solution-fintech",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&sat=-30",
  },
  {
    id: "real-estate",
    icon: Home,
    label: "Real Estate",
    tagline: "PropTech & Smart CRM",
    description: "Modern property platforms with lead management, virtual tours, and automated booking for developers and brokers.",
    colSpan: 4,
    hash: "#solution-real-estate",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&sat=-30",
  },
  {
    id: "healthcare",
    icon: Stethoscope,
    label: "Healthcare",
    tagline: "EMR, Telemedicine & Clinical Platforms",
    description: "End-to-end healthcare platforms: EMR systems, doctor-patient consultations, HIPAA-compliant data, and multi-clinic management.",
    colSpan: 4,
    href: "/solutions/healthcare",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80&sat=-30",
  },
  {
    id: "logistics",
    icon: Truck,
    label: "Logistics & Retail",
    tagline: "POS, Inventory & Supply Chain Ops",
    description: "Enterprise platforms for multi-store retail chains, POS systems, real-time inventory sync, and logistics operations.",
    colSpan: 6,
    href: "/solutions/logistics-retail",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1000&q=80&sat=-30",
  },
  {
    id: "travel",
    icon: Plane,
    label: "Travel & Mobility",
    tagline: "Route Planning & Mobility Ecosystems",
    description: "Intelligent travel platforms with real-time availability, multi-modal route planning, and unified booking & payment for mobility operators.",
    colSpan: 3,
    href: "/solutions/travel-mobility",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80&sat=-30",
  },
  {
    id: "events",
    icon: CalendarDays,
    label: "Events & Exhibition",
    tagline: "Networking Platforms & Lead Capture",
    description: "B2B event technology platforms for networking management, QR-based lead capture, offline-enabled apps, and post-event engagement automation.",
    colSpan: 3,
    href: "/solutions/events",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80&sat=-30",
  },
];

const PROCESS_STEPS = [
  { step: "01", title: "Industry Assessment",  desc: "We map your domain-specific workflows, compliance needs, and integration landscape before writing a line of code." },
  { step: "02", title: "Solution Design",       desc: "Architects configure our pre-built modules to match your processes — no generic templates, no feature bloat." },
  { step: "03", title: "Agile Delivery",        desc: "Two-week sprints with working software at every checkpoint. You see progress, not presentations." },
  { step: "04", title: "Scale & Support",       desc: "24/7 SLA-backed support, continuous updates, and a dedicated customer success partner post-launch." },
];

/* ─── Bento card ─────────────────────────────────────────────────── */
function BentoCard({ industry }) {
  const [hovered, setHovered] = useState(false);
  const Icon = industry.icon;
  const isFeatured = industry.featured;

  return (
    <div
      id={`solution-${industry.id}`}
      className="relative rounded-2xl border border-white/10 overflow-hidden flex flex-col cursor-pointer group"
      style={{
        gridColumn: `span ${industry.colSpan}`,
        minHeight: isFeatured ? 380 : 300,
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 24px 48px rgba(0,0,0,0.6), 0 0 0 1px color-mix(in oklch, oklch(0.57 0.22 25) 40%, transparent)"
          : "0 2px 16px rgba(0,0,0,0.3)",
        transition: "transform 0.22s ease, box-shadow 0.22s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        if (industry.href) { window.location.href = industry.href; }
        else { window.location.hash = industry.hash ?? `solution-detail-${industry.id}`; }
      }}
    >
      {/* Background image — subtle zoom on hover */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
        style={{
          backgroundImage: `url(${industry.image})`,
          transform: hovered ? "scale(1.05)" : "scale(1)",
        }}
      />

      {/* Transparent-to-dark overlay — image visible at top, dark at bottom for text */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.80) 35%, rgba(0,0,0,0.30) 65%, rgba(0,0,0,0.08) 100%)",
        }}
      />


      {/* Content pinned to bottom */}
      <div className="relative flex flex-col justify-end flex-1 p-7">
        <Icon
          className="w-7 h-7 mb-4"
          stroke="url(#brand-icon-gradient)"
          strokeWidth={1.6}
        />

        <h3 className={`font-bold text-white mb-1.5 ${isFeatured ? "text-2xl" : "text-base"}`}>
          {industry.label}
        </h3>
        <p className="text-xs font-medium mb-2 text-white/50 uppercase tracking-wide">
          {industry.tagline}
        </p>
        <p className={`text-white/65 leading-relaxed mb-5 ${isFeatured ? "text-sm max-w-lg" : "text-xs"}`}>
          {industry.description}
        </p>

        <button className="flex items-center gap-1.5 text-xs font-semibold text-white/70 group-hover:text-white transition-colors w-fit">
          Explore Solution
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────────── */
export default function IndustrySolutions() {
  return (
    <div className="bg-background">
      <GradientDefs />

      {/* ── Trust strip ── */}
      <section className="border-y border-border bg-card/40">
        <div className="page-grid py-7">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="col-span-3 flex items-center gap-4">
              <Icon
                className="w-7 h-7 shrink-0"
                stroke="url(#brand-icon-gradient)"
                strokeWidth={1.75}
              />
              <div>
                <div className="text-lg font-bold leading-tight" style={GRADIENT_TEXT}>{value}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section header ── */}
      <section className="page-grid pt-24 pb-10">
        <div className="col-span-8">
          <Badge
            variant="outline"
            className="mb-4 rounded-full px-4 text-xs uppercase tracking-widest border-primary/30 bg-primary/5 font-semibold"
            style={GRADIENT_TEXT}
          >
            Industry Solutions
          </Badge>
          <h2 className="text-5xl font-bold text-foreground mb-4 leading-tight">
            Built for Your Domain,<br />
            <span className="brand-text">Not the General Market</span>
          </h2>
        </div>
        <div className="col-span-4 flex items-end pb-2">
          <p className="text-muted-foreground text-base leading-relaxed">
            Generic software doesn't solve industry-specific problems.
            Our platforms are purpose-built around the workflows, regulations,
            and scale demands of each sector.
          </p>
        </div>
      </section>

      {/* ── Bento grid ── */}
      <section className="page-grid pb-24">
        <div className="col-span-12 bento-grid">
          {INDUSTRIES.map((ind) => (
            <BentoCard key={ind.id} industry={ind} />
          ))}
        </div>
      </section>

      {/* ── Featured solutions — WHITE MODE with light aurora ── */}
      <section className="relative overflow-hidden py-24" style={{ background: "#ffffff" }}>
        <AuroraBg variant="light" />

        <div className="page-grid relative" style={{ zIndex: 1 }}>
          <div className="col-span-12 mb-10">
            <Badge
              variant="outline"
              className="mb-4 rounded-full px-4 text-xs uppercase tracking-widest font-semibold"
              style={{ borderColor: "color-mix(in oklch, oklch(0.57 0.22 25) 30%, transparent)", background: "color-mix(in oklch, oklch(0.57 0.22 25) 7%, transparent)", ...GRADIENT_TEXT }}
            >
              Featured Platforms
            </Badge>
            <h2 className="text-4xl font-bold mb-3" style={{ color: "#111827" }}>
              Deep-Dive Into Our Leading Platforms
            </h2>
            <p className="max-w-xl text-base" style={{ color: "#6B7280" }}>
              Two of our most deployed solutions — proven at enterprise scale, ready to configure for your business.
            </p>
          </div>

          {/* Banking featured */}
          <div
            className="col-span-7 rounded-2xl p-8 relative overflow-hidden"
            style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(16px)", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <Landmark className="w-6 h-6" stroke="url(#brand-icon-gradient)" strokeWidth={1.75} />
              <Badge
                variant="outline"
                className="rounded-full text-xs font-semibold"
                style={{ borderColor: "color-mix(in oklch, oklch(0.57 0.22 25) 30%, transparent)", background: "color-mix(in oklch, oklch(0.57 0.22 25) 7%, transparent)", ...GRADIENT_TEXT }}
              >
                Featured · Banking & NBFC
              </Badge>
            </div>
            <h3 className="text-2xl font-bold mb-3" style={{ color: "#111827" }}>
              Launch a compliant lending platform in 90 days
            </h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#6B7280" }}>
              Our pre-built NBFC stack covers loan origination, bureau integration, KYC automation, and RBI-mandated reporting — ready to configure, not rebuild from scratch.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[{ v: "90 days", l: "Time to production" }, { v: "40%", l: "Ops cost reduction" }, { v: "99.95%", l: "System uptime" }].map(({ v, l }) => (
                <div key={l} className="rounded-xl px-4 py-3" style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.07)" }}>
                  <div className="text-xl font-bold" style={GRADIENT_TEXT}>{v}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{l}</div>
                </div>
              ))}
            </div>
            <Button className="rounded-full gap-2 group font-semibold text-white border-none" style={{ background: BRAND_GRADIENT, boxShadow: BRAND_GLOW }}>
              View Banking Solution <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Healthcare featured */}
          <div
            className="col-span-5 rounded-2xl p-8 relative overflow-hidden"
            style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(16px)", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <Stethoscope className="w-6 h-6" stroke="url(#brand-icon-gradient)" strokeWidth={1.75} />
              <Badge
                variant="outline"
                className="rounded-full text-xs font-semibold"
                style={{ borderColor: "color-mix(in oklch, oklch(0.57 0.22 25) 30%, transparent)", background: "color-mix(in oklch, oklch(0.57 0.22 25) 7%, transparent)", ...GRADIENT_TEXT }}
              >
                Featured · Healthcare
              </Badge>
            </div>
            <h3 className="text-2xl font-bold mb-3" style={{ color: "#111827" }}>
              Digitize patient journeys end-to-end
            </h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#6B7280" }}>
              ABDM-compliant health platform connecting EMR, teleconsultation, lab orders, and insurance claims in one unified system.
            </p>
            <div className="grid grid-cols-1 gap-3 mb-6">
              {[{ v: "3×", l: "Consultation capacity increase" }, { v: "60%", l: "Claims processing time cut" }, { v: "ABDM", l: "Health stack compliant" }].map(({ v, l }) => (
                <div key={l} className="rounded-xl px-4 py-2.5 flex items-center gap-4" style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.07)" }}>
                  <div className="text-lg font-bold w-16 shrink-0" style={GRADIENT_TEXT}>{v}</div>
                  <div className="text-xs" style={{ color: "#9CA3AF" }}>{l}</div>
                </div>
              ))}
            </div>
            <Button className="rounded-full gap-2 group font-semibold text-white border-none" style={{ background: BRAND_GRADIENT, boxShadow: BRAND_GLOW }}>
              View Healthcare Solution <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      <div className="page-grid">
        <div className="col-span-12"><Separator /></div>
      </div>

      {/* ── Process ── */}
      <section className="page-grid py-24">
        <div className="col-span-12 mb-12">
          <Badge variant="outline" className="mb-4 rounded-full px-4 text-xs uppercase tracking-widest border-primary/30 bg-primary/5 font-semibold" style={GRADIENT_TEXT}>
            Our Process
          </Badge>
          <h2 className="text-4xl font-bold text-foreground">From Discovery to Deployment</h2>
        </div>
        {PROCESS_STEPS.map(({ step, title, desc }) => (
          <div key={step} className="col-span-3 pl-5 border-l border-border">
            <div className="text-5xl font-black mb-3 select-none leading-none" style={GRADIENT_TEXT}>
              {step}
            </div>
            <h3 className="text-sm font-bold text-foreground mb-2">{title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </section>

      {/* ── CTA Banner — dark aurora ── */}
      <section className="page-grid pb-24">
        <div
          className="col-span-12 rounded-2xl overflow-hidden relative"
          style={{
            background: "var(--color-card)",
            border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 25%, transparent)",
            boxShadow: "0 4px 48px color-mix(in oklch, oklch(0.57 0.22 25) 12%, transparent)",
          }}
        >
          <AuroraBg variant="dark" />
          <div aria-hidden className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ zIndex: 1, backgroundImage: "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div className="relative px-16 py-20 flex flex-col lg:flex-row items-center justify-between gap-8" style={{ zIndex: 2 }}>
            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-4 rounded-full border-primary/30 bg-primary/5 uppercase tracking-widest text-xs font-semibold" style={GRADIENT_TEXT}>
                Get Started
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                Ready to Build Your<br />Industry Platform?
              </h2>
              <p className="text-muted-foreground text-base max-w-lg">
                Talk to a domain expert. We'll assess your requirements and outline
                the right solution in a free 60-minute consultation.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Button size="lg" className="rounded-full gap-2 group font-semibold text-white border-none min-w-56" style={{ background: BRAND_GRADIENT, boxShadow: BRAND_GLOW }}>
                Book a Free Consultation
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-border bg-card/60 text-foreground hover:bg-secondary min-w-56">
                View Case Studies
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border bg-card/40">
        <div className="page-grid py-8">
          <div className="col-span-3 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: BRAND_GRADIENT }}>
              <span className="text-white text-xs font-bold">N</span>
            </div>
            <span className="text-foreground font-bold text-sm">NexaSoft</span>
          </div>
          <div className="col-span-6 flex items-center justify-center">
            <p className="text-xs text-muted-foreground">© 2026 NexaSoft Technologies. All rights reserved.</p>
          </div>
          <div className="col-span-3 flex items-center justify-end gap-6">
            {["Privacy", "Terms", "Security", "Contact"].map((l) => (
              <a key={l} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
