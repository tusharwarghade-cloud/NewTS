import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

/* ── Card grid (3-col feature cards with images) ── */
export function FeatureCards({ features = [], className }) {
  return (
    <div className={cn("flex flex-wrap items-start justify-center gap-10", className)}>
      {features.map((f, i) => (
        <div key={i} className="max-w-80 hover:-translate-y-0.5 transition duration-300">
          <img className="rounded-xl w-full" src={f.image} alt={f.title} />
          <h3 className="text-base font-semibold text-foreground mt-4">{f.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{f.description}</p>
        </div>
      ))}
    </div>
  );
}

/* ── Asymmetric layout (2-col hero image + 1-col detail) ── */
export function FeatureShowcase({ heroImage, detailImage, title, description, linkText, linkHref, className }) {
  return (
    <div className={cn("relative mx-auto max-w-5xl px-4", className)}>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-10">
        <div className="md:col-span-2">
          <img alt="features showcase" className="rounded-xl w-full" src={heroImage} />
        </div>
        <div className="md:col-span-1">
          <img alt="features detail" className="rounded-xl hover:-translate-y-0.5 transition duration-300 w-full" src={detailImage} />
          <h3 className="text-2xl leading-tight text-foreground font-medium mt-6">{title}</h3>
          <p className="text-muted-foreground mt-2">{description}</p>
          {linkText && (
            <a href={linkHref} className="group flex items-center gap-2 mt-4 text-primary hover:text-primary/80 transition">
              {linkText}
              <ArrowUpRight className="size-5 group-hover:translate-x-0.5 transition duration-300" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
