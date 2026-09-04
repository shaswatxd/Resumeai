import React from 'react'
import type { BiodataData } from '@/lib/biodata-types'
import {
  GaneshIcon,
  OmIcon,
  KalashIcon,
  SwastikIcon,
  EkOnkarIcon,
  HeaderFlourish,
} from '../biodata-decorations'

interface TemplateProps {
  data: BiodataData
  t: (key: string) => string
}

export function VedicHeritageTemplate({ data, t }: TemplateProps) {
  const { personal, family, horoscope, contact } = data

  const renderSymbol = () => {
    switch (data.headerSymbol) {
      case 'ganesh':
        return <GaneshIcon className="size-12" color="#6B1D2F" />
      case 'om':
        return <OmIcon className="size-12" color="#6B1D2F" />
      case 'kalash':
        return <KalashIcon className="size-12" color="#6B1D2F" />
      case 'swastik':
        return <SwastikIcon className="size-12" color="#6B1D2F" />
      case 'ekonkar':
        return <EkOnkarIcon className="size-12" color="#6B1D2F" />
      default:
        return null
    }
  }

  return (
    <div
      className="relative w-full max-w-[794px] min-h-[1123px] bg-[#FAF7F2] text-[#2D241E] p-8 sm:p-10 shadow-xl mx-auto overflow-hidden border-[12px] border-[#F2ECE1]"
      style={{
        fontFamily: 'var(--font-devanagari-sans), "Noto Sans Devanagari", "Mangal", sans-serif',
      }}
    >
      {/* Traditional Inner Arch Frame */}
      <div className="absolute inset-2 border border-[#6B1D2F]/40 pointer-events-none rounded-t-[40px] rounded-b-md" />
      <div className="absolute inset-3.5 border-2 border-[#C59B27]/60 pointer-events-none rounded-t-[36px] rounded-b-sm" />

      {/* Top Auspicious Arch Banner */}
      <div className="relative z-10 text-center pt-3 pb-4">
        {data.headerSymbol !== 'none' && (
          <div className="flex justify-center mb-1 drop-shadow-sm">{renderSymbol()}</div>
        )}
        {data.headerTitle && (
          <div
            className="text-base sm:text-lg font-bold tracking-widest text-[#6B1D2F] uppercase mb-0.5"
            style={{ fontFamily: 'var(--font-devanagari-serif), "Martel", serif' }}
          >
            {data.headerTitle}
          </div>
        )}
        <h1
          className="text-2xl sm:text-3xl font-extrabold text-[#6B1D2F] tracking-wide"
          style={{ fontFamily: 'var(--font-devanagari-serif), "Martel", serif' }}
        >
          {personal.fullName || t('biodataTitle')}
        </h1>
        <div className="flex justify-center mt-1">
          <HeaderFlourish className="w-44 h-3.5" color="#C59B27" />
        </div>
      </div>

      {/* Optional Photo Header Row */}
      {data.showPhoto && data.photo && (
        <div className="relative z-10 flex items-center justify-center mb-4">
          <div className="size-28 sm:size-32 rounded-full overflow-hidden border-4 border-[#C59B27] p-1 bg-white shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.photo}
              alt={personal.fullName}
              className="size-full rounded-full object-cover object-center"
            />
          </div>
        </div>
      )}

      {/* Structured Sections */}
      <div className="relative z-10 space-y-4 px-2 sm:px-4">
        {/* 1. Personal Details */}
        <section className="bg-[#FFFFFF]/70 rounded-lg p-3 sm:p-4 border border-[#C59B27]/30 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#6B1D2F]/25 pb-1.5 mb-2.5">
            <span className="text-[#C59B27] text-sm">✦</span>
            <h3
              className="text-sm sm:text-base font-bold text-[#6B1D2F] uppercase tracking-wider"
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
                <span className="font-medium text-slate-900">{personal.income}</span>
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
        <section className="bg-[#FFFFFF]/70 rounded-lg p-3 sm:p-4 border border-[#C59B27]/30 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#6B1D2F]/25 pb-1.5 mb-2.5">
            <span className="text-[#C59B27] text-sm">✦</span>
            <h3
              className="text-sm sm:text-base font-bold text-[#6B1D2F] uppercase tracking-wider"
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
          <section className="bg-[#FFFFFF]/70 rounded-lg p-3 sm:p-4 border border-[#C59B27]/30 shadow-xs">
            <div className="flex items-center gap-2 border-b border-[#6B1D2F]/25 pb-1.5 mb-2.5">
              <span className="text-[#C59B27] text-sm">✦</span>
              <h3
                className="text-sm sm:text-base font-bold text-[#6B1D2F] uppercase tracking-wider"
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
          <section className="bg-[#FFFFFF]/70 rounded-lg p-3 sm:p-4 border border-[#C59B27]/30 shadow-xs space-y-2">
            <div className="flex items-center gap-2 border-b border-[#6B1D2F]/25 pb-1.5">
              <span className="text-[#C59B27] text-sm">✦</span>
              <h3
                className="text-sm sm:text-base font-bold text-[#6B1D2F] uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-devanagari-serif), "Martel", serif' }}
              >
                {t('aboutMeTitle')}
              </h3>
            </div>
            {data.aboutMe && <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">{data.aboutMe}</p>}
            {data.partnerExpectations && (
              <div className="pt-1 text-xs sm:text-sm">
                <span className="font-semibold text-[#6B1D2F]">{t('partnerExpectationsTitle')}: </span>
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
        <section className="bg-[#FFFFFF]/70 rounded-lg p-3 sm:p-4 border border-[#C59B27]/30 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#6B1D2F]/25 pb-1.5 mb-2.5">
            <span className="text-[#C59B27] text-sm">✦</span>
            <h3
              className="text-sm sm:text-base font-bold text-[#6B1D2F] uppercase tracking-wider"
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

      {/* Footer Auspicious blessing line */}
      <div className="relative z-10 text-center pt-5 pb-1">
        <p
          className="text-xs text-[#6B1D2F]/80 tracking-widest font-semibold"
          style={{ fontFamily: 'var(--font-devanagari-serif), "Martel", serif' }}
        >
          || शुभम् भवतु कल्याणम् ||
        </p>
      </div>
    </div>
  )
}
