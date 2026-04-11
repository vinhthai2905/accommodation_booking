import AuthForm from "./AuthForm"

export default function RegisterForm() {
  return (
    <AuthForm
      type="register"
      submitText="Tạo tài khoản"
      switchTo="/auth/sign-in"
      switchType="register"
    />
  )
}