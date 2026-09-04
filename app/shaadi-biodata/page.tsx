import { BiodataShell } from '@/components/biodata/biodata-shell'

export default function ShaadiBiodataPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Shaadi Biodata Maker — ResumeAI',
    url: 'https://resumeaihai.vercel.app/shaadi-biodata',
    description:
      'Free online Indian matrimonial biodata generator supporting Hindi (Devanagari) and English, traditional auspicious themes, horoscope details, and high-resolution A4 vector PDF export.',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    featureList: [
      'Devanagari Unicode & English language toggle',
      'Traditional Indian templates (Royal Crimson, Vedic Heritage, Rajwada, Modern Grace)',
      'Auspicious header crests (Ganesh, Om, Kalash, Swastik, Ek Onkar)',
      'Auto-age calculation from Date of Birth',
      'Horoscope & Kundali details (Rashi, Nakshatra, Manglik status)',
      'AI-assisted matrimonial bio writing',
      'Instant A4 vector PDF export',
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-dvh w-full">
        <BiodataShell />
      </main>
    </>
  )
}
