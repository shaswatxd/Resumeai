import React from 'react'
import type { BiodataData } from '@/lib/biodata-types'
import {
  GaneshIcon,
  OmIcon,
  KalashIcon,
  SwastikIcon,
  EkOnkarIcon,
  CornerMandala,
  HeaderFlourish,
} from '../biodata-decorations'

interface TemplateProps {
  data: BiodataData
  t: (key: string) => string
}

export function RoyalMarigoldTemplate({ data, t }: TemplateProps) {
  const { personal, family, horoscope, contact } = data

  const renderSymbol = () => {
    switch (data.headerSymbol) {
      case 'ganesh':
        return <GaneshIcon className="size-14" color="#D4AF37" />
      case 'om':
        return <OmIcon className="size-14" color="#D4AF37" />
      case 'kalash':
        return <KalashIcon className="size-14" color="#D4AF37" />
      case 'swastik':
        return <SwastikIcon className="size-14" color="#DC2626" />
      case 'ekonkar':
        return <EkOnkarIcon className="size-14" color="#D4AF37" />
      default:
        return null
    }
  }

  return (
    <div
      className="relative w-full max-w-[794px] min-h-[1123px] bg-[#FFFDF9] text-[#2C1810] p-8 sm:p-10 shadow-xl mx-auto overflow-hidden"
      style={{
        fontFamily: 'var(--font-devanagari-sans), "Noto Sans Devanagari", "Mangal", sans-serif',
      }}
    >
      {/* Outer Royal Border */}
      <div className="absolute inset-3 sm:inset-4 border-2 border-[#D4AF37] pointer-events-none rounded-sm">
        <div className="absolute inset-1 border border-[#D4AF37]/50 rounded-sm" />
      </div>

      {/* 4 Corner Mandalas */}
      <div className="absolute top-4 left-4 pointer-events-none">
        <CornerMandala className="size-16 sm:size-20" color="#D4AF37" />
      </div>
      <div className="absolute top-4 right-4 rotate-90 pointer-events-none">
        <CornerMandala className="size-16 sm:size-20" color="#D4AF37" />
      </div>
      <div className="absolute bottom-4 left-4 -rotate-90 pointer-events-none">
        <CornerMandala className="size-16 sm:size-20" color="#D4AF37" />
      </div>
      <div className="absolute bottom-4 right-4 rotate-180 pointer-events-none">
        <CornerMandala className="size-16 sm:size-20" color="#D4AF37" />
      </div>

      {/* Header Section */}
      <div className="relative z-10 text-center pt-2 pb-5">
        {data.headerSymbol !== 'none' && (
          <div className="flex justify-center mb-1 drop-shadow-sm">{renderSymbol()}</div>
        )}
        {data.headerTitle && (
          <h2
            className="text-lg sm:text-xl font-bold tracking-wide text-[#800020] uppercase mb-1"
            style={{
              fontFamily: 'var(--font-devanagari-serif), "Martel", serif',
            }}
          >
            {data.headerTitle}
          </h2>
        )}
        <h1
          className="text-2xl sm:text-3xl font-extrabold text-[#800020] tracking-wider uppercase drop-shadow-sm"
          style={{
            fontFamily: 'var(--font-devanagari-serif), "Martel", serif',
          }}
        >
          {personal.fullName || t('biodataTitle')}
        </h1>
        <div className="flex justify-center mt-1">
          <HeaderFlourish className="w-52 h-4" color="#D4AF37" />
        </div>
      </div>

      {/* Content Grid / Flow */}
      <div className="relative z-10 space-y-5 px-3 sm:px-5">
        {/* Photo + Personal Summary Header Row (if photo active) */}
        {data.showPhoto && data.photo && (
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-3 rounded-lg border border-[#D4AF37]/40 bg-[#FAF3E0]/40">
            <div className="relative shrink-0">
              <div className="size-28 sm:size-32 rounded-lg overflow-hidden border-2 border-[#D4AF37] shadow-md bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.photo}
                  alt={personal.fullName}
                  className="size-full object-cover object-center"
                />
              </div>
            </div>
            <div className="flex-1 space-y-1 text-center sm:text-left">
              <div className="text-xl font-bold text-[#800020]">{personal.fullName}</div>
              <div className="text-sm text-slate-700 font-medium">
                {personal.education} • {personal.occupation}
              </div>
              <div className="text-xs text-slate-600">
                {t('age')}: {personal.age} | {t('height')}: {personal.height}
              </div>
            </div>
          </div>
        )}

        {/* 1. Personal Details Section */}
        <section className="space-y-2">
          <div className="flex items-center gap-2 border-b-2 border-[#800020]/20 pb-1">
            <div className="size-2 rounded-full bg-[#800020]" />
            <h3
              className="text-base sm:text-lg font-bold text-[#800020] tracking-wide uppercase"
              style={{ fontFamily: 'var(--font-devanagari-serif), "Martel", serif' }}
            >
              {t('personalDetails')}
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-[#D4AF37] to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm">
            {!data.showPhoto && (
              <div className="flex items-baseline">
                <span className="w-32 sm:w-36 font-semibold text-[#800020] shrink-0">{t('fullName')}:</span>
                <span className="font-bold text-slate-900">{personal.fullName || '—'}</span>
              </div>
            )}
            <div className="flex items-baseline">
              <span className="w-32 sm:w-36 font-semibold text-[#800020] shrink-0">{t('dob')}:</span>
              <span className="text-slate-800">{personal.dob || '—'}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-32 sm:w-36 font-semibold text-[#800020] shrink-0">{t('age')}:</span>
              <span className="text-slate-800">{personal.age || '—'}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-32 sm:w-36 font-semibold text-[#800020] shrink-0">{t('height')}:</span>
              <span className="text-slate-800">{personal.height || '—'}</span>
            </div>
            {personal.complexion && (
              <div className="flex items-baseline">
                <span className="w-32 sm:w-36 font-semibold text-[#800020] shrink-0">{t('complexion')}:</span>
                <span className="text-slate-800">{personal.complexion}</span>
              </div>
            )}
            {personal.bloodGroup && (
              <div className="flex items-baseline">
                <span className="w-32 sm:w-36 font-semibold text-[#800020] shrink-0">{t('bloodGroup')}:</span>
                <span className="text-slate-800">{personal.bloodGroup}</span>
              </div>
            )}
            <div className="flex items-baseline">
              <span className="w-32 sm:w-36 font-semibold text-[#800020] shrink-0">{t('maritalStatus')}:</span>
              <span className="text-slate-800">{personal.maritalStatus || '—'}</span>
            </div>
            <div className="flex items-baseline sm:col-span-2">
              <span className="w-32 sm:w-36 font-semibold text-[#800020] shrink-0">{t('education')}:</span>
              <span className="text-slate-800 font-medium">
                {personal.education}
                {personal.educationDetail ? ` (${personal.educationDetail})` : ''}
              </span>
            </div>
            <div className="flex items-baseline sm:col-span-2">
              <span className="w-32 sm:w-36 font-semibold text-[#800020] shrink-0">{t('occupation')}:</span>
              <span className="text-slate-800 font-medium">
                {personal.occupation}
                {personal.company ? ` at ${personal.company}` : ''}
              </span>
            </div>
            {personal.income && (
              <div className="flex items-baseline">
                <span className="w-32 sm:w-36 font-semibold text-[#800020] shrink-0">{t('income')}:</span>
                <span className="text-slate-800 font-medium">{personal.income}</span>
              </div>
            )}
            <div className="flex items-baseline">
              <span className="w-32 sm:w-36 font-semibold text-[#800020] shrink-0">{t('religion')}:</span>
              <span className="text-slate-800">{personal.religion || '—'}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-32 sm:w-36 font-semibold text-[#800020] shrink-0">{t('caste')}:</span>
              <span className="text-slate-800">
                {personal.caste}
                {personal.subcaste ? ` (${personal.subcaste})` : ''}
              </span>
            </div>
            {personal.gotra && (
              <div className="flex items-baseline">
                <span className="w-32 sm:w-36 font-semibold text-[#800020] shrink-0">{t('gotra')}:</span>
                <span className="text-slate-800">{personal.gotra}</span>
              </div>
            )}
          </div>
        </section>

        {/* 2. Family Details Section */}
        <section className="space-y-2">
          <div className="flex items-center gap-2 border-b-2 border-[#800020]/20 pb-1">
            <div className="size-2 rounded-full bg-[#800020]" />
            <h3
              className="text-base sm:text-lg font-bold text-[#800020] tracking-wide uppercase"
              style={{ fontFamily: 'var(--font-devanagari-serif), "Martel", serif' }}
            >
              {t('familyDetails')}
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-[#D4AF37] to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm">
            <div className="flex items-baseline sm:col-span-2">
              <span className="w-32 sm:w-36 font-semibold text-[#800020] shrink-0">{t('fatherName')}:</span>
              <span className="text-slate-800 font-medium">
                {family.fatherName}
                {family.fatherOccupation ? ` (${family.fatherOccupation})` : ''}
              </span>
            </div>
            <div className="flex items-baseline sm:col-span-2">
              <span className="w-32 sm:w-36 font-semibold text-[#800020] shrink-0">{t('motherName')}:</span>
              <span className="text-slate-800 font-medium">
                {family.motherName}
                {family.motherOccupation ? ` (${family.motherOccupation})` : ''}
              </span>
            </div>
            <div className="flex items-baseline sm:col-span-2">
              <span className="w-32 sm:w-36 font-semibold text-[#800020] shrink-0">{t('siblingsCustom')}:</span>
              <span className="text-slate-800">
                {family.siblingsCustom ||
                  `${family.brothersCount} ${t('brothers')} (${family.brothersMarried} Married), ${family.sistersCount} ${t('sisters')} (${family.sistersMarried} Married)`}
              </span>
            </div>
            <div className="flex items-baseline">
              <span className="w-32 sm:w-36 font-semibold text-[#800020] shrink-0">{t('familyType')}:</span>
              <span className="text-slate-800">{family.familyType === 'joint' ? t('joint') : t('nuclear')}</span>
            </div>
            {family.nativePlace && (
              <div className="flex items-baseline">
                <span className="w-32 sm:w-36 font-semibold text-[#800020] shrink-0">{t('nativePlace')}:</span>
                <span className="text-slate-800">{family.nativePlace}</span>
              </div>
            )}
            {family.aboutFamily && (
              <div className="flex items-baseline sm:col-span-2">
                <span className="w-32 sm:w-36 font-semibold text-[#800020] shrink-0">{t('aboutFamily')}:</span>
                <span className="text-slate-700 italic">{family.aboutFamily}</span>
              </div>
            )}
          </div>
        </section>

        {/* 3. Horoscope Details Section (if enabled) */}
        {horoscope.enabled && (
          <section className="space-y-2">
            <div className="flex items-center gap-2 border-b-2 border-[#800020]/20 pb-1">
              <div className="size-2 rounded-full bg-[#800020]" />
              <h3
                className="text-base sm:text-lg font-bold text-[#800020] tracking-wide uppercase"
                style={{ fontFamily: 'var(--font-devanagari-serif), "Martel", serif' }}
              >
                {t('horoscopeDetails')}
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-[#D4AF37] to-transparent" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm">
              {horoscope.rashi && (
                <div className="flex items-baseline">
                  <span className="w-32 sm:w-36 font-semibold text-[#800020] shrink-0">{t('rashi')}:</span>
                  <span className="text-slate-800">{horoscope.rashi}</span>
                </div>
              )}
              {horoscope.nakshatra && (
                <div className="flex items-baseline">
                  <span className="w-32 sm:w-36 font-semibold text-[#800020] shrink-0">{t('nakshatra')}:</span>
                  <span className="text-slate-800">{horoscope.nakshatra}</span>
                </div>
              )}
              <div className="flex items-baseline">
                <span className="w-32 sm:w-36 font-semibold text-[#800020] shrink-0">{t('manglik')}:</span>
                <span className="text-slate-800 font-medium">
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
                  <span className="w-32 sm:w-36 font-semibold text-[#800020] shrink-0">{t('birthTime')}:</span>
                  <span className="text-slate-800">{horoscope.birthTime}</span>
                </div>
              )}
              {horoscope.birthPlace && (
                <div className="flex items-baseline">
                  <span className="w-32 sm:w-36 font-semibold text-[#800020] shrink-0">{t('birthPlace')}:</span>
                  <span className="text-slate-800">{horoscope.birthPlace}</span>
                </div>
              )}
              {horoscope.gan && (
                <div className="flex items-baseline">
                  <span className="w-32 sm:w-36 font-semibold text-[#800020] shrink-0">{t('gan')}:</span>
                  <span className="text-slate-800">{horoscope.gan}</span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 4. About Candidate & Partner Expectations (if available) */}
        {(data.aboutMe || data.partnerExpectations) && (
          <section className="space-y-2">
            <div className="flex items-center gap-2 border-b-2 border-[#800020]/20 pb-1">
              <div className="size-2 rounded-full bg-[#800020]" />
              <h3
                className="text-base sm:text-lg font-bold text-[#800020] tracking-wide uppercase"
                style={{ fontFamily: 'var(--font-devanagari-serif), "Martel", serif' }}
              >
                {t('aboutMeTitle')}
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-[#D4AF37] to-transparent" />
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-slate-800 leading-relaxed">
              {data.aboutMe && <p className="bg-[#FAF3E0]/30 p-2.5 rounded border-l-2 border-[#D4AF37]">{data.aboutMe}</p>}
              {data.partnerExpectations && (
                <div>
                  <span className="font-semibold text-[#800020] block mb-0.5">{t('partnerExpectationsTitle')}:</span>
                  <p className="text-slate-700 italic">{data.partnerExpectations}</p>
                </div>
              )}
              {data.hobbies && (
                <div className="flex items-baseline pt-1">
                  <span className="font-semibold text-[#800020] shrink-0 mr-2">{t('hobbiesTitle')}:</span>
                  <span className="text-slate-700">{data.hobbies}</span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 5. Contact Details Section */}
        <section className="space-y-2 pt-1">
          <div className="flex items-center gap-2 border-b-2 border-[#800020]/20 pb-1">
            <div className="size-2 rounded-full bg-[#800020]" />
            <h3
              className="text-base sm:text-lg font-bold text-[#800020] tracking-wide uppercase"
              style={{ fontFamily: 'var(--font-devanagari-serif), "Martel", serif' }}
            >
              {t('contactDetails')}
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-[#D4AF37] to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm">
            <div className="flex items-baseline">
              <span className="w-32 sm:w-36 font-semibold text-[#800020] shrink-0">{t('phone')}:</span>
              <span className="font-semibold text-slate-900">{contact.phone || '—'}</span>
            </div>
            {contact.altPhone && (
              <div className="flex items-baseline">
                <span className="w-32 sm:w-36 font-semibold text-[#800020] shrink-0">{t('altPhone')}:</span>
                <span className="text-slate-800">{contact.altPhone}</span>
              </div>
            )}
            {contact.email && (
              <div className="flex items-baseline">
                <span className="w-32 sm:w-36 font-semibold text-[#800020] shrink-0">{t('email')}:</span>
                <span className="text-slate-800">{contact.email}</span>
              </div>
            )}
            <div className="flex items-baseline sm:col-span-2">
              <span className="w-32 sm:w-36 font-semibold text-[#800020] shrink-0">{t('address')}:</span>
              <span className="text-slate-800">{contact.address || '—'}</span>
            </div>
            {contact.referenceContact && (
              <div className="flex items-baseline sm:col-span-2">
                <span className="w-32 sm:w-36 font-semibold text-[#800020] shrink-0">{t('referenceContact')}:</span>
                <span className="text-slate-800">{contact.referenceContact}</span>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Footer Auspicious blessing line */}
      <div className="relative z-10 text-center pt-6 pb-2">
        <p
          className="text-xs text-[#800020]/80 tracking-widest font-semibold"
          style={{ fontFamily: 'var(--font-devanagari-serif), "Martel", serif' }}
        >
          || सदा सर्वदा शुभ मंगलम ||
        </p>
      </div>
    </div>
  )
}
