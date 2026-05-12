/**
 * FullScreenScrollFX — Scottclayton3d / 21st.dev
 * Ported to JSX. Key fixes:
 *  - position:relative on .fx-center (critical for absolute-positioned titles)
 *  - word init deferred to useEffect so WordsCollector refs are ready
 *  - stable goTo/changeSection refs via useRef to avoid stale closures
 */
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));

const FX_CSS = `
.fx { width:100%; overflow:hidden; background:var(--fx-page-bg); font-family:var(--fx-font); text-transform:uppercase; letter-spacing:-0.02em; }
.fx-fixed-section { position:relative; }
.fx-fixed { position:sticky; top:0; height:100vh; width:100%; overflow:hidden; background:var(--fx-stage-bg); }
.fx-bgs { position:absolute; inset:0; background:var(--fx-stage-bg); z-index:1; }
.fx-bg  { position:absolute; inset:0; }
.fx-bg-img {
  position:absolute; inset:-10% 0 -10% 0;
  width:100%; height:120%; object-fit:cover;
  filter:brightness(0.75); opacity:0; will-change:transform,opacity;
}
.fx-bg-overlay { position:absolute; inset:0; background:var(--fx-overlay); }
.fx-grid {
  display:grid; grid-template-columns:repeat(12,1fr);
  gap:var(--fx-gap); padding:0 var(--fx-grid-px);
  position:relative; height:100%; z-index:2;
}
.fx-header {
  grid-column:1/13; align-self:start; padding-top:6vh;
  font-size:clamp(0.7rem,1.4vw,1.1rem); line-height:1;
  text-align:center; color:var(--fx-text); letter-spacing:0.22em;
}
.fx-content {
  grid-column:1/13; position:absolute; inset:0;
  display:grid; grid-template-columns:1fr 1.4fr 1fr;
  align-items:center; height:100%; padding:0 var(--fx-grid-px);
}
.fx-left,.fx-right { height:60vh; overflow:hidden; display:grid; align-content:center; }
.fx-left  { justify-items:start; }
.fx-right { justify-items:end; }
.fx-track { will-change:transform; }
.fx-item {
  color:var(--fx-text); font-weight:700; letter-spacing:0.02em;
  line-height:1; margin:calc(var(--fx-row-gap)/2) 0;
  opacity:0.3; position:relative;
  font-size:clamp(0.85rem,2vw,1.5rem); user-select:none; cursor:pointer;
}
.fx-left-item.active  { opacity:1; transform:translateX(10px);  padding-left:16px; }
.fx-right-item.active { opacity:1; transform:translateX(-10px); padding-right:16px; }
.fx-left-item.active::before,.fx-right-item.active::after {
  content:""; position:absolute; top:50%; transform:translateY(-50%);
  width:5px; height:5px; background:var(--fx-text); border-radius:50%;
}
.fx-left-item.active::before  { left:0; }
.fx-right-item.active::after  { right:0; }
/* FIX: position:relative required so absolute-positioned titles anchor here */
.fx-center {
  position:relative;
  display:grid; place-items:center;
  text-align:center; height:60vh; overflow:hidden;
}
.fx-featured { position:absolute; opacity:0; visibility:hidden; width:100%; }
.fx-featured.active { opacity:1; visibility:visible; }
.fx-featured-title {
  margin:0; color:var(--fx-text); font-weight:300;
  letter-spacing:-0.03em; font-size:clamp(2.2rem,7vw,6rem); line-height:1.08;
}
.fx-word-mask { display:inline-block; overflow:hidden; vertical-align:middle; }
.fx-word      { display:inline-block; vertical-align:middle; }
.fx-footer { grid-column:1/13; align-self:end; padding-bottom:5vh; text-align:center; }
.fx-footer-title { color:var(--fx-text); font-size:clamp(1.2rem,4vw,4rem); font-weight:300; letter-spacing:-0.02em; line-height:0.9; }
.fx-progress { width:160px; height:1px; margin:1.4rem auto 0; background:rgba(245,245,245,0.18); position:relative; }
.fx-progress-fill { position:absolute; inset:0 auto 0 0; width:0%; background:var(--fx-text); height:100%; transition:width 0.35s ease; }
.fx-progress-numbers { position:absolute; inset:auto 0 calc(100%+6px) 0; display:flex; justify-content:space-between; font-size:0.68rem; color:var(--fx-text); opacity:0.6; }
.fx-end { display:none; }
@media (max-width:860px) {
  .fx-content { grid-template-columns:1fr; place-items:center; }
  .fx-left,.fx-right { display:none; }
  .fx-center { height:70vh; }
}
`;

