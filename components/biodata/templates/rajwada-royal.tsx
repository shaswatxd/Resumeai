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

export function RajwadaRoyalTemplate({ data, t }: TemplateProps) {
  const { personal, family, horoscope, contact } = data

  const renderSymbol = () => {
    switch (data.headerSymbol) {
      case 'ganesh':
        return <GaneshIcon className="size-13" color="#CA8A04" />
      case 'om':
        return <OmIcon className="size-13" color="#CA8A04" />
      case 'kalash':
        return <KalashIcon className="size-13" color="#CA8A04" />
      case 'swastik':
        return <SwastikIcon className="size-13" color="#DC2626" />
      case 'ekonkar':
        return <EkOnkarIcon className="size-13" color="#CA8A04" />
      default:
        return null
    }
  }

  return (
    <div
      className="relative w-full max-w-[794px] min-h-[1123px] bg-[#FCFBF7] text-[#1E293B] p-8 sm:p-10 shadow-2xl mx-auto overflow-hidden border-8 border-[#0F172A]"
      style={{
        fontFamily: 'var(--font-devanagari-sans), "Noto Sans Devanagari", "Mangal", sans-serif',
      }}
    >
      {/* Ornate Gold Inset Border */}
      <div className="absolute inset-2.5 border-2 border-[#CA8A04] pointer-events-none rounded-sm">
        <div className="absolute inset-1 border border-[#CA8A04]/40" />
      </div>

      {/* 4 Corner Ornaments */}
      <div className="absolute top-3 left-3 pointer-events-none">
        <CornerMandala className="size-14 sm:size-16" color="#CA8A04" />
      </div>
      <div className="absolute top-3 right-3 rotate-90 pointer-events-none">
        <CornerMandala className="size-14 sm:size-16" color="#CA8A04" />
      </div>
      <div className="absolute bottom-3 left-3 -rotate-90 pointer-events-none">
        <CornerMandala className="size-14 sm:size-16" color="#CA8A04" />
      </div>
      <div className="absolute bottom-3 right-3 rotate-180 pointer-events-none">
        <CornerMandala className="size-14 sm:size-16" color="#CA8A04" />
      </div>

      {/* Royal Rajwada Header Banner */}
      <div className="relative z-10 text-center pt-2 pb-4">
        {data.headerSymbol !== 'none' && (
          <div className="flex justify-center mb-1 drop-shadow-sm">{renderSymbol()}</div>
        )}
        {data.headerTitle && (
          <div
            className="text-xs sm:text-sm font-bold tracking-widest text-[#CA8A04] uppercase mb-1"
            style={{ fontFamily: 'var(--font-devanagari-serif), "Martel", serif' }}
          >
            {data.headerTitle}
          </div>
        )}
        <div className="inline-block bg-[#0F172A] text-[#F8FAFC] px-6 py-2 rounded shadow-md border-b-2 border-[#CA8A04]">
          <h1
            className="text-xl sm:text-2xl font-bold tracking-wider uppercase text-[#FEF08A]"
            style={{ fontFamily: 'var(--font-devanagari-serif), "Martel", serif' }}
          >
            {personal.fullName || t('biodataTitle')}
          </h1>
        </div>
        <div className="flex justify-center mt-2">
          <HeaderFlourish className="w-48 h-3.5" color="#CA8A04" />
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="relative z-10 space-y-4 px-3 sm:px-5">
        {/* Photo Row (if provided) */}
        {data.showPhoto && data.photo && (
          <div className="flex items-center justify-center mb-3">
            <div className="size-28 sm:size-32 rounded-sm overflow-hidden border-2 border-[#CA8A04] p-1 bg-[#0F172A] shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.photo}
                alt={personal.fullName}
                className="size-full object-cover object-center rounded-xs"
              />
            </div>
          </div>
        )}

        {/* 1. Personal Details */}
        <section className="space-y-1.5">
          <div className="flex items-center gap-2 bg-[#0F172A]/5 px-2.5 py-1 rounded border-l-4 border-[#0F172A]">
            <h3
              className="text-xs sm:text-sm font-bold text-[#0F172A] tracking-wider uppercase"
              style={{ fontFamily: 'var(--font-devanagari-serif), "Martel", serif' }}
            >
              {t('personalDetails')}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-sm pt-1">
            <div className="flex items-baseline">
              <span className="w-32 sm:w-36 font-semibold text-[#0F172A] shrink-0">{t('dob')}:</span>
              <span className="text-slate-800">{personal.dob || '—'}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-32 sm:w-36 font-semibold text-[#0F172A] shrink-0">{t('age')}:</span>
              <span className="text-slate-800">{personal.age || '—'}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-32 sm:w-36 font-semibold text-[#0F172A] shrink-0">{t('height')}:</span>
              <span className="text-slate-800">{personal.height || '—'}</span>
            </div>
            {personal.complexion && (
              <div className="flex items-baseline">
                <span className="w-32 sm:w-36 font-semibold text-[#0F172A] shrink-0">{t('complexion')}:</span>
                <span className="text-slate-800">{personal.complexion}</span>
              </div>
            )}
            {personal.bloodGroup && (
              <div className="flex items-baseline">
                <span className="w-32 sm:w-36 font-semibold text-[#0F172A] shrink-0">{t('bloodGroup')}:</span>
                <span className="text-slate-800">{personal.bloodGroup}</span>
              </div>
            )}
            <div className="flex items-baseline">
              <span className="w-32 sm:w-36 font-semibold text-[#0F172A] shrink-0">{t('maritalStatus')}:</span>
              <span className="text-slate-800">{personal.maritalStatus || '—'}</span>
            </div>
            <div className="flex items-baseline sm:col-span-2">
              <span className="w-32 sm:w-36 font-semibold text-[#0F172A] shrink-0">{t('education')}:</span>
              <span className="text-slate-900 font-semibold">
                {personal.education}
                {personal.educationDetail ? ` (${personal.educationDetail})` : ''}
              </span>
            </div>
            <div className="flex items-baseline sm:col-span-2">
              <span className="w-32 sm:w-36 font-semibold text-[#0F172A] shrink-0">{t('occupation')}:</span>
              <span className="text-slate-900 font-semibold">
                {personal.occupation}
                {personal.company ? ` (${personal.company})` : ''}
              </span>
            </div>
            {personal.income && (
              <div className="flex items-baseline">
                <span className="w-32 sm:w-36 font-semibold text-[#0F172A] shrink-0">{t('income')}:</span>
                <span className="text-[#0F172A] font-bold">{personal.income}</span>
              </div>
            )}
            <div className="flex items-baseline">
              <span className="w-32 sm:w-36 font-semibold text-[#0F172A] shrink-0">{t('religion')}:</span>
              <span className="text-slate-800">{personal.religion}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-32 sm:w-36 font-semibold text-[#0F172A] shrink-0">{t('caste')}:</span>
              <span className="text-slate-800">
                {personal.caste}
                {personal.subcaste ? ` (${personal.subcaste})` : ''}
              </span>
            </div>
            {personal.gotra && (
              <div className="flex items-baseline">
                <span className="w-32 sm:w-36 font-semibold text-[#0F172A] shrink-0">{t('gotra')}:</span>
                <span className="text-slate-800">{personal.gotra}</span>
              </div>
            )}
          </div>
        </section>

        {/* 2. Family Details */}
        <section className="space-y-1.5">
          <div className="flex items-center gap-2 bg-[#0F172A]/5 px-2.5 py-1 rounded border-l-4 border-[#0F172A]">
            <h3
              className="text-xs sm:text-sm font-bold text-[#0F172A] tracking-wider uppercase"
              style={{ fontFamily: 'var(--font-devanagari-serif), "Martel", serif' }}
            >
              {t('familyDetails')}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-sm pt-1">
            <div className="flex items-baseline sm:col-span-2">
              <span className="w-32 sm:w-36 font-semibold text-[#0F172A] shrink-0">{t('fatherName')}:</span>
              <span className="text-slate-800 font-medium">
                {family.fatherName}
                {family.fatherOccupation ? ` (${family.fatherOccupation})` : ''}
              </span>
            </div>
            <div className="flex items-baseline sm:col-span-2">
              <span className="w-32 sm:w-36 font-semibold text-[#0F172A] shrink-0">{t('motherName')}:</span>
              <span className="text-slate-800 font-medium">
                {family.motherName}
                {family.motherOccupation ? ` (${family.motherOccupation})` : ''}
              </span>
            </div>
            <div className="flex items-baseline sm:col-span-2">
              <span className="w-32 sm:w-36 font-semibold text-[#0F172A] shrink-0">{t('siblingsCustom')}:</span>
              <span className="text-slate-800">
                {family.siblingsCustom ||
                  `${family.brothersCount} ${t('brothers')}, ${family.sistersCount} ${t('sisters')}`}
              </span>
            </div>
            <div className="flex items-baseline">
              <span className="w-32 sm:w-36 font-semibold text-[#0F172A] shrink-0">{t('familyType')}:</span>
              <span className="text-slate-800">{family.familyType === 'joint' ? t('joint') : t('nuclear')}</span>
            </div>
            {family.nativePlace && (
              <div className="flex items-baseline">
                <span className="w-32 sm:w-36 font-semibold text-[#0F172A] shrink-0">{t('nativePlace')}:</span>
                <span className="text-slate-800">{family.nativePlace}</span>
              </div>
            )}
            {family.aboutFamily && (
              <div className="flex items-baseline sm:col-span-2">
                <span className="w-32 sm:w-36 font-semibold text-[#0F172A] shrink-0">{t('aboutFamily')}:</span>
                <span className="text-slate-700 italic">{family.aboutFamily}</span>
              </div>
            )}
          </div>
        </section>

        {/* 3. Horoscope Details (if enabled) */}
        {horoscope.enabled && (
          <section className="space-y-1.5">
            <div className="flex items-center gap-2 bg-[#0F172A]/5 px-2.5 py-1 rounded border-l-4 border-[#0F172A]">
              <h3
                className="text-xs sm:text-sm font-bold text-[#0F172A] tracking-wider uppercase"
                style={{ fontFamily: 'var(--font-devanagari-serif), "Martel", serif' }}
              >
                {t('horoscopeDetails')}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-sm pt-1">
              {horoscope.rashi && (
                <div className="flex items-baseline">
                  <span className="w-32 sm:w-36 font-semibold text-[#0F172A] shrink-0">{t('rashi')}:</span>
                  <span className="text-slate-800">{horoscope.rashi}</span>
                </div>
              )}
              {horoscope.nakshatra && (
                <div className="flex items-baseline">
                  <span className="w-32 sm:w-36 font-semibold text-[#0F172A] shrink-0">{t('nakshatra')}:</span>
                  <span className="text-slate-800">{horoscope.nakshatra}</span>
                </div>
              )}
              <div className="flex items-baseline">
                <span className="w-32 sm:w-36 font-semibold text-[#0F172A] shrink-0">{t('manglik')}:</span>
                <span className="text-slate-900 font-bold">
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
                  <span className="w-32 sm:w-36 font-semibold text-[#0F172A] shrink-0">{t('birthTime')}:</span>
                  <span className="text-slate-800">{horoscope.birthTime}</span>
                </div>
              )}
              {horoscope.birthPlace && (
                <div className="flex items-baseline">
                  <span className="w-32 sm:w-36 font-semibold text-[#0F172A] shrink-0">{t('birthPlace')}:</span>
                  <span className="text-slate-800">{horoscope.birthPlace}</span>
                </div>
              )}
              {horoscope.gan && (
                <div className="flex items-baseline">
                  <span className="w-32 sm:w-36 font-semibold text-[#0F172A] shrink-0">{t('gan')}:</span>
                  <span className="text-slate-800">{horoscope.gan}</span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 4. About & Partner Expectations */}
        {(data.aboutMe || data.partnerExpectations) && (
          <section className="space-y-1.5">
            <div className="flex items-center gap-2 bg-[#0F172A]/5 px-2.5 py-1 rounded border-l-4 border-[#0F172A]">
              <h3
                className="text-xs sm:text-sm font-bold text-[#0F172A] tracking-wider uppercase"
                style={{ fontFamily: 'var(--font-devanagari-serif), "Martel", serif' }}
              >
                {t('aboutMeTitle')}
              </h3>
            </div>
            {data.aboutMe && <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-[#F8FAFC] p-2 rounded">{data.aboutMe}</p>}
            {data.partnerExpectations && (
              <div className="pt-1 text-xs sm:text-sm">
                <span className="font-semibold text-[#0F172A]">{t('partnerExpectationsTitle')}: </span>
                <span className="text-slate-700 italic">{data.partnerExpectations}</span>
              </div>
            )}
            {data.hobbies && (
              <div className="text-xs sm:text-sm pt-0.5">
                <span className="font-medium text-slate-500">{t('hobbiesTitle')}: </span>
                <span className="text-slate-800">{data.hobbies}</span>
              </div>
            )}
          </section>
        )}

        {/* 5. Contact Details */}
        <section className="space-y-1.5">
          <div className="flex items-center gap-2 bg-[#0F172A]/5 px-2.5 py-1 rounded border-l-4 border-[#0F172A]">
            <h3
              className="text-xs sm:text-sm font-bold text-[#0F172A] tracking-wider uppercase"
              style={{ fontFamily: 'var(--font-devanagari-serif), "Martel", serif' }}
            >
              {t('contactDetails')}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-sm pt-1">
            <div className="flex items-baseline">
              <span className="w-32 sm:w-36 font-semibold text-[#0F172A] shrink-0">{t('phone')}:</span>
              <span className="font-bold text-slate-900">{contact.phone || '—'}</span>
            </div>
            {contact.altPhone && (
              <div className="flex items-baseline">
                <span className="w-32 sm:w-36 font-semibold text-[#0F172A] shrink-0">{t('altPhone')}:</span>
                <span className="text-slate-800">{contact.altPhone}</span>
              </div>
            )}
            {contact.email && (
              <div className="flex items-baseline">
                <span className="w-32 sm:w-36 font-semibold text-[#0F172A] shrink-0">{t('email')}:</span>
                <span className="text-slate-800">{contact.email}</span>
              </div>
            )}
            <div className="flex items-baseline sm:col-span-2">
              <span className="w-32 sm:w-36 font-semibold text-[#0F172A] shrink-0">{t('address')}:</span>
              <span className="text-slate-800">{contact.address || '—'}</span>
            </div>
            {contact.referenceContact && (
              <div className="flex items-baseline sm:col-span-2">
                <span className="w-32 sm:w-36 font-semibold text-[#0F172A] shrink-0">{t('referenceContact')}:</span>
                <span className="text-slate-800">{contact.referenceContact}</span>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center pt-5 pb-1">
        <p
          className="text-xs text-[#CA8A04] tracking-widest font-semibold"
          style={{ fontFamily: 'var(--font-devanagari-serif), "Martel", serif' }}
        >
          || ॐ श्री गुरुवे नमः ||
        </p>
      </div>
    </div>
  )
}
