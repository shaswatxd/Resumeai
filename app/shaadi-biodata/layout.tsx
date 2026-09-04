import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shaadi Biodata Maker — Free Matrimonial Biodata Generator (Hindi & English)',
  description:
    'Create an elegant marriage biodata in Hindi (Devanagari) or English with traditional Indian templates (Shubh Vivah, Vedic Heritage, Rajwada). Free PDF download with horoscope, family details, and AI writing assist.',
  keywords: [
    'biodata maker for marriage',
    'shaadi biodata format free',
    'matrimonial biodata Hindi',
    'marriage biodata maker online',
    'free biodata for marriage',
    'kundali biodata format',
    'Indian marriage biodata PDF',
    'shubh vivah biodata maker',
  ],
  openGraph: {
    title: 'Free Shaadi Biodata Maker | Indian Matrimonial Biodata Generator',
    description:
      'Design traditional Indian marriage biodatas in Hindi and English. Choose from Royal Marigold, Vedic Heritage, and Rajwada themes. Instant A4 vector PDF download.',
    url: 'https://resumeaihai.vercel.app/shaadi-biodata',
    siteName: 'ResumeAI',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://resumeaihai.vercel.app/shaadi-biodata',
  },
}

export default function ShaadiBiodataLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
