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

export function AnandKarajTemplate({ data, t }: TemplateProps) {
  const { personal, family, religionDetails, contact, customSections } = data

  const photoFrameClass =
    data.photoFrame === 'circle'
      ? 'rounded-full border-4 border-[#F59E0B]'
      : data.photoFrame === 'ornate'
        ? 'rounded-md border-3 border-[#F59E0B] p-1 bg-[#1E3A8A]/20 shadow-lg'
        : 'rounded-lg border-2 border-[#F59E0B]'

  return (
    <div
      className="relative w-full max-w-[794px] min-h-[1123px] bg-[#FFFDF9] text-[#1E293B] p-8 sm:p-10 shadow-2xl mx-auto overflow-hidden border-[10px] border-[#1E3A8A]"
      style={{
        fontFamily: 'var(--font-devanagari-sans), "Noto Sans Devanagari", sans-serif',
      }}
    >
      <div className="absolute inset-2 border-2 border-[#F59E0B] pointer-events-none rounded-sm">
        <div className="absolute inset-1 border border-[#F59E0B]/40" />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center pt-2 pb-4">
        <div className="flex justify-center mb-1 drop-shadow-sm">
          {data.headerSymbol === 'ekonkar' ? (
            <EkOnkarIcon className="size-13" color="#C2410C" />
          ) : (
            <KhandaIcon className="size-13" color="#1E3A8A" />
          )}
        </div>

        <div className="text-xs sm:text-sm font-bold tracking-widest text-[#C2410C] uppercase">
          {data.headerTitle || 'ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ || Anand Karaj'}
        </div>

        <h1
          className="text-2xl sm:text-3xl font-extrabold text-[#1E3A8A] tracking-wide uppercase mt-1"
          style={{ fontFamily: 'var(--font-cinzel), serif' }}
        >
          {personal.fullName || 'Candidate Name'}
        </h1>
        <div className="flex justify-center mt-1">
          <HeaderFlourish className="w-48 h-3.5" color="#F59E0B" />
        </div>
      </div>

      {/* Photo */}
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

      {/* Sections */}
      <div className="relative z-10 space-y-4 px-2 sm:px-4">
        {/* Personal Details */}
        <section className="bg-white rounded-xl p-4 border border-[#1E3A8A]/20 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#1E3A8A]/20 pb-1.5 mb-2.5">
            <div className="size-2 rounded-full bg-[#1E3A8A]" />
            <h3 className="text-sm sm:text-base font-bold text-[#1E3A8A] uppercase tracking-wider" style={{ fontFamily: 'serif' }}>
              Personal & Professional Details
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-sm">
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#1E3A8A] shrink-0">Name:</span><span className="font-bold text-slate-900">{personal.fullName}</span></div>
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#1E3A8A] shrink-0">Date of Birth:</span><span className="text-slate-800">{personal.dob}</span></div>
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#1E3A8A] shrink-0">Age / Height:</span><span className="text-slate-800">{personal.age} | {personal.height}</span></div>
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#1E3A8A] shrink-0">Marital Status:</span><span className="text-slate-800">{personal.maritalStatus}</span></div>
            <div className="flex items-baseline sm:col-span-2"><span className="w-28 sm:w-32 font-semibold text-[#1E3A8A] shrink-0">Education:</span><span className="font-semibold text-slate-900">{personal.education}</span></div>
            <div className="flex items-baseline sm:col-span-2"><span className="w-28 sm:w-32 font-semibold text-[#1E3A8A] shrink-0">Occupation:</span><span className="font-semibold text-slate-900">{personal.occupation} {personal.company ? `at ${personal.company}` : ''}</span></div>
            {personal.income && <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#1E3A8A] shrink-0">Income:</span><span className="font-medium text-[#1E3A8A]">{personal.income}</span></div>}
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#1E3A8A] shrink-0">Caste / Clan:</span><span className="text-slate-800">{personal.caste} {personal.gotra ? `(${personal.gotra})` : ''}</span></div>
          </div>
        </section>

        {/* Sikh Heritage & Pind Details */}
        <section className="bg-[#1E3A8A]/5 rounded-xl p-4 border border-[#1E3A8A]/25 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#1E3A8A]/20 pb-1.5 mb-2.5">
            <div className="size-2 rounded-full bg-[#C2410C]" />
            <h3 className="text-sm sm:text-base font-bold text-[#1E3A8A] uppercase tracking-wider" style={{ fontFamily: 'serif' }}>
              Religious Background & Pind (Ancestral Roots)
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-sm">
            {religionDetails.turbanOrKesh && <div className="flex items-baseline sm:col-span-2"><span className="w-28 sm:w-32 font-semibold text-[#1E3A8A] shrink-0">Appearance:</span><span className="text-slate-900 font-medium">{religionDetails.turbanOrKesh}</span></div>}
            {religionDetails.amritdhari && <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#1E3A8A] shrink-0">Amritdhari:</span><span className="text-slate-800 uppercase">{religionDetails.amritdhari}</span></div>}
            {religionDetails.pind && <div className="flex items-baseline sm:col-span-2"><span className="w-28 sm:w-32 font-semibold text-[#1E3A8A] shrink-0">Ancestral Pind:</span><span className="text-slate-900 font-medium">{religionDetails.pind}</span></div>}
            {religionDetails.nankey && <div className="flex items-baseline sm:col-span-2"><span className="w-28 sm:w-32 font-semibold text-[#1E3A8A] shrink-0">Nankey (Maternal):</span><span className="text-slate-800">{religionDetails.nankey}</span></div>}
          </div>
        </section>

        {/* Family Details */}
        <section className="bg-white rounded-xl p-4 border border-[#1E3A8A]/20 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#1E3A8A]/20 pb-1.5 mb-2.5">
            <div className="size-2 rounded-full bg-[#1E3A8A]" />
            <h3 className="text-sm sm:text-base font-bold text-[#1E3A8A] uppercase tracking-wider" style={{ fontFamily: 'serif' }}>
              Family Details
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-sm">
            <div className="flex items-baseline sm:col-span-2"><span className="w-28 sm:w-32 font-semibold text-[#1E3A8A] shrink-0">Father:</span><span className="text-slate-900 font-medium">{family.fatherName} ({family.fatherOccupation})</span></div>
            <div className="flex items-baseline sm:col-span-2"><span className="w-28 sm:w-32 font-semibold text-[#1E3A8A] shrink-0">Mother:</span><span className="text-slate-900 font-medium">{family.motherName} ({family.motherOccupation})</span></div>
            <div className="flex items-baseline sm:col-span-2"><span className="w-28 sm:w-32 font-semibold text-[#1E3A8A] shrink-0">Siblings:</span><span className="text-slate-800">{family.siblingsCustom || `${family.brothersCount} Brothers, ${family.sistersCount} Sisters`}</span></div>
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#1E3A8A] shrink-0">Native Place:</span><span className="text-slate-800">{family.nativePlace}</span></div>
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#1E3A8A] shrink-0">Current City:</span><span className="text-slate-800">{family.currentCity}</span></div>
            {family.aboutFamily && <div className="flex items-baseline sm:col-span-2"><span className="w-28 sm:w-32 font-semibold text-[#1E3A8A] shrink-0">About Family:</span><span className="text-slate-700 italic">{family.aboutFamily}</span></div>}
          </div>
        </section>

        {/* Custom Sections */}
        {customSections.map((sec) => (
          <section key={sec.id} className="bg-white rounded-xl p-4 border border-[#1E3A8A]/20 shadow-xs space-y-1.5">
            <h3 className="text-xs sm:text-sm font-bold text-[#1E3A8A] uppercase tracking-wider border-b border-[#1E3A8A]/20 pb-1">
              {sec.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700">{sec.content}</p>
          </section>
        ))}

        {/* About & Expectations */}
        {(data.aboutMe || data.partnerExpectations) && (
          <section className="bg-white rounded-xl p-4 border border-[#1E3A8A]/20 shadow-xs space-y-2">
            <div className="flex items-center gap-2 border-b border-[#1E3A8A]/20 pb-1.5">
              <div className="size-2 rounded-full bg-[#1E3A8A]" />
              <h3 className="text-sm sm:text-base font-bold text-[#1E3A8A] uppercase tracking-wider" style={{ fontFamily: 'serif' }}>
                About Me & Partner Expectations
              </h3>
            </div>
            {data.aboutMe && <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{data.aboutMe}</p>}
            {data.partnerExpectations && (
              <div className="pt-1 text-xs sm:text-sm">
                <span className="font-semibold text-[#1E3A8A]">Expectations: </span>
                <span className="text-slate-700 italic">{data.partnerExpectations}</span>
              </div>
            )}
          </section>
        )}

        {/* Contact */}
        <section className="bg-white rounded-xl p-4 border border-[#1E3A8A]/20 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#1E3A8A]/20 pb-1.5 mb-2.5">
            <div className="size-2 rounded-full bg-[#1E3A8A]" />
            <h3 className="text-sm sm:text-base font-bold text-[#1E3A8A] uppercase tracking-wider" style={{ fontFamily: 'serif' }}>
              Contact Details
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-sm">
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#1E3A8A] shrink-0">Phone:</span><span className="font-bold text-slate-900">{contact.phone}</span></div>
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#1E3A8A] shrink-0">Email:</span><span className="text-slate-800">{contact.email}</span></div>
            <div className="flex items-baseline sm:col-span-2"><span className="w-28 sm:w-32 font-semibold text-[#1E3A8A] shrink-0">Address:</span><span className="text-slate-800">{contact.address}</span></div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center pt-5 pb-1">
        <p className="text-xs text-[#C2410C] tracking-widest font-semibold" style={{ fontFamily: 'serif' }}>
          || ਨਾਨਕ ਨਾਮ ਚੜ੍ਹਦੀ ਕਲਾ, ਤੇਰੇ ਭਾਣੇ ਸਰਬੱਤ ਦਾ ਭਲਾ ||
        </p>
      </div>
    </div>
  )
}
