'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  type: ToastType
  message: string
  duration?: number
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType, duration?: number) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const ICONS: Record<ToastType, typeof CheckCircle2> = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
}

const STYLES: Record<ToastType, string> = {
  success: 'border-emerald-500/30 bg-emerald-950/80 text-emerald-200',
  error: 'border-red-500/30 bg-red-950/80 text-red-200',
  warning: 'border-amber-500/30 bg-amber-950/80 text-amber-200',
  info: 'border-primary/30 bg-background/95 text-foreground',
}

const ICON_STYLES: Record<ToastType, string> = {
  success: 'text-emerald-400',
  error: 'text-red-400',
  warning: 'text-amber-400',
  info: 'text-primary',
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
    const t = timers.current.get(id)
    if (t) { clearTimeout(t); timers.current.delete(id) }
  }, [])

  const toast = useCallback((message: string, type: ToastType = 'info', duration = 3500) => {
    const id = 'toast-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev.slice(-4), { id, type, message, duration }])
    const timer = setTimeout(() => dismiss(id), duration)
    timers.current.set(id, timer)
  }, [dismiss])

  useEffect(() => () => { timers.current.forEach(clearTimeout) }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed bottom-5 right-5 z-[200] flex flex-col gap-2 sm:bottom-6 sm:right-6"
      >
        <AnimatePresence initial={false}>
          {toasts.map((t) => {
            const Icon = ICONS[t.type]
            return (
              <motion.div
                key={t.id}
                role="status"
                initial={{ opacity: 0, y: 20, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92, y: 10 }}
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                className={cn(
                  'pointer-events-auto flex w-[340px] max-w-[calc(100vw-2rem)] items-start gap-3 rounded-2xl border px-4 py-3 shadow-2xl backdrop-blur-xl',
                  STYLES[t.type],
                )}
              >
                <Icon className={cn('mt-0.5 size-4 shrink-0', ICON_STYLES[t.type])} />
                <p className="flex-1 text-sm font-medium leading-snug">{t.message}</p>
                <button
                  onClick={() => dismiss(t.id)}
                  className="mt-0.5 shrink-0 opacity-60 hover:opacity-100 transition-opacity"
                  aria-label="Dismiss"
                >
                  <X className="size-3.5" />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx.toast
}
