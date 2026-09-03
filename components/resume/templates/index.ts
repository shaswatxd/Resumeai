import type { TemplateId } from '@/lib/resume-types'
import type { TP } from '@/components/resume/blocks'
import { AtsProTemplate } from './ats-pro'
import { ModernTemplate } from './modern'
import { CorporateTemplate } from './corporate'
import { MinimalTemplate } from './minimal'
import { ElegantTemplate } from './elegant'
import { DesignerTemplate } from './designer'
import { DeveloperTemplate } from './developer'
import { LuxuryTemplate } from './luxury'
import { CanvaEmeraldTemplate } from './canva-emerald'
import { CanvaCreativeTemplate } from './canva-creative'
import { CanvaExecutiveTemplate } from './canva-executive'
import { CanvaCoralTemplate } from './canva-coral'
import { CanvaGradientTemplate } from './canva-gradient'
import { CanvaObsidianTemplate } from './canva-obsidian'
import { CanvaInfographicTemplate } from './canva-infographic'

export const TEMPLATE_REGISTRY: Record<TemplateId, (p: TP) => React.ReactNode> = {
  'ats-pro': AtsProTemplate,
  modern: ModernTemplate,
  corporate: CorporateTemplate,
  minimal: MinimalTemplate,
  elegant: ElegantTemplate,
  designer: DesignerTemplate,
  developer: DeveloperTemplate,
  luxury: LuxuryTemplate,
  'canva-emerald': CanvaEmeraldTemplate,
  'canva-creative': CanvaCreativeTemplate,
  'canva-executive': CanvaExecutiveTemplate,
  'canva-coral': CanvaCoralTemplate,
  'canva-gradient': CanvaGradientTemplate,
  'canva-obsidian': CanvaObsidianTemplate,
  'canva-infographic': CanvaInfographicTemplate,
}
