'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  LayoutTemplate,
  CheckCircle2,
  Palette,
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

/* A4 at CSS 96dpi */
const PAPER_WIDTH = 794
const PAPER_HEIGHT = 1123

const HERO_TEMPLATES: TemplateId[] = ['luxury', 'ats-pro', 'corporate', 'canva-emerald', 'minimal']

export function InteractiveHero() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('luxury')
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>('blue')
  const canvasRef = useRef<HTMLDivElement>(null)
  const [fit, setFit] = useState(1)

  const activeTheme = THEMES.find((t) => t.id === selectedTheme) ?? THEMES[0]

  /*
   * Fit the real 794px-wide document into whatever width the viewport offers.
   * This makes the hero preview accurate on every phone instead of clipping
   * a fixed-width sheet.
   */
  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    const update = () => {
      const available = el.clientWidth - 16
      setFit(Math.min(1, Math.max(0.3, available / PAPER_WIDTH)))
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 pt-14 pb-16 sm:px-6 sm:pt-20 sm:pb-24">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          Free resume builder · No sign-up
        </p>

        <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-6xl">
          A resume that reads
          <br />
          like it was&nbsp;designed,
          <br className="sm:hidden" />
          <span className="text-primary"> and survives the ATS.</span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Fifteen print-ready templates, a live A4 preview, a readiness auditor with
          job-description keyword matching, and selectable-text PDF export.
          Your data stays in your browser.
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/builder"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'h-12 justify-center gap-2 px-7 text-base font-semibold sm:h-11',
            )}
          >
            Start building <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/templates"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'h-12 justify-center gap-2 px-6 text-base font-medium sm:h-11',
            )}
          >
            <LayoutTemplate className="size-4" />
            Browse templates
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5 text-emerald-500" />
            Free, all 15 templates
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5 text-emerald-500" />
            Saved locally, JSON backups
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5 text-emerald-500" />
            Selectable-text PDF export
          </span>
        </div>
      </div>

      {/* Real document preview — this IS the product, rendered live */}
      <div className="mx-auto mt-12 max-w-5xl sm:mt-16">
        <div className="rounded-xl border border-border bg-card">
          {/* Toolbar mirroring the real editor chrome */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 px-3 py-2.5 sm:px-4">
            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-xs font-medium text-muted-foreground">Live preview —</span>
              <span className="text-xs font-semibold text-foreground">
                {TEMPLATES.find((t) => t.id === selectedTemplate)?.name}
              </span>
            </div>

            <div className="flex w-full items-center justify-between gap-2 sm:w-auto">
              {/* Template switcher */}
              <div className="flex items-center gap-0.5 rounded-lg border border-border bg-secondary/50 p-0.5 text-xs">
                {HERO_TEMPLATES.map((tid) => {
                  const tpl = TEMPLATES.find((t) => t.id === tid)
                  if (!tpl) return null
                  return (
                    <button
                      key={tid}
                      type="button"
                      onClick={() => setSelectedTemplate(tid)}
                      aria-pressed={selectedTemplate === tid}
                      className={cn(
                        'min-h-8 rounded-md px-2.5 text-xs font-medium transition-colors',
                        selectedTemplate === tid
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      {tpl.name.split(' ')[0]}
                    </button>
                  )
                })}
              </div>

              {/* Accent switcher — changes the actual document accent */}
              <div className="flex items-center gap-2" title="Accent color">
                <Palette className="size-3.5 text-muted-foreground" aria-hidden />
                <div className="flex items-center gap-1">
                  {THEMES.slice(0, 6).map((thm) => (
                    <button
                      key={thm.id}
                      type="button"
                      onClick={() => setSelectedTheme(thm.id)}
                      aria-label={`${thm.name} accent`}
                      aria-pressed={selectedTheme === thm.id}
                      className={cn(
                        'size-6 rounded-full border-2 transition-transform',
                        selectedTheme === thm.id
                          ? 'scale-110 border-foreground/80'
                          : 'border-transparent opacity-70 hover:opacity-100',
                      )}
                      style={{ backgroundColor: thm.accent }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Document canvas — auto-fits width on every device */}
          <div
            ref={canvasRef}
            className="bg-secondary/40 flex justify-center px-2 py-6 sm:px-6 sm:py-8"
          >
            <div
              className="overflow-hidden bg-white"
              style={{
                height: Math.round(PAPER_HEIGHT * fit),
                borderRadius: 10,
                boxShadow: '0 1px 2px rgba(0,0,0,.35), 0 24px 60px -18px rgba(0,0,0,.55)',
              }}
            >
              <div
                style={{
                  width: PAPER_WIDTH,
                  transform: `scale(${fit})`,
                  transformOrigin: 'top left',
                }}
              >
                <ResumeDocument
                  data={SAMPLE_DATA}
                  template={selectedTemplate}
                  theme={activeTheme}
                  design={DEFAULT_DESIGN_SETTINGS}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-2 border-t border-border/70 px-4 py-3 sm:flex-row">
            <p className="text-center text-xs text-muted-foreground sm:text-left">
              Rendered from the live template engine — the same code that generates your PDF.
            </p>
            <div className="flex items-center gap-2">
              <Link
                href={`/builder?template=${selectedTemplate}`}
                className="rounded-lg border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
              >
                Use this template →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
