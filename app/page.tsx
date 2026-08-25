import Link from 'next/link'
import {
  ArrowRight,
  FileText,
  LayoutTemplate,
  CheckCircle2,
  Sparkles,
  Command,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { ResumeDocument } from '@/components/resume/resume-document'
import { SAMPLE_DATA, TEMPLATES, THEMES } from '@/lib/resume-types'
import { InteractiveHero } from '@/components/landing/interactive-hero'
import { BentoGrid } from '@/components/landing/bento-grid'
import { cn } from '@/lib/utils'

const FAQS = [
  {
    q: 'Is ResumePro really 100% free with no paywalls?',
    a: 'Yes. All 26 templates, vector PDF export, the 50+ pro bullet library, and real-time ATS auditing are completely free with zero hidden subscriptions.',
  },
  {
    q: 'How is my privacy protected?',
    a: 'Your resume data lives strictly inside your browser (localStorage). We do not send your personal details, work history, or contact numbers to any remote server or third-party database.',
  },
  {
    q: 'Are the templates strictly ATS-friendly?',
    a: 'Yes. Templates tagged "ATS" and single-column styles use standard semantic section hierarchies and selectable vector text (never raster images of text), ensuring perfect parsing by Workday, Greenhouse, Lever, and Taleo.',
  },
  {
    q: 'Can I export a backup and restore later?',
    a: 'Yes. You can download a standalone JSON backup file anytime from the top menu and restore it on any computer or mobile browser in 1 click.',
  },
  {
    q: 'How does the ATS score calculation work?',
    a: 'We evaluate 8 core structural indicators (action-verb starters, quantifiable metrics, contact verification, section completeness) and allow you to compare your resume directly against any target Job Description.',
  },
]

const SHOWCASE = ['luxury', 'canva-emerald', 'canva-coral'] as const

export default function Page() {
  const showcaseThemes = [THEMES[0], THEMES[1], THEMES[2]]

  return (
    <main className="relative min-h-dvh overflow-hidden bg-background text-foreground">
      {/* Ambient background studio lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, oklch(0.62 0.2 292), transparent)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[45%] right-0 h-[450px] w-[600px] rounded-full opacity-15 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, oklch(0.7 0.18 190), transparent)',
        }}
      />

      {/* Modern Studio Navbar */}
      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <FileText className="size-5" />
          </span>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight">ResumePro</span>
            <span className="rounded-full bg-secondary/80 px-2 py-0.5 text-[10px] font-mono font-medium text-muted-foreground">
              v2.0
            </span>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground sm:flex">
          <Link href="/templates" className="transition-colors hover:text-foreground">
            26 Layouts
          </Link>
          <Link href="/cover-letter" className="transition-colors hover:text-foreground">
            Cover Letter
          </Link>
          <Link href="/tracker" className="transition-colors hover:text-foreground">
            Job Tracker
          </Link>
          <Link href="/interview" className="transition-colors hover:text-foreground">
            Interview Prep
          </Link>
          <Link
            href="/builder"
            className="flex items-center gap-1.5 transition-colors hover:text-foreground font-semibold text-foreground"
          >
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Studio
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/builder"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'h-10 gap-2 px-5 font-semibold shadow-sm',
            )}
          >
            Open Studio <ArrowRight className="size-4" />
          </Link>
        </div>
      </header>

      {/* Interactive Hero with Live Studio Canvas */}
      <InteractiveHero />

      {/* Bento Grid Feature Studio */}
      <BentoGrid />

      {/* Handcrafted Template Showcase */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Curated Executive Layouts
          </h2>
          <p className="mt-3 text-muted-foreground">
            Engineered for high readability, crisp typography, and ATS compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {SHOWCASE.map((id, i) => {
            const tpl = TEMPLATES.find((t) => t.id === id)!
            return (
              <Link
                key={id}
                href={`/builder?template=${id}`}
                className={cn(
                  'group relative overflow-hidden rounded-2xl border border-border bg-white shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/50',
                  i === 1 && 'sm:-mt-4',
                )}
              >
                <div className="pointer-events-none h-0 w-full pb-[135%]" />
                <div className="absolute inset-0 overflow-hidden">
                  <div className="w-[794px] origin-top-left scale-[0.40] sm:scale-[0.44]">
                    <div style={{ width: 794, minHeight: 1123 }} className="bg-white">
                      <ResumeDocument
                        data={SAMPLE_DATA}
                        template={id}
                        theme={showcaseThemes[i]}
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 pt-12">
                  <div>
                    <span className="text-base font-semibold text-white">
                      {tpl.name}
                    </span>
                    <p className="text-xs text-white/70">{tpl.category}</p>
                  </div>
                  <span className="flex items-center gap-1 rounded-lg bg-white/20 backdrop-blur px-2.5 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                    Use Layout <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/30 px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary/60 transition-colors"
          >
            <LayoutTemplate className="size-4 text-primary" />
            Explore all {TEMPLATES.length} Crafted Templates
          </Link>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-20">
        <h2 className="mb-3 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="mx-auto mb-10 max-w-md text-center text-muted-foreground">
          Everything you need to know about ATS compliance, templates, and privacy.
        </p>
        <div className="flex flex-col gap-3.5">
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-border/80 bg-popover/40 p-5 transition-colors open:bg-popover/80"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-foreground">
                {f.q}
                <span className="text-muted-foreground text-xl transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Studio CTA Bar */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-24 text-center">
        <div className="rounded-3xl border border-border/80 bg-popover/60 p-10 sm:p-16 glow-border backdrop-blur-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 mb-6">
            <span className="size-2 rounded-full bg-emerald-400" />
            <span>Ready in under 5 minutes</span>
          </div>
          <h2 className="text-balance text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            Craft your standout resume today.
          </h2>
          <p className="mx-auto mb-8 mt-4 max-w-lg text-muted-foreground leading-relaxed">
            No credit card, no registration, no tracking. Jump straight into the editor, select a bespoke theme, and download your recruiter-ready PDF.
          </p>
          <Link
            href="/builder"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'h-13 px-8 text-base font-semibold shadow-lg shadow-primary/25 rounded-xl gap-2 hover:scale-[1.02] transition-transform',
            )}
          >
            Launch Studio <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* Studio Footer */}
      <footer className="relative z-10 border-t border-border py-10 bg-secondary/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2.5">
            <FileText className="size-4 text-primary" />
            <span className="font-semibold text-foreground">ResumePro</span>
            <span className="text-xs text-muted-foreground">— Bespoke Client-Side Resume Studio</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/builder" className="transition-colors hover:text-foreground">
              Studio Builder
            </Link>
            <Link href="/templates" className="transition-colors hover:text-foreground">
              26 Layouts
            </Link>
            <Link href="/cover-letter" className="transition-colors hover:text-foreground">
              Cover Letter
            </Link>
            <Link href="/tracker" className="transition-colors hover:text-foreground">
              Job Tracker
            </Link>
            <Link href="/interview" className="transition-colors hover:text-foreground">
              Interview Prep
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  )
}
