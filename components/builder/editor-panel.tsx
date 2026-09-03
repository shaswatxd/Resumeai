'use client'

import { useState } from 'react'
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Layers,
  Plus,
  Trash2,
  Upload,
  Sparkles,
  X,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Wand2,
  BookOpen,
  Download,
} from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input, Label, Textarea } from '@/components/ui/field'
import { cn } from '@/lib/utils'
import { uid, type ResumeData, type TemplateId, TEMPLATES, templateSupportsPhoto } from '@/lib/resume-types'
import { ROLE_CATEGORIES } from '@/lib/bullet-library'
import { PhotoEditor } from '@/components/builder/photo-editor'

type TabId =
  | 'personal'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'more'

const TABS: { id: TabId; label: string; icon: typeof User }[] = [
  { id: 'personal', label: 'Personal', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'more', label: 'More', icon: Layers },
]

type Props = {
  data: ResumeData
  template?: TemplateId
  onChange: (updater: (prev: ResumeData) => ResumeData) => void
  onOpenLibrary?: () => void
  onDownload?: () => void
}

export function EditorPanel({ data, template, onChange, onOpenLibrary, onDownload }: Props) {
  const [tab, setTab] = useState<TabId>('personal')

  const set = <K extends keyof ResumeData>(key: K, value: ResumeData[K]) =>
    onChange((prev) => ({ ...prev, [key]: value }))

  const tabIndex = TABS.findIndex((t) => t.id === tab)

  return (
    <div className="flex h-full flex-col">
      {/* Top Library Action Banner */}
      <div className="border-b border-border bg-primary/10 px-3 sm:px-4 py-2 flex items-center justify-between gap-2 w-full max-w-full overflow-hidden">
        <div className="flex min-w-0 flex-1 items-center gap-2 text-xs font-medium text-primary">
          <BookOpen className="size-3.5 shrink-0" />
          <span className="truncate">Pro Bullet & Phrase Library</span>
        </div>
        {onOpenLibrary && (
          <Button
            size="sm"
            variant="outline"
            className="h-7 shrink-0 text-xs gap-1 border-primary/40 bg-background text-primary hover:bg-primary/20 px-2 sm:px-3"
            onClick={onOpenLibrary}
          >
            <BookOpen className="size-3" /> <span className="hidden xs:inline">Browse</span> Library
          </Button>
        )}
      </div>

      {/* Tabs with permanent clear labels */}
      <div className="scroll-thin flex w-full max-w-full gap-1 overflow-x-auto border-b border-border px-2 sm:px-3 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TABS.map((t) => {
          const active = t.id === tab
          const Icon = t.icon
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                'relative flex shrink-0 items-center gap-1.5 px-2.5 sm:px-3 py-2.5 text-xs sm:text-sm font-medium transition-colors',
                active
                  ? 'text-foreground font-semibold'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <Icon className="size-4" />
              <span>{t.label}</span>
              {active && (
                <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary" />
              )}
            </button>
          )
        })}
      </div>

      {/* Scrollable body */}
      <div className="scroll-thin flex-1 overflow-y-auto overflow-x-hidden px-4 sm:px-5 py-6 w-full max-w-full min-w-0">
        {tab === 'personal' && (
          <PersonalTab
            data={data}
            template={template}
            set={set}
            onOpenLibrary={onOpenLibrary}
          />
        )}
        {tab === 'experience' && <ExperienceTab data={data} onChange={onChange} onOpenLibrary={onOpenLibrary} />}
        {tab === 'education' && <EducationTab data={data} onChange={onChange} />}
        {tab === 'skills' && <SkillsTab data={data} set={set} />}
        {tab === 'projects' && <ProjectsTab data={data} onChange={onChange} />}
        {tab === 'more' && <MoreTab data={data} onChange={onChange} set={set} />}
      </div>

      {/* Footer nav with intuitive Next/Finish button */}
      <div className="flex items-center justify-between gap-3 border-t border-border p-4">
        <Button
          variant="ghost"
          size="lg"
          className="h-11 px-4"
          disabled={tabIndex === 0}
          onClick={() => setTab(TABS[Math.max(0, tabIndex - 1)].id)}
        >
          <ArrowLeft className="size-4" /> Back
        </Button>
        {tabIndex === TABS.length - 1 ? (
          <Button
            size="lg"
            className="h-11 flex-1 px-4 font-bold gap-2 bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 transition-all hover:scale-[1.01]"
            onClick={onDownload}
          >
            <Download className="size-4" /> Finish & Download PDF
          </Button>
        ) : (
          <Button
            size="lg"
            className="h-11 flex-1 px-4 font-semibold gap-2"
            onClick={() =>
              setTab(TABS[Math.min(TABS.length - 1, tabIndex + 1)].id)
            }
          >
            Next: {TABS[Math.min(TABS.length - 1, tabIndex + 1)].label}
            <ArrowRight className="size-4" />
          </Button>
        )}
      </div>
    </div>
  )
}

