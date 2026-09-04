'use client'

import React, { useState } from 'react'
import type {
  BiodataData,
  HeaderSymbol,
  LanguageMode,
  PhotoFrame,
  ReligionKey,
} from '@/lib/biodata-types'
import {
  User,
  Users,
  Compass,
  Phone,
  Sparkles,
  Camera,
  Trash2,
  Moon,
  Cross,
  Scroll,
  Plus,
  Layers,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AiBiodataModal } from './ai-biodata-modal'

interface BiodataEditorProps {
  data: BiodataData
  onChange: (updater: (prev: BiodataData) => BiodataData) => void
  t: (key: string) => string
}

export function BiodataEditor({ data, onChange, t }: BiodataEditorProps) {
  const [activeSection, setActiveSection] = useState<
    'personal' | 'religion' | 'family' | 'horoscope' | 'about' | 'custom' | 'contact'
  >('personal')
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

  const symbols: { id: HeaderSymbol; label: string; group: string }[] = [
    // Hindu
    { id: 'ganesh', label: 'श्री गणेश (Ganesh)', group: 'Hindu' },
    { id: 'om', label: 'ॐ (Om)', group: 'Hindu' },
    { id: 'kalash', label: 'कलश (Kalash)', group: 'Hindu' },
    { id: 'swastik', label: 'स्वस्तिक (Swastik)', group: 'Hindu' },
    // Muslim
    { id: 'bismillah', label: 'بِسْمِ اللَّهِ (Bismillah)', group: 'Muslim' },
    { id: 'crescent', label: 'चाँद-तारा (Crescent & Star)', group: 'Muslim' },
    // Sikh
    { id: 'khanda', label: 'ਖੰਡਾ (Khanda Sahib)', group: 'Sikh' },
    { id: 'ekonkar', label: 'ੴ (Ek Onkar)', group: 'Sikh' },
    // Christian
    { id: 'cross', label: 'पवित्र क्रॉस (Holy Cross)', group: 'Christian' },
    { id: 'dove', label: 'होली डव (Peace Dove)', group: 'Christian' },
    // Jain
    { id: 'navkar', label: 'णमोकार मंत्र (Navkar)', group: 'Jain' },
    { id: 'ahimsa', label: 'अहिंसा हस्त (Ahimsa Hand)', group: 'Jain' },
    // Universal
    { id: 'none', label: 'कोई नहीं (None)', group: 'Universal' },
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

  const updateReligionDetails = (field: keyof BiodataData['religionDetails'], value: unknown) => {
    onChange((prev) => ({
      ...prev,
      religionDetails: { ...prev.religionDetails, [field]: value },
    }))
  }

  const updateContact = (field: keyof BiodataData['contact'], value: string) => {
    onChange((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }))
  }

  const addCustomSection = () => {
    const id = 'sec_' + Date.now()
    onChange((prev) => ({
      ...prev,
      customSections: [
        ...prev.customSections,
        { id, title: 'Property / Assets (संपत्ति विवरण)', content: '' },
      ],
    }))
  }

  const removeCustomSection = (id: string) => {
    onChange((prev) => ({
      ...prev,
      customSections: prev.customSections.filter((s) => s.id !== id),
    }))
  }

  const updateCustomSection = (id: string, key: 'title' | 'content', val: string) => {
    onChange((prev) => ({
      ...prev,
      customSections: prev.customSections.map((s) =>
        s.id === id ? { ...s, [key]: val } : s
      ),
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
                  [{s.group}] {s.label}
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
              placeholder="e.g. || श्री गणेशाय नमः || or بِسْمِ اللَّهِ"
              className="w-full text-xs h-9 rounded-md border border-border bg-background px-2.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Photo Upload & Frame Shape */}
        <div className="p-3 rounded-lg border border-border bg-background/80 space-y-2.5">
          <div className="flex items-center justify-between">
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
                  {data.photo ? 'Photo active' : 'Optional (PNG/JPG)'}
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

          {/* Photo Frame Shape Selector */}
          {data.photo && (
            <div className="flex items-center justify-between pt-1 border-t border-border/50 text-xs">
              <span className="text-muted-foreground font-medium">Frame Shape:</span>
              <div className="inline-flex rounded-md border border-border p-0.5 bg-muted/40">
                {(['rectangle', 'circle', 'ornate'] as PhotoFrame[]).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => onChange((prev) => ({ ...prev, photoFrame: f }))}
                    className={`px-2 py-0.5 text-[11px] font-medium rounded capitalize ${
                      data.photoFrame === f
                        ? 'bg-background text-foreground shadow-2xs font-bold'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          )}
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
          onClick={() => setActiveSection('religion')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
            activeSection === 'religion'
              ? 'bg-background text-foreground shadow-2xs font-bold'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Scroll className="size-3.5 text-amber-500" />
          <span>Cultural & Faith</span>
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
          <span>Kundali</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('custom')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
            activeSection === 'custom'
              ? 'bg-background text-foreground shadow-2xs font-bold'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Layers className="size-3.5" />
          <span>Custom</span>
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
                placeholder="Full Name / पूरा नाम"
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
                  placeholder="e.g. 29 Yrs / 29 वर्ष"
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
                  {t('complexion')} (वैकल्पिक)
                </label>
                <input
                  type="text"
                  value={data.personal.complexion || ''}
                  onChange={(e) => updatePersonal('complexion', e.target.value)}
                  placeholder="e.g. Fair / Wheatish"
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
                  placeholder="e.g. Never Married"
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
                placeholder="e.g. B.Tech / MBA / MBBS / CA"
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
                placeholder="e.g. Software Engineer / Manager / Doctor"
                className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  Company / Organization
                </label>
                <input
                  type="text"
                  value={data.personal.company || ''}
                  onChange={(e) => updatePersonal('company', e.target.value)}
                  placeholder="e.g. Google / Infosys / Govt."
                  className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  {t('income')} (वार्षिक आय)
                </label>
                <input
                  type="text"
                  value={data.personal.income || ''}
                  onChange={(e) => updatePersonal('income', e.target.value)}
                  placeholder="e.g. ₹25 LPA"
                  className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        )}

        {/* 2. RELIGIOUS & CULTURAL DETAILS */}
        {activeSection === 'religion' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Select Religious Background
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                {(['hindu', 'muslim', 'sikh', 'christian', 'jain'] as ReligionKey[]).map((rel) => (
                  <button
                    key={rel}
                    type="button"
                    onClick={() => {
                      onChange((prev) => ({
                        ...prev,
                        religionKey: rel,
                        religionDetails: { ...prev.religionDetails, selectedReligion: rel },
                      }))
                    }}
                    className={`px-2 py-1.5 text-xs font-semibold rounded-lg border capitalize transition-all ${
                      data.religionKey === rel
                        ? 'bg-primary text-primary-foreground border-primary shadow-xs font-bold'
                        : 'border-border hover:bg-muted text-muted-foreground'
                    }`}
                  >
                    {rel}
                  </button>
                ))}
              </div>
            </div>

            {/* MUSLIM FIELDS */}
            {data.religionKey === 'muslim' && (
              <div className="space-y-3 p-3 rounded-lg border border-emerald-600/30 bg-emerald-500/5">
                <p className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                  <Moon className="size-3.5" />
                  <span>Islamic Nikah Details</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                      Sect / Maslak (फ़िरक़ा)
                    </label>
                    <input
                      type="text"
                      value={data.religionDetails.maslak || ''}
                      onChange={(e) => updateReligionDetails('maslak', e.target.value)}
                      placeholder="e.g. Sunni / Hanafi / Shia"
                      className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                      Namaz (Salah Frequency)
                    </label>
                    <input
                      type="text"
                      value={data.religionDetails.namazFrequency || ''}
                      onChange={(e) => updateReligionDetails('namazFrequency', e.target.value)}
                      placeholder="e.g. 5 Times Daily / Punctual"
                      className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                      Roza (Fasting)
                    </label>
                    <input
                      type="text"
                      value={data.religionDetails.rozaFasting || ''}
                      onChange={(e) => updateReligionDetails('rozaFasting', e.target.value)}
                      placeholder="e.g. Regular during Ramadan"
                      className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                      Appearance (दाढ़ी/हिजाब)
                    </label>
                    <input
                      type="text"
                      value={data.religionDetails.hijabOrBeard || ''}
                      onChange={(e) => updateReligionDetails('hijabOrBeard', e.target.value)}
                      placeholder="e.g. Wears Hijab / Sunnah Beard"
                      className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                      Nanihal (Maternal Family)
                    </label>
                    <input
                      type="text"
                      value={data.religionDetails.nanihal || ''}
                      onChange={(e) => updateReligionDetails('nanihal', e.target.value)}
                      placeholder="e.g. Khan family of Aligarh (Educationists)"
                      className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SIKH FIELDS */}
            {data.religionKey === 'sikh' && (
              <div className="space-y-3 p-3 rounded-lg border border-amber-600/30 bg-amber-500/5">
                <p className="text-xs font-bold text-amber-700 flex items-center gap-1.5">
                  <Scroll className="size-3.5" />
                  <span>Sikh Anand Karaj Details</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                      Amritdhari Status
                    </label>
                    <select
                      value={data.religionDetails.amritdhari || 'no'}
                      onChange={(e) =>
                        updateReligionDetails(
                          'amritdhari',
                          e.target.value as 'yes' | 'no' | 'sehajdhari'
                        )
                      }
                      className="w-full text-xs h-9 rounded-md border border-border bg-background px-2.5 text-foreground"
                    >
                      <option value="no">No (Sehajdhari / Keshadhari)</option>
                      <option value="yes">Yes (Amritdhari Gursikh)</option>
                      <option value="sehajdhari">Sehajdhari</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                      Turban / Kesh
                    </label>
                    <input
                      type="text"
                      value={data.religionDetails.turbanOrKesh || ''}
                      onChange={(e) => updateReligionDetails('turbanOrKesh', e.target.value)}
                      placeholder="e.g. Turbaned / Natural Kesh"
                      className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                      Ancestral Pind (पैतृक गाँव)
                    </label>
                    <input
                      type="text"
                      value={data.religionDetails.pind || ''}
                      onChange={(e) => updateReligionDetails('pind', e.target.value)}
                      placeholder="e.g. Dhillon Kalan, District Ludhiana"
                      className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                      Nankey (Maternal Family & Pind)
                    </label>
                    <input
                      type="text"
                      value={data.religionDetails.nankey || ''}
                      onChange={(e) => updateReligionDetails('nankey', e.target.value)}
                      placeholder="e.g. Sandhu family, Kotkapura"
                      className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* CHRISTIAN FIELDS */}
            {data.religionKey === 'christian' && (
              <div className="space-y-3 p-3 rounded-lg border border-purple-600/30 bg-purple-500/5">
                <p className="text-xs font-bold text-purple-700 flex items-center gap-1.5">
                  <Cross className="size-3.5" />
                  <span>Christian Matrimony Details</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                      Denomination (Church Type)
                    </label>
                    <input
                      type="text"
                      value={data.religionDetails.denomination || ''}
                      onChange={(e) => updateReligionDetails('denomination', e.target.value)}
                      placeholder="e.g. Roman Catholic / Protestant / CSI"
                      className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                      Parish / Church Name
                    </label>
                    <input
                      type="text"
                      value={data.religionDetails.parishOrChurch || ''}
                      onChange={(e) => updateReligionDetails('parishOrChurch', e.target.value)}
                      placeholder="e.g. St. Mary's Forane Church"
                      className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                      Favorite Bible Verse
                    </label>
                    <input
                      type="text"
                      value={data.religionDetails.bibleVerse || ''}
                      onChange={(e) => updateReligionDetails('bibleVerse', e.target.value)}
                      placeholder="e.g. 1 Corinthians 13:4"
                      className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* JAIN FIELDS */}
            {data.religionKey === 'jain' && (
              <div className="space-y-3 p-3 rounded-lg border border-amber-600/30 bg-amber-500/5">
                <p className="text-xs font-bold text-amber-700 flex items-center gap-1.5">
                  <Scroll className="size-3.5" />
                  <span>जैन परंपरा एवं सात्विक विवरण</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                      संप्रदाय (Sampradaya)
                    </label>
                    <input
                      type="text"
                      value={data.religionDetails.sampradaya || ''}
                      onChange={(e) => updateReligionDetails('sampradaya', e.target.value)}
                      placeholder="e.g. श्वेतांबर / दिगंबर"
                      className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                      पंथ (Panth)
                    </label>
                    <input
                      type="text"
                      value={data.religionDetails.panth || ''}
                      onChange={(e) => updateReligionDetails('panth', e.target.value)}
                      placeholder="e.g. मूर्तिपूजक / तेरापंथी / स्थानकवासी"
                      className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground"
                    />
                  </div>
                  <div className="sm:col-span-2 flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="strictVeg"
                      checked={data.religionDetails.strictVegetarian ?? true}
                      onChange={(e) => updateReligionDetails('strictVegetarian', e.target.checked)}
                      className="size-4 rounded border-border"
                    />
                    <label htmlFor="strictVeg" className="text-xs font-semibold text-foreground">
                      शुद्ध सात्विक शाकाहारी (Strict Vegetarian)
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* HINDU FIELDS */}
            {data.religionKey === 'hindu' && (
              <div className="space-y-3 p-3 rounded-lg border border-rose-600/30 bg-rose-500/5">
                <p className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
                  <Scroll className="size-3.5" />
                  <span>हिंदू गोत्र एवं परंपरा</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                      गोत्र (Gotra)
                    </label>
                    <input
                      type="text"
                      value={data.personal.gotra || ''}
                      onChange={(e) => updatePersonal('gotra', e.target.value)}
                      placeholder="e.g. कश्यप / गर्ग / भारद्वाज"
                      className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                      जाति / उप-जाति (Subcaste)
                    </label>
                    <input
                      type="text"
                      value={data.personal.caste || ''}
                      onChange={(e) => updatePersonal('caste', e.target.value)}
                      placeholder="e.g. ब्राह्मण / अग्रवाल / राजपूत"
                      className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. FAMILY DETAILS */}
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
                  placeholder="Father's Name"
                  className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground"
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
                  placeholder="Profession / Business"
                  className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground"
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
                  placeholder="Mother's Name"
                  className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground"
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
                  placeholder="Homemaker / Teacher"
                  className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground"
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
                placeholder="e.g. 1 Elder Brother (Married), 1 Younger Sister"
                className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  {t('nativePlace')}
                </label>
                <input
                  type="text"
                  value={data.family.nativePlace || ''}
                  onChange={(e) => updateFamily('nativePlace', e.target.value)}
                  placeholder="Ancestral City / Native"
                  className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  Current City
                </label>
                <input
                  type="text"
                  value={data.family.currentCity || ''}
                  onChange={(e) => updateFamily('currentCity', e.target.value)}
                  placeholder="Current Residence City"
                  className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground"
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
                placeholder="A warm sentence about your family values..."
                className="w-full text-xs rounded-md border border-border bg-background p-2.5 text-foreground"
              />
            </div>
          </div>
        )}

        {/* 4. HOROSCOPE / KUNDALI */}
        {activeSection === 'horoscope' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
              <div>
                <p className="text-xs font-bold text-foreground">Include Horoscope (Kundali)</p>
                <p className="text-[11px] text-muted-foreground">Turn on for Rashi, Nakshatra, Manglik status</p>
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
                    placeholder="e.g. Leo / Singh / Tula"
                    className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground"
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
                    placeholder="e.g. Magha / Rohini"
                    className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    {t('manglik')}
                  </label>
                  <select
                    value={data.horoscope.manglik}
                    onChange={(e) => updateHoroscope('manglik', e.target.value)}
                    className="w-full text-xs h-9 rounded-md border border-border bg-background px-2.5 text-foreground"
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
                    className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground"
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
                    className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* 5. CUSTOM SECTIONS (PROPERTIES, NANIKAL, ETC.) */}
        {activeSection === 'custom' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-foreground">Custom Biodata Sections</p>
              <Button
                size="sm"
                variant="outline"
                onClick={addCustomSection}
                className="gap-1.5 h-8 text-xs font-semibold"
              >
                <Plus className="size-3.5" />
                <span>Add Section</span>
              </Button>
            </div>

            {data.customSections.length === 0 ? (
              <div className="text-center py-8 border-2 border-dashed border-border rounded-xl text-xs text-muted-foreground space-y-1">
                <p>No custom sections added yet.</p>
                <p className="text-[11px]">
                  Add extra details like Property & Assets, Maternal Family (ननिहाल), or Hobbies.
                </p>
              </div>
            ) : (
              data.customSections.map((sec) => (
                <div key={sec.id} className="p-3 rounded-lg border border-border bg-muted/20 space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={sec.title}
                      onChange={(e) => updateCustomSection(sec.id, 'title', e.target.value)}
                      placeholder="Section Title (e.g. Property & Assets)"
                      className="text-xs font-bold bg-transparent border-b border-border/80 focus:border-primary pb-0.5 outline-none text-foreground flex-1 mr-2"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                      onClick={() => removeCustomSection(sec.id)}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                  <textarea
                    rows={2}
                    value={sec.content}
                    onChange={(e) => updateCustomSection(sec.id, 'content', e.target.value)}
                    placeholder="Enter details here..."
                    className="w-full text-xs rounded-md border border-border bg-background p-2 text-foreground"
                  />
                </div>
              ))
            )}
          </div>
        )}

        {/* 6. ABOUT & AI ASSIST */}
        {activeSection === 'about' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between p-3 rounded-lg border border-amber-500/30 bg-amber-500/5">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500">
                  <Sparkles className="size-4" />
                  <span>AI Matrimonial Bio Assistant</span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Culturally customized bio for {data.religionKey.toUpperCase()} traditions.
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
                {t('aboutMeTitle')} (व्यक्तिगत परिचय / About Me)
              </label>
              <textarea
                rows={3}
                value={data.aboutMe}
                onChange={(e) => onChange((prev) => ({ ...prev, aboutMe: e.target.value }))}
                placeholder="A warm description of character, values, and lifestyle..."
                className="w-full text-xs rounded-md border border-border bg-background p-2.5 text-foreground"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">
                {t('partnerExpectationsTitle')} (Partner Expectations)
              </label>
              <textarea
                rows={2}
                value={data.partnerExpectations || ''}
                onChange={(e) => onChange((prev) => ({ ...prev, partnerExpectations: e.target.value }))}
                placeholder="Qualities desired in a life partner..."
                className="w-full text-xs rounded-md border border-border bg-background p-2.5 text-foreground"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">
                {t('hobbiesTitle')} (Hobbies & Interests)
              </label>
              <input
                type="text"
                value={data.hobbies || ''}
                onChange={(e) => onChange((prev) => ({ ...prev, hobbies: e.target.value }))}
                placeholder="e.g. Travel, Reading, Music, Fitness"
                className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground"
              />
            </div>
          </div>
        )}

        {/* 7. CONTACT DETAILS */}
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
                  placeholder="+91 98765 43210"
                  className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground"
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
                  placeholder="Alternate Contact Number"
                  className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground"
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
                  placeholder="email@example.com"
                  className="w-full text-xs h-9 rounded-md border border-border bg-background px-3 text-foreground"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  {t('address')}
                </label>
                <textarea
                  rows={2}
                  value={data.contact.address}
                  onChange={(e) => updateContact('address', e.target.value)}
                  placeholder="Residential Address"
                  className="w-full text-xs rounded-md border border-border bg-background p-2.5 text-foreground"
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
