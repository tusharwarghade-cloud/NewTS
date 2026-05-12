import { useState, useRef, useEffect, createContext, useContext, useCallback, lazy, Suspense } from "react";
import Footer from "@/components/Footer";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import AuroraBg from "@/components/AuroraBg";
import { MapPin, Phone, Mail, ArrowRight, Send, Building2, ExternalLink } from "lucide-react";

/* ── Brand constants ─────────────────────────────────────────── */
const BG   = "linear-gradient(135deg, oklch(0.57 0.22 25) 0%, oklch(0.52 0.24 292) 100%)";
const GLOW = "0 0 28px color-mix(in oklch, oklch(0.57 0.22 25) 30%, transparent)";
const GT   = { background: BG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };

/* ── Animated Video on Scroll (YoucefBnm) ───────────────────── */
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
  const insetY     = useTransform(scrollYProgress, [0, 0.8], [35, 0]);
  const insetX     = useTransform(scrollYProgress, [0, 0.8], [35, 0]);
  const roundedness = useTransform(scrollYProgress, [0, 1],   [800, 16]);
  const clipPath   = useMotionTemplate`inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${roundedness}px)`;
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

function ContactVideoHero() {
  return (
    <_ContainerScroll className="h-[280vh]">
      <_ContainerSticky className="flex flex-col items-center justify-center gap-8 px-6 overflow-hidden bg-background">

        {/* Subtle ambient glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 40%, color-mix(in oklch, oklch(0.57 0.22 25) 8%, transparent) 0%, transparent 65%)" }} />
        </div>

        {/* Headline */}
        <_ContainerAnimated className="relative z-20 text-center space-y-3 max-w-2xl">
          <Badge variant="outline" className="mb-2 rounded-full px-4 text-xs uppercase tracking-widest font-semibold border-primary/30 bg-primary/5" style={GT}>
            Contact Us
          </Badge>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-foreground leading-[1.1]">
            Let's Build<br /><span className="brand-text">Something Great</span>
          </h1>
          <p className="text-muted-foreground text-base max-w-lg mx-auto leading-relaxed pt-1">
            Partner with Techstalwarts to design, develop, and scale your digital vision — from concept to production.
          </p>
        </_ContainerAnimated>

        {/* Expanding video */}
        <_ContainerInset>
          <_HeroVideo
            src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-at-night-372-large.mp4"
            poster="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1800&q=80&sat=-30"
          />
        </_ContainerInset>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          className="relative z-20 flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
          style={{ background: BG, boxShadow: GLOW }}
          onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
        >
          Send Us a Message <ArrowRight className="w-4 h-4" />
        </motion.button>

      </_ContainerSticky>
    </_ContainerScroll>
  );
}

/* ── FadeIn helper ───────────────────────────────────────────── */
function FadeIn({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useRef(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !inView.current) { inView.current = true; setVisible(true); }
    }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >{children}</motion.div>
  );
}

