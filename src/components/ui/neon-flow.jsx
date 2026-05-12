/**
 * Neon Flow — yashvw25 / 21st.dev
 * Three.js tube cursor animation via threejs-components CDN.
 * Ported to JSX, SSR-safe (effect runs client-only).
 */
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const randomColors = (count) =>
  Array.from({ length: count }, () =>
    "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")
  );

export function TubesBackground({
  children,
  className,
  tubeColors = ["#DC2626", "#7C3AED", "#f97316"],
  lightColors = ["#7C3AED", "#DC2626", "#f97316", "#ec4899"],
  enableClickInteraction = true,
}) {
  const canvasRef = useRef(null);
  const tubesRef  = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      if (!canvasRef.current) return;
      try {
        const mod = await import(
          /* @vite-ignore */
          "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"
        );
        const TubesCursor = mod.default;
        if (!mounted) return;

        tubesRef.current = TubesCursor(canvasRef.current, {
          tubes: {
            colors: tubeColors,
            lights: { intensity: 200, colors: lightColors },
          },
        });
        setLoaded(true);
      } catch (e) {
        console.error("TubesBackground: failed to load", e);
      }
    })();

    return () => { mounted = false; };
  }, []);

  const handleClick = () => {
    if (!enableClickInteraction || !tubesRef.current) return;
    tubesRef.current.tubes.setColors(randomColors(3));
    tubesRef.current.tubes.setLightsColors(randomColors(4));
  };

  return (
    <div
      className={cn("relative w-full h-full overflow-hidden", className)}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ touchAction: "none" }}
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}

export default TubesBackground;
