import type {
  MessageResponse,
  User,
  UserForgotPasswordForm,
  UserResetPasswordFormData,
  UserSignInForm,
} from '@/types'
import { isAxiosError } from 'axios'
import { UserApi } from '../apis'
import { ENV } from '@/helpers'
import { userSignInResponseDataSchema } from '@/schemas/user.schema'
import { messageResponseSchema } from '@/schemas'

export class UserService {
  static signIn = async (formData: UserSignInForm): Promise<void> => {
    try {
      const { data } = await UserApi.signIn(formData)
      const response = userSignInResponseDataSchema.safeParse(data)
      if (!response.success)
        throw new Error('La respuesta del servidor no tiene el formato esperado')
      localStorage.setItem(ENV.TOKEN, response.data.token)
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message)
      }
      throw error
    }
  }

  static forgotPassword = async (formData: UserForgotPasswordForm): Promise<MessageResponse> => {
    try {
      const { data } = await UserApi.forgotPassword(formData)
      const response = messageResponseSchema.safeParse(data)
      if (!response.success)
        throw new Error('La respuesta del servidor no tiene el formato esperado')
      return response.data
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message)
      }
      throw error
    }
  }

  static verifyResetToken = async (token: User['token']): Promise<MessageResponse> => {
    try {
      const { data } = await UserApi.verifyResetToken(token)
      const response = messageResponseSchema.safeParse(data)
      if (!response.success)
        throw new Error('La respuesta del servidor no tiene el formato esperado')
      return response.data
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message)
      }
      throw error
    }
  }

  static resetPassword = async (formData: UserResetPasswordFormData): Promise<MessageResponse> => {
    try {
      const { data } = await UserApi.resetPassword(formData)
      const response = messageResponseSchema.safeParse(data)
      if (!response.success)
        throw new Error('La respuesta del servidor no tiene el formato esperado')
      return response.data
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message)
      }
      throw error
    }
  }
}