/* ------------------------------- Personal --------------------------------- */
function PersonalTab({
  data,
  template,
  set,
  onOpenLibrary,
}: {
  data: ResumeData
  template?: TemplateId
  set: <K extends keyof ResumeData>(k: K, v: ResumeData[K]) => void
  onOpenLibrary?: () => void
}) {
  const [photoModalOpen, setPhotoModalOpen] = useState(false)
  const supportsPhoto = template ? templateSupportsPhoto(template) : true
  const currentTemplate = template ? TEMPLATES.find((t) => t.id === template) : null

  return (
    <div className="flex flex-col gap-4">
      {/* Photo row — only shown if template supports photos */}
      {supportsPhoto ? (
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 rounded-xl border border-border bg-secondary/20 p-3 sm:p-4 w-full max-w-full overflow-hidden">
          <button
            type="button"
            onClick={() => setPhotoModalOpen(true)}
            className="group relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-border bg-secondary transition-all hover:scale-105 hover:border-primary"
            title="Click to edit or change photo"
          >
            {data.photo ? (
              <img
                src={data.photo}
                alt={data.fullName || 'Photo'}
                className="size-full object-cover"
              />
            ) : (
              <User className="size-7 text-muted-foreground" />
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <Upload className="size-4 text-white" />
            </div>
          </button>
          <div className="flex-1">
            <p className="text-sm font-medium">Profile photo</p>
            <p className="text-xs text-muted-foreground">
              Optional — JPG, PNG, WebP or sample headshot
            </p>
          </div>
          <div className="flex items-center gap-2">
            {data.photo && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => set('photo', '')}
                aria-label="Remove photo"
              >
                <Trash2 className="size-4 text-destructive" />
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPhotoModalOpen(true)}
            >
              <Upload className="size-3.5" />
              <span>{data.photo ? 'Crop / Change' : 'Upload Photo'}</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-start sm:items-center justify-between gap-2 sm:gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3 sm:p-4 w-full max-w-full overflow-hidden">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
              <User className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground">
                Photo-Free ATS Layout
              </p>
              <p className="text-xs text-muted-foreground break-words">
                {currentTemplate?.name || 'Selected layout'} is intentionally text-only for maximum ATS compliance.
              </p>
            </div>
          </div>
          <span className="shrink-0 self-start sm:self-auto rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 whitespace-nowrap">
            ATS Optimal
          </span>
        </div>
      )}

      {supportsPhoto && (
        <PhotoEditor
          open={photoModalOpen}
          onClose={() => setPhotoModalOpen(false)}
          photo={data.photo}
          onSave={(newPhoto) => set('photo', newPhoto)}
          onRemove={() => set('photo', '')}
        />
      )}

      {/* Inputs */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            placeholder="Sarah Jenkins"
            value={data.fullName}
            onChange={(e) => set('fullName', e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="role">Target job title</Label>
          <Input
            id="role"
            placeholder="Senior Product Designer"
            value={data.role}
            onChange={(e) => set('role', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="sarah@example.com"
            value={data.email}
            onChange={(e) => set('email', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            placeholder="+1 (555) 012-3456"
            value={data.phone}
            onChange={(e) => set('phone', e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="San Francisco, CA (or Remote)"
            value={data.location}
            onChange={(e) => set('location', e.target.value)}
          />
        </div>
      </div>

      {/* Links */}
      <div className="rounded-xl border border-border bg-secondary/10 p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Online presence
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div>
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              placeholder="linkedin.com/in/..."
              value={data.linkedin}
              onChange={(e) => set('linkedin', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="github">GitHub</Label>
            <Input
              id="github"
              placeholder="github.com/..."
              value={data.github}
              onChange={(e) => set('github', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="website">Website / Portfolio</Label>
            <Input
              id="website"
              placeholder="sarah.design"
              value={data.website}
              onChange={(e) => set('website', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <Label className="mb-0">Professional summary</Label>
          {onOpenLibrary && (
            <button
              type="button"
              onClick={onOpenLibrary}
              className="inline-flex items-center gap-1 rounded-md border border-primary/40 bg-primary/10 px-2 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
            >
              <BookOpen className="size-3" /> Browse Library
            </button>
          )}
        </div>
        <Textarea
          className="min-h-[120px]"
          placeholder="Write a compelling 3-4 sentence professional summary..."
          value={data.summary}
          onChange={(e) => set('summary', e.target.value)}
        />
        <p className="mt-1.5 text-xs text-muted-foreground">
          Tip: fill in your role and skills first to highlight your core strengths.
        </p>
      </div>
    </div>
  )
}

/* ------------------------------ Experience -------------------------------- */
function ExperienceTab({
  data,
  onChange,
  onOpenLibrary,
}: {
  data: ResumeData
  onChange: (u: (p: ResumeData) => ResumeData) => void
  onOpenLibrary?: () => void
}) {
  const add = () =>
    onChange((p) => ({
      ...p,
      experience: [
        ...p.experience,
        {
          id: uid('exp'),
          role: '',
          company: '',
          start: '',
          end: '',
          bullets: [''],
        },
      ],
    }))

  const update = (id: string, patch: Partial<ResumeData['experience'][number]>) =>
    onChange((p) => ({
      ...p,
      experience: p.experience.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }))

  const remove = (id: string) =>
    onChange((p) => ({ ...p, experience: p.experience.filter((e) => e.id !== id) }))

  return (
    <div className="flex flex-col gap-4">
      {data.experience.length === 0 && (
        <EmptyState
          icon={Briefcase}
          text="Add your relevant work history, internships, or freelance roles."
        />
      )}

      {data.experience.map((exp, idx) => (
        <div
          key={exp.id}
          className="rounded-xl border border-border bg-secondary/10 p-4"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">
              Role #{idx + 1}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => remove(exp.id)}
              aria-label="Remove role"
            >
              <Trash2 className="size-4 text-destructive" />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <Label>Job title</Label>
              <Input
                value={exp.role}
                placeholder="Product Designer"
                onChange={(e) => update(exp.id, { role: e.target.value })}
              />
            </div>
            <div>
              <Label>Company</Label>
              <Input
                value={exp.company}
                placeholder="Acme Corp"
                onChange={(e) => update(exp.id, { company: e.target.value })}
              />
            </div>
            <div>
              <Label>Start</Label>
              <Input
                value={exp.start}
                placeholder="2021"
                onChange={(e) => update(exp.id, { start: e.target.value })}
              />
            </div>
            <div>
              <Label>End</Label>
              <Input
                value={exp.end}
                placeholder="Present"
                onChange={(e) => update(exp.id, { end: e.target.value })}
              />
            </div>
          </div>
          <div className="mt-3">
            <div className="mb-1.5 flex items-center justify-between">
              <Label className="mb-0">Achievement Bullets</Label>
              {onOpenLibrary && (
                <button
                  type="button"
                  onClick={onOpenLibrary}
                  className="inline-flex items-center gap-1 rounded-md border border-primary/40 bg-primary/10 px-2 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                >
                  <BookOpen className="size-3" /> Browse Phrases
                </button>
              )}
            </div>
            <BulletEditor
              bullets={exp.bullets}
              onChange={(bullets) => update(exp.id, { bullets })}
            />
          </div>
        </div>
      ))}

      <div className="flex gap-2">
        <Button variant="outline" className="h-11 flex-1" onClick={add}>
          <Plus className="size-4" /> Add role
        </Button>
        {onOpenLibrary && (
          <Button
            variant="outline"
            className="h-11 border-primary/40 text-primary hover:bg-primary/10"
            onClick={onOpenLibrary}
          >
            <BookOpen className="size-4" /> Bullet Library
          </Button>
        )}
      </div>
    </div>
  )
}

function BulletEditor({
  bullets,
  onChange,
}: {
  bullets: string[]
  onChange: (b: string[]) => void
}) {
  return (
    <div className="flex flex-col gap-2.5">
      {bullets.map((b, i) => {
        const text = b.trim()
        const hasMetric = /\d+(\.\d+)?%|\$\d+|\d+k|\d+\+|\b\d{2,}\b|\b[2-9]x\b/i.test(text)
        const hasActionVerb = /^(Architected|Engineered|Spearheaded|Designed|Built|Developed|Deployed|Optimized|Increased|Reduced|Cut|Launched|Scaled|Streamlined|Automated|Pioneered|Led|Orchestrated|Transformed|Revamped|Implemented|Generated|Delivered|Negotiated|Accelerated)\b/i.test(text)
        const isWeak = /^(Responsible for|Worked on|Helped with|Assisted in|Tasked with|Handled|Was involved in)\b/i.test(text)

        return (
          <div key={i} className="rounded-lg border border-border/60 bg-secondary/20 p-2.5 space-y-1.5">
            <div className="flex items-start gap-2">
              <Textarea
                className="min-h-[48px] text-xs bg-background/50 leading-relaxed"
                value={b}
                placeholder="Describe an achievement with measurable impact..."
                onChange={(e) =>
                  onChange(bullets.map((x, xi) => (xi === i ? e.target.value : x)))
                }
              />
              <Button
                variant="ghost"
                size="icon"
                className="size-7 shrink-0 text-muted-foreground hover:text-destructive"
                aria-label="Remove highlight"
                onClick={() => onChange(bullets.filter((_, xi) => xi !== i))}
              >
                <X className="size-3.5" />
              </Button>
            </div>

            {/* Live Impact Feedback Pills */}
            {text.length > 8 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5 text-[10px]">
                {hasActionVerb && (
                  <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 font-medium text-emerald-400">
                    ✓ Strong Action Verb
                  </span>
                )}
                {hasMetric ? (
                  <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 font-medium text-emerald-400">
                    ✓ Quantified Metric
                  </span>
                ) : (
                  <span className="rounded bg-secondary/60 px-1.5 py-0.5 font-medium text-muted-foreground">
                    💡 Tip: Add numbers (e.g. 20%, $50k, 5x)
                  </span>
                )}
                {isWeak && (
                  <span className="rounded bg-amber-500/15 px-1.5 py-0.5 font-medium text-amber-300">
                    ⚠️ Passive starter (Replace with "Spearheaded" or "Engineered")
                  </span>
                )}
              </div>
            )}
          </div>
        )
      })}
      <Button
        variant="outline"
        size="sm"
        className="self-start h-8 text-xs border-dashed"
        onClick={() => onChange([...bullets, ''])}
      >
        <Plus className="size-3.5" /> Add bullet point
      </Button>
    </div>
  )
}

/* ------------------------------- Education -------------------------------- */
function EducationTab({
  data,
  onChange,
}: {
  data: ResumeData
  onChange: (u: (p: ResumeData) => ResumeData) => void
}) {
  const add = () =>
    onChange((p) => ({
      ...p,
      education: [
        ...p.education,
        { id: uid('edu'), degree: '', school: '', start: '', end: '', detail: '' },
      ],
    }))

  const update = (id: string, patch: Partial<ResumeData['education'][number]>) =>
    onChange((p) => ({
      ...p,
      education: p.education.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }))

  const remove = (id: string) =>
    onChange((p) => ({ ...p, education: p.education.filter((e) => e.id !== id) }))

  return (
    <div className="flex flex-col gap-4">
      {data.education.length === 0 && (
        <EmptyState
          icon={GraduationCap}
          text="Add your degrees, certifications, or courses."
        />
      )}
      {data.education.map((ed, idx) => (
        <div key={ed.id} className="rounded-xl border border-border bg-secondary/25 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Entry {idx + 1}
            </span>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => remove(ed.id)}
              aria-label="Remove education"
            >
              <Trash2 className="size-4 text-destructive" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label>Degree / Program</Label>
              <Input
                value={ed.degree}
                placeholder="B.Tech, Computer Science"
                onChange={(e) => update(ed.id, { degree: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <Label>School</Label>
              <Input
                value={ed.school}
                placeholder="University name"
                onChange={(e) => update(ed.id, { school: e.target.value })}
              />
            </div>
            <div>
              <Label>Start</Label>
              <Input
                value={ed.start}
                placeholder="2015"
                onChange={(e) => update(ed.id, { start: e.target.value })}
              />
            </div>
            <div>
              <Label>End</Label>
              <Input
                value={ed.end}
                placeholder="2019"
                onChange={(e) => update(ed.id, { end: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Detail (optional)</Label>
              <Input
                value={ed.detail}
                placeholder="GPA, honors, activities..."
                onChange={(e) => update(ed.id, { detail: e.target.value })}
              />
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" className="h-11" onClick={add}>
        <Plus className="size-4" /> Add education
      </Button>
    </div>
  )
}

/* --------------------------------- Skills --------------------------------- */
function SkillsTab({
  data,
  set,
}: {
  data: ResumeData
  set: <K extends keyof ResumeData>(k: K, v: ResumeData[K]) => void
}) {
  const [draft, setDraft] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])

  const addSkill = (value: string) => {
    const v = value.trim()
    if (!v) return
    if (!data.skills.includes(v)) set('skills', [...data.skills, v])
  }

  const suggestSkills = () => {
    const roleLow = (data.role || '').toLowerCase()
    let pool: string[] = []

    for (const cat of ROLE_CATEGORIES) {
      for (const r of cat.roles) {
        if (roleLow && (r.title.toLowerCase().includes(roleLow) || roleLow.includes(r.title.toLowerCase()))) {
          pool.push(...r.skills)
        }
      }
    }

    if (pool.length === 0) {
      pool = ['React', 'TypeScript', 'Node.js', 'Python', 'SQL', 'Git', 'Agile / Scrum', 'Leadership', 'UI/UX Design', 'Cloud Architecture']
    }

    const available = Array.from(new Set(pool)).filter((s) => !data.skills.includes(s))
    setSuggestions(available.slice(0, 10))
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Label>Add a skill</Label>
        <div className="flex gap-2">
          <Input
            value={draft}
            placeholder="e.g. TypeScript"
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                e.preventDefault()
                addSkill(draft)
                setDraft('')
              }
            }}
          />
          <Button
            className="h-11 px-4"
            onClick={() => {
              addSkill(draft)
              setDraft('')
            }}
          >
            <Plus className="size-4" /> Add
          </Button>
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">
          Press Enter to add quickly.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Your skills
        </span>
        <button
          type="button"
          onClick={suggestSkills}
          className="inline-flex items-center gap-1 rounded-md border border-primary/40 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
        >
          <Sparkles className="size-3.5" />
          Recommended Skills
        </button>
      </div>

      {data.skills.length === 0 ? (
        <EmptyState icon={Wrench} text="Add the skills that best describe you." />
      ) : (
        <div className="flex flex-wrap gap-2">
          {data.skills.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 py-1.5 pl-3 pr-2 text-sm"
            >
              {s}
              <button
                onClick={() =>
                  set(
                    'skills',
                    data.skills.filter((x) => x !== s),
                  )
                }
                className="rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-destructive/20 hover:text-destructive"
                aria-label={`Remove ${s}`}
              >
                <X className="size-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      {suggestions.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Top skill recommendations — tap to add
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s: string) => (
              <button
                key={s}
                onClick={() => {
                  addSkill(s)
                  setSuggestions((prev: string[]) => prev.filter((x: string) => x !== s))
                }}
                className="inline-flex items-center gap-1 rounded-lg border border-primary/40 bg-primary/10 px-3 py-1.5 text-sm text-primary transition-colors hover:bg-primary/20"
              >
                <Plus className="size-3.5" />
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* -------------------------------- Projects --------------------------------- */
function ProjectsTab({
  data,
  onChange,
}: {
  data: ResumeData
  onChange: (u: (p: ResumeData) => ResumeData) => void
}) {
  const add = () =>
    onChange((p) => ({
      ...p,
      projects: [
        ...p.projects,
        { id: uid('prj'), name: '', link: '', tech: '', description: '' },
      ],
    }))

  const update = (id: string, patch: Partial<ResumeData['projects'][number]>) =>
    onChange((p) => ({
      ...p,
      projects: p.projects.map((x) => (x.id === id ? { ...x, ...patch } : x)),
    }))

  const remove = (id: string) =>
    onChange((p) => ({ ...p, projects: p.projects.filter((x) => x.id !== id) }))

  return (
    <div className="flex flex-col gap-4">
      {data.projects.length === 0 && (
        <EmptyState
          icon={FolderGit2}
          text="Showcase side projects, open source, or portfolio work."
        />
      )}
      {data.projects.map((prj, idx) => (
        <div key={prj.id} className="rounded-xl border border-border bg-secondary/25 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Project {idx + 1}
            </span>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => remove(prj.id)}
              aria-label="Remove project"
            >
              <Trash2 className="size-4 text-destructive" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <Label>Name</Label>
              <Input
                value={prj.name}
                placeholder="OpenLedger"
                onChange={(e) => update(prj.id, { name: e.target.value })}
              />
            </div>
            <div>
              <Label>Link (optional)</Label>
              <Input
                value={prj.link}
                placeholder="github.com/you/project"
                onChange={(e) => update(prj.id, { link: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Tech stack (optional)</Label>
              <Input
                value={prj.tech}
                placeholder="Next.js, PostgreSQL, Redis"
                onChange={(e) => update(prj.id, { tech: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Description</Label>
              <Textarea
                className="min-h-[64px]"
                value={prj.description}
                placeholder="One or two lines: what it does + impact (users, stars, revenue)..."
                onChange={(e) => update(prj.id, { description: e.target.value })}
              />
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" className="h-11" onClick={add}>
        <Plus className="size-4" /> Add project
      </Button>
    </div>
  )
}

/* ---------------------------------- More ----------------------------------- */
function MoreTab({
  data,
  onChange,
  set,
}: {
  data: ResumeData
  onChange: (u: (p: ResumeData) => ResumeData) => void
  set: <K extends keyof ResumeData>(k: K, v: ResumeData[K]) => void
}) {
  const addCert = () =>
    onChange((p) => ({
      ...p,
      certifications: [
        ...p.certifications,
        { id: uid('cert'), name: '', issuer: '', year: '' },
      ],
    }))
  const updateCert = (
    id: string,
    patch: Partial<ResumeData['certifications'][number]>,
  ) =>
    onChange((p) => ({
      ...p,
      certifications: p.certifications.map((x) =>
        x.id === id ? { ...x, ...patch } : x,
      ),
    }))
  const removeCert = (id: string) =>
    onChange((p) => ({
      ...p,
      certifications: p.certifications.filter((x) => x.id !== id),
    }))

  const addLang = () =>
    onChange((p) => ({
      ...p,
      languages: [...p.languages, { id: uid('lang'), name: '', level: '' }],
    }))
  const updateLang = (
    id: string,
    patch: Partial<ResumeData['languages'][number]>,
  ) =>
    onChange((p) => ({
      ...p,
      languages: p.languages.map((x) => (x.id === id ? { ...x, ...patch } : x)),
    }))
  const removeLang = (id: string) =>
    onChange((p) => ({
      ...p,
      languages: p.languages.filter((x) => x.id !== id),
    }))

  return (
    <div className="flex flex-col gap-8">
      {/* Certifications */}
      <section>
        <h3 className="mb-3 text-sm font-semibold">Certifications</h3>
        <div className="flex flex-col gap-3">
          {data.certifications.map((c) => (
            <div
              key={c.id}
              className="rounded-xl border border-border bg-secondary/25 p-3"
            >
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_80px_auto]">
                <Input
                  value={c.name}
                  placeholder="AWS Solutions Architect"
                  onChange={(e) => updateCert(c.id, { name: e.target.value })}
                />
                <Input
                  value={c.issuer}
                  placeholder="Issuer"
                  onChange={(e) => updateCert(c.id, { issuer: e.target.value })}
                />
                <Input
                  value={c.year}
                  placeholder="2024"
                  onChange={(e) => updateCert(c.id, { year: e.target.value })}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="justify-self-end"
                  onClick={() => removeCert(c.id)}
                  aria-label="Remove certification"
                >
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
          <Button variant="outline" className="h-10" onClick={addCert}>
            <Plus className="size-4" /> Add certification
          </Button>
        </div>
      </section>

      {/* Languages */}
      <section>
        <h3 className="mb-3 text-sm font-semibold">Languages</h3>
        <div className="flex flex-col gap-3">
          {data.languages.map((l) => (
            <div
              key={l.id}
              className="rounded-xl border border-border bg-secondary/25 p-3"
            >
              <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
                <Input
                  value={l.name}
                  placeholder="English"
                  onChange={(e) => updateLang(l.id, { name: e.target.value })}
                />
                <Input
                  value={l.level}
                  placeholder="Fluent / Native / B2"
                  onChange={(e) => updateLang(l.id, { level: e.target.value })}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeLang(l.id)}
                  aria-label="Remove language"
                >
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
          <Button variant="outline" className="h-10" onClick={addLang}>
            <Plus className="size-4" /> Add language
          </Button>
        </div>
      </section>

      {/* Achievements */}
      <section>
        <h3 className="mb-1 text-sm font-semibold">Achievements & awards</h3>
        <p className="mb-3 text-xs text-muted-foreground">
          Hackathon wins, talks, publications, rankings — one per line.
        </p>
        <StringListEditor
          items={data.achievements}
          placeholder="Winner, Smart India Hackathon 2024"
          onChange={(items) => set('achievements', items)}
        />
      </section>

      {/* Interests */}
      <section>
        <h3 className="mb-1 text-sm font-semibold">Interests</h3>
        <p className="mb-3 text-xs text-muted-foreground">
          Optional — shows personality. Keep it short.
        </p>
        <StringListEditor
          items={data.interests}
          placeholder="Open source"
          onChange={(items) => set('interests', items)}
        />
      </section>
    </div>
  )
}

function StringListEditor({
  items,
  placeholder,
  onChange,
}: {
  items: string[]
  placeholder: string
  onChange: (items: string[]) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <Input
            value={item}
            placeholder={placeholder}
            onChange={(e) =>
              onChange(items.map((x, xi) => (xi === i ? e.target.value : x)))
            }
          />
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            aria-label="Remove item"
            onClick={() => onChange(items.filter((_, xi) => xi !== i))}
          >
            <X className="size-4" />
          </Button>
        </div>
      ))}
      <Button
        variant="ghost"
        size="sm"
        className="self-start"
        onClick={() => onChange([...items, ''])}
      >
        <Plus className="size-3.5" /> Add item
      </Button>
    </div>
  )
}

/* -------------------------------- shared ---------------------------------- */
function EmptyState({ icon: Icon, text }: { icon: typeof User; text: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border bg-secondary/20 px-6 py-10 text-center">
      <Icon className="size-6 text-muted-foreground" />
      <p className="max-w-xs text-sm text-muted-foreground">{text}</p>
    </div>
  )
}

