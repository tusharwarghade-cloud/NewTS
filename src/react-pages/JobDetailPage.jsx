import { useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import AuroraBg from "@/components/AuroraBg";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft, MapPin, Clock, Briefcase, CheckCircle2,
  ArrowRight, Upload, Send, Linkedin, Globe,
} from "lucide-react";
import { JOBS } from "@/data/jobs";

/* ── Brand ──────────────────────────────────────────────────────── */
const BG   = "linear-gradient(135deg, oklch(0.57 0.22 25) 0%, oklch(0.52 0.24 292) 100%)";
const GLOW = "0 0 28px color-mix(in oklch, oklch(0.57 0.22 25) 32%, transparent)";
const GT   = { backgroundImage: BG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };

function GradientDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute", overflow: "hidden" }} aria-hidden>
      <defs>
        <linearGradient id="jd-icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#DC2626" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function GBadge({ children }) {
  return (
    <Badge variant="outline" className="mb-4 rounded-full px-4 text-xs uppercase tracking-widest font-semibold border-primary/30 bg-primary/5" style={GT}>
      {children}
    </Badge>
  );
}

const inputCls  = "w-full rounded-xl border border-border bg-card/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-card transition-colors";
const labelCls  = "block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5";
const textareaCls = `${inputCls} resize-none`;

