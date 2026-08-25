'use client'

import { useMemo, useState } from 'react'
import {
  X,
  Gauge,
  CheckCircle2,
  XCircle,
  Sparkles,
  Target,
  BookOpen,
  Check,
  Plus,
  AlertCircle,
  TrendingUp,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label, Textarea } from '@/components/ui/field'
import { cn } from '@/lib/utils'
import type { ResumeData } from '@/lib/resume-types'

const ACTION_VERBS =
  /^(led|built|architected|designed|developed|launched|shipped|created|improved|optimized|reduced|increased|drove|managed|mentored|migrated|automated|delivered|implemented|scaled|owned|spearheaded|established|streamlined|negotiated|analyzed|engineered|founded|grew|won|achieved|transformed|modernized|accelerated|championed|orchestrated|pioneered|constructed|formulated|delegated|mobilized)/i

const STOPWORDS = new Set(
  'the a an and or but with for from into onto over under of in on at to by as is are was were be been being have has had do does did will would can could should may might must that this these those you your we our they their it its not no yes if then than so such very more most other some any all each every both few many much own same able about across after against along among around because before behind below beneath beside between beyond during except inside near outside since through throughout till toward until upon within without work team job role company candidate experience years responsibilities requirements qualifications skills ability strong excellent looking join us'.split(
    ' ',
  ),
)

type Check = { label: string; pass: boolean; hint: string; category: 'Structure' | 'Content' | 'Impact' }

function resumeText(d: ResumeData): string {
  return [
    d.fullName,
    d.role,
    d.summary,
    ...d.experience.flatMap((e) => [e.role, e.company, ...e.bullets]),
    ...d.education.map((e) => `${e.degree} ${e.school} ${e.detail}`),
    ...d.skills,
    ...d.projects.map((p) => `${p.name} ${p.tech} ${p.description}`),
    ...d.certifications.map((c) => `${c.name} ${c.issuer}`),
    ...d.achievements,
  ]
    .join(' ')
    .toLowerCase()
}

