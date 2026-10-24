'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Gauge,
  BookOpen,
  Command,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  PenLine,
  Briefcase,
  HelpCircle,
  Heart,
  LayoutTemplate,
  Eye,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ROLE_CATEGORIES } from '@/lib/bullet-library'
import { TEMPLATES } from '@/lib/resume-types'

/* Real example bullets from the shipped library — labeled as examples. */
const LIBRARY_TABS: { id: string; label: string; categoryId: string }[] = [
  { id: 'engineering', label: 'Engineering', categoryId: 'engineering' },
  { id: 'data-ml', label: 'Data / ML', categoryId: 'data-ml' },
  { id: 'pm', label: 'Product', categoryId: 'pm' },
]

const ATS_CHECKS = [
  { label: 'Complete contact details', note: 'name, job title, email, phone, location' },
  { label: 'Focused summary', note: '30–90 words, specific to your target role' },
  { label: 'Detailed experience items', note: 'at least 3 bullets each; none thin' },
  { label: 'Quantified results', note: 'at least 40% of bullets contain a number' },
  { label: 'Strong openers', note: 'at least 60% of bullets start with an action verb' },
  { label: 'Balanced length', note: '250–800 words total' },
]

export function BentoGrid() {
  const [copiedTag, setCopiedTag] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState(LIBRARY_TABS[0].id)

  const category = ROLE_CATEGORIES.find((c) => c.id === activeTab) ?? ROLE_CATEGORIES[0]
  const bullets = (category?.roles[0]?.bullets ?? []).slice(0, 3)

  const copyBullet = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedTag(text)
    setTimeout(() => setCopiedTag(null), 1800)
  }

  return (
    <section id="features" className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mb-12 max-w-2xl sm:mb-16">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          What you get
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Everything is included. Nothing is a teaser.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          One editor, one preview, the PDF you will actually send — plus the career
          tools around it. No paywalls and no locked templates.
        </p>
      </div>

      {/* Row 1: ATS auditor — structural checks panel, honest framing */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8 lg:col-span-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                <Gauge className="size-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-foreground">ATS readiness check</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  A transparent, 8-point structural audit of your resume. It is a
                  heuristic — not a promise to “beat the robots” — but it catches the
                  issues recruiters and parsers complain about most.
                </p>
              </div>
            </div>
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {ATS_CHECKS.map((c) => (
              <li key={c.label} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground/90">{c.label}</p>
                  <p className="text-xs text-muted-foreground">{c.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* JD keyword matching — compact card */}
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8 lg:col-span-2">
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <LayoutTemplate className="size-5" />
            </span>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Job-description matching</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Paste a job post and see which of its key terms your resume already
                covers — and which it genuinely lacks. Matched and missing keywords
                are listed side by side, so you close gaps you actually own.
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {['React', 'TypeScript', 'GraphQL'].map((k) => (
              <span key={k} className="inline-flex items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300">
                <Check className="size-3" /> {k}
              </span>
            ))}
            {['Kubernetes', 'Observability'].map((k) => (
              <span key={k} className="inline-flex items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-xs text-amber-300">
                + {k}
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Demo view — in the builder this runs on your resume against any pasted job description.
          </p>
        </div>
      </div>

      {/* Row 2: Bullet library (live, real content) + privacy */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8 lg:col-span-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                <BookOpen className="size-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Bullet & phrase library</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Role-tailored openers and phrasing — copy any of them into your resume, then edit freely.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 rounded-lg border border-border bg-secondary/50 p-1 text-xs">
              {LIBRARY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  aria-pressed={activeTab === tab.id}
                  className={cn(
                    'min-h-8 rounded-md px-2.5 font-medium transition-colors',
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 space-y-2">
            {bullets.map((bullet) => (
              <div
                key={bullet}
                className="group flex items-start justify-between gap-3 rounded-lg border border-border/70 bg-secondary/20 p-3"
              >
                <span className="text-sm leading-relaxed text-foreground/90">{bullet}</span>
                <button
                  type="button"
                  onClick={() => copyBullet(bullet)}
                  aria-label={copiedTag === bullet ? 'Copied' : 'Copy example bullet'}
                  className="flex h-8 shrink-0 items-center gap-1 rounded-md border border-border bg-secondary/60 px-2 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {copiedTag === bullet ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
                  {copiedTag === bullet ? 'Copied' : 'Copy'}
                </button>
              </div>
            ))}
            <p className="pt-1 text-xs text-muted-foreground">
              Examples show structure — always replace the numbers with results you can speak to in an interview.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 sm:p-8 lg:col-span-2">
          <div>
            <span className="flex size-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
              <ShieldCheck className="size-5" />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-foreground">Your data, your browser</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Resumes are saved to your browser&rsquo;s local storage — no account, no
              server database, no resume database. Export a JSON backup anytime and
              restore it on another device.
            </p>
          </div>
          <div className="mt-5 space-y-2 text-xs">
            <div className="flex items-start gap-2 text-muted-foreground">
              <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-500" />
              <span>Resume editing, previews, templates and PDF export work fully offline.</span>
            </div>
            <div className="flex items-start gap-2 text-muted-foreground">
              <Eye className="mt-0.5 size-3.5 shrink-0" />
              <span>
                AI writing helpers (summary, bullets, cover letters) send only the text
                you choose to generate, and only when you press the button.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Career tools — distinct "document row" treatment, not cards */}
      <div className="mt-14">
        <h3 className="text-center font-display text-2xl font-semibold tracking-tight text-foreground">
          The tools around the resume
        </h3>
        <div className="mt-8 grid grid-cols-1 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {[
            { href: '/cover-letter', icon: PenLine, title: 'Cover Letters', desc: 'Generate a letter matched to a role and company, edit every word, print to PDF.' },
            { href: '/tracker', icon: Briefcase, title: 'Job Tracker', desc: 'A Kanban board for applications — statuses, contacts, notes, CSV export.' },
            { href: '/interview', icon: HelpCircle, title: 'Interview Prep', desc: 'STAR-format questions generated from your own resume, with answer notes.' },
            { href: '/shaadi-biodata', icon: Heart, title: 'Shaadi Biodata', desc: 'Indian matrimonial biodata in Hindi or English — 10 designs, WhatsApp share.', accent: true },
          ].map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className={cn(
                'group flex flex-col gap-3 p-6 transition-colors hover:bg-secondary/40',
                tool.accent && 'bg-rose-950/20 hover:bg-rose-950/30',
              )}
            >
              <tool.icon className={cn('size-5', tool.accent ? 'text-rose-400' : 'text-primary')} />
              <div>
                <p className={cn('font-semibold text-foreground', tool.accent && 'text-rose-200')}>{tool.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{tool.desc}</p>
              </div>
              <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                Open tool <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Trust strip — command palette shortcut is real */}
      <div className="mt-10 flex flex-col items-center justify-center gap-3 rounded-xl border border-border/70 bg-secondary/20 px-6 py-5 text-center sm:flex-row sm:gap-6">
        <span className="flex items-center gap-2 text-sm text-muted-foreground">
          <Command className="size-4 text-primary" />
          Press <kbd className="rounded border border-border bg-secondary/70 px-1.5 py-0.5 font-mono text-xs font-bold text-foreground">⌘K</kbd> in the builder for every shortcut
        </span>
        <span className="hidden text-border sm:inline">·</span>
        <span className="text-sm text-muted-foreground">
          {TEMPLATES.length} templates · 10 accent themes · 10 document fonts
        </span>
      </div>
    </section>
  )
}
