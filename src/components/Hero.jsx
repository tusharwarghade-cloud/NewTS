import { useEffect, useRef } from "react";

const TYPED_WORDS = [
  "Web Applications",
  "Mobile Products",
  "Cloud Solutions",
  "AI Integrations",
  "Scalable APIs",
];

function useTypingEffect(words, speed = 80, pause = 1800) {
  const elRef = useRef(null);

  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer;

    function tick() {
      const word = words[wordIndex];
      const current = deleting
        ? word.slice(0, charIndex - 1)
        : word.slice(0, charIndex + 1);

      if (elRef.current) elRef.current.textContent = current;

      if (!deleting && current === word) {
        timer = setTimeout(() => { deleting = true; tick(); }, pause);
        return;
      }
      if (deleting && current === "") {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        charIndex = 0;
        timer = setTimeout(tick, 300);
        return;
      }

      charIndex = deleting ? charIndex - 1 : charIndex + 1;
      timer = setTimeout(tick, deleting ? speed / 2 : speed);
    }

    tick();
    return () => clearTimeout(timer);
  }, [words, speed, pause]);

  return elRef;
}

export default function Hero() {
  const typedRef = useTypingEffect(TYPED_WORDS);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0E1A]">
      {/* Mesh gradient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.18) 0%, transparent 70%), " +
            "radial-gradient(ellipse 60% 50% at 80% 80%, rgba(124,58,237,0.12) 0%, transparent 60%), " +
            "radial-gradient(ellipse 50% 40% at 10% 90%, rgba(16,185,129,0.07) 0%, transparent 60%)",
        }}
      />

      {/* Grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#818CF8 1px, transparent 1px), linear-gradient(90deg, #818CF8 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orb */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #6366F1 0%, transparent 70%)" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#1F2937] bg-[#111827] px-4 py-1.5 mb-8">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm text-[#9CA3AF] font-medium tracking-wide">
            Available for new projects
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#F9FAFB] leading-tight tracking-tight mb-6">
          We Build{" "}
          <span className="relative inline-block">
            <span
              ref={typedRef}
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #6366F1 0%, #818CF8 50%, #7C3AED 100%)",
              }}
            />
            <span
              className="inline-block w-0.5 h-[1em] align-middle ml-0.5 bg-indigo-400 animate-pulse"
              style={{ verticalAlign: "text-bottom" }}
            />
          </span>
          <br />
          <span className="text-[#F9FAFB]">That Scale</span>
        </h1>

        {/* Subheading */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-[#9CA3AF] leading-relaxed mb-10">
          From MVPs to enterprise platforms — we design, develop, and ship
          software that solves real problems and grows with your business.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-base font-semibold text-white transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #6366F1 0%, #7C3AED 100%)",
              boxShadow: "0 0 24px rgba(124,58,237,0.35)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 40px rgba(124,58,237,0.55)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 24px rgba(124,58,237,0.35)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Get a Free Quote
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full border border-[#1F2937] bg-[#111827] px-8 py-3.5 text-base font-semibold text-[#F9FAFB] transition-all duration-300 hover:border-indigo-500/50 hover:bg-[#1a2035]"
          >
            View Our Work
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto border-t border-[#1F2937] pt-10">
          {[
            { value: "120+", label: "Projects Shipped" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "8yr", label: "In the Industry" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div
                className="text-2xl font-bold text-transparent bg-clip-text mb-1"
                style={{ backgroundImage: "linear-gradient(135deg, #818CF8, #6366F1)" }}
              >
                {value}
              </div>
              <div className="text-xs text-[#9CA3AF]">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 inset-x-0 h-32"
        style={{ background: "linear-gradient(to top, #0A0E1A, transparent)" }}
      />
    </section>
  );
}
