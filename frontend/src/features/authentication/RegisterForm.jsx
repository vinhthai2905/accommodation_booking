import AuthForm from "./AuthForm"

export default function RegisterForm() {
  const fields = [
    {
      idFor: "email",
      type: "email",
      labelFor: "Địa chỉ email",
      placeHolderFor: "Nhập email của bạn",
    },
    {
      idFor: "name",
      type: "text",
      labelFor: "Họ và tên",
      placeHolderFor: "Nhập họ và tên",
    },
    {
      idFor: "phone",
      type: "tel",
      labelFor: "Số điện thoại",
      placeHolderFor: "Nhập số điện thoại",
    },
    {
      idFor: "password",
      type: "password",
      labelFor: "Mật khẩu",
      placeHolderFor: "Nhập mật khẩu",
    },
    {
      idFor: "confirmPassword",
      type: "password",
      labelFor: "Xác nhận mật khẩu",
      placeHolderFor: "Nhập lại mật khẩu",
    },
  ]

  return (
    <AuthForm
      type="register"
      fields={fields}
      submitText="Tạo tài khoản"
      switchTo="/sign-in"
      switchType="register"
    />
  )
}