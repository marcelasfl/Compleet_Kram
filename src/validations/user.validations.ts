import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const UserZodScheme = z.object({
  id: z.number(),
  name: z.string().min(1).max(18),
  password: z.string().min(10).max(14),
  birthData: z.string(),
})

export type User = z.infer<typeof UserZodScheme>

export const UserFormValidation = zodResolver(UserZodScheme)
