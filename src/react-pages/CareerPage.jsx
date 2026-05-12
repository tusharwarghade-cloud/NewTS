import { useState, useRef, createContext, useContext } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import Footer from "@/components/Footer";
import AuroraBg from "@/components/AuroraBg";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight, MapPin, Clock, Briefcase, ChevronRight, Search,
  Users, Zap, TrendingUp, Heart, Globe, Shield, Coffee, Laptop,
  GraduationCap, Award, Code2, BrainCircuit, BarChart3, UserCheck,
  CheckCircle2, Building2, Sparkles,
} from "lucide-react";
import { JOBS } from "@/data/jobs";

/* ── Brand ──────────────────────────────────────────────────────── */
const BG   = "linear-gradient(135deg, oklch(0.57 0.22 25) 0%, oklch(0.52 0.24 292) 100%)";
const GLOW = "0 0 28px color-mix(in oklch, oklch(0.57 0.22 25) 32%, transparent)";
const GT   = { backgroundImage: BG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };

function GradientDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute", overflow: "hidden" }} aria-hidden>
      <defs>
        <linearGradient id="career-icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
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

/* ── Animated Video on Scroll (YoucefBnm) ───────────────────────── */
const _VidCtx = createContext(null);

function _ContainerScroll({ children, className }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end end"] });
  return (
    <_VidCtx.Provider value={{ scrollYProgress }}>
      <div ref={ref} className={`relative w-full${className ? ` ${className}` : ""}`}>{children}</div>
    </_VidCtx.Provider>
  );
}

