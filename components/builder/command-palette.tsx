'use client'

import { useEffect, useState, useMemo } from 'react'
import {
  Search,
  BookOpen,
  LayoutTemplate,
  Palette,
  Download,
  Copy,
  RotateCcw,
  Gauge,
  Plus,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  X,
  Sparkles,
  Command,
  HelpCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  TEMPLATES,
  THEMES,
  SAMPLE_DATA,
  EMPTY_DATA,
  type TemplateId,
  type ThemeId,
  type ResumeData,
} from '@/lib/resume-types'
import { ROLE_CATEGORIES } from '@/lib/bullet-library'

type Props = {
  open: boolean
  onClose: () => void
  onSelectTemplate: (id: TemplateId) => void
  onSelectTheme: (id: ThemeId) => void
  onOpenLibrary: () => void
  onOpenDesign: () => void
  onOpenAts: () => void
  onPrintPdf: () => void
  onApplyData: (updater: (prev: ResumeData) => ResumeData) => void
  onReset: () => void
}

export function CommandPalette({
  open,
  onClose,
  onSelectTemplate,
  onSelectTheme,
  onOpenLibrary,
  onOpenDesign,
  onOpenAts,
  onPrintPdf,
  onApplyData,
  onReset,
}: Props) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (open) onClose()
        else {
          setQuery('')
          setSelectedIndex(0)
        }
      }
      if (e.key === 'Escape' && open) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  const items = useMemo(() => {
    const list: {
      category: string
      id: string
      title: string
      subtitle?: string
      icon: any
      action: () => void
    }[] = [
      // Navigation & Actions
      {
        category: 'Quick Actions',
        id: 'export-pdf',
        title: 'Download / Print PDF',
        subtitle: 'Export high-res vector PDF',
        icon: Download,
        action: () => {
          onClose()
          onPrintPdf()
        },
      },
      {
        category: 'Quick Actions',
        id: 'bullet-lib',
        title: 'Open Pro Bullet Library',
        subtitle: '50+ role-tested bullet points & action verbs',
        icon: BookOpen,
        action: () => {
          onClose()
          onOpenLibrary()
        },
      },
      {
        category: 'Quick Actions',
        id: 'ats-audit',
        title: 'Open ATS Score & Job Matcher',
        subtitle: 'Audit structure and paste target JD',
        icon: Gauge,
        action: () => {
          onClose()
          onOpenAts()
        },
      },
      {
        category: 'Quick Actions',
        id: 'job-tracker',
        title: 'Open Job Application Tracker CRM',
        subtitle: 'Track interviews, salary offers, and pipelines',
        icon: Briefcase,
        action: () => {
          onClose()
          window.open('/tracker', '_blank')
        },
      },
      {
        category: 'Quick Actions',
        id: 'cover-letter',
        title: 'Open Smart Cover Letter Generator',
        subtitle: 'Generate tailored cover letter from resume',
        icon: FileText,
        action: () => {
          onClose()
          window.open('/cover-letter', '_blank')
        },
      },
      {
        category: 'Quick Actions',
        id: 'interview-prep',
        title: 'Open STAR Interview Prep Simulator',
        subtitle: 'Practice tailored behavioral and technical questions',
        icon: HelpCircle,
        action: () => {
          onClose()
          window.open('/interview', '_blank')
        },
      },
      {
        category: 'Quick Actions',
        id: 'fill-sample',
        title: 'Fill Sample Portfolio Data',
        subtitle: 'Populate rich demonstration data',
        icon: Sparkles,
        action: () => {
          onApplyData(() => SAMPLE_DATA)
          onClose()
        },
      },
      {
        category: 'Quick Actions',
        id: 'reset-resume',
        title: 'Clear All Resume Fields',
        subtitle: 'Reset to a clean empty resume',
        icon: RotateCcw,
        action: () => {
          if (confirm('Clear all resume fields?')) {
            onReset()
          }
          onClose()
        },
      },
    ]

    // Role Presets
    for (const cat of ROLE_CATEGORIES) {
      for (const role of cat.roles) {
        list.push({
          category: 'Role Presets & Bullets',
          id: `preset-${role.title.toLowerCase().replace(/\s+/g, '-')}`,
          title: `Load ${role.title} Preset`,
          subtitle: `${role.skills.slice(0, 4).join(', ')} • ${role.bullets.length} bullets`,
          icon: Briefcase,
          action: () => {
            onApplyData((prev) => ({
              ...prev,
              role: role.title,
              summary: role.summary,
              skills: Array.from(new Set([...prev.skills, ...role.skills])),
              experience: [
                {
                  id: `exp-${Date.now()}`,
                  role: role.title,
                  company: 'Leading Enterprise Inc.',
                  start: '2022',
                  end: 'Present',
                  bullets: role.bullets,
                },
                ...prev.experience,
              ],
            }))
            onClose()
          },
        })
      }
    }

    // Templates
    for (const t of TEMPLATES) {
      list.push({
        category: 'Resume Templates',
        id: `tpl-${t.id}`,
        title: `Template: ${t.name}`,
        subtitle: `${t.category} • ${t.description}`,
        icon: LayoutTemplate,
        action: () => {
          onSelectTemplate(t.id)
          onClose()
        },
      })
    }

    // Themes
    for (const th of THEMES) {
      list.push({
        category: 'Accent Colors & Themes',
        id: `thm-${th.id}`,
        title: `Color: ${th.name}`,
        subtitle: `Accent palette: ${th.id}`,
        icon: Palette,
        action: () => {
          onSelectTheme(th.id)
          onClose()
        },
      })
    }

    if (!query.trim()) return list

    const q = query.toLowerCase()
    return list.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle?.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q),
    )
  }, [
    query,
    onClose,
    onPrintPdf,
    onOpenLibrary,
    onOpenAts,
    onOpenDesign,
    onApplyData,
    onReset,
    onSelectTemplate,
    onSelectTheme,
  ])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12vh]">
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl ring-1 ring-border/50">
        {/* Search header */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
          <Search className="size-5 text-muted-foreground" />
          <input
            type="text"
            autoFocus
            className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground outline-none"
            placeholder="Type a command, role preset, template, or action..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                setSelectedIndex((prev) => (prev + 1) % Math.max(1, items.length))
              } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setSelectedIndex((prev) => (prev - 1 + items.length) % Math.max(1, items.length))
              } else if (e.key === 'Enter' && items[selectedIndex]) {
                e.preventDefault()
                items[selectedIndex].action()
              }
            }}
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* Results list */}
        <div className="scroll-thin max-h-[380px] overflow-y-auto p-2">
          {items.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No matching commands or templates found.
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {items.map((item, idx) => {
                const Icon = item.icon
                const isSelected = idx === selectedIndex
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={item.action}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={cn(
                      'flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors',
                      isSelected ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-secondary/60',
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={cn(
                          'flex size-8 shrink-0 items-center justify-center rounded-lg',
                          isSelected ? 'bg-white/20 text-white' : 'bg-secondary text-muted-foreground',
                        )}
                      >
                        <Icon className="size-4" />
                      </span>
                      <div className="truncate">
                        <p className="font-medium truncate">{item.title}</p>
                        {item.subtitle && (
                          <p
                            className={cn(
                              'text-xs truncate',
                              isSelected ? 'text-white/80' : 'text-muted-foreground',
                            )}
                          >
                            {item.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                    <span
                      className={cn(
                        'shrink-0 text-[10px] uppercase tracking-wider font-semibold rounded px-1.5 py-0.5',
                        isSelected ? 'bg-white/20 text-white' : 'bg-secondary text-muted-foreground',
                      )}
                    >
                      {item.category}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border bg-secondary/30 px-4 py-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span className="font-mono text-[11px]">Ctrl + K</span>
        </div>
      </div>
    </div>
  )
}
