'use client'

import { useState } from 'react'
import { Sparkles, Loader2, Check, X, Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { BiodataData, LanguageMode } from '@/lib/biodata-types'
import { useToast } from '@/components/ui/toast'

interface AiBiodataModalProps {
  isOpen: boolean
  onClose: () => void
  data: BiodataData
  onApply: (aboutMe: string, partnerExpectations: string) => void
}

export function AiBiodataModal({
  isOpen,
  onClose,
  data,
  onApply,
}: AiBiodataModalProps) {
  const toast = useToast()
  const [tone, setTone] = useState<'traditional' | 'balanced' | 'modern'>('balanced')
  const [lang, setLang] = useState<LanguageMode>(data.language || 'hi')
  const [loading, setLoading] = useState(false)
  const [generatedAbout, setGeneratedAbout] = useState('')
  const [generatedExpectations, setGeneratedExpectations] = useState('')

  if (!isOpen) return null

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'biodata-about',
          biodataContext: {
            name: data.personal.fullName,
            gender: data.personal.gender,
            education: data.personal.education,
            occupation: data.personal.occupation,
            company: data.personal.company,
            familyType: data.family.familyType,
            nativePlace: data.family.nativePlace,
            hobbies: data.hobbies,
            tone,
            language: lang,
          },
        }),
      })

      const json = await res.json()
      if (!res.ok || json.error) {
        throw new Error(json.error || 'Failed to generate with AI')
      }

      setGeneratedAbout(json.aboutMe || '')
      setGeneratedExpectations(json.partnerExpectations || '')
      toast('Generated matrimonial summary successfully!', 'success')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error generating text'
      toast(msg, 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleApply = () => {
    onApply(generatedAbout, generatedExpectations)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-2xl bg-popover p-6 shadow-2xl border border-border text-foreground space-y-5 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2 text-primary font-bold text-lg">
            <Sparkles className="size-5 text-amber-500 animate-pulse" />
            <span>AI Biodata Summary Generator</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-muted-foreground hover:bg-muted transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Options */}
        <div className="space-y-4 text-sm">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Select Tone
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTone('traditional')}
                className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                  tone === 'traditional'
                    ? 'border-primary bg-primary/10 text-primary font-bold'
                    : 'border-border hover:bg-muted text-muted-foreground'
                }`}
              >
                संस्कार / Traditional
              </button>
              <button
                type="button"
                onClick={() => setTone('balanced')}
                className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                  tone === 'balanced'
                    ? 'border-primary bg-primary/10 text-primary font-bold'
                    : 'border-border hover:bg-muted text-muted-foreground'
                }`}
              >
                संतुलित / Balanced
              </button>
              <button
                type="button"
                onClick={() => setTone('modern')}
                className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                  tone === 'modern'
                    ? 'border-primary bg-primary/10 text-primary font-bold'
                    : 'border-border hover:bg-muted text-muted-foreground'
                }`}
              >
                आधुनिक / Modern
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Output Language
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setLang('hi')}
                className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                  lang === 'hi'
                    ? 'border-primary bg-primary/10 text-primary font-bold'
                    : 'border-border hover:bg-muted text-muted-foreground'
                }`}
              >
                हिंदी (Hindi)
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                  lang === 'en'
                    ? 'border-primary bg-primary/10 text-primary font-bold'
                    : 'border-border hover:bg-muted text-muted-foreground'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLang('hinglish')}
                className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                  lang === 'hinglish'
                    ? 'border-primary bg-primary/10 text-primary font-bold'
                    : 'border-border hover:bg-muted text-muted-foreground'
                }`}
              >
                Hinglish
              </button>
            </div>
          </div>

          <div className="pt-1">
            <Button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full h-10 gap-2 font-medium"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Generating Biodata Summary...
                </>
              ) : (
                <>
                  <Wand2 className="size-4" />
                  Generate with AI
                </>
              )}
            </Button>
          </div>

          {/* Generated Result Fields */}
          {(generatedAbout || generatedExpectations) && (
            <div className="space-y-3 pt-2 animate-in fade-in duration-300">
              {generatedAbout && (
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    About Candidate (परिचय)
                  </label>
                  <textarea
                    rows={3}
                    value={generatedAbout}
                    onChange={(e) => setGeneratedAbout(e.target.value)}
                    className="w-full text-xs rounded-md border border-border bg-background p-2.5 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              )}

              {generatedExpectations && (
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Partner Expectations (जीवनसाथी से अपेक्षाएं)
                  </label>
                  <textarea
                    rows={2}
                    value={generatedExpectations}
                    onChange={(e) => setGeneratedExpectations(e.target.value)}
                    className="w-full text-xs rounded-md border border-border bg-background p-2.5 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              )}

              <Button
                onClick={handleApply}
                className="w-full h-9 bg-emerald-600 hover:bg-emerald-700 text-white gap-2 font-medium"
              >
                <Check className="size-4" />
                Apply to Biodata
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
