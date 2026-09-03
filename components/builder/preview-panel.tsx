'use client'

import { useMemo, useState, useRef, useEffect } from 'react'
import { ResumeDocument } from '@/components/resume/resume-document'
import { PrintSheet } from '@/components/print-sheet'
import { PhotoEditor } from '@/components/builder/photo-editor'
import {
  SAMPLE_DATA,
  TEMPLATES,
  THEMES,
  calculateAtsScore,
  type DesignSettings,
  type ResumeData,
  type TemplateId,
  type ThemeId,
} from '@/lib/resume-types'
import {
  Gauge,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  FileCheck,
  AlertTriangle,
  Sliders,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  data: ResumeData
  template: TemplateId
  theme: ThemeId
  design: DesignSettings
  onChange: (updater: ResumeData | ((prev: ResumeData) => ResumeData)) => void
  onDesignChange?: (patch: Partial<DesignSettings>) => void
  onTemplate?: (id: TemplateId) => void
  onOpenAts?: () => void
  zenMode?: boolean
  onToggleZen?: () => void
}

function countWords(d: ResumeData): number {
  const parts = [
    d.fullName,
    d.role,
    d.summary,
    ...d.experience.flatMap((e) => [e.role, e.company, ...e.bullets]),
    ...d.education.map((e) => `${e.degree} ${e.school} ${e.detail}`),
    ...d.skills,
    ...d.projects.map((p) => `${p.name} ${p.tech} ${p.description}`),
    ...d.achievements,
  ]
  return parts.join(' ').split(/\s+/).filter(Boolean).length
}

function isEmpty(d: ResumeData) {
  return (
    !d.fullName &&
    !d.role &&
    !d.summary &&
    !d.photo &&
    d.experience.length === 0 &&
    d.education.length === 0 &&
    d.skills.length === 0
  )
}

