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

export function ModernGraceTemplate({ data, t }: TemplateProps) {
  const { personal, family, horoscope, contact } = data

  const renderSymbol = () => {
    switch (data.headerSymbol) {
      case 'ganesh':
        return <GaneshIcon className="size-11" color="#E0A96D" />
      case 'om':
        return <OmIcon className="size-11" color="#E0A96D" />
      case 'kalash':
        return <KalashIcon className="size-11" color="#E0A96D" />
      case 'swastik':
        return <SwastikIcon className="size-11" color="#E0A96D" />
      case 'ekonkar':
        return <EkOnkarIcon className="size-11" color="#E0A96D" />
      default:
        return null
    }
  }

  return (
    <div
      className="relative w-full max-w-[794px] min-h-[1123px] bg-[#FFFFFF] text-[#1E293B] p-8 sm:p-10 shadow-xl mx-auto overflow-hidden border border-[#E2E8F0]"
      style={{
        fontFamily: 'var(--font-devanagari-sans), "Noto Sans Devanagari", "Mangal", sans-serif',
      }}
    >
      {/* Top Gradient Ribbon Accent */}
      <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-[#064E3B] via-[#E0A96D] to-[#064E3B]" />

      {/* Modern Luxury Header */}
      <div className="relative z-10 pt-4 pb-5 border-b border-[#E0A96D]/30">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-1">
            {data.headerTitle && (
              <div
                className="text-xs font-bold tracking-widest text-[#064E3B] uppercase"
                style={{ fontFamily: 'var(--font-devanagari-serif), "Martel", serif' }}
              >
                {data.headerTitle}
              </div>
            )}
            <h1
              className="text-2xl sm:text-3xl font-extrabold text-[#064E3B] tracking-tight"
              style={{ fontFamily: 'var(--font-cinzel), var(--font-devanagari-serif), serif' }}
            >
              {personal.fullName || t('biodataTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              {personal.education} • {personal.occupation}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {data.headerSymbol !== 'none' && (
              <div className="p-2.5 rounded-full bg-[#064E3B]/5 border border-[#E0A96D]/40">
                {renderSymbol()}
              </div>
            )}
            {data.showPhoto && data.photo && (
              <div className="size-20 sm:size-24 rounded-lg overflow-hidden border-2 border-[#E0A96D] shadow-sm shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.photo}
                  alt={personal.fullName}
                  className="size-full object-cover object-center"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="relative z-10 space-y-4 pt-4">
        {/* 1. Personal Details */}
        <section className="rounded-lg p-4 bg-[#F8FAFC] border border-[#E2E8F0] shadow-xs">
          <div className="flex items-center justify-between border-b border-[#E0A96D]/40 pb-1.5 mb-3">
            <h2
              className="text-xs sm:text-sm font-bold tracking-wider text-[#064E3B] uppercase flex items-center gap-2"
              style={{ fontFamily: 'var(--font-cinzel), var(--font-devanagari-serif), serif' }}
            >
              <span className="size-1.5 rounded-full bg-[#E0A96D]" />
              {t('personalDetails')}
            </h2>
            <span className="text-[10px] text-slate-400 font-mono tracking-widest">01</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm">
            <div className="flex items-baseline">
              <span className="w-28 sm:w-32 text-slate-500 font-medium shrink-0">{t('dob')}:</span>
              <span className="font-semibold text-slate-900">{personal.dob || '—'}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-28 sm:w-32 text-slate-500 font-medium shrink-0">{t('age')}:</span>
              <span className="text-slate-900">{personal.age || '—'}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-28 sm:w-32 text-slate-500 font-medium shrink-0">{t('height')}:</span>
              <span className="text-slate-900">{personal.height || '—'}</span>
            </div>
            {personal.complexion && (
              <div className="flex items-baseline">
                <span className="w-28 sm:w-32 text-slate-500 font-medium shrink-0">{t('complexion')}:</span>
                <span className="text-slate-900">{personal.complexion}</span>
              </div>
            )}
            {personal.bloodGroup && (
              <div className="flex items-baseline">
                <span className="w-28 sm:w-32 text-slate-500 font-medium shrink-0">{t('bloodGroup')}:</span>
                <span className="text-slate-900">{personal.bloodGroup}</span>
              </div>
            )}
            <div className="flex items-baseline">
              <span className="w-28 sm:w-32 text-slate-500 font-medium shrink-0">{t('maritalStatus')}:</span>
              <span className="text-slate-900">{personal.maritalStatus || '—'}</span>
            </div>
            <div className="flex items-baseline sm:col-span-2">
              <span className="w-28 sm:w-32 text-slate-500 font-medium shrink-0">{t('education')}:</span>
              <span className="font-semibold text-slate-900">
                {personal.education}
                {personal.educationDetail ? ` • ${personal.educationDetail}` : ''}
              </span>
            </div>
            <div className="flex items-baseline sm:col-span-2">
              <span className="w-28 sm:w-32 text-slate-500 font-medium shrink-0">{t('occupation')}:</span>
              <span className="font-semibold text-slate-900">
                {personal.occupation}
                {personal.company ? ` • ${personal.company}` : ''}
              </span>
            </div>
            {personal.income && (
              <div className="flex items-baseline">
                <span className="w-28 sm:w-32 text-slate-500 font-medium shrink-0">{t('income')}:</span>
                <span className="font-medium text-[#064E3B]">{personal.income}</span>
              </div>
            )}
            <div className="flex items-baseline">
              <span className="w-28 sm:w-32 text-slate-500 font-medium shrink-0">{t('religion')}:</span>
              <span className="text-slate-900">{personal.religion}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-28 sm:w-32 text-slate-500 font-medium shrink-0">{t('caste')}:</span>
              <span className="text-slate-900">
                {personal.caste}
                {personal.subcaste ? ` (${personal.subcaste})` : ''}
              </span>
            </div>
            {personal.gotra && (
              <div className="flex items-baseline">
                <span className="w-28 sm:w-32 text-slate-500 font-medium shrink-0">{t('gotra')}:</span>
                <span className="text-slate-900">{personal.gotra}</span>
              </div>
            )}
          </div>
        </section>

        {/* 2. Family Details */}
        <section className="rounded-lg p-4 bg-[#F8FAFC] border border-[#E2E8F0] shadow-xs">
          <div className="flex items-center justify-between border-b border-[#E0A96D]/40 pb-1.5 mb-3">
            <h2
              className="text-xs sm:text-sm font-bold tracking-wider text-[#064E3B] uppercase flex items-center gap-2"
              style={{ fontFamily: 'var(--font-cinzel), var(--font-devanagari-serif), serif' }}
            >
              <span className="size-1.5 rounded-full bg-[#E0A96D]" />
              {t('familyDetails')}
            </h2>
            <span className="text-[10px] text-slate-400 font-mono tracking-widest">02</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm">
            <div className="flex items-baseline sm:col-span-2">
              <span className="w-28 sm:w-32 text-slate-500 font-medium shrink-0">{t('fatherName')}:</span>
              <span className="font-semibold text-slate-900">
                {family.fatherName}
                {family.fatherOccupation ? ` (${family.fatherOccupation})` : ''}
              </span>
            </div>
            <div className="flex items-baseline sm:col-span-2">
              <span className="w-28 sm:w-32 text-slate-500 font-medium shrink-0">{t('motherName')}:</span>
              <span className="font-semibold text-slate-900">
                {family.motherName}
                {family.motherOccupation ? ` (${family.motherOccupation})` : ''}
              </span>
            </div>
            <div className="flex items-baseline sm:col-span-2">
              <span className="w-28 sm:w-32 text-slate-500 font-medium shrink-0">{t('siblingsCustom')}:</span>
              <span className="text-slate-800">
                {family.siblingsCustom ||
                  `${family.brothersCount} ${t('brothers')}, ${family.sistersCount} ${t('sisters')}`}
              </span>
            </div>
            <div className="flex items-baseline">
              <span className="w-28 sm:w-32 text-slate-500 font-medium shrink-0">{t('familyType')}:</span>
              <span className="text-slate-900">{family.familyType === 'joint' ? t('joint') : t('nuclear')}</span>
            </div>
            {family.nativePlace && (
              <div className="flex items-baseline">
                <span className="w-28 sm:w-32 text-slate-500 font-medium shrink-0">{t('nativePlace')}:</span>
                <span className="text-slate-900">{family.nativePlace}</span>
              </div>
            )}
            {family.aboutFamily && (
              <div className="flex items-baseline sm:col-span-2">
                <span className="w-28 sm:w-32 text-slate-500 font-medium shrink-0">{t('aboutFamily')}:</span>
                <span className="text-slate-700 italic">{family.aboutFamily}</span>
              </div>
            )}
          </div>
        </section>

        {/* 3. Horoscope Details (if enabled) */}
        {horoscope.enabled && (
          <section className="rounded-lg p-4 bg-[#F8FAFC] border border-[#E2E8F0] shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E0A96D]/40 pb-1.5 mb-3">
              <h2
                className="text-xs sm:text-sm font-bold tracking-wider text-[#064E3B] uppercase flex items-center gap-2"
                style={{ fontFamily: 'var(--font-cinzel), var(--font-devanagari-serif), serif' }}
              >
                <span className="size-1.5 rounded-full bg-[#E0A96D]" />
                {t('horoscopeDetails')}
              </h2>
              <span className="text-[10px] text-slate-400 font-mono tracking-widest">03</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm">
              {horoscope.rashi && (
                <div className="flex items-baseline">
                  <span className="w-28 sm:w-32 text-slate-500 font-medium shrink-0">{t('rashi')}:</span>
                  <span className="text-slate-900">{horoscope.rashi}</span>
                </div>
              )}
              {horoscope.nakshatra && (
                <div className="flex items-baseline">
                  <span className="w-28 sm:w-32 text-slate-500 font-medium shrink-0">{t('nakshatra')}:</span>
                  <span className="text-slate-900">{horoscope.nakshatra}</span>
                </div>
              )}
              <div className="flex items-baseline">
                <span className="w-28 sm:w-32 text-slate-500 font-medium shrink-0">{t('manglik')}:</span>
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
                  <span className="w-28 sm:w-32 text-slate-500 font-medium shrink-0">{t('birthTime')}:</span>
                  <span className="text-slate-900">{horoscope.birthTime}</span>
                </div>
              )}
              {horoscope.birthPlace && (
                <div className="flex items-baseline">
                  <span className="w-28 sm:w-32 text-slate-500 font-medium shrink-0">{t('birthPlace')}:</span>
                  <span className="text-slate-900">{horoscope.birthPlace}</span>
                </div>
              )}
              {horoscope.gan && (
                <div className="flex items-baseline">
                  <span className="w-28 sm:w-32 text-slate-500 font-medium shrink-0">{t('gan')}:</span>
                  <span className="text-slate-900">{horoscope.gan}</span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 4. About Me & Expectations */}
        {(data.aboutMe || data.partnerExpectations) && (
          <section className="rounded-lg p-4 bg-[#F8FAFC] border border-[#E2E8F0] shadow-xs space-y-2">
            <div className="flex items-center justify-between border-b border-[#E0A96D]/40 pb-1.5">
              <h2
                className="text-xs sm:text-sm font-bold tracking-wider text-[#064E3B] uppercase flex items-center gap-2"
                style={{ fontFamily: 'var(--font-cinzel), var(--font-devanagari-serif), serif' }}
              >
                <span className="size-1.5 rounded-full bg-[#E0A96D]" />
                {t('aboutMeTitle')}
              </h2>
            </div>
            {data.aboutMe && <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{data.aboutMe}</p>}
            {data.partnerExpectations && (
              <div className="pt-1 text-xs sm:text-sm">
                <span className="font-semibold text-[#064E3B]">{t('partnerExpectationsTitle')}: </span>
                <span className="text-slate-700 italic">{data.partnerExpectations}</span>
              </div>
            )}
            {data.hobbies && (
              <div className="text-xs sm:text-sm pt-0.5">
                <span className="text-slate-500">{t('hobbiesTitle')}: </span>
                <span className="text-slate-800">{data.hobbies}</span>
              </div>
            )}
          </section>
        )}

        {/* 5. Contact Details */}
        <section className="rounded-lg p-4 bg-[#064E3B]/5 border border-[#064E3B]/20 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#064E3B]/20 pb-1.5 mb-3">
            <h2
              className="text-xs sm:text-sm font-bold tracking-wider text-[#064E3B] uppercase flex items-center gap-2"
              style={{ fontFamily: 'var(--font-cinzel), var(--font-devanagari-serif), serif' }}
            >
              <span className="size-1.5 rounded-full bg-[#E0A96D]" />
              {t('contactDetails')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm">
            <div className="flex items-baseline">
              <span className="w-28 sm:w-32 text-slate-500 font-medium shrink-0">{t('phone')}:</span>
              <span className="font-bold text-slate-900">{contact.phone || '—'}</span>
            </div>
            {contact.altPhone && (
              <div className="flex items-baseline">
                <span className="w-28 sm:w-32 text-slate-500 font-medium shrink-0">{t('altPhone')}:</span>
                <span className="text-slate-900">{contact.altPhone}</span>
              </div>
            )}
            {contact.email && (
              <div className="flex items-baseline">
                <span className="w-28 sm:w-32 text-slate-500 font-medium shrink-0">{t('email')}:</span>
                <span className="text-slate-900">{contact.email}</span>
              </div>
            )}
            <div className="flex items-baseline sm:col-span-2">
              <span className="w-28 sm:w-32 text-slate-500 font-medium shrink-0">{t('address')}:</span>
              <span className="text-slate-900">{contact.address || '—'}</span>
            </div>
            {contact.referenceContact && (
              <div className="flex items-baseline sm:col-span-2">
                <span className="w-28 sm:w-32 text-slate-500 font-medium shrink-0">{t('referenceContact')}:</span>
                <span className="text-slate-900">{contact.referenceContact}</span>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Footer Bottom Accent */}
      <div className="relative z-10 text-center pt-5 pb-1">
        <HeaderFlourish className="w-36 h-3 mx-auto opacity-70" color="#E0A96D" />
      </div>
    </div>
  )
}
