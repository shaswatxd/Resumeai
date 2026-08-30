import { Analytics } from '@vercel/analytics/next'
import { ToastProvider } from '@/components/ui/toast'
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
    default: 'ResumeAI — Free Professional Resume Builder with ATS Auditor',
    template: '%s · ResumeAI',
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
  authors: [{ name: 'ResumeAI' }],
  creator: 'ResumeAI',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: 'ResumeAI — Free Professional Resume Builder with ATS Auditor',
    description:
      '26 premium templates, pro bullet library, ATS scoring, cover letters and one-click PDF. Free, no sign-up.',
    siteName: 'ResumeAI',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'ResumeAI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ResumeAI — Free Professional Resume Builder',
    description:
      '26 templates · Pro bullet library · ATS score · Cover letters · Free PDF export',
    images: ['/og.png'],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-dark-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
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
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
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
      <body className="font-sans antialiased overflow-x-hidden max-w-[100vw]">
        <ToastProvider>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ToastProvider>
      </body>
    </html>
  )
}
