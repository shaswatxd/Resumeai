import Link from 'next/link'
import {
  ArrowRight,
  FileText,
  LayoutTemplate,
  Heart,
  Download,
  ShieldCheck,
  Keyboard,
  Palette,
} from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { InteractiveHero } from '@/components/landing/interactive-hero'
import { BentoGrid } from '@/components/landing/bento-grid'
import { ComparisonSlider } from '@/components/landing/comparison-slider'
import { LandingHeader } from '@/components/landing/landing-header'
import { cn } from '@/lib/utils'

/*
 * Honest FAQ — every answer describes what the app actually does.
 */
const FAQS = [
  {
    q: 'Is it really free? What is the catch?',
    a: 'There is no catch. All 15 templates, the bullet library, ATS checks, cover letters and PDF export are free with no account. The app does not gate any feature behind payments — AI writing helpers use your configured provider keys.',
  },
  {
    q: 'Where is my data stored, exactly?',
    a: 'In your browser (localStorage). Editing, previews, template switching and PDF export all work locally. When you deliberately use an AI helper, only the text of the section you generate is sent to the configured AI provider to write on your behalf.',
  },
  {
    q: 'What does the ATS check actually measure?',
    a: 'Eight structural signals: contact completeness, summary quality, bullet depth, quantified results, action-verb openers, skill count, education and overall length. Paste a job description and it also lists matched and missing keywords. It is a helpful heuristic — no tool can guarantee an ATS result, and we are upfront about that.',
  },
  {
    q: 'Which export format do I get?',
    a: 'A PDF straight from the browser&rsquo;s print engine over an exact A4 (or Letter) sheet: selectable, searchable vector text — never a screenshot. The exported file matches the on-screen preview because both render from the same template code.',
  },
  {
    q: 'Can I back up or move my resume?',
    a: 'Yes. Export a JSON backup from the builder menu and import it on any other device or browser. Your existing local data keeps working — nothing is deleted by updates.',
  },
]

const FINISHES = [
  {
    icon: Palette,
    title: '10 accent themes · 10 fonts',
    desc: 'Accent color, document font, spacing, margins, photo shape and section order — the design panel controls the actual document, not just a wrapper.',
  },
  {
    icon: Keyboard,
    title: 'Built for real editing',
    desc: 'Click any text on the paper to edit it, reorder sections by drag, undo mistakes, and press ⌘K to jump anywhere.',
  },
  {
    icon: Download,
    title: 'PDF that matches the preview',
    desc: 'A dedicated print sheet renders the exact A4/Letter output — so what you approve on screen is what arrives at the employer.',
  },
  {
    icon: ShieldCheck,
    title: 'Local-first by design',
    desc: 'No sign-up, no tracking of your resume content. JSON export for backups, import to restore.',
  },
]

export default function Page() {
  return (
    <main className="relative min-h-dvh bg-background text-foreground">
      <LandingHeader />

      <InteractiveHero />

      <ComparisonSlider />

      <BentoGrid />

      {/* Shaadi Biodata — dignified strip, honest description */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-4 sm:px-6">
        <div className="flex flex-col items-start gap-6 rounded-xl border border-rose-500/25 bg-rose-950/20 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="max-w-2xl space-y-2">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-400">
              <Heart className="size-3.5 fill-rose-500 text-rose-500" /> Also in the toolkit
            </p>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
              Indian Shaadi Biodata Maker
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Matrimonial biodata in Hindi or English across ten designs rooted in their
              traditions — Hindu, Muslim, Sikh, Christian and Jain. Kundali and family
              fields, auspicious crests, PDF export and WhatsApp sharing.
            </p>
          </div>
          <Link
            href="/shaadi-biodata"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-rose-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-rose-500"
          >
            Create a biodata <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* Craft / finishes */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid grid-cols-1 gap-x-10 gap-y-10 border-t border-border pt-14 md:grid-cols-2 lg:grid-cols-4">
          {FINISHES.map((f, i) => (
            <div key={f.title} className="relative pl-6 md:pl-0">
              <span className="absolute left-0 top-1 font-mono text-[11px] font-semibold text-muted-foreground/70 md:static md:mb-3 md:block">
                0{i + 1}
              </span>
              <f.icon className="mb-3 size-5 text-primary md:hidden" />
              <h3 className="font-display text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Template links strip */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-border bg-card px-6 py-5 sm:flex-row">
          <div className="flex items-center gap-3">
            <LayoutTemplate className="size-5 text-primary" />
            <p className="text-sm text-muted-foreground">
              All 15 templates are browsable at full resolution before you commit.
            </p>
          </div>
          <Link
            href="/templates"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-border px-4 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Open the gallery <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <h2 className="font-display text-3xl font-semibold tracking-tight">Honest answers</h2>
        <div className="mt-8 divide-y divide-border border-y border-border">
          {FAQS.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-medium text-foreground">
                {f.q}
                <span
                  aria-hidden
                  className="text-muted-foreground transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p
                className="mt-2 pb-2 text-sm leading-relaxed text-muted-foreground [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: f.a }}
              />
            </details>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative z-10 mx-auto max-w-5xl px-4 pb-24 sm:px-6">
        <div className="rounded-2xl border border-border bg-card px-6 py-12 text-center sm:px-12">
          <h2 className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Open the editor. Your resume exists as soon as you type it.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            No credit card, no registration. Pick a template, fill in your story,
            download the PDF — it takes about the time a recruiter will give it.
          </p>
          <Link
            href="/builder"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'mt-8 inline-flex h-12 px-8 text-base font-semibold',
            )}
          >
            Build my resume <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border bg-secondary/20 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 text-sm text-muted-foreground sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2.5">
            <FileText className="size-4 text-primary" />
            <span className="font-semibold text-foreground font-display">ResumeAI</span>
            <span className="text-xs text-muted-foreground">Local-first resume studio</span>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm">
            <Link href="/builder" className="transition-colors hover:text-foreground">
              Resume Builder
            </Link>
            <Link href="/templates" className="transition-colors hover:text-foreground">
              Templates
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
            <Link href="/shaadi-biodata" className="font-medium text-rose-400 transition-colors hover:text-rose-300">
              Shaadi Biodata
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  )
}
