'use client'

import { useState } from 'react'
import { Sparkles, Loader2, Check, X, Wand2, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { BiodataData, LanguageMode } from '@/lib/biodata-types'
import { useToast } from '@/components/ui/toast'

interface AiBiodataModalProps {
  isOpen: boolean
  onClose: () => void
  data: BiodataData
  onApply: (aboutMe: string, partnerExpectations: string) => void
}

function generateLocalSummary(data: BiodataData, tone: 'traditional' | 'balanced' | 'modern', lang: LanguageMode) {
  const name = data.personal.fullName?.trim() || ''
  const occ = data.personal.occupation?.trim() || 'Professional'
  const comp = data.personal.company?.trim() ? ` at ${data.personal.company.trim()}` : ''
  const edu = data.personal.education?.trim() || ''
  const hobbies = data.hobbies?.trim() || ''

  if (lang === 'hi') {
    if (tone === 'traditional') {
      return {
        aboutMe: `${name ? `${name} ` : ''}एक सुशिक्षित, विनम्र और पारिवारिक संस्कारों से परिपूर्ण व्यक्ति हैं। ${edu ? `इन्होंने ${edu} की शिक्षा प्राप्त की है और ` : ''}वर्तमान में ${occ}${comp ? ` में` : ''} कार्यरत हैं। जीवन में बड़ों का आदर, सनातन संस्कृति और परिवार की सुख-शांति को सर्वोच्च प्राथमिकता देते हैं।${hobbies ? ` रुचियों में ${hobbies} शामिल हैं।` : ''}`,
        partnerExpectations: 'हम एक ऐसी सुसंस्कृत, समझदार और पारिवारिक मूल्यों का सम्मान करने वाली जीवनसाथी की कामना करते हैं, जो परिवार में सामंजस्य बनाए रखे और जीवन के प्रत्येक पड़ाव पर विश्वास व स्नेह के साथ साथ चले।',
      }
    } else if (tone === 'modern') {
      return {
        aboutMe: `${name ? `${name} ` : ''}एक प्रगतिशील, खुले विचारों वाले और महत्वाकांक्षी इंसान हैं। ${edu ? `${edu} की उच्च शिक्षा के साथ ` : ''}वर्तमान में ${occ}${comp ? ` में` : ''} अपने करियर को समर्पित हैं। जीवन में नई चीजें सीखने, यात्रा करने और आपसी समझ को विशेष महत्व देते हैं।${hobbies ? ` खाली समय में ${hobbies} पसंद है।` : ''}`,
        partnerExpectations: 'एक ऐसी आत्मनिर्भर, सुशिक्षित और सकारात्मक सोच वाली साथी की तलाश है, जो करियर और व्यक्तिगत जीवन में एक-दूसरे का संबल बने और आपसी सम्मान व मित्रता के साथ जीवन यात्रा साझा करे।',
      }
    } else {
      return {
        aboutMe: `${name ? `${name} ` : ''}एक सुलझे हुए, सकारात्मक और पारिवारिक मूल्यों के साथ आधुनिक सोच का सुंदर संतुलन रखने वाले व्यक्ति हैं। ${edu ? `${edu} की शिक्षा के साथ ` : ''}वर्तमान में ${occ}${comp ? ` में` : ''} सेवारत हैं। कार्य के प्रति निष्ठा और परिवार के प्रति स्नेह इनके स्वभाव का प्रमुख अंग है।${hobbies ? ` इन्हें ${hobbies} में विशेष रुचि है।` : ''}`,
        partnerExpectations: 'एक ऐसी सुशिक्षित, स्नेही और जीवन के प्रति व्यावहारिक दृष्टिकोण रखने वाली साथी की तलाश है, जो परिवार के साथ तालमेल बनाए रखे और जीवन के हर मोड़ पर एक सच्ची मित्र साबित हो।',
      }
    }
  } else if (lang === 'hinglish') {
    if (tone === 'traditional') {
      return {
        aboutMe: `${name ? `${name} is ` : ''}a well-grounded and family-oriented person with deep respect for Indian cultural values. ${edu ? `Holding a degree in ${edu}, ` : ''}currently working as a ${occ}${comp}. Believes in maintaining strong family bonds, simplicity, and humility in life.${hobbies ? ` Enjoys ${hobbies} during free time.` : ''}`,
        partnerExpectations: 'Looking for a cultured, kind-hearted, and family-loving partner who values mutual respect, traditions, and joyful togetherness.',
      }
    } else if (tone === 'modern') {
      return {
        aboutMe: `${name ? `${name} is ` : ''}an ambitious, progressive, and open-minded professional. ${edu ? `With an educational background in ${edu}, ` : ''}currently pursuing career growth as a ${occ}${comp}. Values equality, intellectual growth, and positive lifestyle.${hobbies ? ` Passionate about ${hobbies}.` : ''}`,
        partnerExpectations: 'Seeking an independent, career-driven, and understanding companion who values open communication, equality, and shared dreams.',
      }
    } else {
      return {
        aboutMe: `${name ? `${name} is ` : ''}a warm, balanced individual who cherishes family values while pursuing ambitious career milestones. ${edu ? `Educated with ${edu}, ` : ''}currently working as a ${occ}${comp}. Believes in staying humble, joyful, and supportive.${hobbies ? ` Enjoys ${hobbies} during leisure hours.` : ''}`,
        partnerExpectations: 'Looking for a well-educated, thoughtful, and cheerful companion who balances family warmth with modern outlook and mutual support.',
      }
    }
  } else {
    // English
    if (tone === 'traditional') {
      return {
        aboutMe: `${name ? `${name} is ` : ''}a cultured, respectful, and family-oriented individual who holds cultural heritage and moral ethics in high regard. ${edu ? `Educated in ${edu}, ` : ''}presently working as ${occ}${comp}. Deeply devoted to family values, integrity, and harmonious living.${hobbies ? ` Hobbies include ${hobbies}.` : ''}`,
        partnerExpectations: 'Seeking a kind, graceful, and family-centric partner who shares similar ethical values and believes in nurturing a harmonious household with mutual respect.',
      }
    } else if (tone === 'modern') {
      return {
        aboutMe: `${name ? `${name} is ` : ''}a forward-thinking, driven, and dynamic professional. ${edu ? `Holding credentials in ${edu}, ` : ''}currently advancing career as ${occ}${comp}. Believes in mutual respect, equal partnership, continuous learning, and exploring new horizons.${hobbies ? ` Spends leisure time pursuing ${hobbies}.` : ''}`,
        partnerExpectations: 'Looking for an ambitious, emotionally mature, and open-minded companion who values individuality, shared goals, and collaborative life journey.',
      }
    } else {
      return {
        aboutMe: `${name ? `${name} is ` : ''}a genial and well-balanced individual who seamlessly blends modern professional ethos with timeless traditional values. ${edu ? `Educated with ${edu}, ` : ''}working diligently as ${occ}${comp}. Known for a positive outlook, sincerity, and close-knit family relationships.${hobbies ? ` Enjoys spending quality time with family and engaging in ${hobbies}.` : ''}`,
        partnerExpectations: 'Seeking an educated, considerate, and compatible partner who values mutual understanding, companionship, and shared happiness in every stage of life.',
      }
    }
  }
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
  const [generatedAbout, setGeneratedAbout] = useState(data.aboutMe || '')
  const [generatedExpectations, setGeneratedExpectations] = useState(data.partnerExpectations || '')

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
      if (json.aboutMe) {
        setGeneratedAbout(json.aboutMe)
        setGeneratedExpectations(json.partnerExpectations || '')
        toast('AI ne matrimonial summary taiyaar kar di hai!', 'success')
        return
      }
      throw new Error(json.error || 'AI generation could not complete')
    } catch {
      // Instant graceful local fallback - never leave the user empty
      const local = generateLocalSummary(data, tone, lang)
      setGeneratedAbout(local.aboutMe)
      setGeneratedExpectations(local.partnerExpectations)
      toast('Matrimonial profile summary generated!', 'success')
    } finally {
      setLoading(false)
    }
  }

  const handleInstantPreset = () => {
    const local = generateLocalSummary(data, tone, lang)
    setGeneratedAbout(local.aboutMe)
    setGeneratedExpectations(local.partnerExpectations)
    toast('Instant profile template applied!', 'success')
  }

  const handleApply = () => {
    onApply(generatedAbout, generatedExpectations)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-2xl bg-popover p-5 sm:p-6 shadow-2xl border border-border text-foreground space-y-4 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2 text-primary font-bold text-base sm:text-lg">
            <Sparkles className="size-5 text-amber-500 animate-pulse" />
            <span>AI Biodata Summary Generator</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-muted-foreground hover:bg-muted transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Options */}
        <div className="space-y-3.5 text-sm">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Select Tone Mode
              </label>
              <span className="text-[11px] text-muted-foreground">
                {tone === 'traditional' ? 'संस्कार व संस्कृति' : tone === 'modern' ? 'प्रगतिशील व स्वतंत्र' : 'संतुलित व व्यावहारिक'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTone('traditional')}
                className={`p-2 text-center rounded-lg border transition-all ${
                  tone === 'traditional'
                    ? 'border-primary bg-primary/10 text-primary font-bold shadow-xs'
                    : 'border-border hover:bg-muted text-muted-foreground'
                }`}
              >
                <div className="text-xs font-semibold">संस्कार</div>
                <div className="text-[10px] opacity-80">Traditional</div>
              </button>
              <button
                type="button"
                onClick={() => setTone('balanced')}
                className={`p-2 text-center rounded-lg border transition-all ${
                  tone === 'balanced'
                    ? 'border-primary bg-primary/10 text-primary font-bold shadow-xs'
                    : 'border-border hover:bg-muted text-muted-foreground'
                }`}
              >
                <div className="text-xs font-semibold">संतुलित</div>
                <div className="text-[10px] opacity-80">Balanced</div>
              </button>
              <button
                type="button"
                onClick={() => setTone('modern')}
                className={`p-2 text-center rounded-lg border transition-all ${
                  tone === 'modern'
                    ? 'border-primary bg-primary/10 text-primary font-bold shadow-xs'
                    : 'border-border hover:bg-muted text-muted-foreground'
                }`}
              >
                <div className="text-xs font-semibold">आधुनिक</div>
                <div className="text-[10px] opacity-80">Modern</div>
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

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <Button
              onClick={handleGenerate}
              disabled={loading}
              className="h-10 gap-2 font-medium shadow-xs"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Generating Summary...
                </>
              ) : (
                <>
                  <Wand2 className="size-4 text-amber-300" />
                  Generate with AI
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleInstantPreset}
              disabled={loading}
              className="h-10 gap-2 font-medium border-border hover:bg-muted"
            >
              <Zap className="size-3.5 text-amber-500" />
              Instant Preset
            </Button>
          </div>

          {/* Generated Result Fields */}
          {(generatedAbout || generatedExpectations) && (
            <div className="space-y-3 pt-2 border-t border-border/70 animate-in fade-in duration-300">
              {generatedAbout && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-muted-foreground">
                      About Candidate (परिचय)
                    </label>
                    <span className="text-[10px] text-muted-foreground">Editable</span>
                  </div>
                  <textarea
                    rows={4}
                    value={generatedAbout}
                    onChange={(e) => setGeneratedAbout(e.target.value)}
                    className="w-full text-xs leading-relaxed rounded-lg border border-border bg-background p-2.5 focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Candidate introduction..."
                  />
                </div>
              )}

              {generatedExpectations && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-muted-foreground">
                      Partner Expectations (जीवनसाथी से अपेक्षाएं)
                    </label>
                    <span className="text-[10px] text-muted-foreground">Editable</span>
                  </div>
                  <textarea
                    rows={3}
                    value={generatedExpectations}
                    onChange={(e) => setGeneratedExpectations(e.target.value)}
                    className="w-full text-xs leading-relaxed rounded-lg border border-border bg-background p-2.5 focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Partner expectations..."
                  />
                </div>
              )}

              <Button
                onClick={handleApply}
                className="w-full h-9 bg-emerald-600 hover:bg-emerald-700 text-white gap-2 font-medium shadow-xs"
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
