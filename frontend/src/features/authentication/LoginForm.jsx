import AuthForm from "./AuthForm"

import { fields } from "./configs/LoginFields"

export default function LoginForm() {
  return (
    <AuthForm
      type="signIn"
      fields={fields}
      submitText="Đăng nhập"
      switchTo="/auth/sign-up"
      switchType="logIn"
    />
  )
}