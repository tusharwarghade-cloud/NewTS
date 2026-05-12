import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Youtube } from "lucide-react";

const BG = "linear-gradient(135deg, oklch(0.57 0.22 25) 0%, oklch(0.52 0.24 292) 100%)";
const GT = { backgroundImage: BG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };

/* ── BackgroundPlus (reuno-ui) ───────────────────────────────────── */
function BackgroundPlus({ plusColor = "#7C3AED", plusSize = 60, fade = true }) {
  const encodedColor = encodeURIComponent(plusColor);
  const maskStyle = fade
    ? {
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, white 20%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, white 20%, transparent 80%)",
      }
    : {};
  return (
    <div
      className="absolute inset-0 h-full w-full pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='${plusSize}' height='${plusSize}' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${encodedColor}' fill-opacity='0.18'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        ...maskStyle,
      }}
    />
  );
}

/* ── Data ───────────────────────────────────────────────────────── */
const NAV_COLS = [
  {
    label: "Company",
    links: [
      { text: "About Us",     href: "/about" },
      { text: "StalwartsLAB", href: "/stalwarts-lab" },
      { text: "Careers",      href: "/careers" },
      { text: "Contact",      href: "/contact" },
      { text: "Test",         href: "/test" },
      { text: "Services 2",   href: "/services2" },
      { text: "AI Studio",    href: "/ai-studio" },
      { text: "Test 7",      href: "/test7" },
      { text: "Scroll",      href: "/scroll" },
    ],
  },
  {
    label: "Services",
    links: [
      { text: "TS AI",                 href: "/ts-ai" },
      { text: "AI Transformation",     href: "/services" },
      { text: "Product Engineering",   href: "/services" },
      { text: "Data Services",         href: "/services" },
      { text: "Resource Augmentation", href: "/services" },
    ],
  },
  {
    label: "Solutions",
    links: [
      { text: "Enterprise",  href: "/solutions/enterprise" },
      { text: "Healthcare",  href: "/solutions/healthcare" },
      { text: "Logistics",   href: "/solutions/logistics-retail" },
      { text: "Travel",      href: "/solutions/travel-mobility" },
      { text: "Events",      href: "/solutions/events" },
      { text: "Fintech",     href: "/#solution-fintech" },
    ],
  },
];

const SOCIALS = [
  { icon: Linkedin,  href: "#", label: "LinkedIn" },
  { icon: Twitter,   href: "#", label: "X / Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube,   href: "#", label: "YouTube" },
];

const OFFICES = [
  { city: "Mumbai", detail: "India — HQ" },
  { city: "Bhopal", detail: "India" },
  { city: "Dubai",  detail: "UAE" },
];

/* ── Footer ─────────────────────────────────────────────────────── */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-card/30">
      <BackgroundPlus plusColor="#7C3AED" plusSize={60} fade />

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 lg:gap-12">

          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <a href="/">
              <img src="/images/techstalwarts-logo.svg" alt="Techstalwarts" className="theme-logo h-8 w-auto" />
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Engineering intelligence, accelerating businesses. Enterprise-grade AI, product, and data solutions for companies shaping tomorrow.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-2">
              <a href="mailto:hello@techstalwarts.com" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                hello@techstalwarts.com
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-3.5 h-3.5 shrink-0" />
                +91 98765 43210
              </a>
            </div>

            {/* Offices */}
            <div className="flex flex-col gap-1.5">
              {OFFICES.map(({ city, detail }) => (
                <div key={city} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span><span className="text-foreground font-medium">{city}</span>, {detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map(({ label, links }) => (
            <div key={label} className="flex flex-col gap-4">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
              <ul className="flex flex-col gap-2.5">
                {links.map(({ text, href }) => (
                  <li key={text}>
                    <a
                      href={href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Separator className="relative z-10" />

      {/* ── Bottom bar ───────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          © {year} Techstalwarts Technologies Pvt. Ltd. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((l) => (
            <a key={l} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
