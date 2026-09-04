'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  SAMPLE_BIODATA_DATA,
  SAMPLE_BIODATA_DATA_EN,
  BIODATA_TEMPLATES,
  type BiodataData,
  type BiodataTemplateId,
} from '@/lib/biodata-types'
import { t } from '@/lib/biodata-translations'
import { BiodataEditor } from './biodata-editor'
import { BiodataPreview } from './biodata-preview'
import {
  Download,
  LayoutTemplate,
  RefreshCw,
  Sparkles,
  Eye,
  Edit3,
  Heart,
  Crown,
  Check,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'

export function BiodataShell() {
  const toast = useToast()
  const [data, setData] = useState<BiodataData>(SAMPLE_BIODATA_DATA)
  const [template, setTemplate] = useState<BiodataTemplateId>('royal-marigold')
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit')
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false)

  const translate = (key: string) => t(key, data.language)

  const handlePrint = () => {
    const prev = document.title
    document.title = data.personal.fullName
      ? `${data.personal.fullName} - Marriage Biodata`
      : 'Marriage Biodata - ResumeAI'
    window.print()
    document.title = prev
  }

  const handleLoadSample = (lang: 'hi' | 'en') => {
    if (lang === 'hi') {
      setData(SAMPLE_BIODATA_DATA)
      toast('हिंदी नमूना डेटा लोड किया गया', 'success')
    } else {
      setData(SAMPLE_BIODATA_DATA_EN)
      toast('English sample biodata loaded', 'success')
    }
  }

  return (
    <div className="flex h-dvh w-full max-w-[100vw] flex-col overflow-hidden bg-background text-foreground print:h-auto print:overflow-visible">
      {/* Top Navbar */}
      <header className="no-print z-30 flex h-14 sm:h-16 w-full shrink-0 items-center justify-between border-b border-border bg-card/90 px-3 sm:px-6 backdrop-blur">
        {/* Left: Branding & Back link */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 group transition-opacity hover:opacity-90"
            title="ResumeAI Home"
          >
            <div className="size-8 sm:size-9 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white shadow-xs">
              <Heart className="size-4 sm:size-5 fill-white" />
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm tracking-tight text-foreground">
                  ResumeAI
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-500 font-bold uppercase tracking-wider">
                  Shaadi Biodata
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-none">
                Matrimonial Biodata Maker
              </p>
            </div>
          </Link>
        </div>

        {/* Center: Mobile Switcher (Edit / Preview) */}
        <div className="flex lg:hidden items-center bg-muted/60 p-1 rounded-lg border border-border text-xs font-semibold">
          <button
            type="button"
            onClick={() => setMobileTab('edit')}
            className={`flex items-center gap-1 px-3 py-1 rounded-md transition-all ${
              mobileTab === 'edit'
                ? 'bg-background text-foreground shadow-2xs font-bold'
                : 'text-muted-foreground'
            }`}
          >
            <Edit3 className="size-3.5" />
            <span>Form</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('preview')}
            className={`flex items-center gap-1 px-3 py-1 rounded-md transition-all ${
              mobileTab === 'preview'
                ? 'bg-background text-foreground shadow-2xs font-bold'
                : 'text-muted-foreground'
            }`}
          >
            <Eye className="size-3.5" />
            <span>Preview</span>
          </button>
        </div>

        {/* Right: Actions (Template picker, Presets, Download PDF) */}
        <div className="flex items-center gap-2">
          {/* Template Selector Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsTemplateModalOpen(true)}
            className="h-9 gap-1.5 text-xs font-medium border-border"
          >
            <LayoutTemplate className="size-3.5 text-amber-500" />
            <span className="hidden sm:inline">Template:</span>
            <span className="font-bold text-foreground truncate max-w-[100px] sm:max-w-none">
              {BIODATA_TEMPLATES.find((t) => t.id === template)?.name.split(' ')[0]}
            </span>
          </Button>

          {/* Sample Preset Dropdown */}
          <div className="hidden md:flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLoadSample(data.language === 'hi' ? 'hi' : 'en')}
              className="h-9 px-2 text-xs text-muted-foreground hover:text-foreground"
              title="Reset with sample data"
            >
              <RefreshCw className="size-3.5 mr-1" />
              Reset Sample
            </Button>
          </div>

          {/* Download Vector PDF Button */}
          <Button
            size="sm"
            onClick={handlePrint}
            className="h-9 gap-1.5 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white font-semibold text-xs sm:text-sm shadow-md"
          >
            <Download className="size-4" />
            <span>{translate('downloadPdf')}</span>
          </Button>
        </div>
      </header>

      {/* Main Two-Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Form Editor (Visible always on desktop, toggled on mobile) */}
        <div
          className={`w-full lg:w-[460px] xl:w-[500px] h-full shrink-0 ${
            mobileTab === 'edit' ? 'block' : 'hidden lg:block'
          }`}
        >
          <BiodataEditor data={data} onChange={setData} t={translate} />
        </div>

        {/* Right: Live A4 Preview (Visible always on desktop, toggled on mobile) */}
        <div
          className={`flex-1 h-full overflow-hidden ${
            mobileTab === 'preview' ? 'block' : 'hidden lg:block'
          }`}
        >
          <BiodataPreview data={data} template={template} t={translate} />
        </div>
      </div>

      {/* Template Selector Modal */}
      {isTemplateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="relative w-full max-w-3xl rounded-2xl bg-popover p-6 shadow-2xl border border-border text-foreground space-y-5 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Sparkles className="size-5 text-amber-500" />
                <h3 className="text-lg font-bold text-foreground">
                  Choose Matrimonial Biodata Template
                </h3>
              </div>
              <button
                onClick={() => setIsTemplateModalOpen(false)}
                className="rounded-full p-1 text-muted-foreground hover:bg-muted"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {BIODATA_TEMPLATES.map((item) => {
                const isSelected = template === item.id
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setTemplate(item.id)
                      setIsTemplateModalOpen(false)
                      toast(`Selected ${item.name}`, 'success')
                    }}
                    className={`group cursor-pointer rounded-xl border-2 p-3 transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-border hover:border-primary/50 hover:bg-muted/30'
                    }`}
                  >
                    {/* Badge */}
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 ${
                          item.isPremium
                            ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
                            : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30'
                        }`}
                      >
                        {item.isPremium ? (
                          <>
                            <Crown className="size-3" />
                            Premium
                          </>
                        ) : (
                          'Free'
                        )}
                      </span>
                      {isSelected && (
                        <span className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                          <Check className="size-3 stroke-[3]" />
                        </span>
                      )}
                    </div>

                    {/* Color Swatch / Visual Representation */}
                    <div
                      className="h-28 rounded-lg mb-3 flex flex-col items-center justify-center p-2 text-center relative overflow-hidden border shadow-inner"
                      style={{
                        backgroundColor: item.primaryColor,
                        borderColor: item.accentColor,
                      }}
                    >
                      <div
                        className="text-xs font-bold drop-shadow-md tracking-wider uppercase text-white"
                        style={{ color: item.accentColor }}
                      >
                        {item.nameHindi}
                      </div>
                      <div className="text-[10px] text-white/80 mt-1">
                        A4 Traditional Layout
                      </div>
                      <div
                        className="w-16 h-0.5 mt-2 rounded-full"
                        style={{ backgroundColor: item.accentColor }}
                      />
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">
                        {item.tagline}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
