import { useState, useEffect, useRef } from "react";
import Footer from "@/components/Footer";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AuroraBg from "@/components/AuroraBg";
import { ArrowRight, Target, Lightbulb, Shield } from "lucide-react";

/* ── Brand constants ─────────────────────────────────────────── */
const BG   = "linear-gradient(135deg, oklch(0.57 0.22 25) 0%, oklch(0.52 0.24 292) 100%)";
const GLOW = "0 0 28px color-mix(in oklch, oklch(0.57 0.22 25) 30%, transparent)";
const GT   = { background: BG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };

/* ── FadeIn helper ───────────────────────────────────────────── */
function FadeIn({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useRef(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !inView.current) { inView.current = true; setVisible(true); } }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 24 }} animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >{children}</motion.div>
  );
}

/* ─── 1. ContainerScroll (Aceternity faithful) ───────────────── */
function ContainerScroll({ titleComponent, children }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const rotate    = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale     = useTransform(scrollYProgress, [0, 1], isMobile ? [0.7, 0.9] : [1.05, 1]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      ref={containerRef}
      className="h-[60rem] md:h-[80rem] flex items-start justify-center relative p-2 md:p-20"
    >
      <div className="py-10 md:py-40 w-full relative" style={{ perspective: "1000px" }}>
        {/* Title */}
        <motion.div
          style={{ translateY: translate }}
          className="max-w-5xl mx-auto text-center px-6"
        >
          {titleComponent}
        </motion.div>

        {/* Card */}
        <motion.div
          style={{
            rotateX: rotate,
            scale,
            boxShadow: "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
          }}
          className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-2 bg-[#222222] rounded-[30px] shadow-2xl"
        >
          <div className="h-full w-full overflow-hidden rounded-2xl">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── 2. Timeline (Aceternity faithful) ──────────────────────── */
function Timeline({ data }) {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) setHeight(ref.current.getBoundingClientRect().height);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });
  const heightTransform  = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full font-sans md:px-10" ref={containerRef}>
      {/* Section header (Aceternity includes it inside the timeline) */}
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <FadeIn>
          <Badge variant="outline" className="mb-4 rounded-full border-primary/30 bg-primary/5 uppercase tracking-widest text-xs font-semibold" style={GT}>
            Our Track Record
          </Badge>
          <h2 className="text-lg md:text-4xl font-bold text-foreground max-w-4xl mb-4">
            Seven Years of Consistent Delivery
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-sm">
            From a focused Mumbai team to a global engineering firm — built on outcomes, not promises.
          </p>
        </FadeIn>
      </div>

      {/* Timeline items */}
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-40 md:gap-10">
            {/* Sticky year + dot */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              {/* Dot */}
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-background flex items-center justify-center">
                <div className="h-4 w-4 rounded-full border border-border bg-card p-2"
                  style={{ boxShadow: "0 0 0 4px color-mix(in oklch, oklch(0.57 0.22 25) 15%, transparent)" }}
                />
              </div>
              {/* Year label */}
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-foreground/30">
                {item.title}
              </h3>
            </div>

            {/* Content */}
            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-foreground/30">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        {/* Vertical track line */}
        <div
          style={{ height: height + "px" }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,transparent_0%,oklch(0.20_0.01_30)_10%,oklch(0.20_0.01_30)_90%,transparent_100%)]"
        >
          {/* Animated fill */}
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform, background: "linear-gradient(to bottom, oklch(0.57 0.22 25), oklch(0.52 0.24 292))" }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Journey card component ─────────────────────────────────── */
function JourneyCard({ heading, body, img, isNow = false }) {
  return (
    <FadeIn>
      <div
        className="rounded-2xl border border-border bg-card/60 overflow-hidden backdrop-blur-sm"
        style={isNow ? { borderColor: "color-mix(in oklch, oklch(0.57 0.22 25) 30%, transparent)" } : {}}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={img}
            alt={heading}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7) 100%)" }} />
        </div>
        {/* Text */}
        <div className="p-6 md:p-8">
          {isNow ? (
            <div className="flex items-center gap-2 mb-2">
              <h4 className="text-lg font-bold text-foreground">{heading}</h4>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ background: BG }}>Now</span>
            </div>
          ) : (
            <h4 className="text-lg font-bold text-foreground mb-2">{heading}</h4>
          )}
          <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
        </div>
      </div>
    </FadeIn>
  );
}

