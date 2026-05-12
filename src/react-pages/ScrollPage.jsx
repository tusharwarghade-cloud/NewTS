import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ChevronDown, Shield, Lightbulb, Leaf, Layers,
  Calendar, MapPin, Plus, Minus, Send,
} from "lucide-react";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

/* ── Brand ──────────────────────────────────────────────────────── */
const BG   = "linear-gradient(135deg, oklch(0.57 0.22 25) 0%, oklch(0.52 0.24 292) 100%)";
const GLOW = "0 0 28px color-mix(in oklch, oklch(0.57 0.22 25) 32%, transparent)";
const GT   = { backgroundImage: BG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };

/* ── Data ───────────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    name: "Jarvis",
    tagline: "Investing Powered by AI",
    desc: "AI-neural network design analysing 300 million data points per market across 7+ years of legacy.",
    image: "/images/111.jpg",
    category: "Fintech · AI Advisory",
  },
  {
    name: "TransBnk",
    tagline: "Open Finance Infrastructure",
    desc: "Comprehensive banking infrastructure enabling account aggregation, escrow management, and real-time reconciliation.",
    image: "/images/222.jpg",
    category: "Banking · Escrow",
  },
  {
    name: "EVJoints",
    tagline: "Unified EV Charging App",
    desc: "End-to-end EV charging network — from station discovery and booking to fleet analytics and smart grid optimization.",
    image: "/images/333.jpg",
    category: "CleanTech · Mobility",
  },
];

const VALUES = [
  { icon: Shield,    title: "Quality Guaranteed",       desc: "Every product is rigorously tested — 100% quality-controlled before delivery." },
  { icon: Lightbulb, title: "Innovation & Research",    desc: "We collaborate with leading institutions and researchers to push technological boundaries." },
  { icon: Leaf,      title: "Sustainability",           desc: "Committed to reducing environmental impact through efficient, green engineering." },
  { icon: Layers,    title: "Complete Solutions",        desc: "Simple, powerful solutions — built for developers and end-users alike." },
];

const EVENTS = [
  { title: "AI in Fintech — Building the Next Advisory Layer", date: "12 June 2026", location: "Mumbai, India", desc: "Deep-dive into neural network architectures powering modern investment advisory platforms." },
  { title: "Open Finance Summit 2026", date: "9–10 September 2026", location: "Dubai, UAE", desc: "Transaction banking, escrow management, and the future of open finance infrastructure." },
  { title: "EV Infrastructure Masterclass", date: "20 November 2026", location: "Bangalore, India", desc: "Designing scalable EV charging networks — from hardware integration to fleet analytics." },
  { title: "Full Stack Product Engineering", date: "26–28 November 2026", location: "Bhopal, India", desc: "End-to-end product building — from MVP architecture to production-grade deployment." },
];

/* ── Reveal animation ──────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   1. HERO — Full-screen with scroll indicator
═══════════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 pointer-events-none">
        <video
          src="/images/lab.mp4"
          autoPlay muted loop playsInline
          className="w-full h-full object-cover opacity-40"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.h1
          className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Human, beyond{" "}
          <span style={{ ...GT, WebkitTextFillColor: undefined, color: "transparent", backgroundImage: BG, WebkitBackgroundClip: "text", backgroundClip: "text" }}>
            technology
          </span>
        </motion.h1>
        <motion.p
          className="text-white/60 text-lg sm:text-xl max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          We build products that transform industries — powered by innovation, driven by purpose.
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-6 h-6 text-white/50" />
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   2. PRODUCT CAROUSEL — Horizontal scroll
═══════════════════════════════════════════════════════════════════ */
function ProductsCarousel() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.666%"]);

  return (
    <section ref={containerRef} style={{ height: "300vw", position: "relative" }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        {/* Section label */}
        <div className="absolute top-8 left-8 z-10">
          <span className="text-white/40 text-xs font-mono tracking-widest uppercase">Featured Products</span>
        </div>

        <motion.div
          className="flex h-full"
          style={{ width: "300vw", x, willChange: "transform" }}
        >
          {PRODUCTS.map((p, i) => (
            <div key={p.name} className="relative flex-shrink-0 h-full w-screen">
              <img
                src={p.image}
                alt={p.name}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Product info */}
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-16 z-10">
                <motion.span
                  className="inline-block text-white/50 text-xs font-mono uppercase tracking-widest mb-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {p.category}
                </motion.span>
                <h2 className="text-4xl sm:text-6xl font-bold text-white mb-2 tracking-tight">{p.name}</h2>
                <p className="text-white/70 text-lg sm:text-xl font-light mb-2">{p.tagline}</p>
                <p className="text-white/50 text-sm max-w-lg leading-relaxed">{p.desc}</p>
                <a href="/stalwarts-lab" className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-white hover:gap-3 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Slide counter */}
              <div className="absolute bottom-8 right-8 sm:right-16 z-10 text-white/30 font-mono text-sm">
                {String(i + 1).padStart(2, "0")} / {String(PRODUCTS.length).padStart(2, "0")}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   3. ABOUT — Company intro with images
═══════════════════════════════════════════════════════════════════ */
function AboutSection() {
  return (
    <section className="py-28 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">About</span>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-foreground leading-tight">
            We are{" "}
            <span style={GT} className="font-semibold">TechStalwarts</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal delay={0.15}>
            <p className="text-muted-foreground text-lg leading-relaxed">
              TechStalwarts is a dynamic team of industry experts committed to achieving exceptionally great results.
              We combine deep domain expertise in AI and financial technology with a product-first mindset — building
              solutions that genuinely move businesses forward.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed mt-4">
              From Jarvis to TransBnk to EVJoints, we've built products used by hundreds of thousands of people
              across 5 countries. We don't just develop — we co-create, co-own, and co-scale.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="grid grid-cols-3 gap-3 h-72">
              <div className="rounded-xl overflow-hidden">
                <img src="/images/444.jpg" alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="rounded-xl overflow-hidden translate-y-6">
                <img src="/images/555.jpg" alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="rounded-xl overflow-hidden -translate-y-3">
                <img src="/images/333.jpg" alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   4. VALUES — Four pillars with icons
═══════════════════════════════════════════════════════════════════ */
function ValuesSection() {
  return (
    <section className="py-28 px-6 border-t border-border bg-background">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">Why Us</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-light tracking-tight text-foreground">
            Built on <span style={GT} className="font-semibold">Principle</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.1}>
              <div className="flex flex-col gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: BG, boxShadow: GLOW }}>
                  <v.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   5. EVENTS — Expandable accordion
═══════════════════════════════════════════════════════════════════ */
function EventItem({ event, index }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={index * 0.08}>
      <div className={`border-b border-border ${open ? "" : "hover:border-primary/20"} transition-colors`}>
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center justify-between gap-4 py-6 text-left"
        >
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-foreground pr-4 leading-snug">{event.title}</h3>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {event.date}</span>
              <span className="inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {event.location}</span>
            </div>
          </div>
          <div
            className="w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all"
            style={open ? { background: BG, borderColor: "transparent" } : { borderColor: "var(--color-border)" }}
          >
            {open
              ? <Minus className="w-3.5 h-3.5 text-white" />
              : <Plus className="w-3.5 h-3.5 text-muted-foreground" />
            }
          </div>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-sm text-muted-foreground leading-relaxed pb-6">{event.desc}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

function EventsSection() {
  return (
    <section className="py-28 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">Events & Training</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-light tracking-tight text-foreground">
            Upcoming <span style={GT} className="font-semibold">Sessions</span>
          </h2>
        </Reveal>

        <div className="mt-14">
          {EVENTS.map((e, i) => (
            <EventItem key={i} event={e} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   6. NEWSLETTER CTA
═══════════════════════════════════════════════════════════════════ */
function NewsletterSection() {
  return (
    <section className="py-28 px-6 border-t border-border bg-background">
      <div className="max-w-2xl mx-auto text-center">
        <Reveal>
          <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">Stay Updated</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-light tracking-tight text-foreground mb-4">
            Subscribe <span style={GT} className="font-semibold">Now</span>
          </h2>
          <p className="text-muted-foreground text-sm mb-8">
            Receive information on our products, projects, and upcoming events.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Your name"
              className="flex-1 px-4 py-3 rounded-full border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-3 rounded-full border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <Button
              type="submit"
              className="rounded-full gap-2 font-semibold text-white border-none px-6"
              style={{ background: BG, boxShadow: GLOW }}
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════ */
export default function ScrollPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <ProductsCarousel />
      <AboutSection />
      <ValuesSection />
      <EventsSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
