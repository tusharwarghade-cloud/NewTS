import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Shield, TrendingUp, Users, BarChart3, Globe, ChevronRight, ArrowUpRight, Quote } from "lucide-react";
import Footer from "@/components/Footer";

/* ── Reveal on scroll ── */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ── Parallax image section ── */
function ParallaxSection({ image, children, overlay = "rgba(0,0,0,0.55)" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y, backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div className="absolute inset-0" style={{ background: overlay }} />
      <div className="relative z-10">{children}</div>
    </section>
  );
}

/* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */
function Hero() {
  return (
    <ParallaxSection
      image="https://images.unsplash.com/photo-1511497584788-876760111969?w=1920&q=80"
      overlay="rgba(0,0,0,0.5)"
    >
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="text-white/60 text-sm tracking-[0.3em] uppercase mb-6 block">Wealth Management & Advisory</span>
          <h1 className="text-white text-6xl sm:text-8xl lg:text-9xl font-light tracking-tight" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            <em>Sicomoro</em>
          </h1>
          <p className="text-white/70 text-lg sm:text-xl mt-6 max-w-xl mx-auto font-light leading-relaxed">
            Independent wealth advisory for families, institutions, and private clients.
          </p>
          <motion.div
            className="mt-10 flex items-center gap-2 text-white/80 text-sm tracking-wider uppercase cursor-pointer hover:text-white transition-colors mx-auto w-fit"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span>Scroll to explore</span>
            <ArrowRight className="size-4" />
          </motion.div>
        </motion.div>
      </div>
    </ParallaxSection>
  );
}

/* ══════════════════════════════════════════
   SERVICES (4 stacked sections)
══════════════════════════════════════════ */
const SERVICES = [
  {
    title: "Advisory",
    desc: "Bespoke investment advisory tailored to your financial objectives. We provide strategic guidance across asset classes, geographies, and risk profiles.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80",
  },
  {
    title: "Selection of Asset Managers",
    desc: "Rigorous due diligence and selection of top-tier asset managers. We identify, evaluate, and monitor managers to ensure alignment with your goals.",
    image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=1920&q=80",
  },
  {
    title: "Family Office",
    desc: "Comprehensive family office services designed to preserve and grow multi-generational wealth with full governance and reporting transparency.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80",
  },
  {
    title: "Strategic Consulting",
    desc: "Strategic counsel for corporates and institutions navigating complex financial decisions, M&A, and capital structuring.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80",
  },
];

function Services() {
  return (
    <>
      {SERVICES.map((s, i) => (
        <ParallaxSection key={s.title} image={s.image} overlay="rgba(0,0,0,0.6)">
          <div className="min-h-[70vh] flex items-center px-6">
            <div className="max-w-5xl mx-auto w-full py-24">
              <Reveal>
                <span className="text-white/40 text-xs tracking-[0.3em] uppercase">0{i + 1}</span>
                <h2 className="text-white text-4xl sm:text-6xl font-light mt-4 tracking-tight" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                  {s.title}
                </h2>
                <p className="text-white/70 text-base sm:text-lg mt-6 max-w-lg font-light leading-relaxed">
                  {s.desc}
                </p>
                <a href="#" className="inline-flex items-center gap-2 mt-8 text-white/80 text-sm tracking-wider uppercase hover:text-white transition-colors border-b border-white/30 pb-1 hover:border-white/60">
                  Learn more <ArrowUpRight className="size-4" />
                </a>
              </Reveal>
            </div>
          </div>
        </ParallaxSection>
      ))}
    </>
  );
}

