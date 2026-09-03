'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  DEFAULT_DESIGN_SETTINGS,
  EMPTY_DATA,
  type DesignSettings,
  type ResumeData,
  type TemplateId,
  type ThemeId,
} from '@/lib/resume-types'

const STORAGE_KEY = 'resumeai:v2'
const MAX_HISTORY = 30

type StoredState = {
  data: ResumeData
  template: TemplateId
  theme: ThemeId
  design: DesignSettings
}

const DEFAULT_STATE: StoredState = {
  data: EMPTY_DATA,
  template: 'modern',
  theme: 'blue',
  design: DEFAULT_DESIGN_SETTINGS,
}

export function useResumeStore() {
  const [state, setState] = useState<StoredState>(DEFAULT_STATE)
  const [hydrated, setHydrated] = useState(false)
  const [past, setPast] = useState<StoredState[]>([])
  const [future, setFuture] = useState<StoredState[]>([])
  const stateRef = useRef(state)
  stateRef.current = state

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<StoredState>
        const loadedState: StoredState = {
          data: { ...EMPTY_DATA, ...parsed.data, customSections: parsed.data?.customSections ?? [] },
          template: parsed.template ?? 'modern',
          theme: parsed.theme ?? 'blue',
          design: {
            ...DEFAULT_DESIGN_SETTINGS,
            ...parsed.design,
            sectionVisibility: { ...parsed.design?.sectionVisibility },
            sectionOrder: parsed.design?.sectionOrder ?? DEFAULT_DESIGN_SETTINGS.sectionOrder,
          },
        }
        setState(loadedState)
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* storage full / unavailable */
    }
  }, [state, hydrated])

  const pushHistory = useCallback((currentState: StoredState) => {
    setPast((prev) => [...prev.slice(-MAX_HISTORY), currentState])
    setFuture([])
  }, [])

  const setData = useCallback(
    (updater: ResumeData | ((prev: ResumeData) => ResumeData)) => {
      setState((prev) => {
        pushHistory(prev)
        const nextData =
          typeof updater === 'function'
            ? (updater as (p: ResumeData) => ResumeData)(prev.data)
            : updater
        return {
          ...prev,
          data: nextData,
        }
      })
    },
    [pushHistory],
  )

  const setTemplate = useCallback((template: TemplateId) => {
    setState((prev) => {
      pushHistory(prev)
      return { ...prev, template }
    })
  }, [pushHistory])

  const setTheme = useCallback((theme: ThemeId) => {
    setState((prev) => {
      pushHistory(prev)
      return { ...prev, theme }
    })
  }, [pushHistory])

  const setDesign = useCallback((patch: Partial<DesignSettings>) => {
    setState((prev) => {
      pushHistory(prev)
      return { ...prev, design: { ...prev.design, ...patch } }
    })
  }, [pushHistory])

  const undo = useCallback(() => {
    setPast((prevPast) => {
      if (prevPast.length === 0) return prevPast
      const previousState = prevPast[prevPast.length - 1]
      const newPast = prevPast.slice(0, prevPast.length - 1)
      setFuture((prevFuture) => [stateRef.current, ...prevFuture])
      setState(previousState)
      return newPast
    })
  }, [])

  const redo = useCallback(() => {
    setFuture((prevFuture) => {
      if (prevFuture.length === 0) return prevFuture
      const nextState = prevFuture[0]
      const newFuture = prevFuture.slice(1)
      setPast((prevPast) => [...prevPast, stateRef.current])
      setState(nextState)
      return newFuture
    })
  }, [])

  // Keyboard shortcut listener for Ctrl+Z and Ctrl+Y / Cmd+Z and Cmd+Shift+Z
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing inside an active input/textarea
      const activeEl = document.activeElement
      const isTyping =
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          (activeEl as HTMLElement).isContentEditable)

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          e.preventDefault()
          redo()
        } else if (!isTyping) {
          e.preventDefault()
          undo()
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y' && !isTyping) {
        e.preventDefault()
        redo()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo])

  const reset = useCallback(() => {
    pushHistory(stateRef.current)
    setState(DEFAULT_STATE)
  }, [pushHistory])

  return {
    data: state.data,
    template: state.template,
    theme: state.theme,
    design: state.design,
    hydrated,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
    undo,
    redo,
    setData,
    setTemplate,
    setTheme,
    setDesign,
    reset,
  }
}

