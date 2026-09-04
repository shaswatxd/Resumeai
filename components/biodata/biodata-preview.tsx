'use client'

import React, { useState } from 'react'
import type { BiodataData, BiodataTemplateId } from '@/lib/biodata-types'
import { BiodataDocument } from './templates'
import { PrintSheet } from '@/components/print-sheet'
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BiodataPreviewProps {
  data: BiodataData
  template: BiodataTemplateId
  t: (key: string) => string
}

export function BiodataPreview({ data, template, t }: BiodataPreviewProps) {
  const [zoom, setZoom] = useState(0.85)

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 1.3))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.45))
  const handleResetZoom = () => setZoom(0.85)

  return (
    <div className="relative flex-1 h-full flex flex-col bg-muted/30 overflow-hidden select-none">
      {/* Zoom Toolbar */}
      <div className="no-print z-20 flex items-center justify-between px-4 py-2 bg-background/80 backdrop-blur border-b border-border text-xs">
        <div className="text-muted-foreground font-medium">
          A4 Portrait Document Preview
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
          <span className="w-12 text-center text-xs font-mono font-semibold">
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
            className="h-7 w-7 p-0 ml-1"
            onClick={handleResetZoom}
            title="Reset Zoom"
          >
            <RotateCcw className="size-3" />
          </Button>
        </div>
      </div>

      {/* Screen Preview Canvas */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start">
        <div
          className="transition-transform duration-150 origin-top shadow-2xl rounded-sm"
          style={{
            transform: `scale(${zoom})`,
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
