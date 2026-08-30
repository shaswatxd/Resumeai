'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { useToast } from '@/components/ui/toast'
import {
  LayoutTemplate,
  Sparkles,
  Download,
  FileText,
  Eye,
  Pencil,
  RotateCcw,
  Gauge,
  MoreHorizontal,
  FileUp,
  FileDown,
  Wand2,
  Copy,
  Undo2,
  Redo2,
  BookOpen,
  Briefcase,
  HelpCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EditorPanel } from '@/components/builder/editor-panel'
import { PreviewPanel } from '@/components/builder/preview-panel'
import { DesignPanel } from '@/components/builder/design-panel'
import { AtsPanel } from '@/components/builder/ats-panel'
import { BulletLibraryModal } from '@/components/builder/bullet-library-modal'
import { CommandPalette } from '@/components/builder/command-palette'
import { useResumeStore } from '@/hooks/use-resume-store'
import { EMPTY_DATA, SAMPLE_DATA, type ResumeData } from '@/lib/resume-types'
import { cn } from '@/lib/utils'

export function BuilderShell() {
  const {
    data,
    template,
    theme,
    design,
    hydrated,
    canUndo,
    canRedo,
    undo,
    redo,
    setData,
    setTemplate,
    setTheme,
    setDesign,
    reset,
  } = useResumeStore()

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [libraryOpen, setLibraryOpen] = useState(false)
  const [atsOpen, setAtsOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileView, setMobileView] = useState<'edit' | 'preview'>('edit')
  const [confirmReset, setConfirmReset] = useState(false)
  const importRef = useRef<HTMLInputElement>(null)
  const toast = useToast()

  // Calculate quick ATS readiness score for the header badge
  const quickAtsScore = (() => {
    let pts = 0
    if (data.fullName && data.email && data.phone) pts += 25
    if (data.summary && data.summary.length >= 80) pts += 20
    if (data.experience.length > 0 && data.experience.some((e) => e.bullets.length > 0)) pts += 25
    if (data.skills.length >= 4) pts += 15
    if (data.education.length > 0) pts += 15
    return Math.min(100, pts)
  })()

  const handleReset = () => {
    setConfirmReset(true)
    setMenuOpen(false)
  }

  const doReset = () => {
    setData(EMPTY_DATA)
    reset()
    setConfirmReset(false)
    toast('Resume cleared. You can Undo if needed.', 'info')
  }

  const handleFillSample = () => {
    setData(SAMPLE_DATA)
    setMenuOpen(false)
  }

  const handleCopyPlainText = async () => {
    const text = [
      data.fullName,
      data.role,
      [data.email, data.phone, data.location, data.linkedin, data.github, data.website].filter(Boolean).join(' | '),
      '',
      data.summary ? `SUMMARY\n${data.summary}\n` : '',
      data.experience.length ? `EXPERIENCE\n${data.experience.map((e) => `${e.role} at ${e.company} (${e.start} - ${e.end})\n${e.bullets.map((b) => `• ${b}`).join('\n')}`).join('\n\n')}\n` : '',
      data.education.length ? `EDUCATION\n${data.education.map((e) => `${e.degree}, ${e.school} (${e.start} - ${e.end})\n${e.detail}`).join('\n')}\n` : '',
      data.skills.length ? `SKILLS\n${data.skills.join(', ')}\n` : '',
      data.projects.length ? `PROJECTS\n${data.projects.map((p) => `${p.name} - ${p.tech}\n${p.description}`).join('\n\n')}\n` : '',
    ].filter(Boolean).join('\n')

    await navigator.clipboard.writeText(text)
    toast('Resume plain text copied to clipboard!', 'success')
    setMenuOpen(false)
  }

  const handlePrint = () => {
    const prev = document.title
    document.title = data.fullName
      ? `${data.fullName} - Resume`
      : 'Resume - ResumeAI'
    window.print()
    document.title = prev
  }

  const handleExport = () => {
    const blob = new Blob([JSON.stringify({ data, template, theme }, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${(data.fullName || 'resume').replace(/\s+/g, '-').toLowerCase()}-resumeai.json`
    a.click()
    URL.revokeObjectURL(url)
    setMenuOpen(false)
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result))
        const incoming = (parsed.data ?? parsed) as Partial<ResumeData>
        setData({ ...EMPTY_DATA, ...incoming })
        if (parsed.template) setTemplate(parsed.template)
        if (parsed.theme) setTheme(parsed.theme)
      } catch {
        toast('Invalid file — expected a ResumeAI JSON export.', 'error')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
    setMenuOpen(false)
  }

  return (
    <div className="flex h-dvh w-full max-w-[100vw] flex-col overflow-hidden overflow-x-hidden print:h-auto print:overflow-visible">
      {/* Top bar — Android fix: left side scrolls, right side fixed so dropdown never clipped */}
      <header className="no-print z-30 flex h-14 sm:h-16 w-full max-w-full shrink-0 items-center justify-between gap-2 border-b border-border bg-popover/80 px-2 sm:px-4 backdrop-blur overflow-visible">
        <div className="flex min-w-0 flex-1 items-center gap-1 sm:gap-2 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Link
            href="/"
            className="group relative flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground"
            aria-label="ResumeAI home"
          >
            <FileText className="size-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
          </Link>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold leading-none">ResumeAI</p>
            <p className="text-[11px] text-muted-foreground">
              {hydrated ? 'Saved locally' : 'Loading…'}
            </p>
          </div>

          {/* Undo / Redo */}
          <div className="ml-1 sm:ml-2 flex shrink-0 items-center gap-0.5 rounded-lg border border-border/80 bg-secondary/30 p-0.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground disabled:opacity-30"
              disabled={!canUndo}
              onClick={undo}
              title="Undo (Ctrl+Z)"
            >
              <Undo2 className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground disabled:opacity-30"
              disabled={!canRedo}
              onClick={redo}
              title="Redo (Ctrl+Y)"
            >
              <Redo2 className="size-4" />
            </Button>
          </div>

          <Button
            variant="outline"
            size="lg"
            className="ml-1 h-8 sm:h-10 px-2 sm:px-3 text-xs sm:text-sm"
            onClick={() => setDrawerOpen(true)}
          >
            <LayoutTemplate className="size-4" />
            <span className="hidden sm:inline">Design</span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="h-8 sm:h-10 gap-1 sm:gap-2 px-2 sm:px-3 text-xs sm:text-sm"
            onClick={() => setAtsOpen(true)}
          >
            <Gauge className="size-4" />
            <span className="hidden lg:inline">ATS Score</span>
            <span
              className={cn(
                'rounded-full px-2 py-0.5 text-xs font-bold tabular-nums',
                quickAtsScore >= 80
                  ? 'bg-emerald-500/15 text-emerald-400'
                  : quickAtsScore >= 50
                    ? 'bg-amber-500/15 text-amber-400'
                    : 'bg-red-500/15 text-red-400',
              )}
            >
              {quickAtsScore}%
            </span>
          </Button>
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <div className="relative">
            <Button
              variant="ghost"
              size="lg"
              className="h-8 sm:h-10 px-2 sm:px-3"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="More options"
            >
              <MoreHorizontal className="size-4" />
            </Button>
            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setMenuOpen(false)}
                  aria-hidden
                />
                <div className="absolute right-0 top-11 z-50 w-56 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-2xl">
                  <MenuItem
                    icon={Wand2}
                    label="Fill Sample Data"
                    onClick={handleFillSample}
                  />
                  <MenuItem
                    icon={Briefcase}
                    label="Job Tracker Pipeline"
                    onClick={() => window.open('/tracker', '_blank')}
                  />
                  <MenuItem
                    icon={HelpCircle}
                    label="STAR Interview Prep"
                    onClick={() => window.open('/interview', '_blank')}
                  />
                  <MenuItem
                    icon={Copy}
                    label="Copy ATS Plain Text"
                    onClick={handleCopyPlainText}
                  />
                  <MenuItem
                    icon={FileDown}
                    label="Export JSON backup"
                    onClick={handleExport}
                  />
                  <MenuItem
                    icon={FileUp}
                    label="Import JSON"
                    onClick={() => importRef.current?.click()}
                  />
                </div>
              </>
            )}
            <input
              ref={importRef}
              type="file"
              accept="application/json"
              className="sr-only"
              onChange={handleImport}
            />
          </div>
          <Button
            variant="ghost"
            size="lg"
            className="h-8 sm:h-10 px-2 sm:px-3 text-xs sm:text-sm text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={handleReset}
            aria-label="Reset everything"
          >
            <RotateCcw className="size-4" />
            <span className="hidden sm:inline">Reset</span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="hidden md:inline-flex h-8 sm:h-10 border-border bg-secondary/30 text-foreground hover:bg-secondary/60 gap-1.5 px-2 sm:px-3"
            onClick={() => setPaletteOpen(true)}
            title="Command Palette (Ctrl + K)"
          >
            <span className="hidden lg:inline text-xs font-medium">Search / Jump</span>
            <kbd className="hidden lg:inline rounded bg-background/80 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-muted-foreground border border-border">
              ⌘K
            </kbd>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="hidden md:inline-flex h-8 sm:h-10 border-primary/40 bg-primary/10 text-primary hover:bg-primary/20 px-2 sm:px-3"
            onClick={() => setLibraryOpen(true)}
          >
            <BookOpen className="size-4" />
            <span className="hidden lg:inline">Bullet Library</span>
          </Button>
          <Button size="lg" className="h-8 sm:h-10 px-2 sm:px-3 text-xs sm:text-sm" onClick={handlePrint}>
            <Download className="size-4" />
            PDF
          </Button>
        </div>
      </header>

      {/* Mobile view switcher */}
      <div className="no-print flex shrink-0 gap-1 border-b border-border bg-popover/60 p-1.5 md:hidden">
        <ViewToggle
          active={mobileView === 'edit'}
          onClick={() => setMobileView('edit')}
          icon={Pencil}
          label="Edit"
        />
        <ViewToggle
          active={mobileView === 'preview'}
          onClick={() => setMobileView('preview')}
          icon={Eye}
          label="Preview"
        />
      </div>

      {/* Split workspace */}
      <div className="flex min-h-0 w-full max-w-full flex-1 overflow-hidden">
        {/* Editor */}
        <section
          className={cn(
            'w-full max-w-full min-w-0 flex-col border-r border-border bg-popover/40 md:flex md:w-[46%] md:max-w-[560px] lg:w-[42%]',
            mobileView === 'edit' ? 'flex' : 'hidden',
          )}
        >
          <EditorPanel
            data={data}
            template={template}
            onChange={(u) => setData(u)}
            onOpenLibrary={() => setLibraryOpen(true)}
          />
        </section>

        {/* Preview */}
        <section
          id="preview-section"
          className={cn(
            'w-full max-w-full min-w-0 flex-1 bg-background md:block overflow-hidden',
            mobileView === 'preview' ? 'block' : 'hidden md:block',
          )}
        >
          <PreviewPanel
            data={data}
            template={template}
            theme={theme}
            design={design}
            onChange={setData}
            onDesignChange={setDesign}
            onTemplate={setTemplate}
            onOpenAts={() => setAtsOpen(true)}
          />
        </section>
      </div>

      <DesignPanel
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        data={data}
        template={template}
        theme={theme}
        design={design}
        onTemplate={setTemplate}
        onTheme={setTheme}
        onDesign={setDesign}
        onData={setData}
      />
      <BulletLibraryModal
        open={libraryOpen}
        onClose={() => setLibraryOpen(false)}
        onApplyData={setData}
      />
      <AtsPanel
        open={atsOpen}
        onClose={() => setAtsOpen(false)}
        resume={data}
        onUpdateResume={setData}
        onOpenLibrary={() => setLibraryOpen(true)}
      />
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onSelectTemplate={setTemplate}
        onSelectTheme={setTheme}
        onOpenLibrary={() => setLibraryOpen(true)}
        onOpenDesign={() => setDrawerOpen(true)}
        onOpenAts={() => setAtsOpen(true)}
        onPrintPdf={handlePrint}
        onApplyData={setData}
        onReset={() => setData(EMPTY_DATA)}
      />

      {/* Reset Confirmation Modal */}
      {confirmReset && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-popover p-6 shadow-2xl">
            <div className="flex size-11 items-center justify-center rounded-xl bg-destructive/15 text-destructive mb-4">
              <RotateCcw className="size-5" />
            </div>
            <h3 className="text-base font-bold text-foreground">Clear all resume data?</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              This will erase all fields. You can still press <kbd className="rounded bg-secondary px-1 py-0.5 text-xs font-mono font-semibold">Ctrl+Z</kbd> to undo afterwards.
            </p>
            <div className="mt-5 flex items-center justify-end gap-3">
              <Button variant="ghost" size="sm" onClick={() => setConfirmReset(false)}>
                Cancel
              </Button>
              <Button
                size="sm"
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={doReset}
              >
                <RotateCcw className="size-3.5" /> Yes, Clear Resume
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function MenuItem({
  icon: Icon,
  label,
  onClick,
  destructive,
}: {
  icon: typeof Eye
  label: string
  onClick: () => void
  destructive?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-secondary',
        destructive && 'text-destructive hover:bg-destructive/10',
      )}
    >
      <Icon className="size-4" />
      {label}
    </button>
  )
}

function ViewToggle({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: typeof Eye
  label: string
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium transition-colors',
        active
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:text-foreground',
      )}
    >
      <Icon className="size-4" />
      {label}
    </button>
  )
}
