'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Sparkles,
  LayoutTemplate,
  Palette,
  CheckCircle2,
  Download,
  Gauge,
  BookOpen,
  ChevronRight,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { ResumeDocument } from '@/components/resume/resume-document'
import {
  SAMPLE_DATA,
  TEMPLATES,
  THEMES,
  DEFAULT_DESIGN_SETTINGS,
  type TemplateId,
  type ThemeId,
} from '@/lib/resume-types'
import { cn } from '@/lib/utils'

export function InteractiveHero() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('luxury')
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>('orange')
  const [zoom, setZoom] = useState(false)

  const activeTheme = THEMES.find((t) => t.id === selectedTheme) ?? THEMES[0]

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-24">
      {/* Top Tagline */}
      <div className="flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary shadow-sm">
          <span className="flex size-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Bespoke Resume Studio • 26 Crafted Layouts • Zero-Sign In</span>
        </div>

        <h1 className="mt-8 max-w-4xl text-balance text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground">
          The craft-first resume builder for{' '}
          <span className="bg-gradient-to-r from-primary via-indigo-400 to-amber-300 bg-clip-text text-transparent">
            top 1% careers
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base sm:text-lg leading-relaxed text-muted-foreground">
          Build a recruiter-ready, ATS-compliant resume with pixel-perfect typography,
          a 50+ role bullet library, and instant client-side PDF export — completely free.
        </p>

        {/* Primary CTAs */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/builder"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'h-13 px-8 text-base font-semibold shadow-lg shadow-primary/25 rounded-xl gap-2 hover:scale-[1.02] transition-transform',
            )}
          >
            Open Studio <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/templates"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'h-13 px-6 text-base font-medium rounded-xl border-border bg-secondary/30 hover:bg-secondary/60 gap-2',
            )}
          >
            <LayoutTemplate className="size-4 text-muted-foreground" />
            Explore 26 Layouts
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="size-4 text-emerald-400" />
            100% Free & No Paywalls
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="size-4 text-emerald-400" />
            Client-Side Privacy (Zero Tracking)
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="size-4 text-emerald-400" />
            ATS Safe Vector PDF Export
          </span>
        </div>
      </div>

      {/* Interactive Studio Preview Mockup */}
      <div className="mt-14 relative mx-auto max-w-5xl rounded-2xl border border-border/80 bg-popover/80 p-2 sm:p-4 glow-border backdrop-blur-xl">
        {/* Studio Toolbar Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3 px-2">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="size-3 rounded-full bg-rose-500/80" />
              <span className="size-3 rounded-full bg-amber-500/80" />
              <span className="size-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="ml-2 text-xs font-mono text-muted-foreground">
              studio-canvas.pdf
            </span>
            <span className="hidden sm:inline-block rounded-md bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
              96% ATS Score
            </span>
          </div>

          {/* Quick interactive template & color switcher */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Template Selector */}
            <div className="flex items-center gap-1 rounded-lg border border-border bg-secondary/40 p-1 text-xs">
              {(['luxury', 'canva-emerald', 'ats-pro', 'canva-coral', 'minimal'] as TemplateId[]).map((tid) => {
                const tpl = TEMPLATES.find((t) => t.id === tid)
                if (!tpl) return null
                return (
                  <button
                    key={tid}
                    type="button"
                    onClick={() => setSelectedTemplate(tid)}
                    className={cn(
                      'rounded-md px-2.5 py-1 text-xs font-medium transition-all',
                      selectedTemplate === tid
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {tpl.name.split(' ')[0]}
                  </button>
                )
              })}
            </div>

            {/* Accent Color Palette */}
            <div className="flex items-center gap-1 rounded-lg border border-border bg-secondary/40 p-1">
              {THEMES.slice(0, 5).map((thm) => (
                <button
                  key={thm.id}
                  type="button"
                  onClick={() => setSelectedTheme(thm.id)}
                  className={cn(
                    'size-5 rounded-full border transition-transform',
                    selectedTheme === thm.id
                      ? 'scale-125 border-white ring-2 ring-primary'
                      : 'border-transparent opacity-70 hover:opacity-100',
                  )}
                  style={{ backgroundColor: thm.accent }}
                  title={thm.name}
                />
              ))}
            </div>

            <Link
              href="/builder"
              className="rounded-lg bg-primary/10 border border-primary/30 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
            >
              Open in Editor →
            </Link>
          </div>
        </div>

        {/* Live Document Canvas */}
        <div className="relative mt-4 flex justify-center items-start overflow-hidden rounded-xl bg-studio-grid py-6 px-2 sm:px-6">
          <div className="w-full max-w-[760px] overflow-hidden rounded-xl bg-white sheet-shadow transition-all duration-300">
            <ResumeDocument
              data={SAMPLE_DATA}
              template={selectedTemplate}
              theme={activeTheme}
              design={DEFAULT_DESIGN_SETTINGS}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
