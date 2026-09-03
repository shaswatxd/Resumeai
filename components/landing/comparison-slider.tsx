'use client'

import { useState, useRef, useCallback } from 'react'
import { Sparkles, CheckCircle2, XCircle, ArrowLeftRight } from 'lucide-react'

export function ComparisonSlider() {
  const [sliderPos, setSliderPos] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const percent = Math.max(10, Math.min(90, (x / rect.width) * 100))
    setSliderPos(percent)
  }, [])

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    handleMove(e.touches[0].clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-20">
      <div className="mx-auto max-w-3xl text-center mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary mb-3">
          <Sparkles className="size-3.5" />
          <span>The Visual Difference</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
          See the transformation in seconds.
        </h2>
        <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
          Recruiters spend an average of 6 seconds reviewing a resume. Drag the slider to see how ResumeAI elevates your candidacy from generic to irresistible.
        </p>
      </div>

      {/* Comparison Canvas */}
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
        className="relative mx-auto h-[540px] max-w-4xl select-none overflow-hidden rounded-3xl border border-border/80 bg-neutral-950 shadow-2xl glow-border cursor-ew-resize"
      >
        {/* AFTER Side (Right - Full Width Behind) */}
        <div className="absolute inset-0 flex h-full w-full bg-slate-950 p-6 sm:p-10 justify-end">
          <div className="w-full max-w-xl flex flex-col justify-between pl-8">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="size-3.5" />
                  98% ATS Pass • FAANG Ready
                </span>
                <span className="text-xs font-mono text-muted-foreground">ResumeAI Emerald Suite</span>
              </div>

              {/* Styled Resume Preview Snippet */}
              <div className="rounded-2xl border border-emerald-500/20 bg-slate-900/80 p-6 shadow-xl backdrop-blur">
                <div className="flex items-center justify-between border-b border-border/60 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">Alex Rivera</h3>
                    <p className="text-sm font-medium text-emerald-400">Staff Software Engineer</p>
                  </div>
                  <div className="size-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-slate-950 text-sm">
                    AR
                  </div>
                </div>

                <div className="mt-4 space-y-3 text-xs text-slate-300">
                  <div>
                    <div className="flex justify-between font-semibold text-white">
                      <span>Stripe • Lead Systems Architect</span>
                      <span className="text-slate-400 font-mono">2022 — Present</span>
                    </div>
                    <ul className="mt-1.5 list-disc pl-4 space-y-1 text-slate-300">
                      <li>Architected low-latency checkout pipeline handling <strong>$2.4B annual volume</strong> with 99.999% uptime.</li>
                      <li>Spearheaded distributed cache tier reducing p99 response times by <strong>42ms</strong> across 18 regions.</li>
                    </ul>
                  </div>

                  <div className="pt-2">
                    <p className="font-semibold text-white mb-1.5">Core Competencies</p>
                    <div className="flex flex-wrap gap-1.5">
                      {['Distributed Systems', 'Go / Rust', 'PostgreSQL', 'Kubernetes', 'High Throughput'].map((skill) => (
                        <span key={skill} className="rounded-md bg-emerald-500/15 border border-emerald-500/25 px-2 py-0.5 text-[10.5px] font-medium text-emerald-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-emerald-400/90 font-medium">
              <CheckCircle2 className="size-4 shrink-0" />
              <span>Perfect vector fonts • Keyword highlighted • Scannable hierarchy</span>
            </div>
          </div>
        </div>

        {/* BEFORE Side (Left - Clipped with sliderPos width) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden bg-zinc-200 p-6 sm:p-10 transition-[width] duration-75 ease-out"
          style={{ width: `${sliderPos}%` }}
        >
          <div className="w-[800px] flex flex-col justify-between h-full text-zinc-800">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/20 border border-rose-500/30 px-3 py-1 text-xs font-bold text-rose-700">
                  <XCircle className="size-3.5" />
                  38% ATS Pass • Generic Word Doc
                </span>
              </div>

              {/* Bland Unstyled Word Resume Snippet */}
              <div className="rounded-lg border border-zinc-300 bg-white p-6 shadow-sm font-serif max-w-xl">
                <div className="border-b border-zinc-400 pb-2 mb-3 text-center">
                  <h3 className="text-xl font-bold text-zinc-900">Alex Rivera</h3>
                  <p className="text-xs text-zinc-600">alex@email.com | 555-0192 | New York, NY</p>
                </div>

                <div className="space-y-3 text-xs text-zinc-700">
                  <div>
                    <p className="font-bold text-zinc-900 uppercase text-[11px] tracking-wider">Experience</p>
                    <p className="font-semibold mt-1">Software Engineer - Stripe (2022 - Present)</p>
                    <p className="text-[11px] text-zinc-600 leading-relaxed mt-0.5">
                      Responsible for software development and working on payment backend systems with team members. Attended daily standups and fixed bugs in the codebase.
                    </p>
                  </div>

                  <div>
                    <p className="font-bold text-zinc-900 uppercase text-[11px] tracking-wider">Skills</p>
                    <p className="text-[11px] text-zinc-600 mt-0.5">
                      Programming, Java, Python, SQL, Teamwork, Communication, Problem Solving.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-rose-700 font-medium">
              <XCircle className="size-4 shrink-0" />
              <span>No quantified impact • Low keyword density • Unstructured layout</span>
            </div>
          </div>
        </div>

        {/* Vertical Divider Slider Line */}
        <div
          className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full border-2 border-white bg-slate-900 text-white shadow-xl">
            <ArrowLeftRight className="size-4" />
          </div>
        </div>

        {/* Instruction badge at bottom center */}
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-4 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md">
          Drag horizontally to compare
        </div>
      </div>
    </section>
  )
}