/* ══════════════════════════════════════════
   ABOUT SICOMORO
══════════════════════════════════════════ */
function About() {
  return (
    <section className="bg-[#0a0a0a] py-24 sm:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <span className="text-white/40 text-xs tracking-[0.3em] uppercase">About</span>
          <h2 className="text-white text-4xl sm:text-5xl font-light mt-4 tracking-tight" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            About Sicomoro
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-12 mt-14">
          <Reveal>
            <p className="text-white/60 text-base leading-relaxed font-light">
              Founded on the principles of independence and transparency, Sicomoro provides institutional-quality wealth advisory to discerning families and private clients.
            </p>
            <p className="text-white/60 text-base leading-relaxed font-light mt-4">
              Our team combines deep expertise in global markets with a commitment to fiduciary excellence. We navigate complexity so our clients can focus on what matters most.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            {/* Globe / map illustration */}
            <div className="relative h-64 rounded-2xl overflow-hidden bg-[#111]">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-48 h-48 opacity-20">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="white" strokeWidth="0.5" />
                  <ellipse cx="100" cy="100" rx="80" ry="30" fill="none" stroke="white" strokeWidth="0.3" />
                  <ellipse cx="100" cy="100" rx="30" ry="80" fill="none" stroke="white" strokeWidth="0.3" />
                  <line x1="20" y1="100" x2="180" y2="100" stroke="white" strokeWidth="0.3" />
                  <line x1="100" y1="20" x2="100" y2="180" stroke="white" strokeWidth="0.3" />
                </svg>
                <motion.div
                  className="absolute w-3 h-3 rounded-full bg-white/80"
                  animate={{ x: [0, 30, -20, 10, 0], y: [-20, 10, 20, -10, -20] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  style={{ filter: "blur(0.5px)", boxShadow: "0 0 12px rgba(255,255,255,0.4)" }}
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between text-white/30 text-[10px] tracking-widest uppercase">
                <span>Mumbai</span><span>Dubai</span><span>London</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Stats */}
        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/10">
            {[
              { value: "$2.4B+", label: "Assets Advised" },
              { value: "120+", label: "Family Clients" },
              { value: "15+", label: "Years Experience" },
              { value: "8", label: "Global Markets" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-white text-3xl sm:text-4xl font-light" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>{s.value}</div>
                <div className="text-white/40 text-xs tracking-wider uppercase mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   IMAGE GRID
══════════════════════════════════════════ */
const GRID_IMAGES = [
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80", span: "col-span-1 row-span-2" },
  { src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80", span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80", span: "col-span-2 row-span-1" },
  { src: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=600&q=80", span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1553729459-afe8f2e2ed65?w=600&q=80", span: "col-span-1 row-span-1" },
];

function ImageGrid() {
  return (
    <section className="bg-[#0a0a0a] py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-3 gap-3 auto-rows-[180px]">
          {GRID_IMAGES.map((img, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className={`${img.span} h-full overflow-hidden rounded-lg`}>
                <img
                  src={img.src}
                  alt=""
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   OUR VIEW OF RISK
══════════════════════════════════════════ */
function ViewOfRisk() {
  return (
    <ParallaxSection
      image="https://images.unsplash.com/photo-1462206092226-f46025ffe607?w=1920&q=80"
      overlay="rgba(0,0,0,0.7)"
    >
      <div className="py-24 sm:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Reveal>
              <span className="text-white/40 text-xs tracking-[0.3em] uppercase">Philosophy</span>
              <h2 className="text-white text-4xl sm:text-5xl font-light mt-4 tracking-tight" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                Our View of Risk
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-white/60 text-base leading-relaxed font-light">
                Risk is not merely volatility — it is the permanent loss of capital. Our approach prioritises downside protection while seeking asymmetric returns. We build portfolios that are resilient across market cycles, with rigorous scenario analysis and stress testing at the core.
              </p>
              <p className="text-white/60 text-base leading-relaxed font-light mt-4">
                Every allocation decision is informed by a deep understanding of macroeconomic dynamics, geopolitical shifts, and structural market trends.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </ParallaxSection>
  );
}

/* ══════════════════════════════════════════
   CLIENT SUCCESS STORIES
══════════════════════════════════════════ */
const TESTIMONIALS = [
  {
    quote: "Sicomoro's advisory has been instrumental in navigating our family's multi-generational wealth strategy across three continents.",
    author: "Private Family Office",
    region: "Middle East & Asia",
  },
  {
    quote: "Their rigorous manager selection process identified opportunities we would never have discovered through traditional channels.",
    author: "Institutional Investor",
    region: "Europe",
  },
  {
    quote: "Independent, transparent, and deeply knowledgeable — exactly what we needed in an advisory partner.",
    author: "UHNW Client",
    region: "Latin America",
  },
];

function ClientStories() {
  return (
    <section className="bg-[#0a0a0a] py-24 sm:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <span className="text-white/40 text-xs tracking-[0.3em] uppercase">Testimonials</span>
          <h2 className="text-white text-3xl sm:text-4xl font-light mt-4 tracking-tight" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            Witness the Impact: Client Success Stories
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 h-full flex flex-col justify-between hover:bg-white/[0.07] transition-colors">
                <div>
                  <Quote className="size-5 text-white/20 mb-4" />
                  <p className="text-white/70 text-sm leading-relaxed font-light">{t.quote}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-white/90 text-sm font-medium">{t.author}</p>
                  <p className="text-white/40 text-xs mt-1">{t.region}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   FINANCIAL INSIGHTS
══════════════════════════════════════════ */
const INSIGHTS = [
  {
    title: "Navigating Fixed Income in a Higher-for-Longer Environment",
    date: "April 2026",
    tag: "Market Outlook",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80",
  },
  {
    title: "The Rise of Private Credit: Opportunities and Risks",
    date: "March 2026",
    tag: "Research",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
  {
    title: "Family Governance: Building Structures That Last",
    date: "February 2026",
    tag: "Family Office",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
  },
];

function FinancialInsights() {
  return (
    <section className="bg-[#111] py-24 sm:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-white/40 text-xs tracking-[0.3em] uppercase">Insights</span>
              <h2 className="text-white text-3xl sm:text-4xl font-light mt-4 tracking-tight" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                Financial Insights: Latest News and Updates
              </h2>
            </div>
            <a href="#" className="hidden sm:flex items-center gap-1 text-white/60 text-sm hover:text-white transition-colors">
              View all <ChevronRight className="size-4" />
            </a>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {INSIGHTS.map((article, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <a href="#" className="group block">
                <div className="overflow-hidden rounded-xl aspect-[4/3]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="mt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-white/30 text-[10px] tracking-widest uppercase">{article.tag}</span>
                    <span className="text-white/20">·</span>
                    <span className="text-white/30 text-[10px]">{article.date}</span>
                  </div>
                  <h3 className="text-white/90 text-base font-medium mt-2 leading-snug group-hover:text-white transition-colors">
                    {article.title}
                  </h3>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   SITE FOOTER (dark minimal)
══════════════════════════════════════════ */
function SicomoroFooter() {
  return (
    <footer className="bg-[#050505] border-t border-white/10 py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-white/80 text-lg font-light" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            <em>Sicomoro</em>
          </span>
        </div>
        <div className="flex items-center gap-8">
          {["Advisory", "Family Office", "About", "Contact"].map(l => (
            <a key={l} href="#" className="text-white/40 text-xs tracking-wider uppercase hover:text-white/80 transition-colors">
              {l}
            </a>
          ))}
        </div>
        <p className="text-white/20 text-xs">© 2026 Sicomoro. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function Test7Page() {
  return (
    <div className="bg-[#0a0a0a]">
      <Hero />
      <Services />
      <About />
      <ImageGrid />
      <ViewOfRisk />
      <ClientStories />
      <FinancialInsights />
      <SicomoroFooter />
    </div>
  );
}
