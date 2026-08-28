import type { UserSignInForm } from '@/types'
import { isAxiosError } from 'axios'
import { UserApi } from '../apis'
import { ENV } from '@/helpers'
import { userSignInResponseDataSchema } from '@/schemas/user.schema'

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
}