function _ContainerSticky({ children, className }) {
  return (
    <div className={`sticky left-0 top-0 min-h-svh w-full${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
}

function _ContainerAnimated({ children, className }) {
  const { scrollYProgress } = useContext(_VidCtx);
  const y = useTransform(scrollYProgress, [0.2, 0.8], [80, 0]);
  return (
    <motion.div
      className={className}
      initial={{ filter: "blur(10px)", opacity: 0 }}
      whileInView={{ filter: "blur(0px)", opacity: 1 }}
      viewport={{ once: true }}
      style={{ y }}
      transition={{ type: "spring", stiffness: 100, damping: 16, mass: 0.75 }}
    >
      {children}
    </motion.div>
  );
}

function _ContainerInset({ children, className }) {
  const { scrollYProgress } = useContext(_VidCtx);
  const insetY      = useTransform(scrollYProgress, [0, 0.8], [35, 0]);
  const insetX      = useTransform(scrollYProgress, [0, 0.8], [35, 0]);
  const roundedness = useTransform(scrollYProgress, [0, 1],   [800, 16]);
  const clipPath    = useMotionTemplate`inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${roundedness}px)`;
  return (
    <motion.div
      className={`relative pointer-events-none overflow-hidden w-full${className ? ` ${className}` : ""}`}
      style={{ clipPath }}
    >
      {children}
    </motion.div>
  );
}

function _HeroVideo({ src, poster }) {
  const { scrollYProgress } = useContext(_VidCtx);
  const scale = useTransform(scrollYProgress, [0, 0.8], [0.7, 1]);
  return (
    <motion.video
      className="relative z-10 w-full h-full object-cover"
      autoPlay muted loop playsInline
      poster={poster}
      src={src}
      style={{ scale, maxHeight: "55vh" }}
    />
  );
}

/* ── Data ───────────────────────────────────────────────────────── */
const DEPARTMENTS = ["All", "Engineering", "AI & ML", "Design", "Data", "Sales", "Operations"];

const PERKS = [
  { icon: Laptop,        title: "Remote-Friendly",       desc: "Flexible remote and hybrid options — work from where you do your best work." },
  { icon: GraduationCap, title: "Learning Budget",        desc: "₹50,000 annual budget for courses, conferences, and certifications." },
  { icon: Heart,         title: "Health Insurance",       desc: "Comprehensive medical, dental, and vision coverage for you and your family." },
  { icon: Coffee,        title: "Team Offsites",          desc: "Quarterly team retreats and annual all-hands to connect, celebrate, and plan." },
  { icon: TrendingUp,    title: "Stock Options",          desc: "ESOPs for all full-time employees — own a piece of what you help build." },
  { icon: Globe,         title: "Global Exposure",        desc: "Work with enterprise clients across 18+ countries and diverse industries." },
  { icon: Award,         title: "Performance Bonuses",    desc: "Transparent performance reviews with merit bonuses twice a year." },
  { icon: Users,         title: "Mentorship Program",     desc: "Paired mentorship with senior engineers and industry leaders from day one." },
];

const VALUES = [
  {
    icon: Zap,
    title: "Move Fast, Build Right",
    desc: "We ship quickly without cutting corners — speed and quality aren't trade-offs here.",
  },
  {
    icon: Users,
    title: "People First",
    desc: "Great products come from happy, respected, and well-supported people. Always.",
  },
  {
    icon: Globe,
    title: "Think Global",
    desc: "We build for clients across the world — diverse perspectives make our work stronger.",
  },
  {
    icon: TrendingUp,
    title: "Grow Together",
    desc: "Your growth is our growth. We invest in careers, not just roles.",
  },
];

const PROCESS_STEPS = [
  { step: "01", title: "Apply Online",       desc: "Submit your resume and a short note on why you're a great fit." },
  { step: "02", title: "Initial Screen",     desc: "A 30-minute call with our talent team to get to know you." },
  { step: "03", title: "Technical Round",    desc: "A practical assessment or take-home project relevant to the role." },
  { step: "04", title: "Team Interview",     desc: "Meet your potential teammates and discuss approach and culture fit." },
  { step: "05", title: "Founder Round",      desc: "A final conversation with leadership to align on vision and expectations." },
  { step: "06", title: "Offer & Onboarding", desc: "Receive your offer and get a structured 30-day onboarding plan." },
];

const TEAM_PHOTOS = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80",
  "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=80",
  "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=80",
];

/* ── 1. Hero ─────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <_ContainerScroll className="h-[280vh]">
      <_ContainerSticky className="flex flex-col items-center justify-center gap-8 px-6 overflow-hidden bg-background">

        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 40%, color-mix(in oklch, oklch(0.57 0.22 25) 8%, transparent) 0%, transparent 65%)" }} />
        </div>

        <_ContainerAnimated className="relative z-20 text-center space-y-3 max-w-2xl">
          <GBadge>We're Hiring</GBadge>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-foreground leading-[1.1]">
            Build the Future<br /><span className="brand-text">With Us</span>
          </h1>
          <p className="text-muted-foreground text-base max-w-lg mx-auto leading-relaxed pt-1">
            Build enterprise-grade platforms across AI, fintech, and digital transformation — with a team that executes at scale and ships with precision.
          </p>
          <div className="flex items-center justify-center gap-4 sm:gap-8 pt-4 flex-wrap">
            {[["50+", "Open Roles"], ["200+", "Team Members"], ["18+", "Countries"], ["8+", "Years Building"]].map(([v, l]) => (
              <div key={l} className="text-center">
                <div className="text-xl font-bold leading-tight" style={GT}>{v}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </_ContainerAnimated>

        <_ContainerInset>
          <_HeroVideo
            src="https://assets.mixkit.co/videos/preview/mixkit-colleagues-working-together-in-an-office-40858-large.mp4"
            poster="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1800&q=80&sat=-30"
          />
        </_ContainerInset>

        <motion.button
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          className="relative z-20 flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
          style={{ background: BG, boxShadow: GLOW }}
          onClick={() => document.getElementById("open-positions")?.scrollIntoView({ behavior: "smooth" })}
        >
          View Open Positions <ArrowRight className="w-4 h-4" />
        </motion.button>

      </_ContainerSticky>
    </_ContainerScroll>
  );
}

/* ── 2. Values ───────────────────────────────────────────────────── */
function ValuesSection() {
  return (
    <section className="page-grid py-24 border-t border-border">
      <div className="col-span-12 mb-12 text-center">
        <GBadge>Our Culture</GBadge>
        <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
          What We <span className="brand-text">Stand For</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-base">
          We build teams where engineers, designers, and builders deliver the best work of their careers — and grow with every product they ship.
        </p>
      </div>
      {VALUES.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="col-span-12 sm:col-span-6 lg:col-span-3 rounded-2xl border border-border bg-card p-8 group hover:border-primary/30 transition-all relative overflow-hidden">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(400px circle at 50% 0%, color-mix(in oklch, oklch(0.57 0.22 25) 7%, transparent), transparent 70%)" }} />
          <div className="relative">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: "color-mix(in oklch, oklch(0.57 0.22 25) 12%, transparent)", border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 22%, transparent)" }}>
              <Icon className="w-5 h-5" stroke="url(#career-icon-grad)" strokeWidth={1.6} />
            </div>
            <h3 className="text-base font-bold text-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ── 3. Life at Techstalwarts ────────────────────────────────────── */
function LifeSection() {
  return (
    <section className="py-24 border-t border-border bg-card/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <GBadge>Life at Techstalwarts</GBadge>
          <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
            Where High-Ownership Teams <span className="brand-text">Build at Scale</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base">
            High-ownership, outcome-driven, and built for engineers who want their work to power real products at enterprise scale.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:grid-rows-2 sm:h-[480px]">
          <div className="sm:row-span-2 rounded-2xl overflow-hidden aspect-square sm:aspect-auto">
            <img src={TEAM_PHOTOS[0]} alt="" className="w-full h-full object-cover" style={{ filter: "saturate(0.75)" }} />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-square sm:aspect-auto">
            <img src={TEAM_PHOTOS[1]} alt="" className="w-full h-full object-cover" style={{ filter: "saturate(0.75)" }} />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-square sm:aspect-auto">
            <img src={TEAM_PHOTOS[2]} alt="" className="w-full h-full object-cover" style={{ filter: "saturate(0.75)" }} />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-square sm:aspect-auto">
            <img src={TEAM_PHOTOS[3]} alt="" className="w-full h-full object-cover" style={{ filter: "saturate(0.75)" }} />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-square sm:aspect-auto">
            <img src={TEAM_PHOTOS[4]} alt="" className="w-full h-full object-cover" style={{ filter: "saturate(0.75)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 4. Perks & Benefits ─────────────────────────────────────────── */
function PerksSection() {
  return (
    <section className="page-grid py-24 border-t border-border">
      <div className="col-span-12 mb-12 text-center">
        <GBadge>Perks & Benefits</GBadge>
        <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
          We Take Care of <span className="brand-text">Our People</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-base">
          Beyond competitive salaries — benefits and perks that make a real difference to your daily life and long-term growth.
        </p>
      </div>
      {PERKS.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="col-span-12 sm:col-span-6 lg:col-span-3 rounded-2xl border border-border bg-card/60 p-6 group hover:border-primary/30 hover:bg-card transition-all relative overflow-hidden">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "color-mix(in oklch, oklch(0.57 0.22 25) 10%, transparent)", border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 20%, transparent)" }}>
            <Icon className="w-5 h-5" stroke="url(#career-icon-grad)" strokeWidth={1.6} />
          </div>
          <h3 className="text-sm font-bold text-foreground mb-1.5">{title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
        </div>
      ))}
    </section>
  );
}

/* ── 5. Open Positions ───────────────────────────────────────────── */
function OpenPositionsSection() {
  const [activeDept, setActiveDept] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = JOBS.filter(j => {
    const matchDept = activeDept === "All" || j.dept === activeDept;
    const matchQuery = !query || j.title.toLowerCase().includes(query.toLowerCase()) || j.tags.some(t => t.toLowerCase().includes(query.toLowerCase()));
    return matchDept && matchQuery;
  });

  return (
    <section id="open-positions" className="py-24 border-t border-border bg-card/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <GBadge>Join the Team</GBadge>
          <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
            Open <span className="brand-text">Positions</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base">
            Find a role where your skills meet impact. We're growing across every team.
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              className="w-full rounded-xl border border-border bg-card pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              placeholder="Search roles or skills…"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
          {/* Department tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {DEPARTMENTS.map(d => (
              <button
                key={d}
                onClick={() => setActiveDept(d)}
                className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
                style={activeDept === d
                  ? { background: BG, color: "#fff", boxShadow: GLOW }
                  : { border: "1px solid var(--color-border)", background: "var(--color-card)", color: "var(--color-muted-foreground)" }
                }
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Job cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.length > 0 ? filtered.map((job) => (
            <div key={job.title} className="rounded-2xl border border-border bg-card p-6 group hover:border-primary/30 transition-all relative overflow-hidden cursor-pointer"
              onClick={() => { window.location.hash = `#career-job-${job.slug}`; window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(400px circle at 0% 0%, color-mix(in oklch, oklch(0.57 0.22 25) 5%, transparent), transparent 70%)" }} />
              <div className="relative">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "color-mix(in oklch, oklch(0.57 0.22 25) 10%, transparent)", border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 20%, transparent)" }}>
                      <job.icon className="w-5 h-5" stroke="url(#career-icon-grad)" strokeWidth={1.6} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground leading-tight">{job.title}</h3>
                      <span className="text-[11px] text-muted-foreground">{job.dept}</span>
                    </div>
                  </div>
                  <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ background: "color-mix(in oklch, oklch(0.52 0.24 292) 10%, transparent)", color: "oklch(0.65 0.18 292)", border: "1px solid color-mix(in oklch, oklch(0.52 0.24 292) 20%, transparent)" }}>
                    {job.mode}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">{job.desc}</p>
                <div className="flex items-center gap-1.5 flex-wrap mb-4">
                  {job.tags.map(t => (
                    <span key={t} className="text-[10px] font-medium px-2.5 py-1 rounded-full border border-border text-muted-foreground">{t}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" /> {job.type}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                    Apply <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-1 sm:col-span-2 py-16 text-center text-muted-foreground text-sm">
              No roles found matching your criteria — try a different filter.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── 6. Hiring Process ───────────────────────────────────────────── */
function HiringProcessSection() {
  return (
    <section className="page-grid py-24 border-t border-border">
      <div className="col-span-12 mb-12 text-center">
        <GBadge>Our Process</GBadge>
        <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
          How We <span className="brand-text">Hire</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-base">
          Structured, efficient, and transparent — our hiring process moves fast and respects your time at every stage.
        </p>
      </div>
      <div className="col-span-12">
        <div className="relative">
          <div className="absolute top-8 left-0 right-0 h-[2px] hidden lg:block" style={{ background: "linear-gradient(90deg, transparent 0%, oklch(0.20 0.01 30) 5%, oklch(0.20 0.01 30) 95%, transparent 100%)" }} />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4">
            {PROCESS_STEPS.map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-sm font-bold mb-5 relative z-10 transition-transform duration-300 group-hover:scale-110" style={{ background: BG, boxShadow: GLOW }}>
                  {step}
                </div>
                <h4 className="text-xs font-bold text-foreground mb-1.5 leading-tight">{title}</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 7. CTA ──────────────────────────────────────────────────────── */
function CTASection() {
  return (
    <section className="page-grid py-24 border-t border-border">
      <div className="col-span-12 rounded-2xl overflow-hidden relative" style={{ border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 25%, transparent)", background: "var(--color-card)" }}>
        <AuroraBg variant="dark" />
        <div aria-hidden className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ zIndex: 1, backgroundImage: "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative px-6 sm:px-12 lg:px-16 py-12 sm:py-16 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-10 text-center lg:text-left" style={{ zIndex: 2 }}>
          <div className="max-w-xl">
            <GBadge>Don't See Your Role?</GBadge>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-foreground mb-4 leading-tight">
              We're Always Looking<br /><span className="brand-text">For Great People</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-md mx-auto lg:mx-0">
              If you're exceptional at what you do but don't see a matching role, send us your profile. We'll reach out when the right opportunity opens.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0 w-full sm:w-auto">
            <Button size="lg" className="rounded-full gap-2 group font-semibold text-white border-none w-full sm:min-w-52" style={{ background: BG, boxShadow: GLOW }}
              onClick={() => window.location.hash = "#contact"}>
              Send Your Profile <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-border bg-card/60 text-foreground hover:bg-secondary w-full sm:min-w-52">
              Follow Us on LinkedIn
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Page ────────────────────────────────────────────────────────── */
export default function CareerPage() {
  return (
    <div className="bg-background">
      <GradientDefs />
      <HeroSection />
      <ValuesSection />
      <LifeSection />
      <PerksSection />
      <OpenPositionsSection />
      <HiringProcessSection />
      <CTASection />
      <Footer />
    </div>
  );
}
