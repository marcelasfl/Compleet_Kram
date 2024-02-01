import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { getApiDefaultSchemeColumns } from './validations.utils'



export const UnitMeasureZodScheme = z
  .object({
    name: z.string(),
    acronym: z.string(),
    company_id: z.number().optional().default(1),
  }).merge(getApiDefaultSchemeColumns())


export type UnitMeasure = z.infer<typeof UnitMeasureZodScheme>;
export const UnitMeasurementFormValidation = zodResolver(UnitMeasureZodScheme);



