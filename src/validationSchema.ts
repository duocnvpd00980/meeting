import { z } from 'zod'

export const schemaLogin = z.object({
  email: z.string().email('Invalid email address').min(5, 'Too short'),
})