/* ── Globe (reapollo/cobe-globe) ─────────────────────────────── */
function Globe({
  markers = [],
  arcs = [],
  className = "",
  markerColor = [0.86, 0.2, 0.45],
  baseColor = [0.14, 0.14, 0.18],
  arcColor = [0.6, 0.2, 0.95],
  glowColor = [0.18, 0.06, 0.26],
  dark = 1,
  mapBrightness = 8,
  markerSize = 0.05,
  markerElevation = 0.01,
  arcWidth = 0.8,
  arcHeight = 0.3,
  speed = 0.003,
  theta = 0.25,
  diffuse = 1.8,
  mapSamples = 16000,
}) {
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const lastPointer = useRef(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const velocity = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const isPausedRef = useRef(false);

  const handlePointerDown = useCallback((e) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    isPausedRef.current = true;
  }, []);

  const handlePointerMove = useCallback((e) => {
    if (pointerInteracting.current !== null) {
      const deltaX = e.clientX - pointerInteracting.current.x;
      const deltaY = e.clientY - pointerInteracting.current.y;
      dragOffset.current = { phi: deltaX / 300, theta: deltaY / 1000 };
      const now = Date.now();
      if (lastPointer.current) {
        const dt = Math.max(now - lastPointer.current.t, 1);
        const maxV = 0.15;
        velocity.current = {
          phi:   Math.max(-maxV, Math.min(maxV, ((e.clientX - lastPointer.current.x) / dt) * 0.3)),
          theta: Math.max(-maxV, Math.min(maxV, ((e.clientY - lastPointer.current.y) / dt) * 0.08)),
        };
      }
      lastPointer.current = { x: e.clientX, y: e.clientY, t: now };
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
      lastPointer.current = null;
    }
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    isPausedRef.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    let globe = null;
    let animationId;
    let phi = 0;

    function animate() {
      if (!isPausedRef.current) {
        phi += speed;
        if (Math.abs(velocity.current.phi) > 0.0001 || Math.abs(velocity.current.theta) > 0.0001) {
          phiOffsetRef.current += velocity.current.phi;
          thetaOffsetRef.current += velocity.current.theta;
          velocity.current.phi *= 0.95;
          velocity.current.theta *= 0.95;
        }
        const tMin = -0.4, tMax = 0.4;
        if (thetaOffsetRef.current < tMin) thetaOffsetRef.current += (tMin - thetaOffsetRef.current) * 0.1;
        else if (thetaOffsetRef.current > tMax) thetaOffsetRef.current += (tMax - thetaOffsetRef.current) * 0.1;
      }
      if (globe) {
        globe.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: theta + thetaOffsetRef.current + dragOffset.current.theta,
          dark, mapBrightness, markerColor, baseColor, arcColor, markerElevation,
          markers: markers.map((m) => ({ location: m.location, size: markerSize, id: m.id })),
          arcs: arcs.map((a) => ({ from: a.from, to: a.to, id: a.id })),
        });
      }
      animationId = requestAnimationFrame(animate);
    }

    async function init() {
      const width = canvas.offsetWidth;
      if (width === 0 || globe) return;
      const { default: createGlobe } = await import("cobe");
      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width, height: width,
        phi: 0.8, theta, dark, diffuse, mapSamples, mapBrightness,
        baseColor, markerColor, glowColor, markerElevation,
        markers: markers.map((m) => ({ location: m.location, size: markerSize, id: m.id })),
        arcs: arcs.map((a) => ({ from: a.from, to: a.to, id: a.id })),
        arcColor, arcWidth, arcHeight, opacity: 0.85,
      });
      animate();
      setTimeout(() => { if (canvas) canvas.style.opacity = "1"; });
    }

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) { ro.disconnect(); init(); }
      });
      ro.observe(canvas);
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (globe) globe.destroy();
    };
  }, [markers, arcs, markerColor, baseColor, arcColor, glowColor, dark, mapBrightness,
      markerSize, markerElevation, arcWidth, arcHeight, speed, theta, diffuse, mapSamples]);

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{ width: "100%", height: "100%", cursor: "grab", opacity: 0, transition: "opacity 1.2s ease", borderRadius: "50%", touchAction: "none" }}
      />
    </div>
  );
}

/* ── Branch data ─────────────────────────────────────────────── */
const BRANCHES = [
  {
    city: "Mumbai",
    country: "India",
    flag: "🇮🇳",
    address: "7th floor, Dheeraj Kawal, Vikhroli (Mumbai) Commercial Real Estate, Mumbai, Maharashtra - 400070",
    phone: "+91 9930602530",
    x: 70.5,
    y: 40.8,
  },
  {
    city: "Bhopal",
    country: "India",
    flag: "🇮🇳",
    address: "1st Floor, 96 Gargi Rani Complex, Zone II, MP Nagar, Bhopal, Madhya Pradesh - 462011",
    phone: "+91 9630534817",
    x: 71.2,
    y: 37.8,
  },
  {
    city: "Dubai",
    country: "UAE",
    flag: "🇦🇪",
    address: "Bay Square, Building no. 2, 8th floor, 805, Business Bay, Dubai, United Arab Emirates",
    phone: "+971 547792530",
    x: 65.8,
    y: 37.2,
  },
];

/* ── Input component ─────────────────────────────────────────── */
function Field({ label, type = "text", placeholder, value, onChange, multiline = false, required = false }) {
  const cls = "w-full bg-card/60 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all duration-200 resize-none";
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground/80">
        {label}{required && <span className="text-primary ml-0.5">*</span>}
      </label>
      {multiline
        ? <textarea rows={5} className={cls} placeholder={placeholder} value={value} onChange={onChange} />
        : <input type={type} className={cls} placeholder={placeholder} value={value} onChange={onChange} />
      }
    </div>
  );
}

