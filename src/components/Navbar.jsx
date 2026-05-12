import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, Menu, X, Sun, Moon } from "lucide-react";

const NAV_SOLUTIONS = [
  { label: "Enterprise",     desc: "Digital transformation at scale",        href: "/solutions/enterprise" },
  { label: "Banking & NBFC", desc: "Core banking & lending platforms",        href: "/solutions/banking" },
  { label: "Fintech",        desc: "Payments, neobanking & open finance",     href: "/solutions/fintech" },
  { label: "Real Estate",    desc: "PropTech & smart CRM",                    href: "/solutions/real-estate" },
  { label: "Healthcare",     desc: "EHR, telemedicine & claims",              href: "/solutions/healthcare" },
  { label: "Logistics & Retail", desc: "POS, inventory & supply chain ops",   href: "/solutions/logistics-retail" },
  { label: "Travel & Mobility", desc: "Route planning & mobility ecosystems",    href: "/solutions/travel-mobility" },
  { label: "Events & Exhibition", desc: "Networking platforms & lead capture",  href: "/solutions/events" },
];

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [visible, setVisible]           = useState(true);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [isDark, setIsDark]             = useState(false);
  const [isLabPage, setIsLabPage]       = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    // Sync state with the class applied by the anti-FOUC script
    setIsDark(document.documentElement.classList.contains("dark"));
    setIsLabPage(window.location.pathname.startsWith("/stalwarts-lab"));
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setVisible(y < 80 ? true : y < lastY.current);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "color-mix(in oklch, var(--color-background) 90%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
        transform: visible ? "translateY(0)" : "translateY(-100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center">
          <img
            src={(isLabPage && !scrolled) ? "/images/TS-dark.png" : (isDark ? "/images/TS-dark.png" : "/images/TS-light.png")}
            alt="Techstalwarts"
            className="h-8 w-auto"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Solutions dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg hover:bg-secondary transition-colors"
              style={{ color: isLabPage && !scrolled ? "#9b9b9b" : undefined }}
            >
              Solutions
              <ChevronDown
                className="w-3.5 h-3.5 transition-transform duration-200"
                style={{ transform: solutionsOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>

            {solutionsOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[580px] rounded-xl border border-border bg-card p-4 shadow-2xl"
                style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.15)" }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 px-2">
                  Industry Solutions
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {NAV_SOLUTIONS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      className="flex flex-col gap-0.5 rounded-lg px-3 py-2.5 hover:bg-secondary transition-colors group"
                    >
                      <span
                        className="text-sm font-medium text-foreground transition-colors"
                        style={{ backgroundImage: "none" }}
                        onMouseEnter={(e) => { Object.assign(e.currentTarget.style, { backgroundImage: "linear-gradient(135deg, oklch(0.57 0.22 25), oklch(0.52 0.24 292))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }); }}
                        onMouseLeave={(e) => { Object.assign(e.currentTarget.style, { backgroundImage: "none", WebkitBackgroundClip: "unset", WebkitTextFillColor: "unset", backgroundClip: "unset" }); }}
                      >
                        {s.label}
                      </span>
                      <span className="text-xs text-muted-foreground">{s.desc}</span>
                    </a>
                  ))}
                </div>
                <Separator className="my-3" />
                <a
                  href="/solutions"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary hover:underline"
                >
                  View all solutions →
                </a>
              </div>
            )}
          </div>

          {[
            { label: "About Us",      href: "/about" },
            { label: "TS AI",         href: "/ts-ai" },
            { label: "Services",      href: "/services2" },
            { label: "StalwartsLAB",  href: "/stalwarts-lab" },
            { label: "Careers",       href: "/careers" },
            { label: "Contact",       href: "/contact" },
            { label: "Home2",         href: "/home2",  mono: true },
            { label: "Home3",         href: "/home3",  mono: true },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`px-3 py-2 text-sm font-medium rounded-lg hover:bg-secondary transition-colors${item.mono ? " font-mono text-xs" : ""}${isLabPage && !scrolled ? "" : " text-muted-foreground hover:text-foreground"}`}
              style={isLabPage && !scrolled ? { color: "#9b9b9b" } : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA + theme toggle */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`w-9 h-9 rounded-lg flex items-center justify-center border hover:bg-secondary transition-all${isLabPage && !scrolled ? " border-white/20" : " border-border text-muted-foreground hover:text-foreground"}`}
            style={isLabPage && !scrolled ? { color: "#9b9b9b" } : undefined}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <a href="/contact">
            <Button
              size="sm"
              className="rounded-full gap-2 font-semibold"
              style={{
                background: "linear-gradient(135deg, oklch(0.57 0.22 25), oklch(0.52 0.24 292))",
                boxShadow: "0 0 18px color-mix(in oklch, oklch(0.57 0.22 25) 30%, transparent)",
              }}
            >
              Start Conversation
            </Button>
          </a>
        </div>

        {/* Mobile controls */}
        <div className="lg:hidden flex items-center gap-2">
          {/* Theme toggle — mobile */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 text-muted-foreground hover:text-foreground"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            className="p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-card px-4 sm:px-6 py-4 flex flex-col gap-1 overflow-y-auto max-h-[80vh]">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 mt-1">
            Solutions
          </p>
          {NAV_SOLUTIONS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="py-2 text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {s.label}
            </a>
          ))}
          <Separator className="my-2" />
          {[
            { label: "About Us",      href: "/about" },
            { label: "TS AI",         href: "/ts-ai" },
            { label: "Services",      href: "/services2" },
            { label: "StalwartsLAB",  href: "/stalwarts-lab" },
            { label: "Careers",       href: "/careers" },
            { label: "Contact",       href: "/contact" },
            { label: "Home2",         href: "/home2" },
            { label: "Home3",         href: "/home3" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="py-2 text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a href="/contact" className="mt-3">
            <Button
              className="rounded-full w-full"
              style={{ background: "linear-gradient(135deg, oklch(0.57 0.22 25), oklch(0.52 0.24 292))" }}
            >
              Start Conversation
            </Button>
          </a>
        </div>
      )}
    </header>
  );
}
