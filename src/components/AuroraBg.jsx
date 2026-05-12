/**
 * AuroraBg
 * Animated aurora glow effect — drop inside any `position: relative` container.
 *
 * variant="dark"  — brand red/purple blobs on dark background
 * variant="light" — soft pastel blobs for white/light sections
 */
export default function AuroraBg({ variant = "dark" }) {
  const blobs =
    variant === "dark"
      ? [
          // red
          { color: "oklch(0.57 0.22 25)",  w: 700, h: 500, top: "-15%", left: "-10%", delay: "0s",   dur: "10s"  },
          // purple
          { color: "oklch(0.52 0.24 292)",  w: 600, h: 600, top: "30%",  right: "-15%", delay: "2s",  dur: "13s"  },
          // mid red-purple
          { color: "oklch(0.54 0.23 340)",  w: 500, h: 400, top: "55%",  left: "25%",   delay: "4s",  dur: "11s"  },
          // faint purple accent
          { color: "oklch(0.48 0.22 280)",  w: 400, h: 400, top: "-5%",  right: "25%",  delay: "6s",  dur: "14s"  },
        ]
      : [
          // soft rose
          { color: "oklch(0.88 0.10 15)",   w: 700, h: 500, top: "-20%", left: "-5%",   delay: "0s",   dur: "11s"  },
          // soft lavender
          { color: "oklch(0.84 0.10 292)",  w: 600, h: 600, top: "40%",  right: "-10%", delay: "2.5s", dur: "13s"  },
          // soft peach
          { color: "oklch(0.90 0.08 50)",   w: 500, h: 400, top: "60%",  left: "20%",   delay: "5s",   dur: "12s"  },
          // pale violet
          { color: "oklch(0.87 0.08 270)",  w: 450, h: 450, top: "-8%",  right: "30%",  delay: "7s",   dur: "15s"  },
        ];

  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {blobs.map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width:  b.w,
            height: b.h,
            top:    b.top    ?? "auto",
            left:   b.left   ?? "auto",
            right:  b.right  ?? "auto",
            bottom: b.bottom ?? "auto",
            borderRadius: "50%",
            background: b.color,
            filter: `blur(${variant === "dark" ? 110 : 90}px)`,
            opacity: variant === "dark" ? 0.38 : 0.55,
            animation: `aurora-float ${b.dur} ease-in-out ${b.delay} infinite alternate`,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
