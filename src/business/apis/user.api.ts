import api from '@/lib/axios'
import type { UserSignInForm, UserSignInResponseData } from '@/types'

export class UserApi {
  static signIn = (formData: UserSignInForm) =>
    api.post<UserSignInResponseData>(`/users/sign-in`, formData)
}
