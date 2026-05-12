'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  ArrowUp, Globe, Plus, Sparkles, Layers, Zap, Bot,
  TrendingUp, FileText, Settings, Activity, Database, GitBranch
} from 'lucide-react'

const BG = 'linear-gradient(135deg, oklch(0.57 0.22 25) 0%, oklch(0.52 0.24 292) 100%)'

export default function FeaturesSection() {
  return (
    <div className="space-y-10">
      <FeatureCard
        title="Document AI"
        desc="Intelligent document processing, extraction & classification at scale."
      >
        <DocumentAIIllustration />
      </FeatureCard>

      <FeatureCard
        title="Sales & Marketing AI"
        desc="AI-powered lead scoring, revenue forecasting & campaign optimization."
      >
        <SalesAIIllustration />
      </FeatureCard>

      <FeatureCard
        title="Knowledge AI"
        desc="Enterprise semantic search & RAG pipelines — your data as an AI assistant."
      >
        <KnowledgeAIIllustration />
      </FeatureCard>

      <FeatureCard
        title="Market AI"
        desc="Competitive intelligence, trend detection & real-time market signals."
      >
        <MarketAIIllustration />
      </FeatureCard>

      <FeatureCard
        title="Operations AI"
        desc="Process automation, workflow optimization & operational efficiency."
      >
        <OperationsAIIllustration />
      </FeatureCard>
    </div>
  )
}

function FeatureCard({ title, desc, children }) {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-foreground text-lg font-semibold">{title}</h3>
        <p className="text-muted-foreground mt-1 text-sm">{desc}</p>
      </div>
      <Card variant="soft" className="overflow-hidden p-4">
        {children}
      </Card>
    </div>
  )
}

