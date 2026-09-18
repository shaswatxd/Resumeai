'use client'

import React, { useState, useEffect, useRef } from 'react'
import type { BiodataData, BiodataTemplateId } from '@/lib/biodata-types'
import { BiodataDocument } from './templates'
import { PrintSheet } from '@/components/print-sheet'
import { ZoomIn, ZoomOut, RotateCcw, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BiodataPreviewProps {
  data: BiodataData
  template: BiodataTemplateId
  t: (key: string) => string
}

export function BiodataPreview({ data, template, t }: BiodataPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(0.85)

  // Auto-fit document on mobile / small screens on mount
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth
        if (containerWidth > 0 && containerWidth < 850) {
          // Fit A4 (794px) into available width with safety padding
          const fitScale = Math.min(
            Math.max(Number(((containerWidth - 20) / 794).toFixed(2)), 0.35),
            1.2
          )
          setZoom(fitScale)
        }
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleZoomIn = () => setZoom((prev) => Math.min(Number((prev + 0.1).toFixed(2)), 1.4))
  const handleZoomOut = () => setZoom((prev) => Math.max(Number((prev - 0.1).toFixed(2)), 0.35))

  const handleFitZoom = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth
      const fitScale = Math.min(
        Math.max(Number(((containerWidth - 20) / 794).toFixed(2)), 0.35),
        1.2
      )
      setZoom(fitScale)
    } else {
      setZoom(0.85)
    }
  }

  return (
    <div className="relative flex-1 h-full flex flex-col bg-muted/30 overflow-hidden select-none">
      {/* Zoom Toolbar */}
      <div className="no-print z-20 flex items-center justify-between px-3 sm:px-4 py-2 bg-background/80 backdrop-blur border-b border-border text-xs">
        <div className="text-muted-foreground font-medium truncate mr-2">
          A4 Preview
        </div>
        <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-md border border-border">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={handleZoomOut}
            title="Zoom Out"
          >
            <ZoomOut className="size-3.5" />
          </Button>
          <span className="w-10 text-center text-xs font-mono font-semibold">
            {Math.round(zoom * 100)}%
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={handleZoomIn}
            title="Zoom In"
          >
            <ZoomIn className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 ml-0.5"
            onClick={handleFitZoom}
            title="Fit to screen"
          >
            <Maximize2 className="size-3" />
          </Button>
        </div>
      </div>

      {/* Screen Preview Canvas */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-2 sm:p-8 flex justify-center items-start"
      >
        <div
          className="w-[794px] shrink-0 transition-transform duration-150 shadow-2xl rounded-sm"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            marginBottom: zoom < 1 ? `-${Math.round(1123 * (1 - zoom))}px` : undefined,
          }}
        >
          <BiodataDocument data={data} template={template} t={t} />
        </div>
      </div>

      {/* Print Sheet Portal (Used exclusively by window.print() / @media print) */}
      <PrintSheet>
        <div className="biodata-print-container w-full bg-white">
          <BiodataDocument data={data} template={template} t={t} />
        </div>
      </PrintSheet>
    </div>
  )
}