/* ── 1. Hero + Form ──────────────────────────────────────────── */
function HeroFormSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact-form" className="relative pt-24 pb-0 bg-background overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1800&q=80&sat=-30"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ opacity: 0.18 }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, var(--color-background) 35%, transparent 80%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 60%, var(--color-background) 100%)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — hero text */}
          <div className="pt-8 lg:pt-16 lg:sticky top-28">
            <FadeIn>
              <Badge variant="outline" className="mb-6 rounded-full border-primary/30 bg-primary/5 uppercase tracking-widest text-xs font-semibold" style={GT}>
                Contact Us
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-foreground leading-[1.08] tracking-tight mb-6">
                Let's level up<br />
                <span style={GT}>your brand, together</span>
              </h1>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10 max-w-lg">
                Together, we can create a brand that inspires, empowers and makes an impact. Let's make it happen!
              </p>

              {/* Quick contact pills */}
              <div className="flex flex-col gap-3">
                {[
                  { icon: Mail,  text: "business@techstalwarts.com" },
                  { icon: Phone, text: "+91 9930602530" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-muted-foreground group cursor-pointer">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border border-border bg-card group-hover:border-primary/40 transition-colors"
                      style={{ background: "color-mix(in oklch, oklch(0.57 0.22 25) 8%, transparent)" }}>
                      <Icon className="w-4 h-4" style={{ color: "oklch(0.57 0.22 25)" }} />
                    </div>
                    <span className="group-hover:text-foreground transition-colors">{text}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right — form */}
          <FadeIn delay={0.15}>
            <div className="relative rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden p-8 md:p-10">

              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2" style={{ background: BG }}>
                    <Send className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Message Sent!</h3>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <Button variant="outline" className="mt-4 rounded-full" onClick={() => setSent(false)}>
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Full Name" placeholder="John Doe" value={form.name} onChange={set("name")} required />
                    <Field label="Email" type="email" placeholder="john@company.com" value={form.email} onChange={set("email")} required />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")} />
                    <Field label="Company" placeholder="Your company name" value={form.company} onChange={set("company")} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground/80 block mb-1.5">Service Interested In</label>
                    <select
                      value={form.service}
                      onChange={set("service")}
                      className="w-full bg-card/60 border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all duration-200"
                    >
                      <option value="">Select a service...</option>
                      {["Enterprise Solutions", "Banking & NBFC", "Fintech", "Real Estate", "Healthcare", "Logistics", "AI Integration", "Custom Development", "Other"].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <Field label="Message" placeholder="Tell us about your project, goals, or questions..." value={form.message} onChange={set("message")} multiline required />
                  <Button
                    type="submit"
                    size="lg"
                    className="rounded-full gap-2 font-semibold text-white border-none mt-1"
                    style={{ background: BG, boxShadow: GLOW }}
                  >
                    Send Message <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ── 2. Branches + Globe ─────────────────────────────────────── */
function BranchesSection() {
  return (
    <section className="border-t border-border py-24 relative overflow-clip" style={{ background: "#ffffff" }}>
      {/* Subtle light aurora */}
      <AuroraBg variant="light" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

          {/* Left — header + branch cards */}
          <div className="flex-1 flex flex-col gap-8 w-full">
            <FadeIn>
              <Badge
                variant="outline"
                className="mb-4 rounded-full px-4 text-xs uppercase tracking-widest font-semibold"
                style={{
                  borderColor: "color-mix(in oklch, oklch(0.57 0.22 25) 30%, transparent)",
                  background: "color-mix(in oklch, oklch(0.57 0.22 25) 7%, transparent)",
                  ...GT,
                }}
              >
                Our Presence
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ color: "#111827" }}>
                Our <span style={GT}>Branches</span>
              </h2>
              <p className="text-base max-w-lg" style={{ color: "#6B7280" }}>
                From Mumbai to Bhopal to Dubai — we're building the future of technology across borders.
              </p>
            </FadeIn>

            <div className="flex flex-col gap-4">
              {BRANCHES.map(({ city, country, flag, address, phone }, i) => (
                <FadeIn key={city} delay={i * 0.1}>
                  <div
                    className="relative rounded-2xl overflow-hidden group transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.8)",
                      border: "1px solid rgba(0,0,0,0.08)",
                      boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: "radial-gradient(300px circle at 0% 50%, color-mix(in oklch, oklch(0.57 0.22 25) 5%, transparent), transparent 70%)" }} />
                    <div className="relative p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                      {/* Flag + name */}
                      <div className="flex items-center gap-3 sm:w-36 shrink-0">
                        <span className="text-2xl">{flag}</span>
                        <div>
                          <h3 className="text-sm font-bold" style={{ color: "#111827" }}>{city}</h3>
                          <p className="text-xs" style={{ color: "#9CA3AF" }}>{country}</p>
                        </div>
                      </div>
                      <div className="hidden sm:block w-px h-10 opacity-20" style={{ background: "#111827" }} />
                      {/* Address */}
                      <div className="flex items-start gap-2 flex-1 text-xs" style={{ color: "#6B7280" }}>
                        <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "oklch(0.57 0.22 25)" }} />
                        <span className="leading-relaxed">{address}</span>
                      </div>
                      <div className="hidden sm:block w-px h-10 opacity-20" style={{ background: "#111827" }} />
                      {/* Phone */}
                      <a
                        href={`tel:${phone.replace(/\s/g, "")}`}
                        className="flex items-center gap-2 text-xs transition-colors shrink-0"
                        style={{ color: "#6B7280" }}
                        onMouseEnter={e => e.currentTarget.style.color = "#111827"}
                        onMouseLeave={e => e.currentTarget.style.color = "#6B7280"}
                      >
                        <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: "oklch(0.52 0.24 292)" }} />
                        <span>{phone}</span>
                      </a>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Right — Globe */}
          <FadeIn delay={0.15} className="w-full lg:w-[460px] shrink-0">
            <div className="relative">
              {/* Soft glow adjusted for light bg */}
              <div className="absolute inset-0 rounded-full pointer-events-none"
                style={{ boxShadow: "0 0 100px 30px color-mix(in oklch, oklch(0.52 0.24 292) 14%, transparent)" }} />
              <Globe
                speed={0.004}
                dark={0}
                baseColor={[0.92, 0.92, 0.95]}
                markerColor={[0.72, 0.1, 0.35]}
                arcColor={[0.4, 0.15, 0.78]}
                glowColor={[0.88, 0.86, 0.96]}
                mapBrightness={6}
                markers={[
                  { id: "mumbai", location: [19.07, 72.87], label: "Mumbai" },
                  { id: "bhopal", location: [23.25, 77.41], label: "Bhopal" },
                  { id: "dubai",  location: [25.20, 55.27], label: "Dubai"  },
                ]}
                arcs={[
                  { id: "mb", from: [19.07, 72.87], to: [23.25, 77.41] },
                  { id: "md", from: [19.07, 72.87], to: [25.20, 55.27] },
                  { id: "bd", from: [23.25, 77.41], to: [25.20, 55.27] },
                ]}
              />
              {/* City labels */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 flex items-center gap-5 whitespace-nowrap">
                {[["🇮🇳", "Mumbai"], ["🇮🇳", "Bhopal"], ["🇦🇪", "Dubai"]].map(([flag, city]) => (
                  <div key={city} className="flex items-center gap-1.5 text-xs" style={{ color: "#6B7280" }}>
                    <span>{flag}</span>
                    <span className="font-medium" style={{ color: "#111827" }}>{city}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}

/* ── 3. Inquiries ────────────────────────────────────────────── */
function InquiriesSection() {
  const CARDS = [
    {
      icon: Building2,
      label: "Business Inquiries",
      lines: [
        { icon: Mail,  text: "business@techstalwarts.com", href: "mailto:business@techstalwarts.com" },
        { icon: Phone, text: "+91 9930602530",              href: "tel:+919930602530" },
      ],
      accent: "oklch(0.57 0.22 25)",
    },
    {
      icon: Mail,
      label: "Careers & HR Inquiries",
      lines: [
        { icon: Mail, text: "hr@techstalwarts.com", href: "mailto:hr@techstalwarts.com" },
      ],
      accent: "oklch(0.52 0.24 292)",
    },
  ];

  return (
    <section className="border-t border-border py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <FadeIn className="mb-14 text-center">
          <Badge variant="outline" className="mb-4 rounded-full border-primary/30 bg-primary/5 uppercase tracking-widest text-xs font-semibold" style={GT}>
            Get In Touch
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Direct <span style={GT}>Contacts</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {CARDS.map(({ icon: Icon, label, lines, accent }, i) => (
            <FadeIn key={label} delay={i * 0.12}>
              <div className="relative rounded-2xl border border-border bg-card overflow-hidden group p-8">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(400px circle at 0% 0%, color-mix(in oklch, ${accent} 8%, transparent), transparent 70%)` }} />

                <div className="relative">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `color-mix(in oklch, ${accent} 14%, transparent)`, border: `1px solid color-mix(in oklch, ${accent} 28%, transparent)` }}>
                    <Icon className="w-5 h-5" style={{ color: accent }} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-4">{label}</h3>

                  <div className="flex flex-col gap-3">
                    {lines.map(({ icon: LIcon, text, href }) => (
                      <a key={text} href={href}
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group/link">
                        <LIcon className="w-4 h-4 shrink-0" style={{ color: accent }} />
                        <span className="group-hover/link:underline underline-offset-2">{text}</span>
                        <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover/link:opacity-60 transition-opacity" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA ─────────────────────────────────────────────────────── */
function CTASection() {
  return (
    <section className="page-grid py-24 border-t border-border">
      <div className="col-span-12 rounded-2xl overflow-hidden relative"
        style={{ border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 25%, transparent)", background: "var(--color-card)" }}>
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


/* ── Page export ─────────────────────────────────────────────── */
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <ContactVideoHero />
      <HeroFormSection />
      <BranchesSection />
      <InquiriesSection />
      <CTASection />
      <Footer />
    </div>
  );
}
