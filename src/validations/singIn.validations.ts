import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const SingInZodScheme = z.object({
  user: z.string().email(),
  password: z.string(),
  remember: z.boolean().default(false),
})

export type SignInData = z.infer<typeof SingInZodScheme>

export const SingInFormValidation = zodResolver(SingInZodScheme)
