import { useEffect, useRef } from "react";

/* ─── helpers ──────────────────────────────────────────────────── */
const rng = (min, max) => Math.random() * (max - min) + min;

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/* ─── Particle ──────────────────────────────────────────────────── */
class Particle {
  constructor(canvas, opts) {
    this.canvas = canvas;
    this.opts = opts;
    this.init(true);
  }

  init(scatter = false) {
    const { minSize, maxSize } = this.opts;
    this.x = rng(0, this.canvas.width);
    this.y = rng(0, this.canvas.height);
    this.size = rng(minSize, maxSize);
    this.maxOpacity = rng(0.45, 1.0);
    this.inDur  = Math.floor(rng(30, 70));
    this.holdDur = Math.floor(rng(20, 90));
    this.outDur  = Math.floor(rng(30, 70));
    this.total   = this.inDur + this.holdDur + this.outDur;
    this.t = scatter ? Math.floor(rng(0, this.total)) : 0;
    // tiny drift
    this.vx = rng(-0.06, 0.06);
    this.vy = rng(-0.10, 0.02);
  }

  get opacity() {
    const { t, inDur, holdDur, outDur, total, maxOpacity } = this;
    if (t < inDur)               return (t / inDur) * maxOpacity;
    if (t < inDur + holdDur)     return maxOpacity;
    if (t < total)               return ((total - t) / outDur) * maxOpacity;
    return 0;
  }

  update() {
    this.t += this.opts.speed;
    this.x += this.vx * this.opts.speed;
    this.y += this.vy * this.opts.speed;
    if (this.t >= this.total) this.init(false);
  }

  draw(ctx, rgb) {
    const op = this.opacity;
    if (op <= 0) return;
    const { x, y, size: r } = this;
    const [red, green, blue] = rgb;

    ctx.save();

    // Outer soft glow
    const grd = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
    grd.addColorStop(0,   `rgba(${red},${green},${blue},${(op * 0.35).toFixed(3)})`);
    grd.addColorStop(0.5, `rgba(${red},${green},${blue},${(op * 0.12).toFixed(3)})`);
    grd.addColorStop(1,   `rgba(${red},${green},${blue},0)`);
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(x, y, r * 4, 0, Math.PI * 2);
    ctx.fill();

    // 4-pointed star shape
    ctx.globalAlpha = op;
    ctx.fillStyle = `rgb(${red},${green},${blue})`;
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4 - Math.PI / 2;
      const radius = i % 2 === 0 ? r : r * 0.38;
      const px = x + radius * Math.cos(angle);
      const py = y + radius * Math.sin(angle);
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }
}

/* ─── SparklesCore ──────────────────────────────────────────────── */
export default function SparklesCore({
  className = "",
  background = "transparent",
  particleColor = "#ffffff",
  particleDensity = 120,
  minSize = 0.6,
  maxSize = 1.8,
  speed = 1,
}) {
  const canvasRef = useRef(null);
  // Keep a stable ref for opts so the effect doesn't re-run on every render
  const optsRef = useRef({ particleColor, particleDensity, minSize, maxSize, speed });
  useEffect(() => {
    optsRef.current = { particleColor, particleDensity, minSize, maxSize, speed };
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let particles = [];

    function resize() {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width  = Math.floor(width  * devicePixelRatio);
      canvas.height = Math.floor(height * devicePixelRatio);
      // Reset transform before scaling (canvas.width assignment resets it,
      // but be explicit to avoid accumulation on repeated calls)
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      // Rebuild particles on resize so they span the new dimensions
      particles = Array.from(
        { length: optsRef.current.particleDensity },
        () => new Particle(canvas, { ...optsRef.current,
          // pass logical dims so coords map to CSS pixels
          width:  Math.floor(width),
          height: Math.floor(height),
        })
      );
      // Override canvas dims used in Particle with logical pixel values
      particles.forEach((p) => {
        p.canvas = { width: Math.floor(width), height: Math.floor(height) };
        p.init(true);
      });
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const rgb = hexToRgb(optsRef.current.particleColor);

    function animate() {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.update();
        p.draw(ctx, rgb);
      }
      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(animId);
    };
  }, []); // run once; opts are read via optsRef

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ background, display: "block" }}
    />
  );
}
