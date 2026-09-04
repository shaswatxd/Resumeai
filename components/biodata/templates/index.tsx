import React from 'react'
import type { BiodataData, BiodataTemplateId } from '@/lib/biodata-types'
import { RoyalMarigoldTemplate } from './royal-marigold'
import { VedicHeritageTemplate } from './vedic-heritage'
import { ModernGraceTemplate } from './modern-grace'
import { RajwadaRoyalTemplate } from './rajwada-royal'
import { SubhMangalamTemplate } from './subh-mangalam'

export const BIODATA_TEMPLATE_MAP: Record<
  BiodataTemplateId,
  React.ComponentType<{ data: BiodataData; t: (key: string) => string }>
> = {
  'royal-marigold': RoyalMarigoldTemplate,
  'vedic-heritage': VedicHeritageTemplate,
  'modern-grace': ModernGraceTemplate,
  'rajwada-royal': RajwadaRoyalTemplate,
  'subh-mangalam': SubhMangalamTemplate,
}

export function BiodataDocument({
  data,
  template,
  t,
}: {
  data: BiodataData
  template: BiodataTemplateId
  t: (key: string) => string
}) {
  const Component = BIODATA_TEMPLATE_MAP[template] || RoyalMarigoldTemplate
  return <Component data={data} t={t} />
}