/* ── 1. Document AI — scanning line + pulsing doc badges ── */
const DocumentAIIllustration = () => (
  <div aria-hidden className="relative h-28 overflow-hidden">
    <motion.div
      className="absolute left-0 right-0 h-px opacity-50"
      style={{ background: BG }}
      animate={{ top: ['0%', '100%', '0%'] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    />
    <div className="relative z-10 flex items-center gap-3 h-full">
      <div className="flex flex-col gap-2">
        {['Invoice', 'Contract', 'Report'].map((label, i) => (
          <motion.div
            key={label}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md border border-border bg-background text-muted-foreground"
            animate={{ opacity: [0.4, 1, 0.4], x: [0, 3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
          >
            <FileText className="size-3 shrink-0" />
            {label}
          </motion.div>
        ))}
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-1">
        <motion.div
          className="size-8 rounded-full flex items-center justify-center"
          style={{ background: BG }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Layers className="size-4 text-white" strokeWidth={1.5} />
        </motion.div>
        <motion.span
          className="text-[10px] font-mono text-muted-foreground"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          12,847/day
        </motion.span>
      </div>
      <div className="flex flex-col gap-2">
        {['Extracted', 'Classified', 'Indexed'].map((label, i) => (
          <motion.div
            key={label}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md border border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400"
            animate={{ opacity: [0.3, 1, 0.3], x: [0, -3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 + i * 0.5 }}
          >
            {label} ✓
          </motion.div>
        ))}
      </div>
    </div>
  </div>
)

/* ── 2. Sales AI — animated score bar ── */
const SalesAIIllustration = () => (
  <div aria-hidden className="h-24 flex flex-col justify-center gap-3">
    <div className="flex items-center justify-between text-xs text-muted-foreground">
      <span>Lead Score</span>
      <motion.span
        className="font-bold"
        style={{ color: 'oklch(0.57 0.22 25)' }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        92/100
      </motion.span>
    </div>
    <div className="h-2 rounded-full bg-foreground/10 overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ background: BG }}
        animate={{ width: ['40%', '92%', '75%', '92%', '40%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
    <div className="flex gap-2">
      {[
        { label: 'Pipeline ₹24L', color: 'text-emerald-500' },
        { label: 'Meeting Thu', color: 'text-blue-400' },
        { label: 'High Intent', color: 'text-amber-500' },
      ].map((t, i) => (
        <motion.span
          key={t.label}
          className={`text-[10px] font-medium px-2 py-0.5 rounded-full border border-border bg-background ${t.color}`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
        >
          {t.label}
        </motion.span>
      ))}
    </div>
  </div>
)

/* ── 3. Knowledge AI — typing dots ── */
const KnowledgeAIIllustration = () => (
  <div aria-hidden className="h-24 flex flex-col justify-between">
    <div className="flex items-start gap-2">
      <Sparkles className="size-3.5 shrink-0 mt-0.5 fill-purple-300 stroke-purple-300" />
      <p className="text-xs text-foreground leading-relaxed">How can we reduce churn by 15% this quarter?</p>
    </div>
    <div className="flex gap-1 items-center mt-2">
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          className="size-1.5 rounded-full bg-muted-foreground"
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
        />
      ))}
      <span className="text-[10px] text-muted-foreground ml-1">AI is thinking…</span>
    </div>
    <div className="flex justify-between items-center mt-2 pt-2 border-t border-border">
      <span className="text-xs text-muted-foreground">Ask Knowledge AI</span>
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Button size="icon" className="size-6 rounded-xl bg-black"><ArrowUp className="size-3" strokeWidth={3} /></Button>
      </motion.div>
    </div>
  </div>
)

/* ── 4. Market AI — morphing trend lines ── */
const MarketAIIllustration = () => (
  <div aria-hidden className="h-24 flex flex-col justify-center">
    <svg className="w-full h-12" viewBox="0 0 200 48" fill="none">
      <motion.path
        d="M0 38 Q25 35 50 30 T100 20 T150 15 T200 8"
        stroke="oklch(0.57 0.22 25)" strokeWidth="2" strokeLinecap="round" fill="none"
        animate={{ d: [
          'M0 38 Q25 35 50 30 T100 20 T150 15 T200 8',
          'M0 34 Q25 28 50 24 T100 30 T150 10 T200 5',
          'M0 38 Q25 35 50 30 T100 20 T150 15 T200 8',
        ]}}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.path
        d="M0 42 Q25 40 50 42 T100 36 T150 32 T200 28"
        stroke="oklch(0.52 0.24 292)" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity={0.5}
        animate={{ d: [
          'M0 42 Q25 40 50 42 T100 36 T150 32 T200 28',
          'M0 40 Q25 42 50 38 T100 40 T150 26 T200 24',
          'M0 42 Q25 40 50 42 T100 36 T150 32 T200 28',
        ]}}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.circle
        r="3" fill="oklch(0.57 0.22 25)"
        animate={{ cx: [0, 100, 200, 0], cy: [38, 20, 8, 38] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ filter: 'drop-shadow(0 0 3px oklch(0.57 0.22 25 / 0.5))' }}
      />
    </svg>
    <div className="flex gap-2 mt-2">
      {[
        { label: 'Trending Up', color: 'text-emerald-500' },
        { label: 'New Entrant', color: 'text-amber-500' },
      ].map((s, i) => (
        <motion.span
          key={s.label}
          className={`text-[10px] font-medium px-2 py-0.5 rounded-full border border-border bg-background ${s.color}`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
        >
          {s.label}
        </motion.span>
      ))}
    </div>
  </div>
)

/* ── 5. Operations AI — 3 nodes + traveling dot ── */
const OperationsAIIllustration = () => {
  const nodes = [
    { icon: Database, label: 'Ingest' },
    { icon: Settings, label: 'Process' },
    { icon: Activity, label: 'Optimize' },
  ]
  return (
    <div aria-hidden className="h-24 flex flex-col justify-center">
      <div className="relative flex items-center justify-between px-4">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 40" fill="none">
          <motion.line
            x1="60" y1="20" x2="140" y2="20"
            stroke="oklch(0.57 0.22 25)" strokeWidth="1.5" strokeLinecap="round"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.line
            x1="160" y1="20" x2="240" y2="20"
            stroke="oklch(0.52 0.24 292)" strokeWidth="1.5" strokeLinecap="round"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
          <motion.circle
            r="2.5" fill="oklch(0.57 0.22 25)"
            animate={{ cx: [60, 140, 240, 60], cy: [20, 20, 20, 20] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ filter: 'drop-shadow(0 0 3px oklch(0.57 0.22 25 / 0.5))' }}
          />
        </svg>
        {nodes.map((n, i) => (
          <motion.div
            key={n.label}
            className="relative z-10 flex flex-col items-center gap-0.5"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          >
            <div className="size-8 rounded-full border border-border bg-background flex items-center justify-center">
              <n.icon className="size-3.5 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <span className="text-[9px] text-muted-foreground">{n.label}</span>
          </motion.div>
        ))}
      </div>
      <div className="flex gap-2 mt-3 justify-center">
        {[
          { label: '99.9%', sub: 'Uptime', color: 'text-emerald-500' },
          { label: '12ms', sub: 'Latency', color: 'text-blue-400' },
          { label: '2.4k/hr', sub: 'Tasks', color: 'text-amber-500' },
        ].map((m, i) => (
          <motion.div
            key={m.sub}
            className="text-center"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
          >
            <span className={`text-[10px] font-bold ${m.color}`}>{m.label}</span>
            <span className="text-[9px] text-muted-foreground ml-0.5">{m.sub}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export { FeaturesSection }
