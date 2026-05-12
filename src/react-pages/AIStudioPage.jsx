import { useRef, useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight, ArrowUpRight, Sparkles, Bot, Brain, Code2, Shield,
  Zap, Database, Workflow, Cpu, GitBranch, CheckCircle2, Star,
} from "lucide-react";

/* ── Brand ──────────────────────────────────────────────────────── */
const BG = "linear-gradient(135deg, oklch(0.57 0.22 25) 0%, oklch(0.52 0.24 292) 100%)";
const GT = { backgroundImage: BG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };

/* ── CountUp ────────────────────────────────────────────────────── */
function CountUp({ end, suffix = "", duration = 2 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(ease * end));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─────────────────────────────────────────────────────────────────
   HERO
   ───────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative pt-40 pb-28 px-6 overflow-hidden">
      {/* background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 -left-20 w-[500px] h-[500px] rounded-full blur-[120px] opacity-30"
          style={{ background: "radial-gradient(circle, #dc2626 0%, transparent 70%)" }}
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 -right-20 w-[500px] h-[500px] rounded-full blur-[120px] opacity-30"
          style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }}
          animate={{ x: [0, -40, 0], y: [0, 60, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 30%, black, transparent)",
        }}
      />

      <div className="max-w-5xl mx-auto text-center relative">
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <Badge variant="outline" className="rounded-full py-1 px-3 font-medium">
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"
            />
            <span className="text-xs">Accepting 3 new projects · Q2 2026</span>
          </Badge>
        </motion.div>

        {/* headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-helvetica text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] text-foreground"
        >
          We engineer<br />
          <span className="font-moralana" style={GT}>AI products</span>{" "}
          that ship.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mt-8 leading-relaxed"
        >
          From prototype to production in 12 weeks. We build custom AI agents,
          LLM pipelines, and intelligent products for founders and enterprises.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-10"
        >
          <Button size="lg" className="rounded-full px-6 h-12 text-sm group" style={{ background: BG }}>
            Book a strategy call
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-6 h-12 text-sm">
            View case studies
          </Button>
        </motion.div>

        {/* social proof strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 flex items-center justify-center gap-6 text-xs text-muted-foreground"
        >
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
            ))}
          </div>
          <span>Rated 4.9/5 · 120+ shipped projects · Trusted by 80+ teams</span>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   LOGO MARQUEE
   ───────────────────────────────────────────────────────────────── */
function LogoMarquee() {
  const logos = ["Linear", "Notion", "Vercel", "Stripe", "Arc", "Supabase", "Framer", "OpenAI"];
  return (
    <section className="py-12 border-y border-border/60 overflow-hidden bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-8">
          Trusted by teams at
        </p>
        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: [0, -1200] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-16 whitespace-nowrap"
          >
            {[...logos, ...logos, ...logos].map((logo, i) => (
              <span key={i} className="text-2xl font-semibold text-muted-foreground/50 hover:text-foreground transition-colors">
                {logo}
              </span>
            ))}
          </motion.div>
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SERVICES GRID
   ───────────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    icon: Bot,
    title: "AI Agents & Copilots",
    desc: "Custom autonomous agents that automate workflows, route decisions, and scale your ops team.",
    tags: ["Multi-agent", "Orchestration", "Function calling"],
  },
  {
    icon: Brain,
    title: "LLM Integration",
    desc: "Production-grade RAG pipelines, fine-tuning, and on-prem deployment of frontier models.",
    tags: ["RAG", "Fine-tuning", "Evaluation"],
  },
  {
    icon: Code2,
    title: "AI-Native Products",
    desc: "End-to-end product development with AI at the core — not bolted on afterwards.",
    tags: ["MVP", "Full-stack", "Design"],
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    desc: "Intelligent process automation that combines RPA, LLMs, and your existing tool stack.",
    tags: ["RPA", "Integrations", "Pipelines"],
  },
  {
    icon: Database,
    title: "Data & Infrastructure",
    desc: "Vector databases, observability, and the plumbing that keeps your AI reliable at scale.",
    tags: ["Vector DB", "Observability", "MLOps"],
  },
  {
    icon: Shield,
    title: "AI Security & Governance",
    desc: "Policy, compliance, and guardrails for regulated industries deploying generative AI.",
    tags: ["SOC 2", "Guardrails", "Audit"],
  },
];

function ServicesGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-mono tracking-widest text-muted-foreground">SERVICES</span>
          <h2 className="font-helvetica text-3xl md:text-5xl font-semibold tracking-tight mt-3">
            Everything you need to <span className="font-moralana" style={GT}>ship AI</span>.
          </h2>
          <p className="text-muted-foreground mt-4">
            Six core capabilities. Delivered by senior engineers who've shipped AI in production.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className="group relative rounded-2xl border border-border bg-card/40 p-6 overflow-hidden hover:border-primary/30 transition-colors cursor-default"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(400px circle at top left, rgba(220,38,38,0.06), transparent 70%)" }}
                />
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl border border-border flex items-center justify-center mb-4"
                    style={{ background: "color-mix(in oklch, oklch(0.57 0.22 25) 8%, transparent)" }}>
                    <Icon className="w-5 h-5" style={{ color: "oklch(0.57 0.22 25)" }} strokeWidth={1.6} />
                  </div>
                  <h3 className="font-helvetica font-semibold text-lg tracking-tight">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {s.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full border border-border bg-background/50 text-muted-foreground font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   METRICS BANNER
   ───────────────────────────────────────────────────────────────── */
const METRICS = [
  { value: 120, suffix: "+", label: "AI projects shipped" },
  { value: 80,  suffix: "+", label: "Enterprise clients" },
  { value: 12,  suffix: "w",  label: "Median time-to-MVP" },
  { value: 99,  suffix: "%", label: "Production uptime" },
];

function MetricsBanner() {
  return (
    <section className="py-20 border-y border-border/60 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
        {METRICS.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="text-center"
          >
            <p className="font-helvetica text-4xl md:text-6xl font-semibold tracking-tight" style={GT}>
              <CountUp end={m.value} suffix={m.suffix} />
            </p>
            <p className="text-xs md:text-sm text-muted-foreground mt-2">{m.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PROCESS TIMELINE
   ───────────────────────────────────────────────────────────────── */
const PROCESS = [
  { week: "Week 1-2",   title: "Discovery & scope",     desc: "Workshops with stakeholders. We map the problem, success metrics, and architecture." },
  { week: "Week 3-4",   title: "Prototype & validate",  desc: "Build a proof-of-concept. Real models, real data, shipped to real users for feedback." },
  { week: "Week 5-8",   title: "Production build",      desc: "Senior engineers embedded with your team. CI/CD, observability, and security baked in." },
  { week: "Week 9-12",  title: "Launch & hand-off",     desc: "Deploy to production. Transfer knowledge, document runbooks, and enable your team." },
];

function ProcessTimeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section ref={ref} className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-xs font-mono tracking-widest text-muted-foreground">HOW WE WORK</span>
          <h2 className="font-helvetica text-3xl md:text-5xl font-semibold tracking-tight mt-3 max-w-2xl">
            From idea to production in <span className="font-moralana" style={GT}>12 weeks</span>.
          </h2>
        </motion.div>

        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-px" />
          <motion.div
            initial={{ height: 0 }}
            animate={inView ? { height: "100%" } : {}}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute left-6 md:left-1/2 top-0 w-px -translate-x-px"
            style={{ background: BG }}
          />

          {PROCESS.map((step, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`relative flex md:items-center mb-12 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className={`flex-1 pl-16 md:pl-0 ${isEven ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                  <span className="text-xs font-mono text-muted-foreground tracking-widest">{step.week}</span>
                  <h3 className="font-helvetica text-xl font-semibold tracking-tight mt-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{step.desc}</p>
                </div>

                {/* dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-background shadow-lg z-10" style={{ background: BG }} />

                <div className="hidden md:block flex-1" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   TECH STACK
   ───────────────────────────────────────────────────────────────── */
const STACK = [
  { name: "OpenAI",    desc: "GPT-4o, o1" },
  { name: "Anthropic", desc: "Claude Opus" },
  { name: "Meta",      desc: "Llama 3.3" },
  { name: "Google",    desc: "Gemini 2.0" },
  { name: "Mistral",   desc: "Mixtral" },
  { name: "Pinecone",  desc: "Vector DB" },
  { name: "LangChain", desc: "Orchestration" },
  { name: "Vercel",    desc: "Edge deploy" },
  { name: "Supabase",  desc: "Postgres + pgvector" },
  { name: "Modal",     desc: "GPU inference" },
  { name: "Stripe",    desc: "Billing" },
  { name: "AWS",       desc: "Infrastructure" },
];

function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="py-28 px-6 bg-muted/20 border-y border-border/60">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-xs font-mono tracking-widest text-muted-foreground">THE STACK</span>
          <h2 className="font-helvetica text-3xl md:text-5xl font-semibold tracking-tight mt-3">
            Best-in-class <span className="font-moralana" style={GT}>tools</span>, no lock-in.
          </h2>
          <p className="text-muted-foreground mt-4">
            We pick the right tool for the job. Open-source first, proprietary when it matters.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {STACK.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={{ y: -2, borderColor: "rgba(220,38,38,0.4)" }}
              className="rounded-xl border border-border bg-background p-4 text-center transition-colors"
            >
              <p className="font-helvetica font-semibold text-sm tracking-tight">{tool.name}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{tool.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   TESTIMONIAL
   ───────────────────────────────────────────────────────────────── */
function Testimonial() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="text-8xl font-moralana leading-none opacity-20 absolute -top-4 -left-4" style={GT}>"</div>
          <p className="font-helvetica text-2xl md:text-4xl font-medium tracking-tight leading-tight relative">
            They shipped our AI agent in 9 weeks. Three months after launch, it's handling{" "}
            <span className="font-moralana" style={GT}>62% of support tickets</span> autonomously.
            The ROI was immediate.
          </p>
          <footer className="flex items-center gap-4 mt-10">
            <div className="w-12 h-12 rounded-full shrink-0" style={{ background: BG }} />
            <div>
              <p className="font-semibold text-sm">Priya Sharma</p>
              <p className="text-xs text-muted-foreground">VP Engineering · Lumen Health</p>
            </div>
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PRICING (transparent)
   ───────────────────────────────────────────────────────────────── */
const TIERS = [
  {
    name: "Sprint",
    price: "$25k",
    period: "/ 4 weeks",
    desc: "For founders validating an AI idea fast.",
    features: ["Prototype in 4 weeks", "1 senior engineer", "Weekly demos", "Code ownership"],
    cta: "Start a sprint",
  },
  {
    name: "Build",
    price: "$90k",
    period: "/ 12 weeks",
    desc: "Production AI product from idea to launch.",
    features: ["Full team (3-4 engineers)", "Product design included", "CI/CD + observability", "Knowledge transfer", "3-month warranty"],
    cta: "Book a call",
    featured: true,
  },
  {
    name: "Embed",
    price: "Custom",
    period: "ongoing",
    desc: "Senior AI engineers embedded in your team.",
    features: ["Dedicated squad", "Flexible scope", "SLA-backed", "Priority response"],
    cta: "Talk to us",
  },
];

function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-mono tracking-widest text-muted-foreground">PRICING</span>
          <h2 className="font-helvetica text-3xl md:text-5xl font-semibold tracking-tight mt-3">
            Transparent <span className="font-moralana" style={GT}>pricing</span>, no surprises.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl border p-6 flex flex-col ${
                tier.featured
                  ? "border-primary/50 bg-card shadow-[0_8px_40px_-8px_rgba(220,38,38,0.2)]"
                  : "border-border bg-card/40"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-semibold text-white uppercase tracking-wider" style={{ background: BG }}>
                  Most popular
                </div>
              )}
              <h3 className="font-helvetica text-xl font-semibold">{tier.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{tier.desc}</p>
              <div className="mt-6 mb-6 flex items-baseline gap-1">
                <span className="font-helvetica text-4xl font-bold tracking-tight" style={tier.featured ? GT : {}}>
                  {tier.price}
                </span>
                <span className="text-xs text-muted-foreground">{tier.period}</span>
              </div>
              <ul className="space-y-2 mb-6 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-foreground/80">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "oklch(0.57 0.22 25)" }} strokeWidth={2} />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant={tier.featured ? "default" : "outline"}
                className="rounded-full w-full"
                style={tier.featured ? { background: BG } : {}}
              >
                {tier.cta}
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FAQ
   ───────────────────────────────────────────────────────────────── */
const FAQS = [
  { q: "How fast can you start?", a: "Most engagements kick off within 1-2 weeks of signing. For urgent projects, we can assemble a team in 72 hours." },
  { q: "Do you work with non-technical founders?", a: "Absolutely. Half our clients are non-technical. We handle the tech side end-to-end while keeping you informed." },
  { q: "Who owns the code?", a: "You do — 100%. Full IP transfer on day one. We sign NDAs and work on your GitHub org." },
  { q: "What if the models change?", a: "Our architecture is provider-agnostic. We build abstraction layers so swapping GPT for Claude is a config change, not a rewrite." },
  { q: "Do you offer post-launch support?", a: "Yes. All projects include a 3-month warranty. We also offer ongoing retainers for teams that want dedicated AI engineering." },
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="py-28 px-6 bg-muted/20 border-t border-border/60">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-mono tracking-widest text-muted-foreground">FAQ</span>
          <h2 className="font-helvetica text-3xl md:text-5xl font-semibold tracking-tight mt-3">
            Questions? <span className="font-moralana" style={GT}>Answers</span>.
          </h2>
        </div>

        <div className="space-y-2">
          {FAQS.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-xl border border-border bg-background overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-card/60 transition-colors"
              >
                <span className="font-helvetica font-medium">{f.q}</span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  className="text-xl text-muted-foreground shrink-0"
                >
                  +
                </motion.span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   CTA
   ───────────────────────────────────────────────────────────────── */
function CTA() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-border bg-card overflow-hidden p-12 md:p-20 text-center"
        >
          {/* glow */}
          <div className="absolute inset-0 opacity-40 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(220,38,38,0.15), transparent 70%)" }} />

          <div className="relative">
            <Sparkles className="w-8 h-8 mx-auto mb-6" style={{ color: "oklch(0.57 0.22 25)" }} />
            <h2 className="font-helvetica text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
              Ready to ship <span className="font-moralana" style={GT}>AI that works</span>?
            </h2>
            <p className="text-muted-foreground mt-6 max-w-xl mx-auto">
              30-minute call. We'll scope your project, pick the right stack, and tell you honestly if we're the right fit.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
              <Button size="lg" className="rounded-full px-6 h-12" style={{ background: BG }}>
                Book a strategy call <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-6 h-12">
                hello@nexa.studio
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────────── */
export default function AIStudioPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Hero />
      <LogoMarquee />
      <ServicesGrid />
      <MetricsBanner />
      <ProcessTimeline />
      <TechStack />
      <Testimonial />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