/* ─── Timeline data ──────────────────────────────────────────── */
const JOURNEY = [
  {
    title: "2018",
    content: (
      <JourneyCard
        heading="Founded on Execution"
        img="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80"
        body="TechStalwarts launches with a clear mandate — build enterprise-grade software that solves real problems, fast. No fluff. Pure delivery."
      />
    ),
  },
  {
    title: "2019",
    content: (
      <JourneyCard
        heading="Scaling the Client Base"
        img="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=900&q=80"
        body="We expand capabilities, lock in strategic partnerships, and drive repeatable delivery across verticals. Foundations for long-term scale are set."
      />
    ),
  },
  {
    title: "2020",
    content: (
      <JourneyCard
        heading="Resilient Through Change"
        img="https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=900&q=80"
        body="In a year of global uncertainty, we embrace remote work, strengthen digital operations, and continue delivering consistent value to clients worldwide."
      />
    ),
  },
  {
    title: "2021",
    content: (
      <JourneyCard
        heading="Scaling Innovation"
        img="https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80"
        body="We establish ourselves as a trusted name in software development, continuously upgrading our skills and solutions to meet emerging technology needs."
      />
    ),
  },
  {
    title: "2022",
    content: (
      <JourneyCard
        heading="A Year of Breakthroughs"
        img="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80"
        body="We introduce impactful new solutions, grow internationally, support tech communities, and strengthen our leadership with sustainability-focused thinking."
      />
    ),
  },
  {
    title: "2023",
    content: (
      <JourneyCard
        heading="Expanding Horizons"
        img="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80"
        body="With a strong foundation and rising momentum, we embrace new opportunities, stay curious, and push forward with the same passion that launched our journey."
      />
    ),
  },
  {
    title: "2024",
    content: (
      <JourneyCard
        heading="The AI Transformation Era"
        img="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&q=80"
        body="2024 marks a decisive shift as we integrate AI deeply into our products, workflows, and solutions — accelerating innovation and helping clients scale faster than ever."
        isNow
      />
    ),
  },
];

/* ─── Team data ──────────────────────────────────────────────── */
const TEAM = [
  {
    name: "Vijay Pawar",
    title: "Co-Founder",
    role: "Head Technology",
    img: "/images/vijay.png",
  },
  {
    name: "Shailesh Mehta",
    title: "Co-Founder",
    role: "Head Business Operations",
    img: "/images/shailesh.png",
  },
  {
    name: "Prashant More",
    title: "Co-Founder",
    role: "Startups & Enterprise Consultant",
    img: "/images/prashant.png",
  },
];

