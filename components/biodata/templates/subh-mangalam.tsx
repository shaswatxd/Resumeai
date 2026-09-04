import React from 'react'
import type { BiodataData } from '@/lib/biodata-types'
import {
  GaneshIcon,
  OmIcon,
  KalashIcon,
  SwastikIcon,
  EkOnkarIcon,
  LotusMotif,
  HeaderFlourish,
} from '../biodata-decorations'

interface TemplateProps {
  data: BiodataData
  t: (key: string) => string
}

export function SubhMangalamTemplate({ data, t }: TemplateProps) {
  const { personal, family, horoscope, contact } = data

  const renderSymbol = () => {
    switch (data.headerSymbol) {
      case 'ganesh':
        return <GaneshIcon className="size-13" color="#C2410C" />
      case 'om':
        return <OmIcon className="size-13" color="#C2410C" />
      case 'kalash':
        return <KalashIcon className="size-13" color="#C2410C" />
      case 'swastik':
        return <SwastikIcon className="size-13" color="#DC2626" />
      case 'ekonkar':
        return <EkOnkarIcon className="size-13" color="#C2410C" />
      default:
        return null
    }
  }

  return (
    <div
      className="relative w-full max-w-[794px] min-h-[1123px] bg-[#FFFDF7] text-[#2C1810] p-8 sm:p-10 shadow-xl mx-auto overflow-hidden border-[6px] border-[#FDBA74]"
      style={{
        fontFamily: 'var(--font-devanagari-sans), "Noto Sans Devanagari", "Mangal", sans-serif',
      }}
    >
      {/* Saffron & Golden Double Border */}
      <div className="absolute inset-2 border-2 border-[#C2410C]/60 pointer-events-none rounded-md">
        <div className="absolute inset-1 border border-[#D97706]/40 rounded-xs" />
      </div>

      {/* Lotus Motifs at Top Corners */}
      <div className="absolute top-4 left-4 pointer-events-none opacity-80">
        <LotusMotif className="size-7" color="#C2410C" />
      </div>
      <div className="absolute top-4 right-4 pointer-events-none opacity-80">
        <LotusMotif className="size-7" color="#C2410C" />
      </div>
      <div className="absolute bottom-4 left-4 pointer-events-none opacity-80">
        <LotusMotif className="size-7" color="#C2410C" />
      </div>
      <div className="absolute bottom-4 right-4 pointer-events-none opacity-80">
        <LotusMotif className="size-7" color="#C2410C" />
      </div>

      {/* Header Banner */}
      <div className="relative z-10 text-center pt-2 pb-5">
        {data.headerSymbol !== 'none' && (
          <div className="flex justify-center mb-1 drop-shadow-sm">{renderSymbol()}</div>
        )}
        {data.headerTitle && (
          <div
            className="text-sm sm:text-base font-bold tracking-widest text-[#C2410C] uppercase mb-1"
            style={{ fontFamily: 'var(--font-devanagari-serif), "Martel", serif' }}
          >
            {data.headerTitle}
          </div>
        )}
        <h1
          className="text-2xl sm:text-3xl font-extrabold text-[#9A3412] tracking-wide"
          style={{ fontFamily: 'var(--font-devanagari-serif), "Martel", serif' }}
        >
          {personal.fullName || t('biodataTitle')}
        </h1>
        <div className="flex justify-center mt-1">
          <HeaderFlourish className="w-48 h-3.5" color="#D97706" />
        </div>
      </div>

      {/* Photo Row (if provided) */}
      {data.showPhoto && data.photo && (
        <div className="relative z-10 flex items-center justify-center mb-4">
          <div className="size-28 sm:size-32 rounded-xl overflow-hidden border-3 border-[#EA580C] p-1 bg-white shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.photo}
              alt={personal.fullName}
              className="size-full object-cover object-center rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Main Sections */}
      <div className="relative z-10 space-y-4 px-2 sm:px-4">
        {/* 1. Personal Details */}
        <section className="bg-[#FFF7ED]/70 rounded-xl p-4 border border-[#FDBA74]/50 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#EA580C]/30 pb-1.5 mb-2.5">
            <LotusMotif className="size-4" color="#EA580C" />
            <h3
              className="text-sm sm:text-base font-bold text-[#9A3412] uppercase tracking-wider"
              style={{ fontFamily: 'var(--font-devanagari-serif), "Martel", serif' }}
            >
              {t('personalDetails')}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-sm">
            <div className="flex items-baseline">
              <span className="w-28 sm:w-32 font-medium text-slate-600 shrink-0">{t('dob')}:</span>
              <span className="font-semibold text-slate-900">{personal.dob || '—'}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-28 sm:w-32 font-medium text-slate-600 shrink-0">{t('age')}:</span>
              <span className="text-slate-900">{personal.age || '—'}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-28 sm:w-32 font-medium text-slate-600 shrink-0">{t('height')}:</span>
              <span className="text-slate-900">{personal.height || '—'}</span>
            </div>
            {personal.complexion && (
              <div className="flex items-baseline">
                <span className="w-28 sm:w-32 font-medium text-slate-600 shrink-0">{t('complexion')}:</span>
                <span className="text-slate-900">{personal.complexion}</span>
              </div>
            )}
            {personal.bloodGroup && (
              <div className="flex items-baseline">
                <span className="w-28 sm:w-32 font-medium text-slate-600 shrink-0">{t('bloodGroup')}:</span>
                <span className="text-slate-900">{personal.bloodGroup}</span>
              </div>
            )}
            <div className="flex items-baseline">
              <span className="w-28 sm:w-32 font-medium text-slate-600 shrink-0">{t('maritalStatus')}:</span>
              <span className="text-slate-900">{personal.maritalStatus || '—'}</span>
            </div>
            <div className="flex items-baseline sm:col-span-2">
              <span className="w-28 sm:w-32 font-medium text-slate-600 shrink-0">{t('education')}:</span>
              <span className="font-semibold text-slate-900">
                {personal.education}
                {personal.educationDetail ? ` (${personal.educationDetail})` : ''}
              </span>
            </div>
            <div className="flex items-baseline sm:col-span-2">
              <span className="w-28 sm:w-32 font-medium text-slate-600 shrink-0">{t('occupation')}:</span>
              <span className="font-semibold text-slate-900">
                {personal.occupation}
                {personal.company ? ` (${personal.company})` : ''}
              </span>
            </div>
            {personal.income && (
              <div className="flex items-baseline">
                <span className="w-28 sm:w-32 font-medium text-slate-600 shrink-0">{t('income')}:</span>
                <span className="font-medium text-[#C2410C]">{personal.income}</span>
              </div>
            )}
            <div className="flex items-baseline">
              <span className="w-28 sm:w-32 font-medium text-slate-600 shrink-0">{t('religion')}:</span>
              <span className="text-slate-900">{personal.religion}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-28 sm:w-32 font-medium text-slate-600 shrink-0">{t('caste')}:</span>
              <span className="text-slate-900">
                {personal.caste}
                {personal.subcaste ? ` (${personal.subcaste})` : ''}
              </span>
            </div>
            {personal.gotra && (
              <div className="flex items-baseline">
                <span className="w-28 sm:w-32 font-medium text-slate-600 shrink-0">{t('gotra')}:</span>
                <span className="text-slate-900">{personal.gotra}</span>
              </div>
            )}
          </div>
        </section>

        {/* 2. Family Details */}
        <section className="bg-[#FFF7ED]/70 rounded-xl p-4 border border-[#FDBA74]/50 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#EA580C]/30 pb-1.5 mb-2.5">
            <LotusMotif className="size-4" color="#EA580C" />
            <h3
              className="text-sm sm:text-base font-bold text-[#9A3412] uppercase tracking-wider"
              style={{ fontFamily: 'var(--font-devanagari-serif), "Martel", serif' }}
            >
              {t('familyDetails')}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-sm">
            <div className="flex items-baseline sm:col-span-2">
              <span className="w-28 sm:w-32 font-medium text-slate-600 shrink-0">{t('fatherName')}:</span>
              <span className="font-medium text-slate-900">
                {family.fatherName}
                {family.fatherOccupation ? ` (${family.fatherOccupation})` : ''}
              </span>
            </div>
            <div className="flex items-baseline sm:col-span-2">
              <span className="w-28 sm:w-32 font-medium text-slate-600 shrink-0">{t('motherName')}:</span>
              <span className="font-medium text-slate-900">
                {family.motherName}
                {family.motherOccupation ? ` (${family.motherOccupation})` : ''}
              </span>
            </div>
            <div className="flex items-baseline sm:col-span-2">
              <span className="w-28 sm:w-32 font-medium text-slate-600 shrink-0">{t('siblingsCustom')}:</span>
              <span className="text-slate-900">
                {family.siblingsCustom ||
                  `${family.brothersCount} ${t('brothers')}, ${family.sistersCount} ${t('sisters')}`}
              </span>
            </div>
            <div className="flex items-baseline">
              <span className="w-28 sm:w-32 font-medium text-slate-600 shrink-0">{t('familyType')}:</span>
              <span className="text-slate-900">{family.familyType === 'joint' ? t('joint') : t('nuclear')}</span>
            </div>
            {family.nativePlace && (
              <div className="flex items-baseline">
                <span className="w-28 sm:w-32 font-medium text-slate-600 shrink-0">{t('nativePlace')}:</span>
                <span className="text-slate-900">{family.nativePlace}</span>
              </div>
            )}
            {family.aboutFamily && (
              <div className="flex items-baseline sm:col-span-2">
                <span className="w-28 sm:w-32 font-medium text-slate-600 shrink-0">{t('aboutFamily')}:</span>
                <span className="text-slate-700 italic">{family.aboutFamily}</span>
              </div>
            )}
          </div>
        </section>

        {/* 3. Horoscope Details (if enabled) */}
        {horoscope.enabled && (
          <section className="bg-[#FFF7ED]/70 rounded-xl p-4 border border-[#FDBA74]/50 shadow-xs">
            <div className="flex items-center gap-2 border-b border-[#EA580C]/30 pb-1.5 mb-2.5">
              <LotusMotif className="size-4" color="#EA580C" />
              <h3
                className="text-sm sm:text-base font-bold text-[#9A3412] uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-devanagari-serif), "Martel", serif' }}
              >
                {t('horoscopeDetails')}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-sm">
              {horoscope.rashi && (
                <div className="flex items-baseline">
                  <span className="w-28 sm:w-32 font-medium text-slate-600 shrink-0">{t('rashi')}:</span>
                  <span className="text-slate-900">{horoscope.rashi}</span>
                </div>
              )}
              {horoscope.nakshatra && (
                <div className="flex items-baseline">
                  <span className="w-28 sm:w-32 font-medium text-slate-600 shrink-0">{t('nakshatra')}:</span>
                  <span className="text-slate-900">{horoscope.nakshatra}</span>
                </div>
              )}
              <div className="flex items-baseline">
                <span className="w-28 sm:w-32 font-medium text-slate-600 shrink-0">{t('manglik')}:</span>
                <span className="font-semibold text-slate-900">
                  {horoscope.manglik === 'no'
                    ? t('manglikNo')
                    : horoscope.manglik === 'yes'
                      ? t('manglikYes')
                      : horoscope.manglik === 'anshik'
                        ? t('manglikAnshik')
                        : t('manglikDontKnow')}
                </span>
              </div>
              {horoscope.birthTime && (
                <div className="flex items-baseline">
                  <span className="w-28 sm:w-32 font-medium text-slate-600 shrink-0">{t('birthTime')}:</span>
                  <span className="text-slate-900">{horoscope.birthTime}</span>
                </div>
              )}
              {horoscope.birthPlace && (
                <div className="flex items-baseline">
                  <span className="w-28 sm:w-32 font-medium text-slate-600 shrink-0">{t('birthPlace')}:</span>
                  <span className="text-slate-900">{horoscope.birthPlace}</span>
                </div>
              )}
              {horoscope.gan && (
                <div className="flex items-baseline">
                  <span className="w-28 sm:w-32 font-medium text-slate-600 shrink-0">{t('gan')}:</span>
                  <span className="text-slate-900">{horoscope.gan}</span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 4. About & Partner Expectations */}
        {(data.aboutMe || data.partnerExpectations) && (
          <section className="bg-[#FFF7ED]/70 rounded-xl p-4 border border-[#FDBA74]/50 shadow-xs space-y-2">
            <div className="flex items-center gap-2 border-b border-[#EA580C]/30 pb-1.5">
              <LotusMotif className="size-4" color="#EA580C" />
              <h3
                className="text-sm sm:text-base font-bold text-[#9A3412] uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-devanagari-serif), "Martel", serif' }}
              >
                {t('aboutMeTitle')}
              </h3>
            </div>
            {data.aboutMe && <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">{data.aboutMe}</p>}
            {data.partnerExpectations && (
              <div className="pt-1 text-xs sm:text-sm">
                <span className="font-semibold text-[#9A3412]">{t('partnerExpectationsTitle')}: </span>
                <span className="text-slate-700 italic">{data.partnerExpectations}</span>
              </div>
            )}
            {data.hobbies && (
              <div className="text-xs sm:text-sm pt-0.5">
                <span className="font-medium text-slate-600">{t('hobbiesTitle')}: </span>
                <span className="text-slate-800">{data.hobbies}</span>
              </div>
            )}
          </section>
        )}

        {/* 5. Contact Details */}
        <section className="bg-[#FFF7ED]/70 rounded-xl p-4 border border-[#FDBA74]/50 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#EA580C]/30 pb-1.5 mb-2.5">
            <LotusMotif className="size-4" color="#EA580C" />
            <h3
              className="text-sm sm:text-base font-bold text-[#9A3412] uppercase tracking-wider"
              style={{ fontFamily: 'var(--font-devanagari-serif), "Martel", serif' }}
            >
              {t('contactDetails')}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-sm">
            <div className="flex items-baseline">
              <span className="w-28 sm:w-32 font-medium text-slate-600 shrink-0">{t('phone')}:</span>
              <span className="font-bold text-slate-900">{contact.phone || '—'}</span>
            </div>
            {contact.altPhone && (
              <div className="flex items-baseline">
                <span className="w-28 sm:w-32 font-medium text-slate-600 shrink-0">{t('altPhone')}:</span>
                <span className="text-slate-900">{contact.altPhone}</span>
              </div>
            )}
            {contact.email && (
              <div className="flex items-baseline">
                <span className="w-28 sm:w-32 font-medium text-slate-600 shrink-0">{t('email')}:</span>
                <span className="text-slate-900">{contact.email}</span>
              </div>
            )}
            <div className="flex items-baseline sm:col-span-2">
              <span className="w-28 sm:w-32 font-medium text-slate-600 shrink-0">{t('address')}:</span>
              <span className="text-slate-900">{contact.address || '—'}</span>
            </div>
            {contact.referenceContact && (
              <div className="flex items-baseline sm:col-span-2">
                <span className="w-28 sm:w-32 font-medium text-slate-600 shrink-0">{t('referenceContact')}:</span>
                <span className="text-slate-900">{contact.referenceContact}</span>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Footer Auspicious blessing */}
      <div className="relative z-10 text-center pt-5 pb-1">
        <p
          className="text-xs text-[#C2410C]/90 tracking-widest font-semibold"
          style={{ fontFamily: 'var(--font-devanagari-serif), "Martel", serif' }}
        >
          || शुभ विवाह || ॐ तत्सत् ||
        </p>
      </div>
    </div>
  )
}
