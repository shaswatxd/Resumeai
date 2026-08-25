import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import {
  Geist,
  Geist_Mono,
  Fraunces,
  Inter,
  Poppins,
  Roboto,
  Lato,
  Montserrat,
  Nunito,
  Open_Sans,
  Playfair_Display,
  Merriweather,
  Raleway,
} from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
})

/* Resume-document font library — see lib/fonts.ts for the FontId -> cssVar map */
const resumeInter = Inter({ subsets: ['latin'], variable: '--font-resume-inter', weight: ['400', '500', '600', '700'] })
const resumePoppins = Poppins({ subsets: ['latin'], variable: '--font-resume-poppins', weight: ['400', '500', '600', '700'] })
const resumeRoboto = Roboto({ subsets: ['latin'], variable: '--font-resume-roboto', weight: ['400', '500', '700'] })
const resumeLato = Lato({ subsets: ['latin'], variable: '--font-resume-lato', weight: ['400', '700'] })
const resumeMontserrat = Montserrat({ subsets: ['latin'], variable: '--font-resume-montserrat', weight: ['400', '500', '600', '700'] })
const resumeNunito = Nunito({ subsets: ['latin'], variable: '--font-resume-nunito', weight: ['400', '600', '700'] })
const resumeOpenSans = Open_Sans({ subsets: ['latin'], variable: '--font-resume-open-sans', weight: ['400', '600', '700'] })
const resumePlayfair = Playfair_Display({ subsets: ['latin'], variable: '--font-resume-playfair', weight: ['400', '600', '700'] })
const resumeMerriweather = Merriweather({ subsets: ['latin'], variable: '--font-resume-merriweather', weight: ['400', '700'] })
const resumeRaleway = Raleway({ subsets: ['latin'], variable: '--font-resume-raleway', weight: ['400', '500', '600', '700'] })

const resumeFontVars = [
  resumeInter,
  resumePoppins,
  resumeRoboto,
  resumeLato,
  resumeMontserrat,
  resumeNunito,
  resumeOpenSans,
  resumePlayfair,
  resumeMerriweather,
  resumeRaleway,
]
  .map((f) => f.variable)
  .join(' ')

const SITE_URL = 'https://resumeaihai.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'ResumePro — Free Professional Resume Builder with ATS Auditor',
    template: '%s · ResumePro',
  },
  description:
    'Build a standout resume in minutes: 26 premium templates, pro bullet & phrase library, ATS score with job-description matching, smart cover letters, and one-click PDF export. Free, no sign-up.',
  keywords: [
    'resume builder',
    'free resume maker',
    'ATS resume checker',
    'resume templates',
    'CV maker',
    'cover letter generator',
    'clean resume format',
    'PDF resume export',
    'FAANG resume',
  ],
  authors: [{ name: 'ResumePro' }],
  creator: 'ResumePro',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: 'ResumePro — Free Professional Resume Builder with ATS Auditor',
    description:
      '26 premium templates, pro bullet library, ATS scoring, cover letters and one-click PDF. Free, no sign-up.',
    siteName: 'ResumePro',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'ResumePro' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ResumePro — Free Professional Resume Builder',
    description:
      '26 templates · Pro bullet library · ATS score · Cover letters · Free PDF export',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#1a1526',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark bg-background ${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${resumeFontVars}`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
