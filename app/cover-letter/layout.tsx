import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Smart Cover Letter Generator',
  description:
    'Generate a tailored, editable cover letter from your resume in seconds. Pick a tone, customize details, and export as PDF.',
}

export default function CoverLetterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
