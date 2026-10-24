'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowLeftRight } from 'lucide-react'
import { ResumeDocument } from '@/components/resume/resume-document'
import {
  SAMPLE_DATA,
  TEMPLATES,
  THEMES,
  DEFAULT_DESIGN_SETTINGS,
  type TemplateId,
} from '@/lib/resume-types'

const PAPER_WIDTH = 794
const PAPER_HEIGHT = 1123
const LEFT_DEFAULT: TemplateId = 'ats-pro'
const RIGHT_DEFAULT: TemplateId = 'canva-emerald'
const COMPARE_IDS: TemplateId[] = [
  'ats-pro',
  'corporate',
  'minimal',
  'elegant',
  'canva-emerald',
  'canva-coral',
  'developer',
  'designer',
  'luxury',
]

/*
 * Same sample resume, two real templates, side by side. Everything on screen
 * is produced by the live template engine — no fabricated personas, no
 * invented pass percentages.
 */
export function ComparisonSlider() {
  const [leftTpl, setLeftTpl] = useState<TemplateId>(LEFT_DEFAULT)
  const [rightTpl, setRightTpl] = useState<TemplateId>(RIGHT_DEFAULT)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const [fitL, setFitL] = useState(0.45)
  const [fitR, setFitR] = useState(0.45)

  const bindFit = (
    ref: React.RefObject<HTMLDivElement | null>,
    setFit: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    useEffect(() => {
      const el = ref.current
      if (!el) return
      const update = () => {
        const scale = Math.min(1, el.clientWidth / PAPER_WIDTH)
        setFit(Math.max(0.2, scale))
      }
      update()
      const ro = new ResizeObserver(update)
      ro.observe(el)
      return () => ro.disconnect()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  }
  bindFit(leftRef, setFitL)
  bindFit(rightRef, setFitR)

  const side = (
    ref: React.RefObject<HTMLDivElement | null>,
    tpl: TemplateId,
    fit: number,
    setter: React.Dispatch<React.SetStateAction<TemplateId>>,
    label: string,
  ) => (
    <div className="flex min-w-0 flex-1 flex-col">
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <div
        ref={ref}
        className="overflow-hidden rounded-lg bg-white shadow-xl"
        style={{ height: Math.round(PAPER_HEIGHT * fit) }}
      >
        <div style={{ width: PAPER_WIDTH, transform: `scale(${fit})`, transformOrigin: 'top left' }}>
          <ResumeDocument data={SAMPLE_DATA} template={tpl} theme={THEMES[0]} design={DEFAULT_DESIGN_SETTINGS} />
        </div>
      </div>
      <select
        value={tpl}
        onChange={(e) => setter(e.target.value as TemplateId)}
        aria-label={`${label} template`}
        className="mt-2 h-10 w-full rounded-lg border border-border bg-secondary/50 px-2.5 text-xs font-medium text-foreground outline-none transition-colors focus:border-ring"
      >
        {COMPARE_IDS.map((id) => (
          <option key={id} value={id}>
            {TEMPLATES.find((t) => t.id === id)?.name}
          </option>
        ))}
      </select>
    </div>
  )

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mb-10 max-w-2xl">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          <ArrowLeftRight className="size-3.5" /> One resume tree, many leaves
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Same content. Fifteen genuinely different layouts.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Templates are layouts, not thin color swaps — pick the two you&rsquo;re torn
          between and compare the actual rendered document. Switching never
          touches your text.
        </p>
      </div>

      <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
        {side(leftRef, leftTpl, fitL, setLeftTpl, 'Left')}
        {side(rightRef, rightTpl, fitR, setRightTpl, 'Right')}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/templates"
          className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-secondary/40 px-5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary/60"
        >
          See the full gallery <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  )
}
