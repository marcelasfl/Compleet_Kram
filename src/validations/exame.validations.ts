import { GENRES } from '@/components/Selects/GenreSelect'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ExameGroupZodScheme } from './exame-group.validations'
import { LaboratoryZodScheme } from './laboratory.validations'
import { UnitMeasureZodScheme } from './unit-measure.validations'
import { getApiDefaultSchemeColumns } from './validations.utils'

export const ExameReferenceValueZodScheme = z.object({
  comparisonOperator: z.string(),
  lowerValue: z.string().or(z.number()).transform(String),
  highestValue: z.string().or(z.number()).transform(String),
  unitMeasurement: UnitMeasureZodScheme,
  comparisonOperatorIdeal: z.string(),
  lowerValueIdeal: z.string().or(z.number()).transform(String),
  highestValueIdeal: z.string().or(z.number()).transform(String),
  unitMeasurementIdeal: UnitMeasureZodScheme,
})

export const ExameZodScheme = z
  .object({
    examGroup: ExameGroupZodScheme.optional(),
    name: z.string(),
    code: z.string(),
    company: z.number().default(1),
    fasting: z.boolean().default(false),
    genre: z.enum(GENRES).optional().default("M"),
    maxAgePatient: z.number(),
    menstrualPeriod: z.string().optional().nullable(),
    minAgePatient: z.number(),
    referenceValues: ExameReferenceValueZodScheme,
    laboratory: LaboratoryZodScheme,
    observation: z.string().optional().nullable(),
  }).merge(getApiDefaultSchemeColumns())

export const CreateExameZodScheme = ExameZodScheme.merge(
  z.object({
    examGroup: z.number(),
    laboratory: z.number(),
    referenceValues: ExameReferenceValueZodScheme.merge(
      z.object({
        unitMeasurement: z.number(),
        unitMeasurementIdeal: z.number(),
      })
    ),
  })
).superRefine((data, context) => {
  if (data.genre === "F" && !data.menstrualPeriod) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Esse campo é obrigatório.",
      path: ["menstrualPeriod"],
    });
  }
})

export type Exame = z.infer<typeof ExameZodScheme>
export type ExameReferenceValues = z.infer<typeof ExameReferenceValueZodScheme>

export const ExameFormValidation = zodResolver(CreateExameZodScheme)
