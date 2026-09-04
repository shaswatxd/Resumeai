import React from 'react'
import type { BiodataData } from '@/lib/biodata-types'
import {
  ChristianCrossIcon,
  PeaceDoveIcon,
  HeaderFlourish,
} from '../biodata-decorations'

interface TemplateProps {
  data: BiodataData
  t: (key: string) => string
}

export function HolyMatrimonyTemplate({ data, t }: TemplateProps) {
  const { personal, family, religionDetails, contact, customSections } = data

  const photoFrameClass =
    data.photoFrame === 'circle'
      ? 'rounded-full border-4 border-[#831843]'
      : data.photoFrame === 'ornate'
        ? 'rounded-md border-3 border-[#831843] p-1 bg-[#831843]/10 shadow-lg'
        : 'rounded-lg border-2 border-[#831843]'

  return (
    <div
      className="relative w-full max-w-[794px] min-h-[1123px] bg-[#FFFDFE] text-[#1E293B] p-8 sm:p-10 shadow-2xl mx-auto overflow-hidden border-[10px] border-[#831843]"
      style={{
        fontFamily: 'var(--font-devanagari-sans), "Noto Sans Devanagari", sans-serif',
      }}
    >
      <div className="absolute inset-2 border-2 border-[#D4AF37] pointer-events-none rounded-sm">
        <div className="absolute inset-1 border border-[#D4AF37]/40" />
      </div>

      <div className="relative z-10 text-center pt-2 pb-4">
        <div className="flex justify-center mb-1 drop-shadow-sm">
          {data.headerSymbol === 'dove' ? (
            <PeaceDoveIcon className="size-12" color="#831843" />
          ) : (
            <ChristianCrossIcon className="size-12" color="#831843" />
          )}
        </div>

        <div className="text-xs sm:text-sm font-bold tracking-widest text-[#831843] uppercase">
          {data.headerTitle || '† In God’s Grace · Holy Matrimony †'}
        </div>

        <h1
          className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] tracking-wide uppercase mt-1"
          style={{ fontFamily: 'var(--font-cinzel), serif' }}
        >
          {personal.fullName || 'Candidate Name'}
        </h1>
        <div className="flex justify-center mt-1">
          <HeaderFlourish className="w-48 h-3.5" color="#D4AF37" />
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
        {/* Personal & Professional Profile */}
        <section className="bg-white rounded-xl p-4 border border-[#831843]/20 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#831843]/20 pb-1.5 mb-2.5">
            <div className="size-2 rounded-full bg-[#831843]" />
            <h3 className="text-sm sm:text-base font-bold text-[#831843] uppercase tracking-wider" style={{ fontFamily: 'serif' }}>
              Personal Details & Career
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-sm">
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#831843] shrink-0">Full Name:</span><span className="font-bold text-slate-900">{personal.fullName}</span></div>
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#831843] shrink-0">Date of Birth:</span><span className="text-slate-800">{personal.dob}</span></div>
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#831843] shrink-0">Age / Height:</span><span className="text-slate-800">{personal.age} | {personal.height}</span></div>
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#831843] shrink-0">Marital Status:</span><span className="text-slate-800">{personal.maritalStatus}</span></div>
            <div className="flex items-baseline sm:col-span-2"><span className="w-28 sm:w-32 font-semibold text-[#831843] shrink-0">Education:</span><span className="font-semibold text-slate-900">{personal.education}</span></div>
            <div className="flex items-baseline sm:col-span-2"><span className="w-28 sm:w-32 font-semibold text-[#831843] shrink-0">Profession:</span><span className="font-semibold text-slate-900">{personal.occupation} {personal.company ? `at ${personal.company}` : ''}</span></div>
            {personal.income && <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#831843] shrink-0">Income:</span><span className="font-medium text-[#831843]">{personal.income}</span></div>}
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#831843] shrink-0">Community:</span><span className="text-slate-800">{personal.caste || 'Christian'}</span></div>
          </div>
        </section>

        {/* Church & Spiritual Background */}
        <section className="bg-[#831843]/5 rounded-xl p-4 border border-[#831843]/20 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#831843]/20 pb-1.5 mb-2.5">
            <div className="size-2 rounded-full bg-[#D4AF37]" />
            <h3 className="text-sm sm:text-base font-bold text-[#831843] uppercase tracking-wider" style={{ fontFamily: 'serif' }}>
              Church Affiliation & Faith
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-sm">
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#831843] shrink-0">Denomination:</span><span className="font-medium text-slate-900">{religionDetails.denomination || 'Catholic / Protestant'}</span></div>
            {religionDetails.parishOrChurch && <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#831843] shrink-0">Parish/Church:</span><span className="font-medium text-slate-900">{religionDetails.parishOrChurch}</span></div>}
            {religionDetails.baptized && <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#831843] shrink-0">Baptized:</span><span className="text-slate-800 uppercase">{religionDetails.baptized}</span></div>}
            {religionDetails.pastorReference && <div className="flex items-baseline sm:col-span-2"><span className="w-28 sm:w-32 font-semibold text-[#831843] shrink-0">Pastor Ref:</span><span className="text-slate-800">{religionDetails.pastorReference}</span></div>}
            {religionDetails.bibleVerse && <div className="flex items-baseline sm:col-span-2"><span className="w-28 sm:w-32 font-semibold text-[#831843] shrink-0">Favorite Verse:</span><span className="text-slate-700 italic">{religionDetails.bibleVerse}</span></div>}
          </div>
        </section>

        {/* Family Details */}
        <section className="bg-white rounded-xl p-4 border border-[#831843]/20 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#831843]/20 pb-1.5 mb-2.5">
            <div className="size-2 rounded-full bg-[#831843]" />
            <h3 className="text-sm sm:text-base font-bold text-[#831843] uppercase tracking-wider" style={{ fontFamily: 'serif' }}>
              Family Details
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-sm">
            <div className="flex items-baseline sm:col-span-2"><span className="w-28 sm:w-32 font-semibold text-[#831843] shrink-0">Father:</span><span className="text-slate-900 font-medium">{family.fatherName} ({family.fatherOccupation})</span></div>
            <div className="flex items-baseline sm:col-span-2"><span className="w-28 sm:w-32 font-semibold text-[#831843] shrink-0">Mother:</span><span className="text-slate-900 font-medium">{family.motherName} ({family.motherOccupation})</span></div>
            <div className="flex items-baseline sm:col-span-2"><span className="w-28 sm:w-32 font-semibold text-[#831843] shrink-0">Siblings:</span><span className="text-slate-800">{family.siblingsCustom || `${family.brothersCount} Brothers, ${family.sistersCount} Sisters`}</span></div>
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#831843] shrink-0">Native Place:</span><span className="text-slate-800">{family.nativePlace}</span></div>
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#831843] shrink-0">Current City:</span><span className="text-slate-800">{family.currentCity}</span></div>
          </div>
        </section>

        {customSections.map((sec) => (
          <section key={sec.id} className="bg-white rounded-xl p-4 border border-[#831843]/20 shadow-xs space-y-1.5">
            <h3 className="text-xs sm:text-sm font-bold text-[#831843] uppercase tracking-wider border-b border-[#831843]/20 pb-1">{sec.title}</h3>
            <p className="text-xs sm:text-sm text-slate-700">{sec.content}</p>
          </section>
        ))}

        {/* Contact */}
        <section className="bg-white rounded-xl p-4 border border-[#831843]/20 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#831843]/20 pb-1.5 mb-2.5">
            <div className="size-2 rounded-full bg-[#831843]" />
            <h3 className="text-sm sm:text-base font-bold text-[#831843] uppercase tracking-wider" style={{ fontFamily: 'serif' }}>Contact</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-sm">
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#831843] shrink-0">Phone:</span><span className="font-bold text-slate-900">{contact.phone}</span></div>
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#831843] shrink-0">Email:</span><span className="text-slate-800">{contact.email}</span></div>
            <div className="flex items-baseline sm:col-span-2"><span className="w-28 sm:w-32 font-semibold text-[#831843] shrink-0">Address:</span><span className="text-slate-800">{contact.address}</span></div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center pt-5 pb-1">
        <p className="text-xs text-[#831843] tracking-widest font-semibold" style={{ fontFamily: 'serif' }}>
          † Therefore what God has joined together, let no one separate. — Mark 10:9 †
        </p>
      </div>
    </div>
  )
}
