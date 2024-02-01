import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { getApiDefaultSchemeColumns } from './validations.utils'

export const CompanyZodScheme = z
  .object({
    name: z.string(),
  })
  .merge(getApiDefaultSchemeColumns())

export const LaboratoryZodScheme = z
  .object({
    name: z.string(),
    company_id: z.number().optional().default(1),
  })
  .merge(getApiDefaultSchemeColumns())

export type Laboratory = z.infer<typeof LaboratoryZodScheme>

export const LaboratoryFormValidation = zodResolver(LaboratoryZodScheme)
