'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  FileText,
  ArrowRight,
  Menu,
  X,
  Heart,
  LayoutTemplate,
  PenLine,
  Briefcase,
  HelpCircle,
  Sparkles,
} from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 py-4 sm:py-5">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
            <FileText className="size-5" />
          </span>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight">ResumeAI</span>
            <span className="rounded-full bg-secondary/80 px-2 py-0.5 text-[10px] font-mono font-medium text-muted-foreground">
              v2.0
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground lg:flex">
          <Link href="/templates" className="transition-colors hover:text-foreground">
            15 Pro Layouts
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
            href="/shaadi-biodata"
            className="flex items-center gap-1.5 text-rose-400 font-semibold transition-colors hover:text-rose-300"
          >
            <Heart className="size-3.5 fill-rose-500 text-rose-500" />
            Shaadi Biodata
          </Link>
          <Link
            href="/builder"
            className="flex items-center gap-1.5 transition-colors hover:text-foreground font-semibold text-foreground"
          >
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Studio
          </Link>
        </nav>

        {/* Right Area: Desktop CTA + Mobile Quick Access & Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Direct Shaadi Biodata Pill for Mobile & Tablet */}
          <Link
            href="/shaadi-biodata"
            className="flex lg:hidden items-center gap-1.5 rounded-full border border-rose-500/40 bg-rose-500/15 px-3 py-1.5 text-xs font-bold text-rose-400 shadow-sm transition-colors hover:bg-rose-500/25 active:scale-95"
            title="Indian Shaadi Biodata Maker"
          >
            <Heart className="size-3.5 fill-rose-500 text-rose-500" />
            <span>Shaadi Biodata</span>
          </Link>

          {/* Desktop Studio CTA */}
          <Link
            href="/builder"
            className={cn(
              buttonVariants({ size: 'default' }),
              'hidden sm:inline-flex h-10 gap-2 px-5 font-semibold shadow-sm',
            )}
          >
            Open Studio <ArrowRight className="size-4" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex lg:hidden size-9 items-center justify-center rounded-xl border border-border/80 bg-secondary/50 text-foreground transition-colors hover:bg-secondary active:scale-95"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 overflow-hidden rounded-2xl border border-border/80 bg-popover/95 p-4 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Featured Highlight: Shaadi Biodata Maker */}
          <div className="mb-3 rounded-xl border border-rose-500/30 bg-gradient-to-r from-rose-500/10 via-amber-500/5 to-transparent p-3.5">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-400">
                <Heart className="size-3.5 fill-rose-500 text-rose-500" />
                Matrimonial Studio
              </span>
              <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-[10px] font-bold text-rose-300">
                100% Free
              </span>
            </div>
            <h3 className="mt-1.5 text-sm font-bold text-foreground">
              Shaadi Biodata Maker
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
              Hindi & English matrimonial biodata, traditional crests, horoscope details & instant WhatsApp sharing.
            </p>
            <Link
              href="/shaadi-biodata"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2.5 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-rose-600 px-3 py-2 text-xs font-bold text-white shadow-sm hover:bg-rose-700 transition-colors"
            >
              Create Shaadi Biodata <ArrowRight className="size-3.5" />
            </Link>
          </div>

          {/* Standard Navigation Links */}
          <div className="space-y-1 text-sm font-medium border-t border-border/50 pt-2">
            <Link
              href="/templates"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-foreground hover:bg-muted transition-colors"
            >
              <LayoutTemplate className="size-4 text-primary" />
              <span>15 Pro Layouts</span>
            </Link>
            <Link
              href="/cover-letter"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-foreground hover:bg-muted transition-colors"
            >
              <PenLine className="size-4 text-primary" />
              <span>Smart Cover Letter</span>
            </Link>
            <Link
              href="/tracker"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-foreground hover:bg-muted transition-colors"
            >
              <Briefcase className="size-4 text-primary" />
              <span>Job Tracker CRM</span>
            </Link>
            <Link
              href="/interview"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-foreground hover:bg-muted transition-colors"
            >
              <HelpCircle className="size-4 text-primary" />
              <span>STAR Interview Prep</span>
            </Link>
            <Link
              href="/builder"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-foreground hover:bg-muted transition-colors font-semibold"
            >
              <Sparkles className="size-4 text-emerald-400" />
              <span>Studio Resume Builder</span>
            </Link>
          </div>

          {/* Bottom Mobile Action Button */}
          <div className="mt-3 border-t border-border/50 pt-3">
            <Link
              href="/builder"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                buttonVariants({ size: 'default' }),
                'w-full justify-center gap-2 h-10 font-semibold shadow-sm',
              )}
            >
              Launch Studio Builder <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
