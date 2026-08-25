'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import {
  Sparkles,
  ArrowLeft,
  FileText,
  HelpCircle,
  CheckCircle2,
  BookOpen,
  Send,
  MessageSquare,
  Award,
  Briefcase,
  Copy,
  Check,
  Download,
  ChevronRight,
  ShieldCheck,
  Clock,
  Target,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/field'
import { cn } from '@/lib/utils'
import { EMPTY_DATA, SAMPLE_DATA, type ResumeData } from '@/lib/resume-types'

const STORAGE_KEY = 'resumeai:v2'

type QuestionCategory = 'all' | 'resume-specific' | 'behavioral' | 'technical' | 'leadership'

type InterviewQuestion = {
  id: string
  category: 'resume-specific' | 'behavioral' | 'technical' | 'leadership'
  question: string
  context: string
  starGuide: {
    situation: string
    task: string
    action: string
    result: string
  }
}

export default function InterviewPrepPage() {
  const [resumeData, setResumeData] = useState<ResumeData>(EMPTY_DATA)
  const [hydrated, setHydrated] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory>('all')
  const [userNotes, setUserNotes] = useState<Record<string, string>>({})
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed.data && parsed.data.fullName) {
          setResumeData(parsed.data)
        } else {
          setResumeData(SAMPLE_DATA)
        }
      } else {
        setResumeData(SAMPLE_DATA)
      }
    } catch {
      setResumeData(SAMPLE_DATA)
    }

    try {
      const savedNotes = localStorage.getItem('resumepro:interview_notes:v1')
      if (savedNotes) {
        setUserNotes(JSON.parse(savedNotes))
      }
    } catch {
      /* ignore */
    }

    setHydrated(true)
  }, [])

  const saveNote = (id: string, text: string) => {
    const next = { ...userNotes, [id]: text }
    setUserNotes(next)
    try {
      localStorage.setItem('resumepro:interview_notes:v1', JSON.stringify(next))
    } catch {
      /* ignore */
    }
  }

  const handleCopy = async (id: string, text: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // Dynamic tailored questions generated from candidate's actual resume
  const questions: InterviewQuestion[] = useMemo(() => {
    const list: InterviewQuestion[] = []
    const roleName = resumeData.role || 'Software Professional'
    const exp1 = resumeData.experience[0]
    const proj1 = resumeData.projects[0]

    // Resume tailored
    if (exp1) {
      list.push({
        id: 'q-role-1',
        category: 'resume-specific',
        question: `Tell me about your role as ${exp1.role} at ${exp1.company}. What was your biggest achievement?`,
        context: `Tailored from your experience at ${exp1.company}. Focus on your top metric-driven bullet points.`,
        starGuide: {
          situation: `Describe the project landscape at ${exp1.company} and the problem you set out to solve.`,
          task: `Explain your specific responsibility and constraints (tight deadline, scale, legacy code).`,
          action: `Highlight technical steps you pioneered (e.g. ${exp1.bullets[0] || 'architecture & implementation'}).`,
          result: `Conclude with measurable business impact (performance gains, revenue, or team velocity).`,
        },
      })
    }

    if (proj1) {
      list.push({
        id: 'q-proj-1',
        category: 'resume-specific',
        question: `Walk me through how you architected and built "${proj1.name}".`,
        context: `Focus on the tech stack (${proj1.tech || 'technologies used'}) and architectural trade-offs.`,
        starGuide: {
          situation: `Explain why you chose to build ${proj1.name} and what target user problem it addresses.`,
          task: `Outline the core requirements and challenges with data flow or scalability.`,
          action: `Discuss the specific frameworks, database choices, or caching layers you implemented.`,
          result: `Share real user metrics, GitHub stars, or lessons learned during production deployment.`,
        },
      })
    }

    // Behavioral
    list.push(
      {
        id: 'q-beh-1',
        category: 'behavioral',
        question: 'Describe a situation where a project faced unexpected obstacles or delays. How did you handle it?',
        context: 'Tests adaptability, clear communication, and risk mitigation under pressure.',
        starGuide: {
          situation: 'Set up an ambitious timeline or third-party dependency that broke.',
          task: 'Define what was at risk if the deadline slipped.',
          action: 'Explain how you reprioritized scope, aligned stakeholders, and unblocked the team.',
          result: 'State how the launch succeeded and what preventive mechanisms you put in place.',
        },
      },
      {
        id: 'q-beh-2',
        category: 'behavioral',
        question: 'Tell me about a time you had a technical disagreement with a teammate or lead. How was it resolved?',
        context: 'Recruiters assess team collaboration, ego control, and data-driven debate.',
        starGuide: {
          situation: 'A decision between two competing technical approaches or API designs.',
          task: 'The need to reach consensus without stalling project momentum.',
          action: 'Created proof-of-concepts, benchmarked both solutions, and held an objective review.',
          result: 'Adopted the most scalable approach and strengthened team mutual respect.',
        },
      },
    )

    // Technical
    list.push(
      {
        id: 'q-tech-1',
        category: 'technical',
        question: `How do you approach performance optimization and scalability in modern web systems?`,
        context: `Relevant for ${roleName}. Demonstrates deep system understanding and profiling tools.`,
        starGuide: {
          situation: 'Identified a high-latency endpoint, memory bottleneck, or sluggish render cycle.',
          task: 'Diagnose root cause using profiling metrics rather than guessing.',
          action: 'Implemented database indexing, query caching, CDN edge caching, or memoization.',
          result: 'Reduced p99 response time from 1.2s to sub-100ms and saved server costs.',
        },
      },
      {
        id: 'q-tech-2',
        category: 'technical',
        question: 'How do you ensure code quality, automated testing, and reliability in fast-moving teams?',
        context: 'Assesses engineering rigor, CI/CD pipelines, and defensive coding standards.',
        starGuide: {
          situation: 'High velocity environment where bugs could impact paying end-users.',
          task: 'Establish robust quality gates without slowing down sprint cycles.',
          action: 'Integrated end-to-end regression tests, TypeScript strict mode, and automated PR checks.',
          result: 'Achieved 99.9% uptime and reduced production rollbacks by over 60%.',
        },
      },
    )

    // Leadership
    list.push(
      {
        id: 'q-lead-1',
        category: 'leadership',
        question: 'How do you mentor junior developers or onboard new engineers onto complex codebases?',
        context: 'Measures leadership potential, empathy, and organizational multiplier effect.',
        starGuide: {
          situation: 'A new hire joining during an active feature sprint.',
          task: 'Accelerate their time-to-first-commit while keeping senior bandwidth intact.',
          action: 'Created interactive documentation, pair-programmed initial PRs, and provided constructive code reviews.',
          result: 'Reduced average onboarding ramp time from 4 weeks to under 10 days.',
        },
      },
    )

    return list
  }, [resumeData])

  const filteredQuestions = useMemo(() => {
    if (selectedCategory === 'all') return questions
    return questions.filter((q) => q.category === selectedCategory)
  }, [questions, selectedCategory])

  return (
    <main className="min-h-dvh bg-background text-foreground">
      {/* Top Navbar */}
      <header className="mx-auto flex max-w-7xl items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <FileText className="size-5" />
            </span>
            <span className="text-lg font-bold">ResumePro</span>
          </Link>
          <span className="hidden sm:inline-block text-muted-foreground">/</span>
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-400">
            <HelpCircle className="size-3" /> STAR Interview Prep
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/builder"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" /> Studio Builder
          </Link>
          <Button
            size="sm"
            onClick={() => window.print()}
            variant="outline"
            className="gap-1.5"
          >
            <Download className="size-4" /> Print Cheat Sheet
          </Button>
        </div>
      </header>

      {/* Main Container */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2.5">
              STAR Interview Simulator
              <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
                Tailored to Your Resume
              </span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Candidate profile: <strong className="text-foreground">{resumeData.fullName || 'Candidate'}</strong> ({resumeData.role || 'Software Engineer'})
            </p>
          </div>

          {/* Quick STAR Rule Badge */}
          <div className="flex items-center gap-2 rounded-xl border border-border bg-secondary/30 p-3 text-xs">
            <div className="flex flex-col">
              <span className="font-semibold text-foreground">The STAR Framework:</span>
              <span className="text-muted-foreground text-[11px]">
                <strong className="text-indigo-400">S</strong>ituation • <strong className="text-indigo-400">T</strong>ask • <strong className="text-indigo-400">A</strong>ction • <strong className="text-emerald-400">R</strong>esult
              </span>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto py-5 border-b border-border/60">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'resume-specific', label: '🎯 Resume-Specific' },
            { id: 'behavioral', label: '🧠 Behavioral & Conflict' },
            { id: 'technical', label: '⚙️ Technical Depth' },
            { id: 'leadership', label: '👑 Leadership & Mentorship' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as QuestionCategory)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-xs font-medium transition-all shrink-0',
                selectedCategory === cat.id
                  ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                  : 'bg-secondary/40 text-muted-foreground hover:text-foreground',
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Question Cards List */}
        <div className="mt-6 space-y-4">
          {filteredQuestions.map((q, idx) => {
            const isExpanded = expandedId === q.id || expandedId === null
            const note = userNotes[q.id] || ''

            return (
              <div
                key={q.id}
                className="rounded-2xl border border-border bg-popover p-5 sm:p-6 shadow-sm hover:border-primary/40 transition-all space-y-4"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="flex size-6 items-center justify-center rounded-md bg-secondary text-[11px] font-mono font-bold text-muted-foreground">
                        0{idx + 1}
                      </span>
                      <span className="rounded-full bg-secondary/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {q.category.replace('-', ' ')}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug pt-1">
                      {q.question}
                    </h3>
                    <p className="text-xs text-muted-foreground">{q.context}</p>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(q.id, q.question)}
                    className="h-8 text-xs gap-1 shrink-0 text-muted-foreground"
                  >
                    {copiedId === q.id ? (
                      <>
                        <Check className="size-3.5 text-emerald-400" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" /> Copy
                      </>
                    )}
                  </Button>
                </div>

                {/* STAR Structured Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 rounded-xl border border-border/60 bg-secondary/20 p-4 text-xs">
                  <div className="space-y-1">
                    <p className="font-semibold text-indigo-400 flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-indigo-400" /> Situation (S)
                    </p>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">
                      {q.starGuide.situation}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-sky-400 flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-sky-400" /> Task (T)
                    </p>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">
                      {q.starGuide.task}
                    </p>
                  </div>
                  <div className="space-y-1 sm:pt-2 sm:border-t sm:border-border/40">
                    <p className="font-semibold text-amber-400 flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-amber-400" /> Action (A)
                    </p>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">
                      {q.starGuide.action}
                    </p>
                  </div>
                  <div className="space-y-1 sm:pt-2 sm:border-t sm:border-border/40">
                    <p className="font-semibold text-emerald-400 flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-emerald-400" /> Result (R)
                    </p>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">
                      {q.starGuide.result}
                    </p>
                  </div>
                </div>

                {/* Practice Answer Scratchpad */}
                <div className="space-y-2 pt-2 border-t border-border/40">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor={`note-${q.id}`}
                      className="text-xs font-semibold text-foreground flex items-center gap-1.5"
                    >
                      <MessageSquare className="size-3.5 text-primary" />
                      Your Practice Answer / Bullet Points (Auto-saved)
                    </label>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {note.trim() ? `${note.trim().split(/\s+/).length} words` : 'Empty'}
                    </span>
                  </div>
                  <Textarea
                    id={`note-${q.id}`}
                    placeholder="Draft your bullet points here (e.g. In Q3 2025, I migrated 14 microservices...)"
                    value={note}
                    onChange={(e) => saveNote(q.id, e.target.value)}
                    className="min-h-[70px] text-xs bg-background/60 leading-relaxed"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
