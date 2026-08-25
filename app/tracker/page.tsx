'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Briefcase,
  Plus,
  ArrowLeft,
  FileText,
  Building2,
  Calendar,
  DollarSign,
  ExternalLink,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  Send,
  Sparkles,
  Search,
  Filter,
  Download,
  Upload,
  Layers,
  ChevronRight,
  TrendingUp,
} from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input, Label, Textarea } from '@/components/ui/field'
import { cn } from '@/lib/utils'

export type JobStatus = 'wishlist' | 'applied' | 'interviewing' | 'offer' | 'rejected'

export type JobApplication = {
  id: string
  company: string
  role: string
  location?: string
  salary?: string
  url?: string
  status: JobStatus
  dateApplied: string
  notes?: string
  resumeVersion?: string
}

const STORAGE_KEY = 'resumepro:job_tracker:v1'

const STATUS_COLUMNS: { id: JobStatus; label: string; color: string; bg: string }[] = [
  { id: 'wishlist', label: 'Wishlist', color: 'text-sky-400', bg: 'bg-sky-400/10 border-sky-400/30' },
  { id: 'applied', label: 'Applied', color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/30' },
  { id: 'interviewing', label: 'Interviewing', color: 'text-indigo-400', bg: 'bg-indigo-400/10 border-indigo-400/30' },
  { id: 'offer', label: 'Offer Received', color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/30' },
  { id: 'rejected', label: 'Archived / Rejected', color: 'text-rose-400', bg: 'bg-rose-400/10 border-rose-400/30' },
]

const SAMPLE_JOBS: JobApplication[] = [
  {
    id: 'job-1',
    company: 'Stripe',
    role: 'Senior Full Stack Engineer',
    location: 'Remote (US/EU)',
    salary: '$180,000 - $220,000',
    url: 'https://stripe.com/jobs',
    status: 'interviewing',
    dateApplied: '2026-08-15',
    notes: 'Passed technical screen with hiring manager. System design interview scheduled for Friday.',
    resumeVersion: 'Full Stack Tech Lead',
  },
  {
    id: 'job-2',
    company: 'Linear',
    role: 'Product Engineer',
    location: 'Remote',
    salary: '$160,000 - $195,000',
    url: 'https://linear.app/careers',
    status: 'applied',
    dateApplied: '2026-08-20',
    notes: 'Submitted customized resume tailored to desktop client and keyboard-first UI experience.',
    resumeVersion: 'Frontend Specialist',
  },
  {
    id: 'job-3',
    company: 'Vercel',
    role: 'Frontend Infrastructure Lead',
    location: 'San Francisco, CA / Remote',
    salary: '$190,000 - $230,000',
    url: 'https://vercel.com/careers',
    status: 'wishlist',
    dateApplied: '2026-08-24',
    notes: 'Reviewing job requirements. Need to emphasize Next.js App Router and Turbopack contributions.',
    resumeVersion: 'ATS Pro Standard',
  },
]

export default function JobTrackerPage() {
  const [jobs, setJobs] = useState<JobApplication[]>([])
  const [hydrated, setHydrated] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingJob, setEditingJob] = useState<JobApplication | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // Form State
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [location, setLocation] = useState('')
  const [salary, setSalary] = useState('')
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState<JobStatus>('applied')
  const [dateApplied, setDateApplied] = useState(new Date().toISOString().split('T')[0])
  const [notes, setNotes] = useState('')

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        setJobs(JSON.parse(raw))
      } else {
        setJobs(SAMPLE_JOBS)
      }
    } catch {
      setJobs(SAMPLE_JOBS)
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs))
    } catch {
      /* ignore */
    }
  }, [jobs, hydrated])

  const openAddModal = () => {
    setEditingJob(null)
    setCompany('')
    setRole('')
    setLocation('')
    setSalary('')
    setUrl('')
    setStatus('applied')
    setDateApplied(new Date().toISOString().split('T')[0])
    setNotes('')
    setModalOpen(true)
  }

  const openEditModal = (job: JobApplication) => {
    setEditingJob(job)
    setCompany(job.company)
    setRole(job.role)
    setLocation(job.location || '')
    setSalary(job.salary || '')
    setUrl(job.url || '')
    setStatus(job.status)
    setDateApplied(job.dateApplied)
    setNotes(job.notes || '')
    setModalOpen(true)
  }

  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault()
    if (!company.trim() || !role.trim()) return

    if (editingJob) {
      setJobs((prev) =>
        prev.map((j) =>
          j.id === editingJob.id
            ? {
                ...j,
                company: company.trim(),
                role: role.trim(),
                location: location.trim(),
                salary: salary.trim(),
                url: url.trim(),
                status,
                dateApplied,
                notes: notes.trim(),
              }
            : j,
        ),
      )
    } else {
      const newJob: JobApplication = {
        id: `job-${Date.now()}`,
        company: company.trim(),
        role: role.trim(),
        location: location.trim(),
        salary: salary.trim(),
        url: url.trim(),
        status,
        dateApplied,
        notes: notes.trim(),
      }
      setJobs((prev) => [newJob, ...prev])
    }
    setModalOpen(false)
  }

  const handleDeleteJob = (id: string) => {
    if (confirm('Delete this job entry?')) {
      setJobs((prev) => prev.filter((j) => j.id !== id))
    }
  }

  const handleMoveStatus = (id: string, newStatus: JobStatus) => {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, status: newStatus } : j)))
  }

  const handleExportCSV = () => {
    const headers = ['Company', 'Role', 'Status', 'Date Applied', 'Salary', 'Location', 'URL', 'Notes']
    const rows = jobs.map((j) => [
      `"${j.company.replace(/"/g, '""')}"`,
      `"${j.role.replace(/"/g, '""')}"`,
      `"${j.status}"`,
      `"${j.dateApplied}"`,
      `"${(j.salary || '').replace(/"/g, '""')}"`,
      `"${(j.location || '').replace(/"/g, '""')}"`,
      `"${(j.url || '').replace(/"/g, '""')}"`,
      `"${(j.notes || '').replace(/"/g, '""')}"`,
    ])
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `job-applications-tracker-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const filteredJobs = jobs.filter((j) => {
    const matchesQuery =
      j.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (j.notes && j.notes.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || j.status === statusFilter
    return matchesQuery && matchesStatus
  })

  // Metrics
  const totalApps = jobs.length
  const activeInterviews = jobs.filter((j) => j.status === 'interviewing').length
  const offersReceived = jobs.filter((j) => j.status === 'offer').length
  const responseRate = totalApps > 0 ? Math.round(((activeInterviews + offersReceived) / totalApps) * 100) : 0

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
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
            <Briefcase className="size-3" /> Job Tracker CRM
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/builder"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" /> Studio Builder
          </Link>
          <Button size="sm" onClick={openAddModal} className="gap-1.5">
            <Plus className="size-4" /> Track New Job
          </Button>
        </div>
      </header>

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        {/* Header Title & Metrics */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-border">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Job Application Pipeline</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              100% private client-side CRM for managing applications, interview rounds, and offers.
            </p>
          </div>

          {/* Quick Metrics Cards */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-xl border border-border bg-secondary/30 px-4 py-2.5 min-w-[110px]">
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Total Applied</p>
              <p className="text-xl font-bold font-mono text-foreground mt-0.5">{totalApps}</p>
            </div>
            <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-2.5 min-w-[110px]">
              <p className="text-[11px] font-medium text-indigo-300 uppercase tracking-wider">Interviews</p>
              <p className="text-xl font-bold font-mono text-indigo-400 mt-0.5">{activeInterviews}</p>
            </div>
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 min-w-[110px]">
              <p className="text-[11px] font-medium text-emerald-300 uppercase tracking-wider">Offers</p>
              <p className="text-xl font-bold font-mono text-emerald-400 mt-0.5">{offersReceived}</p>
            </div>
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 min-w-[110px]">
              <p className="text-[11px] font-medium text-amber-300 uppercase tracking-wider">Response Rate</p>
              <p className="text-xl font-bold font-mono text-amber-400 mt-0.5">{responseRate}%</p>
            </div>
          </div>
        </div>

        {/* Toolbar: Search, Filter, Export */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-6">
          <div className="flex flex-wrap items-center gap-3 flex-1">
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search company, role or notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10"
              />
            </div>

            <div className="flex items-center gap-1 rounded-lg border border-border bg-secondary/30 p-1 text-xs">
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className={cn(
                  'rounded px-2.5 py-1 transition-all',
                  statusFilter === 'all' ? 'bg-primary text-primary-foreground font-semibold' : 'text-muted-foreground',
                )}
              >
                All ({jobs.length})
              </button>
              {STATUS_COLUMNS.map((col) => (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => setStatusFilter(col.id)}
                  className={cn(
                    'rounded px-2.5 py-1 transition-all hidden sm:inline-block',
                    statusFilter === col.id ? 'bg-primary text-primary-foreground font-semibold' : 'text-muted-foreground',
                  )}
                >
                  {col.label} ({jobs.filter((j) => j.status === col.id).length})
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExportCSV} className="gap-1.5 h-10">
              <Download className="size-4" /> Export CSV
            </Button>
            <Button size="sm" onClick={openAddModal} className="gap-1.5 h-10">
              <Plus className="size-4" /> Add Application
            </Button>
          </div>
        </div>

        {/* Kanban Board Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-start">
          {STATUS_COLUMNS.map((col) => {
            const columnJobs = filteredJobs.filter((j) => j.status === col.id)
            return (
              <div
                key={col.id}
                className="flex flex-col rounded-2xl border border-border/80 bg-secondary/20 p-3 min-h-[480px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 border-b border-border/60 mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <span className={cn('text-xs font-bold uppercase tracking-wider', col.color)}>
                      {col.label}
                    </span>
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-mono font-semibold text-muted-foreground">
                      {columnJobs.length}
                    </span>
                  </div>
                </div>

                {/* Cards List */}
                <div className="space-y-3 flex-1">
                  {columnJobs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center text-xs text-muted-foreground border border-dashed border-border/60 rounded-xl">
                      No jobs in {col.label.toLowerCase()}
                    </div>
                  ) : (
                    columnJobs.map((job) => (
                      <div
                        key={job.id}
                        className="rounded-xl border border-border bg-popover p-4 shadow-sm hover:border-primary/50 transition-all group relative"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                              {job.role}
                            </h4>
                            <p className="text-xs font-medium text-muted-foreground flex items-center gap-1 mt-0.5">
                              <Building2 className="size-3" />
                              {job.company}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={() => openEditModal(job)}
                              className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-secondary"
                              title="Edit"
                            >
                              <Edit2 className="size-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteJob(job.id)}
                              className="p-1 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                              title="Delete"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="mt-3 space-y-1 text-[11px] text-muted-foreground border-t border-border/50 pt-2">
                          {job.salary && (
                            <p className="flex items-center gap-1 text-emerald-400 font-medium">
                              <DollarSign className="size-3" /> {job.salary}
                            </p>
                          )}
                          {job.location && <p className="truncate">📍 {job.location}</p>}
                          <p className="flex items-center gap-1 text-muted-foreground/80 font-mono">
                            <Calendar className="size-3" /> {job.dateApplied}
                          </p>
                        </div>

                        {job.notes && (
                          <p className="mt-2.5 text-xs text-foreground/80 bg-secondary/30 p-2 rounded-lg leading-relaxed line-clamp-3">
                            {job.notes}
                          </p>
                        )}

                        {/* Quick move status picker */}
                        <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-2 text-[10px]">
                          {job.url ? (
                            <a
                              href={job.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-primary hover:underline"
                            >
                              Job Post <ExternalLink className="size-2.5" />
                            </a>
                          ) : (
                            <span />
                          )}
                          <select
                            value={job.status}
                            onChange={(e) => handleMoveStatus(job.id, e.target.value as JobStatus)}
                            className="rounded bg-secondary/60 px-1.5 py-0.5 font-medium text-foreground outline-none cursor-pointer"
                          >
                            {STATUS_COLUMNS.map((c) => (
                              <option key={c.id} value={c.id}>
                                Move: {c.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Add / Edit Job Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl border border-border bg-popover p-6 shadow-2xl">
            <h3 className="text-lg font-bold">
              {editingJob ? 'Edit Application' : 'Track New Application'}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Keep your job hunt organized with deadlines, notes, and salary ranges.
            </p>

            <form onSubmit={handleSaveJob} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    required
                    placeholder="Google, Stripe, etc."
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role / Position *</Label>
                  <Input
                    id="role"
                    required
                    placeholder="Full Stack Engineer"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="salary">Salary / Rate (Optional)</Label>
                  <Input
                    id="salary"
                    placeholder="$140,000 - $180,000"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Remote / New York, NY"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="status">Application Stage</Label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as JobStatus)}
                    className="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none"
                  >
                    {STATUS_COLUMNS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={dateApplied}
                    onChange={(e) => setDateApplied(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="url">Job Posting URL (Optional)</Label>
                <Input
                  id="url"
                  placeholder="https://..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="notes">Interview Rounds & Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Hiring manager contact, questions asked, referrals, next steps..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
                <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingJob ? 'Save Changes' : 'Add to Pipeline'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
