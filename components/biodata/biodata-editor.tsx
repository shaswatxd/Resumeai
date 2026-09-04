'use client'

import React, { useState } from 'react'
import type {
  BiodataData,
  HeaderSymbol,
  LanguageMode,
} from '@/lib/biodata-types'
import {
  User,
  Users,
  Compass,
  Phone,
  Sparkles,
  Camera,
  Trash2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AiBiodataModal } from './ai-biodata-modal'

interface BiodataEditorProps {
  data: BiodataData
  onChange: (updater: (prev: BiodataData) => BiodataData) => void
  t: (key: string) => string
}

export function BiodataEditor({ data, onChange, t }: BiodataEditorProps) {
  const [activeSection, setActiveSection] = useState<'personal' | 'family' | 'horoscope' | 'about' | 'contact'>('personal')
  const [isAiModalOpen, setIsAiModalOpen] = useState(false)

  // Calculate age from DOB
  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dob = e.target.value
    let autoAge = data.personal.age
    if (dob) {
      const birth = new Date(dob)
      if (!isNaN(birth.getTime())) {
        const today = new Date()
        let calculated = today.getFullYear() - birth.getFullYear()
        const m = today.getMonth() - birth.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
          calculated--
        }
        if (calculated >= 0) {
          autoAge =
            data.language === 'hi'
              ? `${calculated} वर्ष`
              : `${calculated} Yrs`
        }
      }
    }

    onChange((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        dob,
        age: autoAge,
      },
    }))
  }

  // Photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange((prev) => ({
          ...prev,
          photo: reader.result as string,
          showPhoto: true,
        }))
      }
    }
    reader.readAsDataURL(file)
  }

  const handleRemovePhoto = () => {
    onChange((prev) => ({
      ...prev,
      photo: '',
      showPhoto: false,
    }))
  }

  const symbols: { id: HeaderSymbol; label: string }[] = [
    { id: 'ganesh', label: 'श्री गणेश (Ganesh)' },
    { id: 'om', label: 'ॐ (Om)' },
    { id: 'kalash', label: 'कलश (Kalash)' },
    { id: 'swastik', label: 'स्वस्तिक (Swastik)' },
    { id: 'ekonkar', label: 'ੴ (Ek Onkar)' },
    { id: 'none', label: 'कोई नहीं (None)' },
  ]

  const updatePersonal = (field: keyof BiodataData['personal'], value: string) => {
    onChange((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }))
  }

  const updateFamily = (field: keyof BiodataData['family'], value: unknown) => {
    onChange((prev) => ({
      ...prev,
      family: { ...prev.family, [field]: value },
    }))
  }

  const updateHoroscope = (field: keyof BiodataData['horoscope'], value: unknown) => {
    onChange((prev) => ({
      ...prev,
      horoscope: { ...prev.horoscope, [field]: value },
    }))
  }

  const updateContact = (field: keyof BiodataData['contact'], value: string) => {
    onChange((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }))
  }

  return (
    <div className="flex flex-col h-full bg-card border-r border-border overflow-y-auto">
      {/* Top Controls: Language & Auspicious Header */}
      <div className="p-4 border-b border-border space-y-4 bg-muted/20">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {t('languageToggle')}
          </label>
          <div className="inline-flex rounded-lg border border-border p-0.5 bg-background shadow-2xs">
            {(['hi', 'en', 'hinglish'] as LanguageMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => {
                  onChange((prev) => ({
                    ...prev,
                    language: mode,
                    headerTitle:
                      mode === 'hi'
                        ? '|| श्री गणेशाय नमः ||'
                        : mode === 'en'
                          ? '|| Shree Ganeshaya Namah ||'
                          : '|| Shree Ganeshaya Namah ||',
                  }))
                }}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  data.language === mode
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {mode === 'hi' ? 'हिंदी' : mode === 'en' ? 'English' : 'Hinglish'}
              </button>
            ))}
          </div>
        </div>

        {/* Symbol & Header Title Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              {t('selectSymbol')}
            </label>
            <select
              value={data.headerSymbol}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  headerSymbol: e.target.value as HeaderSymbol,
                }))
              }
              className="w-full text-xs h-9 rounded-md border border-border bg-background px-2.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {symbols.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Header Heading
            </label>
            <input
              type="text"
              value={data.headerTitle}
              onChange={(e) =>
                onChange((prev) => ({ ...prev, headerTitle: e.target.value }))
              }
              placeholder="e.g. || श्री गणेशाय नमः ||"
              className="w-full text-xs h-9 rounded-md border border-border bg-background px-2.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Photo Upload Row */}
        <div className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-background/80">
          <div className="flex items-center gap-3">
            <div className="relative size-11 rounded-md overflow-hidden bg-muted flex items-center justify-center border border-border">
              {data.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.photo}
                  alt="Candidate"
                  className="size-full object-cover"
                />
              ) : (
                <Camera className="size-5 text-muted-foreground" />
              )}
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">
                {t('photoUpload')}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {data.photo ? 'Photo added to preview' : 'Optional (PNG/JPG)'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="cursor-pointer inline-flex items-center justify-center h-8 px-3 rounded-md text-xs font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
              <span>{data.photo ? 'Change' : 'Upload'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
            {data.photo && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-destructive hover:bg-destructive/10"
                onClick={handleRemovePhoto}
              >
                <Trash2 className="size-3.5" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Sections / Tabs */}
      <div className="flex border-b border-border bg-muted/40 p-1 gap-1 overflow-x-auto text-xs">
        <button
          type="button"
          onClick={() => setActiveSection('personal')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
            activeSection === 'personal'
              ? 'bg-background text-foreground shadow-2xs font-bold'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <User className="size-3.5" />
          <span>{t('personalDetails')}</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('family')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
            activeSection === 'family'
              ? 'bg-background text-foreground shadow-2xs font-bold'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Users className="size-3.5" />
          <span>{t('familyDetails')}</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('horoscope')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
            activeSection === 'horoscope'
              ? 'bg-background text-foreground shadow-2xs font-bold'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Compass className="size-3.5" />
          <span>{t('horoscopeDetails')}</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('about')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
            activeSection === 'about'
              ? 'bg-background text-foreground shadow-2xs font-bold'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Sparkles className="size-3.5 text-amber-500" />
          <span>About / AI</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('contact')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
            activeSection === 'contact'
              ? 'bg-background text-foreground shadow-2xs font-bold'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Phone className="size-3.5" />
          <span>{t('contactDetails')}</span>
        </button>
      </div>

      {/* Form Content Body */}
      <div className="p-4 space-y-4 flex-1">
        {/* 1. PERSONAL DETAILS */}
        {activeSection === 'personal' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">
                {t('fullName')} *
              </label>
              <input
                type="text"
                value={data.personal.fullName}
                onChange={(e) => updatePersonal('fullName', e.target.value)}
                placeholder="e.g. राहुल शर्मा / Rahul Sharma"
                className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  {t('gender')}
                </label>
                <select
                  value={data.personal.gender}
                  onChange={(e) =>
                    updatePersonal('gender', e.target.value as 'male' | 'female')
                  }
                  className="w-full text-xs h-9 rounded-md border border-border bg-background px-2.5 text-foreground focus:ring-1 focus:ring-primary"
                >
                  <option value="male">{t('male')}</option>
                  <option value="female">{t('female')}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  {t('dob')} (जन्म तिथि)
                </label>
                <input
                  type="date"
                  value={data.personal.dob}
                  onChange={handleDobChange}
                  className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  {t('age')} (Auto-Calculated)
                </label>
                <input
                  type="text"
                  value={data.personal.age}
                  onChange={(e) => updatePersonal('age', e.target.value)}
                  placeholder="e.g. 28 वर्ष"
                  className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  {t('height')} (कद)
                </label>
                <input
                  type="text"
                  value={data.personal.height}
                  onChange={(e) => updatePersonal('height', e.target.value)}
                  placeholder="e.g. 5' 10&quot; (178 cm)"
                  className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  {t('complexion')} (वैकल्पिक / Optional)
                </label>
                <input
                  type="text"
                  value={data.personal.complexion || ''}
                  onChange={(e) => updatePersonal('complexion', e.target.value)}
                  placeholder="e.g. Fair / Wheatish / गेहुंआ"
                  className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  {t('bloodGroup')}
                </label>
                <input
                  type="text"
                  value={data.personal.bloodGroup || ''}
                  onChange={(e) => updatePersonal('bloodGroup', e.target.value)}
                  placeholder="e.g. B+, O+, A+"
                  className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  {t('maritalStatus')}
                </label>
                <input
                  type="text"
                  value={data.personal.maritalStatus}
                  onChange={(e) => updatePersonal('maritalStatus', e.target.value)}
                  placeholder="e.g. Never Married / अविवाहित"
                  className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  {t('income')}
                </label>
                <input
                  type="text"
                  value={data.personal.income || ''}
                  onChange={(e) => updatePersonal('income', e.target.value)}
                  placeholder="e.g. ₹25 Lakhs PA / ₹25 LPA"
                  className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">
                {t('education')} (उच्च शिक्षा)
              </label>
              <input
                type="text"
                value={data.personal.education}
                onChange={(e) => updatePersonal('education', e.target.value)}
                placeholder="e.g. B.Tech (Computer Science), IIT Delhi"
                className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">
                {t('occupation')} (व्यवसाय / पद)
              </label>
              <input
                type="text"
                value={data.personal.occupation}
                onChange={(e) => updatePersonal('occupation', e.target.value)}
                placeholder="e.g. Senior Software Engineer / Manager"
                className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  {t('religion')} (धर्म)
                </label>
                <input
                  type="text"
                  value={data.personal.religion}
                  onChange={(e) => updatePersonal('religion', e.target.value)}
                  placeholder="e.g. Hindu / Jain / Sikh"
                  className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  {t('caste')} (जाति)
                </label>
                <input
                  type="text"
                  value={data.personal.caste}
                  onChange={(e) => updatePersonal('caste', e.target.value)}
                  placeholder="e.g. Brahmin / Agarwal / Rajput"
                  className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  {t('subcaste')} (उप-जाति)
                </label>
                <input
                  type="text"
                  value={data.personal.subcaste || ''}
                  onChange={(e) => updatePersonal('subcaste', e.target.value)}
                  placeholder="e.g. Gaur / Khandelwal"
                  className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  {t('gotra')} (गोत्र)
                </label>
                <input
                  type="text"
                  value={data.personal.gotra || ''}
                  onChange={(e) => updatePersonal('gotra', e.target.value)}
                  placeholder="e.g. Kashyap / Vatsa / Garg"
                  className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        )}

        {/* 2. FAMILY DETAILS */}
        {activeSection === 'family' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  {t('fatherName')}
                </label>
                <input
                  type="text"
                  value={data.family.fatherName}
                  onChange={(e) => updateFamily('fatherName', e.target.value)}
                  placeholder="e.g. श्री दिनेश कुमार शर्मा"
                  className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  {t('fatherOccupation')}
                </label>
                <input
                  type="text"
                  value={data.family.fatherOccupation}
                  onChange={(e) => updateFamily('fatherOccupation', e.target.value)}
                  placeholder="e.g. Senior Manager, SBI / Businessman"
                  className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  {t('motherName')}
                </label>
                <input
                  type="text"
                  value={data.family.motherName}
                  onChange={(e) => updateFamily('motherName', e.target.value)}
                  placeholder="e.g. श्रीमती सुनीता शर्मा"
                  className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  {t('motherOccupation')}
                </label>
                <input
                  type="text"
                  value={data.family.motherOccupation}
                  onChange={(e) => updateFamily('motherOccupation', e.target.value)}
                  placeholder="e.g. Homemaker / Teacher"
                  className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">
                {t('siblingsCustom')} (भाई-बहन का विवरण)
              </label>
              <input
                type="text"
                value={data.family.siblingsCustom || ''}
                onChange={(e) => updateFamily('siblingsCustom', e.target.value)}
                placeholder="e.g. 1 बड़ा भाई (विवाहित, डॉक्टर), 1 छोटी बहन (MBA)"
                className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  {t('familyType')}
                </label>
                <select
                  value={data.family.familyType}
                  onChange={(e) =>
                    updateFamily('familyType', e.target.value as 'nuclear' | 'joint')
                  }
                  className="w-full text-xs h-9 rounded-md border border-border bg-background px-2.5 text-foreground focus:ring-1 focus:ring-primary"
                >
                  <option value="nuclear">{t('nuclear')}</option>
                  <option value="joint">{t('joint')}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  {t('nativePlace')}
                </label>
                <input
                  type="text"
                  value={data.family.nativePlace || ''}
                  onChange={(e) => updateFamily('nativePlace', e.target.value)}
                  placeholder="e.g. जयपुर, राजस्थान / Jaipur"
                  className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">
                {t('aboutFamily')} (वैकल्पिक)
              </label>
              <textarea
                rows={2}
                value={data.family.aboutFamily || ''}
                onChange={(e) => updateFamily('aboutFamily', e.target.value)}
                placeholder="e.g. संस्कारी, सुशिक्षित एवं प्रतिष्ठित परिवार।"
                className="w-full text-xs rounded-md border border-border bg-background p-2.5 text-foreground focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        )}

        {/* 3. HOROSCOPE DETAILS */}
        {activeSection === 'horoscope' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
              <div>
                <p className="text-xs font-bold text-foreground">
                  Include Horoscope in Biodata
                </p>
                <p className="text-[11px] text-muted-foreground">
                  कुंडली विवरण (राशि, नक्षत्र, मांगलिक स्थिति) जोड़ें
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.horoscope.enabled}
                  onChange={(e) => updateHoroscope('enabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            {data.horoscope.enabled && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    {t('rashi')} (Moon Sign)
                  </label>
                  <input
                    type="text"
                    value={data.horoscope.rashi || ''}
                    onChange={(e) => updateHoroscope('rashi', e.target.value)}
                    placeholder="e.g. सिंह (Leo) / मेष (Aries)"
                    className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    {t('nakshatra')}
                  </label>
                  <input
                    type="text"
                    value={data.horoscope.nakshatra || ''}
                    onChange={(e) => updateHoroscope('nakshatra', e.target.value)}
                    placeholder="e.g. मघा / Magha / रोहिणी"
                    className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    {t('manglik')}
                  </label>
                  <select
                    value={data.horoscope.manglik}
                    onChange={(e) => updateHoroscope('manglik', e.target.value)}
                    className="w-full text-xs h-9 rounded-md border border-border bg-background px-2.5 text-foreground focus:ring-1 focus:ring-primary"
                  >
                    <option value="no">{t('manglikNo')}</option>
                    <option value="yes">{t('manglikYes')}</option>
                    <option value="anshik">{t('manglikAnshik')}</option>
                    <option value="dont_know">{t('manglikDontKnow')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    {t('birthTime')} (जन्म समय)
                  </label>
                  <input
                    type="text"
                    value={data.horoscope.birthTime || ''}
                    onChange={(e) => updateHoroscope('birthTime', e.target.value)}
                    placeholder="e.g. 06:45 AM"
                    className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    {t('birthPlace')} (जन्म स्थान)
                  </label>
                  <input
                    type="text"
                    value={data.horoscope.birthPlace || ''}
                    onChange={(e) => updateHoroscope('birthPlace', e.target.value)}
                    placeholder="e.g. Jaipur, Rajasthan"
                    className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    {t('gan')} (गण)
                  </label>
                  <input
                    type="text"
                    value={data.horoscope.gan || ''}
                    onChange={(e) => updateHoroscope('gan', e.target.value)}
                    placeholder="e.g. Deva / देव / Manushya"
                    className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. ABOUT & EXPECTATIONS (WITH AI INTEGRATION) */}
        {activeSection === 'about' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between p-3 rounded-lg border border-amber-500/30 bg-amber-500/5">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500">
                  <Sparkles className="size-4" />
                  <span>AI Matrimonial Bio Assistant</span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Generate personality description & expectations tailored to your inputs.
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => setIsAiModalOpen(true)}
                className="gap-1.5 h-8 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white"
              >
                <Sparkles className="size-3.5" />
                <span>AI Assist</span>
              </Button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">
                {t('aboutMeTitle')} (व्यक्तिगत परिचय / स्वभाव)
              </label>
              <textarea
                rows={3}
                value={data.aboutMe}
                onChange={(e) =>
                  onChange((prev) => ({ ...prev, aboutMe: e.target.value }))
                }
                placeholder="अपने स्वभाव, जीवनशैली और रुचियों के बारे में लिखें..."
                className="w-full text-xs rounded-md border border-border bg-background p-2.5 text-foreground focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">
                {t('partnerExpectationsTitle')} (जीवनसाथी से अपेक्षाएं)
              </label>
              <textarea
                rows={2}
                value={data.partnerExpectations || ''}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    partnerExpectations: e.target.value,
                  }))
                }
                placeholder="सुशिक्षित, संस्कारी एवं समझदार जीवनसाथी..."
                className="w-full text-xs rounded-md border border-border bg-background p-2.5 text-foreground focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">
                {t('hobbiesTitle')} (शौक एवं रुचियां)
              </label>
              <input
                type="text"
                value={data.hobbies || ''}
                onChange={(e) =>
                  onChange((prev) => ({ ...prev, hobbies: e.target.value }))
                }
                placeholder="e.g. संगीत, यात्रा, पठन, बैडमिंटन"
                className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        )}

        {/* 5. CONTACT DETAILS */}
        {activeSection === 'contact' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  {t('phone')} *
                </label>
                <input
                  type="text"
                  value={data.contact.phone}
                  onChange={(e) => updateContact('phone', e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  {t('altPhone')}
                </label>
                <input
                  type="text"
                  value={data.contact.altPhone || ''}
                  onChange={(e) => updateContact('altPhone', e.target.value)}
                  placeholder="e.g. +91 98111 22334"
                  className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  {t('email')}
                </label>
                <input
                  type="email"
                  value={data.contact.email}
                  onChange={(e) => updateContact('email', e.target.value)}
                  placeholder="e.g. rahul.sharma@example.com"
                  className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  {t('address')} (निवास का पता)
                </label>
                <textarea
                  rows={2}
                  value={data.contact.address}
                  onChange={(e) => updateContact('address', e.target.value)}
                  placeholder="e.g. H-42, Model Town, Phase 2, New Delhi - 110009"
                  className="w-full text-xs rounded-md border border-border bg-background p-2.5 text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  {t('referenceContact')} (वैकल्पिक)
                </label>
                <input
                  type="text"
                  value={data.contact.referenceContact || ''}
                  onChange={(e) =>
                    updateContact('referenceContact', e.target.value)
                  }
                  placeholder="e.g. श्री आर. के. शर्मा (मामा जी, पुलिस अधीक्षक)"
                  className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Modal */}
      <AiBiodataModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        data={data}
        onApply={(aboutMe, partnerExpectations) => {
          onChange((prev) => ({
            ...prev,
            aboutMe: aboutMe || prev.aboutMe,
            partnerExpectations: partnerExpectations || prev.partnerExpectations,
          }))
        }}
      />
    </div>
  )
}
