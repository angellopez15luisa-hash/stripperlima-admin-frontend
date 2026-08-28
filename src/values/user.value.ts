import type { UserForgotPasswordForm, UserResetPasswordForm, UserSignInForm } from '@/types'

export class UserValue {
  static signInForm: UserSignInForm = {
    email: '',
    password: '',
  }
  static forgotPasswordForm: UserForgotPasswordForm = {
    email: '',
    frontendUrl: window.location.origin,
  }
  static resetPasswordForm: UserResetPasswordForm = {
    newPassword: '',
    confirmPassword: '',
  }
}
