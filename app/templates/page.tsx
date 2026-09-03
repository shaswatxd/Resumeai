'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, FileText, Check, Search, Sparkles } from 'lucide-react'
import { TemplateThumbnail } from '@/components/builder/template-thumbnail'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  TEMPLATES,
  TEMPLATE_CATEGORIES,
  THEMES,
  type TemplateId,
  type ThemeId,
} from '@/lib/resume-types'

const STORAGE_KEY = 'resumeai:v2'

export default function TemplatesPage() {
  const router = useRouter()
  const [themeId, setThemeId] = useState<ThemeId>('blue')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0]

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return TEMPLATES.filter((t) => {
      const matchesCategory = category === 'All' || t.category === category
      const matchesQuery =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [query, category])

  const applyTemplate = (id: TemplateId) => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const parsed = raw ? JSON.parse(raw) : {}
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...parsed, template: id, theme: themeId }))
    } catch {
      /* storage unavailable — builder will use defaults */
    }
    router.push('/builder')
  }

  return (
    <main className="min-h-dvh">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <FileText className="size-5" />
          </span>
          <span className="text-lg font-semibold">ResumeAI</span>
        </Link>
        <Link
          href="/builder"
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Open builder <ArrowRight className="size-4" />
        </Link>
      </header>

      <div className="mx-auto max-w-7xl px-6 pb-4">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Home
        </Link>
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
          <Sparkles className="size-3.5" />
          <span>Curated Collection • 15 Elite Designs</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
          Crafted for maximum interview conversion
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground text-base leading-relaxed">
          Every template is engineered from the ground up for crisp vector typography, ATS compliance, and high visual hierarchy. Colors, fonts, and order switch seamlessly without losing your data.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by role, style, tag…"
              className="w-full rounded-xl border border-border bg-secondary/30 py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Palette
            </span>
            {THEMES.map((th) => (
              <button
                key={th.id}
                onClick={() => setThemeId(th.id)}
                title={th.name}
                aria-label={`${th.name} accent`}
                className={cn(
                  'relative flex size-8 items-center justify-center rounded-full border transition-all',
                  th.id === themeId ? 'border-primary ring-2 ring-primary/40 scale-110' : 'border-border hover:border-primary/50',
                )}
              >
                <span className="size-5 rounded-full shadow-inner" style={{ background: th.accent }} />
                {th.id === themeId && <Check className="absolute size-3 text-white stroke-[3]" />}
              </button>
            ))}
          </div>
        </div>

        <div className="scroll-thin mt-6 flex gap-2 overflow-x-auto pb-1">
          {['All', ...TEMPLATE_CATEGORIES].map((c) => {
            const count = c === 'All' ? TEMPLATES.length : TEMPLATES.filter((t) => t.category === c).length
            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cn(
                  'shrink-0 flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold transition-all',
                  category === c
                    ? 'border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                    : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground bg-secondary/20',
                )}
              >
                <span>{c}</span>
                <span
                  className={cn(
                    'rounded-full px-1.5 py-0.2 text-[10px] font-mono',
                    category === c ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-secondary text-muted-foreground',
                  )}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 pb-24 pt-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <div key={t.id} className="group flex flex-col">
            <div className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-border/80 bg-slate-100 shadow-xl transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-primary/50 group-hover:shadow-2xl">
              <TemplateThumbnail template={t.id} theme={theme} scale={0.44} className="rounded-xl shadow-lg" />
              {/* hover overlay */}
              <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <Button size="lg" className="h-11 shadow-xl font-semibold gap-2" onClick={() => applyTemplate(t.id)}>
                  Open in Studio <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
            <div className="mt-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="font-bold text-foreground text-base tracking-tight">{t.name}</p>
                {t.tag && (
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider',
                      t.tag === 'Featured' && 'bg-amber-500/15 border border-amber-500/30 text-amber-400',
                      t.tag === 'ATS' && 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400',
                      t.tag === 'Pro' && 'bg-purple-500/15 border border-purple-500/30 text-purple-400',
                      t.tag === 'Dev' && 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-400',
                    )}
                  >
                    {t.tag}
                  </span>
                )}
              </div>
              <span className="text-xs text-muted-foreground font-medium">{t.category}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{t.description}</p>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-16 text-center text-muted-foreground">
            No templates match “{query}”.
          </p>
        )}
      </div>
    </main>
  )
}
