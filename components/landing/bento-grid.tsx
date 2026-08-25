'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Gauge,
  BookOpen,
  Command,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  Layers,
  Sparkles,
  Download,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function BentoGrid() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [activeRoleTab, setActiveRoleTab] = useState<'frontend' | 'product' | 'data'>('frontend')

  const copyBullet = (text: string, idx: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(idx)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const roleBullets = {
    frontend: [
      'Architected micro-frontend design system in Next.js & Tailwind, boosting team velocity by 50%.',
      'Optimized Core Web Vitals to 99/100 Lighthouse score, increasing signup conversion by 28%.',
    ],
    product: [
      'Spearheaded 0-to-1 launch of collaboration SaaS product, reaching $500k ARR in 9 months.',
      'Conducted 45+ user research sessions, cutting customer onboarding drop-off by 32%.',
    ],
    data: [
      'Engineered automated ETL data pipeline in Airflow & Snowflake handling 5TB+ daily events.',
      'Constructed XGBoost predictive churn model, improving quarterly retention by 18%.',
    ],
  }

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/30 px-3 py-1 text-xs font-medium text-muted-foreground mb-4">
          <Layers className="size-3.5 text-primary" />
          <span>Precision Engineering</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
          Built like precision software.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
          Every tool, metric, and template is engineered to give candidates an unfair advantage in recruiter screening.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bento Card 1: ATS Intelligence Hub (Span 2) */}
        <div className="md:col-span-2 rounded-3xl border border-border/80 bg-popover/50 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden group hover:border-primary/40 transition-colors">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400">
                <Gauge className="size-6" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Real-Time ATS Auditor</h3>
                <p className="text-xs text-muted-foreground">Instant structure & keyword density analysis</p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-400">
              96 / 100 Recruiter Ready
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border/60 bg-secondary/25 p-4 space-y-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                8-Point Structure Checks
              </p>
              {[
                { text: 'Action-verb starters (92%)', pass: true },
                { text: 'Quantified metric density (48%)', pass: true },
                { text: 'Single-column ATS parsing safety', pass: true },
                { text: 'Contact info & verified links', pass: true },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-foreground/90">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span>{c.text}</span>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-border/60 bg-secondary/25 p-4 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Target JD Keyword Matcher
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['TypeScript', 'Next.js', 'PostgreSQL', 'Microservices', 'GraphQL', 'AWS'].map((k) => (
                  <span key={k} className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-300">
                    ✓ {k}
                  </span>
                ))}
                {['Distributed Systems', 'Kubernetes'].map((k) => (
                  <span key={k} className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-xs text-amber-300">
                    + {k}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Paste any job description to compare keywords and inject missing skills with 1 click.
              </p>
            </div>
          </div>
        </div>

        {/* Bento Card 2: Command Palette (Span 1) */}
        <div className="rounded-3xl border border-border/80 bg-popover/50 p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between group hover:border-primary/40 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <Command className="size-6" />
              </span>
              <kbd className="rounded-lg border border-border bg-secondary/60 px-2.5 py-1 text-xs font-mono font-bold text-foreground">
                ⌘K
              </kbd>
            </div>
            <h3 className="text-lg font-semibold text-foreground">Command Palette</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Navigate, switch templates, load role presets, and export PDF with keyboard shortcuts.
            </p>
          </div>

          <div className="mt-6 rounded-xl border border-border/60 bg-secondary/30 p-3 text-xs space-y-2 font-mono">
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Load Full Stack Preset</span>
              <span className="text-[10px] text-primary">↵ Enter</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Switch to Luxury Gold</span>
              <span className="text-[10px] text-primary">↵ Enter</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Export Vector PDF</span>
              <span className="text-[10px] text-primary">↵ Enter</span>
            </div>
          </div>
        </div>

        {/* Bento Card 3: Pro Bullet Library (Span 2) */}
        <div className="md:col-span-2 rounded-3xl border border-border/80 bg-popover/50 p-6 sm:p-8 backdrop-blur-xl group hover:border-primary/40 transition-colors">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400">
                <BookOpen className="size-6" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Pro Bullet & Phrase Library</h3>
                <p className="text-xs text-muted-foreground">50+ battle-tested recruiter achievements for 12+ domains</p>
              </div>
            </div>

            {/* Role Switcher */}
            <div className="flex items-center gap-1 rounded-lg border border-border bg-secondary/40 p-1 text-xs">
              <button
                type="button"
                onClick={() => setActiveRoleTab('frontend')}
                className={cn(
                  'rounded px-2.5 py-1 transition-all',
                  activeRoleTab === 'frontend' ? 'bg-primary text-primary-foreground font-semibold' : 'text-muted-foreground',
                )}
              >
                Frontend
              </button>
              <button
                type="button"
                onClick={() => setActiveRoleTab('product')}
                className={cn(
                  'rounded px-2.5 py-1 transition-all',
                  activeRoleTab === 'product' ? 'bg-primary text-primary-foreground font-semibold' : 'text-muted-foreground',
                )}
              >
                Product
              </button>
              <button
                type="button"
                onClick={() => setActiveRoleTab('data')}
                className={cn(
                  'rounded px-2.5 py-1 transition-all',
                  activeRoleTab === 'data' ? 'bg-primary text-primary-foreground font-semibold' : 'text-muted-foreground',
                )}
              >
                Data Science
              </button>
            </div>
          </div>

          <div className="space-y-2.5">
            {roleBullets[activeRoleTab].map((bullet, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-secondary/20 p-3 text-xs text-foreground/90 transition-colors hover:bg-secondary/40"
              >
                <span className="leading-relaxed font-sans">• {bullet}</span>
                <button
                  type="button"
                  onClick={() => copyBullet(bullet, idx)}
                  className="shrink-0 flex items-center gap-1 rounded bg-secondary px-2 py-1 text-[11px] font-medium text-muted-foreground hover:text-foreground"
                >
                  {copiedIndex === idx ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
                  {copiedIndex === idx ? 'Copied' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Bento Card 4: 100% Client-Side Privacy (Span 1) */}
        <div className="rounded-3xl border border-border/80 bg-popover/50 p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between group hover:border-primary/40 transition-colors">
          <div>
            <span className="flex size-11 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-400 mb-4">
              <ShieldCheck className="size-6" />
            </span>
            <h3 className="text-lg font-semibold text-foreground">Zero Tracking. 100% Local.</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Your resume data never leaves your browser. No server databases, no analytics trackers, no account required.
            </p>
          </div>

          <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="size-4 shrink-0" />
            <span>Encrypted local storage with JSON backup export</span>
          </div>
        </div>
      </div>
    </section>
  )
}
