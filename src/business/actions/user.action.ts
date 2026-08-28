import type { UserSignInForm } from '@/types'
import { UserService } from '../services'

export class UserAction {
  static signIn = (formData: UserSignInForm) => UserService.signIn(formData)
}