export default function JobDetailPage({ slug }) {
  const job = JOBS.find(j => j.slug === slug);

  const [form, setForm] = useState({
    name: "", email: "", phone: "", linkedin: "", portfolio: "",
    experience: "", coverLetter: "", source: "", resume: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [dragging, setDragging] = useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  function handleFileDrop(e) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer?.files?.[0] || e.target?.files?.[0];
    if (file) setForm(f => ({ ...f, resume: file }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Position not found.</p>
        <Button onClick={() => window.location.hash = "#careers"} variant="outline" className="rounded-full gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Careers
        </Button>
      </div>
    );
  }

  const JobIcon = job.icon;

  return (
    <div className="bg-background min-h-screen">
      <GradientDefs />

      {/* ── Hero banner ────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 overflow-hidden border-b border-border">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 60% 0%, color-mix(in oklch, oklch(0.57 0.22 25) 8%, transparent) 0%, transparent 60%)" }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative">
          {/* Back */}
          <button
            onClick={() => window.location.hash = "#careers"}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            View All Open Roles
          </button>

          <div className="grid grid-cols-12 gap-8 items-start">
            <div className="col-span-8">
              <GBadge>{job.dept}</GBadge>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "color-mix(in oklch, oklch(0.57 0.22 25) 12%, transparent)", border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 22%, transparent)" }}>
                  <JobIcon className="w-7 h-7" stroke="url(#jd-icon-grad)" strokeWidth={1.5} />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-[1.1]">{job.title}</h1>
              </div>
              <div className="flex items-center gap-4 flex-wrap mt-4">
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" /> {job.location}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" /> {job.type}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Briefcase className="w-4 h-4" /> {job.mode}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "color-mix(in oklch, oklch(0.52 0.24 292) 10%, transparent)", color: "oklch(0.65 0.18 292)", border: "1px solid color-mix(in oklch, oklch(0.52 0.24 292) 20%, transparent)" }}>
                  {job.dept}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap mt-5">
                {job.tags.map(t => (
                  <span key={t} className="text-xs font-medium px-3 py-1 rounded-full border border-border text-muted-foreground">{t}</span>
                ))}
              </div>
            </div>

            {/* Sticky apply CTA */}
            <div className="col-span-4">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-base font-bold text-foreground mb-2">Ready to Make an Impact?</h3>
                <p className="text-xs text-muted-foreground mb-5 leading-relaxed">
                  Submit your application below. Every submission is reviewed by a human. Expect a direct response within 5 business days.
                </p>
                <Button
                  className="w-full rounded-xl gap-2 font-semibold text-white border-none"
                  style={{ background: BG, boxShadow: GLOW }}
                  onClick={() => document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Apply for this Role <ArrowRight className="w-4 h-4" />
                </Button>
                <Separator className="my-4" />
                <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                  <span>✦ Direct hires only — no agencies</span>
                  <span>✦ Remote-inclusive hiring process</span>
                  <span>✦ Response within 5 business days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Job description ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-12 gap-10">

        {/* Main content */}
        <div className="col-span-8 flex flex-col gap-12">

          {/* Overview */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">About the Role</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{job.overview}</p>
          </div>

          <Separator />

          {/* What you'll do */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">What You'll Work On</h2>
            <div className="rounded-2xl border border-border bg-card/40 p-6">
              <p className="text-sm text-muted-foreground leading-relaxed italic">{job.whatYoullDo}</p>
            </div>
          </div>

          <Separator />

          {/* Responsibilities */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-5">Key Responsibilities</h2>
            <div className="flex flex-col gap-3">
              {job.responsibilities.map((r, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" stroke="url(#jd-icon-grad)" strokeWidth={1.75} />
                  <span className="text-sm text-muted-foreground leading-relaxed">{r}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Requirements */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-5">Must Have</h2>
              <div className="flex flex-col gap-3">
                {job.mustHave.map((r, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: "oklch(0.57 0.22 25)" }} />
                    <span className="text-sm text-muted-foreground leading-relaxed">{r}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-5">Nice to Have</h2>
              <div className="flex flex-col gap-3">
                {job.niceToHave.map((r, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 opacity-40" style={{ background: "oklch(0.52 0.24 292)" }} />
                    <span className="text-sm text-muted-foreground leading-relaxed">{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-4 flex flex-col gap-6">
          {/* Role summary card */}
          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4 sticky top-24">
            <h3 className="text-sm font-bold text-foreground">Role Summary</h3>
            <Separator />
            {[
              ["Team",        job.dept],
              ["Location",    job.location],
              ["Engagement",  job.type],
              ["Setup",       job.mode],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{label}</span>
                <span className="text-xs font-semibold text-foreground">{value}</span>
              </div>
            ))}
            <Separator />
            <div>
              <p className="text-xs text-muted-foreground mb-2.5">Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {job.tags.map(t => (
                  <span key={t} className="text-[10px] font-medium px-2.5 py-1 rounded-full border border-border text-muted-foreground">{t}</span>
                ))}
              </div>
            </div>
            <Button
              className="w-full rounded-xl gap-2 font-semibold text-white border-none mt-2"
              style={{ background: BG, boxShadow: GLOW }}
              onClick={() => document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              Apply for this Role <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ── Application form ───────────────────────────────────── */}
      <section id="apply-form" className="border-t border-border py-24">
        <div className="max-w-7xl mx-auto px-6">

          {submitted ? (
            /* ── Success state ── */
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto text-center py-16"
            >
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: BG, boxShadow: GLOW }}>
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-3">Application Submitted!</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                Thank you for applying for <strong className="text-foreground">{job.title}</strong>. Our talent team will review your application and reach out within 5 business days.
              </p>
              <Button
                variant="outline"
                className="rounded-full gap-2"
                onClick={() => window.location.hash = "#careers"}
              >
                <ArrowLeft className="w-4 h-4" /> Back to all positions
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-12 gap-12">
              {/* Left */}
              <div className="col-span-4">
                <GBadge>Apply Now</GBadge>
                <h2 className="text-3xl font-bold text-foreground mb-4 leading-tight">
                  Join Us as a<br /><span className="brand-text">{job.title}</span>
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                  Complete the form and we'll be in touch. Every application is personally reviewed by our talent team — no automated rejections.
                </p>
                <div className="flex flex-col gap-4 text-sm text-muted-foreground">
                  {[
                    "Personal review by the hiring manager",
                    "Feedback provided at every stage",
                    "Response guaranteed within 5 business days",
                    "Transparent, respectful process",
                  ].map(pt => (
                    <div key={pt} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0" stroke="url(#jd-icon-grad)" strokeWidth={1.75} />
                      {pt}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <form className="col-span-8" onSubmit={handleSubmit}>
                <div className="rounded-2xl border border-border bg-card/40 p-8 flex flex-col gap-6">

                  {/* Personal */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Personal Information</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Full Name *</label>
                        <input required className={inputCls} placeholder="Jane Smith" value={form.name} onChange={set("name")} />
                      </div>
                      <div>
                        <label className={labelCls}>Email Address *</label>
                        <input required type="email" className={inputCls} placeholder="jane@company.com" value={form.email} onChange={set("email")} />
                      </div>
                      <div>
                        <label className={labelCls}>Phone Number</label>
                        <input className={inputCls} placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")} />
                      </div>
                      <div>
                        <label className={labelCls}>Years of Experience *</label>
                        <select required className={inputCls} value={form.experience} onChange={set("experience")} style={{ appearance: "none" }}>
                          <option value="" disabled>Select range</option>
                          <option>0–1 years</option>
                          <option>1–3 years</option>
                          <option>3–5 years</option>
                          <option>5–8 years</option>
                          <option>8+ years</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Links */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Online Profiles</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>LinkedIn URL</label>
                        <div className="relative">
                          <Linkedin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input className={`${inputCls} pl-10`} placeholder="linkedin.com/in/yourprofile" value={form.linkedin} onChange={set("linkedin")} />
                        </div>
                      </div>
                      <div>
                        <label className={labelCls}>Portfolio / GitHub</label>
                        <div className="relative">
                          <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input className={`${inputCls} pl-10`} placeholder="github.com/yourprofile" value={form.portfolio} onChange={set("portfolio")} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Resume upload */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Resume / CV *</p>
                    <label
                      className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed cursor-pointer transition-all py-10 px-6 text-center"
                      style={{ borderColor: dragging ? "oklch(0.57 0.22 25)" : "var(--color-border)", background: dragging ? "color-mix(in oklch, oklch(0.57 0.22 25) 5%, transparent)" : "transparent" }}
                      onDragOver={e => { e.preventDefault(); setDragging(true); }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={handleFileDrop}
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "color-mix(in oklch, oklch(0.57 0.22 25) 10%, transparent)", border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 20%, transparent)" }}>
                        <Upload className="w-5 h-5" stroke="url(#jd-icon-grad)" strokeWidth={1.6} />
                      </div>
                      {form.resume ? (
                        <span className="text-sm font-semibold text-foreground">{form.resume.name}</span>
                      ) : (
                        <>
                          <span className="text-sm font-semibold text-foreground">Drop your resume here</span>
                          <span className="text-xs text-muted-foreground">or click to browse · PDF, DOC, DOCX up to 10MB</span>
                        </>
                      )}
                      <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileDrop} />
                    </label>
                  </div>

                  <Separator />

                  {/* Cover letter */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Cover Letter</p>
                    <label className={labelCls}>Tell us why you're a great fit for this role</label>
                    <textarea
                      className={textareaCls}
                      rows={5}
                      placeholder={`I'm excited to apply for the ${job.title} role because…`}
                      value={form.coverLetter}
                      onChange={set("coverLetter")}
                    />
                  </div>

                  <div>
                    <label className={labelCls}>How did you hear about us?</label>
                    <select className={inputCls} value={form.source} onChange={set("source")} style={{ appearance: "none" }}>
                      <option value="" disabled>Select an option</option>
                      <option>LinkedIn</option>
                      <option>Referral from a colleague</option>
                      <option>Company website</option>
                      <option>Job board (Naukri, Indeed, etc.)</option>
                      <option>Social media</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <Button
                    type="submit"
                    className="w-full rounded-xl gap-2 font-semibold text-white border-none py-6 text-base"
                    style={{ background: BG, boxShadow: GLOW }}
                  >
                    Submit Application <Send className="w-4 h-4" />
                  </Button>
                  <p className="text-[11px] text-muted-foreground text-center">
                    By submitting this form you agree to our Privacy Policy. We will never share your data with third parties.
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* ── Other openings ─────────────────────────────────────── */}
      {!submitted && (
        <section className="page-grid py-16 border-t border-border bg-card/20">
          <div className="col-span-12 mb-8">
            <h2 className="text-2xl font-bold text-foreground">Other Open Positions</h2>
          </div>
          {JOBS.filter(j => j.slug !== slug).slice(0, 3).map(j => (
            <div
              key={j.slug}
              className="col-span-4 rounded-2xl border border-border bg-card p-5 group hover:border-primary/30 transition-all cursor-pointer relative overflow-hidden"
              onClick={() => { window.location.hash = `#career-job-${j.slug}`; window.scrollTo({ top: 0, behavior: "smooth" }); }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(300px circle at 0% 0%, color-mix(in oklch, oklch(0.57 0.22 25) 5%, transparent), transparent 70%)" }} />
              <div className="relative flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "color-mix(in oklch, oklch(0.57 0.22 25) 10%, transparent)", border: "1px solid color-mix(in oklch, oklch(0.57 0.22 25) 18%, transparent)" }}>
                  <j.icon className="w-4.5 h-4.5" stroke="url(#jd-icon-grad)" strokeWidth={1.6} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground leading-tight mb-1 truncate">{j.title}</p>
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span>{j.location}</span>
                    <span>·</span>
                    <span>{j.mode}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          ))}
        </section>
      )}
      <Footer />
    </div>
  );
}