function extractKeywords(jd: string): string[] {
  const counts = new Map<string, number>()
  for (const raw of jd.toLowerCase().split(/[^a-z0-9+#./-]+/)) {
    const w = raw.trim()
    if (w.length < 3 || STOPWORDS.has(w) || /^\d+$/.test(w)) continue
    counts.set(w, (counts.get(w) ?? 0) + 1)
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 25)
    .map(([w]) => w)
}

function computeChecks(d: ResumeData): Check[] {
  const bullets = d.experience.flatMap((e) => e.bullets).filter((b) => b.trim())
  const quantified = bullets.filter((b) => /\d|%|\$|₹|k|m/i.test(b))
  const verbStarts = bullets.filter((b) => ACTION_VERBS.test(b.trim()))
  const summaryWords = d.summary.trim().split(/\s+/).filter(Boolean).length
  const totalWords = resumeText(d).split(/\s+/).filter(Boolean).length

  return [
    {
      category: 'Structure',
      label: 'Complete Contact Details',
      pass: Boolean(d.email && d.phone && (d.linkedin || d.website || d.github)),
      hint: 'Include email, phone number, and at least one online link (LinkedIn/GitHub/Portfolio).',
    },
    {
      category: 'Content',
      label: 'Impactful Summary (30–90 words)',
      pass: summaryWords >= 30 && summaryWords <= 90,
      hint: `Currently ${summaryWords} words — aim for a concise 3-sentence summary highlighting core strengths.`,
    },
    {
      category: 'Structure',
      label: 'Experience with 3+ Achievement Bullets',
      pass: d.experience.length > 0 && bullets.length >= 3,
      hint: 'Include at least one work experience entry with 3 or more detailed achievement bullets.',
    },
    {
      category: 'Impact',
      label: 'Quantified Metrics in Bullets (≥ 40%)',
      pass: bullets.length > 0 && quantified.length / bullets.length >= 0.4,
      hint: `Currently ${Math.round((quantified.length / Math.max(1, bullets.length)) * 100)}% quantified. Include measurable results (%, $, time saved, users scaled).`,
    },
    {
      category: 'Impact',
      label: 'Action-Verb Starter Bullets (≥ 60%)',
      pass: bullets.length > 0 && verbStarts.length / bullets.length >= 0.6,
      hint: 'Start bullets with strong power verbs (e.g., Spearheaded, Architected, Reduced, Accelerated).',
    },
    {
      category: 'Content',
      label: 'Key Skills Section (6–15 skills)',
      pass: d.skills.length >= 6,
      hint: `You currently have ${d.skills.length} skills listed. Recruiters and ATS bots scan for 6–15 relevant skills.`,
    },
    {
      category: 'Structure',
      label: 'Education & Degree Listed',
      pass: d.education.length > 0,
      hint: 'Include your college/university degree, graduation year, or relevant certification.',
    },
    {
      category: 'Structure',
      label: 'Optimal Resume Length (250–800 words)',
      pass: totalWords >= 250 && totalWords <= 800,
      hint: `Currently ~${totalWords} words. Ideal single-page resume length is 400–600 words.`,
    },
  ]
}

export function AtsPanel({
  open,
  onClose,
  resume,
  onUpdateResume,
  onOpenLibrary,
}: {
  open: boolean
  onClose: () => void
  resume: ResumeData
  onUpdateResume?: (updater: (prev: ResumeData) => ResumeData) => void
  onOpenLibrary?: () => void
}) {
  const [jd, setJd] = useState('')

  const checks = useMemo(() => computeChecks(resume), [resume])
  const passCount = checks.filter((c) => c.pass).length

  const bullets = resume.experience.flatMap((e) => e.bullets).filter((b) => b.trim())
  const quantifiedBullets = bullets.filter((b) => /\d|%|\$|₹|k|m/i.test(b))
  const actionVerbBullets = bullets.filter((b) => ACTION_VERBS.test(b.trim()))

  const { keywordScore, matched, missing } = useMemo(() => {
    if (!jd.trim()) return { keywordScore: null, matched: [], missing: [] }
    const keywords = extractKeywords(jd)
    if (keywords.length === 0)
      return { keywordScore: null, matched: [], missing: [] }
    const text = resumeText(resume)
    const matched = keywords.filter((k) => text.includes(k))
    const missing = keywords.filter((k) => !text.includes(k))
    return {
      keywordScore: Math.round((matched.length / keywords.length) * 100),
      matched,
      missing,
    }
  }, [jd, resume])

  const baseScore = Math.round((passCount / checks.length) * 100)
  const score =
    keywordScore === null
      ? baseScore
      : Math.round(baseScore * 0.55 + keywordScore * 0.45)

  const scoreColor =
    score >= 80 ? 'text-emerald-400' : score >= 55 ? 'text-amber-400' : 'text-red-400'

  const handleAddKeywordToSkills = (keyword: string) => {
    if (!onUpdateResume) return
    const formatted = keyword.charAt(0).toUpperCase() + keyword.slice(1)
    if (resume.skills.map((s) => s.toLowerCase()).includes(keyword.toLowerCase())) return
    onUpdateResume((prev) => ({
      ...prev,
      skills: [...prev.skills, formatted],
    }))
  }

  const handleAddAllMissing = () => {
    if (!onUpdateResume || missing.length === 0) return
    const existing = new Set(resume.skills.map((s) => s.toLowerCase()))
    const toAdd = missing
      .filter((k) => !existing.has(k.toLowerCase()))
      .slice(0, 8)
      .map((k) => k.charAt(0).toUpperCase() + k.slice(1))

    if (toAdd.length > 0) {
      onUpdateResume((prev) => ({
        ...prev,
        skills: [...prev.skills, ...toAdd],
      }))
    }
  }

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-background/70 backdrop-blur-sm transition-opacity',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        aria-hidden
      />
      <aside
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex w-[480px] max-w-[94vw] flex-col border-l border-border bg-popover shadow-2xl transition-transform duration-300',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
        role="dialog"
        aria-label="ATS score"
      >
        <header className="flex items-center justify-between border-b border-border px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Gauge className="size-4" />
            </span>
            <div>
              <h2 className="text-sm font-semibold">ATS Intelligence Auditor</h2>
              <p className="text-[11px] text-muted-foreground">
                Instant offline recruiter readiness & JD keyword matching
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            <X className="size-4" />
          </Button>
        </header>

        <div className="scroll-thin flex-1 overflow-y-auto p-5">
          {/* Score card */}
          <div className="flex items-center gap-5 rounded-2xl border border-border bg-secondary/25 p-5">
            <div className="relative flex size-24 shrink-0 items-center justify-center">
              <svg viewBox="0 0 100 100" className="size-24 -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  strokeWidth="10"
                  className="stroke-border"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${(score / 100) * 264} 264`}
                  className={cn(
                    'transition-all duration-700',
                    score >= 80
                      ? 'stroke-emerald-400'
                      : score >= 55
                        ? 'stroke-amber-400'
                        : 'stroke-red-400',
                  )}
                />
              </svg>
              <span
                className={cn('absolute text-2xl font-bold tabular-nums', scoreColor)}
              >
                {score}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold">
                {score >= 80
                  ? '🚀 Excellent — Recruiter Ready'
                  : score >= 55
                    ? '⚡ Decent — Great Potential'
                    : '⚠️ Needs Optimization'}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {passCount}/{checks.length} structure checks passed
                {keywordScore !== null && (
                  <> · <strong>{keywordScore}%</strong> JD keyword match</>
                )}
              </p>
              {onOpenLibrary && (
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2.5 h-7 text-xs border-primary/40 bg-primary/10 text-primary hover:bg-primary/20"
                  onClick={() => {
                    onClose()
                    onOpenLibrary()
                  }}
                >
                  <BookOpen className="mr-1 size-3" />
                  Open Bullet & Verb Library
                </Button>
              )}
            </div>
          </div>

          {/* Quick stats grid */}
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <div className="rounded-xl border border-border bg-secondary/15 p-3">
              <p className="text-[10px] uppercase font-semibold text-muted-foreground">
                Action-Verb Starters
              </p>
              <p className="mt-1 text-lg font-bold text-foreground">
                {actionVerbBullets.length}/{bullets.length}
                <span className="ml-1 text-xs font-normal text-muted-foreground">
                  ({Math.round((actionVerbBullets.length / Math.max(1, bullets.length)) * 100)}%)
                </span>
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/15 p-3">
              <p className="text-[10px] uppercase font-semibold text-muted-foreground">
                Quantified Bullets
              </p>
              <p className="mt-1 text-lg font-bold text-foreground">
                {quantifiedBullets.length}/{bullets.length}
                <span className="ml-1 text-xs font-normal text-muted-foreground">
                  ({Math.round((quantifiedBullets.length / Math.max(1, bullets.length)) * 100)}%)
                </span>
              </p>
            </div>
          </div>

          {/* Structure Checklist */}
          <h3 className="mb-2 mt-6 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Structure & Readiness Checklist
          </h3>
          <div className="flex flex-col gap-1.5">
            {checks.map((c) => (
              <div
                key={c.label}
                className="flex items-start gap-2.5 rounded-lg border border-border bg-secondary/20 px-3 py-2"
              >
                {c.pass ? (
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                ) : (
                  <XCircle className="mt-0.5 size-4 shrink-0 text-red-400" />
                )}
                <div>
                  <p className="text-sm font-medium">{c.label}</p>
                  {!c.pass && (
                    <p className="text-xs text-muted-foreground">{c.hint}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* JD Matching section */}
          <div className="mb-2 mt-6 flex items-center justify-between">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Match against target Job Description
            </h3>
          </div>
          <Label htmlFor="jd" className="sr-only">
            Job description
          </Label>
          <Textarea
            id="jd"
            className="min-h-[110px]"
            placeholder="Paste any target job description here to instantly detect missing keywords and compare skills..."
            value={jd}
            onChange={(e) => setJd(e.target.value)}
          />

          {keywordScore !== null && (
            <div className="mt-3 flex flex-col gap-3 rounded-xl border border-border bg-secondary/20 p-3.5">
              {missing.length > 0 && (
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-xs font-semibold text-red-400">
                      Missing keywords in resume ({missing.length})
                    </p>
                    {onUpdateResume && (
                      <button
                        type="button"
                        onClick={handleAddAllMissing}
                        className="text-[11px] text-primary hover:underline font-medium"
                      >
                        + Add top missing to skills
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {missing.map((k) => (
                      <button
                        type="button"
                        key={k}
                        onClick={() => handleAddKeywordToSkills(k)}
                        title="Click to add to skills"
                        className="group flex items-center gap-1 rounded-md border border-red-400/30 bg-red-400/10 px-2 py-0.5 text-xs text-red-300 transition-all hover:bg-red-400/20"
                      >
                        <span>{k}</span>
                        <span className="opacity-0 group-hover:opacity-100 text-[10px]">+</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {matched.length > 0 && (
                <div>
                  <p className="mb-1.5 text-xs font-semibold text-emerald-400">
                    Matched keywords ({matched.length})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {matched.map((k) => (
                      <span
                        key={k}
                        className="rounded-md border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-300"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
