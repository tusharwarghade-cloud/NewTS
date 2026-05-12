import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, BarChart3, Building2, Zap } from "lucide-react";
import gsap from "gsap";
import Footer from "@/components/Footer";
import { TubesBackground } from "@/components/ui/neon-flow";
import {
  ContainerScroll,
  ContainerStagger,
  ContainerAnimated,
  ContainerInset,
  useHeroScroll,
} from "@/components/ui/hero-video";

/* ── Shared brand gradient values ── */
const BG   = "linear-gradient(135deg, oklch(0.57 0.22 25) 0%, oklch(0.52 0.24 292) 100%)";
const GT   = { backgroundImage: BG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };
const GLOW = "0 0 28px color-mix(in oklch, oklch(0.57 0.22 25) 32%, transparent)";

/* ── Fade-in on scroll ── */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ── Code comment label ── */
function CodeLabel({ children }) {
  return (
    <span className="font-mono text-xs tracking-widest" style={{ color: "oklch(0.57 0.22 25)", opacity: 0.85 }}>
      {children}
    </span>
  );
}

/* ── Thin section divider ── */
function Divider() {
  return <div className="border-t border-border w-full" />;
}

/* ── Data ── */
const INDUSTRIES = [
  {
    num: "01", label: "Enterprise",
    projects: ["Digital Transformation Platform", "AI Governance Suite", "Legacy Modernisation"],
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=680&h=440&q=80",
  },
  {
    num: "02", label: "Banking & NBFC",
    projects: ["Core Banking System", "Loan Origination Engine", "Risk & Compliance Platform"],
    img: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=680&h=440&q=80",
  },
  {
    num: "03", label: "Fintech",
    projects: ["Payments Infrastructure", "Neobanking Platform", "Open Finance APIs"],
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=680&h=440&q=80",
  },
  {
    num: "04", label: "Real Estate",
    projects: ["AI-Native Lease Manager", "Investment Analytics", "PropTech CRM"],
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=680&h=440&q=80",
  },
  {
    num: "05", label: "Healthcare",
    projects: ["EHR Platform", "Telemedicine Suite", "Clinical AI Notes"],
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=680&h=440&q=80",
  },
  {
    num: "06", label: "Logistics & Retail",
    projects: ["Fleet Intelligence", "AI Supply Chain Ops", "POS & Inventory System"],
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=680&h=440&q=80",
  },
  {
    num: "07", label: "Travel & Mobility",
    projects: ["Multi-Modal Route Planner", "Mobility Analytics", "Booking & Payment Engine"],
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=680&h=440&q=80",
  },
  {
    num: "08", label: "Events & Exhibition",
    projects: ["Lead Capture System", "Networking Platform", "Digital Badge & Check-in"],
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=680&h=440&q=80",
  },
];

const FAQS = [
  {
    q: "What does 'AI transformation partner' actually mean?",
    a: "It means we don't sell you an AI strategy deck. We embed into your teams, design the architecture, build the systems, and stay accountable through deployment and scale — as if we're a co-founder, not a contractor.",
  },
  {
    q: "We already have a tech team. Why bring in TechStalwarts?",
    a: "Your internal team knows your domain. We bring the AI depth — ML pipelines, agent frameworks, vector infrastructure, fine-tuning, and production-grade deployment. We accelerate what your team can't do alone.",
  },
  {
    q: "What does AI-native actually mean for our product?",
    a: "It means intelligence is in the architecture, not bolted on. Agents, embeddings, reasoning loops, and retrieval pipelines are designed from day one — not patched in at the end of a sprint.",
  },
  {
    q: "How fast can you move on AI transformation?",
    a: "AI proof-of-concept in 48 hours. Production-ready AI feature in 3–6 weeks. Full AI transformation programme in 8–20 weeks depending on system complexity. We don't start with discovery; we start with code.",
  },
  {
    q: "Can you work with our legacy systems?",
    a: "Yes. Most transformations aren't greenfield — they're messy. We audit what you have, identify the highest-value AI integration points, and modernise incrementally without burning down what works.",
  },
  {
    q: "What kind of AI does TechStalwarts build?",
    a: "Intelligent document processing, AI agents and copilots, predictive analytics, recommendation engines, computer vision pipelines, voice AI, and custom LLM fine-tuning — all production-grade, not demo-ware.",
  },
];

