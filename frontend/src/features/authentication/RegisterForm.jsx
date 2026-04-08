import AuthForm from "./AuthForm"

import {fields} from "./configs/RegisterFields"

export default function RegisterForm() {
 

  return (
    <AuthForm
      type="register"
      fields={fields}
      submitText="Tạo tài khoản"
      switchTo="/auth/sign-in"
      switchType="register"
    />
  )
}