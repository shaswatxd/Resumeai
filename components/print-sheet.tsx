'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

/*
 * Renders children into a body-level element that is invisible on screen
 * and becomes the ONLY visible element when printing. Avoids every
 * absolute-position/visibility print hack — the sheet is a plain
 * in-flow block, so multi-page content paginates naturally.
 *
 * `pageSize` feeds a dynamic @page rule so Letter resumes print on Letter
 * and A4 resumes on A4 (the static CSS default is A4).
 */
export function PrintSheet({
  children,
  pageSize,
}: {
  children: React.ReactNode
  pageSize?: 'a4' | 'letter'
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  const pageRule = pageSize === 'letter' ? 'Letter' : 'A4'
  return createPortal(
    <div className="print-sheet bg-white">
      <style dangerouslySetInnerHTML={{ __html: `@media print { @page { size: ${pageRule}; } }` }} />
      {children}
    </div>,
    document.body,
  )
}
