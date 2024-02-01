import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import dayjs from 'dayjs'
import { getApiDefaultSchemeColumns } from './validations.utils'



export const PatientZodScheme = z.object({
  id: z.number().optional(),
  name: z.string(),
  birthDate: z.string().or(z.custom<dayjs.Dayjs>()),
  streetName: z.string(),
  streetNumber: z.string(),
  neighborhood: z.string(),
  complement: z.string().optional(),
  postalCode: z.string(),
  code: z.string().optional().nullable(),
  city: z.string(),
  state: z.string(),
  country: z.string().default('Brasil'),
  phoneNumberFirst: z.string(),
  phoneNumberSecond: z.string().optional().nullable(),
  emailAddress: z.string(),
  documentNumber: z.string(),
  pathImage: z.string().optional(),
  active: z.boolean().default(true),
  companyId: z.number().default(1),
  surname: z.string().optional(),
  occupation: z.string().optional(),
  age: z.number(),
  biologicalGenre: z.string(),
  rg: z.string()
}).merge(getApiDefaultSchemeColumns())

export const PatientFormZodScheme = PatientZodScheme.merge(z.object({
  birthDate: z.custom<dayjs.Dayjs>().transform((value) => {
    console.log({ value: dayjs(value).format('YYYY-MM-DD') });
    return dayjs(value).format('YYYY-MM-DD')
  }),
  biologicalGenre: z.enum(['MASCULINO', 'FEMININO']),
  documentNumber: z.string().transform((value) => value.replace(/\D/g, '')),
  phoneNumberFirst: z.string().transform((value) => value.replace(/\D/g, '')),
  phoneNumberSecond: z.string().transform((value) => value.replace(/\D/g, ''))
}))

export type Patient = z.infer<typeof PatientZodScheme>


export const PatientFormValidation = zodResolver(PatientFormZodScheme)
