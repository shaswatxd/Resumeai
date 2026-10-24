import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resume Templates',
  description:
    '15 professional, original resume templates with live previews. Pick a layout, accent color, font and section order — switch anytime without losing content.',
}

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
