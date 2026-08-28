import type { userSchema } from '@/schemas'
import z from 'zod'
import type { userSignInResponseDataSchema } from '@/schemas/user.schema'

export type User = z.infer<typeof userSchema>

export type UserSignInForm = Pick<User, 'email' | 'password'>

export type UserSignInResponseData = z.infer<typeof userSignInResponseDataSchema>
