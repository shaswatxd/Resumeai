'use client'

import { useState, useMemo } from 'react'
import {
  X,
  BookOpen,
  Search,
  Check,
  Copy,
  Plus,
  Zap,
  Sparkles,
  Award,
  Layers,
  Flame,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/field'
import { cn } from '@/lib/utils'
import {
  ROLE_CATEGORIES,
  ACTION_VERBS_BY_CATEGORY,
  QUANTIFIABLE_METRIC_TEMPLATES,
} from '@/lib/bullet-library'
import { uid, type ResumeData } from '@/lib/resume-types'

type Props = {
  open: boolean
  onClose: () => void
  onApplyData?: (updater: (prev: ResumeData) => ResumeData) => void
}

export function BulletLibraryModal({ open, onClose, onApplyData }: Props) {
  const [activeTab, setActiveTab] = useState<'roles' | 'verbs' | 'metrics'>('roles')
  const [selectedCategory, setSelectedCategory] = useState<string>(ROLE_CATEGORIES[0].id)
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedText(text)
    showToast('Copied to clipboard!')
    setTimeout(() => setCopiedText(null), 2000)
  }

  const handleInsertBullet = (bullet: string) => {
    if (!onApplyData) return
    onApplyData((prev) => {
      if (prev.experience.length === 0) {
        return {
          ...prev,
          experience: [
            {
              id: uid('exp'),
              role: 'Software Engineer',
              company: 'Company Name',
              start: '2022',
              end: 'Present',
              bullets: [bullet],
            },
          ],
        }
      }
      const updated = [...prev.experience]
      updated[0] = {
        ...updated[0],
        bullets: [...updated[0].bullets, bullet],
      }
      return {
        ...prev,
        experience: updated,
      }
    })
    handleCopy(bullet)
    showToast('Added bullet to your resume!')
  }

  const handleApplyRoleComplete = (role: { title: string; summary: string; bullets: string[]; skills: string[] }) => {
    if (!onApplyData) return
    onApplyData((prev) => ({
      ...prev,
      role: prev.role || role.title,
      summary: role.summary,
      skills: Array.from(new Set([...prev.skills, ...role.skills])),
      experience: [
        {
          id: uid('exp'),
          role: role.title,
          company: 'Leading Enterprise Inc.',
          start: '2022',
          end: 'Present',
          bullets: role.bullets,
        },
        ...prev.experience,
      ],
    }))
    showToast(`Loaded "${role.title}" preset & bullets!`)
  }

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return ROLE_CATEGORIES
    }
    const q = searchQuery.toLowerCase()
    return ROLE_CATEGORIES.map((cat) => ({
      ...cat,
      roles: cat.roles.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.skills.some((s) => s.toLowerCase().includes(q)) ||
          r.bullets.some((b) => b.toLowerCase().includes(q)),
      ),
    })).filter((cat) => cat.roles.length > 0)
  }, [searchQuery])

  const currentCategory =
    filteredCategories.find((c) => c.id === selectedCategory) ||
    filteredCategories[0] ||
    ROLE_CATEGORIES[0]

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
          'fixed inset-y-0 right-0 z-50 flex w-[580px] max-w-[96vw] flex-col border-l border-border bg-popover shadow-2xl transition-transform duration-300',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
        role="dialog"
        aria-label="Bullet point library"
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-border px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary shadow-sm">
              <BookOpen className="size-5" />
            </span>
            <div>
              <h2 className="text-sm font-semibold flex items-center gap-1.5">
                Pro Bullet & Phrase Library
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                  Offline Ready
                </span>
              </h2>
              <p className="text-[11px] text-muted-foreground">
                Recruiter-tested bullet points, power verbs & metric formulas
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            <X className="size-4" />
          </Button>
        </header>

        {/* Tab switcher */}
        <div className="flex border-b border-border bg-secondary/30 p-1">
          <button
            type="button"
            onClick={() => setActiveTab('roles')}
            className={cn(
              'flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all',
              activeTab === 'roles'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            Role Bullets
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('verbs')}
            className={cn(
              'flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all',
              activeTab === 'verbs'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            Power Action Verbs
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('metrics')}
            className={cn(
              'flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all',
              activeTab === 'metrics'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            Google XYZ Formula
          </button>
        </div>

        {/* Toast alert */}
        {toastMessage && (
          <div className="mx-4 mt-2 flex items-center justify-between rounded-lg bg-emerald-500/15 border border-emerald-500/30 px-3 py-1.5 text-xs font-semibold text-emerald-400 animate-in fade-in slide-in-from-top-1">
            <span className="flex items-center gap-1.5">
              <Check className="size-3.5" />
              {toastMessage}
            </span>
          </div>
        )}

        {/* Content area */}
        <div className="scroll-thin flex-1 overflow-y-auto p-5">
          {activeTab === 'roles' && (
            <div className="flex flex-col gap-4">
              {/* Search input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  className="pl-9 h-10"
                  placeholder="Search by role, skill, or keyword (e.g. React, Product, Sales)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap gap-1.5 pb-1">
                {filteredCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      'rounded-full px-3 py-1 text-xs font-medium transition-all',
                      selectedCategory === cat.id
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'border border-border bg-secondary/30 text-muted-foreground hover:bg-secondary hover:text-foreground',
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Roles listing */}
              <div className="flex flex-col gap-5">
                {currentCategory?.roles.map((role, rIdx) => (
                  <div
                    key={rIdx}
                    className="overflow-hidden rounded-xl border border-border bg-secondary/15 p-4 transition-all hover:border-border/80"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-3">
                      <div>
                        <h3 className="font-semibold text-foreground text-sm flex items-center gap-1.5">
                          {role.title}
                        </h3>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {role.skills.slice(0, 6).map((sk) => (
                            <span
                              key={sk}
                              className="rounded bg-secondary/80 px-1.5 py-0.5 text-[10px] text-muted-foreground"
                            >
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                      {onApplyData && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-xs border-primary/40 text-primary hover:bg-primary/10"
                          onClick={() => handleApplyRoleComplete(role)}
                        >
                          <Sparkles className="mr-1 size-3.5" />
                          Apply Full Role
                        </Button>
                      )}
                    </div>

                    {/* Summary box */}
                    <div className="mt-3 rounded-lg border border-border/40 bg-secondary/30 p-2.5 text-xs text-foreground/90">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Sample Summary
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(role.summary)}
                          className="text-[10px] text-primary hover:underline flex items-center gap-0.5"
                        >
                          {copiedText === role.summary ? <Check className="size-3" /> : <Copy className="size-3" />}
                          {copiedText === role.summary ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                      <p className="leading-relaxed">{role.summary}</p>
                    </div>

                    {/* Bullets */}
                    <div className="mt-3 space-y-2">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Achievement Bullets
                      </p>
                      {role.bullets.map((b, bIdx) => (
                        <div
                          key={bIdx}
                          className="group relative flex items-start justify-between gap-2 rounded-lg border border-border/40 bg-background/50 p-2.5 text-xs text-foreground/90 transition-all hover:bg-background"
                        >
                          <span className="flex-1 leading-relaxed">
                            • {b}
                          </span>
                          <div className="flex shrink-0 items-center gap-1 opacity-80 group-hover:opacity-100">
                            <button
                              type="button"
                              onClick={() => handleCopy(b)}
                              title="Copy bullet"
                              className="rounded p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
                            >
                              {copiedText === b ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                            </button>
                            {onApplyData && (
                              <button
                                type="button"
                                onClick={() => handleInsertBullet(b)}
                                title="Insert into top experience"
                                className="flex items-center gap-0.5 rounded bg-primary/10 px-1.5 py-1 text-[11px] font-medium text-primary hover:bg-primary/20"
                              >
                                <Plus className="size-3" />
                                Insert
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'verbs' && (
            <div className="flex flex-col gap-4">
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3.5 text-xs text-foreground">
                <p className="font-semibold text-amber-400 flex items-center gap-1.5 mb-1">
                  <Flame className="size-4" />
                  High-Impact Power Verbs
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Start every resume bullet with a powerful action verb. Click any verb to copy it instantly.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {ACTION_VERBS_BY_CATEGORY.map((grp, gIdx) => (
                  <div key={gIdx} className="rounded-xl border border-border bg-secondary/15 p-4">
                    <h4 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {grp.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {grp.verbs.map((verb) => (
                        <button
                          key={verb}
                          type="button"
                          onClick={() => handleCopy(verb)}
                          className={cn(
                            'group flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary',
                            copiedText === verb && 'border-emerald-500 bg-emerald-500/10 text-emerald-400',
                          )}
                        >
                          <span>{verb}</span>
                          {copiedText === verb ? (
                            <Check className="size-3 text-emerald-400" />
                          ) : (
                            <Copy className="size-3 opacity-0 transition-opacity group-hover:opacity-100 text-muted-foreground" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'metrics' && (
            <div className="flex flex-col gap-4">
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-xs text-foreground">
                <p className="font-semibold text-primary flex items-center gap-1.5 mb-1">
                  <Award className="size-4" />
                  Google "XYZ Formula" Blueprints
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Recruiters prefer: <em>"Accomplished [X] as measured by [Y], by doing [Z]"</em>. Use these proven frameworks to quantify your achievements.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {QUANTIFIABLE_METRIC_TEMPLATES.map((tmpl, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between gap-3 rounded-xl border border-border bg-secondary/20 p-3.5 text-xs transition-all hover:border-border/80 hover:bg-secondary/30"
                  >
                    <p className="flex-1 leading-relaxed text-foreground/90 font-mono text-[11px]">
                      {tmpl}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleCopy(tmpl)}
                      className="shrink-0 rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-foreground flex items-center gap-1"
                    >
                      {copiedText === tmpl ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                      {copiedText === tmpl ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
