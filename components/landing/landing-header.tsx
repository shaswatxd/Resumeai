'use client'

import { useEffect, useState } from 'react'
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
  NotebookPen,
} from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/templates', label: 'Templates', icon: LayoutTemplate },
  { href: '/cover-letter', label: 'Cover Letter', icon: PenLine },
  { href: '/tracker', label: 'Job Tracker', icon: Briefcase },
  { href: '/interview', label: 'Interview Prep', icon: HelpCircle },
  { href: '/shaadi-biodata', label: 'Shaadi Biodata', icon: Heart, accent: true },
  { href: '/builder', label: 'Resume Builder', icon: NotebookPen },
]

export function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Scroll lock + Escape while the mobile menu is open.
  useEffect(() => {
    if (!mobileMenuOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [mobileMenuOpen])

  return (
    <header className="relative z-30 border-b border-border/60">
      {/* Slim announcement strip — real product facts, not marketing claims */}
      <div className="hidden sm:block border-b border-border/50 bg-secondary/30">
        <p className="mx-auto max-w-7xl px-4 sm:px-6 py-1.5 text-center text-xs text-muted-foreground">
          Free, no sign-up · Your resume data stays in your browser · Resume text is only sent to AI providers when you ask for AI writing help
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3">
        <div className="flex h-11 items-center justify-between gap-3">
          {/* Logo */}
          <Link href="/" className="flex min-w-0 items-center gap-2.5" aria-label="ResumeAI home">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <FileText className="size-5" strokeWidth={2.2} />
            </span>
            <span className="truncate text-lg font-semibold tracking-tight font-display">
              ResumeAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Primary" className="hidden items-center gap-5 text-sm font-medium text-muted-foreground xl:flex">
            {NAV_LINKS.filter((l) => l.href !== '/builder').map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'py-2 transition-colors hover:text-foreground',
                  link.accent && 'flex items-center gap-1.5 text-rose-400 hover:text-rose-300',
                )}
              >
                {link.accent ? <Heart className="size-3.5 fill-current" /> : null}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Area: CTA + hamburger */}
          <div className="flex items-center gap-2">
            <Link
              href="/builder"
              className={cn(
                buttonVariants({ size: 'default' }),
                'hidden h-10 gap-2 px-4 font-semibold sm:inline-flex',
              )}
            >
              Build Resume <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/builder"
              className={cn(
                buttonVariants({ size: 'default' }),
                'h-10 gap-1.5 px-3 font-semibold sm:hidden',
              )}
            >
              Build
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex size-11 items-center justify-center rounded-lg border border-border/80 bg-secondary/50 text-foreground transition-colors hover:bg-secondary xl:hidden"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer / Slide-down Menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-30 bg-background/60"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden
          />
          <div
            id="mobile-menu"
            className="absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-8rem)] overflow-y-auto border-b border-border bg-popover shadow-2xl xl:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col p-3">
              <div className="grid grid-cols-2 gap-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex min-h-11 items-center gap-2.5 rounded-lg px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted',
                      link.accent && 'text-rose-400',
                      link.href === '/builder' && 'col-span-2 min-h-12 border border-primary/30 bg-primary/10 text-primary',
                    )}
                  >
                    <link.icon className={cn('size-4', link.accent && 'fill-rose-500 text-rose-500', link.href === '/builder' && 'text-primary')} />
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
              <p className="mt-3 border-t border-border/50 px-1 pt-3 text-xs leading-relaxed text-muted-foreground">
                No account needed. Your resume lives in your browser — export a JSON backup anytime.
              </p>
            </nav>
          </div>
        </>
      )}
    </header>
  )
}
