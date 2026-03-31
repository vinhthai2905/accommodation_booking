import AuthForm from "./AuthForm"

export default function LoginForm() {
  const fields = [
    {
      idFor: "email",
      type: "email",
      labelFor: "Địa chỉ email",
      placeHolderFor: "Nhập email của bạn",
    },
    {
      idFor: "password",
      type: "password",
      labelFor: "Mật khẩu",
      placeHolderFor: "Nhập mật khẩu của bạn",
    },
  ]

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