/* ── Video overlay text — fades in on scroll, never fades back out ── */
function VideoOverlay() {
  const { scrollYProgress } = useHeroScroll();

  // One-way progress: only ever increases, so opacity never goes back to 0
  const maxProgress = useMotionValue(0);
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if (v > maxProgress.get()) maxProgress.set(v);
    });
  }, [scrollYProgress, maxProgress]);

  const opacity = useTransform(maxProgress, [0.05, 0.25], [0, 1]);
  const y       = useTransform(maxProgress, [0.05, 0.25], [24, 0]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ opacity, zIndex: 30 }}
    >
      {/* Dark veil */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.55) 100%)" }}
      />
      {/* Text */}
      <motion.p
        className="relative text-white text-center font-light text-xl sm:text-2xl lg:text-[28px] leading-relaxed tracking-tight max-w-2xl px-8"
        style={{ y }}
      >
        We don't hand you an AI strategy deck and disappear.
        <br className="hidden sm:block" />
        {" "}We embed into your teams, build the systems, and own the transformation —
        {" "}from first model to production at scale.
      </motion.p>
    </motion.div>
  );
}

/* ── Sections ── */

function useIsDark() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const check = () => setDark(document.documentElement.classList.contains("dark"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

function Hero() {
  const dark = useIsDark();

  return (
    <ContainerScroll className="bg-background text-center overflow-hidden">

      {/* Neon flow — dark mode only */}
      {dark && (
        <TubesBackground
          className="absolute inset-0 z-0"
          enableClickInteraction={false}
          tubeColors={["#DC2626", "#7C3AED", "#f97316"]}
          lightColors={["#7C3AED", "#DC2626", "#f97316", "#ec4899"]}
        />
      )}

      {/* Text content */}
      <ContainerStagger className="relative z-10 px-6 pt-28 pb-4 max-w-5xl mx-auto">
        <ContainerAnimated animation="top">
          <p className="font-mono text-xs tracking-widest mb-8 text-muted-foreground">
            // AI transformation partner
          </p>
        </ContainerAnimated>

        <ContainerAnimated animation="top">
          <h1 className="text-[38px] sm:text-5xl lg:text-[61px] font-light leading-[1.08] tracking-tight text-foreground whitespace-nowrap">
            We engineer{" "}
            <span style={GT}>AI transformation.</span>
          </h1>
        </ContainerAnimated>

        <ContainerAnimated animation="bottom">
          <h1 className="text-[38px] sm:text-5xl lg:text-[61px] font-light leading-[1.08] tracking-tight text-foreground">
            End-to-end.{" "}
            <span style={GT}>In production.</span>
          </h1>
        </ContainerAnimated>

        <ContainerAnimated animation="blur" className="mt-6">
          <p className="text-base sm:text-lg font-light text-muted-foreground max-w-xl mx-auto leading-relaxed">
            We embed into your teams, build the AI systems, and own the transformation — end-to-end, in production, not just in demos.
          </p>
        </ContainerAnimated>

        <ContainerAnimated animation="blur" className="mt-10 flex items-center justify-center gap-4">
          <a href="/contact">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg text-sm font-mono font-medium text-white"
              style={{ background: BG }}
            >
              Start Conversation <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </a>
          <a href="/services">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg text-sm font-mono font-medium border border-border text-foreground bg-secondary/60 backdrop-blur-sm"
            >
              Our Services
            </motion.button>
          </a>
        </ContainerAnimated>

        <ContainerAnimated animation="blur" className="mt-8">
          <p className="font-mono text-xs text-muted-foreground/50 tracking-widest">// scroll to explore</p>
          <div className="mt-3 mx-auto w-px h-8 bg-border" />
        </ContainerAnimated>
      </ContainerStagger>

      {/* Scroll-driven video reveal */}
      <ContainerInset className="mx-4 sm:mx-8 lg:mx-16" insetXRange={[32, 0]}>
        <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
          <video
            width="100%"
            height="100%"
            loop
            playsInline
            autoPlay
            muted
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/images/services.mp4" type="video/mp4" />
          </video>
          <VideoOverlay />
        </div>
      </ContainerInset>
    </ContainerScroll>
  );
}

/* ── Industry row (hover to reveal modal) ── */
function IndustryRow({ industry, index, setModal }) {
  return (
    <div
      className="group flex items-center justify-between border-t border-border py-8 cursor-pointer"
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
    >
      <div className="flex items-baseline gap-6">
        <span className="font-mono text-xs text-muted-foreground shrink-0">{industry.num}</span>
        <h3 className="uppercase text-3xl sm:text-4xl font-light tracking-tight text-foreground transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-3">
          {industry.label}
        </h3>
      </div>
      <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0" />
    </div>
  );
}

/* ── Cursor-following image modal ── */
const MODAL_H = 220;
const MODAL_W = 340;

const scaleAnim = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter:   { scale: 1, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
  closed:  { scale: 0, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] } },
};

