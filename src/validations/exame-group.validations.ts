import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { getApiDefaultSchemeColumns } from './validations.utils'

export const ExameGroupZodScheme = z
  .object({
    company_id: z.number().optional().default(1),
    name: z.string(),
  })
  .merge(getApiDefaultSchemeColumns())

export type ExameGroup = z.infer<typeof ExameGroupZodScheme>

export const ExameGroupFormValidation = zodResolver(ExameGroupZodScheme)
