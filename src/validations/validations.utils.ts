import { z } from 'zod'

export function getApiDefaultSchemeColumns() {
  return z.object({
    id: z.number().optional(),
    active: z.boolean().optional().default(true),
    deleted: z.boolean().optional(),
    deletedAt: z.string().optional(),
    updatedAt: z.string().optional(),
  })
}