function IndustryModal({ modal }) {
  const { active, index } = modal;
  const modalRef      = useRef(null);
  const cursorRef     = useRef(null);
  const cursorLblRef  = useRef(null);

  const xModal = useRef(null);
  const yModal = useRef(null);
  const xCur   = useRef(null);
  const yCur   = useRef(null);
  const xLbl   = useRef(null);
  const yLbl   = useRef(null);

  useEffect(() => {
    xModal.current = gsap.quickTo(modalRef.current,     "left", { duration: 0.8,  ease: "power3" });
    yModal.current = gsap.quickTo(modalRef.current,     "top",  { duration: 0.8,  ease: "power3" });
    xCur.current   = gsap.quickTo(cursorRef.current,    "left", { duration: 0.5,  ease: "power3" });
    yCur.current   = gsap.quickTo(cursorRef.current,    "top",  { duration: 0.5,  ease: "power3" });
    xLbl.current   = gsap.quickTo(cursorLblRef.current, "left", { duration: 0.45, ease: "power3" });
    yLbl.current   = gsap.quickTo(cursorLblRef.current, "top",  { duration: 0.45, ease: "power3" });
  }, []);

  useEffect(() => {
    const move = (e) => {
      xModal.current?.(e.clientX); yModal.current?.(e.clientY);
      xCur.current?.(e.clientX);   yCur.current?.(e.clientY);
      xLbl.current?.(e.clientX);   yLbl.current?.(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const state = active ? "enter" : "closed";

  return (
    <>
      {/* Image panel */}
      <motion.div
        ref={modalRef}
        variants={scaleAnim}
        initial="initial"
        animate={state}
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 50, pointerEvents: "none",
          width: MODAL_W, height: MODAL_H, overflow: "hidden", borderRadius: 12,
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: MODAL_H * INDUSTRIES.length,
            top: -index * MODAL_H,
            transition: "top 0.5s cubic-bezier(0.76,0,0.24,1)",
          }}
        >
          {INDUSTRIES.map((ind, i) => (
            <div
              key={i}
              style={{ width: "100%", height: MODAL_H, overflow: "hidden" }}
            >
              <img
                src={ind.img}
                alt={ind.label}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Cursor circle */}
      <motion.div
        ref={cursorRef}
        variants={scaleAnim}
        initial="initial"
        animate={state}
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 51, pointerEvents: "none",
          width: 72, height: 72, borderRadius: "50%",
          background: BG,
        }}
      />

      {/* Cursor label */}
      <motion.div
        ref={cursorLblRef}
        variants={scaleAnim}
        initial="initial"
        animate={state}
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 52, pointerEvents: "none",
          width: 72, height: 72, borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <span style={{ color: "#fff", fontSize: 11, fontFamily: "monospace", letterSpacing: "0.08em" }}>
          view
        </span>
      </motion.div>
    </>
  );
}

function Industries() {
  const [modal, setModal] = useState({ active: false, index: 0 });

  return (
    <section className="py-28 px-6 max-w-6xl mx-auto">
      <Divider />
      <div className="pt-16">
        <Reveal>
          <CodeLabel>// 01 — AI transformation across industries</CodeLabel>
          <h2 className="mt-5 text-4xl sm:text-5xl font-light tracking-tight text-foreground leading-tight">
            <span style={GT}>Industries</span> we're<br />transforming with AI.
          </h2>
        </Reveal>

        <div className="mt-14">
          {INDUSTRIES.map((ind, i) => (
            <IndustryRow key={ind.num} industry={ind} index={i} setModal={setModal} />
          ))}
          <div className="border-t border-border" />
        </div>
      </div>

      <IndustryModal modal={modal} />
    </section>
  );
}

function WhatMakesDifferent() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <Divider />
      <div className="pt-10 mb-4">
        <Reveal>
          <CodeLabel>// 03 — your AI transformation partner</CodeLabel>
        </Reveal>
      </div>

      <div className="overflow-hidden rounded-3xl">
        <div
          ref={containerRef}
          className="relative flex h-[80vh]"
          style={{
            backgroundImage: "url(/images/555.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          {/* Text overlay — moves on scroll via parallax y */}
          <motion.div
            className="absolute inset-0 z-10 flex h-full w-full flex-col justify-between p-10 sm:p-16"
            style={{ y }}
          >
            {/* Tagline — mix-blend-difference for high contrast */}
            <p className="w-full sm:w-[48%] self-end text-sm sm:text-base uppercase tracking-wide leading-relaxed font-light text-black">
              We don't sell AI — we build it<br className="hidden sm:block" />
              into the fabric of your business.<br className="hidden sm:block" />
              Accountable for outcomes, not<br className="hidden sm:block" />
              just deliverables.
            </p>
            {/* Heading — gradient on 'different', no blend mode so gradient shows correctly */}
            <h2 className="text-5xl sm:text-6xl lg:text-[5.5vw] font-light tracking-tight uppercase leading-none text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
              What makes<br />us <span style={GT}>different?</span>
            </h2>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WhoBuilds() {
  return (
    <section className="py-28 px-6 max-w-6xl mx-auto">
      <Divider />
      <div className="pt-16 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-start">
        <Reveal>
          <CodeLabel>// 04 — the AI team</CodeLabel>
          <h2 className="mt-5 text-4xl sm:text-5xl font-light tracking-tight text-foreground leading-tight">
            Who drives your<br /><span style={GT}>AI transformation?</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-lg font-light leading-relaxed" style={{ opacity: 0.6 }}>
            250+ AI engineers, ML researchers, and product builders across Mumbai, Bhopal, and Dubai.
          </p>
          <p className="mt-5 text-base font-light leading-relaxed" style={{ opacity: 0.45 }}>
            Not a bench of prompt engineers with a wrapper. A team of engineers who've designed AI pipelines, trained domain models, and shipped intelligent systems in regulated, high-stakes industries.
          </p>
          <p className="mt-5 text-base font-light leading-relaxed" style={{ opacity: 0.45 }}>
            We hire people who are embarrassed by demo-ware. If it doesn't hold up in production, it doesn't count.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

const ENGAGEMENTS = [
  {
    quote: "We build your first AI-native product from zero — intelligent by design, production-ready from day one.",
    type: "AI Product Engineering",
    focus: "0 → 1 AI Builds",
    client: "Startups",
  },
  {
    quote: "Your legacy stack isn't a liability — it's the foundation. We layer AI on top without breaking what works.",
    type: "AI-Led Modernisation",
    focus: "Legacy → AI-Native",
    client: "Mid-Market",
  },
  {
    quote: "Enterprise AI transformation at scale — not in sandboxes, but in core systems that move revenue.",
    type: "Enterprise AI Transformation",
    focus: "Scale & Intelligence",
    client: "Enterprise",
  },
];

function WhatWeAccept() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springCfg = { damping: 25, stiffness: 200 };
  const sx = useSpring(mouseX, springCfg);
  const sy = useSpring(mouseY, springCfg);
  const numberX = useTransform(sx, [-200, 200], [-20, 20]);
  const numberY = useTransform(sy, [-200, 200], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    }
  };

  const goNext = () => setActiveIndex((p) => (p + 1) % ENGAGEMENTS.length);
  const goPrev = () => setActiveIndex((p) => (p - 1 + ENGAGEMENTS.length) % ENGAGEMENTS.length);

  useEffect(() => {
    const t = setInterval(goNext, 6000);
    return () => clearInterval(t);
  }, []);

  const current = ENGAGEMENTS[activeIndex];

  return (
    <section className="py-28 px-6 max-w-6xl mx-auto">
      <Divider />
      <div className="pt-16">
        <Reveal>
          <CodeLabel>// 05 — AI transformation engagements</CodeLabel>
          <h2 className="mt-5 text-4xl sm:text-5xl font-light tracking-tight text-foreground leading-tight">
            How we drive your<br /><span style={GT}>AI transformation.</span>
          </h2>
        </Reveal>

        <div
          ref={containerRef}
          className="relative mt-16 w-full"
          onMouseMove={handleMouseMove}
        >
          {/* Oversized index number */}
          <motion.div
            className="absolute -left-4 top-1/2 -translate-y-1/2 text-[18rem] font-bold text-foreground/[0.03] select-none pointer-events-none leading-none tracking-tighter"
            style={{ x: numberX, y: numberY }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Layout */}
          <div className="relative flex">
            {/* Left vertical sidebar */}
            <div className="flex flex-col items-center justify-center pr-12 border-r border-border">
              <motion.span
                className="text-xs font-mono text-muted-foreground tracking-widest uppercase"
                style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Engagements
              </motion.span>
              <div className="relative h-28 w-px bg-border mt-8">
                <motion.div
                  className="absolute top-0 left-0 w-full bg-foreground origin-top"
                  animate={{ height: `${((activeIndex + 1) / ENGAGEMENTS.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 pl-12 py-10">
              {/* Client badge */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                  className="mb-8"
                >
                  <span className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground border border-border rounded-full px-3 py-1">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: BG }} />
                    {current.client}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Quote — word-by-word flip-in */}
              <div className="relative mb-12 min-h-[130px]">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={activeIndex}
                    className="text-3xl md:text-4xl font-light text-foreground leading-[1.2] tracking-tight"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {current.quote.split(" ").map((word, i) => (
                      <motion.span
                        key={i}
                        className="inline-block mr-[0.3em]"
                        variants={{
                          hidden: { opacity: 0, y: 20, rotateX: 90 },
                          visible: {
                            opacity: 1, y: 0, rotateX: 0,
                            transition: { duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] },
                          },
                          exit: {
                            opacity: 0, y: -10,
                            transition: { duration: 0.2, delay: i * 0.02 },
                          },
                        }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              {/* Author row */}
              <div className="flex items-end justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex items-center gap-4"
                  >
                    <motion.div
                      className="w-8 h-px bg-foreground"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      style={{ originX: 0 }}
                    />
                    <div>
                      <p className="text-base font-medium text-foreground">{current.type}</p>
                      <p className="text-sm text-muted-foreground">{current.focus}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={goPrev}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors duration-200"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.button>
                  <motion.button
                    onClick={goNext}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors duration-200"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom ticker */}
          <div className="mt-16 overflow-hidden opacity-[0.06] pointer-events-none">
            <motion.div
              className="flex whitespace-nowrap text-5xl font-bold tracking-tight text-foreground"
              animate={{ x: [0, -1000] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(10)].map((_, i) => (
                <span key={i} className="mx-8">
                  {ENGAGEMENTS.map((e) => e.client).join(" • ")} •
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Case Studies data ── */
const CASE_ITEMS = [
  {
    id: "jarvis",
    label: "AI Stock Advisory",
    icon: BarChart3,
    tag: "AI Advisory · Fintech",
    title: "Scaling India's First AI Stock Advisory to 2L+ Users",
    metrics: [["2L+", "Clients"], ["28+", "Brokers"], ["3", "Countries"]],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80&sat=-30",
  },
  {
    id: "transbnk",
    label: "Banking Infrastructure",
    icon: Building2,
    tag: "Banking · Escrow Infrastructure",
    title: "Building Real-Time Escrow & Account Monitoring at Scale",
    metrics: [["300", "Banks"], ["35K", "Monthly Users"], ["99.9%", "Uptime"]],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&q=80&sat=-30",
  },
  {
    id: "evjoints",
    label: "EV Charging Network",
    icon: Zap,
    tag: "CleanTech · Mobility",
    title: "Powering India's EV Charging Network with Smart Infrastructure",
    metrics: [["500", "Stations"], ["5M", "Users"], ["5★", "Rating"]],
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&q=80&sat=-30",
  },
];

const CS_INTERVAL = 4000;
const CS_CHIP_H   = 84;
const csWrap = (min, max, v) => { const r = max - min; return ((((v - min) % r) + r) % r) + min; };

function CaseStudies() {
  const n = CASE_ITEMS.length;
  const [step,   setStep]   = useState(0);
  const [paused, setPaused] = useState(false);
  const cur = ((step % n) + n) % n;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setStep((s) => s + 1), CS_INTERVAL);
    return () => clearInterval(t);
  }, [paused]);

  const jumpTo = (idx) => {
    const diff = (idx - cur + n) % n;
    if (diff > 0) setStep((s) => s + diff);
  };

  const getStatus = (idx) => {
    let nd = idx - cur;
    if (nd > n / 2)  nd -= n;
    if (nd < -n / 2) nd += n;
    if (nd === 0)  return "active";
    if (nd === -1) return "prev";
    if (nd === 1)  return "next";
    return "hidden";
  };

  return (
    <section className="py-28 px-6 max-w-6xl mx-auto">
      <Divider />
      <div className="pt-16">
        <Reveal>
          <CodeLabel>// 05.5 — AI transformation in production</CodeLabel>
          <h2 className="mt-5 text-4xl sm:text-5xl font-light tracking-tight text-foreground leading-tight">
            AI transformation<br /><span style={GT}>in the real world.</span>
          </h2>
        </Reveal>

        <div className="mt-14 relative overflow-hidden rounded-[2.5rem] flex flex-col lg:flex-row border border-border" style={{ minHeight: 540 }}>

          {/* Left panel — animated chips */}
          <div
            className="w-full lg:w-[38%] relative z-30 flex flex-col items-start justify-center overflow-hidden px-10 lg:px-12"
            style={{ background: "var(--color-card)", borderRight: "1px solid var(--color-border)", minHeight: 280 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="absolute inset-x-0 top-0 h-16 z-40 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, var(--color-card), transparent)" }} />
            <div className="absolute inset-x-0 bottom-0 h-16 z-40 pointer-events-none"
              style={{ background: "linear-gradient(to top, var(--color-card), transparent)" }} />

            <div className="relative w-full h-full flex items-center justify-start z-20" style={{ minHeight: 280 }}>
              {CASE_ITEMS.map((item, idx) => {
                const isActive = idx === cur;
                const dist     = item.id === CASE_ITEMS[cur].id ? 0 : idx - cur;
                const wd       = csWrap(-(n / 2), n / 2, dist);
                const Icon     = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    style={{ height: CS_CHIP_H, width: "fit-content" }}
                    animate={{ y: wd * CS_CHIP_H, opacity: 1 - Math.abs(wd) * 0.3 }}
                    transition={{ type: "spring", stiffness: 90, damping: 22, mass: 1 }}
                    className="absolute flex items-center"
                  >
                    <button
                      onClick={() => jumpTo(idx)}
                      className="flex items-center gap-4 px-6 py-4 rounded-full border transition-all duration-500 text-left"
                      style={isActive
                        ? { background: BG, borderColor: "transparent", color: "#fff", boxShadow: GLOW }
                        : { background: "transparent", borderColor: "var(--color-border)", color: "var(--color-muted-foreground)" }
                      }
                    >
                      <Icon className="w-4 h-4 shrink-0" strokeWidth={1.8} />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest whitespace-nowrap">{item.label}</p>
                        {isActive && <p className="text-[10px] opacity-70 mt-0.5 whitespace-nowrap font-normal">{item.tag}</p>}
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* Progress dots */}
            <div className="absolute bottom-7 left-0 right-0 flex justify-center gap-2 z-50">
              {CASE_ITEMS.map((_, i) => (
                <button key={i} onClick={() => jumpTo(i)}
                  className="rounded-full transition-all duration-300"
                  style={{ width: i === cur ? 20 : 6, height: 6, background: i === cur ? "oklch(0.57 0.22 25)" : "var(--color-border)" }}
                />
              ))}
            </div>
          </div>

          {/* Right panel — image cards */}
          <div
            className="flex-1 relative flex items-center justify-center py-12 px-6 lg:px-10 overflow-hidden"
            style={{ background: "var(--color-background)", minHeight: 420 }}
          >
            <div className="relative w-full max-w-[380px] aspect-[4/5]">
              {CASE_ITEMS.map((item, idx) => {
                const status   = getStatus(idx);
                const isActive = status === "active";
                const isPrev   = status === "prev";
                const isNext   = status === "next";
                return (
                  <motion.div
                    key={item.id}
                    initial={false}
                    animate={{
                      x:       isActive ? 0 : isPrev ? -90 : isNext ? 90 : 0,
                      scale:   isActive ? 1 : (isPrev || isNext) ? 0.86 : 0.72,
                      opacity: isActive ? 1 : (isPrev || isNext) ? 0.4 : 0,
                      rotate:  isPrev ? -3 : isNext ? 3 : 0,
                      zIndex:  isActive ? 20 : (isPrev || isNext) ? 10 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 25, mass: 0.8 }}
                    className="absolute inset-0 rounded-[2rem] overflow-hidden border-4 border-border origin-center"
                    style={{ pointerEvents: isActive ? "auto" : "none" }}
                  >
                    <img
                      src={item.image} alt={item.title}
                      className={`w-full h-full object-cover transition-all duration-700 ${isActive ? "" : "grayscale blur-sm brightness-50"}`}
                    />
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                          className="absolute inset-x-0 bottom-0 p-7 pt-28 pointer-events-none"
                          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.65) 55%, transparent 100%)" }}
                        >
                          <span className="inline-block px-3 py-1 rounded-full text-[9px] font-semibold uppercase tracking-widest text-white/65 border border-white/20 bg-white/5 mb-3">
                            {item.tag}
                          </span>
                          <p className="text-white font-bold text-sm leading-snug mb-4">{item.title}</p>
                          <div className="flex gap-5">
                            {item.metrics.map(([val, lbl]) => (
                              <div key={lbl}>
                                <div className="text-lg font-bold text-white">{val}</div>
                                <div className="text-[9px] text-white/50 mt-0.5">{lbl}</div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {isActive && (
                      <div className="absolute top-5 left-5 flex items-center gap-2 pointer-events-none">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" style={{ boxShadow: "0 0 8px #4ade80" }} />
                        <span className="text-white/65 text-[9px] font-mono uppercase tracking-[0.25em]">Live Case</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="py-28 px-6 max-w-6xl mx-auto">
      <Divider />
      <div className="pt-16">
        <Reveal>
          <CodeLabel>// 06 — AI transformation FAQ</CodeLabel>
          <h2 className="mt-5 text-4xl sm:text-5xl font-light tracking-tight text-foreground">
            Common <span style={GT}>questions.</span>
          </h2>
          <p className="mt-3 text-base font-light opacity-40">
            What companies ask before starting their AI transformation. Reach out if yours isn't here.
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col">
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="py-8 border-b border-border grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6 lg:gap-16">
                <p className="text-base font-medium text-foreground leading-snug">{faq.q}</p>
                <p className="text-sm font-light leading-relaxed" style={{ opacity: 0.5 }}>{faq.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="py-36 px-6 max-w-6xl mx-auto">
      <Divider />
      <div className="pt-24 text-center">
        <Reveal>
          <p className="font-mono text-xs opacity-30 tracking-widest mb-8">// ready to transform with AI?</p>
          <h2
            className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-tight text-foreground"
          >
            Let's transform<br />
            <span style={GT}>together.</span>
          </h2>
          <p className="mt-6 text-base font-light opacity-40 max-w-md mx-auto">
            30-minute AI readiness call. We'll map out where AI creates the most value for your business — no pitch decks, no fluff.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-lg text-sm font-mono font-medium text-white"
                style={{ background: BG }}
              >
                Start Conversation
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            </a>
            <a href="mailto:hello@techstalwarts.com">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-lg text-sm font-mono font-medium border border-border text-foreground"
                style={{ background: "transparent" }}
              >
                hello@techstalwarts.com
              </motion.button>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Page ── */
export default function HomePage2() {
  return (
    <div className="bg-background text-foreground">
      <Hero />
      <Industries />
      <WhatMakesDifferent />
      <WhoBuilds />
      <WhatWeAccept />
      <CaseStudies />
      <FAQSection />
      <ClosingCTA />
      <Footer />
    </div>
  );
}
