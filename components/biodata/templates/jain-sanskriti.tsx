import React from 'react'
import type { BiodataData } from '@/lib/biodata-types'
import {
  NavkarMantraCrest,
  JainAhimsaIcon,
  SwastikIcon,
  HeaderFlourish,
} from '../biodata-decorations'

interface TemplateProps {
  data: BiodataData
  t: (key: string) => string
}

export function JainSanskritiTemplate({ data, t }: TemplateProps) {
  const { personal, family, horoscope, religionDetails, contact, customSections } = data

  const photoFrameClass =
    data.photoFrame === 'circle'
      ? 'rounded-full border-4 border-[#D97706]'
      : data.photoFrame === 'ornate'
        ? 'rounded-md border-3 border-[#D97706] p-1 bg-[#92400E]/10 shadow-lg'
        : 'rounded-lg border-2 border-[#D97706]'

  return (
    <div
      className="relative w-full max-w-[794px] min-h-[1123px] bg-[#FFFDF7] text-[#2D1E12] p-8 sm:p-10 shadow-2xl mx-auto overflow-hidden border-[10px] border-[#92400E]"
      style={{
        fontFamily: 'var(--font-devanagari-sans), "Noto Sans Devanagari", sans-serif',
      }}
    >
      <div className="absolute inset-2 border-2 border-[#D97706] pointer-events-none rounded-sm">
        <div className="absolute inset-1 border border-[#D97706]/40" />
      </div>

      <div className="relative z-10 text-center pt-2 pb-4">
        <div className="flex justify-center mb-1 drop-shadow-sm">
          {data.headerSymbol === 'ahimsa' ? (
            <JainAhimsaIcon className="size-12" color="#92400E" />
          ) : data.headerSymbol === 'swastik' ? (
            <SwastikIcon className="size-12" color="#DC2626" />
          ) : (
            <NavkarMantraCrest className="w-56 h-12" color="#92400E" />
          )}
        </div>

        <div className="text-xs sm:text-sm font-bold tracking-widest text-[#92400E] uppercase mt-1">
          {data.headerTitle || '|| ॐ अर्हं नमः · विवाह बायोडाटा ||'}
        </div>

        <h1
          className="text-2xl sm:text-3xl font-extrabold text-[#92400E] tracking-wide uppercase mt-1"
          style={{ fontFamily: 'var(--font-devanagari-serif), serif' }}
        >
          {personal.fullName || 'उम्मीदवार का नाम'}
        </h1>
        <div className="flex justify-center mt-1">
          <HeaderFlourish className="w-48 h-3.5" color="#D97706" />
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
        {/* Personal Details */}
        <section className="bg-white rounded-xl p-4 border border-[#92400E]/20 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#92400E]/20 pb-1.5 mb-2.5">
            <div className="size-2 rounded-full bg-[#92400E]" />
            <h3 className="text-sm sm:text-base font-bold text-[#92400E] uppercase tracking-wider" style={{ fontFamily: 'var(--font-devanagari-serif), serif' }}>
              व्यक्तिगत एवं शैक्षणिक विवरण (Personal Profile)
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-sm">
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#92400E] shrink-0">पूरा नाम:</span><span className="font-bold text-slate-900">{personal.fullName}</span></div>
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#92400E] shrink-0">जन्म तिथि:</span><span className="text-slate-800">{personal.dob}</span></div>
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#92400E] shrink-0">आयु / कद:</span><span className="text-slate-800">{personal.age} | {personal.height}</span></div>
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#92400E] shrink-0">वैवाहिक स्थिति:</span><span className="text-slate-800">{personal.maritalStatus}</span></div>
            <div className="flex items-baseline sm:col-span-2"><span className="w-28 sm:w-32 font-semibold text-[#92400E] shrink-0">उच्च शिक्षा:</span><span className="font-semibold text-slate-900">{personal.education}</span></div>
            <div className="flex items-baseline sm:col-span-2"><span className="w-28 sm:w-32 font-semibold text-[#92400E] shrink-0">व्यवसाय:</span><span className="font-semibold text-slate-900">{personal.occupation} {personal.company ? `(${personal.company})` : ''}</span></div>
            {personal.income && <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#92400E] shrink-0">वार्षिक आय:</span><span className="font-medium text-[#92400E]">{personal.income}</span></div>}
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#92400E] shrink-0">जाति / गोत्र:</span><span className="text-slate-800">{personal.caste} {personal.gotra ? `(${personal.gotra})` : ''}</span></div>
          </div>
        </section>

        {/* Jain Heritage & Diet Details */}
        <section className="bg-[#92400E]/5 rounded-xl p-4 border border-[#92400E]/20 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#92400E]/20 pb-1.5 mb-2.5">
            <div className="size-2 rounded-full bg-[#D97706]" />
            <h3 className="text-sm sm:text-base font-bold text-[#92400E] uppercase tracking-wider" style={{ fontFamily: 'var(--font-devanagari-serif), serif' }}>
              जैन धार्मिक एवं सात्विक परंपरा
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-sm">
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#92400E] shrink-0">संप्रदाय:</span><span className="font-medium text-slate-900">{religionDetails.sampradaya || 'श्वेतांबर'}</span></div>
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#92400E] shrink-0">पंथ:</span><span className="font-medium text-slate-900">{religionDetails.panth || 'मूर्तिपूजक / स्थानकवासी'}</span></div>
            <div className="flex items-baseline sm:col-span-2"><span className="w-28 sm:w-32 font-semibold text-[#92400E] shrink-0">आहार / खान-पान:</span><span className="font-bold text-emerald-800">शुद्ध सात्विक शाकाहारी (Strict Pure Vegetarian)</span></div>
          </div>
        </section>

        {/* Horoscope (if enabled) */}
        {horoscope.enabled && (
          <section className="bg-white rounded-xl p-4 border border-[#92400E]/20 shadow-xs">
            <div className="flex items-center gap-2 border-b border-[#92400E]/20 pb-1.5 mb-2.5">
              <h3 className="text-sm sm:text-base font-bold text-[#92400E] uppercase tracking-wider" style={{ fontFamily: 'var(--font-devanagari-serif), serif' }}>
                जन्म कुंडली (Kundali)
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-sm">
              {horoscope.rashi && <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#92400E] shrink-0">राशि:</span><span className="text-slate-800">{horoscope.rashi}</span></div>}
              {horoscope.nakshatra && <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#92400E] shrink-0">नक्षत्र:</span><span className="text-slate-800">{horoscope.nakshatra}</span></div>}
              {horoscope.birthTime && <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#92400E] shrink-0">जन्म समय:</span><span className="text-slate-800">{horoscope.birthTime}</span></div>}
              {horoscope.birthPlace && <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#92400E] shrink-0">जन्म स्थान:</span><span className="text-slate-800">{horoscope.birthPlace}</span></div>}
            </div>
          </section>
        )}

        {/* Family Details */}
        <section className="bg-white rounded-xl p-4 border border-[#92400E]/20 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#92400E]/20 pb-1.5 mb-2.5">
            <div className="size-2 rounded-full bg-[#92400E]" />
            <h3 className="text-sm sm:text-base font-bold text-[#92400E] uppercase tracking-wider" style={{ fontFamily: 'var(--font-devanagari-serif), serif' }}>
              पारिवारिक विवरण (Family Details)
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-sm">
            <div className="flex items-baseline sm:col-span-2"><span className="w-28 sm:w-32 font-semibold text-[#92400E] shrink-0">पिता:</span><span className="text-slate-900 font-medium">{family.fatherName} ({family.fatherOccupation})</span></div>
            <div className="flex items-baseline sm:col-span-2"><span className="w-28 sm:w-32 font-semibold text-[#92400E] shrink-0">माता:</span><span className="text-slate-900 font-medium">{family.motherName} ({family.motherOccupation})</span></div>
            <div className="flex items-baseline sm:col-span-2"><span className="w-28 sm:w-32 font-semibold text-[#92400E] shrink-0">भाई-बहन:</span><span className="text-slate-800">{family.siblingsCustom || `${family.brothersCount} भाई, ${family.sistersCount} बहन`}</span></div>
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#92400E] shrink-0">मूल निवास:</span><span className="text-slate-800">{family.nativePlace}</span></div>
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#92400E] shrink-0">वर्तमान शहर:</span><span className="text-slate-800">{family.currentCity}</span></div>
          </div>
        </section>

        {customSections.map((sec) => (
          <section key={sec.id} className="bg-white rounded-xl p-4 border border-[#92400E]/20 shadow-xs space-y-1.5">
            <h3 className="text-xs sm:text-sm font-bold text-[#92400E] uppercase tracking-wider border-b border-[#92400E]/20 pb-1">{sec.title}</h3>
            <p className="text-xs sm:text-sm text-slate-700">{sec.content}</p>
          </section>
        ))}

        {/* Contact */}
        <section className="bg-white rounded-xl p-4 border border-[#92400E]/20 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#92400E]/20 pb-1.5 mb-2.5">
            <div className="size-2 rounded-full bg-[#92400E]" />
            <h3 className="text-sm sm:text-base font-bold text-[#92400E] uppercase tracking-wider" style={{ fontFamily: 'var(--font-devanagari-serif), serif' }}>संपर्क विवरण</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-sm">
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#92400E] shrink-0">फ़ोन:</span><span className="font-bold text-slate-900">{contact.phone}</span></div>
            <div className="flex items-baseline"><span className="w-28 sm:w-32 font-semibold text-[#92400E] shrink-0">ईमेल:</span><span className="text-slate-800">{contact.email}</span></div>
            <div className="flex items-baseline sm:col-span-2"><span className="w-28 sm:w-32 font-semibold text-[#92400E] shrink-0">निवास पता:</span><span className="text-slate-800">{contact.address}</span></div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center pt-5 pb-1">
        <p className="text-xs text-[#92400E] tracking-widest font-semibold" style={{ fontFamily: 'var(--font-devanagari-serif), serif' }}>
          || अहिंसा परमो धर्मः · जय जिनेन्द्र ||
        </p>
      </div>
    </div>
  )
}