export function PreviewPanel({
  data,
  template,
  theme,
  design,
  onChange,
  onDesignChange,
  onTemplate,
  onOpenAts,
  zenMode = false,
  onToggleZen,
}: Props) {
  const [zoom, setZoom] = useState<number>(100)
  const [showPageBreak, setShowPageBreak] = useState(true)
  const [photoEditorOpen, setPhotoEditorOpen] = useState(false)
  const docRef = useRef<HTMLDivElement>(null)
  const [docHeight, setDocHeight] = useState(1000)

  const showSample = isEmpty(data)
  const rendered = showSample ? SAMPLE_DATA : data
  const atsScore = calculateAtsScore(rendered)
  const totalWords = countWords(rendered)

  useEffect(() => {
    if (!docRef.current) return
    const update = () => {
      if (docRef.current) {
        setDocHeight(docRef.current.scrollHeight)
      }
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(docRef.current)
    return () => ro.disconnect()
  }, [rendered, template, theme, design])

  const isMultiPage = docHeight > 1135

  const handleAutoFitSpacing = () => {
    if (!onDesignChange) return
    onDesignChange({
      sectionSpacing: 'compact',
      lineHeight: 'compact',
      pageMargin: 'narrow',
      fontSize: 'sm',
    })
  }

  const handleZoom = (delta: number) => {
    setZoom((prev) => Math.min(130, Math.max(70, prev + delta)))
  }

  return (
    <div className="flex h-full flex-col">
      {/* Top Preview Control Bar */}
      <div className="no-print flex flex-wrap items-center justify-between gap-2 border-b border-border bg-popover/80 px-4 py-2.5 backdrop-blur">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenAts}
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all hover:scale-105',
              atsScore >= 80
                ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-400'
                : atsScore >= 50
                ? 'border-amber-500/40 bg-amber-500/15 text-amber-400'
                : 'border-rose-500/40 bg-rose-500/15 text-rose-400',
            )}
            title="Click to open ATS Auditor"
          >
            <Gauge className="size-3.5" />
            <span>{atsScore}% ATS Score</span>
          </button>

          {/* Word count & Page fit indicator */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs">
            {isMultiPage ? (
              <span className="flex items-center gap-1 text-amber-400 font-semibold bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-full">
                <AlertTriangle className="size-3.5" />
                ~2 Pages ({totalWords} words)
              </span>
            ) : (
              <span className="flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                <FileCheck className="size-3.5" />
                ✓ 1 Page ({totalWords} words)
              </span>
            )}
            {isMultiPage && onDesignChange && (
              <button
                type="button"
                onClick={handleAutoFitSpacing}
                className="ml-1 rounded-md bg-amber-400/20 border border-amber-400/40 px-2 py-0.5 text-[11px] font-bold text-amber-300 hover:bg-amber-400/30 transition-colors shadow-sm"
                title="Slightly tighten spacing and margins to keep resume on 1 page"
              >
                ⚡ Auto-Fit 1-Page
              </button>
            )}
          </div>
        </div>

        {/* Right side controls: Page Break Guide, Zoom, Template picker, Zen Mode */}
        <div className="flex items-center gap-2">
          {/* Page Guide Toggle */}
          <button
            type="button"
            onClick={() => setShowPageBreak((v) => !v)}
            className={cn(
              'hidden sm:inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs font-medium transition-colors',
              showPageBreak
                ? 'border-primary/40 bg-primary/10 text-primary'
                : 'border-border bg-secondary/30 text-muted-foreground hover:text-foreground',
            )}
            title="Toggle print page break markers"
          >
            Page Guide
          </button>

          {/* Zoom controls */}
          <div className="flex items-center rounded-lg border border-border bg-secondary/30 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => handleZoom(-10)}
              disabled={zoom <= 70}
              className="rounded p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
              title="Zoom out"
            >
              <ZoomOut className="size-3.5" />
            </button>
            <span className="w-10 text-center font-mono text-[11px] font-medium text-foreground">
              {zoom}%
            </span>
            <button
              type="button"
              onClick={() => handleZoom(10)}
              disabled={zoom >= 130}
              className="rounded p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
              title="Zoom in"
            >
              <ZoomIn className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setZoom(100)}
              className="ml-0.5 rounded px-1.5 py-0.5 text-[10px] text-muted-foreground hover:text-foreground"
              title="Reset Zoom"
            >
              100%
            </button>
          </div>

          {/* Quick template switcher */}
          {onTemplate && (
            <select
              value={template}
              onChange={(e) => onTemplate(e.target.value as TemplateId)}
              className="rounded-lg border border-border bg-popover px-2.5 py-1 text-xs font-semibold text-foreground outline-none transition-colors hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary"
            >
              {TEMPLATES.map((t) => (
                <option
                  key={t.id}
                  value={t.id}
                  className="bg-slate-900 text-slate-100 dark:bg-slate-900 dark:text-slate-100"
                >
                  {t.name}
                </option>
              ))}
            </select>
          )}

          {/* Zen / Focus Mode Toggle */}
          {onToggleZen && (
            <button
              type="button"
              onClick={onToggleZen}
              className={cn(
                'flex items-center gap-1 rounded-lg border border-border p-1.5 text-xs transition-colors',
                zenMode
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-secondary/30 text-muted-foreground hover:text-foreground hover:bg-secondary/60',
              )}
              title={zenMode ? 'Exit Zen Mode (Show Editor)' : 'Enter Zen Mode (Fullscreen Preview)'}
            >
              {zenMode ? <Minimize2 className="size-3.5" /> : <Maximize2 className="size-3.5" />}
            </button>
          )}
        </div>
      </div>

      {/* Sheet Preview Body */}
      <div className="scroll-thin flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start">
        <div
          style={{
            transform: zoom !== 100 ? `scale(${zoom / 100})` : undefined,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
          }}
          className="w-full max-w-[820px]"
        >
          <div
            ref={docRef}
            className="relative overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5 min-h-[1123px]"
          >
            {/* Page 1 Cutoff Warning (ONLY when content overflows Page 1) */}
            {showPageBreak && isMultiPage && (
              <div
                className="no-print pointer-events-none absolute left-0 right-0 z-30 flex items-center justify-between border-b-2 border-dashed border-rose-500/80 px-4 select-none opacity-90 shadow-sm"
                style={{ top: 1123 }}
              >
                <span className="rounded-b bg-rose-600 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-white shadow-md">
                  ⚠ Page 1 Cutoff
                </span>
                <span className="rounded-b bg-rose-600 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-white shadow-md">
                  Page 2 Starts Below
                </span>
              </div>
            )}

            {/* Page 1 Safe Boundary (when content cleanly fits on Page 1) */}
            {showPageBreak && !isMultiPage && (
              <div
                className="no-print pointer-events-none absolute left-0 right-0 z-30 flex items-center justify-between border-b border-dashed border-emerald-500/40 px-4 select-none opacity-60"
                style={{ top: 1123 }}
              >
                <span className="rounded-b bg-emerald-700/80 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white">
                  ✓ Page 1 Safe Boundary
                </span>
                <span className="rounded-b bg-emerald-700/80 px-2 py-0.5 text-[9px] font-medium text-white">
                  Fits on 1 Page
                </span>
              </div>
            )}

            {/* Page 2 Break Indicator (Height = 2246px) */}
            {showPageBreak && isMultiPage && docHeight > 2246 && (
              <div
                className="no-print pointer-events-none absolute left-0 right-0 z-30 flex items-center justify-between border-b-2 border-dashed border-rose-500/70 px-4 select-none opacity-85"
                style={{ top: 2246 }}
              >
                <span className="rounded-b bg-rose-600 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-white shadow-md">
                  --- Page 2 End ---
                </span>
                <span className="rounded-b bg-rose-600 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-white shadow-md">
                  --- Page 3 Start ---
                </span>
              </div>
            )}

            <ResumeDocument
              data={rendered}
              template={template}
              theme={THEMES.find((t) => t.id === theme) ?? THEMES[0]}
              design={design}
              isEditable={true}
              onChange={onChange}
              openPhotoEditor={() => setPhotoEditorOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Hidden print renderer for pixel-perfect standard A4/Letter prints */}
      <PrintSheet>
        <ResumeDocument
          data={rendered}
          template={template}
          theme={THEMES.find((t) => t.id === theme) ?? THEMES[0]}
          design={design}
        />
      </PrintSheet>

      <PhotoEditor
        open={photoEditorOpen}
        onClose={() => setPhotoEditorOpen(false)}
        photo={data.photo}
        onSave={(newPhoto) => onChange((prev) => ({ ...prev, photo: newPhoto }))}
        onRemove={() => onChange((prev) => ({ ...prev, photo: '' }))}
      />
    </div>
  )
}
