/**
 * Hero Video — YoucefBnm / 21st.dev
 * Scroll-driven video reveal with animated text stagger.
 * Ported to JSX and framer-motion (v12 compat).
 */
import * as React from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

const SPRING = {
  type: "spring",
  stiffness: 100,
  damping: 16,
  mass: 0.75,
  restDelta: 0.005,
};

/* ── Animation variants per direction ── */
function useVariants(animate) {
  return React.useMemo(
    () => ({
      hidden: {
        x: animate === "left" ? "-100%" : animate === "right" ? "100%" : 0,
        y: animate === "top" ? "-100%" : animate === "bottom" ? "100%" : 0,
        scale: animate === "z" ? 0 : 1,
        filter: animate === "blur" ? "blur(10px)" : "blur(0px)",
        opacity: 0,
      },
      visible: { x: 0, y: 0, scale: 1, filter: "blur(0px)", opacity: 1 },
    }),
    [animate]
  );
}

/* ── Scroll context ── */
const ScrollCtx = React.createContext(undefined);

/* ── ContainerScroll ── */
export const ContainerScroll = ({ children, className, ...props }) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  return (
    <ScrollCtx.Provider value={{ scrollYProgress }}>
      <section
        ref={ref}
        className={cn("relative min-h-[120vh] w-full pb-[30%] pt-8", className)}
        {...props}
      >
        {children}
      </section>
    </ScrollCtx.Provider>
  );
};

/* ── ContainerStagger ── */
export const ContainerStagger = React.forwardRef(
  ({ children, className, transition, viewport, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn("relative", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, ...viewport }}
      transition={{ staggerChildren: transition?.staggerChildren ?? 0.18, ...transition }}
      {...props}
    >
      {children}
    </motion.div>
  )
);
ContainerStagger.displayName = "ContainerStagger";

/* ── ContainerAnimated ── */
export const ContainerAnimated = React.forwardRef(
  ({ animation, children, className, ...props }, ref) => {
    const variants = useVariants(animation);
    return (
      <motion.div
        ref={ref}
        transition={SPRING}
        variants={variants}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
ContainerAnimated.displayName = "ContainerAnimated";

/* ── ContainerInset ── */
export const ContainerInset = React.forwardRef(
  (
    {
      translateYRange = ["-25%", "50%"],
      insetYRange = [35, 0],
      insetXRange = [42, 0],
      roundednessRange = [1000, 16],
      children,
      className,
      ...props
    },
    ref
  ) => {
    const ctx = React.useContext(ScrollCtx);
    if (!ctx) throw new Error("<ContainerInset> must be inside <ContainerScroll>");
    const { scrollYProgress } = ctx;

    const y          = useTransform(scrollYProgress, [0, 1], translateYRange);
    const insetY     = useTransform(scrollYProgress, [0, 1], insetYRange);
    const insetX     = useTransform(scrollYProgress, [0, 1], insetXRange);
    const roundedness = useTransform(scrollYProgress, [0, 1], roundednessRange);
    const clipPath   = useMotionTemplate`inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${roundedness}px)`;

    return (
      <motion.div
        ref={ref}
        transition={SPRING}
        className={cn("origin-top overflow-hidden", className)}
        style={{ y, clipPath, ...props.style }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
ContainerInset.displayName = "ContainerInset";

/* ── useHeroScroll — read scroll progress from any child of ContainerScroll ── */
export function useHeroScroll() {
  const ctx = React.useContext(ScrollCtx);
  if (!ctx) throw new Error("useHeroScroll must be used inside <ContainerScroll>");
  return ctx;
}
