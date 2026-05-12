import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

/**
 * Placeholder detail page — rendered when a user clicks
 * "Explore X Solutions" from an industry card.
 * Replace with a full routed page once React Router is added.
 */
export default function SolutionDetail({ industry, onBack }) {
  if (!industry) return null;
  const Icon = industry.icon;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{
            background: `color-mix(in oklch, ${industry.accentColor} 18%, transparent)`,
            border: `1px solid color-mix(in oklch, ${industry.accentColor} 35%, transparent)`,
          }}
        >
          <Icon className="w-8 h-8" style={{ color: industry.accentColor }} />
        </div>

        <Badge
          variant="outline"
          className="mb-4 rounded-full px-4 uppercase tracking-widest text-xs"
          style={{
            borderColor: `color-mix(in oklch, ${industry.accentColor} 40%, transparent)`,
            color: industry.accentColor,
          }}
        >
          {industry.label} Solution
        </Badge>

        <h1 className="text-4xl font-bold text-foreground mb-4">
          {industry.tagline}
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          This is the dedicated solution page for <strong className="text-foreground">{industry.label}</strong>.
          Full page content — case studies, product modules, demo request form, and
          ROI calculator — will be built here.
        </p>
        <Button
          variant="outline"
          className="rounded-full gap-2"
          onClick={onBack}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Solutions
        </Button>
      </div>
    </div>
  );
}