/* ─── Sections ───────────────────────────────────────────────── */
function HeroSection() {
  return (
    <div className="relative pt-16 bg-background overflow-hidden">
      <ContainerScroll
        titleComponent={
          <div className="mb-8">
            <Badge
              variant="outline"
              className="mb-6 rounded-full border-primary/30 bg-primary/5 uppercase tracking-widest text-xs font-semibold"
              style={GT}
            >
              Who We Are
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground leading-[1.08] tracking-tight mb-5">
              We Build Software That<br />
              <span style={GT}>Drives Real Business Outcomes</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              TechStalwarts is a Mumbai-based product engineering firm. We build, scale, and modernize digital products for startups, SMBs, and enterprises — accelerating time-to-market and enabling measurable growth since 2018.
            </p>
          </div>
        }
      >
        {/* Full-bleed hero image */}
        <div className="relative w-full h-full overflow-hidden bg-black">
          <img
            src="/images/about-hero.png"
            alt="Techstalwarts office culture"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Dark gradient overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(4,1,12,0.90) 0%, rgba(4,1,12,0.35) 55%, transparent 100%)" }}
          />
          {/* Bottom label row */}
          <div className="absolute bottom-0 left-0 right-0 px-8 pb-8 flex items-end justify-between">
            <div>
              <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Est. 2018 · Mumbai</p>
              <p className="text-white font-semibold text-lg leading-tight">
                Delivering Future-Ready<br />Software &amp; AI at Scale
              </p>
            </div>
            <div className="hidden md:flex gap-6 text-right">
              {[["200+", "Projects"], ["25+", "Startups"], ["$150M+", "Value Created"]].map(([val, lbl]) => (
                <div key={lbl}>
                  <div className="text-2xl font-bold tabular-nums" style={GT}>{val}</div>
                  <div className="text-[11px] text-white/50 mt-0.5">{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}

function JourneySection() {
  return (
    <section className="border-t border-border bg-background">
      <Timeline data={JOURNEY} />
    </section>
  );
}

/* ─── efferd grid feature cards ─────────────────────────────── */
const FEATURES = [
  {
    icon: Target,
    label: "Our Vision",
    text: "To be the global torchbearer in digital transformations, integrating innovative applications into the heart of your business processes.",
    accent: "oklch(0.57 0.22 25)",
    span: "md:col-span-2",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80",
  },
  {
    icon: Lightbulb,
    label: "Our Mission",
    text: "We believe in forging long-lasting partnerships, intertwining our success with yours. Your goals become our mission, and your triumphs, our pride.",
    accent: "oklch(0.52 0.24 292)",
    span: "md:col-span-1",
    img: null,
  },
  {
    icon: Shield,
    label: "Our Values",
    text: "We honour the trust you place in us by delivering consistently and acting with unwavering integrity.",
    accent: "oklch(0.55 0.23 130)",
    span: "md:col-span-1",
    img: null,
  },
  {
    icon: null,
    label: "250+ Team Members",
    text: "A diverse global team of engineers, designers, and strategists working with one unified mission.",
    accent: "oklch(0.57 0.22 25)",
    span: "md:col-span-2",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80",
  },
];

function ValuesSection() {
  return (
    <section className="border-t border-border py-24 bg-background relative overflow-clip">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full" style={{ width: "60%", height: "50%", left: "20%", top: "-5%", background: "radial-gradient(circle, oklch(0.57 0.22 25) 0%, transparent 70%)", filter: "blur(140px)", opacity: 0.05 }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <FadeIn className="text-center mb-14">
          <Badge variant="outline" className="mb-4 rounded-full border-primary/30 bg-primary/5 uppercase tracking-widest text-xs font-semibold" style={GT}>
            What Drives Us
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            It's Deeper than<br />
            <span style={GT}>What You Think!</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FEATURES.map(({ icon: Icon, label, text, accent, span, img }, i) => (
            <FadeIn key={label} delay={i * 0.08} className={span}>
              <div
                className="relative rounded-2xl border border-border bg-card overflow-hidden group h-full min-h-[220px]"
                style={{ "--accent": accent }}
              >
                {/* Background image (large cards only) */}
                {img && (
                  <>
                    <img src={img} alt={label} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-25 transition-opacity duration-500" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(4,1,12,0.85) 0%, rgba(4,1,12,0.5) 100%)" }} />
                  </>
                )}


                {/* Hover radial glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(500px circle at 0% 0%, color-mix(in oklch, ${accent} 10%, transparent), transparent 60%)` }}
                />

                <div className="relative p-8 flex flex-col h-full">
                  {/* Icon */}
                  {Icon && (
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 shrink-0"
                      style={{ background: `color-mix(in oklch, ${accent} 14%, transparent)`, border: `1px solid color-mix(in oklch, ${accent} 28%, transparent)` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: accent }} />
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-foreground mb-3">{label}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">{text}</p>

                  {/* Bottom right corner dot accent */}
                  <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full opacity-40" style={{ background: accent }} />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section className="border-t border-border py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <FadeIn className="text-center mb-16">
          <Badge variant="outline" className="mb-4 rounded-full border-primary/30 bg-primary/5 uppercase tracking-widest text-xs font-semibold" style={GT}>
            Leadership
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
            Meet the<br />
            <span style={GT}>Founders</span>
          </h2>
          <p className="text-muted-foreground text-base max-w-lg mx-auto">
            The visionaries behind Techstalwarts — driving innovation, building trust, and shaping the future of technology.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {TEAM.map(({ name, title, role, img }, i) => (
            <FadeIn key={name} delay={i * 0.12}>
              <div className="relative rounded-2xl border border-border bg-card overflow-hidden group text-center">
                {/* Photo */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={img}
                    alt={name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(4,1,12,0.7) 0%, transparent 60%)" }} />
                </div>

                {/* Info */}
                <div className="px-6 py-6">
                  <h3 className="text-lg font-bold text-foreground mb-1">{name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={GT}>{title}</p>
                  <p className="text-sm text-muted-foreground">{role}</p>
                </div>

                {/* Bottom border accent on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: BG }} />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ────────────────────────────────────────────────────── */
function CTASection() {
  return (
    <section className="page-grid py-24 border-t border-border">
      <div className="col-span-12 rounded-2xl overflow-hidden relative" style={{ border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 25%, transparent)", background: "var(--color-card)" }}>
        <AuroraBg variant="dark" />
        <div aria-hidden className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ zIndex: 1, backgroundImage: "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative px-4 sm:px-10 md:px-16 py-12 sm:py-16 md:py-20 flex flex-col lg:flex-row items-center justify-between gap-10" style={{ zIndex: 2 }}>
          <div className="max-w-xl text-center lg:text-left">
            <Badge variant="outline" className="mb-4 rounded-full border-primary/30 bg-primary/5 uppercase tracking-widest text-xs font-semibold" style={GT}>
              Get Started
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-foreground mb-4 leading-tight">
              Ready to Build the Impossible<br />
              <span style={GT}>with Next-Gen Innovation?</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-md mx-auto lg:mx-0">
              Take the next step — join us and turn your vision into reality with the power of innovation and expert guidance.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0 w-full lg:w-auto">
            <Button size="lg" className="rounded-full gap-2 group font-semibold text-white border-none w-full sm:min-w-52" style={{ background: BG, boxShadow: GLOW }}>
              Book an Appointment <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-border bg-card/60 text-foreground hover:bg-secondary w-full sm:min-w-52">
              Explore Our Work
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ─── Page export ────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <JourneySection />
      <ValuesSection />
      <TeamSection />
      <CTASection />
      <Footer />
    </div>
  );
}
