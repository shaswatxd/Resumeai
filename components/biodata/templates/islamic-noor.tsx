import React from 'react'
import type { BiodataData } from '@/lib/biodata-types'
import {
  BismillahCalligraphy,
  CrescentStarIcon,
  HeaderFlourish,
} from '../biodata-decorations'

interface TemplateProps {
  data: BiodataData
  t: (key: string) => string
}

export function IslamicNoorTemplate({ data, t }: TemplateProps) {
  const { personal, family, religionDetails, contact, customSections } = data

  const photoFrameClass =
    data.photoFrame === 'circle'
      ? 'rounded-full border-4 border-[#D4AF37]'
      : data.photoFrame === 'ornate'
        ? 'rounded-md border-3 border-[#D4AF37] p-1 bg-[#064E3B]/20 shadow-lg'
        : 'rounded-lg border-2 border-[#D4AF37]'

  return (
    <div
      className="relative w-full max-w-[794px] min-h-[1123px] bg-[#FBFDFB] text-[#132A1C] p-8 sm:p-10 shadow-2xl mx-auto overflow-hidden border-[10px] border-[#064E3B]"
      style={{
        fontFamily: 'var(--font-devanagari-sans), "Noto Sans Devanagari", sans-serif',
      }}
    >
      {/* Inner Emerald & Gold Frame */}
      <div className="absolute inset-2 border-2 border-[#D4AF37] pointer-events-none rounded-sm">
        <div className="absolute inset-1 border border-[#D4AF37]/40" />
      </div>

      {/* Islamic Arch Header Banner */}
      <div className="relative z-10 text-center pt-2 pb-4">
        {data.headerSymbol === 'crescent' ? (
          <div className="flex justify-center mb-1">
            <CrescentStarIcon className="size-12" color="#064E3B" />
          </div>
        ) : (
          <div className="flex justify-center mb-1">
            <BismillahCalligraphy className="w-64 h-12" color="#064E3B" />
          </div>
        )}

        <div className="mt-1">
          <span
            className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase bg-[#064E3B] px-4 py-1 rounded-full shadow-xs"
            style={{ fontFamily: 'serif' }}
          >
            Nikah Matrimonial Biodata
          </span>
        </div>

        <h1
          className="text-2xl sm:text-3xl font-extrabold text-[#064E3B] tracking-wide uppercase mt-2"
          style={{ fontFamily: 'var(--font-cinzel), serif' }}
        >
          {personal.fullName || 'Candidate Name'}
        </h1>
        <div className="flex justify-center mt-1">
          <HeaderFlourish className="w-48 h-3.5" color="#D4AF37" />
        </div>
      </div>

      {/* Photo Row (if enabled) */}
      {data.showPhoto && data.photo && (
        <div className="relative z-10 flex items-center justify-center mb-3">
          <div className={`size-28 sm:size-32 overflow-hidden bg-white shadow-md ${photoFrameClass}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.photo}
              alt={personal.fullName}
              className="size-full object-cover object-center"
            />
          </div>
        </div>
      )}

      {/* Main Sections Grid */}
      <div className="relative z-10 space-y-4 px-2 sm:px-4">
        {/* 1. Personal & Professional Details */}
        <section className="bg-white/80 rounded-xl p-4 border border-[#064E3B]/20 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#064E3B]/30 pb-1.5 mb-2.5">
            <div className="size-2 rounded-full bg-[#064E3B]" />
            <h3
              className="text-sm sm:text-base font-bold text-[#064E3B] uppercase tracking-wider"
              style={{ fontFamily: 'serif' }}
            >
              Personal & Professional Profile
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-sm">
            <div className="flex items-baseline">
              <span className="w-28 sm:w-32 font-semibold text-[#064E3B] shrink-0">Full Name:</span>
              <span className="font-bold text-slate-900">{personal.fullName || '—'}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-28 sm:w-32 font-semibold text-[#064E3B] shrink-0">Date of Birth:</span>
              <span className="text-slate-800">{personal.dob || '—'}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-28 sm:w-32 font-semibold text-[#064E3B] shrink-0">Age / Height:</span>
              <span className="text-slate-800">{personal.age || '—'} | {personal.height || '—'}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-28 sm:w-32 font-semibold text-[#064E3B] shrink-0">Marital Status:</span>
              <span className="text-slate-800">{personal.maritalStatus || 'Never Married'}</span>
            </div>
            {personal.complexion && (
              <div className="flex items-baseline">
                <span className="w-28 sm:w-32 font-semibold text-[#064E3B] shrink-0">Complexion:</span>
                <span className="text-slate-800">{personal.complexion}</span>
              </div>
            )}
            <div className="flex items-baseline sm:col-span-2">
              <span className="w-28 sm:w-32 font-semibold text-[#064E3B] shrink-0">Education:</span>
              <span className="font-semibold text-slate-900">
                {personal.education}
                {personal.educationDetail ? ` (${personal.educationDetail})` : ''}
              </span>
            </div>
            <div className="flex items-baseline sm:col-span-2">
              <span className="w-28 sm:w-32 font-semibold text-[#064E3B] shrink-0">Profession:</span>
              <span className="font-semibold text-slate-900">
                {personal.occupation}
                {personal.company ? ` at ${personal.company}` : ''}
              </span>
            </div>
            {personal.income && (
              <div className="flex items-baseline">
                <span className="w-28 sm:w-32 font-semibold text-[#064E3B] shrink-0">Income:</span>
                <span className="font-medium text-[#064E3B]">{personal.income}</span>
              </div>
            )}
            <div className="flex items-baseline">
              <span className="w-28 sm:w-32 font-semibold text-[#064E3B] shrink-0">Caste / Lineage:</span>
              <span className="text-slate-800">
                {personal.caste || 'Muslim'}
                {personal.subcaste ? ` (${personal.subcaste})` : ''}
              </span>
            </div>
          </div>
        </section>

        {/* 2. Islamic Religious Practice & Deen Details */}
        <section className="bg-[#064E3B]/5 rounded-xl p-4 border border-[#064E3B]/25 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#064E3B]/30 pb-1.5 mb-2.5">
            <div className="size-2 rounded-full bg-[#D4AF37]" />
            <h3
              className="text-sm sm:text-base font-bold text-[#064E3B] uppercase tracking-wider"
              style={{ fontFamily: 'serif' }}
            >
              Religious Background & Deen
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-sm">
            <div className="flex items-baseline">
              <span className="w-28 sm:w-32 font-semibold text-[#064E3B] shrink-0">Sect / Maslak:</span>
              <span className="font-medium text-slate-900">{religionDetails.maslak || 'Sunni / Hanafi'}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-28 sm:w-32 font-semibold text-[#064E3B] shrink-0">Namaz (Salah):</span>
              <span className="font-medium text-slate-900">{religionDetails.namazFrequency || '5 Times Daily'}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-28 sm:w-32 font-semibold text-[#064E3B] shrink-0">Roza (Fasting):</span>
              <span className="text-slate-800">{religionDetails.rozaFasting || 'Regular in Ramadan'}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-28 sm:w-32 font-semibold text-[#064E3B] shrink-0">Quran Status:</span>
              <span className="text-slate-800">{religionDetails.quranStatus || 'Nazira'}</span>
            </div>
            {religionDetails.hijabOrBeard && (
              <div className="flex items-baseline">
                <span className="w-28 sm:w-32 font-semibold text-[#064E3B] shrink-0">Appearance:</span>
                <span className="text-slate-800">{religionDetails.hijabOrBeard}</span>
              </div>
            )}
            {religionDetails.mahrExpectation && (
              <div className="flex items-baseline">
                <span className="w-28 sm:w-32 font-semibold text-[#064E3B] shrink-0">Mahr:</span>
                <span className="text-slate-800">{religionDetails.mahrExpectation}</span>
              </div>
            )}
          </div>
        </section>

        {/* 3. Family Background & Walidain */}
        <section className="bg-white/80 rounded-xl p-4 border border-[#064E3B]/20 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#064E3B]/30 pb-1.5 mb-2.5">
            <div className="size-2 rounded-full bg-[#064E3B]" />
            <h3
              className="text-sm sm:text-base font-bold text-[#064E3B] uppercase tracking-wider"
              style={{ fontFamily: 'serif' }}
            >
              Family Background (Khandaan)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-sm">
            <div className="flex items-baseline sm:col-span-2">
              <span className="w-28 sm:w-32 font-semibold text-[#064E3B] shrink-0">Father’s Name:</span>
              <span className="font-medium text-slate-900">
                {family.fatherName}
                {family.fatherOccupation ? ` (${family.fatherOccupation})` : ''}
              </span>
            </div>
            <div className="flex items-baseline sm:col-span-2">
              <span className="w-28 sm:w-32 font-semibold text-[#064E3B] shrink-0">Mother’s Name:</span>
              <span className="font-medium text-slate-900">
                {family.motherName}
                {family.motherOccupation ? ` (${family.motherOccupation})` : ''}
              </span>
            </div>
            <div className="flex items-baseline sm:col-span-2">
              <span className="w-28 sm:w-32 font-semibold text-[#064E3B] shrink-0">Siblings:</span>
              <span className="text-slate-800">{family.siblingsCustom || `${family.brothersCount} Brothers, ${family.sistersCount} Sisters`}</span>
            </div>
            {religionDetails.nanihal && (
              <div className="flex items-baseline sm:col-span-2">
                <span className="w-28 sm:w-32 font-semibold text-[#064E3B] shrink-0">Nanihal (Maternal):</span>
                <span className="text-slate-800">{religionDetails.nanihal}</span>
              </div>
            )}
            <div className="flex items-baseline">
              <span className="w-28 sm:w-32 font-semibold text-[#064E3B] shrink-0">Native Place:</span>
              <span className="text-slate-800">{family.nativePlace || '—'}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-28 sm:w-32 font-semibold text-[#064E3B] shrink-0">Current City:</span>
              <span className="text-slate-800">{family.currentCity || '—'}</span>
            </div>
            {family.aboutFamily && (
              <div className="flex items-baseline sm:col-span-2">
                <span className="w-28 sm:w-32 font-semibold text-[#064E3B] shrink-0">About Family:</span>
                <span className="text-slate-700 italic">{family.aboutFamily}</span>
              </div>
            )}
          </div>
        </section>

        {/* 4. About & Partner Preferences */}
        {(data.aboutMe || data.partnerExpectations) && (
          <section className="bg-white/80 rounded-xl p-4 border border-[#064E3B]/20 shadow-xs space-y-2">
            <div className="flex items-center gap-2 border-b border-[#064E3B]/30 pb-1.5">
              <div className="size-2 rounded-full bg-[#064E3B]" />
              <h3 className="text-sm sm:text-base font-bold text-[#064E3B] uppercase tracking-wider" style={{ fontFamily: 'serif' }}>
                About Me & Partner Preferences
              </h3>
            </div>
            {data.aboutMe && <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{data.aboutMe}</p>}
            {data.partnerExpectations && (
              <div className="pt-1 text-xs sm:text-sm">
                <span className="font-semibold text-[#064E3B]">Partner Expectations: </span>
                <span className="text-slate-700 italic">{data.partnerExpectations}</span>
              </div>
            )}
          </section>
        )}

        {/* 5. Custom Sections (if added) */}
        {customSections.map((sec) => (
          <section key={sec.id} className="bg-white/80 rounded-xl p-4 border border-[#064E3B]/20 shadow-xs space-y-1.5">
            <h3 className="text-xs sm:text-sm font-bold text-[#064E3B] uppercase tracking-wider border-b border-[#064E3B]/20 pb-1">
              {sec.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700">{sec.content}</p>
          </section>
        ))}

        {/* 6. Contact Details */}
        <section className="bg-white/80 rounded-xl p-4 border border-[#064E3B]/20 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#064E3B]/30 pb-1.5 mb-2.5">
            <div className="size-2 rounded-full bg-[#064E3B]" />
            <h3 className="text-sm sm:text-base font-bold text-[#064E3B] uppercase tracking-wider" style={{ fontFamily: 'serif' }}>
              Contact & Guardians
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-sm">
            <div className="flex items-baseline">
              <span className="w-28 sm:w-32 font-semibold text-[#064E3B] shrink-0">Phone:</span>
              <span className="font-bold text-slate-900">{contact.phone || '—'}</span>
            </div>
            {contact.altPhone && (
              <div className="flex items-baseline">
                <span className="w-28 sm:w-32 font-semibold text-[#064E3B] shrink-0">Alt Phone:</span>
                <span className="text-slate-800">{contact.altPhone}</span>
              </div>
            )}
            {contact.email && (
              <div className="flex items-baseline">
                <span className="w-28 sm:w-32 font-semibold text-[#064E3B] shrink-0">Email:</span>
                <span className="text-slate-800">{contact.email}</span>
              </div>
            )}
            <div className="flex items-baseline sm:col-span-2">
              <span className="w-28 sm:w-32 font-semibold text-[#064E3B] shrink-0">Address:</span>
              <span className="text-slate-800">{contact.address || '—'}</span>
            </div>
            {contact.referenceContact && (
              <div className="flex items-baseline sm:col-span-2">
                <span className="w-28 sm:w-32 font-semibold text-[#064E3B] shrink-0">Guardian / Ref:</span>
                <span className="text-slate-800">{contact.referenceContact}</span>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Footer Dua */}
      <div className="relative z-10 text-center pt-5 pb-1">
        <p className="text-xs text-[#064E3B] tracking-widest font-semibold" style={{ fontFamily: 'serif' }}>
          بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
        </p>
      </div>
    </div>
  )
}
