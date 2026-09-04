import React from 'react'
import type { BiodataData } from '@/lib/biodata-types'
import {
  KhandaIcon,
  EkOnkarIcon,
  HeaderFlourish,
} from '../biodata-decorations'

interface TemplateProps {
  data: BiodataData
  t: (key: string) => string
}

export function GoldenTempleRoyalTemplate({ data, t }: TemplateProps) {
  const { personal, family, religionDetails, contact, customSections } = data

  const photoFrameClass =
    data.photoFrame === 'circle'
      ? 'rounded-full border-4 border-[#EAB308]'
      : data.photoFrame === 'ornate'
        ? 'rounded-md border-3 border-[#EAB308] p-1 bg-[#1E1B4B]/20 shadow-lg'
        : 'rounded-lg border-2 border-[#EAB308]'

  return (
    <div
      className="relative w-full max-w-[794px] min-h-[1123px] bg-[#FCFBF7] text-[#1E1B4B] p-8 sm:p-10 shadow-2xl mx-auto overflow-hidden border-[8px] border-[#1E1B4B]"
      style={{
        fontFamily: 'var(--font-devanagari-sans), "Noto Sans Devanagari", sans-serif',
      }}
    >
      <div className="absolute inset-2 border-2 border-[#EAB308] pointer-events-none rounded-sm">
        <div className="absolute inset-1 border border-[#EAB308]/40" />
      </div>

      <div className="relative z-10 text-center pt-2 pb-4">
        <div className="flex justify-center mb-1">
          {data.headerSymbol === 'ekonkar' ? (
            <EkOnkarIcon className="size-12" color="#EAB308" />
          ) : (
            <KhandaIcon className="size-12" color="#EAB308" />
          )}
        </div>
        <div className="inline-block bg-[#1E1B4B] text-[#FEF08A] px-6 py-1.5 rounded shadow-sm border-b-2 border-[#EAB308]">
          <h1 className="text-xl sm:text-2xl font-bold tracking-wider uppercase" style={{ fontFamily: 'serif' }}>
            {personal.fullName || 'Candidate Name'}
          </h1>
        </div>
        <div className="flex justify-center mt-2">
          <HeaderFlourish className="w-48 h-3.5" color="#EAB308" />
        </div>
      </div>

      {data.showPhoto && data.photo && (
        <div className="relative z-10 flex items-center justify-center mb-3">
          <div className={`size-28 sm:size-32 overflow-hidden bg-white shadow-md ${photoFrameClass}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.photo} alt={personal.fullName} className="size-full object-cover object-center" />
          </div>
        </div>
      )}

      <div className="relative z-10 space-y-4 px-2 sm:px-4">
        <section className="bg-white rounded-xl p-4 border border-[#1E1B4B]/20 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#1E1B4B]/20 pb-1.5 mb-2.5">
            <h3 className="text-sm sm:text-base font-bold text-[#1E1B4B] uppercase tracking-wider" style={{ fontFamily: 'serif' }}>
              Personal & Education
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-sm">
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#1E1B4B] shrink-0">Name:</span><span className="font-bold text-slate-900">{personal.fullName}</span></div>
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#1E1B4B] shrink-0">Date of Birth:</span><span className="text-slate-800">{personal.dob}</span></div>
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#1E1B4B] shrink-0">Age / Height:</span><span className="text-slate-800">{personal.age} | {personal.height}</span></div>
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#1E1B4B] shrink-0">Marital Status:</span><span className="text-slate-800">{personal.maritalStatus}</span></div>
            <div className="flex items-baseline sm:col-span-2"><span className="w-28 sm:w-32 font-semibold text-[#1E1B4B] shrink-0">Education:</span><span className="font-semibold text-slate-900">{personal.education}</span></div>
            <div className="flex items-baseline sm:col-span-2"><span className="w-28 sm:w-32 font-semibold text-[#1E1B4B] shrink-0">Profession:</span><span className="font-semibold text-slate-900">{personal.occupation} {personal.company ? `at ${personal.company}` : ''}</span></div>
            {personal.income && <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#1E1B4B] shrink-0">Income:</span><span className="font-medium text-[#1E1B4B]">{personal.income}</span></div>}
          </div>
        </section>

        <section className="bg-[#1E1B4B]/5 rounded-xl p-4 border border-[#1E1B4B]/20 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#1E1B4B]/20 pb-1.5 mb-2.5">
            <h3 className="text-sm sm:text-base font-bold text-[#1E1B4B] uppercase tracking-wider" style={{ fontFamily: 'serif' }}>
              Ancestral Roots & Pind
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-sm">
            {religionDetails.pind && <div className="flex items-baseline sm:col-span-2"><span className="w-28 sm:w-32 font-semibold text-[#1E1B4B] shrink-0">Ancestral Pind:</span><span className="text-slate-900 font-medium">{religionDetails.pind}</span></div>}
            {religionDetails.nankey && <div className="flex items-baseline sm:col-span-2"><span className="w-28 sm:w-32 font-semibold text-[#1E1B4B] shrink-0">Nankey:</span><span className="text-slate-800">{religionDetails.nankey}</span></div>}
          </div>
        </section>

        <section className="bg-white rounded-xl p-4 border border-[#1E1B4B]/20 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#1E1B4B]/20 pb-1.5 mb-2.5">
            <h3 className="text-sm sm:text-base font-bold text-[#1E1B4B] uppercase tracking-wider" style={{ fontFamily: 'serif' }}>
              Family Details
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-sm">
            <div className="flex items-baseline sm:col-span-2"><span className="w-28 sm:w-32 font-semibold text-[#1E1B4B] shrink-0">Father:</span><span className="text-slate-900 font-medium">{family.fatherName} ({family.fatherOccupation})</span></div>
            <div className="flex items-baseline sm:col-span-2"><span className="w-28 sm:w-32 font-semibold text-[#1E1B4B] shrink-0">Mother:</span><span className="text-slate-900 font-medium">{family.motherName} ({family.motherOccupation})</span></div>
            <div className="flex items-baseline sm:col-span-2"><span className="w-28 sm:w-32 font-semibold text-[#1E1B4B] shrink-0">Siblings:</span><span className="text-slate-800">{family.siblingsCustom || `${family.brothersCount} Brothers, ${family.sistersCount} Sisters`}</span></div>
          </div>
        </section>

        {customSections.map((sec) => (
          <section key={sec.id} className="bg-white rounded-xl p-4 border border-[#1E1B4B]/20 shadow-xs space-y-1.5">
            <h3 className="text-xs sm:text-sm font-bold text-[#1E1B4B] uppercase tracking-wider border-b border-[#1E1B4B]/20 pb-1">{sec.title}</h3>
            <p className="text-xs sm:text-sm text-slate-700">{sec.content}</p>
          </section>
        ))}

        <section className="bg-white rounded-xl p-4 border border-[#1E1B4B]/20 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#1E1B4B]/20 pb-1.5 mb-2.5">
            <h3 className="text-sm sm:text-base font-bold text-[#1E1B4B] uppercase tracking-wider" style={{ fontFamily: 'serif' }}>Contact</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-sm">
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#1E1B4B] shrink-0">Phone:</span><span className="font-bold text-slate-900">{contact.phone}</span></div>
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#1E1B4B] shrink-0">Email:</span><span className="text-slate-800">{contact.email}</span></div>
            <div className="flex items-baseline sm:col-span-2"><span className="w-28 sm:w-32 font-semibold text-[#1E1B4B] shrink-0">Address:</span><span className="text-slate-800">{contact.address}</span></div>
          </div>
        </section>
      </div>
    </div>
  )
}
