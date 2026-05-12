import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ChevronDown } from "lucide-react";

const DEFAULT_INDUSTRIES = [
  "Enterprises", "Banks & NBFCs", "Fintech", "Real Estate",
  "Healthcare", "Logistics", "Travel", "Events",
];

export default function ScrollHero({
  badge          = "8 Industries · One Technology Partner",
  badgeDot       = true,
  pills          = DEFAULT_INDUSTRIES,
  headline       = <>Digital Solutions Built <span className="brand-text">for Your Industry</span></>,
  subheadline    = "We deliver domain-specific technology platforms — purpose-built for the workflows, compliance requirements, and scale demands of your sector.",
  primaryCta     = "Explore Industry Solutions",
  secondaryCta   = "Talk to an Expert",
  image          = "https://images.unsplash.com/photo-1560264280-88b68371db39?w=1800&q=85",
  imageAlt       = "Enterprise technology solutions",
  expandedBadge  = "Trusted by 500+ Enterprises",
  expandedHeadline = <>Industry-Specific Platforms,<br />Not Generic Software</>,
  expandedCta    = "See All Solutions",
  onPrimary      = () => {},
  onSecondary    = () => {},
  onExpandedCta  = () => {},
}) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth       = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  const borderRadius = useTransform(smooth, [0, 0.6], [20, 0]);
  const scale        = useTransform(smooth, [0, 0.6], [0.74, 1]);
  const textOpacity  = useTransform(smooth, [0, 0.28], [1, 0]);
  const textY        = useTransform(smooth, [0, 0.28], [0, -56]);
  const overlayOp    = useTransform(smooth, [0, 0.55], [0.78, 0]);
  const captionOp    = useTransform(smooth, [0.52, 0.78], [0, 1]);
  const captionY     = useTransform(smooth, [0.52, 0.78], [24, 0]);

  return (
    <div ref={containerRef} className="relative h-[280vh] bg-background">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

        {/* Background glow */}
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
          background:
            "radial-gradient(ellipse 75% 55% at 50% -5%, color-mix(in oklch, oklch(0.57 0.22 25) 14%, transparent) 0%, transparent 68%)," +
            "radial-gradient(ellipse 45% 40% at 85% 85%, color-mix(in oklch, oklch(0.52 0.24 292) 8%, transparent) 0%, transparent 60%)",
        }} />

        {/* Grid */}
        <div aria-hidden className="absolute inset-0 opacity-[0.032] pointer-events-none" style={{
          backgroundImage: "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }} />

        {/* Hero text */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-x-0 top-0 z-20 flex flex-col items-center pt-28 px-6 text-center pointer-events-none"
        >
          <Badge
            variant="outline"
            className="mb-6 gap-2 rounded-full px-4 py-1.5 border-primary/30 bg-primary/5 pointer-events-auto text-xs tracking-wide uppercase font-semibold"
            style={{ backgroundImage: "linear-gradient(135deg, oklch(0.57 0.22 25), oklch(0.52 0.24 292))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            {badgeDot && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" style={{ WebkitTextFillColor: "initial" }} />}
            {badge}
          </Badge>

          <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-bold text-foreground leading-[1.1] tracking-tight mb-5 max-w-4xl">
            {headline}
          </h1>

          <p className="max-w-2xl text-lg text-muted-foreground mb-3 leading-relaxed">
            {subheadline}
          </p>

          {pills.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-2xl">
              {pills.map((p) => (
                <span key={p} className="text-xs px-3 py-1 rounded-full border border-white/15 bg-white/5 text-white/70">
                  {p}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pointer-events-auto">
            <Button
              size="lg"
              className="rounded-full gap-2 group cursor-pointer font-semibold"
              onClick={onPrimary}
              style={{
                background: "linear-gradient(135deg, oklch(0.57 0.22 25), oklch(0.52 0.24 292))",
                boxShadow: "0 0 28px color-mix(in oklch, oklch(0.57 0.22 25) 38%, transparent)",
                transition: "box-shadow 0.25s, transform 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 44px color-mix(in oklch, oklch(0.57 0.22 25) 55%, transparent)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 28px color-mix(in oklch, oklch(0.57 0.22 25) 38%, transparent)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {primaryCta}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full gap-2 cursor-pointer border-border bg-card/60 text-foreground hover:bg-secondary hover:border-primary/40"
              onClick={onSecondary}
            >
              {secondaryCta}
            </Button>
          </div>

          {pills.length === 0 && <div className="mb-8" />}

          <div className="mt-14 flex flex-col items-center gap-1.5 text-muted-foreground/40 text-xs">
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
            <span>Scroll to explore</span>
          </div>
        </motion.div>

        {/* Expanding media */}
        <motion.div style={{ scale, borderRadius }} className="absolute inset-0 origin-bottom overflow-hidden">
          <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
          <motion.div style={{ opacity: overlayOp }} className="absolute inset-0 bg-background" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, color-mix(in oklch, var(--color-background) 60%, transparent) 0%, transparent 50%)" }} />
        </motion.div>

        {/* Expanded caption */}
        <motion.div
          style={{ opacity: captionOp, y: captionY }}
          className="absolute bottom-10 inset-x-0 z-20 flex flex-col items-center gap-4 pointer-events-none"
        >
          <Badge variant="outline" className="border-white/20 bg-white/10 text-white/60 backdrop-blur-md rounded-full tracking-widest uppercase text-xs">
            {expandedBadge}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center max-w-xl">
            {expandedHeadline}
          </h2>
          <Button
            variant="outline"
            className="pointer-events-auto rounded-full border-white/25 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 gap-2"
            onClick={onExpandedCta}
          >
            {expandedCta}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