export const FullScreenScrollFX = forwardRef((
  {
    sections,
    className,
    style,
    fontFamily = '"Helvetica Neue", Helvetica, Arial, sans-serif',
    header,
    footer,
    gap = 1,
    gridPaddingX = 5,
    showProgress = true,
    durations = { change: 0.7, snap: 900 },
    bgTransition = "fade",
    parallaxAmount = 5,
    initialIndex = 0,
    colors = { text: "rgba(245,245,245,0.93)", overlay: "rgba(0,0,0,0.40)", pageBg: "#080808", stageBg: "#080808" },
    onIndexChange,
    apiRef,
    ariaLabel = "Full screen scroll slideshow",
  },
  ref
) => {
  const total = sections.length;
  const [activeIdx, setActiveIdx] = useState(clamp(initialIndex, 0, total - 1));

  const fixedRef        = useRef(null);
  const fixedSecRef     = useRef(null);
  const bgRefs          = useRef([]);
  const wordRefs        = useRef([]);          // wordRefs.current[sIdx] = HTMLElement[]
  const leftTrackRef    = useRef(null);
  const rightTrackRef   = useRef(null);
  const leftItemRefs    = useRef([]);
  const rightItemRefs   = useRef([]);
  const progressFillRef = useRef(null);
  const curNumRef       = useRef(null);
  const lastIdxRef      = useRef(activeIdx);
  const isAnimRef       = useRef(false);
  const isSnapRef       = useRef(false);
  const secTopsRef      = useRef([]);
  const tempBucket      = useRef([]);          // collects word spans during render

  // ── inject CSS once ──────────────────────────────────────────────
  useEffect(() => {
    if (document.getElementById("fx-styles")) return;
    const tag = document.createElement("style");
    tag.id = "fx-styles";
    tag.textContent = FX_CSS;
    document.head.appendChild(tag);
  }, []);

  // ── helpers ──────────────────────────────────────────────────────
  const D = () => durations.change ?? 0.7;

  const raf2 = (fn) => requestAnimationFrame(() => requestAnimationFrame(fn));

  const computePositions = () => {
    const el = fixedSecRef.current;
    if (!el) return;
    const tops = [];
    for (let i = 0; i < total; i++)
      tops.push(el.offsetTop + (el.offsetHeight * i) / total);
    secTopsRef.current = tops;
  };

  const centerTracks = (toIdx, animate) => {
    const doTrack = (container, items, trackRef) => {
      if (!container || !items[0] || !trackRef.current) return;
      const rect  = container.getBoundingClientRect();
      const first = items[0].getBoundingClientRect();
      const rowH  = items[1]
        ? items[1].getBoundingClientRect().top - first.top
        : first.height;
      const targetY = rect.height / 2 - rowH / 2 - toIdx * rowH;
      animate
        ? gsap.to(trackRef.current, { y: targetY, duration: D() * 0.9, ease: "power3.out" })
        : gsap.set(trackRef.current, { y: targetY });
    };
    raf2(() => {
      doTrack(leftTrackRef.current,  leftItemRefs.current,  leftTrackRef);
      doTrack(rightTrackRef.current, rightItemRefs.current, rightTrackRef);
    });
  };

  const changeSection = (to) => {
    if (to === lastIdxRef.current || isAnimRef.current) return;
    const from = lastIdxRef.current;
    const down = to > from;
    isAnimRef.current = true;

    setActiveIdx(to);
    onIndexChange?.(to);
    if (curNumRef.current)    curNumRef.current.textContent = String(to + 1).padStart(2, "0");
    if (progressFillRef.current) progressFillRef.current.style.width = `${(to / (total - 1 || 1)) * 100}%`;

    // words
    const outW = wordRefs.current[from] || [];
    const inW  = wordRefs.current[to]   || [];
    if (outW.length) gsap.to(outW, { yPercent: down ? -100 : 100, opacity: 0, duration: D() * 0.6, stagger: down ? 0.03 : -0.03, ease: "power3.out" });
    if (inW.length)  { gsap.set(inW, { yPercent: down ? 100 : -100, opacity: 0 }); gsap.to(inW, { yPercent: 0, opacity: 1, duration: D(), stagger: down ? 0.05 : -0.05, ease: "power3.out" }); }

    // backgrounds
    const prevBg = bgRefs.current[from];
    const newBg  = bgRefs.current[to];
    if (bgTransition === "fade") {
      if (newBg)  { gsap.set(newBg, { opacity: 0, scale: 1.04, yPercent: down ? 1 : -1 }); gsap.to(newBg, { opacity: 1, scale: 1, yPercent: 0, duration: D(), ease: "power2.out" }); }
      if (prevBg) gsap.to(prevBg, { opacity: 0, yPercent: down ? -parallaxAmount : parallaxAmount, duration: D(), ease: "power2.out" });
    } else {
      if (newBg)  { gsap.set(newBg, { opacity: 1, clipPath: down ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)", scale: 1 }); gsap.to(newBg, { clipPath: "inset(0 0 0 0)", duration: D(), ease: "power3.out" }); }
      if (prevBg) gsap.to(prevBg, { opacity: 0, duration: D() * 0.8, ease: "power2.out" });
    }

    // side labels
    centerTracks(to, true);
    leftItemRefs.current.forEach((el, i) => {
      el.classList.toggle("active", i === to);
      gsap.to(el, { opacity: i === to ? 1 : 0.3, x: i === to ? 10 : 0, duration: D() * 0.6, ease: "power3.out" });
    });
    rightItemRefs.current.forEach((el, i) => {
      el.classList.toggle("active", i === to);
      gsap.to(el, { opacity: i === to ? 1 : 0.3, x: i === to ? -10 : 0, duration: D() * 0.6, ease: "power3.out" });
    });

    gsap.delayedCall(D(), () => { lastIdxRef.current = to; isAnimRef.current = false; });
  };

  const goTo = (to, withScroll = true) => {
    const idx = clamp(to, 0, total - 1);
    isSnapRef.current = true;
    changeSection(idx);
    if (withScroll) {
      const pos = secTopsRef.current[idx] ?? 0;
      window.scrollTo({ top: pos, behavior: "smooth" });
      setTimeout(() => (isSnapRef.current = false), durations.snap ?? 900);
    } else {
      setTimeout(() => (isSnapRef.current = false), 10);
    }
  };

  useImperativeHandle(apiRef, () => ({
    next: () => goTo(lastIdxRef.current + 1),
    prev: () => goTo(lastIdxRef.current - 1),
    goTo,
    getIndex: () => lastIdxRef.current,
    refresh: () => ScrollTrigger.refresh(),
  }));

  // ── main setup ───────────────────────────────────────────────────
  useEffect(() => {
    const fixed = fixedRef.current;
    const fs    = fixedSecRef.current;
    if (!fixed || !fs || total === 0) return;

    // init backgrounds
    gsap.set(bgRefs.current, { opacity: 0, scale: 1.04 });
    if (bgRefs.current[0]) gsap.set(bgRefs.current[0], { opacity: 1, scale: 1 });

    // init side labels
    leftItemRefs.current.forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 16 }, { opacity: i === 0 ? 1 : 0.3, y: 0, duration: 0.5, delay: i * 0.06, ease: "power3.out" });
    });
    rightItemRefs.current.forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 16 }, { opacity: i === 0 ? 1 : 0.3, y: 0, duration: 0.5, delay: 0.15 + i * 0.06, ease: "power3.out" });
    });

    computePositions();
    centerTracks(0, false);

    // init word positions (deferred so WordsCollector useEffects have run)
    setTimeout(() => {
      wordRefs.current.forEach((words, sIdx) => {
        if (!words) return;
        gsap.set(words, { yPercent: sIdx === 0 ? 0 : 100, opacity: sIdx === 0 ? 1 : 0 });
      });
    }, 0);

    // ScrollTrigger
    const st = ScrollTrigger.create({
      trigger: fs,
      start: "top top",
      end: "bottom bottom",
      pin: fixed,
      pinSpacing: true,
      onUpdate: (self) => {
        if (isSnapRef.current) return;
        const target = Math.min(total - 1, Math.floor(self.progress * total));
        if (target !== lastIdxRef.current && !isAnimRef.current) {
          goTo(lastIdxRef.current + (target > lastIdxRef.current ? 1 : -1), false);
        }
        if (progressFillRef.current) {
          progressFillRef.current.style.width = `${(lastIdxRef.current / (total - 1 || 1)) * 100}%`;
        }
      },
    });

    const ro = new ResizeObserver(() => { computePositions(); centerTracks(lastIdxRef.current, false); ScrollTrigger.refresh(); });
    ro.observe(fs);

    return () => { ro.disconnect(); st.kill(); };
  }, [total]);

  // ── CSS vars ─────────────────────────────────────────────────────
  const cssVars = {
    "--fx-font":     fontFamily,
    "--fx-text":     colors.text    ?? "rgba(245,245,245,0.93)",
    "--fx-overlay":  colors.overlay ?? "rgba(0,0,0,0.40)",
    "--fx-page-bg":  colors.pageBg  ?? "#080808",
    "--fx-stage-bg": colors.stageBg ?? "#080808",
    "--fx-gap":      `${gap}rem`,
    "--fx-grid-px":  `${gridPaddingX}rem`,
    "--fx-row-gap":  "14px",
  };

  // ── render ───────────────────────────────────────────────────────
  return (
    <div ref={ref} className={["fx", className].filter(Boolean).join(" ")} style={{ ...cssVars, ...style }} aria-label={ariaLabel}>
      <div
        className="fx-fixed-section"
        ref={fixedSecRef}
        style={{ height: `${(total + 1) * 100}vh` }}
      >
        <div className="fx-fixed" ref={fixedRef}>

          {/* Backgrounds */}
          <div className="fx-bgs" aria-hidden="true">
            {sections.map((s, i) => (
              <div className="fx-bg" key={s.id ?? i}>
                {s.renderBackground ? s.renderBackground(activeIdx === i) : (
                  <>
                    <img ref={(el) => el && (bgRefs.current[i] = el)} src={s.background} alt="" className="fx-bg-img" />
                    <div className="fx-bg-overlay" />
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="fx-grid">
            {header && <div className="fx-header">{header}</div>}

            <div className="fx-content">
              {/* Left labels */}
              <div className="fx-left" role="list">
                <div className="fx-track" ref={leftTrackRef}>
                  {sections.map((s, i) => (
                    <div key={`L-${i}`}
                      className={`fx-item fx-left-item${i === activeIdx ? " active" : ""}`}
                      ref={(el) => el && (leftItemRefs.current[i] = el)}
                      onClick={() => goTo(i)} role="button" tabIndex={0}
                    >{s.leftLabel}</div>
                  ))}
                </div>
              </div>

              {/* Center titles */}
              <div className="fx-center">
                {sections.map((s, sIdx) => {
                  tempBucket.current = [];
                  const isStr = typeof s.title === "string";
                  const words = isStr
                    ? s.title.split(/\s+/).filter(Boolean).map((w, wi) => (
                        <span className="fx-word-mask" key={wi}>
                          <span className="fx-word" ref={(el) => el && tempBucket.current.push(el)}>{w}</span>
                          {wi < s.title.split(/\s+/).filter(Boolean).length - 1 ? " " : null}
                        </span>
                      ))
                    : s.title;

                  // WordsCollector: flush tempBucket into wordRefs after render
                  const WordsReady = () => {
                    useEffect(() => {
                      if (tempBucket.current.length) {
                        wordRefs.current[sIdx] = [...tempBucket.current];
                        tempBucket.current = [];
                      }
                    }, []);
                    return null;
                  };

                  return (
                    <div key={`C-${sIdx}`} className={`fx-featured${sIdx === activeIdx ? " active" : ""}`}>
                      <h2 className="fx-featured-title">{words}</h2>
                      {isStr && <WordsReady />}
                    </div>
                  );
                })}
              </div>

              {/* Right labels */}
              <div className="fx-right" role="list">
                <div className="fx-track" ref={rightTrackRef}>
                  {sections.map((s, i) => (
                    <div key={`R-${i}`}
                      className={`fx-item fx-right-item${i === activeIdx ? " active" : ""}`}
                      ref={(el) => el && (rightItemRefs.current[i] = el)}
                      onClick={() => goTo(i)} role="button" tabIndex={0}
                    >{s.rightLabel}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer + progress */}
            <div className="fx-footer">
              {footer && <div className="fx-footer-title">{footer}</div>}
              {showProgress && (
                <div className="fx-progress">
                  <div className="fx-progress-numbers">
                    <span ref={curNumRef}>01</span>
                    <span>{String(total).padStart(2, "0")}</span>
                  </div>
                  <div className="fx-progress-fill" ref={progressFillRef} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="fx-end" />
    </div>
  );
});

FullScreenScrollFX.displayName = "FullScreenScrollFX";
export default FullScreenScrollFX;
